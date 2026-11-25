(() => {
  'use strict';
  const activateDeferredStyles=()=>document.querySelectorAll('link[data-kb-deferred-style]').forEach(link=>{link.media='all';link.removeAttribute('data-kb-deferred-style')});
  if(document.querySelector('link[data-kb-deferred-style]')){
    window.addEventListener('load',activateDeferredStyles,{once:true});
    document.addEventListener('pointerdown',activateDeferredStyles,{once:true,passive:true});
    document.addEventListener('keydown',activateDeferredStyles,{once:true});
  }
  const host=document.querySelector('#screen,.kbs-static-screen,.kb-static-screen,.kbi-static-screen,.static-page');
  if(!host)return;
  const root=document.createElement('div');root.className='kb-ai-root';
  root.innerHTML=`<div class="kb-ai-warm" aria-hidden="true"></div>
    <button type="button" class="kb-ai-orb" aria-label="Open Kunal Builds AI assistant"></button>
    <span class="kb-ai-tip" aria-hidden="true">Ask me anything.</span>
    <section class="kb-ai-stage" role="dialog" aria-modal="true" aria-label="Kunal Builds AI assistant" inert>
      <div class="kb-ai-topline"><button type="button" class="kb-ai-close" aria-label="Close assistant"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg></button><span class="kb-ai-brand"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0.8 14.15 9.85 23.2 12l-9.05 2.15L12 23.2l-2.15-9.05L.8 12l9.05-2.15L12 .8Z"/></svg>AI Assistant</span></div>
      <div class="kb-ai-need-help" aria-hidden="true">Need help?</div>
      <div class="kb-ai-conversation" aria-live="polite"></div>
      <form class="kb-ai-form"><span class="kb-ai-search" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="7.6"/><path d="m16.5 16.5 5 5"/></svg></span><label class="kb-ai-label" for="kbAiInput" style="position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)">Ask Kunal Builds assistant</label><input id="kbAiInput" class="kb-ai-input" type="text" maxlength="1500" autocomplete="off" placeholder="Ask anything you want"><button class="kb-ai-send" type="submit" aria-label="Send question"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7"/></svg></button></form>
      <details class="kb-ai-disclosure"><summary aria-label="AI assistant information and privacy"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 10.8v5.4M12 7.7h.01"/></svg></summary><p>Questions are processed by Groq and AI can make mistakes. Do not share passwords, API keys, payment details or confidential information. Groq may retain limited data for service reliability.</p></details>
    </section>`;
  document.body.append(root);
  const orb=root.querySelector('.kb-ai-orb'),tip=root.querySelector('.kb-ai-tip'),stage=root.querySelector('.kb-ai-stage'),conversation=root.querySelector('.kb-ai-conversation'),form=root.querySelector('.kb-ai-form'),input=root.querySelector('.kb-ai-input'),send=root.querySelector('.kb-ai-send'),closeButton=root.querySelector('.kb-ai-close'),needHelp=root.querySelector('.kb-ai-need-help');
  let open=false,responding=false,controller=null,renderer=null,history=[],currentAnswer='',currentTurn=null,previousFocus=null,hostWasInert=false,videoWasPlaying=false,tooltipTimer=0,ready=false;
  const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
  const sessionId=crypto.randomUUID();
  const clamp=(min,value,max)=>Math.min(max,Math.max(min,value));
  const viewport=()=>window.visualViewport||{height:innerHeight,offsetTop:0};
  let geometry={width:innerWidth,height:innerHeight,closed:{x:20,y:innerHeight-145,size:58}};

  function layout(){
    const rect=host.getBoundingClientRect(),visual=viewport();
    const top=Math.max(rect.top,visual.offsetTop||0),bottom=Math.min(rect.bottom,(visual.offsetTop||0)+visual.height);
    const height=Math.max(230,bottom-top),width=rect.width;
    root.style.setProperty('--ai-screen-x',`${rect.left}px`);root.style.setProperty('--ai-screen-y',`${top}px`);root.style.setProperty('--ai-screen-w',`${width}px`);root.style.setProperty('--ai-screen-h',`${height}px`);
    root.style.setProperty('--ai-radius',getComputedStyle(host).borderRadius||'5vw');
    const size=clamp(52,width<500?54:58,64);
    geometry={width,height,closed:{x:width<500?18:30,y:height-size-(width<500?92:92),size}};
    const target=open?position(responding||root.classList.contains('has-answer')?'answer':'center'):geometry.closed;
    positionOrb(target,false);
    tip.style.left=`${geometry.closed.x}px`;tip.style.top=`${Math.max(5,geometry.closed.y-38)}px`;
    if(open&&!root.classList.contains('help-dismissed'))positionHelp(position(responding?'answer':'center'));
    renderer?.resize();
  }
  function position(kind){
    const {width,height}=geometry;
    if(kind==='answer'){
      const size=clamp(96,Math.min(width*.3,height*.23,168),168);
      return {x:(width-size)/2,y:Math.max(40,height*.11),size};
    }
    const mobile=width<650;
    const size=mobile?clamp(170,Math.min(width*.7,height*.34,330),330):clamp(170,Math.min(width*.61,height*.51,540),540);
    return {x:(width-size)/2,y:Math.max(mobile?74:60,(height-size)*(mobile?.29:.39)),size};
  }
  function positionHelp(target){
    const bubbleWidth=needHelp.offsetWidth||154,bubbleHeight=needHelp.offsetHeight||54;
    const gap=geometry.width<650?10:14;
    const x=clamp(gap,target.x+target.size*.94,geometry.width-bubbleWidth-gap);
    const maxY=Math.max(52,geometry.height-bubbleHeight-(geometry.width<650?155:125));
    const y=clamp(52,target.y-bubbleHeight*.52,maxY);
    needHelp.style.left=`${x}px`;needHelp.style.top=`${y}px`;
  }
  function positionOrb(target,animate=true){
    const before=orb.getBoundingClientRect();
    orb.getAnimations().forEach(animation=>animation.cancel());
    orb.style.left=`${target.x}px`;orb.style.top=`${target.y}px`;orb.style.width=`${target.size}px`;orb.style.height=`${target.size}px`;
    if(animate&&!reduced&&before.width){
      const after=orb.getBoundingClientRect();
      orb.animate([{transform:`translate(${before.left-after.left}px,${before.top-after.top}px) scale(${before.width/after.width})`},{transform:'translate(0,0) scale(1)'}],{duration:540,easing:'cubic-bezier(.18,.8,.18,1)'});
    }
    if(open&&!root.classList.contains('help-dismissed'))positionHelp(target);
  }
  function showTooltip(){
    if(open||!ready)return;
    root.classList.add('show-tip');clearTimeout(tooltipTimer);tooltipTimer=setTimeout(()=>root.classList.remove('show-tip'),3300);
  }
  function enable(){
    if(ready)return;ready=true;root.classList.add('is-ready');
    if(!sessionStorage.getItem('kbAiTipSeen')){sessionStorage.setItem('kbAiTipSeen','1');setTimeout(showTooltip,900)}
    setTimeout(loadOrb,400);
  }
  let loadingOrb=false,orbVisible=true;
  async function loadOrb(){
    if(renderer||loadingOrb||!ready||!orbVisible||document.hidden)return;
    loadingOrb=true;
    try{const module=await import('/assets/js/ai-orb.js');renderer=module.createOrb(orb);renderer.setState('idle');if(!orbVisible)renderer.pause()}catch{/* CSS liquid fallback remains */}finally{loadingOrb=false}
  }
  const orbVisibility=new IntersectionObserver(entries=>{
    orbVisible=entries[0]?.isIntersecting??false;
    if(orbVisible){if(renderer)renderer.resume();else loadOrb()}else renderer?.pause();
  });orbVisibility.observe(orb);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)loadOrb()});
  function openAssistant(){
    if(open||!ready)return;open=true;previousFocus=document.activeElement;
    root.classList.toggle('has-answer',conversation.childElementCount>0);
    root.classList.remove('show-tip');if(!root.classList.contains('has-answer')&&!input.value)root.classList.remove('help-dismissed');root.classList.add('is-open');stage.inert=false;document.documentElement.classList.add('kb-ai-active');
    hostWasInert=host.inert;host.inert=true;host.dataset.kbAiInert='1';
    const video=document.getElementById('kbPortfolioVideo');videoWasPlaying=Boolean(video&&!video.paused);if(videoWasPlaying)video.pause();
    const target=position(root.classList.contains('has-answer')?'answer':'center');
    positionOrb(target);positionHelp(target);renderer?.setState('opening');
    setTimeout(()=>renderer?.setState('idle'),560);
    setTimeout(()=>input.focus({preventScroll:true}),reduced?0:400);
  }
  function closeAssistant(){
    if(!open)return;if(controller)setStatus('Generation stopped.');controller?.abort();controller=null;open=false;resetGenerationControls();
    if(currentTurn)currentTurn.stop.disabled=true;
    root.classList.remove('is-open','has-answer');stage.inert=true;document.documentElement.classList.remove('kb-ai-active');
    positionOrb(geometry.closed);renderer?.setState('idle');
    host.inert=hostWasInert;delete host.dataset.kbAiInert;window.KB_SCHEDULE_RENDER?.();
    const video=document.getElementById('kbPortfolioVideo');if(videoWasPlaying&&video)video.play().catch(()=>{});
    orb.focus({preventScroll:true});
  }
  const readableText=text=>String(text).replace(/\*\*([^*\n]+)\*\*/g,'$1').replace(/__([^_\n]+)__/g,'$1');
  function textBlock(container,text){
    container.replaceChildren();
    const lines=readableText(text).split('\n');let list=null,paragraph=[];
    const flush=()=>{if(paragraph.length){const p=document.createElement('p');p.textContent=paragraph.join(' ');container.append(p);paragraph=[]}};
    for(const raw of lines){const line=raw.trim();
      if(!line){flush();list=null;continue}
      if(/^#{1,3}\s+/.test(line)){flush();list=null;const h=document.createElement('h3');h.textContent=line.replace(/^#{1,3}\s+/,'');container.append(h);continue}
      if(/^[-*]\s+/.test(line)){flush();if(!list){list=document.createElement('ul');container.append(list)}const item=document.createElement('li');item.textContent=line.slice(2);list.append(item);continue}
      list=null;paragraph.push(line);
    }flush();
  }
  function setStatus(message,error=false){
    if(!currentTurn)return;currentTurn.status.textContent=message;currentTurn.status.style.color=error?'#fff3a0':'';
    renderer?.setState(error?'error':responding?'thinking':'idle');
  }
  function resetGenerationControls(){responding=false;send.disabled=false;send.setAttribute('aria-label','Send question');form.removeAttribute('aria-busy');root.classList.remove('is-busy')}
  function addTurn(question){
    const section=document.createElement('section');section.className='kb-ai-turn';
    const q=document.createElement('p');q.className='kb-ai-question';q.textContent=question;
    const answer=document.createElement('div');answer.className='kb-ai-answer';
    const status=document.createElement('p');status.className='kb-ai-status';status.setAttribute('role','status');
    const links=document.createElement('div');links.className='kb-ai-links';
    const actions=document.createElement('div');actions.className='kb-ai-actions';
    const copy=document.createElement('button');copy.type='button';copy.className='kb-ai-tool kb-ai-copy';copy.textContent='Copy response';copy.disabled=true;
    copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(answer.dataset.plain||'');copy.textContent='Copied';setTimeout(()=>copy.textContent='Copy response',1800)}catch{copy.textContent='Copy unavailable'}});
    const stop=document.createElement('button');stop.type='button';stop.className='kb-ai-tool kb-ai-stop';stop.textContent='Stop generation';stop.addEventListener('click',()=>controller?.abort());
    const clear=document.createElement('button');clear.type='button';clear.className='kb-ai-tool';clear.textContent='Clear conversation';clear.addEventListener('click',clearConversation);
    actions.append(copy,stop,clear);section.append(q,answer,status,links,actions);conversation.append(section);
    currentTurn={answer,status,links,copy,stop};conversation.scrollTop=conversation.scrollHeight;
  }
  function renderLinks(items){
    if(!currentTurn||!Array.isArray(items))return;
    currentTurn.links.replaceChildren();
    for(const item of items.slice(0,window.innerWidth<380?2:4)){
      if(typeof item?.route!=='string'||!/^\/(?:about|projects|services|who-is-kunal|contact)(?:\/[a-z0-9-]+)?\/$/.test(item.route)||typeof item.label!=='string'||item.label.length>90)continue;
      const link=document.createElement('a');link.href=item.route;link.textContent=item.label;
      link.addEventListener('click',event=>{
        if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
        event.preventDefault();event.stopPropagation();closeAssistant();
        if(item.route==='/contact/'){location.assign(item.route);return}
        const projectId=typeof item.projectId==='string'&&/^[a-z0-9-]{2,80}$/.test(item.projectId)?item.projectId:'';
        if(typeof window.KB_NAVIGATE==='function'){
          window.KB_NAVIGATE(item.route);
          if(projectId){
            const find=()=>{const archive=document.getElementById('ipProjects'),search=document.getElementById('ipSearch');if(!archive||archive.hidden||!search)return false;search.value=item.label;search.dispatchEvent(new Event('input',{bubbles:true}));search.focus({preventScroll:true});return true};
            if(!find()){const observer=new MutationObserver(()=>{if(find())observer.disconnect()});observer.observe(document.body,{subtree:true,attributes:true,attributeFilter:['hidden']});setTimeout(()=>observer.disconnect(),3000)}
          }
        }else location.href=item.route+(projectId?`?q=${encodeURIComponent(item.label)}`:'');
      });
      currentTurn.links.append(link);
    }
  }
  async function submit(event){
    event.preventDefault();
    if(controller)return;
    const message=input.value.trim();if(!message)return;
    if(message.length>1500){input.setCustomValidity('Maximum 1,500 characters.');input.reportValidity();return}
    input.setCustomValidity('');root.classList.add('help-dismissed');input.value='';
    const previous=history.slice(-6);
    addTurn(message);root.classList.add('has-answer');responding=true;positionOrb(position('answer'));renderer?.setState('thinking');
    setStatus('Thinking…');send.disabled=true;send.setAttribute('aria-label','Generating response');form.setAttribute('aria-busy','true');root.classList.add('is-busy');
    controller=new AbortController();const active=controller;currentAnswer='';
    const started=performance.now();let firstToken=null,completed=false;
    try{
      const page=location.pathname.endsWith('/')?location.pathname:location.pathname+'/';
      const response=await fetch('/api/assistant/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message,history:previous,page,sessionId}),signal:active.signal});
      if(controller!==active){await response.body?.cancel().catch(()=>{});return}
      if(!response.ok){let info={};try{info=await response.json()}catch{}throw new Error(typeof info.message==='string'?info.message:'The assistant is temporarily unavailable.')}
      if(!response.body)throw new Error('The response could not be streamed.');
      const reader=response.body.getReader(),decoder=new TextDecoder();let buffer='';
      while(true){const {value,done}=await reader.read();if(controller!==active){await reader.cancel().catch(()=>{});return}if(done)break;buffer+=decoder.decode(value,{stream:true});if(buffer.length>65536)throw new Error('Response interrupted.');
        while(true){const end=buffer.indexOf('\n\n');if(end<0)break;const frame=buffer.slice(0,end);buffer=buffer.slice(end+2);
          const type=frame.match(/^event:\s*([^\n]+)/m)?.[1];const data=frame.match(/^data:\s*(.*)$/m)?.[1];if(!type||!data)continue;
          let payload;try{payload=JSON.parse(data)}catch{continue}
          if(type==='links')renderLinks(payload.items);
          if(type==='token'&&typeof payload.text==='string'){if(firstToken===null)firstToken=performance.now()-started;currentAnswer+=payload.text;currentTurn.answer.dataset.plain=readableText(currentAnswer);textBlock(currentTurn.answer,currentAnswer);setStatus('');renderer?.setState('responding');conversation.scrollTop=conversation.scrollHeight}
          if(type==='error')throw new Error(payload.message||'The response was interrupted.');
          if(type==='done')completed=true;
        }
      }
      if(!completed||!currentAnswer.trim())throw new Error('The response was interrupted. Please try again.');
      history=[...previous,{role:'user',content:message},{role:'assistant',content:currentAnswer}].slice(-6);
      currentTurn.copy.disabled=false;setStatus('');renderer?.setState('idle');
      conversation.scrollTop=currentTurn.answer.parentElement.offsetTop;
      root.dataset.kbAiFirstTokenMs=String(Math.round(firstToken||0));
    }catch(error){
      if(controller!==active)return;
      if(active.signal.aborted)setStatus('Generation stopped.');
      else setStatus(error.message||'The assistant is temporarily unavailable.',true);
      if(currentTurn)conversation.scrollTop=currentTurn.answer.parentElement.offsetTop;
    }finally{if(controller===active){if(currentTurn)currentTurn.stop.disabled=true;controller=null;resetGenerationControls();if(open)input.focus({preventScroll:true})}}
  }
  function clearConversation(){controller?.abort();controller=null;resetGenerationControls();history=[];currentAnswer='';currentTurn=null;conversation.replaceChildren();root.classList.remove('has-answer','help-dismissed');positionOrb(position('center'));renderer?.setState('idle');input.focus({preventScroll:true})}
  orb.addEventListener('click',()=>open?input.focus({preventScroll:true}):openAssistant());
  orb.addEventListener('pointerenter',()=>{if(!open)renderer?.setState('hover')});orb.addEventListener('pointerleave',()=>{if(!open)renderer?.setState('idle')});
  closeButton.addEventListener('click',closeAssistant);form.addEventListener('submit',submit);input.addEventListener('input',()=>{if(input.value)root.classList.add('help-dismissed')});
  window.addEventListener('keydown',event=>{
    if(!open)return;
    if(event.key==='Escape'){event.preventDefault();event.stopImmediatePropagation();closeAssistant();return}
    if(event.key==='Tab'){
      const focusable=[...stage.querySelectorAll('button:not([disabled]),input:not([disabled]),a[href],summary')].filter(element=>element.getClientRects().length);
      if(!focusable.length)return;
      const first=focusable[0],last=focusable.at(-1);
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
    }
  },true);
  const resizeObserver=new ResizeObserver(layout);resizeObserver.observe(host);window.addEventListener('resize',layout);window.visualViewport?.addEventListener('resize',layout);layout();
  if(location.pathname==='/projects/'&&new URLSearchParams(location.search).has('q')){
    const name=new URLSearchParams(location.search).get('q').toLowerCase();
    const card=[...document.querySelectorAll('.static-card')].find(item=>item.querySelector('h2')?.textContent.toLowerCase()===name);
    if(card){card.style.outline='2px solid #c4ff36';card.style.outlineOffset='4px';setTimeout(()=>card.scrollIntoView({block:'center'}),180)}
  }
  if(host.id==='screen'&&host.classList.contains('kb-intro-running')){
    const observer=new MutationObserver(()=>{if(!host.classList.contains('kb-intro-running')){observer.disconnect();enable()}});
    observer.observe(host,{attributes:true,attributeFilter:['class']});
  }else enable();
  window.addEventListener('pagehide',()=>renderer?.dispose(),{once:true});
})();
