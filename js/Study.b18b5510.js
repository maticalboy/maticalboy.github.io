"use strict";(self["webpackChunkvue2_template"]=self["webpackChunkvue2_template"]||[]).push([[3252],{88352:function(e,t,n){n.r(t),n.d(t,{default:function(){return l}});var r=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"canvas"}})},a=[],s=n(67471),i=n(13826),c={name:"Study",data(){return{}},mounted(){let e=this.initScene(),t=this.createMesh();e.add(t);let n=this.createCamera();n.position.set(0,0,25),n.lookAt(t.position);let r=this.createAxesHelper();e.add(r);let a=this.createLight();e.add(a);let s=this.createLightHelper(a);e.add(s);let c=this.createRenderer(),o=new i.z(n,c.domElement);o.addEventListener("change",(function(){c.render(e,n)})),c.render(e,n),document.getElementById("canvas").appendChild(c.domElement);var d=function(){requestAnimationFrame(d),t.rotation.x+=.01,t.rotation.y+=.02,c.render(e,n)};d()},methods:{initScene(){const e=new s.xsS;return e},createMesh(){const e=new s.DvJ(5,5,5),t=new s.YBo({color:65280}),n=new s.Kj0(e,t);return n},createCamera(){const e=500,t=500,n=new s.cPb(75,e/t,.1,1e3);return n},createRenderer(){const e=new s.CP7;return e.setSize(500,500),e},createAxesHelper(){const e=new s.y8_(100);return e},createLightHelper(e){const t=new s.xG9(e,1);return t},createLight(){const e=new s.cek(16777215,100);e.position.set(100,0,0);const t=new s.Ox3(16777215,1);return t.position.set(100,50,50),t}}},o=c,d=n(43736),u=(0,d.Z)(o,r,a,!1,null,"8e524568",null),l=u.exports}}]);
//# sourceMappingURL=Study.b18b5510.js.map