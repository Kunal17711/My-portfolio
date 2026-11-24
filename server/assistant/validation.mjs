import {allowedRoutes} from './knowledge.mjs';

export class RequestError extends Error {
  constructor(status,code,message){super(message);this.status=status;this.code=code}
}

export async function readValidatedRequest(request){
  if(request.method!=='POST')throw new RequestError(405,'method','Use POST for assistant questions.');
  if(!/^application\/json(?:;\s*charset=utf-8)?$/i.test(request.headers.get('content-type')||''))throw new RequestError(415,'content_type','Send JSON to the assistant.');
  const claimed=Number(request.headers.get('content-length'));
  if(Number.isFinite(claimed)&&claimed>16384)throw new RequestError(413,'body_size','The question is too large.');
  const reader=request.body?.getReader();
  if(!reader)throw new RequestError(400,'body','A question is required.');
  const chunks=[];let size=0;
  try{
    while(true){const {value,done}=await reader.read();if(done)break;size+=value.byteLength;if(size>16384)throw new RequestError(413,'body_size','The question is too large.');chunks.push(value)}
  }finally{reader.releaseLock()}
  let body;
  try{body=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks)))}catch{throw new RequestError(400,'json','Invalid JSON. A question is required.')}
  if(!body||typeof body!=='object'||Array.isArray(body)||Object.keys(body).some(key=>!['message','history','page','sessionId'].includes(key)))throw new RequestError(400,'schema','Invalid assistant request.');
  if(typeof body.message!=='string'||!body.message.trim()||body.message.length>1500||/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(body.message))throw new RequestError(400,'message','Enter a question up to 1,500 characters.');
  if(!Array.isArray(body.history)||body.history.length>6)throw new RequestError(400,'history','Conversation history is too long.');
  let historyChars=0;
  for(let i=0;i<body.history.length;i++){
    const item=body.history[i];
    if(!item||typeof item!=='object'||Array.isArray(item)||Object.keys(item).sort().join(',')!=='content,role'||item.role!==(i%2===0?'user':'assistant')||typeof item.content!=='string'||!item.content.trim()||item.content.length>1500)throw new RequestError(400,'history','Invalid conversation history.');
    historyChars+=item.content.length;
  }
  if(body.history.length%2!==0||historyChars>3000)throw new RequestError(400,'history','Conversation history is too long.');
  if(typeof body.page!=='string'||!allowedRoutes.has(body.page))throw new RequestError(400,'page','Unknown portfolio page.');
  if(typeof body.sessionId!=='string'||!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.sessionId))throw new RequestError(400,'session','Invalid session.');
  return {message:body.message.trim(),history:body.history,page:body.page,sessionId:body.sessionId};
}

export function allowedOrigin(request,environment){
  const origin=request.headers.get('origin');
  if(!origin)return false;
  const allowed=new Set([environment.KB_PUBLIC_URL,...String(environment.AI_ALLOWED_ORIGINS||'').split(',')].filter(Boolean).map(value=>value.trim().replace(/\/+$/,'')));
  if(environment.AI_LOCAL_DEV==='true')allowed.add('http://localhost:8000');
  if(!allowed.has(origin))return false;
  if(request.headers.get('sec-fetch-site')==='cross-site')return false;
  return true;
}
