<template>
  <el-card>
      <bread-crumb slot="header">
      <template slot="title">
          账号信息
      </template>
      </bread-crumb>
    <!-- 表单 => 表单容器 -->
     <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="80px" style="margin-left:50px">
       <el-form-item label="用户名" prop="name">
         <el-input v-model="formData.name" style="width:40%"></el-input>
       </el-form-item>
       <el-form-item label="简介" prop="intro">
         <el-input v-model="formData.intro" style="width:40%"></el-input>
       </el-form-item>
       <el-form-item label="邮箱" prop="email">
         <el-input v-model="formData.email" style="width:40%"></el-input>
       </el-form-item>
       <el-form-item label="手机号">
         <el-input v-model="formData.mobile" style="width:40%" disabled="" ></el-input>
       </el-form-item>
       <el-form-item>
         <el-button type="primary">保存信息</el-button>
       </el-form-item>
     </el-form>

     <!--上传组件-->
      <el-upload prop="photo" class="upload-img" action="" :show-file-list="false">
        <img :src="formData.photo?formData.photo:defalutImg" alt="">
      </el-upload>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像
        email: '', // 邮箱
        mobile: '' // 手机号

      },
      defalutImg: require('../../assets/img/default.jpg'),
      rules: {

      }
    }
  },
  methods: {
    // 获取用户个人信息
    getUserinfo () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        this.formData = res.data
      })
    }
  },
  created () {
    this.getUserinfo()
  }
}
</script>

<style lang="less" scoped>
.upload-img{
  position: absolute;
  right: 240px;
  top: 170px;
  img{
    height: 200px;
    width: 200px;
    border-radius: 50%;

  }
}
</style>
