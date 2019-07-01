
import router from '../router/index'
let util = {};

//动态生成路由
util.GenerateRouter = (arr) => {
    arr.forEach( item => {
        if(item.childrenList){
            item.childrenList.forEach(items => {
                router.options.routes[0].children.push({
                    path:'/'+items.code,
                    name:items.name,
                    component: () => import('@/view/'+items.code+'.vue')
                })
            })
        }
    })
    router.addRoutes(router.options.routes);//调用
}

// 对路由进行验证
util.routerValidation = ()=>{
    router.beforeEach((to, from, next) => {
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
        localStorage.setItem('routerName', to.name)
        if (to.name === 'login') {
            if (isLogin != null) {
            router.push({ path: '/', });;
            }
        }
    next();
    });
}


export default util;
