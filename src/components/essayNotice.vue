<template>
    <div id="app">
        <quill-editor 
            class="essayNoticeBox"
            v-model="content" 
            ref="aboutUs" 
            :options="editorOption">
        </quill-editor>
        <quill-editor 
            class="essayNoticeBox"
            v-model="contentEn" 
            ref="aboutUs" 
            :options="editorOption">
        </quill-editor>
        <el-row>
            <el-button type="primary" @click="saveBtn">保存</el-button>
            <el-button type="primary" @click="previewCh">中文预览</el-button>
            <el-button type="primary" @click="previewEn">英文预览</el-button>
        </el-row>
        <VueUeditorWrap/>
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
            //富文本配置规则
            editorOption: {
                
            }
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
    .essayNoticeBox{
        min-height:500px;
        
    }
    /deep/ .ql-container{
        min-height:400px;
    }
</style>
