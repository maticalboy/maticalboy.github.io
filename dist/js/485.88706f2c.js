"use strict";(self["webpackChunkvue2_openlayers"]=self["webpackChunkvue2_openlayers"]||[]).push([[485],{4887:function(t,e,i){i.r(e),i.d(e,{default:function(){return c}});var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"vm"},[e("h2",{staticClass:"h-title"},[t._v("标记 marker")]),e("div",{staticClass:"map-x",attrs:{id:"map"}}),e("a",{ref:"viennaTxt",staticClass:"vienna",attrs:{target:"_blank",href:"https://baike.baidu.com/item/%E7%BB%B4%E4%B9%9F%E7%BA%B3/6412?fr=aladdin"}},[t._v("维也纳")]),e("div",{ref:"marker",staticClass:"marker",attrs:{title:"Marker"}})])},s=[],r=(i(1827),i(7661)),o=i(4945),a=i(4109),h=i(225),l=i(6021),d=i(2377),p={name:"MapMarker",data(){return{map:null}},methods:{initMap(){let t=(0,l.mi)([16.3725,48.208889]),e=new d.Z({position:t,positioning:"top-center",element:this.$refs.viennaTxt}),i=new d.Z({position:t,positioning:"center-center",element:this.$refs.marker,stopEvent:!1});this.map=new r.Z({target:"map",layers:[new a.Z({source:new h.Z({url:"http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",wrapX:!1})})],view:new o.ZP({center:t,zoom:6})}),this.map.addOverlay(i),this.map.addOverlay(e)}},mounted(){this.initMap()}},g=p,m=i(3736),u=(0,m.Z)(g,n,s,!1,null,null,null),c=u.exports},2377:function(t,e,i){var n=i(9845),s=i(9529),r=i(2711),o=i(944),a=i(5423),h=i(1557);const l={ELEMENT:"element",MAP:"map",OFFSET:"offset",POSITION:"position",POSITIONING:"positioning"};class d extends n.Z{constructor(t){super(),this.on,this.once,this.un,this.options=t,this.id=t.id,this.insertFirst=void 0===t.insertFirst||t.insertFirst,this.stopEvent=void 0===t.stopEvent||t.stopEvent,this.element=document.createElement("div"),this.element.className=void 0!==t.className?t.className:"ol-overlay-container "+r.$A,this.element.style.position="absolute",this.element.style.pointerEvents="auto",this.autoPan=!0===t.autoPan?{}:t.autoPan||void 0,this.rendered={transform_:"",visible:!0},this.mapPostrenderListenerKey=null,this.addChangeListener(l.ELEMENT,this.handleElementChanged),this.addChangeListener(l.MAP,this.handleMapChanged),this.addChangeListener(l.OFFSET,this.handleOffsetChanged),this.addChangeListener(l.POSITION,this.handlePositionChanged),this.addChangeListener(l.POSITIONING,this.handlePositioningChanged),void 0!==t.element&&this.setElement(t.element),this.setOffset(void 0!==t.offset?t.offset:[0,0]),this.setPositioning(t.positioning||"top-left"),void 0!==t.position&&this.setPosition(t.position)}getElement(){return this.get(l.ELEMENT)}getId(){return this.id}getMap(){return this.get(l.MAP)||null}getOffset(){return this.get(l.OFFSET)}getPosition(){return this.get(l.POSITION)}getPositioning(){return this.get(l.POSITIONING)}handleElementChanged(){(0,h.ep)(this.element);const t=this.getElement();t&&this.element.appendChild(t)}handleMapChanged(){this.mapPostrenderListenerKey&&((0,h.ZF)(this.element),(0,a.bN)(this.mapPostrenderListenerKey),this.mapPostrenderListenerKey=null);const t=this.getMap();if(t){this.mapPostrenderListenerKey=(0,a.oL)(t,s.Z.POSTRENDER,this.render,this),this.updatePixelPosition();const e=this.stopEvent?t.getOverlayContainerStopEvent():t.getOverlayContainer();this.insertFirst?e.insertBefore(this.element,e.childNodes[0]||null):e.appendChild(this.element),this.performAutoPan()}}render(){this.updatePixelPosition()}handleOffsetChanged(){this.updatePixelPosition()}handlePositionChanged(){this.updatePixelPosition(),this.performAutoPan()}handlePositioningChanged(){this.updatePixelPosition()}setElement(t){this.set(l.ELEMENT,t)}setMap(t){this.set(l.MAP,t)}setOffset(t){this.set(l.OFFSET,t)}setPosition(t){this.set(l.POSITION,t)}performAutoPan(){this.autoPan&&this.panIntoView(this.autoPan)}panIntoView(t){const e=this.getMap();if(!e||!e.getTargetElement()||!this.get(l.POSITION))return;const i=this.getRect(e.getTargetElement(),e.getSize()),n=this.getElement(),s=this.getRect(n,[(0,h.iO)(n),(0,h.Pb)(n)]);t=t||{};const r=void 0===t.margin?20:t.margin;if(!(0,o.r4)(i,s)){const n=s[0]-i[0],o=i[2]-s[2],a=s[1]-i[1],h=i[3]-s[3],l=[0,0];if(n<0?l[0]=n-r:o<0&&(l[0]=Math.abs(o)+r),a<0?l[1]=a-r:h<0&&(l[1]=Math.abs(h)+r),0!==l[0]||0!==l[1]){const i=e.getView().getCenterInternal(),n=e.getPixelFromCoordinateInternal(i);if(!n)return;const s=[n[0]+l[0],n[1]+l[1]],r=t.animation||{};e.getView().animateInternal({center:e.getCoordinateFromPixelInternal(s),duration:r.duration,easing:r.easing})}}}getRect(t,e){const i=t.getBoundingClientRect(),n=i.left+window.pageXOffset,s=i.top+window.pageYOffset;return[n,s,n+e[0],s+e[1]]}setPositioning(t){this.set(l.POSITIONING,t)}setVisible(t){this.rendered.visible!==t&&(this.element.style.display=t?"":"none",this.rendered.visible=t)}updatePixelPosition(){const t=this.getMap(),e=this.getPosition();if(!t||!t.isRendered()||!e)return void this.setVisible(!1);const i=t.getPixelFromCoordinate(e),n=t.getSize();this.updateRenderedPosition(i,n)}updateRenderedPosition(t,e){const i=this.element.style,n=this.getOffset(),s=this.getPositioning();this.setVisible(!0);const r=Math.round(t[0]+n[0])+"px",o=Math.round(t[1]+n[1])+"px";let a="0%",h="0%";"bottom-right"==s||"center-right"==s||"top-right"==s?a="-100%":"bottom-center"!=s&&"center-center"!=s&&"top-center"!=s||(a="-50%"),"bottom-left"==s||"bottom-center"==s||"bottom-right"==s?h="-100%":"center-left"!=s&&"center-center"!=s&&"center-right"!=s||(h="-50%");const l=`translate(${a}, ${h}) translate(${r}, ${o})`;this.rendered.transform_!=l&&(this.rendered.transform_=l,i.transform=l)}getOptions(){return this.options}}e.Z=d}}]);
//# sourceMappingURL=485.88706f2c.js.map