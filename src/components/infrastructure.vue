<template>
    <div id="app">
        <el-row style="marginTop:20px">
            <el-form ref="form" :model="tableData" label-width="180px">
                <el-form-item label="评分标准">
                    <el-radio-group v-model="tableData.scale_of_mark">
                        <el-radio :label="0" :disabled="isUpdate">通过制</el-radio>
                        <el-radio :label="1" :disabled="isUpdate">评分制</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否显示会议快讯">
                    <el-switch
                        v-model="value"
                        :disabled="isUpdate"
                        active-text="是"
                        inactive-text="否">
                    </el-switch>
                </el-form-item>
                <el-form-item label="是否显示征文通知">
                    <el-switch
                        v-model="value2"
                        :disabled="isUpdate"
                        active-text="是"
                        inactive-text="否">
                    </el-switch>
                </el-form-item>
                <el-form-item label="投稿方式（多选）">
                    <el-checkbox-group v-model="checkList.list" @change="handleCheckedCitiesChange">
                        <el-checkbox 
                        v-for="(item,index) in tableData.paper_submit_type_list"
                        :disabled="isUpdate"
                        :index="index"
                        :label="item.typeName"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row :gutter="20" type="flex" align="center" justify="center">
            <el-button type="primary" @click="isUpdate = false" v-if="isUpdate">修改</el-button>
            <el-button type="primary" @click="saveClick" v-else>保存</el-button>
        </el-row>
    </div>  
</template>

<script>
export default {
    name: 'conferenceAlerts',
    data () {
        return {
            msg: '基本设置',
            id:'',
            tableData: [],
            checkList: {id:[],list:[]},
            isUpdate:true,
            value: true,
            value2 : true
        }
    },
    created() {
        this.initEvt();
    },
    methods: {
        initEvt(){
            this.$eventHub.$on(this.$consts.Event.FORUMEDIT, (item)=>{
                console.log("基础设置");
                this.id = item;
                this.getList();
            });
        },
        async getList(){
            let params = {
            }
            this.checkList={id:[],list:[]},
            console.log("params",params)
            let {data}  = await this.$api.get("forum/config/"+this.id,params)
            this.tableData = data.data;//数据
            this.value = this.tableData.express_is_view ==  1 ? true : false;
            this.value2 = this.tableData.notice_is_view ==  1 ? true : false;
            this.tableData.paper_submit_type_list.forEach(item => {
                if(item.isCheck){
                    this.checkList.list.push(item.typeName)
                }
                this.checkList.id.push(item.id);
            });
            console.log("基础设置数据",this.tableData);
            console.log("基础设置数据多选",this.checkList);
        },

        //保存
        async saveClick(){
            let arr = [];
            this.checkList.list.forEach(item => {
                this.tableData.paper_submit_type_list.forEach(items=>{
                    if(item == items.typeName){
                        arr.push(items.id)
                    }
                })
            })
            let postData = {
                scaleOfMark: this.tableData.scale_of_mark,
                expressIsView: this.value ? true : false,
                noticeIsView: this.value2 ? true : false,
                submitTypeIds: arr,
            };
            let data = await this.$api.put("forum/config/"+this.id,postData);
            this.getList();
            if(data.data.code){
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });
                this.getList();
                this.isUpdate = true;
            }
        },

        // 多选
        handleCheckedCitiesChange(value){
            this.checkList.list = value;
            console.log(this.checkList.list)
        }
    },
    components: {

    }
}
</script>

<style scoped lang="less">
    /deep/ .el-table__row{
        height: 25px !important;
    }
    /deep/ .cell{
        height: 25px !important;
    }
    .pagin{
        margin-top:20px;
    }
    
</style>
