<template>
    <div id='app'>
        <el-row class="forumList-box" ref="echartsWrapper">
            <el-col :span="4" class="forumList">
                <el-tree :data="btnList"
                ref="tree"
                accordion
                :expand-on-click-node="false"
                :current-node-key="currentNodekey"
                node-key="id"
                :default-expanded-keys="[1]"
                :props="defaultProps"
                @node-click="benListClick"
                ></el-tree>
            </el-col>
            <el-col :span="18">
                 <el-row style="flex" justify="space-between" v-if="formData.forumId">
                    <el-col :span="12" style="paddingLeft:10px;">
                        <el-col :span="12">
                            <el-input v-model="formData.query" placeholder="请输入内容"></el-input>
                        </el-col>
                        <el-col :span="12">
                            <el-button type="primary" @click="loadListRight">查询</el-button>
                        </el-col>
                    </el-col>
                    <el-col :span="12" style="paddingRight:10px;">
                        <el-row style="flex">
                            <el-button style="float:right" type="primary" @click="exportMsg">稿件信息导出</el-button>
                        </el-row>
                    </el-col>
                </el-row>
                <div class="grid-content bg-purple-light">
                    <el-row class="content-top">
                        <el-table
                            :data="tableData"
                            height="500"
                            border
                            style="width: 100%">
                            <el-table-column
                                prop="num"
                                align='center'
                                label="序号"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="paperTitle"
                                align='center'
                                label="文章标题"
                                height="40">
                            </el-table-column>
                            <el-table-column
                                align='center'
                                prop="themeName"
                                label="论文主题名称"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="email"
                                align='center'
                                label="投稿人"
                                max-height="40"
                                width="200">
                            </el-table-column>
                            <el-table-column
                                prop="submitTypeName"
                                align='center'
                                label="稿件提交方式"
                                width="140">
                            </el-table-column>
                            <el-table-column
                                label="论文名称"
                                align='center'
                                width="100">
                                <template slot-scope="scope">
                                    <el-button v-if="scope.row.paperName" @click="skip(scope.row)" type="text" size="small">预览</el-button>
                                    <el-button v-if="scope.row.paperName" @click="handleClick(scope.row,0)" type="text" size="small">下载</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="海报名称"
                                align='center'
                                width="100">
                                <template slot-scope="scope">
                                    <el-button v-if="scope.row.posterName" @click="showSrc(scope.row)" type="text" size="small">预览</el-button>
                                    <el-button v-if="scope.row.posterName" @click="handleClick(scope.row,1)" type="text" size="small">下载</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="isAudit"
                                align='center'
                                label="发布状态"
                                width="100">
                                <template slot-scope="scope">
                                   <p>{{consts.ManuscriptListStyle[scope.row.isAudit]}}</p>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="isReview"
                                align='center'
                                label="是否第三方审稿"
                                sortable
                                width="180">
                                <template slot-scope="scope">
                                    <el-button type="danger">{{scope.row.isReview == 1 ? '是' : '不是'}}</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="reviewResult"
                                align='center'
                                label="终审结果"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                fixed="right"
                                label="操作"
                                align='center'
                                width="100">
                                <template slot-scope="scope">
                                    <el-button @click="detailClick(scope.row)" type="text" size="small">详情</el-button>
                                    <el-button @click="finalClick(scope.row)" type="text" size="small">终审</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                    <el-row>
                        <div class="block">
                            <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            prev-text="上一页"
                            next-text="下一页"
                            layout="total, prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                        </div>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <el-row class="showBox" v-if="dialogVisible" type='flex' justify="center" align="middle">
            <i class="el-icon-close close" @click="dialogVisible = false"></i>
            <el-row type='flex' justify="center" align="middle" v-if='isImg' class="demo-image__placeholder">
                <img :src="src" alt="">
            </el-row>
            <showPdf class="pdf-show" :msg-father="pdfPath" v-if="!isImg"></showPdf>
        </el-row>
        <!--详情-->
		<el-dialog class='dtails' title="论坛详情" :visible.sync="dtailFormVisible" :close-on-click-modal="false">
			<el-form :model="dtailForm" label-width="120px" :rules="addFormRules">
				<el-form-item label="论坛名称">
					<el-input v-model="dtailForm.forumName" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="投稿主题">
					<el-input v-model="dtailForm.themeName" :disabled="true"></el-input>
				</el-form-item>
				 <el-form-item label="投稿方式">
					<el-input v-model="dtailForm.submitTypeName" :disabled="true"></el-input>
				</el-form-item>
				 <el-form-item label="投稿人">
					<el-input v-model="dtailForm.email" :disabled="true"></el-input>
				</el-form-item>
				 <el-form-item label="标题">
					<el-input v-model="dtailForm.paperTitle" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="摘要">
                    <el-input v-model="dtailForm.paperAbstract" :disabled="true"></el-input>
		        </el-form-item>
			    <el-form-item label="关键词">
                    <el-input v-model="dtailForm.paperKeywords" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="参考文献">
                    <el-input v-model="dtailForm.paperReference" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="论文名称">
                    <el-input v-model="dtailForm.paperName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="海报名称">
                    <el-input v-model="dtailForm.posterName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="首次提交时间">
                    <el-input v-model="dtailForm.createTime" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="最后提交时间">
                    <el-input v-model="dtailForm.lastSubmitTime" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="浏览次数">
                    <el-input v-model="dtailForm.viewCount" :disabled="true"></el-input>
                </el-form-item>
			</el-form>
		</el-dialog>


        <el-dialog title="最终审稿" :visible.sync="dialogFormVisible">
            <el-form>
                <el-form-item label="结果" :label-width="formLabelWidth">
                <el-select v-model="finalVal" placeholder="">
                    <el-option label="通过" value="通过"></el-option>
                    <el-option label="不通过" value="不通过"></el-option>
                </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="finalOkClick">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import pdf from 'vue-pdf'
