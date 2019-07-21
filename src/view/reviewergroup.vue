<template>
    <div id="app">
        <el-row>
            <el-col :span="10">
                <el-input v-model="query" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="10" style="marginLeft:20px">
                <el-button type="primary" @click="queryClick">查询</el-button>
                <el-button type="primary" @click="addClick">添加审稿分组</el-button>
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
                    <el-button type="text" size="small" @click="editorClick(scope.row)">修改</el-button>
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
       <!-- 弹窗 -->
        <el-dialog :title="titleDig+'审稿分组'" :visible.sync="dialogFormVisible">
            <el-form>
                <el-form-item label="分组名称" :label-width="formLabelWidth">
                <el-input v-model="nameDig" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelClick">取 消</el-button>
                <el-button type="primary" @click="okClick">确 定</el-button>
            </div>
        </el-dialog>
    </div>  
</template>

<script>
export default {
    name: 'App',
    data () {
        return {
            msg: 3333222,
            titleDig:"",//弹窗标题
            query:'',//查询条件
            total:10,//列表总条数
            size:1,//当前页,
            tableData: [],//数据集合
            formLabelWidth: '120px',//分组名称宽度
            nameDig:'', //编辑表单
            dialogFormVisible:false,//控制弹窗隐藏与显示
            resId: '',//修改用的id
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
            let params = {
                pageNum:this.size,
                pageSize:10,
                order:null,
                orderType:null,
                query:this.query
            }
            let {data}  = await this.$api.get("reviewer/group/list",params)
            console.log("审稿分组列表",data);
            this.total = data.data.total;//总页数
            console.log("this.total",this.total);
            this.tableData = data.data.list;//数据
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

        async delClickOk(row){
            let {data}  = await this.$api.delete("reviewer/group/"+row.id);
            if(data.code) {
                this.getList();
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
            }
        },

        //修改
        editorClick(row){
            this.titleDig = '修改';
            this.dialogFormVisible = true;
            this.nameDig = row.groupName;
            this.resId = row.id;
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

        //取消dig
        cancelClick(){
            this.dialogFormVisible = false;
        },

        //确定dig
        async okClick(){
            this.dialogFormVisible = false;
            
            let params = {
                groupName:this.nameDig
            }
            let apiPath;
            if(this.titleDig == "新增"){
                apiPath = await this.$api.post("reviewer/group",params);
            }else {
                apiPath = await this.$api.put("reviewer/group/"+this.resId,params);
            }
            let {data}  = apiPath;
            console.log("data",data);
            if(data.code){
                this.getList();
                this.$message({
                    message: this.titleDig+'成功',
                    type: 'success'
                });
            }
        }
    },
    components: {

    }
}
</script>

<style scoped lang="less">

</style>
