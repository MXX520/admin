<template>
    <div id="app">
        <el-form label-width="140px">
            <el-form-item label="会议标题（中文）">
                <el-input v-model="postDate.conferenceOverview"></el-input>
            </el-form-item>
            <el-form-item label="会议标题（英文）">
                <el-input v-model="postDate.conferenceOverviewEn"></el-input>
            </el-form-item>

            <el-form-item label="会议时间（中文）">
                <el-input v-model="postDate.conferenceTime"></el-input>
            </el-form-item>
            <el-form-item label="会议时间（英文）">
                <el-input v-model="postDate.conferenceTimeEn"></el-input>
            </el-form-item>

            <el-form-item label="会议地点（中文）">
                <el-input v-model="postDate.conferencePlace"></el-input>
            </el-form-item>
            <el-form-item label="会议地点（英文）">
                <el-input v-model="postDate.conferencePlaceEn"></el-input>
            </el-form-item>

            <el-form-item label="关于我们（中文）">
                <VueUeditorWrap id="d5"
                    v-model="postDate.about" 
                    ref="aboutUs">
                </VueUeditorWrap>
            </el-form-item>
            <el-form-item label="关于我们（英文）">
                <VueUeditorWrap id="d6"
                    v-model="postDate.aboutEn" 
                    ref="aboutUs">
                </VueUeditorWrap>
            </el-form-item>
            
            <el-form-item label="会议通知（中文）">
                <VueUeditorWrap id="d3"
                    v-model="postDate.conferenceNotice" 
                    ref="meetingNotice">
                </VueUeditorWrap>
            </el-form-item>
            <el-form-item label="会议通知（英文）">
                <VueUeditorWrap id="d4"
                    v-model="postDate.conferenceNoticeEn" 
                    ref="meetingNotice" >
                </VueUeditorWrap>
            </el-form-item>

            <el-form-item label="背景图一" class="fileImg">
                <el-image
                    v-if="postDate.image1"
                    style="width: 100px; height: 100px"
                    :src="postDate.image1">
                </el-image>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <upImg  @fileImg="getImgFile"></upImg>
            </el-form-item>
            <el-form-item label="背景图二" class="fileImg">
                <el-image
                    v-if="postDate.image1"
                    style="width: 100px; height: 100px"
                    :src="postDate.image2">
                </el-image>
                    <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <upImg @fileImgs="getImgFiles"></upImg>
            </el-form-item>
            <el-form-item label="板式选择">
                <el-radio-group v-model="type">
                    <el-radio :label="1">首页版式一</el-radio>
                    <el-radio :label="2">首页版式二</el-radio>
                    <el-radio :label="3">首页版式三</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="dialogHome">预览</el-button>
                <el-button type="primary" @click="saveBtn">保存</el-button>
            </el-form-item>
        </el-form>
    </div>  
</template>

<script>
import upImg from './upImg'
import axios from 'axios'
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
    name: 'departmentHomepage',
    data () {
        return {
            msg: '院系首页',
            id:"",
            input:'',
            content:'',
            type: '',
            //所有输入框model
            postDate: {
                forumId: '',//论坛id
                about:'',//关于我们(中文)	
                aboutEn:'',//关于我们(英文)	
                conferenceTime:'',//会议时间(中文)
                conferenceTimeEn:'',//会议时间(英文)
                conferenceOverview:'',//会议标题(中文)
                conferenceOverviewEn:'',//会议标题(英文)
                conferencePlace:'',//会议地点(中文)
                conferencePlaceEn:'',//会议地点(英文)
                conferenceNotice:'',//会议通知(中文)
                conferenceNoticeEn:'',//会议通知(英文)
                image1:'',//论坛背景图片一	
                image2:'',//论坛背景图片二	
                type:'',//页面板式 1：版式一 2：版式二 3：版式三
            },
            //单选
            radio: 3,
            form: '',
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            formData: new FormData()
        }
    },
    created() {
        this.initEVt();
        console.log("---------看看单击执行1");
    },
    methods: {
        //接收广播事件
        initEVt(){
            this.$eventHub.$on(this.$consts.Event.FORUMEDIT, (item)=>{
                this.id = item;
                console.log("院系首页");
                this.getList(item);
            });
        },

        //获取数据
        async getList(id){
            console.log("id",id);
            let {data}  = await this.$api.get("/forum/index/"+this.id)
            console.log("获取的院系首页数据",data);
            this.postDate = {...data.data};
            this.type =  this.postDate.type ?  this.postDate.type : 1;
        },
        
        //发送广播事件，显示预览弹窗
        dialogHome(){
            //调用$emit 方法
            let data = {
                type:'departmentHomepage',
                content:this.postDate
            }
           this.$eventHub.$emit(this.$consts.Event.SHOW_PREVIEW, data)
        },

        //保存
        async saveBtn(){
            console.log("保存", this.id);
            this.formData.append("forumId", this.id);
            this.formData.append("about", this.postDate.about || "");
            this.formData.append("aboutEn", this.postDate.aboutEn || "");
            this.formData.append("conferenceTime", this.postDate.conferenceTime || "");
            this.formData.append("conferenceTimeEn", this.postDate.conferenceTimeEn || "");
            this.formData.append("conferenceOverview", this.postDate.conferenceOverview || "");
            this.formData.append("conferenceOverviewEn", this.postDate.conferenceOverviewEn || "");
            this.formData.append("conferencePlace", this.postDate.conferencePlace || "");
            this.formData.append("conferencePlaceEn", this.postDate.conferencePlaceEn || "");
            this.formData.append("conferenceNotice", this.postDate.conferenceNotice || "");
            this.formData.append("conferenceNoticeEn", this.postDate.conferenceNoticeEn || "");
            this.formData.append("type", this.type);
            let config = {       
               headers: { "Content-Type": "multipart/form-data" }
            };
            
            let {data} = await axios.post(this.$api.httpPath+"forum/index",this.formData)
            console.log(data);
            if(data.code == '01'){
                this.$message({
                    message: '保存成功',
                    type: 'success'
                    });
            }else {
                this.$message.error(data.msg);
            }
        },

        //上传图片

        getImgFile(data){
            console.log("获取的文件======--=+++++",data);
            this.formData.append("image1", data);
        },
        getImgFiles(data){
            console.log("获取的文件======--=+++++",data);
            this.formData.append("image2", data);
        }
    },
    components: {
        upImg,
        VueUeditorWrap
    }
}
</script>

<style scoped lang="less">
/deep/ .essayNoticeBox, /deep/ .mce-edit-area iframe{
    min-height:400px;
    margin-bottom:20px;
}
/deep/ .ql-container{
    min-height:200px;
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
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