import showPdf from '../components/showPdf'
import FileSaver from 'file-saver'
import axios from 'axios'
import api from '../api/http'
import util from '@/api/utils'

  export default {
    data() {
        return {
            btnList:[],
            tableData: [],
            btnIndex:1,
            currentPage: 1,
            page:null,//页码
            total:null,//每页大小	
            formData:{
                pageNum:null, 
                pageSize:null,
                order:null,//排序字段（值为id、paperTitle、createTime）	
                orderType:null,//升序还是降序（值为asc或者desc）	
                forumId:null,//论坛id （论坛树返回的id字段）	
                query:null//查询条件	
            },
            
            formLabelWidth: '120px',
            src: '',
            dialogVisible:false,
            isImg:'',
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            currentNodekey:'',//树结构默认选中的key
            pdfPath:'',//pdf路径
            dtailForm:{
                "forumName":"",//论坛名称
                "themeName":"",//投稿主题
                "submitTypeName":"",//投稿方式
                "email":"",//投稿人
                "paperTitle":"",//标题
                "paperAbstract":"",//摘要
                "paperKeywords":"",//关键词
                "paperReference":"",//参考文献
                "paperName":"",//论文名称
                "posterName":"",//海报名称
                "createTime":"",//首次提交时间
                "lastSubmitTime":"",//最后提交时间
                "viewCount":''//浏览次数
            },//详情数据
            dtailFormVisible:false ,//详情控制
            dialogFormVisible: false, //控制终审
            addFormRules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ]
            },
            finalVal:'',
            finalId: '',
            consts: this.$consts
        };
    },
    components:{
        pdf,
        showPdf
    },
    mounted() {
      
    },
    created() {
        this.init();
    },
    methods: {
        
        init(){
            console.log("121");
            this.loadListLeft();
        },
        showSrc(src){
            this.isImg = true;
            console.log(src);
            this.src = src.posterName;
            this.dialogVisible = true
        },
        async loadListLeft(){
            let getData = await this.$api.get('forum/tree/list');
            console.log("加载数据-列表数据----",getData.data.data)
            this.btnList = getData.data.data;
            if(this.btnList.length > 0){
                this.currentNodekey = this.btnList[0].children[0].id;
                this.$refs.tree.setCurrentKey(this.currentNodekey);//一定要加这个选中了否则样式没有出来
                console.log("this.currentNodekey",this.currentNodekey);
            }
           
            
        },
        async loadListRight(){
            let params = {
                pageNum:this.currentPage, //页码
                pageSize:10,//每页大小	
                order:this.formData.order,//排序字段（值为id、paperTitle、createTime）	
                orderType:this.formData.orderType,//升序还是降序（值为asc或者desc）	
                forumId:this.formData.forumId,//论坛id （论坛树返回的id字段）	
                query:this.formData.query//查询条件	
            }
            let getData = this.$api.get(`paper/list`,params);
            console.log("params",params);
            getData.then(res=>{
                console.log("加载时间",res)
                if(res){
                    this.tableData = res.data.data.list;
                    this.total = res.data.data.total;
                    this.page = res.data.data.pages;
                    this.tableData.forEach((item,index) => {
                        item.num = util.number(this.currentPage)[index];
                    })
                }
            })
        },
        async handleClick(val,index){
            let params = {
                id:val.id,
                type:index
            }
            // let name;
            // if(index == 0){
            //     name = val.paperName.split("manuscript/");
            // }else {
            //     name = val.posterName.split("manuscript/");
            // }
            this.$api.download('paper/download',params)
        },
        benListClick(ev){
            if(ev.id){
                this.btnIndex = ev.id;
                this.formData.forumId = ev.id;
                this.loadListRight();
            }
            
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
            this.loadListRight();
        },
       
        skip(row){
            this.$util.log(row.paperName);
            this.isImg = false;
            this.dialogVisible = true;
            // this.pdfPath = 'http://file.dakawengu.com/file/2018-05-29/20180527-tianfeng.pdf'
            this.pdfPath = row.paperName;
        },

        //详情
        async detailClick(row){
            console.log("row.id-=-=-=",row.id);
            let {data} = await this.$api.get(`paper/${row.id}`);
            console.log("加载数据-列表数据----详情",data)
            
            if(data.code == '01'){
                this.dtailFormVisible = true;
                this.dtailForm = data.data;
            }else {
                this.$message.error(data.msg);
            }
        },


        //终审
        finalClick(row){
            this.dialogFormVisible = true;
            this.finalId = row.id;
        },

        //终审确定
        async finalOkClick(){
            if(this.finalVal != '') {
                let params = {
                    "reviewResult":this.finalVal,
                }

                console.log(params);
                console.log(this.finalId);

                let data = await this.$api.put("paper/result/"+this.finalId,params)
                this.dialogFormVisible = false;
                this.loadListRight();
                if(data.data.code){
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                }
            } else {
                this.$message.error("请选择审稿状态");
            }
        },

        //导出信息
        async exportMsg(){
            window.location.href = this.$api.httpPath+"paper/export/"+this.formData.forumId
        }
    }
  };
