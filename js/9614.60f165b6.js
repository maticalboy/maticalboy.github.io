"use strict";(self["webpackChunkvue2_template"]=self["webpackChunkvue2_template"]||[]).push([[9614],{39614:function(e,l,a){a.r(l),a.d(l,{default:function(){return p}});var t=function(){var e=this,l=e._self._c;return l("div",[l("el-form",e._l(e.formInfo,(function(a,t){return l("el-row",{key:t},e._l(a,(function(a){return l("el-form-item",{key:a.prop,attrs:{label:a.label}},["input"==a.type?l("el-input",{staticClass:"input-style",attrs:{placeholder:a.placeholder},model:{value:a.value,callback:function(l){e.$set(a,"value",l)},expression:"item.value"}}):"select"==a.type?l("el-select",{attrs:{filterable:"","allow-create":"","default-first-option":"",placeholder:a.placeholder},model:{value:a.value,callback:function(l){e.$set(a,"value",l)},expression:"item.value"}},e._l(a.options,(function(e){return l("el-option",{key:e.label,attrs:{label:e.label,value:e.value}})})),1):"date"==a.type?l("el-date-picker",{attrs:{placeholder:a.placeholder},model:{value:a.value,callback:function(l){e.$set(a,"value",l)},expression:"item.value"}}):"switch"==a.type?l("label",{staticClass:"switch"},[l("input",{directives:[{name:"model",rawName:"v-model",value:a.value,expression:"item.value"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(a.value)?e._i(a.value,null)>-1:a.value},on:{change:function(l){var t=a.value,r=l.target,u=!!r.checked;if(Array.isArray(t)){var o=null,c=e._i(t,o);r.checked?c<0&&e.$set(a,"value",t.concat([o])):c>-1&&e.$set(a,"value",t.slice(0,c).concat(t.slice(c+1)))}else e.$set(a,"value",u)}}}),l("span",{staticClass:"slider"})]):"checkbox"==a.type?l("el-checkbox-group",{attrs:{placeholder:a.placeholder},model:{value:a.value,callback:function(l){e.$set(a,"value",l)},expression:"item.value"}},e._l(a.checks,(function(e){return l("el-checkbox",{key:e.label,attrs:{label:e.label,disabled:e.disabled}})})),1):"radio"==a.type?l("el-radio-group",{attrs:{placeholder:a.placeholder},model:{value:a.value,callback:function(l){e.$set(a,"value",l)},expression:"item.value"}},e._l(a.radios,(function(e){return l("el-radio",{key:e.label,attrs:{label:e.label}})})),1):"textarea"==a.type?l("el-input",{attrs:{type:"textarea",placeholder:a.placeholder},model:{value:a.value,callback:function(l){e.$set(a,"value",l)},expression:"item.value"}}):e._e()],1)})),1)})),1)],1)},r=[],u={name:"Form",props:{formInfo:{type:Array,default:()=>[[{label:"审批人",prop:"user",type:"input",value:"",placeholder:"审批人"},{label:"活动区域",prop:"region",type:"select",options:[{label:"区域一",value:"shanghai"},{label:"区域二",value:"北京"}],value:"",placeholder:"活动区域"}],[{label:"活动时间",prop:"date",type:"date",value:"",placeholder:"活动时间"},{label:"活动开关",prop:"switch",type:"switch",value:""}],[{label:"活动性质",prop:"type",type:"checkbox",checks:[{label:"美食/餐厅线上活动",value:"1"},{label:"地推活动",value:"2"},{label:"线下主题活动",value:"3"},{label:"单纯品牌曝光",value:"4"}],value:[]}],[{label:"特殊资源",prop:"resource",type:"radio",radios:[{label:"线上品牌商赞助",value:"1"},{label:"线下场地免费",value:"2"}],value:""}],[{label:"活动形式",prop:"desc",type:"textarea",value:"",placeholder:"活动形式"}]]}},data(){return{}}},o=u,c=a(1001),s=(0,c.Z)(o,t,r,!1,null,"37c01e2a",null),p=s.exports}}]);
//# sourceMappingURL=9614.60f165b6.js.map