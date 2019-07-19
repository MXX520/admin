<template>
	<section>
        <!-- 未通过通过-->
		<!--工具条-->
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
			
			<el-table-column type="index" label="序号"  width="80">
			</el-table-column>
			<el-table-column prop="url" label="url" width="220" >
			</el-table-column>
			<el-table-column prop="address" label="客户端IP" width="120" >
			</el-table-column>
			<el-table-column prop="innerException" label="异常实例" width="100" >
			</el-table-column>
			<el-table-column prop="method" label="请求方式" width="140" >
			</el-table-column>
			<el-table-column prop="source" label="错误对象" min-width="200" >
			</el-table-column>
			<el-table-column prop="exception" label="异常详情" min-width="120" >
			</el-table-column>
			
			<el-table-column prop="happenTime" label="发生时间" min-width="120" >
			</el-table-column>
		
		
			<el-table-column label="操作" width="150" fixed="right">
				<template scope="scope">
					
					<el-button  size="small" @click="handleDel(scope.$index, scope.row)">详情</el-button>
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

		<!--编辑界面-->
		<el-dialog title="论坛设置" :visible.sync="editFormVisible" :close-on-click-modal="false"  class="time">
			<el-form :model="editForm" label-width="160px" :rules="editFormRules" ref="editForm">
				<el-form-item label="论坛开放时间设置" >
					<el-date-picker
					v-model="value2"
					type="daterange"
					align="right"
					unlink-panels
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					format="yyyy 年 MM 月 dd 日"
					>
					</el-date-picker>
				</el-form-item>
					<el-form-item label="投稿时间设置" >
					<el-date-picker
					v-model="value"
					type="daterange"
					align="right"
					unlink-panels
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					format="yyyy 年 MM 月 dd 日"
					>
					</el-date-picker>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="论坛详情" :visible.sync="addFormVisible" :close-on-click-modal="false">
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
				page: 1,
				title:"",
				school:"",
				people:"",
				phone:"",
				email:"",
				value2:"",
				value:"",
				reson:"",
				biaozhu:"",
				editId:1,
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
				
			let {data}  = await this.$api.get("exception/list",{
				pageNum:this.currentPage,
				pageSize:10,
				order:"id",
				orderType:"desc",
				query:this.filters.name,
				type:"1"
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
				console.log("看看这个",index,row)
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
               
				this.editId = row.id;
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
			async editSubmit () {
				let data = await this.$api.put("forum/"+this.editId,{
					forumOpenTime:this.value2[1],
					forumCloseTime:this.value2[0],
					paperOpenTime:this.value[1],
					paperCloseTime:this.value[0]
				})
				console.log(data)
				this.editFormVisible = false;
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