"use strict";(self["webpackChunkvue2_template"]=self["webpackChunkvue2_template"]||[]).push([[5884],{42590:function(t,i,e){e.r(i),e.d(i,{default:function(){return _}});var n=function(){var t=this,i=t._self._c;return i("div",{staticClass:"vm"},[i("h2",{staticClass:"h-title"},[t._v("鼠标拖拽旋转/缩放")]),i("div",[t._v("按住Shift并使用鼠标拖拽可以旋转、缩放地图")]),i("div",{ref:"map",staticClass:"map-x"})])},a=[],s=(e(71827),e(6643)),o=e(9324),r=e(54235),l=e(83449),u=e(5761),c=e(17457),d={data(){return{map:null}},methods:{initMap(){this.map=new s.Z({target:this.$refs.map,interactions:c.c().extend([new u.Z]),layers:[new r.Z({name:"defaultLayer",source:new l.Z({url:"http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"})})],view:new o.ZP({center:[0,0],zoom:2})})}},mounted(){this.initMap()}},h=d,p=e(1001),v=(0,p.Z)(h,n,a,!1,null,null,null),_=v.exports},5761:function(t,i,e){var n=e(36549),a=e(10778);class s extends n.Z{constructor(t){t=t||{},super(t),this.condition_=t.condition?t.condition:a.vY,this.lastAngle_=void 0,this.lastMagnitude_=void 0,this.lastScaleDelta_=0,this.duration_=void 0!==t.duration?t.duration:400}handleDragEvent(t){if(!(0,a.QL)(t))return;const i=t.map,e=i.getSize(),n=t.pixel,s=n[0]-e[0]/2,o=e[1]/2-n[1],r=Math.atan2(o,s),l=Math.sqrt(s*s+o*o),u=i.getView();if(void 0!==this.lastAngle_){const t=this.lastAngle_-r;u.adjustRotationInternal(t)}this.lastAngle_=r,void 0!==this.lastMagnitude_&&u.adjustResolutionInternal(this.lastMagnitude_/l),void 0!==this.lastMagnitude_&&(this.lastScaleDelta_=this.lastMagnitude_/l),this.lastMagnitude_=l}handleUpEvent(t){if(!(0,a.QL)(t))return!0;const i=t.map,e=i.getView(),n=this.lastScaleDelta_>1?1:-1;return e.endInteraction(this.duration_,n),this.lastScaleDelta_=0,!1}handleDownEvent(t){return!!(0,a.QL)(t)&&(!!this.condition_(t)&&(t.map.getView().beginInteraction(),this.lastAngle_=void 0,this.lastMagnitude_=void 0,!0))}}i.Z=s},83449:function(t,i,e){var n=e(5829),a=e(63388);class s extends n.Z{constructor(t){t=t||{};const i=void 0!==t.projection?t.projection:"EPSG:3857",e=void 0!==t.tileGrid?t.tileGrid:(0,a.dl)({extent:(0,a.Tl)(i),maxResolution:t.maxResolution,maxZoom:t.maxZoom,minZoom:t.minZoom,tileSize:t.tileSize});super({attributions:t.attributions,cacheSize:t.cacheSize,crossOrigin:t.crossOrigin,interpolate:t.interpolate,opaque:t.opaque,projection:i,reprojectionErrorThreshold:t.reprojectionErrorThreshold,tileGrid:e,tileLoadFunction:t.tileLoadFunction,tilePixelRatio:t.tilePixelRatio,tileUrlFunction:t.tileUrlFunction,url:t.url,urls:t.urls,wrapX:void 0===t.wrapX||t.wrapX,transition:t.transition,attributionsCollapsible:t.attributionsCollapsible,zDirection:t.zDirection}),this.gutter_=void 0!==t.gutter?t.gutter:0}getGutter(){return this.gutter_}}i.Z=s}}]);
//# sourceMappingURL=5884.a16ea846.js.map