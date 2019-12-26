<template>
  <el-card>
      <bread-crumb slot="header">
      <template slot="title">
          发布文章
      </template>
      </bread-crumb>
      <el-form style="margin-left:50px" label-width="100px">
          <el-form-item label="标题">
              <el-input style="width:60%"></el-input>
          </el-form-item>
          <el-form-item label="内容">
              <el-input
              type="textarea"
              :rows="4">

              </el-input>
          </el-form-item>
          <el-form-item label="封面">
            <el-radio-group v-model="radio">
            <el-radio :label="3">单图</el-radio>
            <el-radio :label="6">三图</el-radio>
            <el-radio :label="9">无图</el-radio>
            <el-radio :label="9">自动</el-radio>
          </el-radio-group>
          </el-form-item>
          <el-form-item label="频道">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                v-for="item in channels"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
             </el-select>
          </el-form-item>
          <el-form-item>
              <el-button type="primary">发表</el-button>
              <el-button>存入草稿</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: []
    }
  },
  methods: {
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
