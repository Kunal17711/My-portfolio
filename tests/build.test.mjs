import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {prepareSeo} from '../scripts/prepare-seo.mjs';
import {transform} from 'lightningcss';
import {createHash} from 'node:crypto';
import {versionAssets} from '../scripts/version-assets.mjs';

test('custom redirects match Vercel trailing-slash normalization',()=>{
  const config=JSON.parse(fs.readFileSync(new URL('../vercel.json',import.meta.url),'utf8'));
  assert.equal(config.trailingSlash,true);
  for(const rule of config.redirects){assert.equal(rule.source.endsWith('/'),true);assert.equal(rule.destination.endsWith('/'),true);assert.equal(rule.permanent,true)}
  assert.equal(config.redirects.find(x=>x.source==='/aldren-row/').destination,'/projects/aldren-row/');
});

test('all source stylesheets parse strictly without warnings',()=>{
  const root=path.resolve(import.meta.dirname,'..');
  const files=fs.readdirSync(root).filter(name=>name.endsWith('.css')).map(name=>path.join(root,name));
  files.push(path.join(root,'assets/css/ai-assistant.css'));
  for(const filename of files){
    const result=transform({filename,code:fs.readFileSync(filename),minify:true});
    assert.equal(result.warnings.length,0,filename);
  }
});

test('preview pages stay nonindexable while all SEO URLs reference production',()=>{
  const directory=fs.mkdtempSync(path.join(os.tmpdir(),'kb-seo-'));
  try{
    for(const file of ['index.html','contact/index.html']){
      const full=path.join(directory,file);fs.mkdirSync(path.dirname(full),{recursive:true});
      fs.writeFileSync(full,'<!doctype html><html><head><title>Contact Kunal Builds</title></head><body></body></html>');
    }
    const origin='https://heyitskunal.vercel.app';
    prepareSeo(directory,origin,{indexable:false});
    const contact=fs.readFileSync(path.join(directory,'contact/index.html'),'utf8');
    assert.match(contact,/<meta name="robots" content="noindex,nofollow">/);
    assert.match(contact,/<link rel="canonical" href="https:\/\/heyitskunal.vercel.app\/contact\/">/);
    assert.match(contact,/"@type":"ContactPage"/);
    assert.match(fs.readFileSync(path.join(directory,'robots.txt'),'utf8'),/Disallow: \//);
    assert.doesNotMatch(fs.readFileSync(path.join(directory,'sitemap.xml'),'utf8'),/preview|localhost/);
    prepareSeo(directory,origin,{indexable:true});
    assert.match(fs.readFileSync(path.join(directory,'contact/index.html'),'utf8'),/index,follow,max-image-preview:large/);
    assert.match(fs.readFileSync(path.join(directory,'robots.txt'),'utf8'),/Allow: \//);
  }finally{fs.rmSync(directory,{recursive:true,force:true})}
});

test('versioned assets hash final dependency bytes and preserve data-URL CSS',async()=>{
  const directory=fs.mkdtempSync(path.join(os.tmpdir(),'kb-assets-'));
  try{
    const put=(name,text)=>{const file=path.join(directory,name);fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,text)};
    put('assets/fonts/VT323-Regular.woff2','font-fixture');
    put('assets/images/project.webp','image-fixture');
    put('assets/js/ai-orb.js','export function createOrb() {}');
    put('app.js',`const image='/assets/images/project.webp';import('/assets/js/ai-orb.js');`);
    put('intro.js','document.body.dataset.started="true";');
    put('style.css',`@font-face{font-family:VT323;src:url('assets/fonts/VT323-Regular.woff2')}#screen{color:red}.deferred{background-image:url("data:image/svg+xml,%3Csvg%3E%3Cpath filter='url(%23n)'/%3E%3C/svg%3E")}`);
    put('index.html','<html><head><link rel="stylesheet" href="style.css"></head><body><main id="screen"></main><script src="app.js" defer></script><script src="intro.js" defer></script></body></html>');
    put('projects/index.html','<html><head></head><body><img src="/assets/images/project.webp"><script src="/app.js" defer></script></body></html>');
    await versionAssets(directory);
    const map=JSON.parse(fs.readFileSync(path.join(directory,'asset-manifest.json')));
    for(const url of Object.values(map)){
      const bytes=fs.readFileSync(path.join(directory,url));
      assert.ok(url.includes('.'+createHash('sha256').update(bytes).digest('hex').slice(0,12)+'.'));
    }
    const app=fs.readFileSync(path.join(directory,map['/app.js']),'utf8');
    assert.ok(app.includes(map['/assets/images/project.webp']));
    assert.ok(app.includes(map['/assets/js/ai-orb.js']));
    const css=fs.readFileSync(path.join(directory,map['/portfolio.css']),'utf8');
    assert.match(css,/data:image\/svg\+xml/);assert.match(css,/url\(%23n\)/);
    const html=fs.readFileSync(path.join(directory,'index.html'),'utf8');
    assert.equal((html.match(/rel="stylesheet"/g)||[]).length,1);
    assert.doesNotMatch(html,/undefined|onload=/);
    assert.match(fs.readFileSync(path.join(directory,'projects/index.html'),'utf8'),/asset-runtime\.[a-f0-9]{12}\.js/);
  }finally{fs.rmSync(directory,{recursive:true,force:true})}
});

test('immutable caching is confined to build output and API remains no-store',()=>{
  const config=JSON.parse(fs.readFileSync(new URL('../vercel.json',import.meta.url)));
  const matches=config.headers.flatMap(rule=>rule.headers.filter(h=>h.key==='Cache-Control').map(header=>({source:rule.source,value:header.value})));
  assert.deepEqual(matches.filter(rule=>rule.value.includes('immutable')).map(rule=>rule.source),['/assets/build/(.*)']);
  assert.equal(matches.find(rule=>rule.source==='/api/(.*)').value,'no-store');
  assert.ok(matches.findIndex(rule=>rule.source==='/assets/build/(.*)')>matches.findIndex(rule=>rule.source==='/assets/(.*)'));
});
