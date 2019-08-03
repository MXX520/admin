<template>
    <div id='app'>
        <el-row class="forumList-box" ref="echartsWrapper">
            <el-col :span="4" class="forumList">
                <el-tree :data="btnList"
                ref="tree"
                show-checkbox
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
                <div class="grid-content bg-purple-light">
                    <el-row class="content-top">
                        <el-table
                            :data="tableData"
                            height="500"
                            border
                            style="width: 100%">
                            <el-table-column
                                prop="id"
                                label="文章id"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="paperAbstract"
                                label="摘要"
                                max-height="40"
                                width="auto">
                            </el-table-column>
                            <el-table-column
                                prop="paperTitle"
                                label="文章标题"
                                height="40">
                            </el-table-column>
                            <el-table-column
                                prop="themeName"
                                label="论文主题名称"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="submitTypeName"
                                label="稿件提交方式"
                                width="140">
                            </el-table-column><el-table-column
                                label="论文名称"
                                width="100">
                                <template slot-scope="scope">
                                    <el-button @click="skip(scope.row)" type="text" size="small">预览</el-button>
                                    <el-button @click="handleClick(scope.row,0)" type="text" size="small">下载</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="海报名称"
                                width="100">
                                <template slot-scope="scope">
                                    <el-button @click="showSrc(scope.row)" type="text" size="small">预览</el-button>
                                    <el-button @click="handleClick(scope.row,1)" type="text" size="small">下载</el-button>
                                </template>
                            </el-table-column>
                            
                            </el-table-column><el-table-column
                                prop="paperKeywords"
                                label="关键词"
                                width="80">
                            </el-table-column>
                            </el-table-column><el-table-column
                                prop="paperReference"
                                label="参考文献"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="createTime"
                                label="上传时间"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="isAudit"
                                label="发布状态"
                                width="80">
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
        
    </div>
</template>

<script>
import pdf from 'vue-pdf'
import showPdf from '../components/showPdf'
import FileSaver from 'file-saver'
import api from '../api/http'
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
                }
            })
        },
        async handleClick(val,index){
          console.log("下载",api);
        //   axios({
        //         method:'get',
        //         url:`http://39.100.65.236:8093/paper/download?id=${val.id}&type=${index}`,
        //         responseType:'blob',
        //     })
        //     .then((data) => {
        //         console.log(data);
        //     })
        //   let params = {
        //     id:val.id,
        //     type:index
        //   }
        //   console.log(params);
        //   let getData = this.$api.get(`paper/download`,params);
        //   console.log("下载",getData);
        //   let a;
        //   getData.then((v)=>{
        //     a = v;
        //   });
        //   console.log("=-=-=-=",a);

        //   FileSaver.saveAs(`http://39.100.65.236:8093/paper/download?id=${val.id}&type=${index}&token=${api.headers.token}&refreshToken=${api.headers.refreshToken}&Content=${api.headers.Content}`,'99');
        // paper/download?id=1&type=0
        window.location.herf =`http://39.100.65.236:8093/paper/download?id=${val.id}&type=${index}&token=${api.headers.token}&refreshToken=${api.headers.refreshToken}&Content=${api.headers.Content}`;
        //   window.open(`http://39.100.65.236:8093/paper/download?id=${val.id}&type=${index}&token=${api.headers.token}&refreshToken=${api.headers.refreshToken}`)
        //   window.location.href = 'http://39.106.77.121:8086/paper/download'
        },
        benListClick(ev){
            console.log(ev);
            this.btnIndex = ev.id;
            this.formData.forumId = ev.id;
            this.loadListRight();
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
       
        skip(row){
            this.$util.log(row.paperName);
            this.isImg = false;
            this.dialogVisible = true;
            // let mm = 'http://file.dakawengu.com/file/2018-05-29/20180527-tianfeng.pdf'
            this.pdfPath = row.paperName;
        }
    }
  };
</script>

<style scoped lang="less">

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
    width:700px;
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

</style>

