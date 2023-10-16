"use strict";(self["webpackChunkvue2_openlayers"]=self["webpackChunkvue2_openlayers"]||[]).push([[144],{7144:function(t,e,i){i.r(e),i.d(e,{default:function(){return zt}});var n={};i.r(n),i.d(n,{DblClickDragZoom:function(){return M},DoubleClickZoom:function(){return A.Z},DragAndDrop:function(){return B},DragBox:function(){return H.Z},DragPan:function(){return K.Z},DragRotate:function(){return z.Z},DragRotateAndZoom:function(){return Z.Z},DragZoom:function(){return k.Z},Draw:function(){return W.ZP},Extent:function(){return dt},Interaction:function(){return D.ZP},KeyboardPan:function(){return ut.Z},KeyboardZoom:function(){return ct.Z},Link:function(){return Et},Modify:function(){return wt.Z},MouseWheelZoom:function(){return xt.Z},PinchRotate:function(){return Pt.Z},PinchZoom:function(){return bt.Z},Pointer:function(){return Y.Z},Select:function(){return Rt},Snap:function(){return Mt.Z},Translate:function(){return Gt},defaults:function(){return S.c}});var s=function(){var t=this;t._self._c;return t._m(0)},r=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"vm"},[e("h2",{staticClass:"h-title"},[t._v("总览控件（鹰眼、小地图） OverviewMap")]),e("div",{staticClass:"map-x",attrs:{id:"map"}})])}],a=(i(1827),i(7661)),o=i(4945),l=i(4109),h=i(225),d=(i(7658),i(5144)),u=i(8406),c=i(7621),p=i(9529),_=i(9709),g=i(5855),f=i(2377),m=i(523),v=i(2711),y=i(944),E=i(5423),w=i(4404),x=i(1557);const P=.75,b=.1;class T extends u.Z{constructor(t){t=t||{},super({element:document.createElement("div"),render:t.render,target:t.target}),this.boundHandleRotationChanged_=this.handleRotationChanged_.bind(this),this.collapsed_=void 0===t.collapsed||t.collapsed,this.collapsible_=void 0===t.collapsible||t.collapsible,this.collapsible_||(this.collapsed_=!1),this.rotateWithView_=void 0!==t.rotateWithView&&t.rotateWithView,this.viewExtent_=void 0;const e=void 0!==t.className?t.className:"ol-overviewmap",i=void 0!==t.tipLabel?t.tipLabel:"Overview map",n=void 0!==t.collapseLabel?t.collapseLabel:"‹";"string"===typeof n?(this.collapseLabel_=document.createElement("span"),this.collapseLabel_.textContent=n):this.collapseLabel_=n;const s=void 0!==t.label?t.label:"›";"string"===typeof s?(this.label_=document.createElement("span"),this.label_.textContent=s):this.label_=s;const r=this.collapsible_&&!this.collapsed_?this.collapseLabel_:this.label_,o=document.createElement("button");o.setAttribute("type","button"),o.title=i,o.appendChild(r),o.addEventListener(c.Z.CLICK,this.handleClick_.bind(this),!1),this.ovmapDiv_=document.createElement("div"),this.ovmapDiv_.className="ol-overviewmap-map",this.view_=t.view;const l=new a.Z({view:t.view,controls:new d.Z,interactions:new d.Z});this.ovmap_=l,t.layers&&t.layers.forEach((function(t){l.addLayer(t)}));const h=document.createElement("div");h.className="ol-overviewmap-box",h.style.boxSizing="border-box",this.boxOverlay_=new f.Z({position:[0,0],positioning:"center-center",element:h}),this.ovmap_.addOverlay(this.boxOverlay_);const u=e+" "+v.XV+" "+v.hg+(this.collapsed_&&this.collapsible_?" "+v.hN:"")+(this.collapsible_?"":" ol-uncollapsible"),p=this.element;p.className=u,p.appendChild(this.ovmapDiv_),p.appendChild(o);const _=this,g=this.boxOverlay_,m=this.boxOverlay_.getElement(),y=function(t){return{clientX:t.clientX,clientY:t.clientY}},E=function(t){const e=y(t),i=l.getEventCoordinateInternal(e);g.setPosition(i)},w=function(t){const e=l.getEventCoordinateInternal(t);_.getMap().getView().setCenterInternal(e),window.removeEventListener("mousemove",E),window.removeEventListener("mouseup",w)};m.addEventListener("mousedown",(function(){window.addEventListener("mousemove",E),window.addEventListener("mouseup",w)}))}setMap(t){const e=this.getMap();if(t!==e){if(e){const t=e.getView();t&&this.unbindView_(t),this.ovmap_.setTarget(null)}if(super.setMap(t),t){this.ovmap_.setTarget(this.ovmapDiv_),this.listenerKeys.push((0,E.oL)(t,g.Z.PROPERTYCHANGE,this.handleMapPropertyChange_,this));const e=t.getView();e&&(this.bindView_(e),e.isDef()&&(this.ovmap_.updateSize(),this.resetExtent_())),this.ovmap_.isRendered()||this.updateBoxAfterOvmapIsRendered_()}}}handleMapPropertyChange_(t){if(t.key===_.Z.VIEW){const e=t.oldValue;e&&this.unbindView_(e);const i=this.getMap().getView();this.bindView_(i)}else this.ovmap_.isRendered()||t.key!==_.Z.TARGET&&t.key!==_.Z.SIZE||this.ovmap_.updateSize()}bindView_(t){if(!this.view_){const e=new o.ZP({projection:t.getProjection()});this.ovmap_.setView(e)}t.addChangeListener(m.Z.ROTATION,this.boundHandleRotationChanged_),this.handleRotationChanged_()}unbindView_(t){t.removeChangeListener(m.Z.ROTATION,this.boundHandleRotationChanged_)}handleRotationChanged_(){this.rotateWithView_&&this.ovmap_.getView().setRotation(this.getMap().getView().getRotation())}validateExtent_(){const t=this.getMap(),e=this.ovmap_;if(!t.isRendered()||!e.isRendered())return;const i=t.getSize(),n=t.getView(),s=n.calculateExtentInternal(i);if(this.viewExtent_&&(0,y.fS)(s,this.viewExtent_))return;this.viewExtent_=s;const r=e.getSize(),a=e.getView(),o=a.calculateExtentInternal(r),l=e.getPixelFromCoordinateInternal((0,y.rL)(s)),h=e.getPixelFromCoordinateInternal((0,y.w$)(s)),d=Math.abs(l[0]-h[0]),u=Math.abs(l[1]-h[1]),c=r[0],p=r[1];d<c*b||u<p*b||d>c*P||u>p*P?this.resetExtent_():(0,y.r4)(o,s)||this.recenter_()}resetExtent_(){if(0===P||0===b)return;const t=this.getMap(),e=this.ovmap_,i=t.getSize(),n=t.getView(),s=n.calculateExtentInternal(i),r=e.getView(),a=Math.log(P/b)/Math.LN2,o=1/(Math.pow(2,a/2)*b);(0,y.H9)(s,o),r.fitInternal((0,w.oJ)(s))}recenter_(){const t=this.getMap(),e=this.ovmap_,i=t.getView(),n=e.getView();n.setCenterInternal(i.getCenterInternal())}updateBox_(){const t=this.getMap(),e=this.ovmap_;if(!t.isRendered()||!e.isRendered())return;const i=t.getSize(),n=t.getView(),s=e.getView(),r=this.rotateWithView_?0:-n.getRotation(),a=this.boxOverlay_,o=this.boxOverlay_.getElement(),l=n.getCenterInternal(),h=n.getResolution(),d=s.getResolution(),u=i[0]*h/d,c=i[1]*h/d;if(a.setPosition(l),o){o.style.width=u+"px",o.style.height=c+"px";const t="rotate("+r+"rad)";o.style.transform=t}}updateBoxAfterOvmapIsRendered_(){this.ovmapPostrenderKey_||(this.ovmapPostrenderKey_=(0,E.Vx)(this.ovmap_,p.Z.POSTRENDER,(function(t){delete this.ovmapPostrenderKey_,this.updateBox_()}),this))}handleClick_(t){t.preventDefault(),this.handleToggle_()}handleToggle_(){this.element.classList.toggle(v.hN),this.collapsed_?(0,x.$H)(this.collapseLabel_,this.label_):(0,x.$H)(this.label_,this.collapseLabel_),this.collapsed_=!this.collapsed_;const t=this.ovmap_;if(!this.collapsed_){if(t.isRendered())return this.viewExtent_=void 0,void t.render();t.updateSize(),this.resetExtent_(),this.updateBoxAfterOvmapIsRendered_()}}getCollapsible(){return this.collapsible_}setCollapsible(t){this.collapsible_!==t&&(this.collapsible_=t,this.element.classList.toggle("ol-uncollapsible"),!t&&this.collapsed_&&this.handleToggle_())}setCollapsed(t){this.collapsible_&&this.collapsed_!==t&&this.handleToggle_()}getCollapsed(){return this.collapsed_}getRotateWithView(){return this.rotateWithView_}setRotateWithView(t){this.rotateWithView_!==t&&(this.rotateWithView_=t,0!==this.getMap().getView().getRotation()&&(this.rotateWithView_?this.handleRotationChanged_():this.ovmap_.getView().setRotation(0),this.viewExtent_=void 0,this.validateExtent_(),this.updateBox_()))}getOverviewMap(){return this.ovmap_}render(t){this.validateExtent_(),this.updateBox_()}}var C=T,L=i(7910),S=i(7169),Z=i(1059),A=i(4868),D=i(81),I=i(9948);class O extends D.ZP{constructor(t){const e=t||{};super(e),e.stopDown&&(this.stopDown=e.stopDown),this.scaleDeltaByPixel_=e.delta?e.delta:.01,this.duration_=void 0!==e.duration?e.duration:250,this.handlingDownUpSequence_=!1,this.handlingDoubleDownSequence_=!1,this.doubleTapTimeoutId_=void 0,this.trackedPointers_={},this.targetPointers=[]}handleEvent(t){if(!t.originalEvent)return!0;let e=!1;if(this.updateTrackedPointers_(t),this.handlingDownUpSequence_){if(t.type==I.Z.POINTERDRAG)this.handleDragEvent(t),t.originalEvent.preventDefault();else if(t.type==I.Z.POINTERUP){const e=this.handleUpEvent(t);this.handlingDownUpSequence_=e}}else if(t.type==I.Z.POINTERDOWN)if(this.handlingDoubleDownSequence_){this.handlingDoubleDownSequence_=!1;const i=this.handleDownEvent(t);this.handlingDownUpSequence_=i,e=this.stopDown(i)}else e=this.stopDown(!1),this.waitForDblTap_();return!e}handleDragEvent(t){let e=1;const i=this.targetPointers[0],n=this.down_.originalEvent,s=i.clientY-n.clientY;void 0!==this.lastDistance_&&(e=1-(this.lastDistance_-s)*this.scaleDeltaByPixel_),this.lastDistance_=s,1!=e&&(this.lastScaleDelta_=e);const r=t.map,a=r.getView();r.render(),a.adjustResolutionInternal(e)}handleDownEvent(t){if(1==this.targetPointers.length){const e=t.map;return this.anchor_=null,this.lastDistance_=void 0,this.lastScaleDelta_=1,this.down_=t,this.handlingDownUpSequence_||e.getView().beginInteraction(),!0}return!1}handleUpEvent(t){if(0==this.targetPointers.length){const e=t.map,i=e.getView(),n=this.lastScaleDelta_>1?1:-1;return i.endInteraction(this.duration_,n),this.handlingDownUpSequence_=!1,this.handlingDoubleDownSequence_=!1,!1}return!0}stopDown(t){return t}updateTrackedPointers_(t){if(R(t)){const e=t.originalEvent,i=e.pointerId.toString();t.type==I.Z.POINTERUP?delete this.trackedPointers_[i]:(t.type==I.Z.POINTERDOWN||i in this.trackedPointers_)&&(this.trackedPointers_[i]=e),this.targetPointers=Object.values(this.trackedPointers_)}}waitForDblTap_(){void 0!==this.doubleTapTimeoutId_?(clearTimeout(this.doubleTapTimeoutId_),this.doubleTapTimeoutId_=void 0):(this.handlingDoubleDownSequence_=!0,this.doubleTapTimeoutId_=setTimeout(this.endInteraction_.bind(this),250))}endInteraction_(){this.handlingDoubleDownSequence_=!1,this.doubleTapTimeoutId_=void 0}}function R(t){const e=t.type;return e===I.Z.POINTERDOWN||e===I.Z.POINTERDRAG||e===I.Z.POINTERUP}var M=O,F=i(5375),V=i(6138),N=i(6021);const U={ADD_FEATURES:"addfeatures"};class G extends F.ZP{constructor(t,e,i,n){super(t),this.features=i,this.file=e,this.projection=n}}class q extends D.ZP{constructor(t){t=t||{},super({handleEvent:V.uX}),this.on,this.once,this.un,this.readAsBuffer_=!1,this.formats_=[];const e=t.formatConstructors?t.formatConstructors:[];for(let i=0,n=e.length;i<n;++i){let t=e[i];"function"===typeof t&&(t=new t),this.formats_.push(t),this.readAsBuffer_=this.readAsBuffer_||"arraybuffer"===t.getType()}this.projection_=t.projection?(0,N.U2)(t.projection):null,this.dropListenKeys_=null,this.source_=t.source||null,this.target=t.target?t.target:null}handleResult_(t,e){const i=e.target.result,n=this.getMap();let s,r=this.projection_;if(!r&&(r=(0,N.Cs)(),!r)){const t=n.getView();r=t.getProjection()}const a=this.formats_;for(let o=0,l=a.length;o<l;++o){const e=a[o];let n=i;this.readAsBuffer_&&"arraybuffer"!==e.getType()&&(void 0===s&&(s=(new TextDecoder).decode(i)),n=s);const l=this.tryReadFeatures_(e,n,{featureProjection:r});if(l&&l.length>0){this.source_&&(this.source_.clear(),this.source_.addFeatures(l)),this.dispatchEvent(new G(U.ADD_FEATURES,t,l,r));break}}}registerListeners_(){const t=this.getMap();if(t){const e=this.target?this.target:t.getViewport();this.dropListenKeys_=[(0,E.oL)(e,c.Z.DROP,this.handleDrop,this),(0,E.oL)(e,c.Z.DRAGENTER,this.handleStop,this),(0,E.oL)(e,c.Z.DRAGOVER,this.handleStop,this),(0,E.oL)(e,c.Z.DROP,this.handleStop,this)]}}setActive(t){!this.getActive()&&t&&this.registerListeners_(),this.getActive()&&!t&&this.unregisterListeners_(),super.setActive(t)}setMap(t){this.unregisterListeners_(),super.setMap(t),this.getActive()&&this.registerListeners_()}tryReadFeatures_(t,e,i){try{return t.readFeatures(e,i)}catch(n){return null}}unregisterListeners_(){this.dropListenKeys_&&(this.dropListenKeys_.forEach(E.bN),this.dropListenKeys_=null)}handleDrop(t){const e=t.dataTransfer.files;for(let i=0,n=e.length;i<n;++i){const t=e.item(i),n=new FileReader;n.addEventListener(c.Z.LOAD,this.handleResult_.bind(this,t)),this.readAsBuffer_?n.readAsArrayBuffer(t):n.readAsText(t)}}handleStop(t){t.stopPropagation(),t.preventDefault(),t.dataTransfer.dropEffect="copy"}}var B=q,H=i(9866),K=i(5176),z=i(5119),k=i(322),W=i(6594),j=i(1508),X=i(2949),Y=i(321),$=i(2116),J=i(7166),Q=i(3770),tt=i(2567),et=i(2205);const it={EXTENTCHANGED:"extentchanged"};class nt extends F.ZP{constructor(t){super(it.EXTENTCHANGED),this.extent=t}}class st extends Y.Z{constructor(t){t=t||{},super(t),this.on,this.once,this.un,this.condition_=t.condition?t.condition:Q.Bx,this.extent_=null,this.pointerHandler_=null,this.pixelTolerance_=void 0!==t.pixelTolerance?t.pixelTolerance:10,this.snappedToVertex_=!1,this.extentFeature_=null,this.vertexFeature_=null,t||(t={}),this.extentOverlay_=new $.Z({source:new J.Z({useSpatialIndex:!1,wrapX:!!t.wrapX}),style:t.boxStyle?t.boxStyle:rt(),updateWhileAnimating:!0,updateWhileInteracting:!0}),this.vertexOverlay_=new $.Z({source:new J.Z({useSpatialIndex:!1,wrapX:!!t.wrapX}),style:t.pointerStyle?t.pointerStyle:at(),updateWhileAnimating:!0,updateWhileInteracting:!0}),t.extent&&this.setExtent(t.extent)}snapToVertex_(t,e){const i=e.getCoordinateFromPixelInternal(t),n=function(t,e){return(0,tt.squaredDistanceToSegment)(i,t)-(0,tt.squaredDistanceToSegment)(i,e)},s=this.getExtentInternal();if(s){const r=ht(s);r.sort(n);const a=r[0];let o=(0,tt.closestOnSegment)(i,a);const l=e.getPixelFromCoordinateInternal(o);if((0,tt.distance)(t,l)<=this.pixelTolerance_){const t=e.getPixelFromCoordinateInternal(a[0]),i=e.getPixelFromCoordinateInternal(a[1]),n=(0,tt.squaredDistance)(l,t),s=(0,tt.squaredDistance)(l,i),r=Math.sqrt(Math.min(n,s));return this.snappedToVertex_=r<=this.pixelTolerance_,this.snappedToVertex_&&(o=n>s?a[1]:a[0]),o}}return null}handlePointerMove_(t){const e=t.pixel,i=t.map;let n=this.snapToVertex_(e,i);n||(n=i.getCoordinateFromPixelInternal(e)),this.createOrUpdatePointerFeature_(n)}createOrUpdateExtentFeature_(t){let e=this.extentFeature_;return e?t?e.setGeometry((0,w.oJ)(t)):e.setGeometry(void 0):(e=t?new j.Z((0,w.oJ)(t)):new j.Z({}),this.extentFeature_=e,this.extentOverlay_.getSource().addFeature(e)),e}createOrUpdatePointerFeature_(t){let e=this.vertexFeature_;if(e){const i=e.getGeometry();i.setCoordinates(t)}else e=new j.Z(new X.Z(t)),this.vertexFeature_=e,this.vertexOverlay_.getSource().addFeature(e);return e}handleEvent(t){return!t.originalEvent||!this.condition_(t)||(t.type!=I.Z.POINTERMOVE||this.handlingDownUpSequence||this.handlePointerMove_(t),super.handleEvent(t),!1)}handleDownEvent(t){const e=t.pixel,i=t.map,n=this.getExtentInternal();let s=this.snapToVertex_(e,i);const r=function(t){let e=null,i=null;return t[0]==n[0]?e=n[2]:t[0]==n[2]&&(e=n[0]),t[1]==n[1]?i=n[3]:t[1]==n[3]&&(i=n[1]),null!==e&&null!==i?[e,i]:null};if(s&&n){const t=s[0]==n[0]||s[0]==n[2]?s[0]:null,e=s[1]==n[1]||s[1]==n[3]?s[1]:null;null!==t&&null!==e?this.pointerHandler_=ot(r(s)):null!==t?this.pointerHandler_=lt(r([t,n[1]]),r([t,n[3]])):null!==e&&(this.pointerHandler_=lt(r([n[0],e]),r([n[2],e])))}else s=i.getCoordinateFromPixelInternal(e),this.setExtent([s[0],s[1],s[0],s[1]]),this.pointerHandler_=ot(s);return!0}handleDragEvent(t){if(this.pointerHandler_){const e=t.coordinate;this.setExtent(this.pointerHandler_(e)),this.createOrUpdatePointerFeature_(e)}}handleUpEvent(t){this.pointerHandler_=null;const e=this.getExtentInternal();return e&&0!==(0,y.bg)(e)||this.setExtent(null),!1}setMap(t){this.extentOverlay_.setMap(t),this.vertexOverlay_.setMap(t),super.setMap(t)}getExtent(){return(0,N.Fj)(this.getExtentInternal(),this.getMap().getView().getProjection())}getExtentInternal(){return this.extent_}setExtent(t){this.extent_=t||null,this.createOrUpdateExtentFeature_(t),this.dispatchEvent(new nt(this.extent_))}}function rt(){const t=(0,et.Ly)();return function(e,i){return t["Polygon"]}}function at(){const t=(0,et.Ly)();return function(e,i){return t["Point"]}}function ot(t){return function(e){return(0,y.hI)([t,e])}}function lt(t,e){return t[0]==e[0]?function(i){return(0,y.hI)([t,[i[0],e[1]]])}:t[1]==e[1]?function(i){return(0,y.hI)([t,[e[0],i[1]]])}:null}function ht(t){return[[[t[0],t[1]],[t[0],t[3]]],[[t[0],t[3]],[t[2],t[3]]],[[t[2],t[3]],[t[2],t[1]]],[[t[2],t[1]],[t[0],t[1]]]]}var dt=st,ut=i(19),ct=i(216),pt=(i(6229),i(7330),i(2062),i(5756));function _t(t){return(0,pt.FH)(t,5)}function gt(t){return parseFloat(t)}function ft(t){return _t(t).toString()}function mt(t,e){return!isNaN(t)&&t!==gt(ft(e))}function vt(t,e){return mt(t[0],e[0])||mt(t[1],e[1])}class yt extends D.ZP{constructor(t){let e;super(),t=Object.assign({animate:!0,params:["x","y","z","r","l"],replace:!1,prefix:""},t||{}),e=!0===t.animate?{duration:250}:t.animate?t.animate:null,this.animationOptions_=e,this.params_=t.params.reduce(((t,e)=>(t[e]=!0,t)),{}),this.replace_=t.replace,this.prefix_=t.prefix,this.listenerKeys_=[],this.initial_=!0,this.updateState_=this.updateState_.bind(this)}getParamName_(t){return this.prefix_?this.prefix_+t:t}get_(t,e){return t.get(this.getParamName_(e))}set_(t,e,i){e in this.params_&&t.set(this.getParamName_(e),i)}delete_(t,e){e in this.params_&&t.delete(this.getParamName_(e))}setMap(t){const e=this.getMap();super.setMap(t),t!==e&&(e&&this.unregisterListeners_(e),t&&(this.initial_=!0,this.updateState_(),this.registerListeners_(t)))}registerListeners_(t){this.listenerKeys_.push((0,E.oL)(t,p.Z.MOVEEND,this.updateUrl_,this),(0,E.oL)(t.getLayerGroup(),c.Z.CHANGE,this.updateUrl_,this),(0,E.oL)(t,"change:layergroup",this.handleChangeLayerGroup_,this)),this.replace_||addEventListener("popstate",this.updateState_)}unregisterListeners_(t){for(let n=0,s=this.listenerKeys_.length;n<s;++n)(0,E.bN)(this.listenerKeys_[n]);this.listenerKeys_.length=0,this.replace_||removeEventListener("popstate",this.updateState_);const e=new URL(window.location.href),i=e.searchParams;this.delete_(i,"x"),this.delete_(i,"y"),this.delete_(i,"z"),this.delete_(i,"r"),this.delete_(i,"l"),window.history.replaceState(null,"",e)}handleChangeLayerGroup_(){const t=this.getMap();t&&(this.unregisterListeners_(t),this.registerListeners_(t),this.initial_=!0,this.updateUrl_())}updateState_(){const t=this.getMap();if(!t)return;const e=t.getView();if(!e)return;const i=new URL(window.location.href),n=i.searchParams;let s=!1;const r={},a=gt(this.get_(n,"z"));"z"in this.params_&&mt(a,e.getZoom())&&(s=!0,r.zoom=a);const o=gt(this.get_(n,"r"));"r"in this.params_&&mt(o,e.getRotation())&&(s=!0,r.rotation=o);const l=[gt(this.get_(n,"x")),gt(this.get_(n,"y"))];("x"in this.params_||"y"in this.params_)&&vt(l,e.getCenter())&&(s=!0,r.center=l),s&&(!this.initial_&&this.animationOptions_?e.animate(Object.assign(r,this.animationOptions_)):(r.center&&e.setCenter(r.center),"zoom"in r&&e.setZoom(r.zoom),"rotation"in r&&e.setRotation(r.rotation)));const h=t.getAllLayers(),d=this.get_(n,"l");if("l"in this.params_&&d&&d.length===h.length)for(let u=0,c=h.length;u<c;++u){const t=parseInt(d[u]);if(!isNaN(t)){const e=Boolean(t),i=h[u];i.getVisible()!==e&&i.setVisible(e)}}}updateUrl_(){const t=this.getMap();if(!t)return;const e=t.getView();if(!e)return;const i=this.initial_;this.initial_=!1;const n=e.getCenter(),s=e.getZoom(),r=e.getRotation(),a=t.getAllLayers(),o=new Array(a.length);for(let d=0,u=a.length;d<u;++d)o[d]=a[d].getVisible()?"1":"0";const l=new URL(window.location.href),h=l.searchParams;this.set_(h,"x",ft(n[0])),this.set_(h,"y",ft(n[1])),this.set_(h,"z",ft(s)),this.set_(h,"r",ft(r)),this.set_(h,"l",o.join("")),l.href!==window.location.href&&(i||this.replace_?window.history.replaceState(history.state,"",l):window.history.pushState(null,"",l))}}var Et=yt,wt=i(4610),xt=i(505),Pt=i(3032),bt=i(5634),Tt=i(6208),Ct=i(8831),Lt=i(4008),St=i(1904);const Zt={SELECT:"select"};class At extends F.ZP{constructor(t,e,i,n){super(t),this.selected=e,this.deselected=i,this.mapBrowserEvent=n}}const Dt={};class It extends D.ZP{constructor(t){let e;if(super(),this.on,this.once,this.un,t=t||{},this.boundAddFeature_=this.addFeature_.bind(this),this.boundRemoveFeature_=this.removeFeature_.bind(this),this.condition_=t.condition?t.condition:Q.Kf,this.addCondition_=t.addCondition?t.addCondition:Q.Fi,this.removeCondition_=t.removeCondition?t.removeCondition:Q.Fi,this.toggleCondition_=t.toggleCondition?t.toggleCondition:Q.vY,this.multi_=!!t.multi&&t.multi,this.filter_=t.filter?t.filter:V.uX,this.hitTolerance_=t.hitTolerance?t.hitTolerance:0,this.style_=void 0!==t.style?t.style:Ot(),this.features_=t.features||new d.Z,t.layers)if("function"===typeof t.layers)e=t.layers;else{const i=t.layers;e=function(t){return i.includes(t)}}else e=V.uX;this.layerFilter_=e,this.featureLayerAssociation_={}}addFeatureLayerAssociation_(t,e){this.featureLayerAssociation_[(0,St.sq)(t)]=e}getFeatures(){return this.features_}getHitTolerance(){return this.hitTolerance_}getLayer(t){return this.featureLayerAssociation_[(0,St.sq)(t)]}setHitTolerance(t){this.hitTolerance_=t}setMap(t){const e=this.getMap();e&&this.style_&&this.features_.forEach(this.restorePreviousStyle_.bind(this)),super.setMap(t),t?(this.features_.addEventListener(Tt.Z.ADD,this.boundAddFeature_),this.features_.addEventListener(Tt.Z.REMOVE,this.boundRemoveFeature_),this.style_&&this.features_.forEach(this.applySelectedStyle_.bind(this))):(this.features_.removeEventListener(Tt.Z.ADD,this.boundAddFeature_),this.features_.removeEventListener(Tt.Z.REMOVE,this.boundRemoveFeature_))}addFeature_(t){const e=t.element;if(this.style_&&this.applySelectedStyle_(e),!this.getLayer(e)){const t=this.getMap().getAllLayers().find((function(t){if(t instanceof $.Z&&t.getSource()&&t.getSource().hasFeature(e))return t}));t&&this.addFeatureLayerAssociation_(e,t)}}removeFeature_(t){this.style_&&this.restorePreviousStyle_(t.element)}getStyle(){return this.style_}applySelectedStyle_(t){const e=(0,St.sq)(t);e in Dt||(Dt[e]=t.getStyle()),t.setStyle(this.style_)}restorePreviousStyle_(t){const e=this.getMap().getInteractions().getArray();for(let n=e.length-1;n>=0;--n){const i=e[n];if(i!==this&&i instanceof It&&i.getStyle()&&-1!==i.getFeatures().getArray().lastIndexOf(t))return void t.setStyle(i.getStyle())}const i=(0,St.sq)(t);t.setStyle(Dt[i]),delete Dt[i]}removeFeatureLayerAssociation_(t){delete this.featureLayerAssociation_[(0,St.sq)(t)]}handleEvent(t){if(!this.condition_(t))return!0;const e=this.addCondition_(t),i=this.removeCondition_(t),n=this.toggleCondition_(t),s=!e&&!i&&!n,r=t.map,a=this.getFeatures(),o=[],l=[];if(s){(0,Ct.Z)(this.featureLayerAssociation_),r.forEachFeatureAtPixel(t.pixel,((t,e)=>{if(t instanceof j.Z&&this.filter_(t,e))return this.addFeatureLayerAssociation_(t,e),l.push(t),!this.multi_}),{layerFilter:this.layerFilter_,hitTolerance:this.hitTolerance_});for(let t=a.getLength()-1;t>=0;--t){const e=a.item(t),i=l.indexOf(e);i>-1?l.splice(i,1):(a.remove(e),o.push(e))}0!==l.length&&a.extend(l)}else{r.forEachFeatureAtPixel(t.pixel,((t,s)=>{if(t instanceof j.Z&&this.filter_(t,s))return!e&&!n||a.getArray().includes(t)?(i||n)&&a.getArray().includes(t)&&(o.push(t),this.removeFeatureLayerAssociation_(t)):(this.addFeatureLayerAssociation_(t,s),l.push(t)),!this.multi_}),{layerFilter:this.layerFilter_,hitTolerance:this.hitTolerance_});for(let t=o.length-1;t>=0;--t)a.remove(o[t]);a.extend(l)}return(l.length>0||o.length>0)&&this.dispatchEvent(new At(Zt.SELECT,l,o,t)),!0}}function Ot(){const t=(0,et.Ly)();return(0,Lt.l7)(t["Polygon"],t["LineString"]),(0,Lt.l7)(t["GeometryCollection"],t["LineString"]),function(e){return e.getGeometry()?t[e.getGeometry().getType()]:null}}var Rt=It,Mt=i(7717),Ft=i(357);const Vt={TRANSLATESTART:"translatestart",TRANSLATING:"translating",TRANSLATEEND:"translateend"};class Nt extends F.ZP{constructor(t,e,i,n,s){super(t),this.features=e,this.coordinate=i,this.startCoordinate=n,this.mapBrowserEvent=s}}class Ut extends Y.Z{constructor(t){let e;if(t=t||{},super(t),this.on,this.once,this.un,this.lastCoordinate_=null,this.startCoordinate_=null,this.features_=void 0!==t.features?t.features:null,t.layers&&!this.features_)if("function"===typeof t.layers)e=t.layers;else{const i=t.layers;e=function(t){return i.includes(t)}}else e=V.uX;this.layerFilter_=e,this.filter_=t.filter&&!this.features_?t.filter:V.uX,this.hitTolerance_=t.hitTolerance?t.hitTolerance:0,this.condition_=t.condition?t.condition:Q.Bx,this.lastFeature_=null,this.addChangeListener(Ft.Z.ACTIVE,this.handleActiveChanged_)}handleDownEvent(t){if(!t.originalEvent||!this.condition_(t))return!1;if(this.lastFeature_=this.featuresAtPixel_(t.pixel,t.map),!this.lastCoordinate_&&this.lastFeature_){this.startCoordinate_=t.coordinate,this.lastCoordinate_=t.coordinate,this.handleMoveEvent(t);const e=this.features_||new d.Z([this.lastFeature_]);return this.dispatchEvent(new Nt(Vt.TRANSLATESTART,e,t.coordinate,this.startCoordinate_,t)),!0}return!1}handleUpEvent(t){if(this.lastCoordinate_){this.lastCoordinate_=null,this.handleMoveEvent(t);const e=this.features_||new d.Z([this.lastFeature_]);return this.dispatchEvent(new Nt(Vt.TRANSLATEEND,e,t.coordinate,this.startCoordinate_,t)),this.startCoordinate_=null,!0}return!1}handleDragEvent(t){if(this.lastCoordinate_){const e=t.coordinate,i=t.map.getView().getProjection(),n=(0,N.Vs)(e,i),s=(0,N.Vs)(this.lastCoordinate_,i),r=n[0]-s[0],a=n[1]-s[1],o=this.features_||new d.Z([this.lastFeature_]),l=(0,N.Cs)();o.forEach((function(t){const e=t.getGeometry();l?(e.transform(l,i),e.translate(r,a),e.transform(i,l)):e.translate(r,a),t.setGeometry(e)})),this.lastCoordinate_=e,this.dispatchEvent(new Nt(Vt.TRANSLATING,o,e,this.startCoordinate_,t))}}handleMoveEvent(t){const e=t.map.getViewport();this.featuresAtPixel_(t.pixel,t.map)?(e.classList.remove(this.lastCoordinate_?"ol-grab":"ol-grabbing"),e.classList.add(this.lastCoordinate_?"ol-grabbing":"ol-grab")):e.classList.remove("ol-grab","ol-grabbing")}featuresAtPixel_(t,e){return e.forEachFeatureAtPixel(t,((t,e)=>{if(t instanceof j.Z&&this.filter_(t,e)&&(!this.features_||this.features_.getArray().includes(t)))return t}),{layerFilter:this.layerFilter_,hitTolerance:this.hitTolerance_})}getHitTolerance(){return this.hitTolerance_}setHitTolerance(t){this.hitTolerance_=t}setMap(t){const e=this.getMap();super.setMap(t),this.updateState_(e)}handleActiveChanged_(){this.updateState_(null)}updateState_(t){let e=this.getMap();const i=this.getActive();if((!e||!i)&&(e=e||t,e)){const t=e.getViewport();t.classList.remove("ol-grab","ol-grabbing")}}}var Gt=Ut,qt={name:"OverviewMap",data(){return{map:null}},methods:{initMap(){let t=new C({className:"ol-overviewmap ol-custom-overviewmap",layers:[new l.Z({name:"defaultLayer",source:new h.Z({url:"http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"})})],collapseLabel:"»",label:"«",collapsed:!1});this.map=new a.Z({target:"map",controls:L.c().extend([t]),interactions:S.c().extend([new Z.Z]),layers:[new l.Z({source:new h.Z({url:"http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"})})],view:new o.ZP({center:(0,N.mi)([114.064839,22.548857]),zoom:6})})}},mounted(){this.initMap(),console.log(n)}},Bt=qt,Ht=i(3736),Kt=(0,Ht.Z)(Bt,s,r,!1,null,"fc45f3ea",null),zt=Kt.exports},2377:function(t,e,i){var n=i(9845),s=i(9529),r=i(2711),a=i(944),o=i(5423),l=i(1557);const h={ELEMENT:"element",MAP:"map",OFFSET:"offset",POSITION:"position",POSITIONING:"positioning"};class d extends n.Z{constructor(t){super(),this.on,this.once,this.un,this.options=t,this.id=t.id,this.insertFirst=void 0===t.insertFirst||t.insertFirst,this.stopEvent=void 0===t.stopEvent||t.stopEvent,this.element=document.createElement("div"),this.element.className=void 0!==t.className?t.className:"ol-overlay-container "+r.$A,this.element.style.position="absolute",this.element.style.pointerEvents="auto",this.autoPan=!0===t.autoPan?{}:t.autoPan||void 0,this.rendered={transform_:"",visible:!0},this.mapPostrenderListenerKey=null,this.addChangeListener(h.ELEMENT,this.handleElementChanged),this.addChangeListener(h.MAP,this.handleMapChanged),this.addChangeListener(h.OFFSET,this.handleOffsetChanged),this.addChangeListener(h.POSITION,this.handlePositionChanged),this.addChangeListener(h.POSITIONING,this.handlePositioningChanged),void 0!==t.element&&this.setElement(t.element),this.setOffset(void 0!==t.offset?t.offset:[0,0]),this.setPositioning(t.positioning||"top-left"),void 0!==t.position&&this.setPosition(t.position)}getElement(){return this.get(h.ELEMENT)}getId(){return this.id}getMap(){return this.get(h.MAP)||null}getOffset(){return this.get(h.OFFSET)}getPosition(){return this.get(h.POSITION)}getPositioning(){return this.get(h.POSITIONING)}handleElementChanged(){(0,l.ep)(this.element);const t=this.getElement();t&&this.element.appendChild(t)}handleMapChanged(){this.mapPostrenderListenerKey&&((0,l.ZF)(this.element),(0,o.bN)(this.mapPostrenderListenerKey),this.mapPostrenderListenerKey=null);const t=this.getMap();if(t){this.mapPostrenderListenerKey=(0,o.oL)(t,s.Z.POSTRENDER,this.render,this),this.updatePixelPosition();const e=this.stopEvent?t.getOverlayContainerStopEvent():t.getOverlayContainer();this.insertFirst?e.insertBefore(this.element,e.childNodes[0]||null):e.appendChild(this.element),this.performAutoPan()}}render(){this.updatePixelPosition()}handleOffsetChanged(){this.updatePixelPosition()}handlePositionChanged(){this.updatePixelPosition(),this.performAutoPan()}handlePositioningChanged(){this.updatePixelPosition()}setElement(t){this.set(h.ELEMENT,t)}setMap(t){this.set(h.MAP,t)}setOffset(t){this.set(h.OFFSET,t)}setPosition(t){this.set(h.POSITION,t)}performAutoPan(){this.autoPan&&this.panIntoView(this.autoPan)}panIntoView(t){const e=this.getMap();if(!e||!e.getTargetElement()||!this.get(h.POSITION))return;const i=this.getRect(e.getTargetElement(),e.getSize()),n=this.getElement(),s=this.getRect(n,[(0,l.iO)(n),(0,l.Pb)(n)]);t=t||{};const r=void 0===t.margin?20:t.margin;if(!(0,a.r4)(i,s)){const n=s[0]-i[0],a=i[2]-s[2],o=s[1]-i[1],l=i[3]-s[3],h=[0,0];if(n<0?h[0]=n-r:a<0&&(h[0]=Math.abs(a)+r),o<0?h[1]=o-r:l<0&&(h[1]=Math.abs(l)+r),0!==h[0]||0!==h[1]){const i=e.getView().getCenterInternal(),n=e.getPixelFromCoordinateInternal(i);if(!n)return;const s=[n[0]+h[0],n[1]+h[1]],r=t.animation||{};e.getView().animateInternal({center:e.getCoordinateFromPixelInternal(s),duration:r.duration,easing:r.easing})}}}getRect(t,e){const i=t.getBoundingClientRect(),n=i.left+window.pageXOffset,s=i.top+window.pageYOffset;return[n,s,n+e[0],s+e[1]]}setPositioning(t){this.set(h.POSITIONING,t)}setVisible(t){this.rendered.visible!==t&&(this.element.style.display=t?"":"none",this.rendered.visible=t)}updatePixelPosition(){const t=this.getMap(),e=this.getPosition();if(!t||!t.isRendered()||!e)return void this.setVisible(!1);const i=t.getPixelFromCoordinate(e),n=t.getSize();this.updateRenderedPosition(i,n)}updateRenderedPosition(t,e){const i=this.element.style,n=this.getOffset(),s=this.getPositioning();this.setVisible(!0);const r=Math.round(t[0]+n[0])+"px",a=Math.round(t[1]+n[1])+"px";let o="0%",l="0%";"bottom-right"==s||"center-right"==s||"top-right"==s?o="-100%":"bottom-center"!=s&&"center-center"!=s&&"top-center"!=s||(o="-50%"),"bottom-left"==s||"bottom-center"==s||"bottom-right"==s?l="-100%":"center-left"!=s&&"center-center"!=s&&"center-right"!=s||(l="-50%");const h=`translate(${o}, ${l}) translate(${r}, ${a})`;this.rendered.transform_!=h&&(this.rendered.transform_=h,i.transform=h)}getOptions(){return this.options}}e.Z=d},1059:function(t,e,i){var n=i(321),s=i(3770);class r extends n.Z{constructor(t){t=t||{},super(t),this.condition_=t.condition?t.condition:s.vY,this.lastAngle_=void 0,this.lastMagnitude_=void 0,this.lastScaleDelta_=0,this.duration_=void 0!==t.duration?t.duration:400}handleDragEvent(t){if(!(0,s.QL)(t))return;const e=t.map,i=e.getSize(),n=t.pixel,r=n[0]-i[0]/2,a=i[1]/2-n[1],o=Math.atan2(a,r),l=Math.sqrt(r*r+a*a),h=e.getView();if(void 0!==this.lastAngle_){const t=this.lastAngle_-o;h.adjustRotationInternal(t)}this.lastAngle_=o,void 0!==this.lastMagnitude_&&h.adjustResolutionInternal(this.lastMagnitude_/l),void 0!==this.lastMagnitude_&&(this.lastScaleDelta_=this.lastMagnitude_/l),this.lastMagnitude_=l}handleUpEvent(t){if(!(0,s.QL)(t))return!0;const e=t.map,i=e.getView(),n=this.lastScaleDelta_>1?1:-1;return i.endInteraction(this.duration_,n),this.lastScaleDelta_=0,!1}handleDownEvent(t){return!!(0,s.QL)(t)&&(!!this.condition_(t)&&(t.map.getView().beginInteraction(),this.lastAngle_=void 0,this.lastMagnitude_=void 0,!0))}}e.Z=r}}]);
//# sourceMappingURL=144.f71a784c.js.map