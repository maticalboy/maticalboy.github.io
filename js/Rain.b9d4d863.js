"use strict";(self["webpackChunkvue2_template"]=self["webpackChunkvue2_template"]||[]).push([[1380],{69681:function(e,t,_){_.r(t),_.d(t,{default:function(){return c}});var r=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"canvas"}})},n=[],a=_(62796),o=a.Z,i=_(1001),s=(0,i.Z)(o,r,n,!1,null,"2d0b2a32",null),c=s.exports},62796:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){var three__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(67471),three_addons_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(13826);__webpack_exports__.Z={name:"Rain",data(){return{}},mounted(){let e=this.initScene(),t={size:2,transparent:!0,opacity:.6,vertexColors:!0,color:16777215,sizeAttenuation:!0,rotateSystem:!1},_=this.createMesh(t.size,t.transparent,t.opacity,t.vertexColors,t.sizeAttenuation,t.color);e.add(_);let r=this.createCamera();r.position.set(0,0,25),r.lookAt(_.position);let n=this.createAxesHelper();e.add(n);let a=this.createLight();e.add(a);let o=this.createLightHelper(a);e.add(o);let i=this.createRenderer(),s=new three_addons_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_0__.z(r,i.domElement);function c(){for(let e=0;e<_.children.length;e++){let t=_.children[e].position,r=_.children[e].userData;t.y=t.y-3*r.velocityY,t.x=t.x-.5*r.velocityX,t.y<=-60&&(t.y=60),(t.x<=-20||t.x>=20)&&(r.x=-1*r.x),_.children[e].position.verticesNeedUpdate=!0}i.render(e,r)}s.addEventListener("change",(function(){i.render(e,r)})),i.render(e,r),document.getElementById("canvas").appendChild(i.domElement);let d=function(){c(),requestAnimationFrame(d),i.render(e,r)};d()},methods:{initScene(){const e=new three__WEBPACK_IMPORTED_MODULE_1__.xsS;return e},createMesh(e,t,_,r,n,a){let o=new three__WEBPACK_IMPORTED_MODULE_1__.u9r,i=120,s=new three__WEBPACK_IMPORTED_MODULE_1__.Tme,c=new three__WEBPACK_IMPORTED_MODULE_1__.UY4({size:e,transparent:t,opacity:_,vertexColors:r,sizeAttenuation:n,color:a,map:this.getTexture(),depthTest:!1});for(let d=0;d<100;d++){let e=new three__WEBPACK_IMPORTED_MODULE_1__.Pa4(Math.random()*i-i/2,Math.random()*i-i/2,Math.random()*i-i/2);o.setAttribute("position",new three__WEBPACK_IMPORTED_MODULE_1__.a$l(e,3)),o.setAttribute("color",new three__WEBPACK_IMPORTED_MODULE_1__.a$l([1,1,1],3));let t=new three__WEBPACK_IMPORTED_MODULE_1__.woe(o,c);t.verticesNeedUpdate=!0,t.userData={velocityX:(Math.random()-.5)/3,velocityY:.1+Math.random()/5},t.position.set(e.x,e.y,e.z),s.add(t)}return s},createCamera(){const e=500,t=500,_=new three__WEBPACK_IMPORTED_MODULE_1__.cPb(75,e/t,.1,1e3);return _},createRenderer(){const e=new three__WEBPACK_IMPORTED_MODULE_1__.CP7;return e.setSize(500,500),e},createAxesHelper(){const e=new three__WEBPACK_IMPORTED_MODULE_1__.y8_(100);return e},createLightHelper(e){const t=new three__WEBPACK_IMPORTED_MODULE_1__.xG9(e,1);return t},createLight(){const e=new three__WEBPACK_IMPORTED_MODULE_1__.cek(16777215,100);e.position.set(0,0,100);const t=new three__WEBPACK_IMPORTED_MODULE_1__.Ox3(16777215,100);return t.position.set(100,50,50),e},randomColor(){for(var arrHex=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"],strHex="0x",index,i=0;i<6;i++)index=Math.round(15*Math.random()),strHex+=arrHex[index];return eval(strHex)},getTexture(){let e=__webpack_require__(72925),t=(new three__WEBPACK_IMPORTED_MODULE_1__.dpR).load(e);return t}}}},72925:function(e,t,_){e.exports=_.p+"img/rain.60ca65dc.png"}}]);
//# sourceMappingURL=Rain.b9d4d863.js.map