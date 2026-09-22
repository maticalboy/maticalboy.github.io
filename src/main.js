import Vue from 'vue'
import MessageBox from 'element-ui/lib/message-box'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/message-box.css'

Vue.config.productionTip = false
Vue.prototype.$confirm = MessageBox.confirm

new Vue({
  render: h => h(App),
}).$mount('#app')
