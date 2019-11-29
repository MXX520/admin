<template>
	<section>
		<div class="search">
			<el-cascader
			style="width:600px"
    placeholder=""
	v-model="arr"
    :options="options"
    :props="{ multiple: true }"
    filterable></el-cascader>
	  <el-button type="primary" @click="tongji">统计</el-button>
	 
			 <el-button type="primary" @click="goOut">导出</el-button>
		
		</div>
		<div class="title" v-show="ids!=''">各院论坛总数</div>
		
		
		 <el-table
		 	v-show="ids!=''"
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
		<div class="title" v-show="ids!=''">各交流类型投稿数量</div>
		 <el-table
		 	v-show="ids!=''"
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
		<div class="title" v-show="ids!=''">投稿人学校分布</div>
		 <el-table
			:data="userSchoolCount"
			v-show="ids!=''"
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
		<div class="title" v-show="ids!=''">各主题投稿数量</div>
		 <el-table
		 	v-show="ids!=''"
			:data="forumThemeCount"
			style="width: 100%">
			<el-table-column
				prop="label1"
				label="论坛名称"
				width="380">
			</el-table-column>
			<el-table-column
				prop="label2"
				label="主题名称"
				width="280">
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
				forumCount:[],
				options:[],
				ids:"",
				arr:[]
			}
		},
		methods: {
			async goOut(){
				let str = this.ids;
				window.location.href = this.$api.httpPath+"export?token="+localStorage.getItem('token')+"&refreshToken="+localStorage.getItem('refreshToken')+"&ids="+str;
			},
			async init(){
                let {data} =await this.$api.get("/statistic",{
					ids:this.ids
				})
                console.log(data)
				let submitTypeCount = data.data.submitTypeCount;
				let {forumThemeCount} = data.data;
                let {userSchoolCount} = data.data;
                let {forumCount} = data.data;
                console.log(submitTypeCount)
				this.submitTypeCount = submitTypeCount;
				this.forumThemeCount = forumThemeCount;
                this.userSchoolCount = userSchoolCount;
                this.forumCount = forumCount;


			},
			async treeList(){
				let {data} = await this.$api.get("forum/faculty/tree/list")
				console.log(data)
				this.options = data.data;
			},
			tongji(){
				console.log(this.arr);
				let str = ""
				if(this.arr[0].length==1){
					
				}else{
					for(let i in this.arr){
						if(this.arr[i].indexOf(this.ids)){
							this.ids+=this.arr[i];
						}
					if(i!=this.arr.length-1){
							this.ids+=this.arr[i][1]+","
					}else{
						this.ids+=this.arr[i][1]
					}
				
				}
				}
				
				console.log(this.ids);
				this.init()
			}
		},
		mounted() {
			this.init();
			this.treeList()
		}
	}

</script>

<style scoped>
.tiem .el-dialog--small{
	width: 38%
}
.title{
    margin-top: 20px;
    margin-bottom: 10px;
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



.fade-enter-active,
.fade-leave-active {
 transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
 opacity: 0;
}
</style>