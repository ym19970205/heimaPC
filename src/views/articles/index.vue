<template>
  <el-card>
      <bread-crumb slot="header">
       <template slot="title">
        内容列表
       </template>
      </bread-crumb>

<!-- 放置一个单选组  文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部-->
    <el-form style="margin-left:50px">
        <el-form-item label="文章状态：">
            <el-radio-group v-model="searchForm.status">
                <el-radio :label="5">全部</el-radio>
                <el-radio :label="0">草稿</el-radio>
                <el-radio :label="1">待审核</el-radio>
                <el-radio :label="2">审核通过</el-radio>
                <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
        {{searchForm}}
        </el-form-item>
        <el-form-item label="频道列表：">
            <el-select v-model="searchForm.channel_id" placeholder="请选择频道">
        <!--循环生成频道列表 -->
        <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
             </el-select>
        </el-form-item>
        <el-form-item label="时间选择：">
        <el-date-picker type="daterange" v-model="searchForm.dateRange">
        </el-date-picker>
            {{value}}
        </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        status: 5, // 默认应该选中全部
        channel_id: null,
        dateRange: []

      },
      channels: [] // 接收频道数据

    }
  },
  methods: {
    // 获取所有的频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then((res) => {
        this.channels = res.data.channels
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style>

</style>
