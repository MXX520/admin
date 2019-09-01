import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index'
import login from '@/view/login/login'
import forum_audit from '@/view/forum_audit'
import person from '@/view/person'
import changpsd from '@/view/changpsd'
Vue.use(Router)



export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: index,
      children: [
        {
          path: '/person',
          name: '个人中心',
          component: person
        },
        {
          path: '/changpsd',
          name: '修改密码',
          component: changpsd
        }
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: login
    },
    
  ],
  // mode:'history'   //去除#号
})
