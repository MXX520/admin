<template>
    <el-container class="container">
        <el-header class="header">Header</el-header>
        <el-container class="container">
            <el-aside class="aside">
                <el-menu>
                    <el-submenu v-for="(item,index) in dataList" :index="index+''" :key="index">
                        <template slot="title"><i class="el-icon-message"></i>{{item.name}}</template>
                            <el-menu-item v-for="(item2,index2) in item.childrenList" :key="index2">
                                <router-link :to='{path:item2.url}'>{{item2.name}}</router-link>
                            </el-menu-item>
                        </el-submenu>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main class="main">
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    name: 'Index',
    data () {
        const item = {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        };
        return {
            tableData: Array(20).fill(item),
            dataList : [],
            // dataList : [
            //     {
            //         "isopen": 1,
            //         "code": "forum",
            //         "pcode": "0",
            //         "icon": "",
            //         "tips": "",
            //         "url": "#",
            //         "pcodes": "[0],",
            //         "name": "论坛管理",
            //         "id": 7,
            //         "childrenList": [
            //             {
            //             "isopen": 0,
            //             "code": "forum_audit",
            //             "pcodes": " [0],[forum],",
            //             "pcode": "forum",
            //             "icon": "",
            //             "name": "论坛审核",
            //             "id": 8,
            //             "ismenu": 0,
            //             "levels": 2,
            //             "tips": "",
            //             "url": "/forum/audit",
            //             "status": 1
            //             }
            //         ],
            //         "ismenu": 1,
            //         "levels": 1,
            //         "status": 1
            //         },
            //         {
            //         "isopen": 0,
            //         "code": "system",
            //         "pcode": "0",
            //         "icon": "fa-user",
            //         "tips": "",
            //         "url": "#",
            //         "pcodes": "[0],",
            //         "name": "系统管理",
            //         "id": 1,
            //         "childrenList": [
            //             {
            //             "isopen": 0,
            //             "code": "user",
            //             "pcodes": "[0],[system],",
            //             "pcode": "system",
            //             "icon": "",
            //             "name": "用户管理",
            //             "id": 2,
            //             "ismenu": 0,
            //             "levels": 2,
            //             "tips": "",
            //             "url": "/sys/user",
            //             "status": 1
            //             },
            //             {
            //             "isopen": 0,
            //             "code": "faculty",
            //             "pcodes": "[0],[system],",
            //             "pcode": "system",
            //             "icon": "",
            //             "name": "院系管理",
            //             "id": 3,
            //             "ismenu": 0,
            //             "levels": 2,
            //             "tips": "",
            //             "url": "/sys/faculty",
            //             "status": 1
            //             },
            //             {
            //             "isopen": 0,
            //             "code": "carousel",
            //             "pcodes": "[0],[system],",
            //             "pcode": "system",
            //             "icon": "",
            //             "name": "轮播管理",
            //             "id": 4,
            //             "ismenu": 0,
            //             "levels": 2,
            //             "tips": "",
            //             "url": "/sys/carousel",
            //             "status": 1
            //             },
            //             {
            //             "isopen": 0,
            //             "code": "cooperate",
            //             "pcodes": "[0],[system],",
            //             "pcode": "system",
            //             "icon": "",
            //             "name": "合作品牌管理",
            //             "id": 5,
            //             "ismenu": 0,
            //             "levels": 2,
            //             "tips": "",
            //             "url": "/sys/cooperate",
            //             "status": 1
            //             },
            //             {
            //             "isopen": 0,
            //             "code": "log",
            //             "pcodes": "[0],[system],",
            //             "pcode": "system",
            //             "icon": "",
            //             "name": "异常日志",
            //             "id": 6,
            //             "ismenu": 0,
            //             "levels": 2,
            //             "tips": "",
            //             "url": "/sys/log",
            //             "status": 1
            //             }
            //         ],
            //         "ismenu": 1,
            //         "levels": 1,
            //         "status": 1
            //     }
            // ]
        }
    },
    created() {
        this.init();
        this.dataList = JSON.parse(localStorage.getItem('menus'));
        // var result = $.parseJSON(jsonData);// 转成JSON对象
        console.log(JSON.parse(localStorage.getItem('menus')));
    },
    methods: {
        async init(){
            console.log(this.$api.post);
            
        }
    },
    components: {

    }
}
</script>

<style scoped lang="scss">

.container{
    height:100%;
    width:100%;
    overflow:hidden;
    .header{
        height:80px !important;
        background:#5812c4;
        text-align:center;
    }
    .aside{
        width:200px !important;
        background:#eef1f6;
    }
    .main{
        padding:20px;
    }

}
</style>
