import {createHmac,randomUUID} from 'node:crypto';

const RESERVE=`local values={};for i=1,6 do values[i]=tonumber(redis.call('GET',KEYS[i]) or '0') end
if redis.call('GET',KEYS[7]) then return {0,'concurrent',45} end
local limits={4,20,20,300,6000,150000};local costs={1,1,1,1,tonumber(ARGV[1]),tonumber(ARGV[1])}
for i=1,6 do if values[i]+costs[i]>limits[i] then return {0,({'visitor-minute','visitor-day','global-minute','global-day','tokens-minute','tokens-day'})[i],math.max(1,redis.call('TTL',KEYS[i]))} end end
local freshMinute=redis.call('EXISTS',KEYS[5])==0;local freshDay=redis.call('EXISTS',KEYS[6])==0
redis.call('SET',KEYS[7],ARGV[2],'EX',60)
for i=1,6 do local next=redis.call('INCRBY',KEYS[i],costs[i]);if next==costs[i] then redis.call('EXPIRE',KEYS[i],(i==2 or i==4 or i==6) and 86400 or 60) end end
if freshMinute or not redis.call('GET',KEYS[9]) then redis.call('SET',KEYS[9],ARGV[2],'PX',math.max(1,redis.call('PTTL',KEYS[5]))) end
if freshDay or not redis.call('GET',KEYS[10]) then redis.call('SET',KEYS[10],ARGV[2],'PX',math.max(1,redis.call('PTTL',KEYS[6]))) end
redis.call('HSET',KEYS[8],'state','reserved','estimate',ARGV[1],'minute',redis.call('GET',KEYS[9]),'day',redis.call('GET',KEYS[10]))
redis.call('EXPIRE',KEYS[8],120)
return {1,'ok',0}`;
const FINISH=`if redis.call('HGET',KEYS[4],'state')~='reserved' then return 0 end
if redis.call('GET',KEYS[3])==ARGV[1] then redis.call('DEL',KEYS[3]) end
local refund=tonumber(ARGV[2]);local estimate=tonumber(redis.call('HGET',KEYS[4],'estimate'))
if refund>0 then for i=1,2 do
 local generation=redis.call('HGET',KEYS[4],i==1 and 'minute' or 'day')
 if generation==redis.call('GET',KEYS[i+4]) then
  local current=tonumber(redis.call('GET',KEYS[i]) or '0')
  if current>0 then redis.call('DECRBY',KEYS[i],math.min(refund,current)) end
 end
end end
redis.call('HSET',KEYS[4],'state','finished','charged',estimate-refund,'outcome',ARGV[3])
return 1`;

export function createRedisLimiter(environment,fetchImpl=fetch){
  const base=environment.UPSTASH_REDIS_REST_URL?.replace(/\/+$/,'');
  const token=environment.UPSTASH_REDIS_REST_TOKEN;
  const secret=environment.RATE_LIMIT_SECRET;
  const prefix=environment.UPSTASH_REDIS_PREFIX||(environment.VERCEL_ENV==='preview'?'kbai:preview':'kbai');
  if(!base||!/^https:\/\/[^/]+\.upstash\.io$/.test(base)||!token||!secret||secret.length<24||!/^[a-zA-Z0-9:_-]{1,48}$/.test(prefix))return null;
  const command=async args=>{
    const response=await fetchImpl(base,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(args),signal:AbortSignal.timeout(4000)});
    if(!response.ok)throw new Error('Rate storage unavailable');
    const body=await response.json();
    if(body.error||body.result===undefined)throw new Error('Rate storage error');
    return body.result;
  };
  return {
    async reserve(ip,sessionId,estimate){
      if(!Number.isSafeInteger(estimate)||estimate<1||estimate>7000)throw new Error('Invalid token reservation');
      const visitor=createHmac('sha256',secret).update(ip).digest('hex').slice(0,32);
      const session=createHmac('sha256',secret).update(sessionId+':'+ip).digest('hex').slice(0,32);
      const keys=[`${prefix}:v:${visitor}:m`,`${prefix}:v:${visitor}:d`,`${prefix}:g:m`,`${prefix}:g:d`,`${prefix}:g:tm`,`${prefix}:g:td`,`${prefix}:s:${session}:lock`];
      const id=randomUUID();
      keys.push(`${prefix}:r:${id}`,`${prefix}:g:tm:version`,`${prefix}:g:td:version`);
      const result=await command(['EVAL',RESERVE,String(keys.length),...keys,String(estimate),id]);
      if(!Array.isArray(result)||!Number.isFinite(Number(result[0])))throw new Error('Rate storage response invalid');
      if(Number(result[0])!==1)return {ok:false,reason:String(result[1]),retryAfter:Math.max(1,Math.min(86400,Number(result[2])||60))};
      let finishing;
      return {ok:true,async finish(actual,outcome='complete'){
        const refund=Number.isFinite(actual)?Math.max(0,estimate-Math.max(0,Math.ceil(actual))):0;
        const reason=['complete','cancelled','interrupted','rejected'].includes(outcome)?outcome:'interrupted';
        return finishing??=(command(['EVAL',FINISH,'6',keys[4],keys[5],keys[6],keys[7],keys[8],keys[9],id,String(refund),reason]).catch(error=>{finishing=null;throw error}));
      }};
    }
  };
}

export function createMemoryLimiterForTests(overrides={}){
  const values=new Map();const locks=new Set();
  return {async reserve(ip,sessionId,estimate){
    const now=Date.now();const specs=[[`v:${ip}:m`,overrides.visitorMinute||4,60000,1],[`v:${ip}:d`,overrides.visitorDay||20,86400000,1],['g:m',overrides.globalMinute||20,60000,1],['g:d',overrides.globalDay||300,86400000,1],['g:tm',overrides.globalMinuteTokens||6000,60000,estimate],['g:td',overrides.globalDayTokens||150000,86400000,estimate]];
    if(locks.has(sessionId))return {ok:false,reason:'concurrent',retryAfter:45};
    for(const [key,limit,ttl,cost] of specs){const row=values.get(key);const current=row&&row.until>now?row.count:0;if(current+cost>limit)return {ok:false,reason:key,retryAfter:row?Math.max(1,Math.ceil((row.until-now)/1000)):60}}
    for(const [key,,ttl,cost] of specs){let row=values.get(key);if(!row||row.until<=now)row={count:0,until:now+ttl};row.count+=cost;values.set(key,row)}
    locks.add(sessionId);
    let finished=false;
    return {ok:true,async finish(actual){if(finished)return;finished=true;locks.delete(sessionId);if(Number.isFinite(actual)){for(const key of ['g:tm','g:td']){const row=values.get(key);if(row)row.count=Math.max(0,row.count-Math.max(0,estimate-Math.max(0,Math.ceil(actual))))}}}};
  }};
}
