const vertex=`attribute vec2 a_pos;varying vec2 v_uv;void main(){v_uv=a_pos*.5+.5;gl_Position=vec4(a_pos,0.,1.);}`;
const fragment=`precision mediump float;varying vec2 v_uv;uniform float u_time;uniform float u_activity;uniform float u_error;uniform vec2 u_resolution;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<3;i++){v+=a*noise(p);p=p*2.01+vec2(4.7,2.9);a*=.5;}return v;}
void main(){
  vec2 uv=v_uv*2.-1.;float radius=length(uv);float speed=.075+.12*u_activity;float t=u_time*speed;
  vec2 p=uv*1.08;float n1=fbm(p*1.45+vec2(t*.72,-t*.43));float n2=fbm(p*1.3+vec2(-t*.5,t*.62)+n1*.35);
  vec2 q=p+vec2(n1-.5,n2-.5)*.62;
  q+=.12*vec2(sin(q.y*2.2+t*.38)+.45*cos(q.x*2.0-t*.29),cos(q.x*1.9-t*.31)+.42*sin(q.y*2.1+t*.25));
  float greenEdge=q.x*.9+q.y*.39+.22*sin(q.y*2.35+q.x*1.15+t*.31)+.10*sin(q.y*3.7-q.x*.9-t*.19)+.12*(n1-.5);
  float greenMask=1.-smoothstep(-.17,.36,greenEdge);
  float lower=-q.y+.19*sin(q.x*2.05+t*.27)+.12*sin(q.y*1.55-q.x*1.25-t*.2)+.16*q.x+.09*(n2-.5);
  float orangeMask=smoothstep(.31,.94,lower)*.78;
  float fold=q.y+.34*q.x+.19*sin(q.x*2.35+t*.27)+.10*sin(q.y*2.0-q.x*1.2-t*.2);
  float foldWave=.5+.5*sin(fold*2.3+.25*sin(q.x*1.6+t*.23));
  float pinkLight=clamp(.48+.40*foldWave+.12*(n2-.5),0.,1.);
  vec3 deepPink=vec3(.788,.141,.400);
  vec3 hotPink=vec3(1.,.078,.576);
  vec3 magenta=vec3(.914,.086,.506);
  vec3 green=vec3(.749,.969,.015);
  vec3 lime=vec3(.843,1.,.141);
  vec3 gold=vec3(1.,.847,.353);
  vec3 orange=vec3(1.,.455,.224);
  vec3 color=mix(deepPink,hotPink,pinkLight);
  color=mix(color,magenta,.18*(1.-greenMask)*smoothstep(.15,.9,n1));
  color=mix(color,green,greenMask*.94);
  color=mix(color,lime,greenMask*.22*foldWave);
  color=mix(color,orange,orangeMask);
  float greenFold=.5+.5*sin(fold*1.8+.25*sin(q.x*1.45+t*.22));
  vec3 greenDepth=vec3(.48,.78,.015);
  color=mix(color,greenDepth,greenMask*(1.-greenFold)*.18*(1.-orangeMask));
  float greenGlow=exp(-abs(greenEdge+.015)*20.)*.72;
  float silkGlow=exp(-abs(fold-.07)*18.)*.52+exp(-abs(fold+.39)*13.)*.16;
  color=mix(color,gold,clamp(greenGlow*.72+silkGlow*.57,0.,.76));
  color*=.86+.14*foldWave;
  vec3 normal=normalize(vec3(uv,sqrt(max(.012,1.-radius*radius))));
  vec3 light=normalize(vec3(-.42,.58,.72));
  float diffuse=.91+.09*max(dot(normal,light),0.);
  float softSpec=pow(max(dot(normal,normalize(vec3(-.48,.66,.7))),0.),14.)*.075;
  color=color*diffuse+vec3(1.,.72,.63)*softSpec;
  float rim=exp(-pow((radius-.963)*82.,2.));
  vec3 rimColor=mix(gold,vec3(1.,.25,.57),smoothstep(-.48,.48,uv.y));
  color+=rimColor*rim*.82;
  color=mix(color,vec3(.82,.11,.31),u_error*.24);
  float alpha=1.-smoothstep(.99,1.005,radius);
  gl_FragColor=vec4(color,alpha);
}`;
const compile=(gl,type,source)=>{const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){gl.deleteShader(shader);throw new Error('shader_compile')}return shader};