</script>

<style scoped lang="less">
.export{
    cursor: pointer;
}
.btnLeft{
    width:80%;
    height:50px;
    text-align:center;
    line-height:50px;
    font-size:14px;
    font-weight:600;
    border:solid 1px #5812c4;
    cursor:pointer;
    margin-left:10%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.btnLeftShow{
    color:#fff;
    background:#5812c4;
}
.btnLeftHide{
    color:#5812c4;
    background:#fff;
}

.content-top{
    padding:10px;
}

.demo-image__placeholder{
    width:100%;
    height:100%;
}
.demo-image__placeholder img{
    width:500px;
    height:500px;
}
.showBox{
    position:absolute;
    z-index:999;
    width:100%;
    height:100%;
    min-height:600px;
    background:rgba(0,0,0,0.6);
    top:0;
    left:0;

}
.pdf-show{
    width:1000px;
    height:600px;
}

.close{
    cursor:pointer;
    z-index:9999;
    color: #fff;
    font-size: 60px;
    position: absolute;
    right: 10%;
    top: 10%;
}

/deep/ .is-current{
    color:#409EFF;
    font-weight:600;
}
.forumList-box{
    height:100%;
    .forumList{
        height:90%;
        border:solid 1px #ccc;
        overflow-x:scroll;
        margin-top:10px;
        margin-right:20px;
        /deep/ .el-tree{
            width:200%;
        }
        /deep/ span{
            font-size:12px;
        }
    }
    .forumTab{
    }
}

.show-home-box{
    position:absolute;
    z-index:999;
    width:100%;
    height:100%;
    left:0;
    top:0;
    background:rgba(0,0,0,0.6);
    .show-home{
        position:absolute;
        width:800px;
        height:600px;
        background:#fff;
        
        .close-box{
            height:40px;
            background:#ccc;
            width:100%;
            position:relative;
        }
        .el-icon-close{
            font-size:40px;
            font-weight:700;
            color:#fff;
            position:absolute;
            cursor:pointer;
            right:0;
        }
        .content-box{
            height:560px;
            overflow:scroll;
        }
        .showEssayNotice ,.showContactUs{
            padding:20px;
        }
    }
}

.dtails{
    // height:80%;
    // overflow:scroll;
}

</style>

