"use strict";(self["webpackChunkvue2_template"]=self["webpackChunkvue2_template"]||[]).push([[313],{70313:function(e,t,n){n.r(t),n.d(t,{default:function(){return h}});var r=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"canvas"}})},a=[],o=n(67471),c=n(13826),i={name:"Raycaster",data(){return{}},mounted(){let e=this.initScene(),t=this.createCamera();this.createMesh(e,t);t.position.set(0,0,25),t.lookAt({x:0,y:0,z:0});this.createAxesHelper();let n=this.createLight();e.add(n);this.createLightHelper(n);let r=this.createRenderer(),a=new c.z(t,r.domElement);a.addEventListener("change",(function(){r.render(e,t)})),r.render(e,t),document.getElementById("canvas").appendChild(r.domElement);var i=()=>{requestAnimationFrame(i),r.render(e,t)};i(),r.domElement.addEventListener("click",(n=>{let r=new o.iMs,a=new o.FM8,c=document.getElementById("canvas").getBoundingClientRect();console.log(n.clientX-c.x,n.clientY-c.y),a.x=(n.clientX-c.x)/500*2-1,a.y=-(n.clientY-c.y)/500*2+1,r.setFromCamera(a,t);const i=r.intersectObjects(e.children);i.length&&i[0].object.material.color.set(16711680)}))},methods:{initScene(){const e=new o.xsS;return e},createMesh(e,t){const n=new o.DvJ(25,25,25);new o.Tme;for(let r=0;r<30;r++){const t=new o.YBo({color:this.randomColor()}),r=new o.Kj0(n,t);r.position.x=800*(2*Math.random()-1),r.position.y=800*(2*Math.random()-1),r.position.z=800*(2*Math.random()-1),r.rotation.x=Math.random()*Math.PI,r.rotation.y=Math.random()*Math.PI,r.rotation.z=Math.random()*Math.PI,e.add(r)}},createCamera(){const e=500,t=500,n=new o.cPb(75,e/t,.1,1e3);return n},createRenderer(){const e=new o.CP7;return e.setSize(500,500),e},createAxesHelper(){const e=new o.y8_(100);return e},createLightHelper(e){const t=new o.xG9(e,1);return t},createLight(){const e=new o.cek(16777215,100);e.position.set(100,100,100);const t=new o.Ox3(16777215,1);t.position.set(100,50,50);const n=new o.Mig(4473924,100);return n},randomColor(){for(var e,t=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"],n="#",r=0;r<6;r++)e=Math.round(15*Math.random()),n+=t[e];return n}}},s=i,d=n(1001),l=(0,d.Z)(s,r,a,!1,null,"07eb6c08",null),h=l.exports}}]);
//# sourceMappingURL=313.ca40d891.js.map