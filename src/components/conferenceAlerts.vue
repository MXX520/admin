<template>
    <div id="app">
        <el-row>
            <el-col :span="10">
                <el-input v-model="input" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="10" style="marginLeft:20px">
                <el-button type="primary">主要按钮</el-button>
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
                    label="序号"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="会议标题"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="briefIntroduction"
                    label="会议简介"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="source"
                    label="会议来源"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="viewCount"
                    label="浏览次数"
                    width="300">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    width="120">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="detailClick(scope.row)" type="text" size="small">详情</el-button>
                    <el-button type="text" size="small" @click="editorClick(scope.row)">编辑</el-button>
                </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="序号">
                    <el-input v-model="form.id"></el-input>
                </el-form-item>
                <el-form-item label="会议标题">
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="会议简介">
                    <el-input v-model="form.briefIntroduction" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="会议来源">
                    <el-input v-model="form.source" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="浏览次数">
                    <el-input v-model="form.viewCount" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-input v-model="form.createTime" autocomplete="off"></el-input>
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
            tableData: [{
                "createTime":"2019-06-09 11:39:07",//创建时间
                "briefIntroduction":"张京顺老师针对发言人的报告和讨论内容进行点评，他认为从宏大的教育科技主题中寻找细节是比较困难的，建议同学们在相关研究中从小到大，点滴积累形成架构。在“跨文化教育与社会流动”的圆桌环节，同学们分别就公民教育、性别问题、工程教育、学术领导力问题进行讨论。",//会议简介
                "id":3,//主键
                "source":"清华大学网站",//来源
                "viewCount":23,//浏览次数
                "title":"老师发言1",//标题
                "content":"",//内容
                "forumId":7//论坛id
            }],
            form: {},
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
            let {data}  = await this.$api.get("/forum/express/list/"+this.id)
            console.log("会议快讯333",data);
            this.postDate = {...data.data};
        },
        
        //详情
        detailClick(row) {
            console.log(row);
            this.form = row;
            this.isBtn = false;
            this.dialogFormVisible = true;
        },

        //编辑
        editorClick(row){
            console.log(row);
            this.form = row;
            this.isSave = true;
            this.isBtn = true;
            this.dialogFormVisible = true;
        },

        //修改
        async modifyClick(){
            let data = await this.$api.post("/forum/express/"+this.id,this.form)
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
        }
    },
    components: {

    }
}
</script>

<style scoped lang="less">

</style>
