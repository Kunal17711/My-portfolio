import fs from 'node:fs';
import path from 'node:path';

const escapeXml=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const escaped=value=>String(value).replace(/[&<>"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[char]));
export function prepareSeo(publicRoot,rawOrigin,{indexable=true}={}){
  const origin=String(rawOrigin||'').trim().replace(/\/+$/,'');
  if(origin&&(!/^https:\/\/[^/?#]+$/i.test(origin)||/localhost|127\.0\.0\.1|example\./i.test(origin)))throw new Error('KB_PUBLIC_URL must be the verified production HTTPS origin.');
  const pages=[];
  function collect(directory){
    for(const entry of fs.readdirSync(directory,{withFileTypes:true})){
      const full=path.join(directory,entry.name);
      if(entry.isDirectory())collect(full);
      else if(entry.isFile()&&entry.name==='index.html')pages.push(full);
    }
  }
  collect(publicRoot);
  for(const file of pages){
    const relative=path.relative(publicRoot,file).split(path.sep).join('/');
    const route=relative==='index.html'?'/':'/'+relative.replace(/index\.html$/,'');
    let html=fs.readFileSync(file,'utf8');
    const robots=`<meta name="robots" content="${origin&&indexable?'index,follow,max-image-preview:large':'noindex,nofollow'}">`;
    html=/<meta\s+name="robots"/i.test(html)?html.replace(/<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,robots):html.replace(/<\/head>/i,robots+'</head>');
    html=html.replace(/<link\s+rel="canonical"[^>]*>\s*/gi,'').replace(/<meta\s+property="og:url"[^>]*>\s*/gi,'').replace(/<meta\s+property="og:image"[^>]*>\s*/gi,'').replace(/<meta\s+name="twitter:image"[^>]*>\s*/gi,'');
    if(origin){
      const absolute=origin+route;
      const image=html.match(/<img[^>]*class="kb-case-hero"[^>]*src="([^"]+)"/i)?.[1]||'/assets/images/profile.webp';
      const metadata=`<link rel="canonical" href="${escaped(absolute)}"><meta property="og:url" content="${escaped(absolute)}"><meta property="og:image" content="${escaped(origin+image)}"><meta name="twitter:image" content="${escaped(origin+image)}">`;
      html=html.replace(/<\/head>/i,metadata+'</head>');
    }
    html=html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi,(whole,json)=>{
      let schema;try{schema=JSON.parse(json)}catch{return whole}
      const personId=origin?origin+'/#person':null;
      const enrich=value=>{
        if(!value||typeof value!=='object')return;
        if(Array.isArray(value)){value.forEach(enrich);return}
        if(value['@type']==='Person'){if(personId)value['@id']=personId;else delete value['@id']}
        if(value['@type']==='WebSite'){if(origin){value['@id']=origin+'/#website';value.url=origin+'/'}else{delete value['@id'];delete value.url}}
        if(['CreativeWork','Service','ProfilePage'].includes(value['@type'])){if(origin)value.url=origin+route;else delete value.url}
        for(const nested of Object.values(value))enrich(nested);
      };
      enrich(schema);
      const graph=Array.isArray(schema['@graph'])?schema['@graph']:[schema];
      if(origin&&route!=='/'&&!graph.some(item=>item['@type']==='BreadcrumbList')){
        const segments=route.split('/').filter(Boolean);
        const title=html.match(/<title>(.*?)<\/title>/i)?.[1]?.split('|')[0]?.trim()||segments.at(-1);
        graph.push({'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:origin+'/'},...segments.map((segment,index)=>({'@type':'ListItem',position:index+2,name:index===segments.length-1?title:segment==='projects'?'Projects':segment==='services'?'Services':segment,item:origin+'/'+segments.slice(0,index+1).join('/')+'/'}))]});
        schema={'@context':schema['@context']||'https://schema.org','@graph':graph};
      }
      return `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script>`;
    });
    if(origin&&!html.includes('type="application/ld+json"')){
      const title=html.match(/<title>(.*?)<\/title>/i)?.[1]?.split('|')[0]?.trim()||'Kunal Builds';
      const type=route==='/about/'?'AboutPage':route==='/contact/'?'ContactPage':'CollectionPage';
      const schema={'@context':'https://schema.org','@graph':[{'@type':type,name:title,url:origin+route,about:{'@type':'Person','@id':origin+'/#person',name:'Kunal'}},{'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:origin+'/'},{'@type':'ListItem',position:2,name:title,item:origin+route}]}]};
      html=html.replace(/<\/head>/i,`<script type="application/ld+json">${JSON.stringify(schema)}</script></head>`);
    }
    fs.writeFileSync(file,html);
  }
  if(origin){fs.writeFileSync(path.join(publicRoot,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(file=>{const relative=path.relative(publicRoot,file).split(path.sep).join('/');const route=relative==='index.html'?'/':'/'+relative.replace(/index\.html$/,'');return `<url><loc>${escapeXml(origin+route)}</loc></url>`}).join('')}</urlset>`)}
  else if(fs.existsSync(path.join(publicRoot,'sitemap.xml')))fs.unlinkSync(path.join(publicRoot,'sitemap.xml'));
  fs.writeFileSync(path.join(publicRoot,'robots.txt'),`User-agent: *\n${indexable&&origin?'Allow: /':'Disallow: /'}\n${origin?`Sitemap: ${origin}/sitemap.xml\n`:''}`);
  return {origin:origin||null,pages:pages.length};
}
