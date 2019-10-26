<template>
  <div class="app-container" style="margin-top:20px">
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
					<el-button type="primary" v-on:click="add">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" label="序号" align='center' width="80">
			</el-table-column>
			<el-table-column prop="facultyName" label="院系名称(中文)" align='center' width="160" >
			</el-table-column>
			<el-table-column prop="facultyNameEn" label="院系名称(英文)" align='center' width="360" >
			</el-table-column>
			<el-table-column label="操作" align='center' width="240" >
				<template scope="scope">
					<el-button  size="small" @click="handleChange(scope.$index, scope.row)">修改</el-button>
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

	<el-dialog title="新增院系" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="180px" :rules="addFormRules" ref="addForm">
				 <el-form-item label="院系名称（中文）">
					<el-input v-model="title" ></el-input>
				</el-form-item>
				 <el-form-item label="院系名称（英文）">
					<el-input v-model="title2" ></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button type="primary" @click.native="editSubmit()" :loading="editLoading">新增</el-button>
			
			</div>
		</el-dialog>
		<el-dialog title="院系修改" :visible.sync="changeFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="180px" :rules="addFormRules" ref="addForm">
				 <el-form-item label="院系名称（中文）">
					<el-input v-model="oldTitle" ></el-input>
				</el-form-item>
				 <el-form-item label="院系名称（英文）">
					<el-input v-model="oldtitle2" ></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button type="primary" @click.native="edit()" :loading="editLoading">修改</el-button>
			
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
				title2:"",
				oldtitle2:"",
				biaozhu:"",
				changeFormVisible:false,
				total:10,
				oldTitle:"",
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
				editId:"",
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
			handleChange(index,row){
				this.editId = row.id
				console.log(row)
				this.oldTitle =  row.facultyName;
				this.oldtitle2 = row.facultyNameEn;
				this.changeFormVisible = true;
			},
			async edit(){
				let {data} = await this.$api.put("faculty/"+this.editId,{
					facultyName:this.oldTitle,
					facultyNameEn:this.oldtitle2
				})
				if(data.code=="01"){
					this.changeFormVisible = false;
					this.getUsers()
				}else {
					this.$message.error(data.msg);
				}
			},
			add(){
				this.title = ""
				this.addFormVisible = true;
			},

			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getUsers();
			},
			
		
			//获取用户列表
		async getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				
			let {data}  = await this.$api.get("faculty/list",{
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
				this.$confirm('此操作将永久删除该院系, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
				}).then(async () => {
					let {data} = await this.$api.delete("faculty/"+row.id)
					if(data.code=="01"){
						this.getUsers()
					}
				}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
				});
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
			async editSubmit() {
				let {data} = await this.$api.post("faculty",{
					facultyName:this.title,
					facultyNameEn:this.title2
				})
				if(data.code=="01"){
					this.addFormVisible = false
				}
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
		
			this.getUsers();
		}
	}

</script>

<style scoped>

</style>
