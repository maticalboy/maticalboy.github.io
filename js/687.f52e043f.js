"use strict";(self["webpackChunkvue2_template"]=self["webpackChunkvue2_template"]||[]).push([[687],{60687:function(t,i,e){e.r(i),e.d(i,{default:function(){return m}});var o=function(){var t=this;t._self._c;return t._m(0)},s=[function(){var t=this,i=t._self._c;return i("div",{staticClass:"vm"},[i("h2",{staticClass:"h-title"},[t._v("轨迹回放")]),i("div",{staticClass:"map-x",attrs:{id:"map"}})])}],a=(e(71827),e(6643)),r=e(9324),n=e(7886),A=e(54235),h=e(83449),l=e(30902),g=e(81199),c=e(15980),C=e(30630),d=e(93315),u=e(70451),E=e(41030),I=e(62690),B=e(97912),w=e(85886),Q={data(){return{map:null,styles:{route:new u.ZP({stroke:new E.Z({color:"#bfa",width:2})}),goMark:new u.ZP({image:new I.Z({radius:7,fill:new B.Z({color:"black"}),stroke:new E.Z({color:"white",width:2})})}),startMarker:new u.ZP({image:new w.Z({anchor:[.5,1],src:e(84092),scale:.2})}),endMarker:new u.ZP({image:new w.Z({anchor:[.5,1],src:e(84092),scale:.2,offset:[-10,-35]})})},featureMove:{},carPoints:[],routeIndex:0,timer:{},coordinates:[[10836932.628965743,4998172.218425438],[10638182.82599503,3781582.515392581],[10897159.841987172,3552719.105911153],[11120000.530166456,4986126.775821152],[11360909.382252172,4895785.956289009],[11053750.595842887,3420219.23726401],[11294659.4479286,3257605.7621061527],[11565681.906525029,4823513.300663294],[11866817.971632171,4757263.366339724],[11535568.300014313,3185333.1064804387],[11812613.479912885,3058855.959135439],[12125794.987624314,4721127.038526867],[12402840.167522885,4684990.710714009],[12023408.725487886,2926356.090488296],[12300453.905386457,2860106.1561647244],[12643749.0196086,4630786.218994724],[12866589.707787886,4510331.792951867],[12547385.478774315,2878174.3200711533],[12932839.642111458,2878174.3200711533],[13113521.281175744,3751468.908881867],[13125566.723780029,4739195.202433295],[13691702.526181456,5425785.43087758],[13553179.936232172,6112375.659321865],[12920794.199507171,5407717.266971151],[12065567.774602886,4974081.3332168665],[12788294.330860028,4895785.956289009]],carPoint:{}}},mounted(){this.initMap(),this.addPointAndView()},methods:{initMap(){this.map=new a.Z({target:"map",view:new r.ZP({center:(0,l.mi)([120.9800615193,29.1326618704]),zoom:14}),layers:[new A.Z({source:new h.Z({url:"http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"}),visible:!0})]})},async addPointAndView(){await this.drawLine(),this.moveStart()},drawLine(){let t=new n.Z({geometry:new C.Z(this.coordinates)}),i=new c.Z({features:[t]}),e=new g.Z({source:i});this.map.addLayer(e)},moveStart(){this.dotsData=this.coordinates.map((t=>(0,l.vs)(t,"EPSG:3857","EPSG:4326"))),this.carPoints=[...this.dotsData],this.carPoint=new n.Z({geometry:new d.Z((0,l.mi)(this.carPoints[0]))}),this.carPoint.setStyle(new u.ZP({image:new w.Z({src:e(18017),scale:.2,anchor:[.5,.5],rotation:-this.countRotate()})}));let t=new c.Z({features:[this.carPoint]});this.carLayer=new g.Z({source:t}),this.map.addLayer(this.carLayer),this.timeStart()},timeStart(){this.timer=setInterval((()=>{if(this.routeIndex+1>=this.carPoints.length)return this.routeIndex=0,this.carLayer.getSource().removeFeature(this.carPoint),clearInterval(this.timer),void this.addPointAndView();this.nextPoint()===this.carPoints[this.routeIndex+1]&&(this.routeIndex++,this.carPoint.getStyle().getImage().setRotation(-this.countRotate())),this.carPoint.getGeometry().setCoordinates((0,l.mi)(this.carPoints[this.routeIndex]))}),10)},nextPoint(){let t=this.routeIndex,i=this.map.getPixelFromCoordinate((0,l.mi)(this.carPoints[t])),e=this.map.getPixelFromCoordinate((0,l.mi)(this.carPoints[t+1])),o=e[0]-i[0],s=e[1]-i[1],a=Math.sqrt(o*o+s*s);if(a<=1)return this.carPoints[t+1];{let e=i[0]+o/a,r=i[1]+s/a,n=(0,l.vs)(this.map.getCoordinateFromPixel([e,r]),"EPSG:3857","EPSG:4326");return this.carPoints[t]=n,this.carPoints[t]}},countRotate(){let t=this.routeIndex,i=t+1;i===this.carPoints.length&&(t--,i--);let e=this.carPoints[t],o=this.carPoints[i];return Math.atan2(o[1]-e[1],o[0]-e[0])}}},R=Q,p=e(1001),S=(0,p.Z)(R,o,s,!1,null,null,null),m=S.exports},71827:function(){},18017:function(t){t.exports="data:image/png;base64,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"},84092:function(t){t.exports="data:image/png;base64,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"},30630:function(t,i,e){var o=e(53605),s=e(28723),a=e(47322),r=e(3753),n=e(29015),A=e(47181),h=e(24410),l=e(95260),g=e(53751),c=e(76130),C=e(59449);class d extends o.ZP{constructor(t,i){super(),this.flatMidpoint_=null,this.flatMidpointRevision_=-1,this.maxDelta_=-1,this.maxDeltaRevision_=-1,void 0===i||Array.isArray(t[0])?this.setCoordinates(t,i):this.setFlatCoordinates(i,t)}appendCoordinate(t){(0,A.l7)(this.flatCoordinates,t),this.changed()}clone(){const t=new d(this.flatCoordinates.slice(),this.layout);return t.applyProperties(this),t}closestPointXY(t,i,e,o){return o<(0,a.qf)(this.getExtent(),t,i)?o:(this.maxDeltaRevision_!=this.getRevision()&&(this.maxDelta_=Math.sqrt((0,s.Bv)(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,0)),this.maxDeltaRevision_=this.getRevision()),(0,s.H$)(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,this.maxDelta_,!1,t,i,e,o))}forEachSegment(t){return(0,h.E)(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,t)}getCoordinateAtM(t,i){return"XYM"!=this.layout&&"XYZM"!=this.layout?null:(i=void 0!==i&&i,(0,g.iJ)(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,t,i))}getCoordinates(){return(0,l.Ml)(this.flatCoordinates,0,this.flatCoordinates.length,this.stride)}getCoordinateAt(t,i){return(0,g.WW)(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,t,i,this.stride)}getLength(){return(0,C.W)(this.flatCoordinates,0,this.flatCoordinates.length,this.stride)}getFlatMidpoint(){return this.flatMidpointRevision_!=this.getRevision()&&(this.flatMidpoint_=this.getCoordinateAt(.5,this.flatMidpoint_??void 0),this.flatMidpointRevision_=this.getRevision()),this.flatMidpoint_}getSimplifiedGeometryInternal(t){const i=[];return i.length=(0,n.dt)(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,t,i,0),new d(i,"XY")}getType(){return"LineString"}intersectsExtent(t){return(0,c.Kz)(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,t)}setCoordinates(t,i){this.setLayout(i,t,1),this.flatCoordinates||(this.flatCoordinates=[]),this.flatCoordinates.length=(0,r.Sg)(this.flatCoordinates,0,t,this.stride),this.changed()}}i.Z=d},83449:function(t,i,e){var o=e(5829),s=e(63388);class a extends o.Z{constructor(t){t=t||{};const i=void 0!==t.projection?t.projection:"EPSG:3857",e=void 0!==t.tileGrid?t.tileGrid:(0,s.dl)({extent:(0,s.Tl)(i),maxResolution:t.maxResolution,maxZoom:t.maxZoom,minZoom:t.minZoom,tileSize:t.tileSize});super({attributions:t.attributions,cacheSize:t.cacheSize,crossOrigin:t.crossOrigin,interpolate:t.interpolate,opaque:t.opaque,projection:i,reprojectionErrorThreshold:t.reprojectionErrorThreshold,tileGrid:e,tileLoadFunction:t.tileLoadFunction,tilePixelRatio:t.tilePixelRatio,tileUrlFunction:t.tileUrlFunction,url:t.url,urls:t.urls,wrapX:void 0===t.wrapX||t.wrapX,transition:t.transition,attributionsCollapsible:t.attributionsCollapsible,zDirection:t.zDirection}),this.gutter_=void 0!==t.gutter?t.gutter:0}getGutter(){return this.gutter_}}i.Z=a}}]);
//# sourceMappingURL=687.f52e043f.js.map