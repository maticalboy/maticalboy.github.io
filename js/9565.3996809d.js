"use strict";(self["webpackChunkvue2_template"]=self["webpackChunkvue2_template"]||[]).push([[9565],{99565:function(e,l,o){o.r(l),o.d(l,{default:function(){return s}});var a=function(){var e=this,l=e._self._c;return l("div",[l("Dialog",{attrs:{dialogInfo:e.dialogInfo},on:{confirm:e.confirm},scopedSlots:e._u([{key:"title",fn:function(){return[l("span",{staticClass:"title-name"},[e._v("name")])]},proxy:!0},{key:"content",fn:function(){return[l("Form",{attrs:{formInfo:e.formInfo}})]},proxy:!0},{key:"footer",fn:function(){return[l("el-button",{on:{click:function(l){e.dialogVisible=!1}}},[e._v("取 消")]),l("el-button",{attrs:{type:"primary"},on:{click:e.confirm}},[e._v("确 定")])]},proxy:!0}])})],1)},t=[],n={name:"MyComponent",components:{Dialog:()=>o.e(337).then(o.bind(o,70337)),Form:()=>o.e(5856).then(o.bind(o,95856))},data(){return{dialogInfo:{dialogVisible:!0,dialogTitle:"提示",dialogWidth:"446px",dialogBodyHeight:"446px",dialogModal:!1,dialogCloseOnClickModal:!1,dialogCloseOnPressEscape:!1,dialogShowClose:!0,dialogTop:"15vh",dialogAppendToBody:!1,dialogDragable:!0},formInfo:[[{label:"审批人",prop:"user",type:"input",value:"",prefixIcon:"el-icon-search",placeholder:"审批人",disabled:!1,clearable:!0,showPassword:!0},{label:"活动区域",prop:"region",type:"select",options:[{label:"全选",value:"全选"},{label:"区域一",value:"shanghai"},{label:"区域二",value:"北京",disabled:!0}],value:[],disabled:!1,clearable:!0,filterable:!0,multiple:!0,position:[0,1],placeholder:"活动区域"}],[{label:"活动时间",prop:"date",type:"date",value:"",placeholder:"活动时间"},{label:"活动开关",prop:"switch",type:"switch",value:""}],[{label:"活动性质",prop:"type",type:"checkbox",checks:[{label:"美食/餐厅线上活动",value:"1"},{label:"地推活动",value:"2"},{label:"线下主题活动",value:"3"},{label:"单纯品牌曝光",value:"4"}],isIndeterminate:!1,checkAll:!1,position:[2,0],value:[]}],[{label:"特殊资源",prop:"resource",type:"radio",radios:[{label:"线上品牌商赞助",value:"1"},{label:"线下场地免费",value:"2"}],value:""}],[{label:"活动形式",prop:"desc",type:"textarea",value:"",placeholder:"活动形式"}]]}},methods:{confirm(){this.formInfo=this.formInfo.flat(),console.log(this.formInfo),this.formInfo=this.$options.data().formInfo}}},i=n,r=o(1001),p=(0,r.Z)(i,a,t,!1,null,"5eec0441",null),s=p.exports}}]);
//# sourceMappingURL=9565.3996809d.js.map