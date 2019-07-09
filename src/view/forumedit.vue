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
    </div>  
</template>

<script>
import departmentHomepage from '../components/departmentHomepage'
import conferenceAlerts from '../components/conferenceAlerts'
import essayNotice from '../components/essayNotice'
import contactUs from '../components/contactUs'
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
        }
      };
    },
    created() {
        this.init();
    },
    methods: {
        init(){

        }
    },
    components: {
        departmentHomepage,
        conferenceAlerts, //会议快讯
        essayNotice,
        contactUs
    }
}
</script>

<style scoped lang="less">

</style>
