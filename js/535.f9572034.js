"use strict";(self["webpackChunkvue2_template"]=self["webpackChunkvue2_template"]||[]).push([[535],{50535:function(t,i,e){e.r(i),e.d(i,{default:function(){return d}});var o=function(){var t=this;t._self._c;return t._m(0)},n=[function(){var t=this,i=t._self._c;return i("div",{staticClass:"vm"},[i("h2",{staticClass:"h-title"},[t._v(" 限制图层的最大/最小分辨率 minResolution / maxResolution ")]),i("div",{staticClass:"explain"},[i("p",[t._v("在限制的范围之内时显示图层，在限制的范围之外时不显示图层")]),i("p",[t._v(" 只有当指定图层在 minResolution 和 maxResolution 范围内，才显示。 ")])]),i("div",{staticClass:"map-x",attrs:{id:"map"}})])}],r=(e(71827),e(6643)),a=e(9324),l=e(54235),s=e(83449),u={name:"Resolution",data(){return{map:null}},methods:{initMap(){this.map=new r.Z({target:"map",layers:[new l.Z({source:new s.Z({url:"http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=49d0c416ba07ffa62dbf768c6f733645",wrapX:!1})}),new l.Z({source:new s.Z({url:"http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=49d0c416ba07ffa62dbf768c6f733645",wrapX:!1}),maxResolution:4e3})],view:new a.ZP({center:[653600,5723680],zoom:5})})}},mounted(){this.initMap()}},c=u,p=e(1001),m=(0,p.Z)(c,o,n,!1,null,null,null),d=m.exports},71827:function(){},83449:function(t,i,e){var o=e(5829),n=e(63388);class r extends o.Z{constructor(t){t=t||{};const i=void 0!==t.projection?t.projection:"EPSG:3857",e=void 0!==t.tileGrid?t.tileGrid:(0,n.dl)({extent:(0,n.Tl)(i),maxResolution:t.maxResolution,maxZoom:t.maxZoom,minZoom:t.minZoom,tileSize:t.tileSize});super({attributions:t.attributions,cacheSize:t.cacheSize,crossOrigin:t.crossOrigin,interpolate:t.interpolate,opaque:t.opaque,projection:i,reprojectionErrorThreshold:t.reprojectionErrorThreshold,tileGrid:e,tileLoadFunction:t.tileLoadFunction,tilePixelRatio:t.tilePixelRatio,tileUrlFunction:t.tileUrlFunction,url:t.url,urls:t.urls,wrapX:void 0===t.wrapX||t.wrapX,transition:t.transition,attributionsCollapsible:t.attributionsCollapsible,zDirection:t.zDirection}),this.gutter_=void 0!==t.gutter?t.gutter:0}getGutter(){return this.gutter_}}i.Z=r}}]);
//# sourceMappingURL=535.f9572034.js.map