<template>
<el-card>
    <bread-crumb slot="header">
        <template slot="title">
            评论管理
        </template>
    </bread-crumb>
    <el-table>
      <el-table-column label="标题" width="500"></el-table-column>
      <el-table-column label="评论状态"></el-table-column>
      <el-table-column label="总评论数"></el-table-column>
      <el-table-column label="粉丝评论数"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
</el-card>
</template>

<script>
export default {

}
</script>

<style>

</style>
