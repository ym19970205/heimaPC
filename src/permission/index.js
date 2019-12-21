// 处理路由拦截器 导航守卫
import router from '../router'

// 全局前置守卫 当路由发生变化时，这个方法的回调函数就会执行

router.beforeEach(function (to, from, next) {
// 做权限拦截， 有token就要放过去， next()
// 没有token，就remove token信息，并且跳转到登录页面 next(地址)

  // 1.确定要检查的范围
  if (to.path.startsWith('/home')) {
  // 2.检查有没有token，再做判断
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
