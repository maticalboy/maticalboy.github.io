"use strict";(self["webpackChunkvue2_template"]=self["webpackChunkvue2_template"]||[]).push([[4342],{29197:function(t,e,i){i.r(e),i.d(e,{default:function(){return C}});var o=function(){var t=this,e=t._self._c;return e("div",{staticClass:"vm"},[e("h2",{staticClass:"h-title"},[t._v("修改已绘制的图形")]),e("div",{staticClass:"tools-x"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.tool,expression:"tool"}],attrs:{id:"type"},on:{change:function(e){var i=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.tool=e.target.multiple?i:i[0]}}},t._l(t.tools,(function(i){return e("option",{key:i.value,domProps:{value:i.value}},[t._v(t._s(i.label))])})),0)]),e("div",{staticClass:"map-x",attrs:{id:"map"}})])},r=[],l=(i(71827),i(6643)),n=i(9324),a=i(54235),s=i(83449),u=i(81199),c=i(15980),p=i(27219),d=i(42806),h=i(51774),m=i(70451),v=i(97912),w=i(41030),Z=i(62690),f={data(){return{tool:"Circle",tools:[{value:"Point",label:"点"},{value:"LineString",label:"线"},{value:"Polygon",label:"多边形"},{value:"Circle",label:"圆"},{value:"None",label:"无"}],map:null,draw:null,source:new c.Z,draw:null,snap:null}},watch:{tool(t){this.addInteractions()}},methods:{initMap(){let t=new a.Z({source:new s.Z({url:"http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"})}),e=new u.Z({source:this.source,style:new m.ZP({fill:new v.Z({color:"rgba(255, 255, 255, 0.2)"}),stroke:new w.Z({color:"#ffcc33",width:2}),image:new Z.Z({radius:7,fill:new v.Z({color:"#ffcc33"})})})});this.map=new l.Z({target:"map",layers:[t,e],view:new n.ZP({projection:"EPSG:4326",center:[115.543045,45.16871],zoom:10})});let i=new p.Z({source:this.source,insertVertexCondition:()=>!1});this.map.addInteraction(i),this.addInteractions()},addInteractions(){null!==this.draw&&this.map.removeInteraction(this.draw),null!==this.snap&&this.map.removeInteraction(this.snap),this.draw=new d.ZP({source:this.source,type:this.tool}),this.map.addInteraction(this.draw),this.snap=new h.Z({source:this.source})}},mounted(){this.initMap()}},g=f,b=i(1001),x=(0,b.Z)(g,o,r,!1,null,null,null),C=x.exports},83449:function(t,e,i){var o=i(5829),r=i(63388);class l extends o.Z{constructor(t){t=t||{};const e=void 0!==t.projection?t.projection:"EPSG:3857",i=void 0!==t.tileGrid?t.tileGrid:(0,r.dl)({extent:(0,r.Tl)(e),maxResolution:t.maxResolution,maxZoom:t.maxZoom,minZoom:t.minZoom,tileSize:t.tileSize});super({attributions:t.attributions,cacheSize:t.cacheSize,crossOrigin:t.crossOrigin,interpolate:t.interpolate,opaque:t.opaque,projection:e,reprojectionErrorThreshold:t.reprojectionErrorThreshold,tileGrid:i,tileLoadFunction:t.tileLoadFunction,tilePixelRatio:t.tilePixelRatio,tileUrlFunction:t.tileUrlFunction,url:t.url,urls:t.urls,wrapX:void 0===t.wrapX||t.wrapX,transition:t.transition,attributionsCollapsible:t.attributionsCollapsible,zDirection:t.zDirection}),this.gutter_=void 0!==t.gutter?t.gutter:0}getGutter(){return this.gutter_}}e.Z=l}}]);
//# sourceMappingURL=4342.048a48fc.js.map