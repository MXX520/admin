//获取状态值
export default {
    getToken (state) {
      return state.token
    },
    getRefreshToken(state){
      return state.refreshToken
    },
    getNum (state) {
      return state.num
    },
    getMenus (state){
      return state.menus;
    },
  //   pushRouter(state){
  //     if(state.menus.length){
  //       state.menus.forEach(item=>{
  //       if(item.childrenList){
  //           item.childrenList.forEach(items => {
  //               this.$router.options.routes[0].children.push({
  //               path:items.url,
  //               name:items.code,
  //               component: () => import('@/view/'+items.code+'.vue')
  //               })
  //           })
  //       }
  //       })
  //     }
  //  }
}