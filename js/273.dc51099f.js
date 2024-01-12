"use strict";(self["webpackChunkvue2_template"]=self["webpackChunkvue2_template"]||[]).push([[273],{70579:function(t,e,i){i.r(e),i.d(e,{default:function(){return g}});var r=function(){var t=this,e=t._self._c;return e("div",{staticClass:"vm"},[e("h2",{staticClass:"h-title"},[t._v("设置图层的源 setSource")]),e("button",{on:{click:function(e){return t.setSource("osm")}}},[t._v("设置为XZY")]),e("button",{on:{click:function(e){return t.setSource("bing")}}},[t._v("设置为BingMaps")]),e("div",{staticClass:"map-x",attrs:{id:"map"}})])},o=[],n=(i(71827),i(6643)),s=i(9324),a=i(54235),l=i(83449),c=i(29851),u=i(30902),h={name:"SetSource",data(){return{map:null,osm:new l.Z({url:"http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"}),bing:new c.Z({key:"AiZrfxUNMRpOOlCpcMkBPxMUSKOEzqGeJTcVKUrXBsUdQDXutUBFN3-GnMNSlso-",imagerySet:"Aerial"}),layer:new a.Z}},methods:{initMap(){this.map=new n.Z({target:"map",layers:[this.layer],view:new s.ZP({center:(0,u.mi)([114.064839,22.548857]),zoom:12})}),this.layer.setSource(this.osm)},setSource(t){this.layer.setSource(this[t])}},mounted(){this.initMap()}},m=h,d=i(1001),p=(0,d.Z)(m,r,o,!1,null,null,null),g=p.exports},29851:function(t,e,i){i(98858),i(61318),i(33228),i(70560);var r=i(5829),o=i(47322),n=i(35330),s=i(31798),a=i(63388),l=i(30902);function c(t){const e=t[0],i=new Array(e);let r,o,n=1<<e-1;for(r=0;r<e;++r)o=48,t[1]&n&&(o+=1),t[2]&n&&(o+=2),i[r]=String.fromCharCode(o),n>>=1;return i.join("")}const u='<a class="ol-attribution-bing-tos" href="https://www.microsoft.com/maps/product/terms.html" target="_blank">Terms of Use</a>';class h extends r.Z{constructor(t){const e=void 0!==t.hidpi&&t.hidpi;super({cacheSize:t.cacheSize,crossOrigin:"anonymous",interpolate:t.interpolate,opaque:!0,projection:(0,l.U2)("EPSG:3857"),reprojectionErrorThreshold:t.reprojectionErrorThreshold,state:"loading",tileLoadFunction:t.tileLoadFunction,tilePixelRatio:e?2:1,wrapX:void 0===t.wrapX||t.wrapX,transition:t.transition,zDirection:t.zDirection}),this.hidpi_=e,this.culture_=void 0!==t.culture?t.culture:"en-us",this.maxZoom_=void 0!==t.maxZoom?t.maxZoom:-1,this.apiKey_=t.key,this.imagerySet_=t.imagerySet,this.placeholderTiles_=t.placeholderTiles;const i="https://dev.virtualearth.net/REST/v1/Imagery/Metadata/"+this.imagerySet_+"?uriScheme=https&include=ImageryProviders&key="+this.apiKey_+"&c="+this.culture_;fetch(i).then((t=>t.json())).then((t=>this.handleImageryMetadataResponse(t)))}getApiKey(){return this.apiKey_}getImagerySet(){return this.imagerySet_}handleImageryMetadataResponse(t){if(200!=t.statusCode||"OK"!=t.statusDescription||"ValidCredentials"!=t.authenticationResultCode||1!=t.resourceSets.length||1!=t.resourceSets[0].resources.length)return void this.setState("error");const e=t.resourceSets[0].resources[0],i=-1==this.maxZoom_?e.zoomMax:this.maxZoom_,r=this.getProjection(),h=(0,a.Tl)(r),m=this.hidpi_?2:1,d=e.imageWidth==e.imageHeight?e.imageWidth/m:[e.imageWidth/m,e.imageHeight/m],p=(0,a.dl)({extent:h,minZoom:e.zoomMin,maxZoom:i,tileSize:d});this.tileGrid=p;const g=this.culture_,S=this.hidpi_,v=this.placeholderTiles_;if(this.tileUrlFunction=(0,n.Un)(e.imageUrlSubdomains.map((function(t){const i=[0,0,0],r=e.imageUrl.replace("{subdomain}",t).replace("{culture}",g);return function(t,e,o){if(!t)return;(0,s.T9)(t[0],t[1],t[2],i);const n=new URL(r.replace("{quadkey}",c(i))),a=n.searchParams;return S&&(a.set("dpi","d1"),a.set("device","mobile")),!0===v?a.delete("n"):!1===v&&a.set("n","z"),n.toString()}}))),e.imageryProviders){const t=(0,l.WO)((0,l.U2)("EPSG:4326"),this.getProjection());this.setAttributions((i=>{const r=[],n=i.viewState,s=this.getTileGrid(),a=s.getZForResolution(n.resolution,this.zDirection),l=s.getTileCoordForCoordAndZ(n.center,a),c=l[0];return e.imageryProviders.map((function(e){let n=!1;const s=e.coverageAreas;for(let r=0,a=s.length;r<a;++r){const e=s[r];if(c>=e.zoomMin&&c<=e.zoomMax){const r=e.bbox,s=[r[1],r[0],r[3],r[2]],a=(0,o.Ne)(s,t);if((0,o.kK)(a,i.extent)){n=!0;break}}}n&&r.push(e.attribution)})),r.push(u),r}))}this.setState("ready")}}e.Z=h},83449:function(t,e,i){var r=i(5829),o=i(63388);class n extends r.Z{constructor(t){t=t||{};const e=void 0!==t.projection?t.projection:"EPSG:3857",i=void 0!==t.tileGrid?t.tileGrid:(0,o.dl)({extent:(0,o.Tl)(e),maxResolution:t.maxResolution,maxZoom:t.maxZoom,minZoom:t.minZoom,tileSize:t.tileSize});super({attributions:t.attributions,cacheSize:t.cacheSize,crossOrigin:t.crossOrigin,interpolate:t.interpolate,opaque:t.opaque,projection:e,reprojectionErrorThreshold:t.reprojectionErrorThreshold,tileGrid:i,tileLoadFunction:t.tileLoadFunction,tilePixelRatio:t.tilePixelRatio,tileUrlFunction:t.tileUrlFunction,url:t.url,urls:t.urls,wrapX:void 0===t.wrapX||t.wrapX,transition:t.transition,attributionsCollapsible:t.attributionsCollapsible,zDirection:t.zDirection}),this.gutter_=void 0!==t.gutter?t.gutter:0}getGutter(){return this.gutter_}}e.Z=n}}]);
//# sourceMappingURL=273.dc51099f.js.map