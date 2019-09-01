<template>
	<section>
		<div class="item clearfix" > 
			 <div class="name">用户名：</div>
			 <div class="value">{{name}}</div>
			 <div class="changword" style="margin-left:20px;">
				<router-link to="changpsd">修改密码</router-link>
			 </div>
		</div>
		<div class="item clearfix" > 
			 <div class="name">邮箱：</div>
			 <div class="value">{{email}}</div>
		</div>
		<div class="item clearfix" > 
			 <div class="name">电话：</div>
			 <div class="value">{{phone}}</div>
		</div>
		<div class="item clearfix" > 
			 <div class="name">所属角色：</div>
			 <div class="value">{{role}}</div>
		</div>
		<div class="item clearfix" > 
			 <div class="name">所属院系：</div>
			 <div class="value">{{roleId}}</div>
		</div>
		<div class="item clearfix" > 
			 <div class="name">学校名称：</div>
			 <div class="value">{{schoolName}}</div>
		</div>
		<div class="item clearfix" > 
			 <div class="name">专业名称：</div>
			 <div class="value">{{majorName}}</div>
		</div>
		<div class="item clearfix" > 
			 <div class="name">用户状态：</div>
			 <div class="value">{{status}}</div>
		</div>
		<div class="item clearfix" > 
			 <div class="name">注册时间：</div>
			 <div class="value">{{createTime}}</div>
		</div>
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
				name:"",
				phone:"",
				email:"",
				role:"",
				createTime:"",
				roleId:"",
				schoolName:"",
				majorName:"",
				status:""


			}
		},
		methods: {
			async init(){
				let {data} = await this.$api.post("user/info")
				console.log("---------------------",data)
				let value = data.data;
				this.name  = value.userName;
				this.phone = value.phone;
				this.email = value.email;
				this.role = value.roleId;
				this.roleId = value.facultyId;
				this.createTime = value.createTime;
				this.schoolName = value.schoolName;
				 this.majorName = value.majorName;
				this.status = value.status;
			}
		},
		mounted() {
			this.init();
		}
	}

</script>
<style lang="stylus" scoped>
.item{
	overflow hidden
	margin-top 10px
	.name{
		float left
		width 80px
	}
	.value{
		float left
	}
}
.changword{
	color blue
	margin-left 50px
	float left
	cursor pointer
}
</style>
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