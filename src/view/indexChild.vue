<template>
  <div>
       <div style="text-align:center;font-size:22px;margin-bottom:10px;">
                    帮助文档
                </div>
                <div class="index" v-html="html">

                </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            dataList : [],
            collapsed:false,
            sysName:'清华大学博士生论坛管理系统',
            sysUserAvatar:this.$store.getters.getImg,
            sysUserName: '',
            matched:'', //面包屑
            isCollapse:false, //收缩展开
            html:""
        }
    },
    created() {
        this.init()
    },
    methods:{
        async init(){
            console.log(this.$api.post);
            let {data} =  await this.$api.get("config/help")
            console.log(data)
            this.html = data.data.content;
        },
    }

}
</script>

<style>

</style>