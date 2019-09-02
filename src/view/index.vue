<template>
    <el-container class="container">
        <el-header class="header">
            <el-col :span="10" class="logo" collapse-transition @click.prevent="homePage" :style="{width: isCollapse?'65px':'200px'}">
				{{isCollapse ? '' : sysName }}
			</el-col>
			<el-col :span="10">
				<div class="tools" @click="handleCollapse">
					<i v-if="isCollapse" class="el-icon-s-unfold"></i>
					<i v-else class="el-icon-s-fold"></i>
				</div>
			</el-col>
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item><router-link to="/person">个人中心</router-link></el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
        </el-header>
        <el-container class="container">
            <el-aside class="aside" :style="{width: isCollapse?'65px':'200px'}">
                <el-menu :collapse-transition='false' default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                    <el-submenu v-for="(item,index) in dataList" :index="index+''" :key="index">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title" v-if="!isCollapse">{{item.name}}</span>
                        </template>
                        <el-menu-item-group>
                            <router-link v-for="(item2,index2) in item.childrenList" :key="index2":to='{path:"/"+item2.code}'>
                                <el-menu-item >
                                    {{item2.name}}
                                </el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main class="main">
                <el-breadcrumb separator="/" class="navigation">
                    <el-breadcrumb-item class="navigationItem" style="font-weight:700;" :to="{ path: matched.path }">{{matched.name}}</el-breadcrumb-item>
                </el-breadcrumb>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    name: 'Index',
    data () {
        return {
            dataList : [],
            collapsed:false,
            sysName:'清华大学博士生论坛管理系统',
            sysUserAvatar:this.$store.getters.getImg,
            sysUserName: '',
            matched:'', //面包屑
            isCollapse:false, //收缩展开
        }
    },
    created() {
        this.init();
        this.getBreadcrumb();
        this.dataList = JSON.parse(localStorage.getItem('menus'));
        // var result = $.parseJSON(jsonData);// 转成JSON对象
        console.log('头像--',this.$store.getters.getImg);
        console.log("-=-=-=-==-=this.$util",this.$util)
        this.$util.log("-=-=-=-==")

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
        },
        getBreadcrumb() {
            this.matched = this.$route;
            console.log("this.matched====",this.matched);
            // const first = matched[0]
            // if (first && first.name !== '首页') {
            //     matched = [{path: '/home', meta: { title: '首页' }}].concat(matched)
            // }
            // this.levelList = matched;
        },
        homePage(){
            console.log("ddd");
            this.$router.push({path: '/'});
        },

        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },

        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handleCollapse(){
            this.isCollapse = !this.isCollapse;
        }
    },
    components: {

    },
    mounted() {
        this.getBreadcrumb();
    },
    watch: {
        $route(to, from) {
        this.getBreadcrumb();
        }
    }
}
</script>

<style scoped lang="scss">
/deep/ a{
    text-decoration:none;
}
/deep/ .el-menu-vertical-demo{
    height:100%;
}
/deep/ .el-menu-item{
    text-align:left;
}
/deep/ .el-menu-item-group>ul{
    background: #eef1f6;
}
/deep/ .navigationItem{
    margin-bottom:20px;
    span{
        font-weight:700!important;
    }
    
}
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
            // width:200px !important;
            height:60px;
            font-size: 16px;
            padding-left:20px;
            padding-right:20px;
            border-color: rgba(238,241,146,0.3);
            border-right-width: 1px;
            border-right-style: solid;
            cursor:pointer;
            img {
                width: 40px;
                float: left;
                // margin: 10px 10px 10px 18px;
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
            font-size:30px;
            height: 60px;
            line-height: 60px;
            cursor: pointer;
        }
    }
    .aside{
        background:#FFF;
    }
    .logo-collapse-width{
        width:60px
    }
    .logo-width{
        width:230px;
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
