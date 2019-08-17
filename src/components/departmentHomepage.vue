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
                <tinymce id="d5"
                    v-model="postDate.about" 
                    ref="aboutUs">
                </tinymce>
                
            </el-form-item>
            <el-form-item label="关于我们（英文）">
                <tinymce id="d6"
                    v-model="postDate.aboutEn" 
                    ref="aboutUs">
                </tinymce>
            </el-form-item>
            
            <el-form-item label="会议通知（中文）">
                <tinymce id="d3"
                    v-model="postDate.conferenceNotice" 
                    ref="meetingNotice">
                </tinymce>
            </el-form-item>
            <el-form-item label="会议通知（英文）">
                <tinymce id="d4"
                    v-model="postDate.conferenceNoticeEn" 
                    ref="meetingNotice" >
                </tinymce>
            </el-form-item>

            <el-form-item label="背景图一" class="fileImg">
                <el-image
                    style="width: 100px; height: 100px"
                    :src="showImg1">
                </el-image>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <upImg v-if="showImg1"  @fileImg="getImgFile"></upImg>
            </el-form-item>
            <el-form-item label="背景图二" class="fileImg">
                <el-image
                    style="width: 100px; height: 100px"
                    :src="showImg2">
                </el-image>
                    <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <upImg v-if="showImg2" @fileImgs="getImgFiles"></upImg>
            </el-form-item>
            <el-form-item label="板式选择">
                <el-radio-group v-model="postDate.type">
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
export default {
    name: 'departmentHomepage',
    data () {
        return {
            msg: '院系首页',
            id:"",
            input:'',
            content:'',
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
            showImg1:'',
            showImg2:'',
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
                console.log(this.id);
                this.getList(item);
            });
        },

        //获取数据
        async getList(id){
            console.log("id",id);
            let {data}  = await this.$api.get("/forum/index/"+this.id)
            console.log("获取的院系首页数据",data);
            this.postDate = {...data.data};
            this.showImg1 = this.postDate.image1;
            this.showImg2 = this.postDate.image2;
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
            let formData = new FormData();
            formData.append("forumId", Number(this.postDate.forumId));
            formData.append("about", this.postDate.about);
            formData.append("aboutEn", this.postDate.aboutEn);
            formData.append("conferenceTime", this.postDate.conferenceTime);
            formData.append("conferenceTimeEn", this.postDate.conferenceTimeEn);
            formData.append("conferenceOverview", this.postDate.conferenceOverview);
            formData.append("conferenceOverviewEn", this.postDate.conferenceOverviewEn);
            formData.append("conferencePlace", this.postDate.conferencePlace);
            formData.append("conferencePlaceEn", this.postDate.conferencePlaceEn);
            formData.append("image1", null);
            formData.append("image2", null);
            formData.append("conferenceNotice", this.postDate.conferenceNotice);
            formData.append("conferenceNoticeEn", this.postDate.conferenceNoticeEn);
            formData.append("type", Number(this.postDate.type));
            console.log("保存",formData);
            console.log("forumId",formData.get("forumId"));
            console.log("about",formData.get("about"));
            console.log("aboutEn",formData.get("aboutEn"));
            console.log("conferenceTime",formData.get("conferenceTime"));
            console.log("conferenceTimeEn",formData.get("conferenceTimeEn"));
            console.log("conferenceOverview",formData.get("conferenceOverview"));
            console.log("conferenceOverviewEn",formData.get("conferenceOverviewEn"));
            console.log("conferencePlace",formData.get("conferencePlace"));
            console.log("conferencePlaceEn",formData.get("conferencePlaceEn"));
            console.log("conferenceNotice",formData.get("conferenceNotice"));
            console.log("conferenceNoticeEn",formData.get("conferenceNoticeEn"));
            console.log("type",formData.get("type"));
            let config = {       
               headers: { "Content-Type": "multipart/form-data" }
            };
            let {data} = await axios.post("http://39.100.65.236:8093/forum/index",form, config)
            // let data = await this.$api.post("/forum/index", formData, config);
            console.log(data);
            if(data.code == '01'){
                this.$message({
                    message: '保存成功',
                    type: 'success'
                    });
            }
        },

        //上传图片

        getImgFile(data){
            console.log("获取的文件======--=+++++",data);
            formData.append("image1", data);
        },
        getImgFiles(data){
            console.log("获取的文件======--=+++++",data);
            formData.append("image2", data);
        }
    },
    components: {
        upImg
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
