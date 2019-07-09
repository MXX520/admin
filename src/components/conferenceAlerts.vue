<template>
    <div id="app">
        <el-row>
            <el-col :span="10">
                <el-input v-model="input" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="10" style="marginLeft:20px">
                <el-button type="primary">主要按钮</el-button>
                <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
            </el-col>
        </el-row>
        <el-row style="marginTop:20px">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                prop="date"
                label="日期"
                width="150">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="120">
                </el-table-column>
                <el-table-column
                prop="province"
                label="省份"
                width="120">
                </el-table-column>
                <el-table-column
                prop="city"
                label="市区"
                width="120">
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址"
                width="300">
                </el-table-column>
                <el-table-column
                prop="zip"
                label="邮编"
                width="120">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="活动名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="会议标题">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="会议简介">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="会议内容">
                    <el-input type='textarea' v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="会议来源">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
            dialogFormVisible:false,
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1517 弄',
                zip: 200333
            }, {
                date: '2016-05-01',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1519 弄',
                zip: 200333
            }, {
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1516 弄',
                zip: 200333
            }],
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
        }
    },
    created() {
        this.init();
    },
    methods: {
        init(){

        },
        handleClick(row) {
            console.log(row);
        }
    },
    components: {

    }
}
</script>

<style scoped lang="less">

</style>
