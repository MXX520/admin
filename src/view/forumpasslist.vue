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
			
			<el-table-column type="index" label="序号" align='center' width="80">
			</el-table-column>
			<el-table-column prop="title" label="论坛名称(中文)" align='center' width="220" >
			</el-table-column>
			<el-table-column prop="titleEn" label="论坛名称(英文)" align='center' width="160" >
			</el-table-column>
			<el-table-column prop="facultyName" label="所属院系" align='center' width="120" >
			</el-table-column>
			<el-table-column prop="forumOpenTime" label="举办日期" align='center' width="220" >
			</el-table-column>
			<el-table-column prop="venue" label="论坛地点（中文）" align='center' width="140" >
			</el-table-column>
			<el-table-column prop="venueEn" label="论坛地点（英文）" align='center' min-width="200" >
			</el-table-column>
			<el-table-column label="是否在线" align='center' min-width="120" >
				<template scope="scope">
					<el-button size="small" @click="control(scope.$index, scope.row)">{{scope.row.isClosedName}}</el-button>
					
				</template>
			</el-table-column>
			
			<el-table-column prop="contributionTime" label="投稿时段" align='center' min-width="120" >
			</el-table-column>
			
		
			<el-table-column label="操作" width="150" align='center' fixed="right">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">设置</el-button>
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
				 <el-form-item label="论坛标题（中文）">
					<el-input v-model="title"></el-input>
				</el-form-item>
				<el-form-item label="论坛标题（英文）">
					<el-input v-model="titleEn" ></el-input>
				</el-form-item>
				 <el-form-item label="所属院系">
					<el-input v-model="school" ></el-input>
				</el-form-item>
				<el-form-item label="举办日期" >
					<el-date-picker
					v-model="value2"
					type="daterange"
					align="right"
					unlink-panels
					:editable='false'
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					format="yyyy 年 MM 月 dd 日"
					>
					</el-date-picker>
				</el-form-item>
					<el-form-item label="投稿时段" >
					<el-date-picker
					v-model="value"
					type="daterange"
					align="right"
					unlink-panels
					:editable='false'
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					format="yyyy 年 MM 月 dd 日"
					>
					</el-date-picker>

				</el-form-item>
				 <el-form-item label="论坛地点（中文）">
					<el-input v-model="venue" ></el-input>
				</el-form-item>
				 <el-form-item label="论坛地点（英文）">
					<el-input v-model="venueEn" ></el-input>
				</el-form-item>
				 <el-form-item label="负责人（中文）">
					<el-input v-model="sponsor" ></el-input>
				</el-form-item>
				 <el-form-item label="负责人（英文）">
					<el-input v-model="sponsorEn" ></el-input>
				</el-form-item>
				 <el-form-item label="负责人邮箱">
					<el-input v-model="email" ></el-input>
				</el-form-item>
				
				
				<el-form-item label="申请原因">
                    <el-input type="textarea" v-model="reson" ></el-input>
		        </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">更新</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="论坛详情" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
				 <el-form-item label="论坛标题（中文）">
					<el-input v-model="title" disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="论坛标题（英文）">
					<el-input v-model="titleEn" disabled="true"></el-input>
				</el-form-item>
				 <el-form-item label="所属院系">
					<el-input v-model="school" disabled="true"></el-input>
				</el-form-item>
				 <el-form-item label="举办日期">
					<el-input v-model="holdingDate" disabled="true"></el-input>
				</el-form-item>
				 <el-form-item label="投稿时段">
					<el-input v-model="contributionTime" disabled="true"></el-input>
				</el-form-item>
				 <el-form-item label="论坛地点（中文）">
					<el-input v-model="venue" disabled="true"></el-input>
				</el-form-item>
				 <el-form-item label="论坛地点（英文）">
					<el-input v-model="venueEn" disabled="true"></el-input>
				</el-form-item>
				 <el-form-item label="负责人（中文）">
					<el-input v-model="sponsor" disabled="true"></el-input>
				</el-form-item>
				 <el-form-item label="负责人（英文）">
					<el-input v-model="sponsorEn" disabled="true"></el-input>
				</el-form-item>
				 <el-form-item label="负责人邮箱">
					<el-input v-model="email" disabled="true"></el-input>
				</el-form-item>
				
				
				<el-form-item label="申请原因">
                    <el-input type="textarea" v-model="reson" disabled="true"></el-input>
		        </el-form-item>
				<el-form-item label="申请时间">
                    <el-input  v-model="createTime" disabled="true"></el-input>
		        </el-form-item>
			    <el-form-item label="是否在线">
                    <el-input v-model="isClosedName" disabled="true"></el-input>
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
				titleEn:"",
				forumOpenTime:"",
				sponsor:"",
				sponsorEn:"",
				venue:"",
				venueEn:"",
				holdingDate:"",
				contributionTime:"",
				school:"",
				people:"",
				phone:"",
				email:"",
				value2:"",
				value:"",
				createTime:"",
				isClosedName:"",
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
		async	control(index,row){
			let {data} = await this.$api.put("forum/status/"+row.id,{
				isClosed:row.isClosedName=="上线"?0:1,
			})
			console.log(data)
			this.getUsers()
			},
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
				this.titleEn = data.data.titleEn;
				this.forumOpenTime = data.data.forumOpenTime;
				this.contributionTime = data.data.contributionTime;
				this.venue = data.data.venue;
				this.venueEn = data.data.venueEn;
				this.holdingDate = data.data.holdingDate;
				this.school = data.data.facultyName;
				this.sponsor = this.people = data.data.sponsor;
				this.sponsorEn = data.data.sponsorEn;
				this.createTime = data.data.createTime;
				this.isClosedName = data.data.isClosedName;
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
					forumOpenTime:this.value2[0],
					forumCloseTime:this.value2[1],
					paperOpenTime:this.value[0],
					paperCloseTime:this.value[1]
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