import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {prepareSeo} from '../scripts/prepare-seo.mjs';
import {transform} from 'lightningcss';

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
