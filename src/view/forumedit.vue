<template>
    <div id="app">
        <el-row>
            <el-col :span="6">
                <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </el-col>
            <el-col :span="18">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="院系首页" name="first">
                        <departmentHomepage></departmentHomepage>
                    </el-tab-pane>
                    <el-tab-pane label="会议快讯" name="second">
                        <conferenceAlerts></conferenceAlerts>
                    </el-tab-pane>
                    <el-tab-pane label="征文通知" name="third">
                        <essayNotice></essayNotice>
                    </el-tab-pane>
                    <el-tab-pane label="联系我们" name="fourth">
                        <contactUs></contactUs>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
        <el-row v-show="showMask" class="show-home-box" type="flex" justify="center" align="middle">
            <div class="show-home">
                <showHome></showHome>
                <i class="el-icon-close" @click="hideMask"></i>
            </div>
        </el-row>
    </div>  
</template>

<script>
import departmentHomepage from '../components/departmentHomepage'
import conferenceAlerts from '../components/conferenceAlerts'
import essayNotice from '../components/essayNotice'
import contactUs from '../components/contactUs'
import showHome from '../components/dialogShowHome'
export default {
    name: 'App',
    data() {
      return {
        data: [{
          label: '一级 汇顶科技阿1',
          children: [{
            label: '二级 1-1'
          },{
            label: '二级 1-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        showMask: false,
        activeName:'first',//默认tab页
      };
    },
    created() {
        this.initEvt();
    },
    methods: {
        handleNodeClick(){

        },

        handleClick() {

        },

        //定义广播事件
        initEvt(){
            this.$eventHub.$on('mxx', (item)=>{
                console.log(item);
                this.showMask = true;
            });
        },

        //关闭弹出层
        hideMask() {
            this.showMask = false;
        },
    },
    components: {
        departmentHomepage,
        conferenceAlerts, //会议快讯
        essayNotice,
        contactUs,
        showHome

    }
}
</script>

<style scoped lang="less">
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
            .el-icon-close{
                font-size:60px;
                font-weight:700;
                color:#fff;
                position:absolute;
                right:-60px;
                top:-60px;
                cursor:pointer;
            }
        }
    }
</style>
