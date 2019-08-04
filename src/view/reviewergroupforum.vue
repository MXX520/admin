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
                        <el-button type="primary" v-if="id" @click="queryClick">查询</el-button>
                        <el-button type="primary" v-if="id" @click="addClick">添加审稿分组</el-button>
                    </el-col>
                </el-row>
                <el-row style="marginTop:20px">
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                        <el-table-column
                            type="index"
                            label="序号"
                            align='center'
                            width="80"
                            height="10">
                        </el-table-column>
                        <el-table-column
                            prop="groupName"
                            label="审稿分组名称"
                            align='center'
                            width="auto"
                            height="20px">
                        </el-table-column>
                        <el-table-column
                        fixed="right"
                        align='center'
                        width="auto"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button @click="delClick(scope.row)" type="text" size="small">删除</el-button>
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
        <el-dialog title="添加审稿分组" :visible.sync="dialogTableVisible">
            <el-table
                    ref="multipleTable"
                    :data="addTableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    align='center'
                    width="auto">
                </el-table-column>
                <el-table-column
                    type="index"
                    label="序号"
                    align='center'
                    width="auto">
                </el-table-column>
                <el-table-column
                    prop="groupName"
                    label="审稿分组名称"
                    align='center'
                    width="auto">
                </el-table-column>
            </el-table>
            <el-row type='flex' justify="center" align='middle'>
                <el-button class="btn" type="primary" plain @click="addGrouping">添加到分组</el-button>
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
        dialogTableVisible:false,//控制添加审稿分组弹窗的显示
        addTableData: [],//获取的审稿分组列表
        addTableDataOk:[],//已选择的审稿分组集合
        id:'',//树id
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

        async getList(){
            let {data}  = await this.$api.get("forum/tree/list");
            console.log("论坛审稿分组--树",data);
            this.data = data.data;
        },

        //获取数据
        async getRecordList(){
            let params = {
                pageNum:this.size,
                pageSize:10,
                order:null,
                orderType:null,
                forumId:this.id,
                query:this.query
            }
            let {data}  = await this.$api.get("forum/mapping/list",params);
            console.log("论坛审稿分组列表",data);
            this.total = data.data.total;//总页数
            console.log("this.total",this.total);
            this.tableData = data.data.list;//数据
        },

        //列表树单击事件
        handleNodeClick(ev){
            console.log(ev.id);
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

        //添加
        async addClick(){
          this.dialogTableVisible = true; 
          let {data} = await this.$api.get("reviewer/group/forum/tree/list/"+this.id);
          console.log("论坛审稿分组列表-==-=-=-=",data);
          this.addTableData = data.data;
          this.addTableData.forEach((item,index) => {
              if(item.isCheck){
                setTimeout(item=>{
                    this.toggleSelection(index);
                },0)
              }
          });
        },

        //添加到分组确认
        async addGrouping(){
            let arr = [];
            this.addTableDataOk.forEach( item => {
                arr.push(item.id);
            })
            console.log("确定添加审稿人id",arr);
            let {data}  = await this.$api.post("forum/mapping/"+this.id,arr);
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

        //删除
        delClick(row){
            this.$confirm('确定要将该审稿分组移出当前论坛？')
            .then(item => {
                console.log(item);
                this.delClickOk(row);
            })
            .catch(_ => {});
        },

        //删除确定
        async delClickOk(row){
            let {data}  = await this.$api.delete("forum/mapping/"+row.id);
            if(data.code) {
                this.getRecordList();
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
            }
        },


        //每次选择审稿人出发
        handleSelectionChange(row){
            console.log("选择审稿人",row);
            this.addTableDataOk = row;
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

        //设置默认选中
        toggleSelection(index) {
            this.$refs.multipleTable.toggleRowSelection(this.addTableData[index]);
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

    .btn{
        margin-top:20px;
    }
</style>
