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
                    prop="id"
                    type="index"
                    label="序号"
                    height="10"
                    align='center'
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="会议标题"
                    height="20px"
                    align='center'
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="briefIntroduction"
                    label="会议简介"
                    align='center'
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="source"
                    label="会议来源"
                    align='center'
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="viewCount"
                    align='center'
                    label="浏览次数"
                    width="300">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    align='center'
                    width="120">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                align='center'
                width="100">
                <template slot-scope="scope">
                    <el-button @click="detailClick(scope.row)" type="text" size="small">详情</el-button>
                    <el-button type="text" size="small" @click="editorClick(scope.row)">编辑</el-button>
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
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form label-width="80px">
                <el-form-item label="会议标题">
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="会议简介">
                    <el-input v-model="form.briefIntroduction" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="会议内容">
                    <el-input v-model="form.content" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="会议来源">
                    <el-input v-model="form.source" autocomplete="off"></el-input>
                </el-form-item>
            </el-form> 
            <div slot="footer" class="dialog-footer" v-if="isBtn">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" v-show="isSave" @click="modifyClick">更新</el-button>
                <el-button type="primary" v-show="!isSave" @click="saveClick">保存</el-button>
            </div>
        </el-dialog>
        
    </div>  
</template>

<script>
export default {
    name: 'conferenceAlerts',
    data () {
        return {
            msg: '会议快讯333',
            input:'',
            id:'6',
            isSave:false,//是否显示报错按钮或者更新按钮
            isBtn:false,//是否显示弹出窗操作按钮
            dialogFormVisible:false,
            tableData: [],
            currentPage: 4,//第几页
            total:10,//总页数
            pageSize:10,//每次请求页数
            size:1,//当前页面
            isPagin:false,
            query:'',//查询字段
            form: {
                forumId: '',
                id: '',
                title: '',
                content:'',
                briefIntroduction: '',
                source: '',
                viewCount: '',
                createTime: ''
            },
        }
    },
    created() {
        this.initEvt();
        console.log("---------看看单击执行2");
    },
    methods: {
        initEvt(){
            this.$eventHub.$on(this.$consts.Event.FORUMEDIT, (item)=>{
                console.log("------2",item);
                this.id = item;
                this.getList();
            });
        },
        async getList(){
            let params = {
                pageNum:this.size,
                pageSize:10,
                order:null,
                orderType:null,
                forumId:this.id,
                query:this.query
            }
            let {data}  = await this.$api.get("/forum/express/list",params)
            console.log("会议快讯333",data);
            this.total = data.data.total;//总页数
            this.isPagin = true;
            console.log("this.total",this.total);
            this.tableData = data.data.list;//数据
        },
        
        //详情
        async detailClick(row) {
            console.log(row);
            let {data}  = await this.$api.get("/forum/express/"+row.id);
            console.log("会议快讯详情-",data);
            this.form = data.data;
            this.isBtn = false;
            this.dialogFormVisible = true;
        },

        //编辑
        async editorClick(row){
            console.log(row);
            let {data}  = await this.$api.get("/forum/express/"+row.id);
            this.form = data.data;
            this.isSave = true;
            this.isBtn = true;
            this.dialogFormVisible = true;
        },

        //修改
        async modifyClick(){
            let params = {
                title:this.form.title,
                briefIntroduction:this.form.briefIntroduction,
                content:this.form.briefIntroduction,
                source:this.form.briefIntroduction
            }

            console.log("修改1",params);
            console.log("修改1",this.id);
            let data = await this.$api.put("forum/express/"+this.id,params)
            this.dialogFormVisible = false;
            this.getList();
            if(data.data.code){
                this.$message({
                message: '修改成功',
                type: 'success'
                });
            }
        },

        //新增
        addClick(){
            this.dialogFormVisible = true;
            this.isBtn = true;
            this.isSave = false;
            this.form = [];
        },

        //保存
        async saveClick(){
            let postData = {
                forumId: this.id,
                title: this.form.title,
                briefIntroduction: this.form.briefIntroduction,
                source: this.form.source,
            };
            console.log(postData);
            let data = await this.$api.post("/forum/express",postData);
            this.dialogFormVisible = false;
            this.getList();
            if(data.data.code){
                this.$message({
                    message: '新增成功',
                    type: 'success'
                });
            }
        },

        //查询
        queryClick(){
            this.size = 1;
            this.getList();
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    },
    components: {

    }
}
</script>

<style scoped lang="less">
    /deep/ .cell{
        max-height: 20px !important;
        overflow: auto !important;
    }
    .pagin{
        margin-top:20px;
    }
    
</style>
