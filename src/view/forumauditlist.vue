
<template>
	<section>

		<!--工具条已通过-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			
			<el-table-column  label="序号" align='center' width="80">
				<template scope="scope">
					<span>{{scope.$index+(currentPage-1)*10+1}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="title" label="论坛标题（中文）" align='center' width="220" >
			</el-table-column>
			<el-table-column prop="titleEn" label="论坛标题（英文）" align='center' width="220" >
			</el-table-column>
			<el-table-column prop="facultyName" label="所属院系" align='center' width="120"  >
			</el-table-column>
			<el-table-column prop="forumOpenTime" label="举办日期" align='center' width="220" >
			</el-table-column>
			<el-table-column prop="venue" label="论坛地点（中文）" align='center' width="220" >
			</el-table-column>
			<el-table-column prop="venueEn" label="论坛地点（英文）" align='center' width="220" >
			</el-table-column>
			
			<el-table-column prop="createTime" label="申请时间" align='center' min-width="180" sortable>
			</el-table-column>
		
			<el-table-column label="操作" width="100" align='center' fixed="right">
				<template scope="scope">
					<el-button  size="small" @click="handleDel(scope.$index, scope.row)">审核</el-button>
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
			<el-form :model="addForm" label-width="180px" :rules="addFormRules" ref="addForm">
				<el-form-item label="论坛标题（中文）">
					<el-input v-model="title" ></el-input>
				</el-form-item>
				<el-form-item label="论坛标题（英文）">
					<el-input v-model="titleEn" ></el-input>
				</el-form-item>
				 <el-form-item label="所属院系">
					<el-input v-model="facultyName" ></el-input>
				</el-form-item>
				 <el-form-item label="举办日期">
					<el-input v-model="holdingDate" ></el-input>
				</el-form-item>
				 <el-form-item label="论坛地点（中文）">
					<el-input v-model="venue" ></el-input>
				</el-form-item>
				 <el-form-item label="论坛地点（英文）">
					<el-input v-model="venueEn" ></el-input>
				</el-form-item>
				 <el-form-item label="申请时间">
					<el-input v-model="createTime" ></el-input>
				</el-form-item>

				 <el-form-item label="负责人（中文）">
					<el-input v-model="sponsor" ></el-input>
				</el-form-item>
				 <el-form-item label="负责人（英文）">
					<el-input v-model="sponsorEn" ></el-input>
				</el-form-item>
				 <el-form-item label="负责人电话">
					<el-input v-model="sponsorPhone" ></el-input>
				</el-form-item>
				 <el-form-item label="负责人邮箱">
					<el-input v-model="sponsorEmail" ></el-input>
				</el-form-item>
				<el-form-item label="申请原因">
			<el-input type="textarea" v-model="applyReason" ></el-input>
		</el-form-item>
			 <el-form-item label="审核意见">
					<el-input type="textarea" v-model="auditResult" ></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button type="primary" @click.native="editSubmit(1)" :loading="editLoading">审核通过</el-button>
				<el-button @click.native="editSubmit(-1)">审核不通过</el-button>
			</div>
		</el-dialog>


	
		
	</section>
</template>

<script>
	// import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				total:10,
				currentPage:1,
				users: [],
				total: 0,
				title:"",
				venue:"",
				venueEn:"",
				sponsor:"",
				sponsorEn:"",
				sponsorPhone:"",
				sponsorEmail:"",
				auditResult:"",
				applyReason:"",
				facultyName:"",
				createTime:"",
				titleEn:"",
				school:"",
				holdingDate:"",
				people:"",
				phone:"",
				email:"",
				reson:"",
        biaozhu:"",
        editId:1,
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
			//获取用户列表
		async getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				
			let {data}  = await this.$api.get("forum/list",{
				pageNum:this.currentPage,
				pageSize:10,
				order:"id",
				orderType:"desc",
				query:this.filters.name,
				type:"0"
			})
			let list  =  data.data.list;
			for(let i in list){
				if(list[i].scaleOfMark){
					list[i].scaleOfMark = "评分制"
				}else{
					list[i].scaleOfMark = "通过制"
				}
				if(list[i].isClosed){
					list[i].isClosed = "开放"
				}else{
					list[i].isClosed = "关闭"
				}
			}
			
			this.users = data.data.list;
			this.total = data.data.total;
			console.log(data)		
			
			},
			//删除
			async handleDel (index, row) {
                console.log(index,row)
                this.editId =row.id;
				this.addFormVisible = true;
				let {data} = await this.$api.get("forum/"+row.id)
				this.title = data.data.title;
				this.titleEn = data.data.titleEn;
				this.holdingDate = data.data.holdingDate;
				this.facultyName = data.data.facultyName;
				this.forumOpenTime = data.data.forumOpenTime;
				this.createTime = data.data.createTime;
				this.venue = data.data.venue;
				this.venueEn = data.data.venueEn;
				this.sponsor = data.data.sponsor;
				this.sponsorEn = data.data.sponsorEn;
				this.sponsorPhone = data.data.sponsorPhone;
				this.sponsorEmail = data.data.sponsorEmail;
				this.applyReason = data.data.applyReason;
				this.auditResult = data.data.auditResult;
				this.scaleOfMarkName =  data.data.scaleOfMarkName;
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
		async	editSubmit (id) {
       let {data} = await this.$api.put("forum/audit/"+this.editId,{
         is_pass:id,
       })
       this.addFormVisible = false;
       this.getUsers()
       console.log(data)
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