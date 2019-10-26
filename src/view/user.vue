<template>
  <div class="app-container" style="margin-top:20px;">
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
					<el-button type="primary" v-on:click="showUsers">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			
			<el-table-column type="index" label="序号" align='center' width="80">
			</el-table-column>
			<el-table-column prop="userName" label="用户名称" align='center' width="100" >
			</el-table-column>
			<el-table-column prop="email" label="邮箱" align='center' width="240"  >
			</el-table-column>
			<el-table-column prop="phone" label="手机号" align='center' width="160" >
			</el-table-column>
			<el-table-column prop="roleName" label="所属角色" align='center' width="140" >
			</el-table-column>
			<el-table-column prop="facultyName" label="所属院系" align='center' min-width="100" >
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间" align='center' min-width="170" >
			</el-table-column>
		
			<el-table-column label="操作" width="260" align='center' fixed="right">
				<template scope="scope">
				
					<el-button  size="small" @click="handleD(scope.$index, scope.row)">详情</el-button>
          <el-button   size="small" @click="changeUser(scope.$index, scope.row)">修改</el-button>
          <el-button v-show="scope.row.roleId!=1" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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

	<el-dialog title="用户详情" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
				<div class="clearfix" style="overflow:hidden;">

			
				<div class="item">
					<el-form-item label="用户名">
						<el-input v-model="title" disabled="true"></el-input>
					</el-form-item>
				</div>
				<div class="item">
					 <el-form-item label="邮箱">
						<el-input v-model="school" disabled="true"></el-input>
					</el-form-item>
				</div>
				<div class="item">
					<el-form-item label="手机号">
						<el-input v-model="people" disabled="true"></el-input>
					</el-form-item>
				</div>
				<div class="item">
					<el-form-item label="所属角色">
						<el-input v-model="phone" disabled="true"></el-input>
					</el-form-item>
				</div>
				
				<div class="item">
					 <el-form-item label="所属院系">
						<el-input v-model="major" disabled="true"></el-input>
					</el-form-item>
				</div>
				<div class="item">
					 <el-form-item label="用户状态">
						<el-input v-model="state" disabled="true"></el-input>
					</el-form-item>
				</div>
				<div class="item">
					 <el-form-item label="学校名称">
						<el-input v-model="schoolName" disabled="true"></el-input>
					</el-form-item>
				</div>
				<div class="item">
					 <el-form-item label="院系名称">
						<el-input v-model="email" disabled="true"></el-input>
					</el-form-item>
				</div>
				
					</div>
				
			

				
			</el-form>
	
		</el-dialog>
		<el-dialog title="新增用户" :visible.sync="addUsers" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
				<div class="clearfix" style="overflow:hidden;">

			
				<div class="item">
					<el-form-item label="用户名">
						<el-input v-model="title" ></el-input>
					</el-form-item>
				</div>
				<div class="item">
					 <el-form-item label="邮箱">
						<el-input v-model="school" ></el-input>
					</el-form-item>
				</div>
				<div class="item">
					<el-form-item label="手机号">
						<el-input v-model="people" ></el-input>
					</el-form-item>
				</div>
				<div class="item">
					<el-form-item label="所属角色">
						
							  <el-select v-model="phone" placeholder="请选择" style="widht:100%;">
							<el-option
							v-for="item in roleList"
							:key="item.id"
							:label="item.roleName"
							:value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
				</div>
				<div class="item">
					<el-form-item label="初始密码">
						<el-input v-model="moren" ></el-input>
					</el-form-item>
				</div>
				<div class="item">
					 <el-form-item label="所属院系">
							  <el-select v-model="email" placeholder="请选择" style="widht:100%;">
							<el-option
							v-for="item in schoolList"
							:key="item.id"
							:label="item.facultyName"
							:value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
				</div>
				<div class="item">
					 <el-form-item label="用户状态">
						  <el-select v-model="state" placeholder="请选择" style="widht:100%;">
							<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</div>
				<div class="item">
					 <el-form-item label="学校名称">
						<el-input v-model="schoolName" ></el-input>
					</el-form-item>
				</div>
				<div class="item">
					 <el-form-item label="院系名称">
						<el-input v-model="major" ></el-input>
					</el-form-item>
				</div>
				
					</div>
			
			

				
			</el-form>
				<div slot="footer" class="dialog-footer" style="text-align:center">
       
				<el-button @click.native="addNew()">新增</el-button>
			</div>
		</el-dialog>
		<el-dialog title="用户修改" :visible.sync="changeUsers" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
				<div class="clearfix" style="overflow:hidden;">
				<div class="item">
					<el-form-item label="用户名">
						<el-input v-model="title" ></el-input>
					</el-form-item>
				</div>
				<div class="item">
					 <el-form-item label="邮箱">
						<el-input v-model="school"  disabled="true"></el-input>
					</el-form-item>
				</div>
				<div class="item">
					<el-form-item label="手机号">
						<el-input v-model="people" ></el-input>
					</el-form-item>
				</div>
				<div class="item">
					<el-form-item label="所属角色">
						<el-select v-model="phone" placeholder="请选择" style="widht:100%;">
							<el-option
							v-for="item in roleList"
							:key="item.id"
							:label="item.roleName"
							:value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
				</div>
				
				
				<div class="item">
					 <el-form-item label="所属院系">
						
						  <el-select v-model="email" placeholder="请选择" style="widht:100%;">
							<el-option
							v-for="item in schoolList"
							:key="item.id"
							:label="item.facultyName"
							:value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
				</div>
				<div class="item">
					 <el-form-item label="用户状态">
						  <el-select v-model="state" placeholder="请选择" style="widht:100%;">
							<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</div>
				<div class="item">
					 <el-form-item label="学校名称">
						<el-input v-model="schoolName" ></el-input>
					</el-form-item>
				</div>
				<div class="item">
					 <el-form-item label="院系名称">
							<el-input v-model="major" ></el-input>
					</el-form-item>
				</div>
				
				
					</div>
			</el-form>
				<div slot="footer" class="dialog-footer" style="text-align:center">
       
				<el-button @click.native="changeNew()">修改</el-button>
			</div>
		</el-dialog>
	
		
	</section>
  </div>
