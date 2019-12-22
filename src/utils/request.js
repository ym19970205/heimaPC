// 封装一个axios

// 1.引入axios
import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'

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
  // 成功时执行该函数，状态码 200/201/204

  return response.data ? response.data : {}
}, function (error) {
  // 失败时执行该函数
  let status = error.response.status // 获取失败的状态码
  // 定义一个message设置提示信息
  let message = ''
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401:
      // token过期或者失效
      window.localStorage.removeItem('user-token')
      router.push('/login')
      break
    case 403:
      message = '没有设置这条评论的权限'
      break
    default:
      break
  }
  Message({ type: 'warning', message })
})

export default axios
