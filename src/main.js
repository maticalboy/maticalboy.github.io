import Vue from 'vue'
import App from './App.vue'

// element 引用
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './assets/css/element_modify.less'
import './assets/css/common.less'

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
