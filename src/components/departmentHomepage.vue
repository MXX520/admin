<template>
    <div id="app">
        <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="会议标题">
            <el-input v-model="postDate.conferenceOverview"></el-input>
        </el-form-item>
        
        <el-form-item label="会议时间">
            <el-input v-model="postDate.conferenceTime"></el-input>
            <!--<el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="postDate.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>-->
        </el-form-item>
        <el-form-item label="会议地点">
            <el-input v-model="postDate.conferencePlace"></el-input>
            <!--<el-select v-model="postDate.conferencePlace" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>-->
        </el-form-item>
        <el-form-item label="关于我们">
            <quill-editor 
                v-model="postDate.about" 
                ref="aboutUs" 
                :options="editorOption" 
                @blur="onEditorBlurUs($event)" @focus="onEditorFocusUs($event)"
                @change="onEditorChangeUs($event)">
            </quill-editor>
        </el-form-item>
        <el-form-item label="会议通知">
            <quill-editor 
                v-model="postDate.conferenceNotice" 
                ref="meetingNotice" 
                :options="editorOption" 
                @blur="onEditorBlurNotice($event)" @focus="onEditorFocusNotice($event)"
                @change="onEditorChangeNotice($event)">
            </quill-editor>
        </el-form-item>
        <el-form-item label="背景图一">
            <el-image
                style="width: 100px; height: 100px"
                :src="postDate.image1"
                :fit="fit">
            </el-image>
        </el-form-item>
        <el-form-item label="背景图二">
            <el-image
                style="width: 100px; height: 100px"
                :src="postDate.image2"
                :fit="fit">
            </el-image>
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
                forumId: '1',//论坛id
                about:'',//关于我们(中文)	
                conferenceTime:'',//会议时间(中文)	
                conferenceOverview:'',//会议标题(中文)	
                conferencePlace:'',//会议地点(中文)	
                conferenceNotice:'',//会议通知(中文)	
                image1:'',//论坛背景图片一	
                image2:'',//论坛背景图片二	
                type:'',//页面板式 1：版式一 2：版式二 3：版式三
            },
            //单选
            radio: 3
            
        }
    },
    created() {
        this.init();
    },
    methods: {
        init(){
            this.getList();
        },

        async getList(){
            let {data}  = await this.$api.get("/forum/index/"+this.id)
            console.log("获取的院系首页数据",data);
            this.postDate = {...data.data};
        },

        //关于我们
        onEditorBlurUs(){//失去焦点事件
        },
        onEditorFocusUs(){//获得焦点事件
        },
        onEditorChangeUs(ev){//内容改变事件
            console.log(ev);
        },

        //会议通知
        onEditorBlurUsNotice(){//失去焦点事件
        },
        onEditorFocusUsNotice(){//获得焦点事件
        },
        onEditorChangeUsNotice(ev){//内容改变事件
            console.log(ev);
        },
        
        dialogHome(){
            //调用$emit 方法
           this.$eventHub.$emit('mxx', '你的需要传送的数据')
        },

        //上传图片1方法
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },

        //上传图片二方法
        handleAvatarSuccess2(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload2(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        async saveBtn(){
            console.log("保存",this.postDate);
            let data = await this.$api.post("/forum/index",this.postDate);
            console.log(data);
            // if(data.data.code){
            //     this.$message({
            //         message: '申请成功',
            //         type: 'success'
            //         });
            // }
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
    min-height:400px;
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
