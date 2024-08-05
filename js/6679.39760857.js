"use strict";(self["webpackChunkvue2_template"]=self["webpackChunkvue2_template"]||[]).push([[6679],{10559:function(t,e,i){i.r(e),i.d(e,{default:function(){return zt}});var n={};i.r(n),i.d(n,{DblClickDragZoom:function(){return I},DoubleClickZoom:function(){return P.Z},DragAndDrop:function(){return H},DragBox:function(){return G.Z},DragPan:function(){return B.Z},DragRotate:function(){return z.Z},DragRotateAndZoom:function(){return Z.Z},DragZoom:function(){return W.Z},Draw:function(){return j.ZP},Extent:function(){return ct},Interaction:function(){return A.ZP},KeyboardPan:function(){return ut.Z},KeyboardZoom:function(){return dt.Z},Link:function(){return yt},Modify:function(){return Et.Z},MouseWheelZoom:function(){return xt.Z},PinchRotate:function(){return bt.Z},PinchZoom:function(){return Tt.Z},Pointer:function(){return Y.Z},Select:function(){return Ft},Snap:function(){return It.Z},Translate:function(){return Ut},defaults:function(){return D.c}});var s=function(){var t=this;t._self._c;return t._m(0)},a=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"vm"},[e("h2",{staticClass:"h-title"},[t._v("总览控件（鹰眼、小地图） OverviewMap")]),e("div",{staticClass:"map-x",attrs:{id:"map"}})])}],r=(i(71827),i(6643)),o=i(9324),l=i(54235),h=i(83449),c=(i(70560),i(80710)),u=i(86024),d=i(23442),_=i(85949),p=i(65689),g=i(66503),f=i(19838),v=i(39266),m=i(51133),w=i(47322),y=i(98257),E=i(91678),x=i(72890);const b=.75,T=.1;class L extends u.Z{constructor(t){t=t||{},super({element:document.createElement("div"),render:t.render,target:t.target}),this.boundHandleRotationChanged_=this.handleRotationChanged_.bind(this),this.collapsed_=void 0===t.collapsed||t.collapsed,this.collapsible_=void 0===t.collapsible||t.collapsible,this.collapsible_||(this.collapsed_=!1),this.rotateWithView_=void 0!==t.rotateWithView&&t.rotateWithView,this.viewExtent_=void 0;const e=void 0!==t.className?t.className:"ol-overviewmap",i=void 0!==t.tipLabel?t.tipLabel:"Overview map",n=void 0!==t.collapseLabel?t.collapseLabel:"‹";"string"===typeof n?(this.collapseLabel_=document.createElement("span"),this.collapseLabel_.textContent=n):this.collapseLabel_=n;const s=void 0!==t.label?t.label:"›";"string"===typeof s?(this.label_=document.createElement("span"),this.label_.textContent=s):this.label_=s;const a=this.collapsible_&&!this.collapsed_?this.collapseLabel_:this.label_,o=document.createElement("button");o.setAttribute("type","button"),o.title=i,o.appendChild(a),o.addEventListener(d.Z.CLICK,this.handleClick_.bind(this),!1),this.ovmapDiv_=document.createElement("div"),this.ovmapDiv_.className="ol-overviewmap-map",this.view_=t.view;const l=new r.Z({view:t.view,controls:new c.Z,interactions:new c.Z});this.ovmap_=l,t.layers&&t.layers.forEach((function(t){l.addLayer(t)}));const h=document.createElement("div");h.className="ol-overviewmap-box",h.style.boxSizing="border-box",this.boxOverlay_=new f.Z({position:[0,0],positioning:"center-center",element:h}),this.ovmap_.addOverlay(this.boxOverlay_);const u=e+" "+m.XV+" "+m.hg+(this.collapsed_&&this.collapsible_?" "+m.hN:"")+(this.collapsible_?"":" ol-uncollapsible"),_=this.element;_.className=u,_.appendChild(this.ovmapDiv_),_.appendChild(o);const p=this,g=this.boxOverlay_,v=this.boxOverlay_.getElement(),w=function(t){return{clientX:t.clientX,clientY:t.clientY}},y=function(t){const e=w(t),i=l.getEventCoordinateInternal(e);g.setPosition(i)},E=function(t){const e=l.getEventCoordinateInternal(t);p.getMap().getView().setCenterInternal(e),window.removeEventListener("mousemove",y),window.removeEventListener("mouseup",E)};v.addEventListener("mousedown",(function(){window.addEventListener("mousemove",y),window.addEventListener("mouseup",E)}))}setMap(t){const e=this.getMap();if(t!==e){if(e){const t=e.getView();t&&this.unbindView_(t),this.ovmap_.setTarget(null)}if(super.setMap(t),t){this.ovmap_.setTarget(this.ovmapDiv_),this.listenerKeys.push((0,y.oL)(t,g.Z.PROPERTYCHANGE,this.handleMapPropertyChange_,this));const e=t.getView();e&&(this.bindView_(e),e.isDef()&&(this.ovmap_.updateSize(),this.resetExtent_())),this.ovmap_.isRendered()||this.updateBoxAfterOvmapIsRendered_()}}}handleMapPropertyChange_(t){if(t.key===p.Z.VIEW){const e=t.oldValue;e&&this.unbindView_(e);const i=this.getMap().getView();this.bindView_(i)}else this.ovmap_.isRendered()||t.key!==p.Z.TARGET&&t.key!==p.Z.SIZE||this.ovmap_.updateSize()}bindView_(t){if(!this.view_){const e=new o.ZP({projection:t.getProjection()});this.ovmap_.setView(e)}t.addChangeListener(v.Z.ROTATION,this.boundHandleRotationChanged_),this.handleRotationChanged_()}unbindView_(t){t.removeChangeListener(v.Z.ROTATION,this.boundHandleRotationChanged_)}handleRotationChanged_(){this.rotateWithView_&&this.ovmap_.getView().setRotation(this.getMap().getView().getRotation())}validateExtent_(){const t=this.getMap(),e=this.ovmap_;if(!t.isRendered()||!e.isRendered())return;const i=t.getSize(),n=t.getView(),s=n.calculateExtentInternal(i);if(this.viewExtent_&&(0,w.fS)(s,this.viewExtent_))return;this.viewExtent_=s;const a=e.getSize(),r=e.getView(),o=r.calculateExtentInternal(a),l=e.getPixelFromCoordinateInternal((0,w.rL)(s)),h=e.getPixelFromCoordinateInternal((0,w.w$)(s)),c=Math.abs(l[0]-h[0]),u=Math.abs(l[1]-h[1]),d=a[0],_=a[1];c<d*T||u<_*T||c>d*b||u>_*b?this.resetExtent_():(0,w.r4)(o,s)||this.recenter_()}resetExtent_(){if(0===b||0===T)return;const t=this.getMap(),e=this.ovmap_,i=t.getSize(),n=t.getView(),s=n.calculateExtentInternal(i),a=e.getView(),r=Math.log(b/T)/Math.LN2,o=1/(Math.pow(2,r/2)*T);(0,w.H9)(s,o),a.fitInternal((0,E.oJ)(s))}recenter_(){const t=this.getMap(),e=this.ovmap_,i=t.getView(),n=e.getView();n.setCenterInternal(i.getCenterInternal())}updateBox_(){const t=this.getMap(),e=this.ovmap_;if(!t.isRendered()||!e.isRendered())return;const i=t.getSize(),n=t.getView(),s=e.getView(),a=this.rotateWithView_?0:-n.getRotation(),r=this.boxOverlay_,o=this.boxOverlay_.getElement(),l=n.getCenterInternal(),h=n.getResolution(),c=s.getResolution(),u=i[0]*h/c,d=i[1]*h/c;if(r.setPosition(l),o){o.style.width=u+"px",o.style.height=d+"px";const t="rotate("+a+"rad)";o.style.transform=t}}updateBoxAfterOvmapIsRendered_(){this.ovmapPostrenderKey_||(this.ovmapPostrenderKey_=(0,y.Vx)(this.ovmap_,_.Z.POSTRENDER,(function(t){delete this.ovmapPostrenderKey_,this.updateBox_()}),this))}handleClick_(t){t.preventDefault(),this.handleToggle_()}handleToggle_(){this.element.classList.toggle(m.hN),this.collapsed_?(0,x.$H)(this.collapseLabel_,this.label_):(0,x.$H)(this.label_,this.collapseLabel_),this.collapsed_=!this.collapsed_;const t=this.ovmap_;if(!this.collapsed_){if(t.isRendered())return this.viewExtent_=void 0,void t.render();t.updateSize(),this.resetExtent_(),this.updateBoxAfterOvmapIsRendered_()}}getCollapsible(){return this.collapsible_}setCollapsible(t){this.collapsible_!==t&&(this.collapsible_=t,this.element.classList.toggle("ol-uncollapsible"),!t&&this.collapsed_&&this.handleToggle_())}setCollapsed(t){this.collapsible_&&this.collapsed_!==t&&this.handleToggle_()}getCollapsed(){return this.collapsed_}getRotateWithView(){return this.rotateWithView_}setRotateWithView(t){this.rotateWithView_!==t&&(this.rotateWithView_=t,0!==this.getMap().getView().getRotation()&&(this.rotateWithView_?this.handleRotationChanged_():this.ovmap_.getView().setRotation(0),this.viewExtent_=void 0,this.validateExtent_(),this.updateBox_()))}getOverviewMap(){return this.ovmap_}render(t){this.validateExtent_(),this.updateBox_()}}var C=L,S=i(3659),D=i(17457),Z=i(5761),P=i(85423),A=i(79059),R=i(32423);class V extends A.ZP{constructor(t){const e=t||{};super(e),e.stopDown&&(this.stopDown=e.stopDown),this.scaleDeltaByPixel_=e.delta?e.delta:.01,this.duration_=void 0!==e.duration?e.duration:250,this.handlingDownUpSequence_=!1,this.handlingDoubleDownSequence_=!1,this.doubleTapTimeoutId_=void 0,this.trackedPointers_={},this.targetPointers=[]}handleEvent(t){if(!t.originalEvent)return!0;let e=!1;if(this.updateTrackedPointers_(t),this.handlingDownUpSequence_){if(t.type==R.Z.POINTERDRAG)this.handleDragEvent(t),t.originalEvent.preventDefault();else if(t.type==R.Z.POINTERUP){const e=this.handleUpEvent(t);this.handlingDownUpSequence_=e}}else if(t.type==R.Z.POINTERDOWN)if(this.handlingDoubleDownSequence_){this.handlingDoubleDownSequence_=!1;const i=this.handleDownEvent(t);this.handlingDownUpSequence_=i,e=this.stopDown(i)}else e=this.stopDown(!1),this.waitForDblTap_();return!e}handleDragEvent(t){let e=1;const i=this.targetPointers[0],n=this.down_.originalEvent,s=i.clientY-n.clientY;void 0!==this.lastDistance_&&(e=1-(this.lastDistance_-s)*this.scaleDeltaByPixel_),this.lastDistance_=s,1!=e&&(this.lastScaleDelta_=e);const a=t.map,r=a.getView();a.render(),r.adjustResolutionInternal(e)}handleDownEvent(t){if(1==this.targetPointers.length){const e=t.map;return this.anchor_=null,this.lastDistance_=void 0,this.lastScaleDelta_=1,this.down_=t,this.handlingDownUpSequence_||e.getView().beginInteraction(),!0}return!1}handleUpEvent(t){if(0==this.targetPointers.length){const e=t.map,i=e.getView(),n=this.lastScaleDelta_>1?1:-1;return i.endInteraction(this.duration_,n),this.handlingDownUpSequence_=!1,this.handlingDoubleDownSequence_=!1,!1}return!0}stopDown(t){return t}updateTrackedPointers_(t){if(F(t)){const e=t.originalEvent,i=e.pointerId.toString();t.type==R.Z.POINTERUP?delete this.trackedPointers_[i]:(t.type==R.Z.POINTERDOWN||i in this.trackedPointers_)&&(this.trackedPointers_[i]=e),this.targetPointers=Object.values(this.trackedPointers_)}}waitForDblTap_(){void 0!==this.doubleTapTimeoutId_?(clearTimeout(this.doubleTapTimeoutId_),this.doubleTapTimeoutId_=void 0):(this.handlingDoubleDownSequence_=!0,this.doubleTapTimeoutId_=setTimeout(this.endInteraction_.bind(this),250))}endInteraction_(){this.handlingDoubleDownSequence_=!1,this.doubleTapTimeoutId_=void 0}}function F(t){const e=t.type;return e===R.Z.POINTERDOWN||e===R.Z.POINTERDRAG||e===R.Z.POINTERUP}var I=V,M=i(31775),O=i(32346),N=i(30902);const k={ADD_FEATURES:"addfeatures"};class U extends M.ZP{constructor(t,e,i,n){super(t),this.features=i,this.file=e,this.projection=n}}class q extends A.ZP{constructor(t){t=t||{},super({handleEvent:O.uX}),this.on,this.once,this.un,this.readAsBuffer_=!1,this.formats_=[];const e=t.formatConstructors?t.formatConstructors:[];for(let i=0,n=e.length;i<n;++i){let t=e[i];"function"===typeof t&&(t=new t),this.formats_.push(t),this.readAsBuffer_=this.readAsBuffer_||"arraybuffer"===t.getType()}this.projection_=t.projection?(0,N.U2)(t.projection):null,this.dropListenKeys_=null,this.source_=t.source||null,this.target=t.target?t.target:null}handleResult_(t,e){const i=e.target.result,n=this.getMap();let s,a=this.projection_;if(!a&&(a=(0,N.Cs)(),!a)){const t=n.getView();a=t.getProjection()}const r=this.formats_;for(let o=0,l=r.length;o<l;++o){const e=r[o];let n=i;this.readAsBuffer_&&"arraybuffer"!==e.getType()&&(void 0===s&&(s=(new TextDecoder).decode(i)),n=s);const l=this.tryReadFeatures_(e,n,{featureProjection:a});if(l&&l.length>0){this.source_&&(this.source_.clear(),this.source_.addFeatures(l)),this.dispatchEvent(new U(k.ADD_FEATURES,t,l,a));break}}}registerListeners_(){const t=this.getMap();if(t){const e=this.target?this.target:t.getViewport();this.dropListenKeys_=[(0,y.oL)(e,d.Z.DROP,this.handleDrop,this),(0,y.oL)(e,d.Z.DRAGENTER,this.handleStop,this),(0,y.oL)(e,d.Z.DRAGOVER,this.handleStop,this),(0,y.oL)(e,d.Z.DROP,this.handleStop,this)]}}setActive(t){!this.getActive()&&t&&this.registerListeners_(),this.getActive()&&!t&&this.unregisterListeners_(),super.setActive(t)}setMap(t){this.unregisterListeners_(),super.setMap(t),this.getActive()&&this.registerListeners_()}tryReadFeatures_(t,e,i){try{return t.readFeatures(e,i)}catch(n){return null}}unregisterListeners_(){this.dropListenKeys_&&(this.dropListenKeys_.forEach(y.bN),this.dropListenKeys_=null)}handleDrop(t){const e=t.dataTransfer.files;for(let i=0,n=e.length;i<n;++i){const t=e.item(i),n=new FileReader;n.addEventListener(d.Z.LOAD,this.handleResult_.bind(this,t)),this.readAsBuffer_?n.readAsArrayBuffer(t):n.readAsText(t)}}handleStop(t){t.stopPropagation(),t.preventDefault(),t.dataTransfer.dropEffect="copy"}}var H=q,G=i(83656),B=i(41115),z=i(16803),W=i(25983),j=i(42806),K=i(7886),X=i(93315),Y=i(36549),J=i(81199),Q=i(15980),$=i(10778),tt=i(6735),et=i(70451);const it={EXTENTCHANGED:"extentchanged"};class nt extends M.ZP{constructor(t){super(it.EXTENTCHANGED),this.extent=t}}class st extends Y.Z{constructor(t){t=t||{},super(t),this.on,this.once,this.un,this.condition_=t.condition?t.condition:$.Bx,this.extent_=null,this.pointerHandler_=null,this.pixelTolerance_=void 0!==t.pixelTolerance?t.pixelTolerance:10,this.snappedToVertex_=!1,this.extentFeature_=null,this.vertexFeature_=null,t||(t={}),this.extentOverlay_=new J.Z({source:new Q.Z({useSpatialIndex:!1,wrapX:!!t.wrapX}),style:t.boxStyle?t.boxStyle:at(),updateWhileAnimating:!0,updateWhileInteracting:!0}),this.vertexOverlay_=new J.Z({source:new Q.Z({useSpatialIndex:!1,wrapX:!!t.wrapX}),style:t.pointerStyle?t.pointerStyle:rt(),updateWhileAnimating:!0,updateWhileInteracting:!0}),t.extent&&this.setExtent(t.extent)}snapToVertex_(t,e){const i=e.getCoordinateFromPixelInternal(t),n=function(t,e){return(0,tt.squaredDistanceToSegment)(i,t)-(0,tt.squaredDistanceToSegment)(i,e)},s=this.getExtentInternal();if(s){const a=ht(s);a.sort(n);const r=a[0];let o=(0,tt.closestOnSegment)(i,r);const l=e.getPixelFromCoordinateInternal(o);if((0,tt.distance)(t,l)<=this.pixelTolerance_){const t=e.getPixelFromCoordinateInternal(r[0]),i=e.getPixelFromCoordinateInternal(r[1]),n=(0,tt.squaredDistance)(l,t),s=(0,tt.squaredDistance)(l,i),a=Math.sqrt(Math.min(n,s));return this.snappedToVertex_=a<=this.pixelTolerance_,this.snappedToVertex_&&(o=n>s?r[1]:r[0]),o}}return null}handlePointerMove_(t){const e=t.pixel,i=t.map;let n=this.snapToVertex_(e,i);n||(n=i.getCoordinateFromPixelInternal(e)),this.createOrUpdatePointerFeature_(n)}createOrUpdateExtentFeature_(t){let e=this.extentFeature_;return e?t?e.setGeometry((0,E.oJ)(t)):e.setGeometry(void 0):(e=t?new K.Z((0,E.oJ)(t)):new K.Z({}),this.extentFeature_=e,this.extentOverlay_.getSource().addFeature(e)),e}createOrUpdatePointerFeature_(t){let e=this.vertexFeature_;if(e){const i=e.getGeometry();i.setCoordinates(t)}else e=new K.Z(new X.Z(t)),this.vertexFeature_=e,this.vertexOverlay_.getSource().addFeature(e);return e}handleEvent(t){return!t.originalEvent||!this.condition_(t)||(t.type!=R.Z.POINTERMOVE||this.handlingDownUpSequence||this.handlePointerMove_(t),super.handleEvent(t),!1)}handleDownEvent(t){const e=t.pixel,i=t.map,n=this.getExtentInternal();let s=this.snapToVertex_(e,i);const a=function(t){let e=null,i=null;return t[0]==n[0]?e=n[2]:t[0]==n[2]&&(e=n[0]),t[1]==n[1]?i=n[3]:t[1]==n[3]&&(i=n[1]),null!==e&&null!==i?[e,i]:null};if(s&&n){const t=s[0]==n[0]||s[0]==n[2]?s[0]:null,e=s[1]==n[1]||s[1]==n[3]?s[1]:null;null!==t&&null!==e?this.pointerHandler_=ot(a(s)):null!==t?this.pointerHandler_=lt(a([t,n[1]]),a([t,n[3]])):null!==e&&(this.pointerHandler_=lt(a([n[0],e]),a([n[2],e])))}else s=i.getCoordinateFromPixelInternal(e),this.setExtent([s[0],s[1],s[0],s[1]]),this.pointerHandler_=ot(s);return!0}handleDragEvent(t){if(this.pointerHandler_){const e=t.coordinate;this.setExtent(this.pointerHandler_(e)),this.createOrUpdatePointerFeature_(e)}}handleUpEvent(t){this.pointerHandler_=null;const e=this.getExtentInternal();return e&&0!==(0,w.bg)(e)||this.setExtent(null),!1}setMap(t){this.extentOverlay_.setMap(t),this.vertexOverlay_.setMap(t),super.setMap(t)}getExtent(){return(0,N.Fj)(this.getExtentInternal(),this.getMap().getView().getProjection())}getExtentInternal(){return this.extent_}setExtent(t){this.extent_=t||null,this.createOrUpdateExtentFeature_(t),this.dispatchEvent(new nt(this.extent_))}}function at(){const t=(0,et.Ly)();return function(e,i){return t["Polygon"]}}function rt(){const t=(0,et.Ly)();return function(e,i){return t["Point"]}}function ot(t){return function(e){return(0,w.hI)([t,e])}}function lt(t,e){return t[0]==e[0]?function(i){return(0,w.hI)([t,[i[0],e[1]]])}:t[1]==e[1]?function(i){return(0,w.hI)([t,[e[0],i[1]]])}:null}function ht(t){return[[[t[0],t[1]],[t[0],t[3]]],[[t[0],t[3]],[t[2],t[3]]],[[t[2],t[3]],[t[2],t[1]]],[[t[2],t[1]],[t[0],t[1]]]]}var ct=st,ut=i(1928),dt=i(93842),_t=(i(98858),i(61318),i(33228),i(89157));function pt(t){return(0,_t.FH)(t,5)}function gt(t){return parseFloat(t)}function ft(t){return pt(t).toString()}function vt(t,e){return!isNaN(t)&&t!==gt(ft(e))}function mt(t,e){return vt(t[0],e[0])||vt(t[1],e[1])}class wt extends A.ZP{constructor(t){let e;super(),t=Object.assign({animate:!0,params:["x","y","z","r","l"],replace:!1,prefix:""},t||{}),e=!0===t.animate?{duration:250}:t.animate?t.animate:null,this.animationOptions_=e,this.params_=t.params.reduce(((t,e)=>(t[e]=!0,t)),{}),this.replace_=t.replace,this.prefix_=t.prefix,this.listenerKeys_=[],this.initial_=!0,this.updateState_=this.updateState_.bind(this),this.trackedCallbacks_={},this.trackedValues_={}}getParamName_(t){return this.prefix_?this.prefix_+t:t}get_(t,e){return t.get(this.getParamName_(e))}set_(t,e,i){e in this.params_&&t.set(this.getParamName_(e),i)}delete_(t,e){e in this.params_&&t.delete(this.getParamName_(e))}setMap(t){const e=this.getMap();super.setMap(t),t!==e&&(e&&this.unregisterListeners_(e),t&&(this.initial_=!0,this.updateState_(),this.registerListeners_(t)))}registerListeners_(t){this.listenerKeys_.push((0,y.oL)(t,_.Z.MOVEEND,this.updateUrl_,this),(0,y.oL)(t.getLayerGroup(),d.Z.CHANGE,this.updateUrl_,this),(0,y.oL)(t,"change:layergroup",this.handleChangeLayerGroup_,this)),this.replace_||addEventListener("popstate",this.updateState_)}unregisterListeners_(t){for(let n=0,s=this.listenerKeys_.length;n<s;++n)(0,y.bN)(this.listenerKeys_[n]);this.listenerKeys_.length=0,this.replace_||removeEventListener("popstate",this.updateState_);const e=new URL(window.location.href),i=e.searchParams;this.delete_(i,"x"),this.delete_(i,"y"),this.delete_(i,"z"),this.delete_(i,"r"),this.delete_(i,"l"),window.history.replaceState(null,"",e)}handleChangeLayerGroup_(){const t=this.getMap();t&&(this.unregisterListeners_(t),this.registerListeners_(t),this.initial_=!0,this.updateUrl_())}updateState_(){const t=new URL(window.location.href),e=t.searchParams;for(const u in this.trackedCallbacks_){const t=e.get(u);u in this.trackedCallbacks_&&t!==this.trackedValues_[u]&&(this.trackedValues_[u]=t,this.trackedCallbacks_[u](t))}const i=this.getMap();if(!i)return;const n=i.getView();if(!n)return;let s=!1;const a={},r=gt(this.get_(e,"z"));"z"in this.params_&&vt(r,n.getZoom())&&(s=!0,a.zoom=r);const o=gt(this.get_(e,"r"));"r"in this.params_&&vt(o,n.getRotation())&&(s=!0,a.rotation=o);const l=[gt(this.get_(e,"x")),gt(this.get_(e,"y"))];("x"in this.params_||"y"in this.params_)&&mt(l,n.getCenter())&&(s=!0,a.center=l),s&&(!this.initial_&&this.animationOptions_?n.animate(Object.assign(a,this.animationOptions_)):(a.center&&n.setCenter(a.center),"zoom"in a&&n.setZoom(a.zoom),"rotation"in a&&n.setRotation(a.rotation)));const h=i.getAllLayers(),c=this.get_(e,"l");if("l"in this.params_&&c&&c.length===h.length)for(let u=0,d=h.length;u<d;++u){const t=parseInt(c[u]);if(!isNaN(t)){const e=Boolean(t),i=h[u];i.getVisible()!==e&&i.setVisible(e)}}}track(t,e){this.trackedCallbacks_[t]=e;const i=new URL(window.location.href),n=i.searchParams,s=n.get(t);return this.trackedValues_[t]=s,s}update(t,e){const i=new URL(window.location.href),n=i.searchParams;null===e?n.delete(t):n.set(t,e),t in this.trackedValues_&&(this.trackedValues_[t]=e),this.updateHistory_(i)}updateUrl_(){const t=this.getMap();if(!t)return;const e=t.getView();if(!e)return;const i=e.getCenter(),n=e.getZoom(),s=e.getRotation(),a=t.getAllLayers(),r=new Array(a.length);for(let h=0,c=a.length;h<c;++h)r[h]=a[h].getVisible()?"1":"0";const o=new URL(window.location.href),l=o.searchParams;this.set_(l,"x",ft(i[0])),this.set_(l,"y",ft(i[1])),this.set_(l,"z",ft(n)),this.set_(l,"r",ft(s)),this.set_(l,"l",r.join("")),this.updateHistory_(o),this.initial_=!1}updateHistory_(t){t.href!==window.location.href&&(this.initial_||this.replace_?window.history.replaceState(history.state,"",t):window.history.pushState(null,"",t))}}var yt=wt,Et=i(27219),xt=i(82453),bt=i(73076),Tt=i(30703),Lt=i(41625),Ct=i(58038),St=i(47181),Dt=i(4289);const Zt={SELECT:"select"};class Pt extends M.ZP{constructor(t,e,i,n){super(t),this.selected=e,this.deselected=i,this.mapBrowserEvent=n}}const At={};class Rt extends A.ZP{constructor(t){let e;if(super(),this.on,this.once,this.un,t=t||{},this.boundAddFeature_=this.addFeature_.bind(this),this.boundRemoveFeature_=this.removeFeature_.bind(this),this.condition_=t.condition?t.condition:$.Kf,this.addCondition_=t.addCondition?t.addCondition:$.Fi,this.removeCondition_=t.removeCondition?t.removeCondition:$.Fi,this.toggleCondition_=t.toggleCondition?t.toggleCondition:$.vY,this.multi_=!!t.multi&&t.multi,this.filter_=t.filter?t.filter:O.uX,this.hitTolerance_=t.hitTolerance?t.hitTolerance:0,this.style_=void 0!==t.style?t.style:Vt(),this.features_=t.features||new c.Z,t.layers)if("function"===typeof t.layers)e=t.layers;else{const i=t.layers;e=function(t){return i.includes(t)}}else e=O.uX;this.layerFilter_=e,this.featureLayerAssociation_={}}addFeatureLayerAssociation_(t,e){this.featureLayerAssociation_[(0,Dt.sq)(t)]=e}getFeatures(){return this.features_}getHitTolerance(){return this.hitTolerance_}getLayer(t){return this.featureLayerAssociation_[(0,Dt.sq)(t)]}setHitTolerance(t){this.hitTolerance_=t}setMap(t){const e=this.getMap();e&&this.style_&&this.features_.forEach(this.restorePreviousStyle_.bind(this)),super.setMap(t),t?(this.features_.addEventListener(Lt.Z.ADD,this.boundAddFeature_),this.features_.addEventListener(Lt.Z.REMOVE,this.boundRemoveFeature_),this.style_&&this.features_.forEach(this.applySelectedStyle_.bind(this))):(this.features_.removeEventListener(Lt.Z.ADD,this.boundAddFeature_),this.features_.removeEventListener(Lt.Z.REMOVE,this.boundRemoveFeature_))}addFeature_(t){const e=t.element;if(this.style_&&this.applySelectedStyle_(e),!this.getLayer(e)){const t=this.getMap().getAllLayers().find((function(t){if(t instanceof J.Z&&t.getSource()&&t.getSource().hasFeature(e))return t}));t&&this.addFeatureLayerAssociation_(e,t)}}removeFeature_(t){this.style_&&this.restorePreviousStyle_(t.element)}getStyle(){return this.style_}applySelectedStyle_(t){const e=(0,Dt.sq)(t);e in At||(At[e]=t.getStyle()),t.setStyle(this.style_)}restorePreviousStyle_(t){const e=this.getMap().getInteractions().getArray();for(let n=e.length-1;n>=0;--n){const i=e[n];if(i!==this&&i instanceof Rt&&i.getStyle()&&-1!==i.getFeatures().getArray().lastIndexOf(t))return void t.setStyle(i.getStyle())}const i=(0,Dt.sq)(t);t.setStyle(At[i]),delete At[i]}removeFeatureLayerAssociation_(t){delete this.featureLayerAssociation_[(0,Dt.sq)(t)]}handleEvent(t){if(!this.condition_(t))return!0;const e=this.addCondition_(t),i=this.removeCondition_(t),n=this.toggleCondition_(t),s=!e&&!i&&!n,a=t.map,r=this.getFeatures(),o=[],l=[];if(s){(0,Ct.Z)(this.featureLayerAssociation_),a.forEachFeatureAtPixel(t.pixel,((t,e)=>{if(t instanceof K.Z&&this.filter_(t,e))return this.addFeatureLayerAssociation_(t,e),l.push(t),!this.multi_}),{layerFilter:this.layerFilter_,hitTolerance:this.hitTolerance_});for(let t=r.getLength()-1;t>=0;--t){const e=r.item(t),i=l.indexOf(e);i>-1?l.splice(i,1):(r.remove(e),o.push(e))}0!==l.length&&r.extend(l)}else{a.forEachFeatureAtPixel(t.pixel,((t,s)=>{if(t instanceof K.Z&&this.filter_(t,s))return!e&&!n||r.getArray().includes(t)?(i||n)&&r.getArray().includes(t)&&(o.push(t),this.removeFeatureLayerAssociation_(t)):(this.addFeatureLayerAssociation_(t,s),l.push(t)),!this.multi_}),{layerFilter:this.layerFilter_,hitTolerance:this.hitTolerance_});for(let t=o.length-1;t>=0;--t)r.remove(o[t]);r.extend(l)}return(l.length>0||o.length>0)&&this.dispatchEvent(new Pt(Zt.SELECT,l,o,t)),!0}}function Vt(){const t=(0,et.Ly)();return(0,St.l7)(t["Polygon"],t["LineString"]),(0,St.l7)(t["GeometryCollection"],t["LineString"]),function(e){return e.getGeometry()?t[e.getGeometry().getType()]:null}}var Ft=Rt,It=i(51774),Mt=i(7114);const Ot={TRANSLATESTART:"translatestart",TRANSLATING:"translating",TRANSLATEEND:"translateend"};class Nt extends M.ZP{constructor(t,e,i,n,s){super(t),this.features=e,this.coordinate=i,this.startCoordinate=n,this.mapBrowserEvent=s}}class kt extends Y.Z{constructor(t){let e;if(t=t||{},super(t),this.on,this.once,this.un,this.lastCoordinate_=null,this.startCoordinate_=null,this.features_=void 0!==t.features?t.features:null,t.layers&&!this.features_)if("function"===typeof t.layers)e=t.layers;else{const i=t.layers;e=function(t){return i.includes(t)}}else e=O.uX;this.layerFilter_=e,this.filter_=t.filter&&!this.features_?t.filter:O.uX,this.hitTolerance_=t.hitTolerance?t.hitTolerance:0,this.condition_=t.condition?t.condition:$.Bx,this.lastFeature_=null,this.addChangeListener(Mt.Z.ACTIVE,this.handleActiveChanged_)}handleDownEvent(t){if(!t.originalEvent||!this.condition_(t))return!1;if(this.lastFeature_=this.featuresAtPixel_(t.pixel,t.map),!this.lastCoordinate_&&this.lastFeature_){this.startCoordinate_=t.coordinate,this.lastCoordinate_=t.coordinate,this.handleMoveEvent(t);const e=this.features_||new c.Z([this.lastFeature_]);return this.dispatchEvent(new Nt(Ot.TRANSLATESTART,e,t.coordinate,this.startCoordinate_,t)),!0}return!1}handleUpEvent(t){if(this.lastCoordinate_){this.lastCoordinate_=null,this.handleMoveEvent(t);const e=this.features_||new c.Z([this.lastFeature_]);return this.dispatchEvent(new Nt(Ot.TRANSLATEEND,e,t.coordinate,this.startCoordinate_,t)),this.startCoordinate_=null,!0}return!1}handleDragEvent(t){if(this.lastCoordinate_){const e=t.coordinate,i=t.map.getView().getProjection(),n=(0,N.Vs)(e,i),s=(0,N.Vs)(this.lastCoordinate_,i),a=n[0]-s[0],r=n[1]-s[1],o=this.features_||new c.Z([this.lastFeature_]),l=(0,N.Cs)();o.forEach((function(t){const e=t.getGeometry();l?(e.transform(l,i),e.translate(a,r),e.transform(i,l)):e.translate(a,r),t.setGeometry(e)})),this.lastCoordinate_=e,this.dispatchEvent(new Nt(Ot.TRANSLATING,o,e,this.startCoordinate_,t))}}handleMoveEvent(t){const e=t.map.getViewport();this.featuresAtPixel_(t.pixel,t.map)?(e.classList.remove(this.lastCoordinate_?"ol-grab":"ol-grabbing"),e.classList.add(this.lastCoordinate_?"ol-grabbing":"ol-grab")):e.classList.remove("ol-grab","ol-grabbing")}featuresAtPixel_(t,e){return e.forEachFeatureAtPixel(t,((t,e)=>{if(t instanceof K.Z&&this.filter_(t,e)&&(!this.features_||this.features_.getArray().includes(t)))return t}),{layerFilter:this.layerFilter_,hitTolerance:this.hitTolerance_})}getHitTolerance(){return this.hitTolerance_}setHitTolerance(t){this.hitTolerance_=t}setMap(t){const e=this.getMap();super.setMap(t),this.updateState_(e)}handleActiveChanged_(){this.updateState_(null)}updateState_(t){let e=this.getMap();const i=this.getActive();if((!e||!i)&&(e=e||t,e)){const t=e.getViewport();t.classList.remove("ol-grab","ol-grabbing")}}}var Ut=kt,qt={name:"OverviewMap",data(){return{map:null}},methods:{initMap(){let t=new C({className:"ol-overviewmap ol-custom-overviewmap",layers:[new l.Z({name:"defaultLayer",source:new h.Z({url:"http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"})})],collapseLabel:"»",label:"«",collapsed:!1});this.map=new r.Z({target:"map",controls:S.c().extend([t]),interactions:D.c().extend([new Z.Z]),layers:[new l.Z({source:new h.Z({url:"http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"})})],view:new o.ZP({center:(0,N.mi)([114.064839,22.548857]),zoom:6})})}},mounted(){this.initMap(),console.log(n)}},Ht=qt,Gt=i(1001),Bt=(0,Gt.Z)(Ht,s,a,!1,null,"bc1e17fc",null),zt=Bt.exports},5761:function(t,e,i){var n=i(36549),s=i(10778);class a extends n.Z{constructor(t){t=t||{},super(t),this.condition_=t.condition?t.condition:s.vY,this.lastAngle_=void 0,this.lastMagnitude_=void 0,this.lastScaleDelta_=0,this.duration_=void 0!==t.duration?t.duration:400}handleDragEvent(t){if(!(0,s.QL)(t))return;const e=t.map,i=e.getSize(),n=t.pixel,a=n[0]-i[0]/2,r=i[1]/2-n[1],o=Math.atan2(r,a),l=Math.sqrt(a*a+r*r),h=e.getView();if(void 0!==this.lastAngle_){const t=this.lastAngle_-o;h.adjustRotationInternal(t)}this.lastAngle_=o,void 0!==this.lastMagnitude_&&h.adjustResolutionInternal(this.lastMagnitude_/l),void 0!==this.lastMagnitude_&&(this.lastScaleDelta_=this.lastMagnitude_/l),this.lastMagnitude_=l}handleUpEvent(t){if(!(0,s.QL)(t))return!0;const e=t.map,i=e.getView(),n=this.lastScaleDelta_>1?1:-1;return i.endInteraction(this.duration_,n),this.lastScaleDelta_=0,!1}handleDownEvent(t){return!!(0,s.QL)(t)&&(!!this.condition_(t)&&(t.map.getView().beginInteraction(),this.lastAngle_=void 0,this.lastMagnitude_=void 0,!0))}}e.Z=a}}]);
//# sourceMappingURL=6679.39760857.js.map