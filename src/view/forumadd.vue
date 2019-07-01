<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="论坛标题">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="发起人">
			<el-input v-model="form.people"></el-input>
		</el-form-item>
		<el-form-item label="发起人电话">
			<el-input v-model="form.phone"></el-input>
		</el-form-item>
		<el-form-item label="发起人邮箱">
			<el-input v-model="form.email"></el-input>
		</el-form-item>
		<el-form-item label="申请原因">
			<el-input type="textarea" v-model="form.reson"></el-input>
		</el-form-item>
	
		
		<el-form-item label="评分标准">
			<el-radio-group v-model="form.desc">
				<el-radio label="0">通过制</el-radio>
				<el-radio label="1">评分制</el-radio>
			</el-radio-group>
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
				}
			}
		},
		methods: {
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
				if(this.form.reson==""){
					  this.$message({
						message: '申请原因不能为空',
						type: 'warning'
						});
					return
				}
				let data = await this.$api.post("forum",{
					title:this.form.name,
					sponsor:this.form.people,
					sponsorPhone:this.form.phone,
					sponsorEmail:this.form.email,
					applyReason:this.form.reson,
					scaleOfMark:this.form.desc
				})
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
