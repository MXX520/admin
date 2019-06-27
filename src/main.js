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

console.log("main.js",localStorage.getItem('menus'));
console.log("router.js",router);
let dataList = JSON.parse(localStorage.getItem('menus'));

if(dataList.length){
  dataList.forEach(item=>{
    if(item.childrenList){
        item.childrenList.forEach(items => {
            router.options.routes[0].children.push({
                path:items.url,
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
