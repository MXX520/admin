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
					<el-button type="primary" v-on:click="addUsers">新增</el-button>
				</el-form-item>
				
			</el-form>
		</el-col>

		<!--列表-->
    <div class="content">
      <div class="item" v-for="(item,index) in users" :key="index" @click="showEdit(item)">
        <div class="img-con">
          <img :src="item.logo" alt="">
          <i class="el-icon-circle-close icon" @click.stop="deleteImg(item.id)"></i>
        </div>
        <div class="name">
          {{item.name}}
        </div>
      </div>
    </div>

		<!--工具条-->
	

		<!--编辑界面-->
		<el-dialog title="修改合作" :visible.sync="editFormVisible" :close-on-click-modal="false"  class="time">
			<el-form :model="editForm" label-width="160px" :rules="editFormRules" ref="editForm">
			
					 <el-form-item label="合作品牌名称">
						<el-input v-model="title2" ></el-input>
					</el-form-item>
			
			
				
					 <el-form-item label="外部链接">
						<el-input v-model="order2" ></el-input>
					</el-form-item>
				
			
				<el-button type="primary" @click.native="upload" style="margin-left:80px;">上传</el-button>
				<input type="file"  style="display:none;" ref="file" @change="changFile" accept="image/x-png,image/gif,image/jpeg,image/bmp" >
         {{file[0].name}}
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align:center;">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">修改</el-button>
			</div>
		</el-dialog>
    	<el-dialog title="新增合作" :visible.sync="newFormVisible" :close-on-click-modal="false"  class="time">
			<el-form :model="editForm" label-width="160px" :rules="editFormRules" ref="editForm">
			
					 <el-form-item label="合作品牌名称">
						<el-input v-model="title" ></el-input>
					</el-form-item>
			
			
				
					 <el-form-item label="外部链接">
						<el-input v-model="order" ></el-input>
					</el-form-item>
				
        	 
				<el-button type="primary" @click.native="upload" style="margin-left:80px;">上传</el-button>
        	 
				<input type="file"  style="display:none;" ref="file" @change="changFile" accept="image/x-png,image/gif,image/jpeg,image/bmp" > 
        {{file[0].name}}
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align:center;">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="editLoading">新增</el-button>
			</div>
		</el-dialog>
		<!--新增界面-->
		<el-dialog title="论坛详情" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
				 <el-form-item label="异常url">
					<el-input v-model="title" disabled="true"></el-input>
				</el-form-item>
				 <el-form-item label="客户端IP">
					<el-input v-model="school" disabled="true"></el-input>
				</el-form-item>
				 <el-form-item label="异常实例">
					<el-input v-model="people" disabled="true"></el-input>
				</el-form-item>
				 <el-form-item label="请求方式">
					<el-input v-model="phone" disabled="true"></el-input>
				</el-form-item>
				 <el-form-item label="错误对象">
					<el-input v-model="email" disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="异常详情">
                    <el-input type="textarea" v-model="reson" disabled="true"></el-input>
		        </el-form-item>
			    <el-form-item label="发生时间">
                    <el-input v-model="biaozhu" disabled="true"></el-input>
                </el-form-item>
			</el-form>
		</el-dialog>
	</section>
</template>

<script>
import { debug } from 'util';
	// import util from '../../common/js/util'
	//import NProgress from 'nprogress'
import axios from "axios"

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
        order2:"",
         order:"",
        file:[{name:""}],
				school:"",
				people:"",
				phone:"",
        email:"",
        editId:"",
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
        newFormVisible:false,
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
      addUsers(){
          this.newFormVisible = true;
      },
      upload(){
        this.$refs.file.click()
      },
      changFile(e){
        this.file = []
				this.file = e.target.files;
      },
      showEdit(item){
        this.editId = item.id;
        this.editFormVisible = true;
        this.title2 = item.name;
        this.order2 = item.href;
      },
      async deleteImg(id){
        	this.$confirm('确认删除么？', '提示', {}).then(async () => {
                let {data} = await this.$api.delete('cooperate/'+id);
                if(data.code=="01"){
                  	this.getUsers();
                }
							
						
						});
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
				
			let {data}  = await this.$api.get("cooperate/list",{
			
				
			})
		
			
			this.users = data.data;
			
			console.log(data)		
			
			},
		//删除
			async handleDel (index, row) {
				console.log("看看这个",index,row)
				this.addFormVisible = true;
				
				
				this.title = row.url;
				this.school =row.address;
				this.people = row.innerException;
				this.phone = row.method;
				this.email = row.source;
				this.reson = row.exception;
				this.biaozhu =  row.happenTime;
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
					let form = new FormData();
				form.append("name",this.title2)
			
				form.append("href",this.order2)
			
				form.append("file",this.file[0])

				let {data} = await axios.put(this.$api.httpPath+"cooperate/"+this.editId,form)
				if(data.code=="01"){
					this.editFormVisible = false;
					this.getUsers()
				}else{
					this.$message.error(data.msg);
				}
				console.log(data)
			
			},
			//新增
			async addSubmit () {
						let form = new FormData();
				form.append("name",this.title)
			
				form.append("href",this.order)
			
				form.append("file",this.file[0])

				let {data} = await axios.put(this.$api.httpPath+"cooperate",form)
				if(data.code=="01"){
					this.newFormVisible = false;
					this.getUsers()
				}else{
					this.$message.error(data.msg);
				}
				
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
.content{
  overflow: hidden;
  width: 100%;
}
.img-con{
  position: relative;
}
.icon{
  position: absolute;
  right: 0px;
  top: 0px;
  font-size: 18px;
  color: #2196f3;
  cursor: pointer;
}
.item{
  float: left;
  margin: 10px
}
.item img{
  width: 160px;
  height: 160px;
}
.name{
  text-align: center;
  margin-top: 6px;
}
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