"use strict";(self["webpackChunkvue2_template"]=self["webpackChunkvue2_template"]||[]).push([[2357],{83920:function(e,t,n){n.r(t),n.d(t,{default:function(){return f}});var i=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"canvas"},on:{click:function(t){e.start=!e.start}}},[t("div",{attrs:{id:"stats"}}),t("div",{attrs:{id:"gui"}}),t("div",{attrs:{id:"container"}})])},a=[],r=n(67471),s=n(13826),o=n(43851),l=n(98015),d=n(68831),c=n(86563),h={name:"BlendMateria",data(){return{start:!1,gui:null}},mounted(){if(this.init(),this.operation(),l.Z.isWebGLAvailable())this.animate();else{const e=l.Z.getWebGLErrorMessage();document.getElementById("container").appendChild(e)}},methods:{init(){this.scene=new r.xsS,this.camera=new r.cPb(75,window.innerWidth/window.innerHeight,.1,1e3),this.renderer=new r.CP7({antialias:!0}),this.renderer.setSize(500,500),document.getElementById("canvas").appendChild(this.renderer.domElement),this.controls=new s.z(this.camera,this.renderer.domElement),this.controls.update(),this.controls.addEventListener("change",(()=>{this.renderer.render(this.scene,this.camera)})),this.stats,this.stats=new o.Z,document.getElementById("stats").appendChild(this.stats.dom),this.stats.domElement.style.position="absolute",this.stats.domElement.style.left="0px",this.stats.domElement.style.top="0px",this.gui=new d.XS,document.getElementById("gui").appendChild(this.gui.domElement),this.gui.domElement.style.position="absolute",this.gui.domElement.style.right="0px"},operation(){this.camera.position.set(0,10,10),this.camera.lookAt({x:0,y:0,z:0}),this.planeMaterial=new r.xoR({color:7105644}),this.plane=new r.Kj0(new r._12(300,300),this.planeMaterial),this.plane.rotation.x=-Math.PI/2,this.scene.add(this.plane),this.scene.add(new r.Mig(16777215)),this.light=new r.Ox3(16777215,1.75),this.light.position.set(30,10,10),this.light.shadow.camera.top=3,this.light.shadow.camera.right=6,this.light.shadow.camera.bottom=-3,this.light.shadow.camera.left=-2,this.light.shadow.camera.near=20,this.light.shadow.camera.far=35;let e=new r.DvJ(1,1,1);for(let a=0;a<100;a++){let t=[new r.YBo({color:16777215*Math.random(),flatShading:!0,side:r.ehD,wireframe:!0}),new r.vBJ({color:16777215*Math.random(),wireframe:!1})],n=(0,c.$5)(e,t);n.children[1].scale.set(.99,.99,.99),n.castShadow=!0,n.position.x=20*(2*Math.random()-1),n.position.y=20*(2*Math.random()-1),n.position.z=20*(2*Math.random()-1),n.rotation.x=Math.random()*Math.PI,n.rotation.y=Math.random()*Math.PI,n.rotation.z=Math.random()*Math.PI,this.scene.add(n)}let t=new r.xo$(1,10,10),n=new r.YBo({color:716511});this.cube1=new r.Kj0(t,n),this.cube1.position.set(10,1,0);const i=new r.y8_(1);this.scene.add(i),this.scene.add(this.cube),this.light.castShadow=!0,this.plane.receiveShadow=!0,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=r.ntZ},animate(){this.controls.update();for(var e=0;e<this.scene.children.length;e++)this.scene.children[e].rotation.x+=.02,this.scene.children[e].rotation.y+=.02,this.scene.children[e].rotation.z+=.02;this.renderer.render(this.scene,this.camera),this.stats.update(),requestAnimationFrame(this.animate)}}},m=h,u=n(1001),p=(0,u.Z)(m,i,a,!1,null,"f583d748",null),f=p.exports},98015:function(e,t){class n{static isWebGLAvailable(){try{const e=document.createElement("canvas");return!(!window.WebGLRenderingContext||!e.getContext("webgl")&&!e.getContext("experimental-webgl"))}catch(e){return!1}}static isWebGL2Available(){try{const e=document.createElement("canvas");return!(!window.WebGL2RenderingContext||!e.getContext("webgl2"))}catch(e){return!1}}static isColorSpaceAvailable(e){try{const t=document.createElement("canvas"),n=window.WebGL2RenderingContext&&t.getContext("webgl2");return n.drawingBufferColorSpace=e,n.drawingBufferColorSpace===e}catch(t){return!1}}static getWebGLErrorMessage(){return this.getErrorMessage(1)}static getWebGL2ErrorMessage(){return this.getErrorMessage(2)}static getErrorMessage(e){const t={1:"WebGL",2:"WebGL 2"},n={1:window.WebGLRenderingContext,2:window.WebGL2RenderingContext};let i='Your $0 does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">$1</a>';const a=document.createElement("div");return a.id="webglmessage",a.style.fontFamily="monospace",a.style.fontSize="13px",a.style.fontWeight="normal",a.style.textAlign="center",a.style.background="#fff",a.style.color="#000",a.style.padding="1.5em",a.style.width="400px",a.style.margin="5em auto 0",i=n[e]?i.replace("$0","graphics card"):i.replace("$0","browser"),i=i.replace("$1",t[e]),a.innerHTML=i,a}}t.Z=n},43851:function(e,t){var n=function(){var e=0,t=document.createElement("div");function i(e){return t.appendChild(e.dom),e}function a(n){for(var i=0;i<t.children.length;i++)t.children[i].style.display=i===n?"block":"none";e=n}t.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",t.addEventListener("click",(function(n){n.preventDefault(),a(++e%t.children.length)}),!1);var r=(performance||Date).now(),s=r,o=0,l=i(new n.Panel("FPS","#0ff","#002")),d=i(new n.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var c=i(new n.Panel("MB","#f08","#201"));return a(0),{REVISION:16,dom:t,addPanel:i,showPanel:a,begin:function(){r=(performance||Date).now()},end:function(){o++;var e=(performance||Date).now();if(d.update(e-r,200),e>=s+1e3&&(l.update(1e3*o/(e-s),100),s=e,o=0,c)){var t=performance.memory;c.update(t.usedJSHeapSize/1048576,t.jsHeapSizeLimit/1048576)}return e},update:function(){r=this.end()},domElement:t,setMode:a}};n.Panel=function(e,t,n){var i=1/0,a=0,r=Math.round,s=r(window.devicePixelRatio||1),o=80*s,l=48*s,d=3*s,c=2*s,h=3*s,m=15*s,u=74*s,p=30*s,f=document.createElement("canvas");f.width=o,f.height=l,f.style.cssText="width:80px;height:48px";var g=f.getContext("2d");return g.font="bold "+9*s+"px Helvetica,Arial,sans-serif",g.textBaseline="top",g.fillStyle=n,g.fillRect(0,0,o,l),g.fillStyle=t,g.fillText(e,d,c),g.fillRect(h,m,u,p),g.fillStyle=n,g.globalAlpha=.9,g.fillRect(h,m,u,p),{dom:f,update:function(l,w){i=Math.min(i,l),a=Math.max(a,l),g.fillStyle=n,g.globalAlpha=1,g.fillRect(0,0,o,m),g.fillStyle=t,g.fillText(r(l)+" "+e+" ("+r(i)+"-"+r(a)+")",d,c),g.drawImage(f,h+s,m,u-s,p,h,m,u-s,p),g.fillRect(h+u-s,m,s,p),g.fillStyle=n,g.globalAlpha=.9,g.fillRect(h+u-s,m,s,r((1-l/w)*p))}}},t.Z=n},86563:function(e,t,n){n.d(t,{$5:function(){return a}});n(70560);var i=n(67471);function a(e,t){const n=new i.ZAu;for(let a=0,r=t.length;a<r;a++)n.add(new i.Kj0(e,t[a]));return n}}}]);
//# sourceMappingURL=BlendMateria.5c4dae79.js.map