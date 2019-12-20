<template>
    <el-row class="layout-header" type="flex" align="middle">
        <el-col class="left" :span="12">
            <i class="el-icon-s-fold"></i>
            <span>江苏传智播客教育科技股份有限公司</span>
        </el-col>
        <el-col :span="12">
            <el-row class="right" type="flex" justify="end" align="middle">
                <img src="../../assets/img/avatar.jpg" alt="">
                <el-dropdown>
                <span>crush</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人信息</el-dropdown-item>
                        <el-dropdown-item>git地址</el-dropdown-item>
                        <el-dropdown-item>退出</el-dropdown-item>

                    </el-dropdown-menu>
                </el-dropdown>
            </el-row>
        </el-col>
    </el-row>

</template>

<script>
export default {

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
