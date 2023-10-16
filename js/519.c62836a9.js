"use strict";(self["webpackChunkvue2_openlayers"]=self["webpackChunkvue2_openlayers"]||[]).push([[519],{1519:function(e,t,i){i.r(t),i.d(t,{default:function(){return O}});var n=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"mapCon"}},[t("h2",{staticClass:"h-title"},[e._v("计算距离和面积 calculatedLengthAndArea")]),t("div",{attrs:{id:"menu"}},[t("label",[e._v("Geometry type  ")]),t("el-select",{attrs:{placeholder:"请选择"},on:{change:e.typeChange},model:{value:e.typeValue,callback:function(t){e.typeValue=t},expression:"typeValue"}},[t("el-option",{attrs:{value:"length",label:"Length"}}),t("el-option",{attrs:{value:"area",label:"Area"}})],1),t("el-checkbox",{model:{value:e.geodesic,callback:function(t){e.geodesic=t},expression:"geodesic"}},[e._v("use geodesic measures")])],1),t("div",{staticClass:"map-x",attrs:{id:"map"}})])},s=[],o=(i(1827),i(7661)),a=i(4945),r=i(9391),l=i(7745),h=i(4109),d=i(225),p=i(2116),c=i(7166),m=i(4404),u=i(6615),g=i(2205),f=i(7712),P=i(9966),v=i(6241),E=i(2377),T=i(6594),w={data(){return{map:null,source:null,vector:null,draw:null,sketch:null,helpTooltipElement:null,helpTooltip:"",measureTooltipElement:null,measureTooltip:"",continuePolygonMsg:"Click to continue drawing the polygon",continueLineMsg:"Click to continue drawing the line",typeValue:"length",geodesic:!1}},mounted(){this.initMap(),this.createHelpTooltip(),this.createMeasureTooltip(),this.addVectorLayer(),this.addInteraction()},methods:{initMap(){this.map=new o.Z({target:"map",view:new a.ZP({center:[0,0],zoom:4}),layers:[new h.Z({title:"天地图矢量图层",source:new d.Z({url:"http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",wrapX:!1})})]})},createHelpTooltip(){this.helpTooltipElement&&this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement),this.helpTooltipElement=document.createElement("div"),this.helpTooltipElement.className="tooltip hidden",this.helpTooltip=new E.Z({element:this.helpTooltipElement,offset:[15,0],positioning:"center-left"}),this.map.addOverlay(this.helpTooltip)},createMeasureTooltip(){this.measureTooltipElement&&this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement),this.measureTooltipElement=document.createElement("div"),this.measureTooltipElement.className="tooltip tooltip-measure",this.measureTooltip=new E.Z({element:this.measureTooltipElement,offset:[0,-15],positioning:"bottom-center"}),this.map.addOverlay(this.measureTooltip)},addVectorLayer(){this.source=new c.Z({}),this.vector=new p.Z({source:this.source,style:new g.ZP({fill:new f.Z({color:"rgba(255, 255, 255, 0.2)"}),stroke:new P.Z({color:"#ffcc33",width:2}),image:new v.Z({radius:7,fill:new f.Z({color:"#ffcc33"})})})}),this.map.addLayer(this.vector),this.map.on("pointermove",this.pointerMoveHandler),this.map.getViewport().addEventListener("mouseout",(()=>{this.helpTooltipElement.classList.add("hidden")}))},pointerMoveHandler(e){if(e.dragging)return;let t="Click to start drawing";if(this.sketch){var i=this.sketch.getGeometry();i instanceof m.ZP?t=this.continuePolygonMsg:i instanceof u.Z&&(t=this.continueLineMsg)}this.helpTooltipElement.innerHTML=t,this.helpTooltip.setPosition(e.coordinate),this.helpTooltipElement.classList.remove("hidden")},addInteraction(){let e,t="area"==this.typeValue?"Polygon":"LineString";this.draw=new T.ZP({source:this.source,type:t,style:new g.ZP({fill:new f.Z({color:"rgba(255, 255, 255, 0.2)"}),stroke:new P.Z({color:"rgba(0, 0, 0, 0.5)",lineDash:[10,10],width:2}),image:new v.Z({radius:5,stroke:new P.Z({color:"rgba(0, 0, 0, 0.7)"}),fill:new f.Z({color:"rgba(255, 255, 255, 0.2)"})})})}),this.draw.on("drawstart",(t=>{this.sketch=t.feature;var i=t.coordinate;e=this.sketch.getGeometry().on("change",(e=>{var t,n=e.target;n instanceof m.ZP?(t=this.formatArea(n),i=n.getInteriorPoint().getCoordinates()):n instanceof u.Z&&(t=this.formatLength(n),i=n.getLastCoordinate()),this.measureTooltipElement.innerHTML=t,this.measureTooltip.setPosition(i)}))}),this),this.draw.on("drawend",(t=>{this.measureTooltipElement.className="tooltip tooltip-static",this.measureTooltip.setOffset([0,-7]),this.sketch=null,this.measureTooltipElement=null,this.createMeasureTooltip(),(0,r.B)(e)}),this),this.map.addInteraction(this.draw)},typeChange(){this.map.removeInteraction(this.draw),this.addInteraction()},formatLength(e){var t,i;if(this.geodesic){var n=this.map.getView().getProjection();t=(0,l.xA)(e,{projection:n,radius:6378137})}else t=Math.round(100*e.getLength())/100;return i=t>100?Math.round(t/1e3*100)/100+" km":Math.round(100*t)/100+" m",i},formatArea(e){var t,i;if(this.geodesic){var n=this.map.getView().getProjection(),s=e.clone().transform(n,"EPSG:4326");t=Math.abs((0,l.bg)(s,{projection:n,radius:6378137}))}else t=e.getArea();return i=t>1e4?Math.round(t/1e6*100)/100+" km<sup>2</sup>":Math.round(100*t)/100+" m<sup>2</sup>",i}}},y=w,C=i(3736),M=(0,C.Z)(y,n,s,!1,null,"1fb4a40c",null),O=M.exports},2377:function(e,t,i){var n=i(9845),s=i(9529),o=i(2711),a=i(944),r=i(5423),l=i(1557);const h={ELEMENT:"element",MAP:"map",OFFSET:"offset",POSITION:"position",POSITIONING:"positioning"};class d extends n.Z{constructor(e){super(),this.on,this.once,this.un,this.options=e,this.id=e.id,this.insertFirst=void 0===e.insertFirst||e.insertFirst,this.stopEvent=void 0===e.stopEvent||e.stopEvent,this.element=document.createElement("div"),this.element.className=void 0!==e.className?e.className:"ol-overlay-container "+o.$A,this.element.style.position="absolute",this.element.style.pointerEvents="auto",this.autoPan=!0===e.autoPan?{}:e.autoPan||void 0,this.rendered={transform_:"",visible:!0},this.mapPostrenderListenerKey=null,this.addChangeListener(h.ELEMENT,this.handleElementChanged),this.addChangeListener(h.MAP,this.handleMapChanged),this.addChangeListener(h.OFFSET,this.handleOffsetChanged),this.addChangeListener(h.POSITION,this.handlePositionChanged),this.addChangeListener(h.POSITIONING,this.handlePositioningChanged),void 0!==e.element&&this.setElement(e.element),this.setOffset(void 0!==e.offset?e.offset:[0,0]),this.setPositioning(e.positioning||"top-left"),void 0!==e.position&&this.setPosition(e.position)}getElement(){return this.get(h.ELEMENT)}getId(){return this.id}getMap(){return this.get(h.MAP)||null}getOffset(){return this.get(h.OFFSET)}getPosition(){return this.get(h.POSITION)}getPositioning(){return this.get(h.POSITIONING)}handleElementChanged(){(0,l.ep)(this.element);const e=this.getElement();e&&this.element.appendChild(e)}handleMapChanged(){this.mapPostrenderListenerKey&&((0,l.ZF)(this.element),(0,r.bN)(this.mapPostrenderListenerKey),this.mapPostrenderListenerKey=null);const e=this.getMap();if(e){this.mapPostrenderListenerKey=(0,r.oL)(e,s.Z.POSTRENDER,this.render,this),this.updatePixelPosition();const t=this.stopEvent?e.getOverlayContainerStopEvent():e.getOverlayContainer();this.insertFirst?t.insertBefore(this.element,t.childNodes[0]||null):t.appendChild(this.element),this.performAutoPan()}}render(){this.updatePixelPosition()}handleOffsetChanged(){this.updatePixelPosition()}handlePositionChanged(){this.updatePixelPosition(),this.performAutoPan()}handlePositioningChanged(){this.updatePixelPosition()}setElement(e){this.set(h.ELEMENT,e)}setMap(e){this.set(h.MAP,e)}setOffset(e){this.set(h.OFFSET,e)}setPosition(e){this.set(h.POSITION,e)}performAutoPan(){this.autoPan&&this.panIntoView(this.autoPan)}panIntoView(e){const t=this.getMap();if(!t||!t.getTargetElement()||!this.get(h.POSITION))return;const i=this.getRect(t.getTargetElement(),t.getSize()),n=this.getElement(),s=this.getRect(n,[(0,l.iO)(n),(0,l.Pb)(n)]);e=e||{};const o=void 0===e.margin?20:e.margin;if(!(0,a.r4)(i,s)){const n=s[0]-i[0],a=i[2]-s[2],r=s[1]-i[1],l=i[3]-s[3],h=[0,0];if(n<0?h[0]=n-o:a<0&&(h[0]=Math.abs(a)+o),r<0?h[1]=r-o:l<0&&(h[1]=Math.abs(l)+o),0!==h[0]||0!==h[1]){const i=t.getView().getCenterInternal(),n=t.getPixelFromCoordinateInternal(i);if(!n)return;const s=[n[0]+h[0],n[1]+h[1]],o=e.animation||{};t.getView().animateInternal({center:t.getCoordinateFromPixelInternal(s),duration:o.duration,easing:o.easing})}}}getRect(e,t){const i=e.getBoundingClientRect(),n=i.left+window.pageXOffset,s=i.top+window.pageYOffset;return[n,s,n+t[0],s+t[1]]}setPositioning(e){this.set(h.POSITIONING,e)}setVisible(e){this.rendered.visible!==e&&(this.element.style.display=e?"":"none",this.rendered.visible=e)}updatePixelPosition(){const e=this.getMap(),t=this.getPosition();if(!e||!e.isRendered()||!t)return void this.setVisible(!1);const i=e.getPixelFromCoordinate(t),n=e.getSize();this.updateRenderedPosition(i,n)}updateRenderedPosition(e,t){const i=this.element.style,n=this.getOffset(),s=this.getPositioning();this.setVisible(!0);const o=Math.round(e[0]+n[0])+"px",a=Math.round(e[1]+n[1])+"px";let r="0%",l="0%";"bottom-right"==s||"center-right"==s||"top-right"==s?r="-100%":"bottom-center"!=s&&"center-center"!=s&&"top-center"!=s||(r="-50%"),"bottom-left"==s||"bottom-center"==s||"bottom-right"==s?l="-100%":"center-left"!=s&&"center-center"!=s&&"center-right"!=s||(l="-50%");const h=`translate(${r}, ${l}) translate(${o}, ${a})`;this.rendered.transform_!=h&&(this.rendered.transform_=h,i.transform=h)}getOptions(){return this.options}}t.Z=d}}]);
//# sourceMappingURL=519.c62836a9.js.map