import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {minify as minifyJavaScript} from 'terser';
import {transform as transformCss} from 'lightningcss';
import {prepareSeo} from './prepare-seo.mjs';
import {buildOriginalAmbient} from './build-audio.mjs';

const root=path.resolve(import.meta.dirname,'..');
if(process.env.VERCEL==='1'&&(process.env.AI_TEST_MOCK==='1'||process.env.AI_TEST_LIVE==='1'||process.env.AI_LOCAL_DEV==='true'))throw new Error('Local assistant test flags are forbidden in Vercel builds.');
const destination=path.resolve(root,'public');
if(destination!==path.join(root,'public')||!destination.startsWith(root+path.sep))throw new Error('Invalid public output directory');
execFileSync(process.execPath,[path.join(root,'scripts/build-knowledge.mjs')],{stdio:'inherit'});
fs.rmSync(destination,{recursive:true,force:true});
fs.mkdirSync(destination,{recursive:true});
const rootFiles=fs.readdirSync(root,{withFileTypes:true}).filter(item=>item.isFile()&&(
  ['index.html','404.html','robots.txt','sitemap.xml','pages-content.html','google3d850b3790bc6e81.html'].includes(item.name)||/\.(css|js)$/.test(item.name)
));
for(const entry of rootFiles)fs.copyFileSync(path.join(root,entry.name),path.join(destination,entry.name));
const staticFolders=['about','projects','services','who-is-kunal','contact'];
const safeAsset=/\.(?:avif|webp|png|jpe?g|svg|gif|ico|mp4|webm|mp3|ogg|wav|woff2?|ttf)$/i;
function copyFolder(relative,filter){
  const source=path.join(root,relative);if(!fs.existsSync(source))return;
  for(const entry of fs.readdirSync(source,{withFileTypes:true})){
    if(entry.name.startsWith('.')||entry.isSymbolicLink())continue;
    const child=path.join(relative,entry.name);
    if(entry.isDirectory()){copyFolder(child,filter);continue}
    if(!entry.isFile()||!filter(child))continue;
    const target=path.join(destination,child);fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(path.join(root,child),target);
  }
}
for(const folder of staticFolders)copyFolder(folder,file=>file.endsWith(`${path.sep}index.html`));
copyFolder('assets',file=>safeAsset.test(file)||file.endsWith(`${path.sep}ai-assistant.js`)||file.endsWith(`${path.sep}ai-orb.js`)||file.endsWith(`${path.sep}ai-assistant.css`));
buildOriginalAmbient(destination);
async function optimizeAssets(directory){
  for(const item of fs.readdirSync(directory,{withFileTypes:true})){
    const full=path.join(directory,item.name);
    if(item.isDirectory()){await optimizeAssets(full);continue}
    if(!item.isFile())continue;
    if(item.name.endsWith('.js')){
      const result=await minifyJavaScript(fs.readFileSync(full,'utf8'),{compress:true,mangle:false,format:{comments:'some'}});
      if(!result.code)throw new Error(`Could not minify ${path.relative(destination,full)}`);
      fs.writeFileSync(full,result.code);
    }else if(item.name.endsWith('.css')){
      const result=transformCss({filename:full,code:fs.readFileSync(full),minify:true});
      if(result.warnings.length)throw new Error(`CSS warning in ${path.relative(destination,full)}`);
      fs.writeFileSync(full,result.code);
    }
  }
}
await optimizeAssets(destination);
const preview=process.env.VERCEL_ENV==='preview';
const seo=prepareSeo(destination,process.env.KB_PUBLIC_URL||(preview?'https://heyitskunal.vercel.app':undefined),{indexable:!preview});
const files=[];
function inventory(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const full=path.join(dir,item.name);if(item.isDirectory())inventory(full);else files.push(path.relative(destination,full).replaceAll('\\','/'))}}
inventory(destination);
if(files.some(file=>file.startsWith('.')||file.includes('/.')||/\.env|\.map$|knowledge\.json|server\/|api\/|reports\//i.test(file)))throw new Error('Private file in public output');
fs.writeFileSync(path.join(root,'server/assistant/public-manifest.json'),JSON.stringify({files:files.length,generatedAt:new Date().toISOString()},null,2));
console.log(`Built isolated public output: ${files.length} files, ${seo.pages} routes, origin ${seo.origin||'unconfigured'}.`);
