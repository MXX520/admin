//引入需要挂载全局的组件
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import dayjs from 'dayjs'
import 'element-ui/lib/theme-chalk/index.css'// (根据版本路径不同会有差异，按照自己版本路径)
import store from './store/index.js'
import Axios from 'axios'
import api from './api/http'
import util from './api/utils'
import consts from './api/consts'
Vue.use(ElementUI)
Vue.config.productionTip = false

//富文本
import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)

//修改原型链，全局使用axios,这样之后可在每个组件的methods中调用$axios命令完成数据请求
Vue.prototype.$axios = Axios;
Vue.prototype.$api = api;
Vue.prototype.$dayjs = dayjs;
Vue.prototype.$util = util;
Vue.prototype.$consts = consts;



// 对路由进行验证
util.routerValidation();

//防止vuex刷新后数据丢失问题
let dataList = JSON.parse(localStorage.getItem('menus'));
if(localStorage.getItem('homeImg')){
  store.commit('homeImg',localStorage.getItem('homeImg'))
}

//解决刷新页面后动态路由丢失问题
if(dataList){
  console.log("111");
  util.GenerateRouter(dataList);
}


//设置全局广播事件
Vue.prototype.$eventHub= Vue.prototype.$eventHub || new Vue();


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store,//加入sotre的配置
  template: '<App/>'
})
