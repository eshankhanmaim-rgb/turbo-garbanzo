(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,766167,e=>{"use strict";var t=e.i(843476),r=e.i(271645);function o(e){let t=parseInt(e.replace("#",""),16);return[(t>>16&255)/255,(t>>8&255)/255,(255&t)/255]}let n=`
precision highp float;
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`,i=`
precision highp float;
varying vec2 v_uv;
uniform float u_zeit;
uniform vec2 u_aufloesung;
uniform vec3 u_farbe1;
uniform vec3 u_farbe2;
uniform vec3 u_farbe3;

vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}

float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

void main(){
  vec2 uv = v_uv;
  float seite = u_aufloesung.x / max(u_aufloesung.y, 1.0);
  vec2 p = vec2(uv.x * seite, uv.y);

  float t = u_zeit * 0.045;
  float n1 = snoise(vec3(p * 1.7, t));
  float n2 = snoise(vec3(p * 2.6 + 4.0, t * 1.25 + 2.0));

  vec3 farbe = mix(u_farbe1, u_farbe2, smoothstep(-0.5, 0.7, n1));
  farbe = mix(farbe, u_farbe3, smoothstep(0.1, 0.9, n2) * 0.55);

  /* Links auslaufen lassen: dort steht der Text, und der braucht eine
     ruhige Flaeche. Die Kachel selbst blendet zusaetzlich per Maske. */
  float links = smoothstep(0.02, 0.42, uv.x);
  gl_FragColor = vec4(farbe, links);
}`;function a(e,t,r){let o=e.createShader(r);if(e.shaderSource(o,t),e.compileShader(o),!e.getShaderParameter(o,e.COMPILE_STATUS))throw Error(e.getShaderInfoLog(o)||"Shader");return o}e.s(["default",0,function({farben:e}){let c=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let t,r=c.current;if(!r||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let s=document.createElement("canvas");Object.assign(s.style,{position:"absolute",inset:"0",width:"100%",height:"100%",display:"block"}),r.appendChild(s);let v=s.getContext("webgl",{antialias:!1,alpha:!0,powerPreference:"low-power"});if(!v)return void r.removeChild(s);try{if(t=v.createProgram(),v.attachShader(t,a(v,n,v.VERTEX_SHADER)),v.attachShader(t,a(v,i,v.FRAGMENT_SHADER)),v.linkProgram(t),!v.getProgramParameter(t,v.LINK_STATUS))throw Error(v.getProgramInfoLog(t)||"Programm")}catch{r.removeChild(s);return}v.useProgram(t);let l=v.createBuffer();v.bindBuffer(v.ARRAY_BUFFER,l),v.bufferData(v.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),v.STATIC_DRAW);let u=v.getAttribLocation(t,"a_pos");v.enableVertexAttribArray(u),v.vertexAttribPointer(u,2,v.FLOAT,!1,0,0);let d=v.getUniformLocation(t,"u_zeit"),m=v.getUniformLocation(t,"u_aufloesung");v.uniform3fv(v.getUniformLocation(t,"u_farbe1"),o(e[0])),v.uniform3fv(v.getUniformLocation(t,"u_farbe2"),o(e[1])),v.uniform3fv(v.getUniformLocation(t,"u_farbe3"),o(e[2]));let x=()=>{let e=r.getBoundingClientRect(),t=Math.max(2,Math.round(.5*e.width)),o=Math.max(2,Math.round(.5*e.height));(s.width!==t||s.height!==o)&&(s.width=t,s.height=o,v.viewport(0,0,t,o),v.uniform2f(m,t,o))};x();let f=!1,h=!1,p=0,y=performance.now(),g=e=>{f&&(v.uniform1f(d,(e-y)/1e3),v.drawArrays(v.TRIANGLES,0,3),p=requestAnimationFrame(g))},b=()=>{f||!h||document.hidden||(f=!0,y=performance.now()-0,p=requestAnimationFrame(g))},_=()=>{f=!1,cancelAnimationFrame(p)},w=new IntersectionObserver(([e])=>{(h=e.isIntersecting)?b():_()},{threshold:.01});w.observe(r);let z=new ResizeObserver(()=>x());z.observe(r);let A=()=>document.hidden?_():b();return document.addEventListener("visibilitychange",A),()=>{_(),w.disconnect(),z.disconnect(),document.removeEventListener("visibilitychange",A),v.getExtension("WEBGL_lose_context")?.loseContext(),r.contains(s)&&r.removeChild(s)}},[e]),(0,t.jsx)("div",{ref:c,className:"sk-held-welle","aria-hidden":"true"})}])},213482,e=>{"use strict";var t=e.i(843476);let r=[32,48,64,96,128,256,384],o=(e,t)=>`/_next/image?url=${encodeURIComponent(e)}&w=${t}&q=40`,n={position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,color:"transparent"};e.s(["MINI_GRUND_BREITEN",0,r,"default",0,function({src:e,sizes:i}){return(0,t.jsx)("img",{alt:"","aria-hidden":"true",loading:"lazy",decoding:"async","data-nimg":"fill",className:"pc-bild-grund object-cover object-center",style:n,sizes:i,srcSet:r.map(t=>`${o(e,t)} ${t}w`).join(", "),src:o(e,r[r.length-1])})},"grundUrl",0,o])}]);