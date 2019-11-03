<template>
    <div id="app">
        <el-row>
            <el-col :span="10">
                <el-input v-model="query" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="10" style="marginLeft:20px">
                <el-button type="primary" @click="queryClick">查询</el-button>
                <el-button type="primary" @click="addClick">新增</el-button>
            </el-col>
        </el-row>
        <el-row style="marginTop:20px">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                    prop="num"
                    label="序号"
                    align='center'
                    width="80"
                    height="10">
                </el-table-column>
                <el-table-column
                    prop="userName"
                    align='center'
                    width="auto"
                    label="用户名称"
                    height="20px">
                </el-table-column>
                <el-table-column
                    prop="email"
                    align='center'
                    width="250px"
                    label="邮箱"
                    height="20px">
                </el-table-column>
                <el-table-column
                    prop="phone"
                    align='center'
                    width="auto"
                    label="电话"
                    height="20px">
                </el-table-column>
                <el-table-column
                    prop="facultyName"
                    align='center'
                    width="auto"
                    label="所属院系"
                    height="20px">
                </el-table-column>
                <el-table-column
                    prop="statusName"
                    align='center'
                    width="auto"
                    label="用户状态"
                    height="20px">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    align='center'
                    width="200px"
                    label="创建时间"
                    height="20px">
                </el-table-column>
                <el-table-column
                fixed
                fixed="right"
                align='center'
                width="auto"
                label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editorClick(scope.row)">修改</el-button>
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
       <!-- 弹窗 -->
        <el-dialog :title="titleDig+'审稿人'" :visible.sync="dialogFormVisible">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="用户名称" :label-width="formLabelWidth">
                    <el-input v-model="updateItem.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="updateItem.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="updateItem.passWord" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="updateItem.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属院系" :label-width="formLabelWidth">
                    <el-select v-model="updateItem.facultyId" placeholder="请选择">
                        <el-option
                            v-for="item in schoolList"
                            :key="item.id"
                            :label="item.facultyName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户状态" :label-width="formLabelWidth">
                    <el-select v-model="updateItem.status" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelClick">取 消</el-button>
                <el-button type="primary" @click="okClick">{{titleDig == '新增' ? '新增' : '更新'}}</el-button>
            </div>
        </el-dialog>
    </div>  
</template>

<script>
import util from '@/api/utils'
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
            formLabelWidth: '80px',//分组名称宽度
            nameDig:'', //编辑表单
            dialogFormVisible:false,//控制弹窗隐藏与显示
            resId: '',//修改用的id
            options: [{
                value: 1,
                label: '启用'
            }, {
                value: 2,
                label: '冻结'
            }, {
                value: 3,
                label: '删除'
            }],
            value: '',
            formInline: {
                user: '',
                region: ''
            },
            updateItem:[],// 修改与新增
            schoolList: [],//所属院系
        }
    },
    created() {
        this.init();
    },
    methods: {
        init(){
            this.getList();
            this.getSList();
        },

        async getList(){
            let params = {
                pageNum:this.size,
                pageSize:10,
                query:this.query
            }
            let {data}  = await this.$api.get("reviewer/list",params)
            console.log("新增审稿人",data);
            this.total = data.data.total;//总页数
            console.log("this.total",this.total);
            this.tableData = data.data.list;//数据
            this.tableData.forEach((item,index) => {
                item.num = util.number(this.size)[index];
            })
        },

        //所属院系
        async getSList(){
            let {data} = await this.$api.get("faculty/list/all",{
            })
            this.schoolList = data.data;
        },

        //查询
        queryClick(){
            this.size = 1;
            this.getList();
        },

        //添加
        addClick(){
            this.updateItem = []
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
            let {data}  = await this.$api.delete("reviewer/"+row.id);
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
            this.updateItem = row;
            console.log(this.updateItem)
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
                userName: this.updateItem.userName,
                email: this.updateItem.email,
                passWord:this.updateItem.passWord,
                phone: this.updateItem.phone,
                status: this.updateItem.status,
                facultyId:this.updateItem.facultyId
            }
            let apiPath;
            if(this.titleDig == "新增"){
                apiPath = await this.$api.post("reviewer",params);
            }else {
                apiPath = await this.$api.put("reviewer/"+this.resId,params);
            }
            let {data}  = apiPath;
            console.log("data",data);
            if(data.code == "01"){
                this.getList();
                this.$message({
                    message: this.titleDig+'成功',
                    type: 'success'
                });
            }else{
                this.$message.error(data.msg);
            }
        }
    },
    components: {

    }
}
</script>

<style scoped lang="less">

</style>
