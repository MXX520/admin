<template>
  <div class="app-container">
   <section>

		<!--工具条已通过-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder=""></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
					<el-form-item>
					<el-button type="primary" v-on:click="getUsers">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			
			<el-table-column type="index" label="序号"  width="80">
			</el-table-column>
			<el-table-column prop="userName" label="用户名称" width="100" >
			</el-table-column>
			<el-table-column prop="email" label="邮箱" width="240"  >
			</el-table-column>
			<el-table-column prop="phone" label="手机号" width="160" >
			</el-table-column>
			<el-table-column prop="roleName" label="所属角色" width="140" >
			</el-table-column>
			<el-table-column prop="schoolName" label="所属院系" min-width="100" >
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间" min-width="170" >
			</el-table-column>
		
			<el-table-column label="操作" width="240" fixed="right">
				<template scope="scope">
				
					<el-button  size="small" @click="handleDel(scope.$index, scope.row)">详情</el-button>
          <el-button  size="small" @click="handleDel(scope.$index, scope.row)">修改</el-button>
          <el-button  size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="text-align:center;">
			 <el-pagination
		
			@current-change="handleCurrentChange"
			:current-page="currentPage"
			
			:page-size="10"
			layout="total, sizes, prev, pager, next, jumper"
			:total="total">
			</el-pagination>
		</el-col>

	<el-dialog title="论坛审核" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
				 <el-form-item label="活动名称">
					<el-input v-model="title" disabled="true"></el-input>
				</el-form-item>
				 <el-form-item label="所属院系">
					<el-input v-model="school" disabled="true"></el-input>
				</el-form-item>
				 <el-form-item label="发起人">
					<el-input v-model="people" disabled="true"></el-input>
				</el-form-item>
				 <el-form-item label="发起人电话">
					<el-input v-model="phone" disabled="true"></el-input>
				</el-form-item>
				 <el-form-item label="发起人邮箱">
					<el-input v-model="email" disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="申请原因">
			<el-input type="textarea" v-model="reson" disabled="true"></el-input>
		</el-form-item>
			 <el-form-item label="评分标准">
					<el-input v-model="biaozhu" disabled="true"></el-input>
				</el-form-item>
			

				
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button type="primary" @click.native="editSubmit(1)" :loading="editLoading">审核通过</el-button>
				<el-button @click.native="editSubmit(0)">审核不通过</el-button>
			</div>
		</el-dialog>


	
		
	</section>
  </div>
</template>
<script>


import { debug } from 'util';
	// import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				title:"",
				school:"",
				people:"",
				phone:"",
				email:"",
				reson:"",
				biaozhu:"",
				total:10,
				currentPage:1,
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},
				roleList:[],
				schoolList:[],
				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				}

			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			handleCurrentChange(){
				this.getUsers()
			},
			async getRList(){
				let {data} = await this.$api.get("role/list",{

				})
				
				this.roleList = data.data;
			},
			async getSList(){
				let {data} = await this.$api.get("faculty/list",{

				})
				
				this.schoolList = data.data;
			},
			//获取用户列表
		async getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				
			let {data}  = await this.$api.get("user/list",{
				pageNum:this.currentPage,
				pageSize:10,
				query:this.filters.name
		
			})
			let list  =  data.data.list;
			for(let i in list){
				for(let j in this.roleList){
					if(list[i].roleId==this.roleList[j].id){
						list[i].roleName = this.roleList[j].roleName;
					}
				}
				for(let z in this.schoolList){
					if(list[i].facultyId == this.schoolList[z].id){
						list[i].schoolName = this.schoolList[z].facultyName;
					}
				}
				
			}
			this.users = data.data.list;
			this.total = data.data.total;
			console.log(data)		
			
			},
			//删除
			async handleDel (index, row) {
				console.log(index,row)
				this.addFormVisible = true;
				let {data} = await this.$api.get("forum/"+row.id)
				this.title = data.data.title;
				this.school = data.data.facultyName;
				this.people = data.data.sponsor;
				this.phone = data.data.sponsorPhone;
				this.email = data.data.sponsorEmail;
				this.reson = data.data.applyReason;
				this.biaozhu =  data.data.scaleOfMarkName;
				console.log(data)
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			}
		},
		mounted() {
			this.getSList();
			this.getRList();
			this.getUsers();
		}
	}

</script>

<style scoped>

</style>
