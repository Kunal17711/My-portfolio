export async function* groqTextChunks(body){
  if(!body)throw new Error('empty_stream');
  const reader=body.getReader();
  const decoder=new TextDecoder();
  let buffer='',completed=false,total=0;
  try{
    while(true){
      const {value,done}=await reader.read();
      if(done)break;
      buffer=(buffer+decoder.decode(value,{stream:true})).replace(/\r\n/g,'\n');
      if(buffer.length>65536)throw new Error('stream_frame_too_large');
      while(true){
        const end=buffer.indexOf('\n\n');if(end<0)break;
        const frame=buffer.slice(0,end);buffer=buffer.slice(end+2);
        const data=frame.split('\n').filter(line=>line.startsWith('data:')).map(line=>line.slice(5).trim()).join('\n');
        if(!data)continue;
        if(data==='[DONE]'){completed=true;break}
        if(data.length>32768)throw new Error('stream_event_too_large');
        let event;try{event=JSON.parse(data)}catch{throw new Error('invalid_provider_event')}
        if(Number.isFinite(event.usage?.total_tokens))yield {usage:event.usage.total_tokens};
        const content=event.choices?.[0]?.delta?.content;
        if(typeof content==='string'&&content){
          total+=content.length;if(content.length>4096||total>24000)throw new Error('provider_answer_too_large');
          yield {text:content};
        }
      }
      if(completed)break;
    }
    if(!completed)throw new Error('provider_stream_interrupted');
  }finally{await reader.cancel().catch(()=>{});reader.releaseLock()}
}

export function sse(type,payload){return `event: ${type}\ndata: ${JSON.stringify(payload)}\n\n`}
