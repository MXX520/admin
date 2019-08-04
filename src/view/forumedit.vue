<template>
    <div id="app">
        <el-row class="forumList-box" ref="echartsWrapper">
            <el-col :span="4" class="forumList">
                <el-tree :data="data"
                ref="tree"
                current-node-key
                node-key="id"
                :default-expanded-keys="[1]"
                :props="defaultProps"
                @node-click="handleNodeClick"
                ></el-tree>
            </el-col>
            <el-col :span="18" class="forumTab">
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
                <el-row class="close-box">
                    <i class="el-icon-close" @click="hideMask"></i>
                </el-row>
                <el-row class="content-box">
                    <showHome v-show="showType == 'departmentHomepage'"></showHome>
                    <p class="showContactUs" v-show="showType == 'contactUs'" v-html="showContent"></p>
                    <p class="showEssayNotice" v-show="showType == 'essayNotice'" v-html="showContent"></p>
                </el-row>
                
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
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        showMask: false,
        activeName:'first',//默认tab页
        showType:'',//判断弹窗显示哪个页面内容
        showContent:''//弹窗的内容
      };
    },
    created() {
        this.init();
        this.initEvt();
        this.getList();
    },
    mounted(){
        
    },
    methods: {
        init(){

        },

        //获取数据
        async getList(){
            let {data}  = await this.$api.get("forum/tree/open/list")
            console.log("获取论坛编辑列表",JSON.stringify(data));
            console.log("获取论坛编辑列表2",data);
            if(!data){
                return;
            }
            this.data = data.data;
            let row = data.data[0].children[0];
            console.log(row);
            // this.$refs.tree.setCurrentKey(row.id);
            // this.handleNodeClick(row);
        },
        handleNodeClick(ev){
            console.log(ev.id);
            console.log(this.$consts.Event.FORUMEDIT);
            if(ev.id){
                this.$eventHub.$emit(this.$consts.Event.FORUMEDIT, ev.id)
            }
        },

        handleClick(tab, event) {
            console.log("点击tab-----");
            console.log(tab, event);
            console.log(this.$consts.Event.FORUMEDIT);
        },

        //定义广播事件
        initEvt(){
            this.$eventHub.$on(this.$consts.Event.SHOW_PREVIEW, (item)=>{
                console.log("数据传输-----",item);
                this.showMask = true;
                this.showType = item.type;
                this.showContent = item.content;
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
    /deep/ .is-current{
        color:#409EFF;
        font-weight:600;
    }
    .forumList-box{
        height:100%;
        .forumList{
            height:90%;
            border:solid 1px #ccc;
            overflow-x:scroll;
            margin-top:10px;
            margin-right:20px;
            /deep/ .el-tree{
                width:200%;
            }
            /deep/ span{
                font-size:12px;
            }
        }
        .forumTab{
        }
    }
    
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
            
            .close-box{
                height:40px;
                background:#ccc;
                width:100%;
                position:relative;
            }
            .el-icon-close{
                font-size:40px;
                font-weight:700;
                color:#fff;
                position:absolute;
                cursor:pointer;
                right:0;
            }
            .content-box{
                height:560px;
                overflow:scroll;
            }
            .showEssayNotice ,.showContactUs{
                padding:20px;
            }
        }
    }
</style>
