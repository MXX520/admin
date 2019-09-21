<template>
    <div id="app">
        <!--<tinymce id="d1" class="essayNoticeBox" v-model="paperNotice"></tinymce>
        <tinymce id="d2" class="essayNoticeBox" v-model="paperNoticeEn"></tinymce>-->
        <VueUeditorWrap class="essayNoticeBox" v-model="paperNotice"></VueUeditorWrap>
        <VueUeditorWrap class="essayNoticeBox" v-model="paperNoticeEn"></VueUeditorWrap>
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
    name: 'submissionGuidelines',
    data () {
        return {
            msg: '投稿须知',
            paperNotice:'',//中文
            paperNoticeEn:'',//英文
        }
    },
    created() {
        this.initEvt();
        console.log("this.$refs.tm.editor-=-=-=-=-=-=-=-=-=",this.$refs.tm);
    },
    methods: {
        initEvt(){
            this.$eventHub.$on(this.$consts.Event.FORUMEDIT, (item)=>{
                this.id = item;
                this.getList();
            });
        },

        //获取数据
        async getList(id){
            console.log('获取投稿须知数据-=-=-=-=-=-=-=')
            let {data}  = await this.$api.get("forum/paper/"+this.id)
            console.log("获取投稿须知数据",data);
            this.paperNotice = data.data.paperNotice;
            console.log(JSON.stringify(this.paperNotice));
            this.paperNoticeEn = data.data.paperNoticeEn;
        },

        //保存
        async saveBtn(){
            let postData = {
                "forumId":this.id,
                "paperNotice":this.paperNotice,
                "paperNoticeEn":this.paperNoticeEn
            }
            console.log(this.paperNotice);
            let {data}  = await this.$api.post("forum/paper",postData);
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
                type:'essayNotice',
                content:this.paperNotice
            }
            this.$eventHub.$emit(this.$consts.Event.SHOW_PREVIEW, data)
        },

        //英语预览
        previewEn(){
            let data = {
                type:'essayNotice',
                content:this.paperNoticeEn
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
