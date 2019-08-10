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
                <quill-editor 
                    v-model="postDate.about" 
                    ref="aboutUs" 
                    :options="editorOption">
                </quill-editor>
            </el-form-item>
            <el-form-item label="关于我们（英文）">
                <quill-editor 
                    v-model="postDate.aboutEn" 
                    ref="aboutUs" 
                    :options="editorOption">
                </quill-editor>
            </el-form-item>
            
            <el-form-item label="会议通知（中文）">
                <quill-editor 
                    v-model="postDate.conferenceNotice" 
                    ref="meetingNotice" 
                    :options="editorOption">
                </quill-editor>
            </el-form-item>
            <el-form-item label="会议通知（英文）">
                <quill-editor 
                    v-model="postDate.conferenceNoticeEn" 
                    ref="meetingNotice" 
                    :options="editorOption">
                </quill-editor>
            </el-form-item>

            <el-form-item label="背景图一">
                <el-image
                    style="width: 100px; height: 100px"
                    :src="postDate.image1">
                </el-image>
                
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>

                <el-button type="primary" @click="updataimg">上传</el-button>
                <input type="file"  style="display:none;" ref="file" @change="changFile" accept="image/x-png,image/gif,image/jpeg,image/bmp" >
            </el-form-item>
            <el-form-item label="背景图二">
                <el-image
                    style="width: 100px; height: 100px"
                    :src="postDate.image2">
                </el-image>

                <el-upload
                    action="#"
                    list-type="picture-card"
                    :auto-upload="false">
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}">
                        <img
                            class="el-upload-list__item-thumbnail"
                            :src="file.url" alt=""
                        >
                        <span class="el-upload-list__item-actions">
                            <span
                            class="el-upload-list__item-preview"
                            @click="handlePictureCardPreview(file)"
                            >
                            <i class="el-icon-zoom-in"></i>
                            </span>
                            <span
                            v-if="!disabled"
                            class="el-upload-list__item-delete"
                            @click="handleDownload(file)"
                            >
                            <i class="el-icon-download"></i>
                            </span>
                            <span
                            v-if="!disabled"
                            class="el-upload-list__item-delete"
                            @click="handleRemove(file)"
                            >
                            <i class="el-icon-delete"></i>
                            </span>
                        </span>
                        </div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>


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
 import { quillEditor } from 'vue-quill-editor'
export default {
    name: 'departmentHomepage',
    data () {
        return {
            msg: '院系首页',
            id:1,
            input:'',
            content:'',
            //富文本配置文件
            editorOption:{
                // modules:{
                //     toolbar:[
                //         ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                //         ['blockquote', 'code-block']
                //     ]
                // }
            },
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
            disabled: false
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
                this.getList(item);
            });
        },

        //获取数据
        async getList(id){
            console.log("id",id);
            let {data}  = await this.$api.get("/forum/index/"+this.id)
            console.log("获取的院系首页数据",data);
            this.postDate = {...data.data};
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
            this.postDate.forumId = 1;
            console.log("保存",this.postDate);
            let data = await this.$api.post("/forum/index",this.postDate);
            console.log(data);
            if(data.code == '01'){
                this.$message({
                    message: '保存成功',
                    type: 'success'
                    });
            }
        },

        //上传图片

        changFile(e){
            this.file = []
            this.file = e.target.files;
            console.log("this.file-=-=",this.file);
        },
        updataimg(){
            this.$refs.file.click()
            // let form = new FormData();
            // form.append("file",this.file[0])
        },
        handleRemove(file) {
            console.log(file);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleDownload(file) {
            console.log(file);
        }
    },
    components: {
        
    }
}
</script>

<style scoped lang="less">
.essayNoticeBox{
    min-height:500px;
    
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
