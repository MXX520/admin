<template>
    <div id="app">
        <VueUeditorWrap
            class="contactUs"
            v-model="content" 
            ref="aboutUs">
        </VueUeditorWrap>
        <VueUeditorWrap
            class="contactUs"
            v-model="contentEn" 
            ref="aboutUs">
        </VueUeditorWrap>
        <el-row>
            <el-button type="primary" @click="saveBtn">保存</el-button>
            <el-button type="primary" @click="previewCh">中文预览</el-button>
            <el-button type="primary" @click="previewEn">英文预览</el-button>
        </el-row>
    </div>  
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
    name: 'contactUs',
    data () {
        return {
            msg: '联系我们',
            contentEn:'', //中文
            content:'', //英文
            id:'',//左侧论坛树id
        }
    },
    created() {
        this.initEvt();
    },
    methods: {
        initEvt(){
            this.$eventHub.$on(this.$consts.Event.FORUMEDIT, (item)=>{
                this.id = item;
                this.getList();
            });
        },

        //获取数据
        async getList(){
            let {data}  = await this.$api.get("/forum/contact/"+this.id)
            console.log("获取联系我们数据",data);
            this.content = data.data.content;
            this.contentEn = data.data.contentEn;
        },

        //保存
        async saveBtn(){
            let postData = {
                "forumId":this.id,
                "content":this.content,
                "contentEn":this.contentEn
            }
            console.log(this.content);
            let {data}  = await this.$api.post("/forum/contact",postData);
            console.log("保存后",data);
            if(data.code == '01'){
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
            }
        },

        //中文预览
        previewCh(){
            let data = {
                type:'contactUs',
                content:this.content
            }
            this.$eventHub.$emit(this.$consts.Event.SHOW_PREVIEW, data)
        },

        //英语预览
        previewEn(){
            let data = {
                type:'contactUs',
                content:this.contentEn
            }
            this.$eventHub.$emit(this.$consts.Event.SHOW_PREVIEW, data)
        }

    },
    components: {
        VueUeditorWrap
    }
}
</script>

<style scoped lang="less">
/deep/ .essayNoticeBox, /deep/ .mce-edit-area iframe{
    min-height:400px;
    margin-bottom:20px;
}
/deep/ .edui-editor{
    width: auto !important;
}
/deep/ .edui-editor-iframeholder{
    height: 300px;
}
/deep/ .edui-box{
    height:25px;
}
</style>
