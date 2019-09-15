<template>
    <el-row class="forumList-box" ref="echartsWrapper">
        <el-col :span="18" class="forumTab">
            <el-row>
                <el-col :span="10">
                    <el-input v-model="query" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="10" style="marginLeft:20px">
                    <el-button type="primary" v-if="id" @click="queryClick">查询</el-button>
                </el-col>
            </el-row>
            <el-row style="marginTop:20px">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="num"
                        align='center'
                        label="序号"
                        width="80"
                        height="10">
                    </el-table-column>
                    <el-table-column
                        prop="paperTitle"
                        align='center'
                        label="稿件标题"
                        height="20px">
                    </el-table-column>
                    <el-table-column
                        prop="userName"
                        align='center'
                        label="分发人员"
                        height="20px">
                    </el-table-column>
                    <el-table-column
                        prop="reviewer"
                        align='center'
                        label="审核人员"
                        height="20px">
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        align='center'
                        label="分发时间"
                        height="20px">
                    </el-table-column>
                </el-table>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="size"
                    layout="total, prev, pager, next"
                    :total="total">
                </el-pagination>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
import util from '@/api/utils'
export default {
    name: 'paperdistrbutelogTable',
    props:{
        id:Number,
        default:null
    },
    data() {
      return {
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        showMask: false,
        activeName:'first',//默认tab页
        query:'',//搜索内容
        tableData:[],//数据集合
        size:1,//当前页
        total:'',//总页数
        idS:''
      };
    },
    watch: {
        id(val) {
            this.idS = val
            this.getRecordList();
            console.log(this.idS);
        }
    },
    created() {
    },

    methods: {

        //获取数据
        async getRecordList(){
            let params = {
                pageNum:this.size,
                pageSize:10,
                order:null,
                orderType:null,
                forumId:this.idS,
                query:this.query
            }
            let {data}  = await this.$api.get("paper/distribute/list",params);
            console.log("论坛审稿分组列表",data);
            this.total = data.data.total;//总页数
            
            this.tableData = data.data.list;//数据

            this.tableData.forEach((item,index) => {
                item.num = util.number(this.size)[index];
            })
        },

        //查询
        queryClick(){
            this.size = 1;
            this.getRecordList();
        },

        //分页查询
        handleSizeChange(val){
            console.log(`每页 ${val} 条1`);
            this.getRecordList();
        },

        //分页查询
        handleCurrentChange(val){
            console.log(`每页 ${val} 条2`);
            this.size = val;
            this.getRecordList();
        },
    },
    components: {
       

    }
}
</script>

<style scoped lang="less">
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
