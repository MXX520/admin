<template>
    <el-row class="login-container" type="flex" justify="center" align="middle">
        <el-form :model="ruleForm2" :rules="rules2"
         status-icon
         ref="ruleForm2" 
         label-position="left" 
         label-width="0px" 
         class="demo-ruleForm login-page">
            <h3 class="title">系统登录</h3>
            <el-form-item prop="username">
                <el-input type="text" 
                    v-model="ruleForm2.username" 
                    auto-complete="off" 
                    placeholder="用户名"
                ></el-input>
            </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" 
                        v-model="ruleForm2.password" 
                        auto-complete="off" 
                        placeholder="密码"
                    ></el-input>
                </el-form-item>
            <el-checkbox 
                v-model="checked"
                class="rememberme"
            >记住密码</el-checkbox>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
            </el-form-item>
        </el-form>
    </el-row>
</template>

<script>
// import router from '../../router/index';
export default {
    data(){
        return {
            logining: false,
            ruleForm2: {
                // username: '18210863073@163.com',
                // username: '1040803745@qq.com',
                username: 'yuanxi@tsinghua.com',
                // password: 'AAAaaa11',
                // password: 'qq7461912',
                password: 'qq7461912',
            },
            rules2: {
                username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                password: [{required: true, message: '请输入密码', trigger: 'blur'}]
            },
            checked: false
        }
    },
    methods: {
        async handleSubmit(event){
            let params = {
                "account":this.ruleForm2.username,
                "password":this.ruleForm2.password
            }
            let data = await this.$api.post('login',params);
            console.log(data);
            localStorage.setItem('menus',JSON.stringify(data.data.data.menus));
            localStorage.setItem('token',data.data.data.token);
            localStorage.setItem('refreshToken',data.data.data.refreshToken);
            localStorage.setItem('homeImg',data.data.data.avatar);
            this.$store.commit('setMenus', data.data.data.menus);
            this.$store.commit('setToken', data.data.data.token);
            this.$store.commit('refreshToken', data.data.data.refreshToken);
            this.$store.commit('homeImg',data.data.data.avatar)
            
            let dataList = data.data.data.menus;
            this.$util.GenerateRouter(dataList);
            this.$router.push({path: '/'});

        },
    }
};
</script>

<style scoped>
.login-container {
    width: 100%;
    height: 100%;
    background:url('../../assets/back.jpg');
    background-size:100% 100%;
}
.login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
}
</style>