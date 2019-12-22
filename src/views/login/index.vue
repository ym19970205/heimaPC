<template>
<div class="login">
    <el-card class="login-card">
        <div class="title">
            <img src="../../assets/img/logo_index.png" alt="">
        </div>
        <el-form ref="myForm" :model="loginForm" :rules="loginRules">
            <el-form-item prop="mobile">
                <el-input placeholder="请输入手机号" v-model="loginForm.mobile">
                </el-input>
            </el-form-item>

            <el-form-item prop="code">
                <el-input v-model="loginForm.code" style="width:65%"  placeholder="验证码">

                </el-input>
                 <el-button style="float:right" plain>发送验证码</el-button>
            </el-form-item>

            <el-form-item prop="check">
                <el-checkbox v-model="loginForm.check">我已阅读用户协议及隐私条款</el-checkbox>
            </el-form-item>

            <el-form-item >
                <el-button @click="submitLogin" type="primary" style="width:100%">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: '',
        check: false
      },
      loginRules: {
        mobile: [{ required: true, message: '请输入正确的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确' }],
        code: [{ required: true, message: '请输入你的验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式不正确' }
        ],
        check: [{
          validator: function (rule, value, callback) {
            if (value) {
              callback()
            } else {
              callback(new Error('请勾选同意才能开始下一步'))
            }
          }
        }]
      }
    }
  },
  methods: {
    submitLogin () {
      this.$refs.myForm.validate(isOk => {
        if (isOk) {
        //   console.log('验证通过')(
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          }).then(res => {
            window.localStorage.setItem('user-token', res.data.token)
            this.$router.push('/home')
          })
          // .catch(() => {
          //   this.$message({ type: 'warning',
          //     message: '手机号或者验证码错误' })
          // })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login{
    background: url(../../assets/img/login_bg.jpg);
    height: 100vh;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card{
        height: 350px;
        width: 440px;
        .title{
            text-align: center;
            margin-bottom: 30px;
            img {
            height: 45px;
        }
        }
    }

}
</style>
