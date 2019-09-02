<template>
	<el-form ref="form" :model="form" label-width="130px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="论坛标题(中文)">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="论坛标题(英文)">
			<el-input v-model="formEnglish.name"></el-input>
		</el-form-item>
		<el-form-item label="发起人(中文)">
			<el-input v-model="form.people"></el-input>
		</el-form-item>
		<el-form-item label="发起人(英文)">
			<el-input v-model="formEnglish.people"></el-input>
		</el-form-item>
		<el-form-item label="发起人电话">
			<el-input v-model="form.phone"></el-input>
		</el-form-item>
		
		
		<el-form-item label="发起人邮箱">
			<el-input v-model="form.email"></el-input>
		</el-form-item>
		
		<el-form-item label="申请原因(中文)">
			<el-input type="textarea" v-model="form.reson"></el-input>
		</el-form-item>
		<el-form-item label="申请原因(英文)">
			<el-input type="textarea" v-model="formEnglish.reson"></el-input>
		</el-form-item>
		
		<el-form-item label="评分标准">
			<el-radio-group v-model="form.desc">
				<el-radio label="0">通过制</el-radio>
				<el-radio label="1">评分制</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click.native="upload" style="margin-left:0px;">图片上传</el-button>
				<input type="file"  style="display:none;" ref="file" @change="changFile" accept="image/x-png,image/gif,image/jpeg,image/bmp" >
				{{file[0].name}}
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="sub">申请</el-button>
			
		</el-form-item>
	</el-form>
</template>

<script>

	export default {
		data() {
			return {
				form: {
					name: '',
					people: '',
					phone: '',
					email: '',
					reson:"",
					desc: '0'
				},
				file:[{
					name:""
				}],
				formEnglish: {
					name: '',
					people: '',
					phone: '',
					email: '',
					reson:"",
					desc: '0'
				}
			}
		},
		methods: {
			upload(){
				this.$refs.file.click()

			},
			changFile(e){
				this.file = []
				this.file = e.target.files;
				console.log(this.file[0])
				
			},
			async  sub() {
				if(this.form.name==""){
					  this.$message({
						message: '论坛标题不能为空',
						type: 'warning'
						});
					return
				}
				if(this.form.people==""){
					  this.$message({
						message: '发起人不能为空',
						type: 'warning'
						});
					return
				}
				if(this.form.phone==""){
					  this.$message({
						message: '发起人电话不能为空',
						type: 'warning'
						});
					return
				}
				if(this.form.email==""){
					  this.$message({
						message: '发起人邮箱不能为空',
						type: 'warning'
						});
					return
				}
				let form = new FormData();
				if(this.form.reson==""){
					  this.$message({
						message: '申请原因不能为空',
						type: 'warning'
						});
					return
				}
				form.append("title",this.form.name)
				form.append("sponsor",this.form.people)
				form.append("sponsorPhone",this.form.phone)
				form.append("sponsorEmail",this.form.email)
				form.append("applyReason",this.form.reson)
				form.append("scaleOfMark",this.form.desc)
				form.append("titleEn",this.formEnglish.name)
				form.append("titleEn",this.formEnglish.people)
				form.append("sponsorEn",this.formEnglish.reson)
				form.append("applyReasonEn",this.formEnglish.reson)
				form.append("image",this.file[0])
				let data = await this.$api.post("forum",form)
				if(data.data.code){
					this.$message({
						message: '申请成功',
						type: 'success'
						});
				}
				
			}
		}
	}

</script>
<style>
.el-form-item__label{
	padding-right: 9px
}
</style>