</template>
<script>


import { debug, debuglog } from 'util';
	// import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				title:"",
				state:"1",
				schoolName:"",
				major:"",
				yuanxi:"",
				jingli:"",
				moren:"abc123456",
				lishi:"",
				school:"",
				people:"",
				phone:"",
				roleId:"",
				email:"2",
				facultyId:"",
				reson:"",
				biaozhu:"",
				changeUsers:false,
				total:10,
				editId:0,
				currentPage:1,
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
				 options: [{
				value: 1,
				label: '启用'
				}, {
				value: 2,
				label: '冻结'
				}, {
				value: 3,
				label: '删除'
				}],
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
				},
				addUsers:false

			}
		},
		methods: {
		   async changeUser(index,row){
			   console.log(row.facultyId)
			   this.editId = row.id;
			   	this.changeUsers = true;
				this.title = row.userName;
				this.school = row.email;
				this.people = row.phone;
				this.phone = row.roleName;
				this.roleId = row.roleId;
				this.facultyId = row.facultyId;
				this.email = row.facultyId;
				this.state = row.status;
				this.schoolName =  row.schoolName;
				this.major = row.majorName
				this.jingli = row.academicExperience;
				this.lishi = row.participateInHistory;
			},
			async changeNew(){
				let {data} = await this.$api.put("user/"+this.editId,{
					userName:this.title,
					email:this.school,
					passWord:this.moren,
					phone:this.people,
					schoolName:this.schoolName,
					majorName:this.major,
					status:this.state,
					roleId:this.roleId,
					facultyId:this.email
				})
				if(data.code=="01"){
					this.changeUsers = false
					this.getRList();
				}else{
					 this.$message.error(data.msg);
				}
			},
			async handleDel(index,row){
				this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
				}).then(async () => {
					let {data} = await this.$api.delete("user/"+row.id)
					if(data.code=="01"){

						this.getUsers();
					}
				}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
				});
			},
			showUsers(){
				this.title = "";
				this.school = "";
				this.people = "";
				this.phone = "";
				this.email = "";
				this.state = "";

				this.schoolName = "";
				this.major = "";
				this.jingli = "";
				this.lishi = "";
				this.addUsers = true;

			},
			async addNew(){
				let {data} = await this.$api.post("/user",{
					userName:this.title,
					email:this.school,
					passWord:this.moren,
					phone:this.people,
					schoolName:this.schoolName,
					majorName:this.major,
					status:this.state,
					roleId:this.phone,
					facultyId:this.email
				})
				if(data.code=="01"){
					this.addUsers = false
				}else{
					 this.$message.error(data.msg);
				}
				console.log(data)
			},
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getUsers();
			},
		
			async getRList(){
				let {data} = await this.$api.get("role/list",{

				})
				
				this.roleList = data.data;
				this.getUsers();
			},
			async getSList(){
				let {data} = await this.$api.get("faculty/list/all",{

				})
				
				this.schoolList = data.data;
				
				this.getRList();
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
						list[i].facultyName = this.schoolList[z].facultyName;
					}
				}
				
			}
			this.users = data.data.list;
			this.total = data.data.total;
			console.log(data)		
			
			},
			//删除
			async handleD (index, row) {
				console.log(index,row)
				this.addFormVisible = true;
				
				this.title = row.userName;
				this.school = row.email;
				this.people = row.phone;
				this.phone = row.roleName;
				this.email = row.majorName;
				this.state = row.statusName;
				this.schoolName =  row.schoolName;
				this.major = row.facultyName
				this.jingli = row.academicExperience;
				this.lishi = row.participateInHistory;


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
			
		}
	}

</script>

<style scoped>
.item{
	float: left;
	width: 50%
}
.el-select{
	width: 100%
}
</style>
