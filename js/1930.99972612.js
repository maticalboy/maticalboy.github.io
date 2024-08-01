"use strict";(self["webpackChunkvue2_template"]=self["webpackChunkvue2_template"]||[]).push([[1930],{91930:function(e,t,i){i.r(t),i.d(t,{default:function(){return w}});var o=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"canvas"},on:{click:function(t){e.start=!e.start}}},[t("div",{attrs:{id:"stats"}}),t("div",{attrs:{id:"gui"}}),t("div",{attrs:{id:"container"}})])},n=[],s=i(67471),a=i(13826),r=i(43851),h=i(98015),c=i(68831);const l={type:"change"};class d extends s.pBf{constructor(e,t){super(),this.object=e,this.domElement=t,this.enabled=!0,this.movementSpeed=1,this.rollSpeed=.005,this.dragToLook=!1,this.autoForward=!1;const i=this,o=1e-6,n=new s._fP,a=new s.Pa4;this.tmpQuaternion=new s._fP,this.status=0,this.moveState={up:0,down:0,left:0,right:0,forward:0,back:0,pitchUp:0,pitchDown:0,yawLeft:0,yawRight:0,rollLeft:0,rollRight:0},this.moveVector=new s.Pa4(0,0,0),this.rotationVector=new s.Pa4(0,0,0),this.keydown=function(e){if(!e.altKey&&!1!==this.enabled){switch(e.code){case"ShiftLeft":case"ShiftRight":this.movementSpeedMultiplier=.1;break;case"KeyW":this.moveState.forward=1;break;case"KeyS":this.moveState.back=1;break;case"KeyA":this.moveState.left=1;break;case"KeyD":this.moveState.right=1;break;case"KeyR":this.moveState.up=1;break;case"KeyF":this.moveState.down=1;break;case"ArrowUp":this.moveState.pitchUp=1;break;case"ArrowDown":this.moveState.pitchDown=1;break;case"ArrowLeft":this.moveState.yawLeft=1;break;case"ArrowRight":this.moveState.yawRight=1;break;case"KeyQ":this.moveState.rollLeft=1;break;case"KeyE":this.moveState.rollRight=1;break}this.updateMovementVector(),this.updateRotationVector()}},this.keyup=function(e){if(!1!==this.enabled){switch(e.code){case"ShiftLeft":case"ShiftRight":this.movementSpeedMultiplier=1;break;case"KeyW":this.moveState.forward=0;break;case"KeyS":this.moveState.back=0;break;case"KeyA":this.moveState.left=0;break;case"KeyD":this.moveState.right=0;break;case"KeyR":this.moveState.up=0;break;case"KeyF":this.moveState.down=0;break;case"ArrowUp":this.moveState.pitchUp=0;break;case"ArrowDown":this.moveState.pitchDown=0;break;case"ArrowLeft":this.moveState.yawLeft=0;break;case"ArrowRight":this.moveState.yawRight=0;break;case"KeyQ":this.moveState.rollLeft=0;break;case"KeyE":this.moveState.rollRight=0;break}this.updateMovementVector(),this.updateRotationVector()}},this.pointerdown=function(e){if(!1!==this.enabled)if(this.dragToLook)this.status++;else{switch(e.button){case 0:this.moveState.forward=1;break;case 2:this.moveState.back=1;break}this.updateMovementVector()}},this.pointermove=function(e){if(!1!==this.enabled&&(!this.dragToLook||this.status>0)){const t=this.getContainerDimensions(),i=t.size[0]/2,o=t.size[1]/2;this.moveState.yawLeft=-(e.pageX-t.offset[0]-i)/i,this.moveState.pitchDown=(e.pageY-t.offset[1]-o)/o,this.updateRotationVector()}},this.pointerup=function(e){if(!1!==this.enabled){if(this.dragToLook)this.status--,this.moveState.yawLeft=this.moveState.pitchDown=0;else{switch(e.button){case 0:this.moveState.forward=0;break;case 2:this.moveState.back=0;break}this.updateMovementVector()}this.updateRotationVector()}},this.pointercancel=function(){!1!==this.enabled&&(this.dragToLook?(this.status=0,this.moveState.yawLeft=this.moveState.pitchDown=0):(this.moveState.forward=0,this.moveState.back=0,this.updateMovementVector()),this.updateRotationVector())},this.contextMenu=function(e){!1!==this.enabled&&e.preventDefault()},this.update=function(e){if(!1===this.enabled)return;const t=e*i.movementSpeed,s=e*i.rollSpeed;i.object.translateX(i.moveVector.x*t),i.object.translateY(i.moveVector.y*t),i.object.translateZ(i.moveVector.z*t),i.tmpQuaternion.set(i.rotationVector.x*s,i.rotationVector.y*s,i.rotationVector.z*s,1).normalize(),i.object.quaternion.multiply(i.tmpQuaternion),(a.distanceToSquared(i.object.position)>o||8*(1-n.dot(i.object.quaternion))>o)&&(i.dispatchEvent(l),n.copy(i.object.quaternion),a.copy(i.object.position))},this.updateMovementVector=function(){const e=this.moveState.forward||this.autoForward&&!this.moveState.back?1:0;this.moveVector.x=-this.moveState.left+this.moveState.right,this.moveVector.y=-this.moveState.down+this.moveState.up,this.moveVector.z=-e+this.moveState.back},this.updateRotationVector=function(){this.rotationVector.x=-this.moveState.pitchDown+this.moveState.pitchUp,this.rotationVector.y=-this.moveState.yawRight+this.moveState.yawLeft,this.rotationVector.z=-this.moveState.rollRight+this.moveState.rollLeft},this.getContainerDimensions=function(){return this.domElement!=document?{size:[this.domElement.offsetWidth,this.domElement.offsetHeight],offset:[this.domElement.offsetLeft,this.domElement.offsetTop]}:{size:[window.innerWidth,window.innerHeight],offset:[0,0]}},this.dispose=function(){this.domElement.removeEventListener("contextmenu",r),this.domElement.removeEventListener("pointerdown",c),this.domElement.removeEventListener("pointermove",h),this.domElement.removeEventListener("pointerup",d),this.domElement.removeEventListener("pointercancel",m),window.removeEventListener("keydown",u),window.removeEventListener("keyup",p)};const r=this.contextMenu.bind(this),h=this.pointermove.bind(this),c=this.pointerdown.bind(this),d=this.pointerup.bind(this),m=this.pointercancel.bind(this),u=this.keydown.bind(this),p=this.keyup.bind(this);this.domElement.addEventListener("contextmenu",r),this.domElement.addEventListener("pointerdown",c),this.domElement.addEventListener("pointermove",h),this.domElement.addEventListener("pointerup",d),this.domElement.addEventListener("pointercancel",m),window.addEventListener("keydown",u),window.addEventListener("keyup",p),this.updateMovementVector(),this.updateRotationVector()}}var m={name:"FlyControls",data(){return{start:!1,gui:null}},mounted(){if(this.init(),this.operation(),h.Z.isWebGLAvailable())this.animate();else{const e=h.Z.getWebGLErrorMessage();document.getElementById("container").appendChild(e)}},methods:{init(){this.scene=new s.xsS,this.scene.fog=new s.ybr(16777215,.1,20),this.camera=new s.cPb(75,window.innerWidth/window.innerHeight,.1,1e3),this.renderer=new s.CP7({antialias:!0}),this.renderer.setSize(500,500),document.getElementById("canvas").appendChild(this.renderer.domElement),this.controls=new a.z(this.camera,this.renderer.domElement),this.controls.update(),this.controls.addEventListener("change",(()=>{this.renderer.render(this.scene,this.camera)})),this.stats,this.stats=new r.Z,document.getElementById("stats").appendChild(this.stats.dom),this.stats.domElement.style.position="absolute",this.stats.domElement.style.left="0px",this.stats.domElement.style.top="0px",this.gui=new c.XS,document.getElementById("gui").appendChild(this.gui.domElement),this.gui.domElement.style.position="absolute",this.gui.domElement.style.right="0px",this.flyControls=new d(this.camera,this.renderer.domElement),this.flyControls.movementSpeed=5,this.flyControls.rollSpeed=Math.PI/5,this.flyControls.autoForward=!1,this.flyControls.dragToLook=!1,this.clock=new s.SUY},operation(){this.camera.position.set(0,10,10),this.camera.lookAt({x:0,y:0,z:0}),this.planeMaterial=new s.xoR({color:7105644}),this.plane=new s.Kj0(new s._12(300,300),this.planeMaterial),this.plane.rotation.x=-Math.PI/2,this.scene.add(this.plane),this.scene.add(new s.Mig(16777215)),this.light=new s.Ox3(16777215,1.75),this.light.position.set(30,10,10),this.light.shadow.camera.top=3,this.light.shadow.camera.right=6,this.light.shadow.camera.bottom=-3,this.light.shadow.camera.left=-2,this.light.shadow.camera.near=20,this.light.shadow.camera.far=35,this.scene.add(this.light);let e=new s.Rki(this.light.shadow.camera);this.scene.add(e);let t=new s.DvJ(1,1,1),i=new s.YBo({color:716511});this.cube=new s.Kj0(t,i),this.cube.position.set(0,0,0);let o=new s.xo$(1,10,10),n=new s.YBo({color:716511});this.cube1=new s.Kj0(o,n),this.cube1.position.set(10,1,0),this.scene.add(this.cube1);const a=new s.y8_(1);this.scene.add(a),this.scene.add(this.cube),this.cube.castShadow=!0,this.cube1.castShadow=!0,this.light.castShadow=!0,this.plane.receiveShadow=!0,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=s.ntZ;const r=this.gui.addFolder("立方体坐标");r.add(this.cube.position,"x").min(-10).max(10).step(.1).name("x轴"),r.add(this.cube.position,"y").min(-10).max(10).step(.1).name("y轴"),r.add(this.cube.position,"z").min(-10).max(10).step(.1).name("z轴");const h={full:()=>{const e=document.getElementById("canvas"),t=window.devicePixelRatio||1;this.renderer.setSize(window.screen.width*t,window.screen.height*t),e.requestFullscreen()},exitFull:()=>{this.renderer.setSize(500,500),document.exitFullscreen()}};this.gui.add(h,"full").name("全屏"),this.gui.add(h,"exitFull").name("退出全屏"),this.gui.add(i,"wireframe").name("切换立方体材质");const c={color:"#ffff00"};this.gui.addColor(c,"color").onChange((e=>{this.cube.material.color.set(e)})),this.gui.add(this.cube,"visible").name("是否显示")},animate(){this.controls.update();const e=this.clock.getDelta();this.flyControls.update(e),this.renderer.render(this.scene,this.camera),this.stats.update(),requestAnimationFrame(this.animate)}}},u=m,p=i(1001),f=(0,p.Z)(u,o,n,!1,null,"6a9e7716",null),w=f.exports},98015:function(e,t){class i{static isWebGLAvailable(){try{const e=document.createElement("canvas");return!(!window.WebGLRenderingContext||!e.getContext("webgl")&&!e.getContext("experimental-webgl"))}catch(e){return!1}}static isWebGL2Available(){try{const e=document.createElement("canvas");return!(!window.WebGL2RenderingContext||!e.getContext("webgl2"))}catch(e){return!1}}static isColorSpaceAvailable(e){try{const t=document.createElement("canvas"),i=window.WebGL2RenderingContext&&t.getContext("webgl2");return i.drawingBufferColorSpace=e,i.drawingBufferColorSpace===e}catch(t){return!1}}static getWebGLErrorMessage(){return this.getErrorMessage(1)}static getWebGL2ErrorMessage(){return this.getErrorMessage(2)}static getErrorMessage(e){const t={1:"WebGL",2:"WebGL 2"},i={1:window.WebGLRenderingContext,2:window.WebGL2RenderingContext};let o='Your $0 does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">$1</a>';const n=document.createElement("div");return n.id="webglmessage",n.style.fontFamily="monospace",n.style.fontSize="13px",n.style.fontWeight="normal",n.style.textAlign="center",n.style.background="#fff",n.style.color="#000",n.style.padding="1.5em",n.style.width="400px",n.style.margin="5em auto 0",o=i[e]?o.replace("$0","graphics card"):o.replace("$0","browser"),o=o.replace("$1",t[e]),n.innerHTML=o,n}}t.Z=i},43851:function(e,t){var i=function(){var e=0,t=document.createElement("div");function o(e){return t.appendChild(e.dom),e}function n(i){for(var o=0;o<t.children.length;o++)t.children[o].style.display=o===i?"block":"none";e=i}t.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",t.addEventListener("click",(function(i){i.preventDefault(),n(++e%t.children.length)}),!1);var s=(performance||Date).now(),a=s,r=0,h=o(new i.Panel("FPS","#0ff","#002")),c=o(new i.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var l=o(new i.Panel("MB","#f08","#201"));return n(0),{REVISION:16,dom:t,addPanel:o,showPanel:n,begin:function(){s=(performance||Date).now()},end:function(){r++;var e=(performance||Date).now();if(c.update(e-s,200),e>=a+1e3&&(h.update(1e3*r/(e-a),100),a=e,r=0,l)){var t=performance.memory;l.update(t.usedJSHeapSize/1048576,t.jsHeapSizeLimit/1048576)}return e},update:function(){s=this.end()},domElement:t,setMode:n}};i.Panel=function(e,t,i){var o=1/0,n=0,s=Math.round,a=s(window.devicePixelRatio||1),r=80*a,h=48*a,c=3*a,l=2*a,d=3*a,m=15*a,u=74*a,p=30*a,f=document.createElement("canvas");f.width=r,f.height=h,f.style.cssText="width:80px;height:48px";var w=f.getContext("2d");return w.font="bold "+9*a+"px Helvetica,Arial,sans-serif",w.textBaseline="top",w.fillStyle=i,w.fillRect(0,0,r,h),w.fillStyle=t,w.fillText(e,c,l),w.fillRect(d,m,u,p),w.fillStyle=i,w.globalAlpha=.9,w.fillRect(d,m,u,p),{dom:f,update:function(h,v){o=Math.min(o,h),n=Math.max(n,h),w.fillStyle=i,w.globalAlpha=1,w.fillRect(0,0,r,m),w.fillStyle=t,w.fillText(s(h)+" "+e+" ("+s(o)+"-"+s(n)+")",c,l),w.drawImage(f,d+a,m,u-a,p,d,m,u-a,p),w.fillRect(d+u-a,m,a,p),w.fillStyle=i,w.globalAlpha=.9,w.fillRect(d+u-a,m,a,s((1-h/v)*p))}}},t.Z=i}}]);
//# sourceMappingURL=1930.99972612.js.map