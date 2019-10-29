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
			<el-table-column prop="title" label="论坛名称" align='center' width="320" >
			</el-table-column>
			<el-table-column prop="facultyName" label="所属院系" align='center' width="120" >
			</el-table-column>
			<el-table-column prop="sponsor" label="发起人" align='center' width="100" >
			</el-table-column>
			<el-table-column prop="sponsorPhone" label="发起人电话" align='center' width="140" >
			</el-table-column>
			<el-table-column prop="sponsorEmail" label="发起人邮箱" align='center' min-width="200" >
			</el-table-column>
			<el-table-column prop="scaleOfMark" label="评分标准" align='center' min-width="120" >
			</el-table-column>
			
		
		
			<el-table-column label="操作" width="150" align='center' fixed="right">
				<template scope="scope">
				
					<el-button  size="small" @click="handleDel(scope.$index, scope.row)">修改</el-button>
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
				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="论坛修改" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="160px" :rules="addFormRules" ref="addForm">
				<el-form-item label="论坛名称（中文）">
					<el-input v-model="title" ></el-input>
				</el-form-item>
                <el-form-item label="论坛名称（英文）">
					<el-input v-model="title2" ></el-input>
				</el-form-item>
				
				 <el-form-item label="发起人（中文）">
					<el-input v-model="people" ></el-input>
				</el-form-item>
                <el-form-item label="发起人（英文）">
					<el-input v-model="people2" ></el-input>
				</el-form-item>
				 <el-form-item label="发起人电话">
					<el-input v-model="phone" ></el-input>
				</el-form-item>
				 <el-form-item label="发起人邮箱">
					<el-input v-model="email" ></el-input>
				</el-form-item>
				<el-form-item label="申请原因（中文）">
                    <el-input type="textarea" v-model="reson" ></el-input>
		        </el-form-item>
                <el-form-item label="申请原因（英文）">
                    <el-input type="textarea" v-model="reson2" ></el-input>
		        </el-form-item>
			    
                <el-form-item label="评分机制">
                    <el-radio v-model="radio" label="0">通过制</el-radio>
                    <el-radio v-model="radio" label="1">评分制</el-radio>
                </el-form-item>
                <el-form-item label="举办地点（中文）">
					<el-input v-model="venue" ></el-input>
				</el-form-item>
				 <el-form-item label="举办地点（英文）">
					<el-input v-model="venueEn" ></el-input>
				</el-form-item>
				 <el-form-item label="举办时间">
					 <el-date-picker
						v-model="startTime"
						type="daterange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期">
						</el-date-picker>
				</el-form-item>
				 <el-form-item label="投稿时间">
					 <el-date-picker
						v-model="tgsj"
						type="daterange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期">
						</el-date-picker>
				</el-form-item>
                <el-form-item label="论坛状态">
                      <el-select v-model="value2" placeholder="请选择">
                        <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="论坛首页板式">
                    <el-select v-model="value3" placeholder="请选择">
                        <el-option
                        v-for="item in options3"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
			</el-form>
            <div slot="footer" class="dialog-footer" style="text-align:center">
				
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">更新</el-button>
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
				page: 1,
                title:"",
				title2:"",
				venue:"",
				venueEn:"",
				startTime:[],
				tgsj:[],
				school:"",
                people:"",
                people2:"",
                reson2:"",
				phone:"",
				email:"",
				radio:1,
				reson:"",
				biaozhu:"",
				editId:1,
				radio:1,
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
                },
                 options: [{
                    value: -1,
                    label: '未通过'
                    }, {
                    value: 0,
                    label: '待审核'
                    }, {
                    value: 1,
                    label: '已通过'
                    }],
                value: '',
                 options2: [ {
                    value: 0,
                    label: '关闭'
                    }, {
                    value: 1,
                    label: '开放'
                    }],
                value2: '',
                 options3: [{
                    value: 1,
                    label: '板式一'
                    }, {
                    value: 2,
                    label: '板式二'
                    }, {
                    value: 3,
                    label: '板式三'
                    }],
                value3: '',

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
				this.startTime = [];
				this.tgsj = [];
				console.log("看看这个",index,row)
				this.addFormVisible = true;
				this.editId = row.id;
				//let {data} = await this.$api.get("forum/"+row.id)
				this.title = row.title;
				this.school = row.facultyName;
				this.people = row.sponsor;
				this.phone = row.sponsorPhone;
				this.email = row.sponsorEmail;
				this.venue = row.venue;
				this.venueEn = row.venueEn;
				this.reson = row.applyReason;
                this.biaozhu =  row.scaleOfMarkName;
                this.value2 = row.isClosed=="关闭"?0:1;
				this.startTime.push(row.forumOpenTime);
				this.startTime.push(row.forumCloseTime);
				this.tgsj.push(row.paperOpenTime)
				this.tgsj.push(row.paperCloseTime)
                this.value3 = row.pageIndexType;
                this.title2 = row.titleEn;
                this.people2 = row.sponsorEn;
                this.reson2 = row.applyReasonEn;
				this.radio = row.scaleOfMark=="通过制"?"0":"1";
				console.log(this.radio)
			
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
				let {data} = await this.$api.put("forum/"+this.editId,{
					title:this.title,
                    titleEn:this.title2,
                    sponsor:this.people,
                    sponsorEn:this.people2,
                    sponsorPhone:this.phone,
                    sponsorEmail:this.email,
                    applyReason:this.reson,
                    applyReasonEn:this.reson2,
					scaleOfMark:this.radio,
					venueEn:this.venueEn,
					venue:this.venue,
					forumOpenTime:this.startTime[0],
					forumCloseTime:this.startTime[1],
					paperOpenTime:this.tgsj[0],
					paperCloseTime:this.tgsj[1],
                    isAudit:this.value,
                    isClosed:this.value2,
                    pageIndexType:this.value3
				})
				console.log(data)
				if(data.code=="01"){
					this.$message({
							message: data.msg,
							type: 'success'
						});
				}
				
				this.addFormVisible = false;
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