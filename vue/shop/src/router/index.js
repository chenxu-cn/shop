import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import('../components/Login.vue')
    },
    {
      path: '/home',
      component: () => import('../components/Home.vue')
    }
  ]
})

//挂在路由导航守卫
router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  //from 从哪个路径跳转来
  //next 是一个函数，放行
  //next()放行   next("/login")强制跳转
  if (to.path == '/login') return next()
  const tokenstr = window.sessionStorage.getItem('token')
  if (!tokenstr) return next('/login')
  next()
})

export default router
