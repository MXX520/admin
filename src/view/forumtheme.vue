<template>
    <div id="app">
        <el-row class="forumList-box" ref="echartsWrapper">
            <el-col :span="4" class="forumList">
                <el-tree :data="data"
                ref="tree"
                accordion
                :current-node-key = currentNodekey
                node-key="id"
                :default-expanded-keys="[1]"
                :props="defaultProps"
                :default-expand-all="true"
                @node-click="handleNodeClick"
                :expand-on-click-node="false"
                ></el-tree>
            </el-col>
            <el-col :span="18" class="forumTab">
                <el-row>
                    <el-col :span="10">
                        <el-input v-model="query" placeholder="请输入内容"></el-input>
                    </el-col>
                    <el-col :span="10" style="marginLeft:20px">
                        <el-button v-if="id" type="primary" @click="queryClick">查询</el-button>
                        <el-button type="primary" v-if="id" @click="addClick">新增</el-button>
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
                            align='center'
                            width="80"
                            height="10">
                        </el-table-column>
                        <el-table-column
                            prop="themeName"
                            align='center'
                            width="auto"
                            label="论坛主题名称（中文）"
                            height="20px">
                        </el-table-column>
                        <el-table-column
                            prop="themeNameEn"
                            align='center'
                            width="auto"
                            label="论坛主题名称（英文）"
                            height="20px">
                        </el-table-column>
                        
                        <el-table-column
                        fixed="right"
                        align='center'
                        label="操作">
                        <template slot-scope="scope">
                            <el-button @click="changeClick(scope.row)" type="text" size="small">修改</el-button>
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
        <el-dialog title="新增论坛主题" :visible.sync="dialogTableVisible">
            <el-form  label-width="120px"  ref="addForm">
             <el-form-item label="中文主题名称">
					<el-input v-model="chinaName" ></el-input>
			</el-form-item>
             <el-form-item label="英文主题名称">
					<el-input v-model="englishName" ></el-input>
			</el-form-item>
            </el-form>
            <el-row type='flex' justify="center" align='middle'>
                <el-button type="primary" class="btn"  plain @click="addGrouping">新增</el-button>
            </el-row>

        </el-dialog>
         <el-dialog title="修改论坛主题" :visible.sync="changTitle">
            <el-form  label-width="120px"  ref="addForm">
             <el-form-item label="中文主题名称">
					<el-input v-model="chinaName" ></el-input>
			</el-form-item>
             <el-form-item label="英文主题名称">
					<el-input v-model="englishName" ></el-input>
			</el-form-item>
            </el-form>
            <el-row type='flex' justify="center" align='middle'>
                <el-button type="primary" class="btn"  plain @click="changeGrouping">修改</el-button>
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
        chinaName:"",
        changTitle:false,
        englishName:"",
        showMask: false,
        activeName:'first',//默认tab页
        query:'',//搜索内容
        tableData:[],//数据集合
        size:1,//当前页
        total:10,//总页数
        dialogTableVisible:false,//控制添加审稿人弹窗的显示
        addTableData: [],//获取的审稿人列表
        addTableDataOk:[],//已选择的审稿人集合
        id:'',//树id
        currentNodekey:'2',//树结构默认选中的key
        editId:0,
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
        changeClick(row){
            console.log(row)
            this.changTitle = true;
            this.chinaName = row.themeName;
            this.englishName = row.themeNameEn;
            this.editId = row.id;
        },
        async getList(){
            let {data}  = await this.$api.get("forum/tree/list");
            console.log("审稿人分组--树",data);
            console.log("审稿人分组--树",JSON.stringify(data));
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
            let {data}  = await this.$api.get("forum/theme/list",params);
            console.log("审稿人分组列表",data);
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
          this.chinaName = "";
          this.englishName = ""
          this.dialogTableVisible = true; 
          
        },

        //添加到分组确认
        async addGrouping(){
            let arr = [];
            this.addTableDataOk.forEach( item => {
                arr.push(item.id);
            })
           
            let {data}  = await this.$api.post("/forum/theme",{
                forumId:this.id,
                themeName:this.chinaName,
                themeNameEn:this.englishName
            });
            if(data.code=="01") {
                this.getRecordList();
                this.$message({
                    message: '添加成功',
                    type: 'success'
                });
                this.dialogTableVisible = false;
            }else{
                this.$message.error(data.msg);
            }
            
            this.getRecordList();
        },
       async changeGrouping(){
             let {data}  = await this.$api.put("/forum/theme/"+this.editId,{
                forumId:this.id,
                themeName:this.chinaName,
                themeNameEn:this.englishName
            });
            if(data.code=="01") {
                this.getRecordList();
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
                 this.changTitle = false;
            }else{
                 this.$message.error(data.msg);
            }
           
            this.getRecordList();
        },
        //删除
        delClick(row){
            this.$confirm('确定要删除该主题？')
            .then(item => {
                console.log(item);
                this.delClickOk(row);
            })
            .catch(_ => {});
        },

        //删除确定
        async delClickOk(row){
            let {data}  = await this.$api.delete("/forum/theme/"+row.id);
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
