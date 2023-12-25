"use strict";(self["webpackChunkvue2_template"]=self["webpackChunkvue2_template"]||[]).push([[2761],{31079:function(e,t,n){n.r(t),n.d(t,{default:function(){return u}});var r=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"threeDemo"}})},a=[],s=(n(70560),n(67471));n(24224),n(61121),n(37133);class i extends s.yxD{constructor(e){super(e),this.type=s.cLu}parse(e){const t=1,n=2,r=3,a=4,i=function(e,s){switch(e){case t:throw new Error("THREE.RGBELoader: Read Error: "+(s||""));case n:throw new Error("THREE.RGBELoader: Write Error: "+(s||""));case r:throw new Error("THREE.RGBELoader: Bad File Format: "+(s||""));default:case a:throw new Error("THREE.RGBELoader: Memory Error: "+(s||""))}},o=1,l=2,c=4,h="\n",d=function(e,t,n){const r=128;t=t||1024;let a=e.pos,s=-1,i=0,o="",l=String.fromCharCode.apply(null,new Uint16Array(e.subarray(a,a+r)));while(0>(s=l.indexOf(h))&&i<t&&a<e.byteLength)o+=l,i+=l.length,a+=r,l+=String.fromCharCode.apply(null,new Uint16Array(e.subarray(a,a+r)));return-1<s&&(!1!==n&&(e.pos+=i+s+1),o+l.slice(0,s))},m=function(e){const n=/^#\?(\S+)/,a=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,s=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,h=/^\s*FORMAT=(\S+)\s*$/,m=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,u={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let p,w;(e.pos>=e.byteLength||!(p=d(e)))&&i(t,"no header found"),(w=p.match(n))||i(r,"bad initial token"),u.valid|=o,u.programtype=w[1],u.string+=p+"\n";while(1){if(p=d(e),!1===p)break;if(u.string+=p+"\n","#"!==p.charAt(0)){if((w=p.match(a))&&(u.gamma=parseFloat(w[1])),(w=p.match(s))&&(u.exposure=parseFloat(w[1])),(w=p.match(h))&&(u.valid|=l,u.format=w[1]),(w=p.match(m))&&(u.valid|=c,u.height=parseInt(w[1],10),u.width=parseInt(w[2],10)),u.valid&l&&u.valid&c)break}else u.comments+=p+"\n"}return u.valid&l||i(r,"missing format specifier"),u.valid&c||i(r,"missing image size specifier"),u},u=function(e,n,s){const o=n;if(o<8||o>32767||2!==e[0]||2!==e[1]||128&e[2])return new Uint8Array(e);o!==(e[2]<<8|e[3])&&i(r,"wrong scanline width");const l=new Uint8Array(4*n*s);l.length||i(a,"unable to allocate buffer space");let c=0,h=0;const d=4*o,m=new Uint8Array(4),u=new Uint8Array(d);let p=s;while(p>0&&h<e.byteLength){h+4>e.byteLength&&i(t),m[0]=e[h++],m[1]=e[h++],m[2]=e[h++],m[3]=e[h++],2==m[0]&&2==m[1]&&(m[2]<<8|m[3])==o||i(r,"bad rgbe scanline format");let n,a=0;while(a<d&&h<e.byteLength){n=e[h++];const t=n>128;if(t&&(n-=128),(0===n||a+n>d)&&i(r,"bad scanline data"),t){const t=e[h++];for(let e=0;e<n;e++)u[a++]=t}else u.set(e.subarray(h,h+n),a),a+=n,h+=n}const s=o;for(let e=0;e<s;e++){let t=0;l[c]=u[e+t],t+=o,l[c+1]=u[e+t],t+=o,l[c+2]=u[e+t],t+=o,l[c+3]=u[e+t],c+=4}p--}return l},p=function(e,t,n,r){const a=e[t+3],s=Math.pow(2,a-128)/255;n[r+0]=e[t+0]*s,n[r+1]=e[t+1]*s,n[r+2]=e[t+2]*s,n[r+3]=1},w=function(e,t,n,r){const a=e[t+3],i=Math.pow(2,a-128)/255;n[r+0]=s.A5E.toHalfFloat(Math.min(e[t+0]*i,65504)),n[r+1]=s.A5E.toHalfFloat(Math.min(e[t+1]*i,65504)),n[r+2]=s.A5E.toHalfFloat(Math.min(e[t+2]*i,65504)),n[r+3]=s.A5E.toHalfFloat(1)},f=new Uint8Array(e);f.pos=0;const g=m(f),y=g.width,E=g.height,b=u(f.subarray(f.pos),y,E);let A,v,R;switch(this.type){case s.VzW:R=b.length/4;const e=new Float32Array(4*R);for(let n=0;n<R;n++)p(b,4*n,e,4*n);A=e,v=s.VzW;break;case s.cLu:R=b.length/4;const t=new Uint16Array(4*R);for(let n=0;n<R;n++)w(b,4*n,t,4*n);A=t,v=s.cLu;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:y,height:E,data:A,header:g.string,gamma:g.gamma,exposure:g.exposure,type:v}}setDataType(e){return this.type=e,this}load(e,t,n,r){function a(e,n){switch(e.type){case s.VzW:case s.cLu:e.colorSpace=s.GUF,e.minFilter=s.wem,e.magFilter=s.wem,e.generateMipmaps=!1,e.flipY=!0;break}t&&t(e,n)}return super.load(e,a,n,r)}}var o=n(13826);class l{constructor(e){this.containerId=e,this.scene=null,this.camera=null,this.renderer=null,this.controls=null}init(){const e=document.getElementById(this.containerId);this.scene=new s.xsS;const t=e.clientWidth,n=e.clientHeight;this.camera=new s.cPb(75,t/n,.1,1e3),this.camera.position.set(0,0,5),this.renderer=new s.CP7({antialias:!0}),this.renderer.setSize(t,n),e.appendChild(this.renderer.domElement);const r=new s.Mig(16777215,.5);this.scene.add(r);const a=new s.Ox3(16777215,.5);a.position.set(0,1,1),this.scene.add(a);const l=new s.DvJ(5,5,5);let c=new s.dpR;const h=["4_l.jpg","4_r.jpg","4_u.jpg","4_d.jpg","4_b.jpg","4_f.jpg"];let d=[];h.forEach(((e,t)=>{let n=c.load(`image/${e}`);3!=t&&2!=t||(n.rotation=Math.PI,n.center=new s.FM8(.5,.5)),d.push(new s.Wid({map:n}))}));const m=new s.Kj0(l,d);m.geometry.scale(1,1,-1);const u=new s.xo$(5,50,50);let p=new i;p.load("models/gltf/autumn_field_4k.hdr",(e=>{const t=new s.Wid({map:e}),n=new s.Kj0(u,t);n.geometry.scale(1,1,-1),this.scene.add(n)})),this.controls=new o.z(this.camera,this.renderer.domElement),this.controls.addEventListener("change",(()=>{this.renderer.render(this.scene,this.camera)})),this.renderScene()}renderScene(){requestAnimationFrame((()=>this.renderScene())),this.renderer.render(this.scene,this.camera)}}var c={name:"VR",data(){return{demo:null}},mounted(){this.demo=new l("threeDemo"),this.demo.init()}},h=c,d=n(1001),m=(0,d.Z)(h,r,a,!1,null,"5a7318ba",null),u=m.exports}}]);
//# sourceMappingURL=VR.42778144.js.map