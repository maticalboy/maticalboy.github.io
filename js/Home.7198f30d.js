"use strict";(self["webpackChunkvue2_template"]=self["webpackChunkvue2_template"]||[]).push([[5268],{29931:function(t,e,i){i.r(e),i.d(e,{default:function(){return c}});i(70560);var n=function(){var t=this,e=t._self._c;return e("div",[e("transition",{attrs:{name:"el-fade-in-linear"}},[e("div",{staticClass:"toolbar-content myBetween"},[e("div",{staticClass:"toolbar-title"},[e("h2",{on:{click:function(e){return t.$router.push({path:"/"})}}},[t._v(" "+t._s("Admin")+" ")])]),e("ul",{staticClass:"page-title"},t._l(t.menu,(function(i,n){return e("li",{key:n,on:{click:function(e){return t.travel(i)}}},[t._v(" "+t._s(i.name)+" ")])})),0)])]),e("div",{ref:"centerBg",staticClass:"centerBg"},[t.len?e("div",{staticClass:"mask"},[e("div",{staticClass:"grid",style:{gridTemplateColumns:`repeat(${t.col}, 1fr)`}},t._l(t.row*t.col,(function(i){return e("div",{key:i,staticClass:"col",style:t.getCellStyle(Math.floor((i-1)/t.col)+1,(i-1)%t.col+1)})})),0)]):t._e(),e("div",{staticClass:"signature-wall myCenter my-animation-hideToShow"},[e("h1",{staticClass:"playful"},[e("div",{staticClass:"title",attrs:{title:"HI,CHEN"},on:{click:t.refreshBg}},[t._v(" HI,CHEN ")])]),e("div",{staticClass:"printer"},[e("Printer",{attrs:{printerInfo:t.printerInfo},scopedSlots:t._u([{key:"paper",fn:function(i){return[e("h3",[t._v(" "+t._s(i.content)+" "),e("span",{staticClass:"cursor"},[t._v("|")])])]}}])})],1),e("div",{attrs:{id:"bannerWave1"}}),e("div",{attrs:{id:"bannerWave2"}}),e("i",{staticClass:"el-icon-arrow-down",on:{click:function(e){return t.navigation(".page-container-wrap")}}})])]),e("div",{staticClass:"page-container-wrap"},[e("div",{staticClass:"page-container"},t._l(40,(function(i){return e("div",{key:i},[t._v(" "+t._s("我还没想好写什么")+" ")])})),0)])],1)},s=[],r={components:{Printer:()=>i.e(1854).then(i.bind(i,51854))},data(){return{centerBg:null,row:0,col:0,len:0,opicty:1,printerInfo:"你看对面的青山多漂亮",menu:[{name:"首页",url:"/home"},{name:"three",url:"/three"},{name:"openlayers",url:"/openlayers"},{name:"vue2",url:"/vue2"}]}},mounted(){this.initGrid(),this.bgLoad()},methods:{getCellStyle(t,e){return{width:`${this.len}px`,transition:`opacity ${100+500*Math.random()}ms ${(e+t/2)/20*Math.random()*500}ms`}},initGrid(){const t=window.innerWidth,e=window.innerHeight,i=window.innerWidth>1920?1e3:window.innerWidth>1080?600:window.innerWidth>640?400:100;this.len=Math.min(t,e)/Math.sqrt(i),this.col=Math.ceil(t/this.len),this.row=Math.ceil(e/this.len)},bgLoad(){const t="http://pic.616pic.com/bg_w1180/00/03/57/voXsmWh7He.jpg!/fw/1120",e=new Image;e.src=t,e.onload=()=>{setTimeout((()=>{this.opicty=+!this.opicty,this.$refs.centerBg.style.setProperty("--o",this.opicty)}),800)}},refreshBg(){this.opicty=+!this.opicty,this.$refs.centerBg.style.setProperty("--o",this.opicty),1==this.opicty&&setTimeout((()=>{this.opicty=+!this.opicty,this.$refs.centerBg.style.setProperty("--o",this.opicty)}),1200)},navigation(t){let e=document.querySelector(t);window.scrollTo({top:e.offsetTop,behavior:"smooth"})},travel(t){this.$router.push(t.url)}}},o=r,a=i(1001),l=(0,a.Z)(o,n,s,!1,null,"6007022b",null),c=l.exports}}]);
//# sourceMappingURL=Home.7198f30d.js.map