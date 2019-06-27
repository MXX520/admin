<template>
<el-row class="pdf" type='flex' justify="center" align="middle">
    <el-col :span="4" class="pdf-tab">
        <el-row :span="6"><div class="btn-def btn-pre" @click.stop="prePage"><el-button type="primary">上一页</el-button></div></el-row>
        <el-row :span="6"><div class="btn-def btn-next"@click.stop="nextPage"><el-button type="primary">下一页</el-button></div></el-row>
        <el-row :span="6"><div class="btn-def" @click.stop="clock"><el-button type="primary">顺时针</el-button></div></el-row>
        <el-row :span="6"><div class="btn-def" @click.stop="counterClock"><el-button type="primary">逆时针</el-button></div></el-row>
        <el-row :span="6"><div class="btn-def">{{pageNum}}/{{pageTotalNum}}</div></el-row>
        <el-row :span="6"><div class="btn-def">进度：{{loadedRatio}}</div></el-row>
        <el-row :span="6"><div class="btn-def">加载成功: {{curPageNum}}</div></el-row>
        <!--<el-row class="pdf-row" :gutter="24" type='flex' justify="center" align="middle">
            <div class="showBox-row">
                <el-col :span="6"><div class="btn-def btn-pre" @click.stop="prePage"><el-button type="primary">上一页</el-button></div></el-col>
                <el-col :span="6"><div class="btn-def btn-next"@click.stop="nextPage"><el-button type="primary">下一页</el-button></div></el-col>
                <el-col :span="6"><div class="btn-def" @click.stop="clock"><el-button type="primary">顺时针</el-button></div></el-col>
                <el-col :span="6"><div class="btn-def" @click.stop="counterClock"><el-button type="primary">逆时针</el-button></div></el-col>
            </div>
        </el-row>
        <el-row class="pdf-row" :gutter="24" type='flex' justify="center" align="middle">
            <div class="showBox-row">
                <el-col :span="6"><div class="btn-def">{{pageNum}}/{{pageTotalNum}}</div></el-col>
                <el-col :span="6"><div class="btn-def">进度：{{loadedRatio}}</div></el-col>
                <el-col :span="6"><div class="btn-def">加载成功: {{curPageNum}}</div></el-col>
                </div>
        </el-row>-->
    </el-col>
    <el-col :span="1"></el-col>
    <div class="showPdfBox">
        <el-col :span="14">
            <pdf 
                class="showPdf"
                ref="pdf"
                :src="pdfUrl"
                :page="pageNum"
                :rotate="pageRotate"
                @password="password"
                @progress="loadedRatio = $event"
                @page-loaded="pageLoaded($event)"
                @num-pages="pageTotalNum=$event" 
                @error="pdfError($event)"
                @link-clicked="page = $event">
            </pdf>
        </el-col>
    </div>
</el-row>
</template>
<script>
import pdf from 'vue-pdf'
export default {
  name: 'Pdf',
  components:{
      pdf
  },
  data(){
      return {
            pdfUrl:'http://file.dakawengu.com/file/2018-05-29/20180527-tianfeng.pdf',
            // pdfUrl:'http://39.106.77.121:8081/files-upload/manuscript/7_第七届清华大学教育研究院博士生论坛/财务报销及合同申请-03211561016966677.pdf',
            pageNum:1,
            pageTotalNum:1,
            pageRotate:0,
            // 加载进度
            loadedRatio:0,
            curPageNum:0,
      }
  },
  created() {
  },
  mounted: function() {
  },
  methods: {
    prePage(){
      var p = this.pageNum
      p = p>1?p-1:this.pageTotalNum
      this.pageNum = p
    },
    nextPage(){
      var p = this.pageNum
      p = p<this.pageTotalNum?p+1:1
      this.pageNum = p
    },
    clock(){
      this.pageRotate += 90 
    },
    counterClock(){
      this.pageRotate -= 90 
    },
    password(updatePassword, reason) {
      updatePassword(prompt('password is "123456"'))
      console.log('...reason...')
      console.log(reason)
      console.log('...reason...')
    },
    pageLoaded(e){
      this.curPageNum = e
    },
    pdfError(error){
      console.error(error)
    },
    pdfPrintAll(){
      this.$refs.pdf.print()
    },
    pdfPrint(){
      this.$refs.pdf.print(100,[1,2])
    },
    close(){
        this.$router.push({  //核心语句
            path:'/departments',   //跳转的路径
        })
    }
  }
}
</script>
<style scoped>
    .pdf-tab{
        color:#fff;
    }
    .btn-def{
        margin-bottom:10px;
        text-align:center;
    }
    .showPdfBox{
        overflow:scroll;
    }
    .showPdf{
        width:500px;
        height:600px;
    }
</style>
