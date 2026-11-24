import {RequestError,readValidatedRequest,allowedOrigin} from '../server/assistant/validation.mjs';
import {retrieve,suggestions,contextFor} from '../server/assistant/knowledge.mjs';
import {messagesFor} from '../server/assistant/prompt.mjs';
import {createRedisLimiter} from '../server/assistant/rate-limit.mjs';
import {groqTextChunks,sse} from '../server/assistant/stream.mjs';
import {isIP} from 'node:net';

const GROQ_ENDPOINT='https://api.groq.com/openai/v1/chat/completions';
const json=(status,code,message,headers={})=>new Response(JSON.stringify({error:code,message}),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store',...headers}});
const failure=(status)=>status===429?'The assistant is busy. Please try again shortly.':status===400?'The request could not be processed. Please try a shorter question.':'The assistant is temporarily unavailable. Please try again later.';

export function createAssistantHandler({environment=process.env,fetchProvider=fetch,limiter=null,clientIp=null}={}){
  return async function handle(request){
    if(request.method!=='POST')return json(405,'method','Use POST for assistant questions.',{'Allow':'POST'});
    if(!allowedOrigin(request,environment))return json(403,'origin','This assistant accepts requests from the portfolio only.');
    if(environment.AI_ENABLED!=='true')return json(503,'disabled','The assistant is currently unavailable.');
    const key=environment.GROQ_API_KEY;
    if(!key||key.length<12)return json(503,'configuration','The assistant is currently unavailable.');
    const activeLimiter=limiter||createRedisLimiter(environment);
    if(!activeLimiter)return json(503,'quota_configuration','The assistant is currently unavailable.');
    let input;
    try{input=await readValidatedRequest(request)}catch(error){
      return error instanceof RequestError?json(error.status,error.code,error.message):json(400,'request','Invalid assistant request.');
    }
    const ip=(clientIp|| (environment.VERCEL==='1'?request.headers.get('x-forwarded-for'):environment.AI_LOCAL_DEV==='true'?request.headers.get('x-kb-local-ip'):null))?.trim();
    if(!ip||!isIP(ip))return json(503,'identity','The assistant is currently unavailable.');
    const selected=retrieve(input.message);
    const context=contextFor(selected);
    const messages=messagesFor(input,context);
    const estimate=Math.min(7000,Math.ceil(JSON.stringify(messages).length/2)+512);
    let reservation;
    try{reservation=await activeLimiter.reserve(ip,input.sessionId,estimate)}catch{return json(503,'quota_store','The assistant is currently unavailable. Please try again later.')}
    if(!reservation.ok)return json(429,'rate_limit','The assistant is busy. Please try again shortly.',{'Retry-After':String(reservation.retryAfter||60)});

    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort('timeout'),45000);
    const cancel=()=>controller.abort('disconnect');
    request.signal?.addEventListener('abort',cancel,{once:true});
    let provider;
    try{
      provider=await fetchProvider(GROQ_ENDPOINT,{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({model:environment.GROQ_MODEL||'openai/gpt-oss-20b',messages,stream:true,stream_options:{include_usage:true},max_completion_tokens:512,reasoning_effort:'low',reasoning_format:'hidden',tool_choice:'none',temperature:0.45}),signal:controller.signal});
    }catch{
      clearTimeout(timeout);request.signal?.removeEventListener('abort',cancel);await reservation.finish().catch(()=>{});
      return json(502,'provider_unavailable',failure(502));
    }
    if(!provider.ok||!provider.body){
      clearTimeout(timeout);request.signal?.removeEventListener('abort',cancel);await reservation.finish(0).catch(()=>{});
      const status=provider.status===429?429:502;
      return json(status,'provider_failure',failure(status),status===429?{'Retry-After':provider.headers.get('retry-after')||'60'}:{});
    }
    let streamController;
    const stream=new ReadableStream({
      start(controllerRef){
        streamController=controllerRef;
        const send=(type,payload)=>controllerRef.enqueue(new TextEncoder().encode(sse(type,payload)));
        (async()=>{
          let output='',usage=null,ended=false;
          try{
            send('links',{items:suggestions(selected)});
            for await(const chunk of groqTextChunks(provider.body)){
              if(chunk.usage!==undefined)usage=chunk.usage;
              if(chunk.text){output+=chunk.text;send('token',{text:chunk.text})}
            }
            if(!output.trim())throw new Error('empty_answer');
            send('done',{complete:true});ended=true;
          }catch{
            if(!controller.signal.aborted){try{send('error',{message:'The response was interrupted. Please try again.'})}catch{}}
          }finally{
            clearTimeout(timeout);request.signal?.removeEventListener('abort',cancel);
            await reservation.finish(usage).catch(()=>{});
            try{controllerRef.close()}catch{}
          }
        })();
      },
      cancel(){controller.abort('client_cancelled');try{streamController?.close()}catch{}}
    });
    return new Response(stream,{status:200,headers:{'Content-Type':'text/event-stream; charset=utf-8','Cache-Control':'no-store, no-transform','X-Content-Type-Options':'nosniff','X-Accel-Buffering':'no','Connection':'keep-alive'}});
  };
}

export default {fetch:createAssistantHandler()};
