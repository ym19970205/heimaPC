import Vue from 'vue'
import App from './App.vue'
import './permission' // 引用权限模块
import router from './router'
import ele from 'element-ui'
import Component from './components'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'

Vue.use(ele)
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios
Vue.use(Component)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
