"use strict";(self["webpackChunkvue2_template"]=self["webpackChunkvue2_template"]||[]).push([[7065],{30687:function(e,t,n){n.r(t),n.d(t,{default:function(){return p}});var a=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"canvas"},on:{click:function(t){e.start=!e.start}}},[t("div",{attrs:{id:"stats"}}),t("div",{attrs:{id:"container"}})])},i=[],s=n(67471),r=n(13826),o=n(43851),l=n(98015),c={name:"CastShadow",data(){return{start:!1}},mounted(){if(this.init(),this.operation(),l.Z.isWebGLAvailable())this.animate();else{const e=l.Z.getWebGLErrorMessage();document.getElementById("container").appendChild(e)}},methods:{init(){this.scene=new s.xsS,this.camera=new s.cPb(75,window.innerWidth/window.innerHeight,.1,1e3),this.renderer=new s.CP7({antialias:!0}),this.renderer.setSize(500,500),document.getElementById("canvas").appendChild(this.renderer.domElement),this.controls=new r.z(this.camera,this.renderer.domElement),this.controls.update(),this.controls.addEventListener("change",(()=>{this.renderer.render(this.scene,this.camera)})),this.stats,this.stats=new o.Z,document.getElementById("stats").appendChild(this.stats.dom),this.stats.domElement.style.position="absolute",this.stats.domElement.style.left="0px",this.stats.domElement.style.top="0px"},operation(){this.camera.position.set(0,10,10),this.camera.lookAt({x:0,y:0,z:0}),this.planeMaterial=new s.xoR({color:7105644}),this.plane=new s.Kj0(new s._12(300,300),this.planeMaterial),this.plane.rotation.x=-Math.PI/2,this.scene.add(this.plane),this.scene.add(new s.Mig(16777215)),this.light=new s.Ox3(16777215,1.75),this.light.position.set(30,10,10),this.light.shadow.camera.top=3,this.light.shadow.camera.right=6,this.light.shadow.camera.bottom=-3,this.light.shadow.camera.left=-2,this.light.shadow.camera.near=20,this.light.shadow.camera.far=35,this.scene.add(this.light);let e=new s.Rki(this.light.shadow.camera);this.scene.add(e);let t=new s.DvJ(1,1,1),n=new s.YBo({color:716511});this.cube=new s.Kj0(t,n),this.cube.position.set(0,0,0);let a=new s.xo$(1,10,10),i=new s.YBo({color:716511});this.cube1=new s.Kj0(a,i),this.cube1.position.set(10,1,0),this.scene.add(this.cube1);const r=new s.y8_(1);this.scene.add(r),this.scene.add(this.cube),this.cube.castShadow=!0,this.cube1.castShadow=!0,this.light.castShadow=!0,this.plane.receiveShadow=!0,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=s.ntZ},animate(){this.controls.update(),this.renderer.render(this.scene,this.camera),this.stats.update(),requestAnimationFrame(this.animate)}}},d=c,h=n(1001),m=(0,h.Z)(d,a,i,!1,null,"714fbfb0",null),p=m.exports},98015:function(e,t){class n{static isWebGLAvailable(){try{const e=document.createElement("canvas");return!(!window.WebGLRenderingContext||!e.getContext("webgl")&&!e.getContext("experimental-webgl"))}catch(e){return!1}}static isWebGL2Available(){try{const e=document.createElement("canvas");return!(!window.WebGL2RenderingContext||!e.getContext("webgl2"))}catch(e){return!1}}static isColorSpaceAvailable(e){try{const t=document.createElement("canvas"),n=window.WebGL2RenderingContext&&t.getContext("webgl2");return n.drawingBufferColorSpace=e,n.drawingBufferColorSpace===e}catch(t){return!1}}static getWebGLErrorMessage(){return this.getErrorMessage(1)}static getWebGL2ErrorMessage(){return this.getErrorMessage(2)}static getErrorMessage(e){const t={1:"WebGL",2:"WebGL 2"},n={1:window.WebGLRenderingContext,2:window.WebGL2RenderingContext};let a='Your $0 does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">$1</a>';const i=document.createElement("div");return i.id="webglmessage",i.style.fontFamily="monospace",i.style.fontSize="13px",i.style.fontWeight="normal",i.style.textAlign="center",i.style.background="#fff",i.style.color="#000",i.style.padding="1.5em",i.style.width="400px",i.style.margin="5em auto 0",a=n[e]?a.replace("$0","graphics card"):a.replace("$0","browser"),a=a.replace("$1",t[e]),i.innerHTML=a,i}}t.Z=n},43851:function(e,t){var n=function(){var e=0,t=document.createElement("div");function a(e){return t.appendChild(e.dom),e}function i(n){for(var a=0;a<t.children.length;a++)t.children[a].style.display=a===n?"block":"none";e=n}t.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",t.addEventListener("click",(function(n){n.preventDefault(),i(++e%t.children.length)}),!1);var s=(performance||Date).now(),r=s,o=0,l=a(new n.Panel("FPS","#0ff","#002")),c=a(new n.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var d=a(new n.Panel("MB","#f08","#201"));return i(0),{REVISION:16,dom:t,addPanel:a,showPanel:i,begin:function(){s=(performance||Date).now()},end:function(){o++;var e=(performance||Date).now();if(c.update(e-s,200),e>=r+1e3&&(l.update(1e3*o/(e-r),100),r=e,o=0,d)){var t=performance.memory;d.update(t.usedJSHeapSize/1048576,t.jsHeapSizeLimit/1048576)}return e},update:function(){s=this.end()},domElement:t,setMode:i}};n.Panel=function(e,t,n){var a=1/0,i=0,s=Math.round,r=s(window.devicePixelRatio||1),o=80*r,l=48*r,c=3*r,d=2*r,h=3*r,m=15*r,p=74*r,u=30*r,w=document.createElement("canvas");w.width=o,w.height=l,w.style.cssText="width:80px;height:48px";var f=w.getContext("2d");return f.font="bold "+9*r+"px Helvetica,Arial,sans-serif",f.textBaseline="top",f.fillStyle=n,f.fillRect(0,0,o,l),f.fillStyle=t,f.fillText(e,c,d),f.fillRect(h,m,p,u),f.fillStyle=n,f.globalAlpha=.9,f.fillRect(h,m,p,u),{dom:w,update:function(l,g){a=Math.min(a,l),i=Math.max(i,l),f.fillStyle=n,f.globalAlpha=1,f.fillRect(0,0,o,m),f.fillStyle=t,f.fillText(s(l)+" "+e+" ("+s(a)+"-"+s(i)+")",c,d),f.drawImage(w,h+r,m,p-r,u,h,m,p-r,u),f.fillRect(h+p-r,m,r,u),f.fillStyle=n,f.globalAlpha=.9,f.fillRect(h+p-r,m,r,s((1-l/g)*u))}}},t.Z=n}}]);
//# sourceMappingURL=CastShadow.68b8d9c9.js.map