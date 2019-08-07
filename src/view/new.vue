<template>
	<section>
		<div class="title">各院论坛总数</div>
		 <el-table
			:data="forumCount"
			style="width: 100%">
			<el-table-column
				prop="label"
				label="院系名称"
				width="180">
			</el-table-column>
			<el-table-column
				prop="count"
				label="数量"
				width="180">
			</el-table-column>
			
		</el-table>
		<div class="title">各交流类型投稿数量</div>
		 <el-table
			:data="submitTypeCount"
			style="width: 100%">
			<el-table-column
				prop="label"
				label="交流方式"
				width="180">
			</el-table-column>
			<el-table-column
				prop="count"
				label="数量"
				width="180">
			</el-table-column>
			
		</el-table>
		<div class="title">投稿人学校分布</div>
		 <el-table
			:data="userSchoolCount"
			style="width: 100%">
			<el-table-column
				prop="label"
				label="学校名称"
				width="180">
			</el-table-column>
			<el-table-column
				prop="count"
				label="数量"
				width="180">
			</el-table-column>
		</el-table>
		<div class="title">各主题投稿数量</div>
		 <el-table
			:data="forumThemeCount"
			style="width: 100%">
			<el-table-column
				prop="label1"
				label="论坛名称"
				width="180">
			</el-table-column>
			<el-table-column
				prop="label2"
				label="主题名称"
				width="180">
			</el-table-column>
			<el-table-column
				prop="count"
				label="数量">
			</el-table-column>
		</el-table>
	</section>
</template>

<script>
	// import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	

	export default {
		data() {
			return {
				submitTypeCount: [],
				forumThemeCount:[],
				userSchoolCount:[],
				forumCount:[]
			}
		},
		methods: {
			async init(){
				let {data} = this.$api.get("/statistic")
				let {submitTypeCount} = data;
				let {forumThemeCount} = data;
				let {userSchoolCount} = data;
				this.submitTypeCount = submitTypeCount;
				this.forumThemeCount = forumThemeCount;
				this.userSchoolCount = userSchoolCount;


			}
		},
		mounted() {
			this.init();
		}
	}

</script>

<style scoped>
.tiem .el-dialog--small{
	width: 38%
}
.el-button--small{
	padding: 9px
}
el-submenu [class^=fa] {
 vertical-align: baseline;
 margin-right: 10px;
}

.el-menu-item [class^=fa] {
 vertical-align: baseline;
 margin-right: 10px;
}

.toolbar {
 background: #f2f2f2;
 padding: 10px;
 //border:1px solid #dfe6ec;
 margin: 10px 0px;
 .el-form-item {
  margin-bottom: 10px;
 }
}

.fade-enter-active,
.fade-leave-active {
 transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
 opacity: 0;
}
</style>