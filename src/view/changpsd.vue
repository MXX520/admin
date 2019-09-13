<template>
    <div id="app">
        <div class="back" @click="back">
            返回
        </div>
         <el-form style="width:400px;">
                <el-form-item label="原密码" >
                    <el-input v-model="oldPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" >
                    <el-input v-model="newPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" >
                    <el-input v-model="confirmPassword" autocomplete="off"></el-input>
                </el-form-item>
         </el-form>
         <div class="btn" @click="init">
             确认
         </div>
    </div>  
</template>

<script>
export default {
    name: 'App',
    data () {
        return {
        msg: 333,
        oldPassword:"",
        newPassword:"",
        confirmPassword:""
        }
    },
    created() {
        //this.init();
    },
    methods: {
       async init(){
           if(this.oldPassword==""){
               return 
           }
           if(this.newPassword==""){
               return 
           }
           if(this.confirmPassword==""){
               return 
           }
           let {data} = this.$api.post("user/password",{
               oldPassword:this.oldPassword,
               newPassword:this.newPassword,
               confirmPassword:this.confirmPassword
           })
        },
        back(){
            this.$router.go(-1)
        }
    },
    components: {

    }
}
</script>

<style scoped lang="stylus">
.btn{
    width 100px
    text-align center
    line-height 30px
    height 30px
    margin-left 0px
    background #409eff
    color white
    cursor pointer
}
.back{
    color blue
    cursor pointer
    text-decoration underline
}
</style>
