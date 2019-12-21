import Vue from 'vue'
import App from './App.vue'
import './permission' // 引用权限模块
import router from './router'
import ele from 'element-ui'
import Component from './components'
import axios from './utils/request'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'

Vue.use(ele)
Vue.prototype.$axios = axios
Vue.use(Component)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
