import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import postcss from 'postcss';
import {minify} from 'terser';
import {transform} from 'lightningcss';

// Asset dependencies are emitted in order: media -> CSS/orb -> JS -> boot -> HTML.
// Every immutable name hashes the final bytes, including rewritten dependencies.
export async function versionAssets(directory) {
  const files=[];
  const walk=dir=>{for(const item of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,item.name);if(item.isDirectory())walk(file);else files.push(path.relative(directory,file).replaceAll('\\','/'))}};
  walk(directory);
  const read=file=>fs.readFileSync(path.join(directory,file),'utf8').replace(/^\uFEFF/,'');
  const assets={};
  const output=path.join(directory,'assets/build');fs.mkdirSync(output,{recursive:true});
  function emit(original,content) {
    const bytes=Buffer.isBuffer(content)?content:Buffer.from(content);
    const extension=path.extname(original),stem=path.basename(original,extension);
    const hash=createHash('sha256').update(bytes).digest('hex').slice(0,12);
    const url=`/assets/build/${stem}.${hash}${extension}`;
    fs.writeFileSync(path.join(directory,url.slice(1)),bytes);assets['/'+original]=url;return url;
  }
  for(const file of files.filter(file=>/\.(?:avif|webp|png|jpe?g|svg|gif|ico|mp4|webm|mp3|ogg|wav|woff2?)$/i.test(file)))emit(file,fs.readFileSync(path.join(directory,file)));
  // The full TTF sources remain in the repository for provenance, not delivery.
  for(const file of files.filter(file=>file.endsWith('.ttf')))fs.unlinkSync(path.join(directory,file));
  const mediaAssets={...assets};
  function rewrite(text) {
    // Literal paths in catalogs/templates are absolute after rewriting. Dynamic
    // paths resolve through KB_ASSET; there are no response-time substitutions.
    return text.replace(/(?<![\w/-])\/?(?:assets\/[\w./-]+|[\w-]+\.(?:css|js))\b/g,value=>assets['/'+value.replace(/^\//,'')]||value);
  }
  function css(text,original) {
    return text.replace(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^"')\s]+))\s*\)/g,(whole,double,single,bare)=>{
      const value=double??single??bare;
      if(/^(?:data:|https?:|#)/.test(value))return whole;
      const absolute=path.posix.resolve('/',path.posix.dirname(original),value);
      return `url("${assets[absolute]||absolute}")`;
    });
  }
  const home=read('index.html');
  const icon=home.match(/<link rel="icon"[^>]*>/)?.[0]||'';
  const styles=[...home.matchAll(/<link rel="stylesheet" href="([^"]+)"[^>]*>/g)].map(match=>match[1].replace(/^\//,''));
  // Match only intro ancestors, textures and paragraph styles. Preserve source
  // order, media queries, custom properties and keyframes. Other selectors in
  // a matching comma-list are not pulled into the critical path.
  const criticalSelector=/^(?:\*|:root|html|body|#television|#screen(?:\.kb-intro-running)?|\.grid|\.crt-glass|\.scanlines|\.scan-beam|\.vignette)(?:::{0,1}(?:before|after))?$/;
  const critical=[];
  for(const file of styles) {
    const ast=postcss.parse(css(read(file),file));
    ast.walkAtRules('font-face',rule=>{if(!/VT323/.test(rule.toString()))rule.remove()});
    ast.walkRules(rule=>{
      if(rule.parent.type==='atrule'&&/keyframes$/.test(rule.parent.name))return;
      const selectors=rule.selectors.filter(selector=>selector.split(/\s+/).every(part=>criticalSelector.test(part))||/#kbIntroScreen|#kbIntroText|\.kb-intro-content|#kbTransition/.test(selector)||file==='performance.css'&&selector.includes('kb-intro-running'));
      if(selectors.length)rule.selector=selectors.join(',');else rule.remove();
    });
    critical.push(ast.toString());
  }
  const optimize=text=>{let result;try{result=transform({filename:'bundle.css',code:Buffer.from(text),minify:true})}catch(error){const line=text.split('\n')[error.loc?.line-1]||'';throw Error(`CSS bundle: ${error.message} at ${error.loc?.line}:${error.loc?.column}: ${line.slice(Math.max(0,error.loc?.column-100),error.loc?.column+100)}`)}if(result.warnings.length)throw Error('CSS bundle warning');return result.code};
  const criticalUrl=emit('intro-critical.css',optimize(critical.join('\n')));
  // The complete cascade retains exactly the order approved in index.html.
  const homeStyle=emit('portfolio.css',optimize(styles.map(file=>css(read(file),file)).join('\n')));
  for(const file of files.filter(file=>file.endsWith('.css')))emit(file,optimize(css(read(file),file)));
  const scripts=[...home.matchAll(/<script src="([^"]+)" defer><\/script>/g)].map(match=>match[1].replace(/^\//,''));
  const jsFiles=files.filter(file=>file.endsWith('.js'));
  // The orb is the only dynamically imported JS dependency.
  jsFiles.sort((a,b)=>(a.endsWith('ai-orb.js')?-1:0)-(b.endsWith('ai-orb.js')?-1:0));
  for(const file of jsFiles)emit(file,rewrite(read(file)));
  const runtime=`window.KB_ASSETS=${JSON.stringify(mediaAssets)};window.KB_ASSET=value=>{const key='/'+String(value).replace(/^\\//,'');return window.KB_ASSETS[key]||value};`;
  const runtimeUrl=emit('asset-runtime.js',runtime);
  const plan=scripts.filter(file=>file!=='intro.js').map(file=>assets['/'+file]);
  const boot=`${runtime}
    let resolveReady,rejectReady;window.KB_SITE_READY=new Promise((resolve,reject)=>{resolveReady=resolve;rejectReady=reject});
    const loadStyle=url=>new Promise((resolve,reject)=>{const link=document.createElement('link');link.rel='stylesheet';link.href=url;link.onload=resolve;link.onerror=reject;document.head.append(link)});
    const loadScript=url=>new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=url;script.async=false;script.onload=resolve;script.onerror=reject;document.body.append(script)});
    const idle=()=>new Promise(resolve=>{if(window.requestIdleCallback)requestIdleCallback(resolve,{timeout:150});else setTimeout(resolve,0)});
    let bootStarted=false;
    const start=()=>{if(bootStarted)return;bootStarted=true;setTimeout(async()=>{
      try {const scripts=${JSON.stringify(plan)};
        for(const url of scripts){const hint=document.createElement('link');hint.rel='preload';hint.as='script';hint.href=url;hint.fetchPriority='low';document.head.append(hint)}
        await loadStyle(${JSON.stringify(homeStyle)});for(const url of scripts){await idle();await loadScript(url)}
        const deadline=performance.now()+15000;while(!window.KB_PAGE){if(performance.now()>deadline)throw new Error('Page initialization timeout');await new Promise(resolve=>setTimeout(resolve,20))}resolveReady();
      }catch{rejectReady(new Error('Portfolio resources could not be loaded. Please reload.'))}
    },150)};
    if(window.PerformanceObserver&&PerformanceObserver.supportedEntryTypes.includes('paint')){
      const firstPaint=new PerformanceObserver(list=>{if(list.getEntries().some(entry=>entry.name==='first-contentful-paint')){firstPaint.disconnect();start()}});
      firstPaint.observe({type:'paint',buffered:true});
    }else document.fonts.ready.then(()=>requestAnimationFrame(()=>requestAnimationFrame(start)));
    window.KB_SITE_READY.catch(()=>{});`;
  const bootResult=await minify(boot,{compress:true,mangle:false});
  const bootUrl=emit('portfolio-boot.js',bootResult.code);
  for(const file of files.filter(file=>file.endsWith('.html'))) {
    let html=read(file);
    if(icon&&!/<link[^>]*rel=["'](?:shortcut )?icon["']/.test(html))html=html.replace('</head>',icon+'</head>');
    if(file==='index.html') {
      html=html.replace(/<link rel="stylesheet"[^>]*>\s*/g,'').replace(/<script src="[^"]+" defer><\/script>\s*/g,'');
      html=html.replace('</head>',`<link rel="preload" href="${assets['/assets/fonts/VT323-Regular.woff2']}" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="${criticalUrl}"></head>`);
      html=html.replace('</body>',`<script src="${bootUrl}" defer></script><script src="${assets['/intro.js']}" defer></script></body>`);
    }else if(/<script[^>]+src=/.test(html)) {
      html=html.replace(/(<script[^>]+src=)/,`<script src="${runtimeUrl}" defer></script>$1`);
    }
    fs.writeFileSync(path.join(directory,file),rewrite(html));
  }
  // Useful for reproducible build and deployment checks; contains public URLs only.
  fs.writeFileSync(path.join(directory,'asset-manifest.json'),JSON.stringify(assets,null,2));
  return {versioned:Object.keys(assets).length,criticalBytes:fs.statSync(path.join(directory,criticalUrl)).size};
}
