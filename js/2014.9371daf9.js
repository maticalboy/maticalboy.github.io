"use strict";(self["webpackChunkvue2_template"]=self["webpackChunkvue2_template"]||[]).push([[2014],{12014:function(t,e,i){i.r(e),i.d(e,{default:function(){return u}});var r=function(){var t=this,e=t._self._c;return e("div",[t._t("paper",null,{content:t.content})],2)},n=[],s={props:{printerInfo:{type:String,default:""},duration:{type:Number,default:100},delay:{type:Number,default:3e3},working:{type:Boolean,default:!0},once:{type:Boolean,default:!1}},data(){return{content:"",cursor:0,timer:null,timeout:null,print:!0}},created(){this.working?this.start(this.work):this.content=this.printerInfo},watch:{working(t){this.toBegin()},printerInfo(t){this.toBegin()},cursor(t){this.content=this.printerInfo.slice(0,t)}},beforeDestroy(){clearInterval(this.timer)},methods:{start(t){this.timeout=setTimeout((()=>{this.timer=setInterval((()=>{t(),0===this.cursor||this.cursor===this.printerInfo.length&&!this.once?(clearInterval(this.timer),this.start(this.work)):this.cursor===this.printerInfo.length&&this.once&&clearInterval(this.timer)}),this.duration)}),this.delay)},work(){let t=this.cursor;t+=this.print?1:-1,this.print?t===this.printerInfo.length+1&&(t-=2,this.print=!this.print):-1===t&&(t+=2,this.print=!this.print),this.cursor=t},toBegin(){this.cursor=0,null!==this.timeout&&(clearTimeout(this.timeout),null!==this.timer&&clearInterval(this.timer)),this.working?this.start(this.work):this.content=this.printerInfo}}},o=s,h=i(43736),l=(0,h.Z)(o,r,n,!1,null,null,null),u=l.exports}}]);
//# sourceMappingURL=2014.9371daf9.js.map