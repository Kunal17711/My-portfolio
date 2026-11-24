import data from './knowledge-data.mjs';
const entries=data.entries;
export const allowedRoutes=new Set(['/', '/about/', '/projects/', '/services/', '/who-is-kunal/', '/contact/', ...entries.map(item=>item.route)]);
const tokenize=text=>String(text||'').toLowerCase().normalize('NFKD').replace(/[^a-z0-9\s-]/g,' ').split(/\s+/).filter(word=>word.length>1);
const synonyms={app:['mobile','android','application'],mobile:['app','android','application'],website:['web','site','landing'],startup:['mvp','business'],design:['ui','ux','interface'],contact:['email','reach','hire'],developer:['kunal','builds'],project:['portfolio','work']};
const docTokens=entries.map(entry=>tokenize([entry.name,entry.name,entry.category,entry.description,entry.stack?.join(' '),entry.language,entry.audience].join(' ')));
const frequencies=new Map();
for(const tokens of docTokens)for(const word of new Set(tokens))frequencies.set(word,(frequencies.get(word)||0)+1);
export function retrieve(question,limit=4){
  const normalized=String(question).toLowerCase();
  if(/\b(what can you build|what do you do|what services|your services|capabilities)\b/.test(normalized)){
    return entries.filter(entry=>entry.type==='service').slice(0,limit);
  }
  if(/\b(how (can|do) i contact|contact you|email you|reach you)\b/.test(normalized)){
    return [...entries.filter(entry=>entry.type==='contact'),...entries.filter(entry=>entry.type==='identity')].slice(0,limit);
  }
  const query=[...new Set(tokenize(question).flatMap(word=>[word,...(synonyms[word]||[])]))];
  const average=docTokens.reduce((sum,tokens)=>sum+tokens.length,0)/docTokens.length;
  const ranked=entries.map((entry,index)=>{
    const tokens=docTokens[index];
    const counts=new Map();for(const token of tokens)counts.set(token,(counts.get(token)||0)+1);
    let score=0;
    for(const word of query){
      const tf=counts.get(word)||0;if(!tf)continue;
      const idf=Math.log(1+(entries.length-(frequencies.get(word)||0)+.5)/((frequencies.get(word)||0)+.5));
      score+=idf*(tf*2.2)/(tf+1.2*(.25+.75*tokens.length/average));
    }
    const lower=question.toLowerCase();
    if(lower.includes(entry.name.toLowerCase()))score+=8;
    if(lower.includes(entry.id.replaceAll('-',' ')))score+=5;
    if(/\b(service|services|hire|offer|development)\b/.test(lower)&&entry.type==='service')score+=12;
    if(/\b(contact|email|reach)\b/.test(lower)&&entry.type==='contact')score+=12;
    if(/\b(project|projects|built|portfolio)\b/.test(lower)&&entry.type==='project')score+=1.5;
    return {entry,score};
  }).filter(row=>row.score>0).sort((a,b)=>b.score-a.score);
  return ranked.slice(0,limit).map(row=>row.entry);
}
export function suggestions(entries){
  const seen=new Set();
  return entries.filter(entry=>allowedRoutes.has(entry.route)&&!seen.has(entry.route)&&seen.add(entry.route)).slice(0,4).map(entry=>({label:entry.name,route:entry.route,...(entry.type==='project'&&entry.route==='/projects/'?{projectId:entry.id}:{})}));
}
export function contextFor(entries){
  const selected=entries.map(entry=>({type:entry.type,name:entry.name,description:entry.description,category:entry.category,stack:entry.stack,language:entry.language,route:entry.route,website:entry.website,source:entry.source,sourceLines:entry.sourceLines,sourceFiles:entry.sourceFiles,audience:entry.audience}));
  return JSON.stringify({stats:data.stats,records:selected}).slice(0,3600);
}
export {data as knowledge};
