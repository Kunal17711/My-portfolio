import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const context = vm.createContext({window:{}});
for (const name of ['project-model.js', 'services-data.js', 'identity-data.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, name), 'utf8'), context);
}
const projects = Array.from(context.window.KB_PROJECTS || [], project => ({
  type:'project', id:project.id, name:project.name,
  description:String(project.description || '').slice(0,650),
  category:project.category, stack:Array.from(project.stack || []),
  language:project.language || '',
  route:project.caseId ? `/projects/${project.caseId}/` : '/projects/',
  website:project.website || '',
  source:project.source || '',
  sourceLines:Number(project.sourceLines || 0),
  sourceFiles:Number(project.sourceFiles || 0)
}));
const services = Array.from(context.window.KB_SERVICES || [], service => ({
  type:'service', id:service.id, name:service.name,
  description:String(service.description || service.seoDescription || '').slice(0,650),
  audience:String(service.audience || '').slice(0,350),
  route:`/services/${service.id}/`,
  projects:Array.from(service.projects || [])
}));
const identity = [
  {type:'identity',id:'about',name:'About Kunal Builds',description:'Kunal is an independent web and app developer from Haryana, India. Kunal Builds is his developer identity. He is founder and HOD of Aldren Row. Alternate names include Kunal Dev, Kunal Developer and Kunal17711.',route:'/about/'},
  {type:'identity',id:'who-is-kunal',name:'Who is Kunal Builds?',description:'Kunal Builds is the portfolio and developer identity of Kunal, a web and app developer based in Haryana, India.',route:'/who-is-kunal/'},
  {type:'contact',id:'contact',name:'Contact Kunal Builds',description:'For project inquiries, share goals, required pages or screens, timelines and references. Email: kkunaall10@gmail.com.',route:'/about/'}
];
const stats=context.window.KB_IDENTITY_DATA?.stats;
if (!stats?.totalRepositories || !stats?.totalLinesOfCode) throw new Error('Reviewed portfolio statistics are required to build knowledge.');
const data = {version:1,stats:{repositories:stats.totalRepositories,sourceLines:stats.totalLinesOfCode,sourceFiles:stats.totalSourceFiles,technologies:stats.technologyCount},entries:[...projects,...services,...identity]};
const target=path.join(root,'server/assistant/knowledge-data.mjs');
fs.mkdirSync(path.dirname(target),{recursive:true});
fs.writeFileSync(target,`export default ${JSON.stringify(data,null,2)};\n`);
console.log(`Built private knowledge: ${projects.length} projects, ${services.length} services, ${identity.length} identity/contact entries.`);
