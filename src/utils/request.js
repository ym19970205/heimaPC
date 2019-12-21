// 封装一个axios

// 1.引入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.interceptors.request.use(function (config) {
  // 参数是config，是要发送请求的配置信息,
  // 执行请求ok时，进入这个函数，不成功时 会执行下一个函数

  // 获取token值
  let token = window.localStorage.getItem('user-token')

  config.headers.Authorization = `Bearer ${token}`
  return config
})
export default axios
