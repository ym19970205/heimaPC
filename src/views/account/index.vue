<template>
  <el-card v-loading="loading">
      <bread-crumb slot="header">
      <template slot="title">
          账号信息
      </template>
      </bread-crumb>
    <!-- 表单 => 表单容器 -->
     <el-form :model="formData" :rules="rules" ref="myForm" label-width="80px" style="margin-left:50px">
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
         <el-button @click="saveInfo" type="primary">保存信息</el-button>
       </el-form-item>
     </el-form>

     <!--上传组件-->
      <el-upload :http-request="uploadImg" prop="photo" class="upload-img" action="" :show-file-list="false">
        <img :src="formData.photo?formData.photo:defalutImg" alt="">
      </el-upload>
  </el-card>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      loading: false, // 定义弹层变量
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像
        email: '', // 邮箱
        mobile: '' // 手机号

      },
      defalutImg: require('../../assets/img/default.jpg'),
      rules: {
        name: [{ required: true, message: '用户名不能为空' },
          { min: 1, max: 7, message: '用户名应该在1-7个字符之间' }],
        email: [{ required: true, message: '邮箱不能为空' }, {
          pattern: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
          message: '邮箱格式不正确'
        }]

      }
    }
  },
  methods: {
    // 上传图片信息
    uploadImg (params) {
      this.loading = true
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(res => {
        this.loading = false
        this.formData.photo = res.data.photo
        eventBus.$emit('updateUserInfo')
      })
    },
    // 保存信息
    saveInfo () {
      this.$refs.myForm.validate().then(res => {
        this.$axios({
          url: '/user/profile',
          method: 'patch',
          data: this.formData
        }).then(res => {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          // 认为保存成功 => 通知header组件 更新信息
          eventBus.$emit('updateUserInfo')
        })
      })
    },
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
