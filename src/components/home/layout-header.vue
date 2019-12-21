<template>
    <el-row class="layout-header" type="flex" align="middle">
        <el-col class="left" :span="12">
            <i class="el-icon-s-fold"></i>
            <span>江苏传智播客教育科技股份有限公司</span>
        </el-col>
        <el-col :span="12">
            <el-row class="right" type="flex" justify="end" align="middle">
                <img :src="userInfo.photo" alt="">
                <!-- 如果接口中没有图片时，我们需要用三元表达式来判断，并且设置默认图片 -->
                <!-- 如果想要显示后面的图片，需要将图片地址换为变量，在下面定义一个 变量：require(地址) -->
                 <!-- <img :src="!userInfo.photo?userInfo.photo:defaultImg" alt=""> -->
                <el-dropdown @command="clickbuttons">
                <span>{{userInfo.name}}</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="Info">个人信息</el-dropdown-item>
                        <el-dropdown-item command="git">git地址</el-dropdown-item>
                        <el-dropdown-item command="lgon">退出</el-dropdown-item>

                    </el-dropdown-menu>
                </el-dropdown>
            </el-row>
        </el-col>
    </el-row>

</template>

<script>
export default {
  // 定义一个用户对象
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  created () {
    // let token = localStorage.getItem('user-token')
    this.$axios({
      url: '/user/profile'
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    }).then(res => {
      this.userInfo = res.data
    //   console.log(res.data.data)
    })
  },
  methods: {
    clickbuttons (command) {
      if (command === 'Info') {

      } else if (command === 'git') {
        //   如果点击git，我们要跳到git网
        window.location.href = 'https://github.com/ym19970205/heimaPC'
      } else if (command === 'lgon') {
        //   点击退出时，我们需要注销登录信息,并且回到登录页
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    //   this.$message('触发' + command)
    }
  }
}
</script>

<style lang="less" scoped>
.layout-header{
    height: 60px;
    .left{
        font-size: 20px;
        span{
        color:#2c3e50;
        font-size: 16px;
        margin-left: 4px;
        }
    }
    .right{
        img{
            border-radius: 50%;
            height: 40px;
            width: 40px;
            margin-right: 10px;
        }
    }
}
</style>