export function createOrb(button){
  const canvas=document.createElement('canvas');canvas.setAttribute('aria-hidden','true');button.prepend(canvas);
  let gl,program,buffer,time=0,last=0,frame=0,timer=0,active=true,activity=.15,error=0,reduced=matchMedia('(prefers-reduced-motion:reduce)').matches,lost=false,resizeObserver;
  const setup=()=>{
    gl=canvas.getContext('webgl',{alpha:true,antialias:false,premultipliedAlpha:false,preserveDrawingBuffer:false,powerPreference:'low-power'});
    if(!gl)return false;
    const vs=compile(gl,gl.VERTEX_SHADER,vertex),fs=compile(gl,gl.FRAGMENT_SHADER,fragment);
    program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);gl.deleteShader(vs);gl.deleteShader(fs);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error('shader_link');
    buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
    gl.useProgram(program);const position=gl.getAttribLocation(program,'a_pos');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
    button.classList.add('has-webgl');return true;
  };
  const resize=()=>{
    if(!gl||lost)return;
    const size=button.clientWidth;
    const dpr=Math.min(devicePixelRatio||1,size<90?1:1.5);
    const pixels=Math.max(32,Math.min(460,Math.round(size*dpr)));
    if(canvas.width!==pixels){canvas.width=pixels;canvas.height=pixels;gl.viewport(0,0,pixels,pixels)}
    if(reduced)draw(performance.now());
  };
  const draw=now=>{
    if(!gl||lost)return;
    if(!last)last=now;
    const elapsed=Math.min(.15,(now-last)/1000);last=now;
    if(!reduced)time+=elapsed;
    gl.useProgram(program);
    gl.uniform1f(gl.getUniformLocation(program,'u_time'),time);
    gl.uniform1f(gl.getUniformLocation(program,'u_activity'),activity);
    gl.uniform1f(gl.getUniformLocation(program,'u_error'),error);
    gl.uniform2f(gl.getUniformLocation(program,'u_resolution'),canvas.width,canvas.height);
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
  };
  const tick=now=>{
    frame=0;
    if(!active||document.hidden||lost||reduced)return;
    draw(now);
    if(button.closest('.kb-ai-root')?.classList.contains('is-open'))frame=requestAnimationFrame(tick);
    else timer=setTimeout(()=>{timer=0;frame=requestAnimationFrame(tick)},66);
  };
  const resume=()=>{if(active&&!document.hidden&&!lost&&!reduced&&!frame&&!timer)frame=requestAnimationFrame(tick)};
  const visibility=()=>{if(document.hidden){cancelAnimationFrame(frame);clearTimeout(timer);frame=0;timer=0;last=0}else resume()};
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();lost=true;button.classList.remove('has-webgl');cancelAnimationFrame(frame);clearTimeout(timer);frame=0;timer=0});
  canvas.addEventListener('webglcontextrestored',()=>{lost=false;try{setup();resize();resume()}catch{button.classList.remove('has-webgl')}});
  try{if(setup()){resizeObserver=new ResizeObserver(resize);resizeObserver.observe(button);resize();resume()}}catch{button.classList.remove('has-webgl')}
  document.addEventListener('visibilitychange',visibility);
  return {setState(state){activity=state==='thinking'?1:state==='responding'?.68:state==='hover'?.45:.15;error=state==='error'?1:0;if(reduced)draw(performance.now())},pause(){active=false;cancelAnimationFrame(frame);clearTimeout(timer);frame=0;timer=0;last=0},resume(){active=true;resume()},resize,dispose(){active=false;cancelAnimationFrame(frame);clearTimeout(timer);resizeObserver?.disconnect();document.removeEventListener('visibilitychange',visibility);if(gl&&!lost){gl.deleteBuffer(buffer);gl.deleteProgram(program)}}};
}
