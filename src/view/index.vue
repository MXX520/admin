<template>
    <el-container class="container">
        <el-header class="header">
            <el-col :span="6" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				{{collapsed?'':sysName}}
			</el-col>
			<el-col :span="10">
				<div class="tools" @click.prevent="collapse">
					<i class="fa fa-align-justify"></i>
				</div>
			</el-col>
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>个人中心</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
        </el-header>
        <el-container class="container">
            <el-aside class="aside">
                <el-menu>
                    <el-submenu v-for="(item,index) in dataList" :index="index+''" :key="index">
                        <template slot="title"><i class="el-icon-message"></i>{{item.name}}</template>
                            <router-link v-for="(item2,index2) in item.childrenList" :key="index2":to='{path:"/"+item2.code}'>
                            <el-menu-item >
                                {{item2.name}}
                            </el-menu-item>
                            </router-link>
                            
                            
                            
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
            collapsed:false,
            sysName:'VUEADMIN',
            sysUserAvatar:this.$store.getters.getImg,
            sysUserName: '',
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
        console.log('头像--',this.$store.getters.getImg);
    },
    methods: {
        async init(){
            console.log(this.$api.post);
            
        },
        logout(){
            console.log("退出登录");
            localStorage.removeItem('menus');
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            this.$router.push({path: '/login'});
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
    .header {
        padding:0;
        height: 60px;
        line-height: 60px;
        background: #409EFF;
        color:#fff;
        .userinfo {
            text-align: right;
            padding-right: 35px;
            float: right;
            .userinfo-inner {
                cursor: pointer;
                color:#fff;
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 20px;
                    margin: 10px 0px 10px 10px;
                    float: right;
                }
            }
        }
        .logo {
            width:200px !important;
            height:60px;
            font-size: 22px;
            padding-left:20px;
            padding-right:20px;
            border-color: rgba(238,241,146,0.3);
            border-right-width: 1px;
            border-right-style: solid;
            img {
                width: 40px;
                float: left;
                margin: 10px 10px 10px 18px;
            }
            .txt {
                color:#fff;
            }
        }
        .logo-width{
            width:230px;
        }
        .logo-collapse-width{
            width:60px
        }
        .tools{
            padding: 0px 23px;
            width:14px;
            height: 60px;
            line-height: 60px;
            cursor: pointer;
        }
    }
    .aside{
        width:200px !important;
        background:#eef1f6;
    }
    .logo-collapse-width{
        width:60px
    }
    .logo-width{
        width:230px;
    }
    a{
        text-decoration:none;
    }
    .router-link-exact-active {
        display:inline-block;
        background:tan;
        .el-menu-item{
            background:#409EFF;
            color:#fff;
        }
    }

}
</style>
