"use strict";(self["webpackChunkvue2_template"]=self["webpackChunkvue2_template"]||[]).push([[3876],{745:function(e,t,a){a.r(t),a.d(t,{default:function(){return w}});var l=function(){var e=this,t=e._self._c;return t("div",{staticClass:"vm"},[t("h2",{staticClass:"h-title"},[e._v("自由绘制绘制图形")]),t("div",{staticClass:"tools-x"},[t("select",{directives:[{name:"model",rawName:"v-model",value:e.tool,expression:"tool"}],attrs:{id:"type"},on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.tool=t.target.multiple?a:a[0]}}},e._l(e.tools,(function(a){return t("option",{key:a.value,domProps:{value:a.value}},[e._v(e._s(a.label))])})),0)]),t("div",{ref:"map",staticClass:"map-x"})])},n=[],r=(a(71827),a(6643)),o=a(9324),i=a(54235),s=a(83449),u=a(81199),c=a(15980),p=a(42806),v={data(){return{tool:"LineString",tools:[{value:"LineString",label:"线条"},{value:"Polygon",label:"多边形"},{value:"Circle",label:"圆"},{value:"None",label:"无"}],map:null,draw:null,source:new c.Z({wrapX:!1})}},watch:{tool(e){this.addInteraction()}},methods:{initMap(){let e=new i.Z({source:new s.Z({url:"http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"})}),t=new u.Z({source:this.source});this.map=new r.Z({target:this.$refs.map,layers:[e,t],view:new o.ZP({projection:"EPSG:4326",center:[113.1206,23.034996],zoom:10})}),this.addInteraction()},addInteraction(){null!==this.draw&&this.map.removeInteraction(this.draw),"None"!==this.tool&&(this.draw=new p.ZP({source:this.source,type:this.tool,freehand:!0}),this.map.addInteraction(this.draw))}},mounted(){this.initMap()}},d=v,h=a(1001),m=(0,h.Z)(d,l,n,!1,null,null,null),w=m.exports}}]);
//# sourceMappingURL=3876.a913fead.js.map