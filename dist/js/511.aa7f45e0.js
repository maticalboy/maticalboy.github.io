"use strict";(self["webpackChunkvue2_openlayers"]=self["webpackChunkvue2_openlayers"]||[]).push([[511],{7041:function(t,e,a){a.r(e),a.d(e,{default:function(){return v}});var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"vm"},[e("h2",{staticClass:"h-title"},[t._v("旋转 rotation")]),e("div",{staticClass:"map-x",attrs:{id:"map"}}),e("div",{staticClass:"btn-x"},[e("button",{on:{click:t.rotateLeft}},[t._v("↻")]),e("button",{on:{click:t.rotateRight}},[t._v("↺")])])])},n=[],s=(a(1827),a(7661)),o=a(4945),r=a(4109),l=a(225),u=a(6021),c={name:"RotationMap",data(){return{map:null}},methods:{initMap(){this.map=new s.Z({target:"map",layers:[new r.Z({name:"defaultLayer",source:new l.Z({url:"http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"})})],view:new o.ZP({center:(0,u.mi)([114.064839,22.548857]),rotation:0,zoom:6})})},rotateLeft(){let t=this.map.getView().getRotation();this.map.getView().setRotation(t+1)},rotateRight(){let t=this.map.getView().getRotation();this.map.getView().setRotation(t-1)}},mounted(){this.initMap()}},p=c,h=a(3736),m=(0,h.Z)(p,i,n,!1,null,"ed89c59c",null),v=m.exports}}]);
//# sourceMappingURL=511.aa7f45e0.js.map