import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index'
import login from '@/view/login/login'
import forum_audit from '@/view/forum_audit'
Vue.use(Router)



export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: index,
      children: []
    },
    {
      path: '/login',
      name: '登录',
      component: login
    }
  ],
  // mode:'history'   //去除#号
})
