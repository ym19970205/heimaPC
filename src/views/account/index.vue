<template>
  <el-card>
      <bread-crumb slot="header">
      <template slot="title">
          账号信息
      </template>
      </bread-crumb>
    <!-- 表单 => 表单容器 -->
     <el-form label-width="80px" style="margin-left:50px">
       <el-form-item label="用户名">
         <el-input style="width:40%"></el-input>
       </el-form-item>
       <el-form-item label="简介">
         <el-input style="width:40%"></el-input>
       </el-form-item>
       <el-form-item label="邮箱">
         <el-input style="width:40%"></el-input>
       </el-form-item>
       <el-form-item label="手机号">
         <el-input style="width:40%" disabled=""></el-input>
       </el-form-item>
       <el-form-item>
         <el-button type="primary">保存信息</el-button>
       </el-form-item>
     </el-form>
     <!--上传组件-->
      <el-upload class="upload-img" action="" :show-file-list="false">
        <img src="../../assets/img/default.jpg" alt="">
      </el-upload>
  </el-card>
</template>

<script>
export default {

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
