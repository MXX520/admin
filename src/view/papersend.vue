<template>
    <div id="app">
        <el-row class="forumList-box" ref="echartsWrapper">
            <el-col :span="4" class="forumList">
                <el-tree :data="data"
                ref="tree"
                current-node-key
                node-key="id"
                :default-expanded-keys="[1]"
                :props="defaultProps"
                @node-click="handleNodeClick"
                ></el-tree>
            </el-col>
            <el-col :span="18" class="forumTab">
                <el-row>
                    <el-col :span="10">
                        <el-input v-model="query" placeholder="请输入内容"></el-input>
                    </el-col>
                    <el-col :span="10" style="marginLeft:20px">
                        <el-button v-if="id" type="primary" @click="queryClick">查询</el-button>
                    </el-col>
                </el-row>
                <el-row style="marginTop:20px">
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                        <el-table-column
                            prop="id"
                            type="index"
                            label="序号"
                            width="80"
                            align='center'
                            height="10">
                        </el-table-column>
                        <el-table-column
                            prop="paperTitle"
                            label="标题"
                            width="80"
                            align='center'
                            height="20px">
                        </el-table-column>
                        <el-table-column
                            prop="userId"
                            label="投稿人"
                            width="80"
                            align='center'
                            height="20px">
                        </el-table-column>
                        <el-table-column
                            prop="submitTypeName"
                            label="投稿方式"
                            width="180"
                            align='center'
                            height="20px">
                        </el-table-column>
                        <el-table-column
                            prop="themeName"
                            label="投稿主题"
                            width="180"
                            align='center'
                            height="20px">
                        </el-table-column>
                        <el-table-column
                            prop="lastSubmitTime"
                            label="最后提交时间"
                            width="180"
                            align='center'
                            height="20px">
                        </el-table-column>
                        <el-table-column
                            prop="isAudit"
                            label="审核状态"
                            align='center'
                            width="80"
                            height="20px">
                        </el-table-column>
                        <el-table-column
                        fixed="right"
                        align='center'
                        label="操作">
                        <template slot-scope="scope">
                            <el-button @click="distribution(scope.row)" v-if="scope.row.isDistribute == 0" ype="text" size="small">分发</el-button>
                            <el-button @click="reDistribution(scope.row)" v-if="scope.row.isDistribute == 1" type="text" size="small">重新分发</el-button>
                        </template>
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
        <el-dialog title="稿件分发" :visible.sync="dialogTableVisible">
            <el-select v-model="value" placeholder="请选择" @change="fnDisable">
                <el-option
                    v-for="item in options"
                    :key="item.groupId"
                    :label="item.groupName"
                    :value="item.groupId"
                    >
                </el-option>
            </el-select>
            <el-row type='flex' justify="center" align='middle'>
                <el-button type="primary" class="btn" :disabled='isdisabled' plain @click="distributionOk">分发</el-button>
            </el-row>
        </el-dialog>
    </div>  
</template>

<script>
export default {
    name: 'App',
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
        total:10,//总页数
        id:'', //论坛树id
        dialogTableVisible:false,//稿件分发弹窗
        options:[],//下拉数据
        value:'',//下拉选择内容
        paperId:'',//分发的稿件id
        isdisabled:true,
      };
    },
    created() {
        this.init();
    },
    mounted(){
        
    },
    methods: {
        init(){
            this.getList();
        },

        //获取数据
        async getList(){
            let params = {
                pageNum:this.size,
                pageSize:10,
                order:null,
                orderType:null,
                query:this.query
            }
            let {data}  = await this.$api.get("forum/tree/list");
            console.log("稿件分发列表树",data);
            this.data = data.data;//数据
        },


        async getRecordList(){
            let params = {
                pageNum:this.size,
                pageSize:10,
                order:null,
                orderType:null,
                forumId:this.id,
                query:this.query
            }
            let {data}  = await this.$api.get("paper/list",params)
            console.log("稿件分发记录列表",data);
            this.total = data.data.total;//总页数
            this.tableData = data.data.list;//数据
        },

        //列表树单击事件
        handleNodeClick(ev){
            if(ev.id){
                this.id = ev.id;
                this.getRecordList();
            }
        },

        //查询
        queryClick(){
            this.size = 1;
            this.getRecordList();
        },

        //分发
        async distribution(row){
            this.paperId = row.id;
            this.dialogTableVisible = true;
            let {data} = await this.$api.get("forum/mapping/list/"+this.id);
            console.log("论坛审稿分组列表-==-=-=-=",data);
            this.options = data.data;
        },

        //分发确定
        async distributionOk(){
            console.log(this.value);
            let url = this.paperId+'?groupId='+this.value;
            let {data}  = await this.$api.get("mail/paper/"+url);
            console.log("dtaa-=-=-==-",data);
            if(data.code) {
                this.getRecordList();
                this.$message({
                    message: '添加成功',
                    type: 'success'
                });
            }
            this.dialogTableVisible = false;
            this.getRecordList();
        },

        //重新分发
        reDistribution(row){
            console.log(row);
            this.paperId = row.id;
            this.distribution(row);
        },

        //分页查询
        handleSizeChange(val){
            console.log(`每页 ${val} 条1`);
        },

        //分页查询
        handleCurrentChange(val){
            console.log(`每页 ${val} 条2`);
            this.size = val;
            this.getList();
        },

        fnDisable(){
            if(this.value){
                this.isdisabled = false;
            }
        }
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
    .btn{
        margin-top:20px;
    }
</style>
