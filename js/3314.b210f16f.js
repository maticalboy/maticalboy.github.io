"use strict";(self["webpackChunkvue2_template"]=self["webpackChunkvue2_template"]||[]).push([[3314],{58963:function(e,t,a){a.r(t),a.d(t,{default:function(){return f}});var l=function(){var e=this,t=e._self._c;return t("div",{staticClass:"vm"},[t("h2",{staticClass:"h-title"},[e._v("绘制图形")]),t("div",{staticClass:"tools-x"},[t("select",{directives:[{name:"model",rawName:"v-model",value:e.tool,expression:"tool"}],attrs:{id:"type"},on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.tool=t.target.multiple?a:a[0]}}},e._l(e.tools,(function(a){return t("option",{key:a.value,domProps:{value:a.value}},[e._v(e._s(a.label))])})),0)]),t("div",{ref:"map",staticClass:"map-x"})])},r=[],n=(a(70560),a(71827),a(6643)),o=a(9324),s=a(54235),i=a(83449),u=a(81199),c=a(15980),h=a(42806),p=a(96193),v={data(){return{tool:"Circle",tools:[{value:"Circle",label:"圆"},{value:"Square",label:"方形"},{value:"Rectangle",label:"矩形"},{value:"Hexagram",label:"六芒星"},{value:"None",label:"无"}],map:null,draw:null,source:new c.Z({wrapX:!1})}},watch:{tool(e){this.addInteraction()}},methods:{initMap(){let e=new s.Z({source:new i.Z({url:"http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"})}),t=new u.Z({source:this.source});this.map=new n.Z({target:this.$refs.map,layers:[e,t],view:new o.ZP({projection:"EPSG:4326",center:[113.1206,23.034996],zoom:10})}),this.addInteraction()},addInteraction(){if(null!==this.draw&&this.map.removeInteraction(this.draw),"None"!==this.tool){let e,t="Circle";"Square"===this.tool?e=(0,h.N_)(4):"Rectangle"===this.tool?e=(0,h.dO)():"Hexagram"===this.tool&&(e=function(e,t){for(var a=e[0],l=e[1],r=a[0]-l[0],n=a[1]-l[1],o=Math.sqrt(r*r+n*n),s=Math.atan2(n,r),i=[],u=12,c=0;c<u;++c){var h=s+2*c*Math.PI/u,v=c%2===0?1:.58,d=o*v*Math.cos(h),m=o*v*Math.sin(h);i.push([a[0]+d,a[1]+m])}return i.push(i[0].slice()),t?t.setCoordinates([i]):t=new p.ZP([i]),t}),this.draw=new h.ZP({source:this.source,type:t,geometryFunction:e}),this.map.addInteraction(this.draw)}}},mounted(){this.initMap()}},d=v,m=a(43736),w=(0,m.Z)(d,l,r,!1,null,null,null),f=w.exports}}]);
//# sourceMappingURL=3314.b210f16f.js.map