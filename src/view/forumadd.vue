<template>
	<el-form ref="form" :model="form" label-width="130px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="论坛标题(中文)">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="论坛标题(英文)">
			<el-input v-model="formEnglish.name"></el-input>
		</el-form-item>
		<el-form-item label="负责人(中文)">
			<el-input v-model="form.people"></el-input>
		</el-form-item>
		<el-form-item label="负责人(英文)">
			<el-input v-model="formEnglish.people"></el-input>
		</el-form-item>
		<el-form-item label="负责人电话">
			<el-input v-model="form.phone"></el-input>
		</el-form-item>
		
		
		<el-form-item label="负责人邮箱">
			<el-input v-model="form.email"></el-input>
		</el-form-item>
		
		<el-form-item label="申请原因(中文)">
			<el-input type="textarea" v-model="form.reson"></el-input>
		</el-form-item>
		<el-form-item label="申请原因(英文)">
			<el-input type="textarea" v-model="formEnglish.reson"></el-input>
		</el-form-item>
		<el-form-item label="论坛地点（中文）">
					<el-input v-model="venue" ></el-input>
				</el-form-item>
				 <el-form-item label="论坛地点（英文）">
					<el-input v-model="venueEn" ></el-input>
				</el-form-item>
				 <el-form-item label="举办日期">
					 <el-date-picker
					v-model="startTime"
					type="daterange"
					align="right"
					unlink-panels
					:editable='false'
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					value-format="yyyy-MM-dd"
					format="yyyy 年 MM 月 dd 日">
						</el-date-picker>
				</el-form-item>
	
		<el-form-item label="博论展示图">
			<el-button type="primary" @click.native="upload" style="margin-left:0px;">图片上传</el-button>
			<img v-show="src!=''" :src="src" alt="" style="width:300px;height:200px;border:1px solid #ccc;">
				<input type="file"  style="display:none;" ref="file" @change="changFile" accept="image/x-png,image/gif,image/jpeg,image/bmp" >
				{{file[0].name}}
		</el-form-item>
		<div style="margin-left:60px;margin-bottom:20px">
			图片大小不超过5M，图片高度宽度比例为2:3
		</div>
		<el-form-item>
			<el-button type="primary" @click="sub">申请</el-button>
			
		</el-form-item>
	</el-form>
</template>

<script>
import axios from 'axios'
	export default {
		data() {
			return {
				venue:"",
				venueEn:"",
				startTime:"",
				src:"",
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
				this.src = window.URL.createObjectURL(this.file[0])
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
				form.append("venue",this.venue)
				form.append("venueEn",this.venueEn)
				form.append("forumOpenTime",this.startTime[0])
				form.append("forumCloseTime",this.startTime[1])
				//form.append("titleEn",this.formEnglish.people)
				form.append("sponsorEn",this.formEnglish.reson)
				form.append("applyReasonEn",this.formEnglish.reson)
				form.append("image",this.file[0])
				let data = await axios.post("http://39.106.77.121:8086/forum/apply",form)
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
