"use strict";(self["webpackChunkvue2_template"]=self["webpackChunkvue2_template"]||[]).push([[9394],{14811:function(e,n,t){t.r(n),t.d(n,{default:function(){return p}});var a=function(){var e=this,n=e._self._c;return n("div",{attrs:{id:"canvas"},on:{click:function(n){e.start=!e.start}}})},s=[],o=(t(70560),t(67471)),i=t(13826),r={name:"UserControl",data(){return{start:!1}},mounted(){let e=new o.xsS,n=new o.cPb(75,1,.1,1e3);n.position.y=500,n.lookAt(new o.Pa4(0,0,0));let a=new o.CP7({antialias:!0});a.setSize(500,500),document.getElementById("canvas").appendChild(a.domElement),e.add(new o.Mig(4210752));let s=new o.Ox3(16777215,1.5);s.position.set(0,20,0),e.add(s);const r=new o.dpR;let l=t(3794);const d=r.load(l);d.wrapS=d.wrapT=o.rpg,d.anisotropy=16;let u=new o.YBo({map:d,side:o.ehD});for(var p=[],c=0;c<50;c++)p.push(new o.FM8(Math.sin(.2*c)*Math.sin(.1*c)*15+50,2*(c-5)));let w=new o.p7y(p,20);const m=new o.Kj0(w,u);m.position.set(0,0,-100),e.add(m);let f=new i.z(n,a.domElement);function h(){f.update(),a.render(e,n),requestAnimationFrame(h)}f.update(),f.addEventListener("change",(function(){a.render(e,n),f.enableDamping=!0})),h()}},l=r,d=t(43736),u=(0,d.Z)(l,a,s,!1,null,null,null),p=u.exports},3794:function(e,n,t){e.exports=t.p+"img/texture.c17d27e5.png"}}]);
//# sourceMappingURL=UserControl.f37e089e.js.map