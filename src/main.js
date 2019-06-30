// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'// (根据版本路径不同会有差异，按照自己版本路径)
import store from './store/index.js'
import Axios from 'axios'
import api from './api/http'
Vue.use(ElementUI)
Vue.config.productionTip = false
//修改原型链，全局使用axios,这样之后可在每个组件的methods中调用$axios命令完成数据请求
Vue.prototype.$axios = Axios;
Vue.prototype.$api = api;



// 对路由进行验证
router.beforeEach((to, from, next) => {
  console.log(localStorage.getItem('token'))
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  const route = ['index', 'list'];
  let isLogin = localStorage.getItem('token');  // 是否登录
  // 未登录状态；当路由到route指定页时，跳转至login
  if (route.indexOf(to.name) >= 0) {
    if (isLogin == null) {
      router.push({ path: '/login', });
    }
  }
  // 已登录状态；当路由到login时，跳转至home 
  console.log(to.name)
  localStorage.setItem('routerName', to.name)
  if (to.name === 'login') {
    if (isLogin != null) {
      router.push({ path: '/', });;
    }
  }
  next();
});


console.log("main.js",localStorage.getItem('menus'));
console.log("router.js",router);
let dataList = JSON.parse(localStorage.getItem('menus'));
console.log(store.getters.getImg);
if(localStorage.getItem('homeImg')){
  store.commit('homeImg',localStorage.getItem('homeImg'))
}


if(dataList){
  dataList.forEach(item=>{
    if(item.childrenList){
        item.childrenList.forEach(items => {
            router.options.routes[0].children.push({
                path:'/'+items.code,
                name:items.code,
                component: () => import('@/view/'+items.code+'.vue')
            })
        })
    }
  })
  router.addRoutes(router.options.routes);//调用
}



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store,//加入sotre的配置
  template: '<App/>'
})
