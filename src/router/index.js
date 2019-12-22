import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import Home2 from '../views/home/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    component: Home,
    children: [{
      path: '',
      component: Home2
    }, {
      path: '/home/comment',
      component: () => import('../views/comment')
    }, {
      path: '/home/material',
      component: () => import('../views/material')
    }]
  },
  {
    path: '/login',
    component: Login
  }
  // ,
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
