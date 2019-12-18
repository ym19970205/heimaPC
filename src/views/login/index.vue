<template>
<div class="login">
    <el-card class="login-card">
        <div class="title">
            <img src="../../assets/img/logo_index.png" alt="">
        </div>
        <el-form>
            <el-form-item >
                <el-input placeholder="请输入手机号">

                </el-input>
            </el-form-item>

            <el-form-item >
                <el-input style="width:60%"  placeholder="验证码">
                </el-input>
                 <el-button style="float:right" plain>发送验证码</el-button>
            </el-form-item>

            <el-form-item >
                <el-checkbox v-model="checked">我已阅读用户协议及隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item >
                <el-button type="primary" style="width:100%">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</div>
</template>

<script>
export default {

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
