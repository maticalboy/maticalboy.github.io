"use strict";(self["webpackChunkvue2_template"]=self["webpackChunkvue2_template"]||[]).push([[2382],{52382:function(t,e,i){i.r(e),i.d(e,{default:function(){return g}});var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"vm"},[e("h2",{staticClass:"h-title"},[t._v("标记 marker")]),e("div",{staticClass:"map-x",attrs:{id:"map"}}),e("a",{ref:"viennaTxt",staticClass:"vienna",attrs:{target:"_blank",href:"https://baike.baidu.com/item/%E7%BB%B4%E4%B9%9F%E7%BA%B3/6412?fr=aladdin"}},[t._v("维也纳")]),e("div",{ref:"marker",staticClass:"marker",attrs:{title:"Marker"}})])},s=[],o=(i(71827),i(6643)),r=i(9324),a=i(54235),l=i(83449),h=i(30902),d=i(19838),p={name:"MapMarker",data(){return{map:null}},methods:{initMap(){let t=(0,h.mi)([16.3725,48.208889]),e=new d.Z({position:t,positioning:"top-center",element:this.$refs.viennaTxt}),i=new d.Z({position:t,positioning:"center-center",element:this.$refs.marker,stopEvent:!1});this.map=new o.Z({target:"map",layers:[new a.Z({source:new l.Z({url:"http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=49d0c416ba07ffa62dbf768c6f733645",wrapX:!1})}),new a.Z({source:new l.Z({url:"http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=49d0c416ba07ffa62dbf768c6f733645",wrapX:!1})})],view:new r.ZP({center:t,zoom:6})}),this.map.addOverlay(i),this.map.addOverlay(e)}},mounted(){this.initMap()}},u=p,c=i(1001),m=(0,c.Z)(u,n,s,!1,null,null,null),g=m.exports},71827:function(){},19838:function(t,e,i){var n=i(91266),s=i(85949),o=i(51133),r=i(47322),a=i(98257),l=i(72890);const h={ELEMENT:"element",MAP:"map",OFFSET:"offset",POSITION:"position",POSITIONING:"positioning"};class d extends n.Z{constructor(t){super(),this.on,this.once,this.un,this.options=t,this.id=t.id,this.insertFirst=void 0===t.insertFirst||t.insertFirst,this.stopEvent=void 0===t.stopEvent||t.stopEvent,this.element=document.createElement("div"),this.element.className=void 0!==t.className?t.className:"ol-overlay-container "+o.$A,this.element.style.position="absolute",this.element.style.pointerEvents="auto",this.autoPan=!0===t.autoPan?{}:t.autoPan||void 0,this.rendered={transform_:"",visible:!0},this.mapPostrenderListenerKey=null,this.addChangeListener(h.ELEMENT,this.handleElementChanged),this.addChangeListener(h.MAP,this.handleMapChanged),this.addChangeListener(h.OFFSET,this.handleOffsetChanged),this.addChangeListener(h.POSITION,this.handlePositionChanged),this.addChangeListener(h.POSITIONING,this.handlePositioningChanged),void 0!==t.element&&this.setElement(t.element),this.setOffset(void 0!==t.offset?t.offset:[0,0]),this.setPositioning(t.positioning||"top-left"),void 0!==t.position&&this.setPosition(t.position)}getElement(){return this.get(h.ELEMENT)}getId(){return this.id}getMap(){return this.get(h.MAP)||null}getOffset(){return this.get(h.OFFSET)}getPosition(){return this.get(h.POSITION)}getPositioning(){return this.get(h.POSITIONING)}handleElementChanged(){(0,l.ep)(this.element);const t=this.getElement();t&&this.element.appendChild(t)}handleMapChanged(){this.mapPostrenderListenerKey&&((0,l.ZF)(this.element),(0,a.bN)(this.mapPostrenderListenerKey),this.mapPostrenderListenerKey=null);const t=this.getMap();if(t){this.mapPostrenderListenerKey=(0,a.oL)(t,s.Z.POSTRENDER,this.render,this),this.updatePixelPosition();const e=this.stopEvent?t.getOverlayContainerStopEvent():t.getOverlayContainer();this.insertFirst?e.insertBefore(this.element,e.childNodes[0]||null):e.appendChild(this.element),this.performAutoPan()}}render(){this.updatePixelPosition()}handleOffsetChanged(){this.updatePixelPosition()}handlePositionChanged(){this.updatePixelPosition(),this.performAutoPan()}handlePositioningChanged(){this.updatePixelPosition()}setElement(t){this.set(h.ELEMENT,t)}setMap(t){this.set(h.MAP,t)}setOffset(t){this.set(h.OFFSET,t)}setPosition(t){this.set(h.POSITION,t)}performAutoPan(){this.autoPan&&this.panIntoView(this.autoPan)}panIntoView(t){const e=this.getMap();if(!e||!e.getTargetElement()||!this.get(h.POSITION))return;const i=this.getRect(e.getTargetElement(),e.getSize()),n=this.getElement(),s=this.getRect(n,[(0,l.iO)(n),(0,l.Pb)(n)]);t=t||{};const o=void 0===t.margin?20:t.margin;if(!(0,r.r4)(i,s)){const n=s[0]-i[0],r=i[2]-s[2],a=s[1]-i[1],l=i[3]-s[3],h=[0,0];if(n<0?h[0]=n-o:r<0&&(h[0]=Math.abs(r)+o),a<0?h[1]=a-o:l<0&&(h[1]=Math.abs(l)+o),0!==h[0]||0!==h[1]){const i=e.getView().getCenterInternal(),n=e.getPixelFromCoordinateInternal(i);if(!n)return;const s=[n[0]+h[0],n[1]+h[1]],o=t.animation||{};e.getView().animateInternal({center:e.getCoordinateFromPixelInternal(s),duration:o.duration,easing:o.easing})}}}getRect(t,e){const i=t.getBoundingClientRect(),n=i.left+window.pageXOffset,s=i.top+window.pageYOffset;return[n,s,n+e[0],s+e[1]]}setPositioning(t){this.set(h.POSITIONING,t)}setVisible(t){this.rendered.visible!==t&&(this.element.style.display=t?"":"none",this.rendered.visible=t)}updatePixelPosition(){const t=this.getMap(),e=this.getPosition();if(!t||!t.isRendered()||!e)return void this.setVisible(!1);const i=t.getPixelFromCoordinate(e),n=t.getSize();this.updateRenderedPosition(i,n)}updateRenderedPosition(t,e){const i=this.element.style,n=this.getOffset(),s=this.getPositioning();this.setVisible(!0);const o=Math.round(t[0]+n[0])+"px",r=Math.round(t[1]+n[1])+"px";let a="0%",l="0%";"bottom-right"==s||"center-right"==s||"top-right"==s?a="-100%":"bottom-center"!=s&&"center-center"!=s&&"top-center"!=s||(a="-50%"),"bottom-left"==s||"bottom-center"==s||"bottom-right"==s?l="-100%":"center-left"!=s&&"center-center"!=s&&"center-right"!=s||(l="-50%");const h=`translate(${a}, ${l}) translate(${o}, ${r})`;this.rendered.transform_!=h&&(this.rendered.transform_=h,i.transform=h)}getOptions(){return this.options}}e.Z=d},83449:function(t,e,i){var n=i(5829),s=i(63388);class o extends n.Z{constructor(t){t=t||{};const e=void 0!==t.projection?t.projection:"EPSG:3857",i=void 0!==t.tileGrid?t.tileGrid:(0,s.dl)({extent:(0,s.Tl)(e),maxResolution:t.maxResolution,maxZoom:t.maxZoom,minZoom:t.minZoom,tileSize:t.tileSize});super({attributions:t.attributions,cacheSize:t.cacheSize,crossOrigin:t.crossOrigin,interpolate:t.interpolate,opaque:t.opaque,projection:e,reprojectionErrorThreshold:t.reprojectionErrorThreshold,tileGrid:i,tileLoadFunction:t.tileLoadFunction,tilePixelRatio:t.tilePixelRatio,tileUrlFunction:t.tileUrlFunction,url:t.url,urls:t.urls,wrapX:void 0===t.wrapX||t.wrapX,transition:t.transition,attributionsCollapsible:t.attributionsCollapsible,zDirection:t.zDirection}),this.gutter_=void 0!==t.gutter?t.gutter:0}getGutter(){return this.gutter_}}e.Z=o}}]);
//# sourceMappingURL=2382.01f0a594.js.map