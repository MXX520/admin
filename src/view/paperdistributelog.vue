<template>
    <div id="app">
        <el-row class="forumList-box" ref="echartsWrapper">
            <el-col :span="4" class="forumList">
                <el-tree :data="data"
                ref="tree"
                show-checkbox
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
                        <el-button type="primary" @click="queryClick">查询</el-button>
                        <el-button type="primary" @click="addClick">添加审稿人</el-button>
                    </el-col>
                </el-row>
                <el-row style="marginTop:20px">
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                        <el-table-column
                            prop="id"
                            label="序号"
                            height="10">
                        </el-table-column>
                        <el-table-column
                            prop="groupName"
                            label="审稿分组名称"
                            height="20px">
                        </el-table-column>
                        <el-table-column
                        fixed="right"
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
            let {data}  = await this.$api.get("reviewer/group/list",params);
            console.log("审稿人分组列表",data);
            this.total = data.data.total;//总页数
            console.log("this.total",this.total);
            this.data = data.data.list;//数据
        },

        //列表树单击事件
        handleNodeClick(ev){
            console.log(ev.id);
        },

        //查询
        queryClick(){
            this.size = 1;
            this.getList();
        },

        //添加
        addClick(){
            this.titleDig = '新增';
            this.dialogFormVisible = true;
            this.nameDig = '';
        },

        //删除
        delClick(row){
            this.$confirm('确定删除该审稿分组？')
            .then(item => {
                console.log(item);
                this.delClickOk(row);
            })
            .catch(_ => {});
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
