<template>
  <section>
    <!-- 未通过通过-->
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUsers">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="addImg">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="users"
      highlight-current-row
      v-loading="listLoading"
      @selection-change="selsChange"
      style="width: 100%;"
    >
      <el-table-column type="index" label="序号" align="center" width="80">
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center" width="100">
      </el-table-column>
      <el-table-column
        prop="forumName"
        label="对应论坛"
        align="center"
        width="320"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        align="center"
        width="190"
      >
      </el-table-column>
      <el-table-column prop="num" label="显示顺序" align="center" width="100">
      </el-table-column>
      <el-table-column
        prop="isVisible"
        label="是否可见"
        align="center"
        min-width="200"
      >
      </el-table-column>

      <el-table-column label="操作" align="center" width="250">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >预览</el-button
          >
          <el-button size="small" @click="handleDel(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button size="small" @click="deleteImg(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!--编辑界面-->
    <el-dialog
      title="轮播新增"
      :visible.sync="editFormVisible"
      :close-on-click-modal="false"
      class="time"
    >
      <el-form
        :model="editForm"
        label-width="160px"
        :rules="editFormRules"
        ref="editForm"
      >
        <div class="item">
          <el-form-item label="标题">
            <el-input v-model="title"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="对应论坛">
            <el-select v-model="luntan" placeholder="请选择">
              <el-option
                v-for="item in luntanList"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="显示顺序">
            <el-input v-model="order"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="是否可见">
            <el-select v-model="visable" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-button
          type="primary"
          @click.native="upload"
          style="margin-left:80px;"
          >上传</el-button
        >
        <input
          type="file"
          style="display:none;"
          ref="file"
          @change="changFile"
          accept="image/x-png,image/gif,image/jpeg,image/bmp"
        />
        {{ file[0].name }}
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button
          type="primary"
          @click.native="editSubmit"
          :loading="editLoading"
          >新增</el-button
        >
      </div>
    </el-dialog>
    <!--编辑界面-->
    <el-dialog
      title="轮播修改"
      :visible.sync="putVisible"
      :close-on-click-modal="false"
      class="time"
    >
      <el-form
        :model="editForm"
        label-width="160px"
        :rules="editFormRules"
        ref="editForm"
      >
        <div class="item">
          <el-form-item label="标题">
            <el-input v-model="title2"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="对应论坛">
            <el-select v-model="luntan2" placeholder="请选择">
              <el-option
                v-for="item in luntanList"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="显示顺序">
            <el-input v-model="order2"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="是否可见">
            <el-select v-model="visable2" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-button
          type="primary"
          @click.native="upload"
          style="margin-left:80px;"
          >上传</el-button
        >
        <input
          type="file"
          style="display:none;"
          ref="file"
          @change="changFile"
          accept="image/x-png,image/gif,image/jpeg,image/bmp"
        />
        {{ file[0].name }}
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button
          type="primary"
          @click.native="editChange"
          :loading="editLoading"
          >更改</el-button
        >
      </div>
    </el-dialog>
    <!--新增界面-->
    <el-dialog
      title="图片预览"
      :visible.sync="preImg"
      :close-on-click-modal="false"
    >
      <el-form
        :model="addForm"
        label-width="120px"
        :rules="addFormRules"
        ref="addForm"
      >
        <img :src="src" alt="" style="width:600px;height:400px;" />
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
// import util from '../../common/js/util'
//import NProgress from 'nprogress'

import axios from 'axios'
export default {
	data() {
		return {
			filters: {
				name: ''
			},
			total:10,
			currentPage:1,
			users: [],
			src:"",
			total: 0,
			page: 1,
			file:[{
				name:""
			}],
			visable:1,
			title:"",
			title2:"",
			visable2:"",
			order2:"",
			luntan2:"",
			preImg:false,
			school:"",
			options:[{
				id:0,
				title:"否"
			},
			{
				id:1,
				title:"是"
			}],
			luntan:"",
			people:"",
			order:1,
			phone:"",
			email:"",
			value2:"",
			value:"",
			reson:"",
			biaozhu:"",
			editId:0,
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
			luntanList:[],
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
			putVisible:false

		}
	},
	methods: {
		deleteImg(index,row){
			this.$confirm('是否删除？').then(_ => {
				this.deleteImgs(index,row)
				})
				.catch(_ => {});
		},

		async deleteImgs(){
			let data = this.$api.delete("carousel/"+row.id)
			if(data.code=="01"){
				this.getUsers()
			}
		},
		upload(){
			this.$refs.file.click()

		},
		changFile(e){
			this.file = []
			this.file = e.target.files;
			console.log(this.file[0])

		},
		addImg(){
			this.editFormVisible = true;
		},
		async initList(){
			let {data} =  await this.$api.get("forum/open/list")
			this.luntanList = data.data;
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

		let {data}  = await this.$api.get("carousel/list",{
			pageNum:this.currentPage,
			pageSize:10,
			query:this.filters.name,

		})
     let list  =  data.data;
     console.log('------------',list)
		for(let i in list){
			if(list[i].isVisible){
				list[i].isVisible = "是"
			}else{
				list[i].isVisible = "否"
			}

		}
		this.users = data.data;
		this.total = data.total;
		console.log(data)

		},
	//删除
		async handleDel (index, row) {
			this.putVisible = true;
			this.luntan2 = row.forumId;
			this.order2 = row.num;
			this.title2 = row.title;
			this.visable2 = row.isVisible;
			this.editId = row.id;
		},
		//显示编辑界面
		handleEdit: function (index, row) {
			this.src = row.image;
			this.preImg = true;
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
			form.append("title",this.title)
			form.append("forumId",this.luntan)
			form.append("num",this.order)
			form.append("isVisible",this.visable)
			form.append("file",this.file[0])

			let {data} = await axios.post(this.$api.httpPath+"carousel",form)
			if(data.code=="01"){
				this.editFormVisible = false;
				this.getUsers()
			}else{
				this.$message.error(data.msg);
			}
			console.log(data)
		},
		async editChange(){
			let form = new FormData();
			form.append("title",this.title2)
			form.append("forumId",this.luntan2)
			form.append("num",this.order2)
			form.append("isVisible",0)
			form.append("file",this.file[0])

			let {data} = await axios.put(this.$api.httpPath+"carousel/"+this.editId,form)
			if(data.code=="01"){
				this.putVisible = false;
				this.getUsers()
			}else{
				this.$message.error(data.msg);
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
		this.initList();
		this.getUsers();
	}
}
</script>

<style scoped>
.tiem .el-dialog--small {
  width: 38%;
}
.el-select {
  width: 100%;
}
.el-button--small {
  padding: 9px;
}
el-submenu [class^="fa"] {
  vertical-align: baseline;
  margin-right: 10px;
}

.el-menu-item [class^="fa"] {
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
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
