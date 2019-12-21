// 封装一个axios

// 1.引入axios
import axios from 'axios'

// 请求拦截器，在请求到达后台服务器之前拦截的
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.interceptors.request.use(function (config) {
  // 参数是config，是要发送请求的配置信息,
  // 执行请求ok时，进入这个函数，不成功时 会执行下一个函数

  // 获取token值
  let token = window.localStorage.getItem('user-token')

  config.headers.Authorization = `Bearer ${token}`
  return config
})

// 响应服务器，数据响应回来，到达then之前
axios.interceptors.response.use(function (response) {
  // 成功时执行
  return response.data ? response.data : {}
}, function () {
  // 失败时执行
})

export default axios
