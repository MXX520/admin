<template>
    <div id="app">
        <!--<tinymce id="d1" class="essayNoticeBox" v-model="content"></tinymce>
        <tinymce id="d2" class="essayNoticeBox" v-model="contentEn"></tinymce>-->
        <VueUeditorWrap class="essayNoticeBox" v-model="content"></VueUeditorWrap>
        <VueUeditorWrap class="essayNoticeBox" v-model="contentEn"></VueUeditorWrap>
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
    name: 'essayNotice',
    data () {
        return {
            msg: '征文通知',
            content:'',//中文
            contentEn:'',//英文
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
                console.log('征文通知')
                this.getList();
            });
        },

        //获取数据
        async getList(id){
            let {data}  = await this.$api.get("/forum/notice/"+this.id)
            console.log("获取征文通知数据",data);
            this.content = data.data.content;
            console.log(JSON.stringify(this.content));
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
            let {data}  = await this.$api.post("forum/notice",postData);
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
                content:this.content
            }
            this.$eventHub.$emit(this.$consts.Event.SHOW_PREVIEW, data)
        },

        //英语预览
        previewEn(){
            let data = {
                type:'essayNotice',
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
