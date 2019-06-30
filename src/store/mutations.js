//存放同步读取、修改state的的方法

export default {
    //gc
    setToken(state,token){
      state.token = token
    },
    setRefreshToken(state,refreshToken){
        state.refreshToken = refreshToken
    },
    setNum(state,status){
        console.log(status);
        state.num = status
    },
    setMenus(state,menus){
        state.menus = menus;
    },
    homeImg(state,img){
        state.img = img;
    }
}
