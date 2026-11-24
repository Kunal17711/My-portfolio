import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {Readable} from 'node:stream';
import {once} from 'node:events';
import {execFileSync} from 'node:child_process';
import {createAssistantHandler} from '../api/assistant.js';
import {createMemoryLimiterForTests} from '../server/assistant/rate-limit.mjs';

const root=path.resolve(import.meta.dirname,'..');
const publicRoot=path.join(root,'public');
const port=Number(process.env.PORT)||8000;
if(!fs.existsSync(path.join(publicRoot,'index.html')))execFileSync(process.execPath,[path.join(root,'scripts/build-public.mjs')],{stdio:'inherit'});
const environment={...process.env,AI_LOCAL_DEV:'true'};
environment.AI_ALLOWED_ORIGINS=[...new Set([...String(environment.AI_ALLOWED_ORIGINS||'').split(',').map(value=>value.trim()).filter(Boolean),`http://localhost:${port}`])].join(',');
const envFile=path.join(root,'.env.local');
if(fs.existsSync(envFile)){
  for(const line of fs.readFileSync(envFile,'utf8').split(/\r?\n/)){
    const match=line.match(/^([A-Z][A-Z0-9_]*)=(.*)$/);
    if(match&&!environment[match[1]])environment[match[1]]=match[2].trim().replace(/^['"]|['"]$/g,'');
  }
}
const mock=process.env.AI_TEST_MOCK==='1';
const liveTest=process.env.AI_TEST_LIVE==='1';
if(mock){environment.AI_ENABLED='true';environment.GROQ_API_KEY='test-only-placeholder-key';environment.GROQ_MODEL='openai/gpt-oss-20b'}
if(liveTest)environment.AI_ENABLED='true';
const mockProvider=async(_url,options)=>{
  const payload=JSON.parse(options.body);
  const question=payload.messages.at(-1).content;
  const text=question.includes('HORYZON')?'HORYZON is in the approved project archive. Open the Projects page to explore it.':'Kunal Builds creates websites, apps and digital products. Tell me about your project to find a relevant service.';
  return new Response(new ReadableStream({async start(controller){
    const encoder=new TextEncoder();
    for(const part of text.match(/.{1,14}/g)||[]){controller.enqueue(encoder.encode(`data: ${JSON.stringify({choices:[{delta:{content:part}}]})}\n\n`));await new Promise(resolve=>setTimeout(resolve,35))}
    controller.enqueue(encoder.encode('data: [DONE]\n\n'));controller.close();
  }}),{status:200,headers:{'Content-Type':'text/event-stream'}});
};
const handler=createAssistantHandler({environment,fetchProvider:mock?mockProvider:fetch,limiter:mock?createMemoryLimiterForTests({visitorMinute:1000,visitorDay:1000,globalMinute:1000,globalDay:1000,globalMinuteTokens:1000000,globalDayTokens:1000000}):liveTest?createMemoryLimiterForTests():null});
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.mp3':'audio/mpeg','.mp4':'video/mp4','.ttf':'font/ttf','.woff2':'font/woff2'};
const csp="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; media-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self' mailto:; frame-ancestors 'none'";
const security={'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Permissions-Policy':'camera=(), microphone=(), geolocation=(), payment=()','X-Frame-Options':'DENY','Content-Security-Policy':csp};
const server=http.createServer(async(req,res)=>{
  try{
    if(req.url?.split('?')[0]==='/api/assistant'){
      const abort=new AbortController();res.on('close',()=>{if(!res.writableEnded)abort.abort()});
      const headers=new Headers(req.headers);headers.set('x-kb-local-ip',req.socket.remoteAddress||'127.0.0.1');
      const webRequest=new Request('http://localhost:8000/api/assistant',{method:req.method,headers,body:req.method==='GET'||req.method==='HEAD'?undefined:Readable.toWeb(req),duplex:'half',signal:abort.signal});
      const reply=await handler(webRequest);
      res.writeHead(reply.status,Object.fromEntries([...reply.headers,...Object.entries(security)]));
      if(reply.body){for await(const chunk of reply.body){if(!res.write(chunk))await once(res,'drain')}}
      res.end();return;
    }
    if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,security);res.end();return}
    const url=new URL(req.url||'/', 'http://localhost:8000');
    let relative;
    try{relative=decodeURIComponent(url.pathname)}catch{res.writeHead(400,security);res.end();return}
    if(relative.includes('\\')||relative.split('/').some(segment=>segment.startsWith('.')||segment==='..')){res.writeHead(404,security);res.end();return}
    if(relative.endsWith('/'))relative+='index.html';
    const full=path.resolve(publicRoot,'.'+relative);
    if(!full.startsWith(publicRoot+path.sep)){res.writeHead(404,security);res.end();return}
    let target=full;
    if(!fs.existsSync(target)||!fs.statSync(target).isFile()){
      const notFound=path.join(publicRoot,'404.html');
      res.writeHead(404,{...security,'Content-Type':'text/html; charset=utf-8'});
      if(req.method==='HEAD'){res.end();return}fs.createReadStream(notFound).pipe(res);return;
    }
    res.writeHead(200,{...security,'Content-Type':mime[path.extname(target).toLowerCase()]||'application/octet-stream','Cache-Control':relative.startsWith('/assets/')?'public, max-age=3600':'no-store'});
    if(req.method==='HEAD'){res.end();return}fs.createReadStream(target).pipe(res);
  }catch{if(!res.headersSent)res.writeHead(500,security);res.end()}
});
server.listen(port,'127.0.0.1',()=>console.log(`Kunal Builds isolated dev server ready at http://localhost:${port}/ (mode=${mock?'mock':liveTest?'live-test':'configured'})`));
