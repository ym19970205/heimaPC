<template>
<el-card>
    <bread-crumb slot="header">
        <template slot="title">
            评论管理
        </template>
    </bread-crumb>
    <el-table :data="list">
      <el-table-column prop="title" label="标题" width="500"></el-table-column>
      <el-table-column :formatter="formatterBoolean" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
          <template slot-scope="obj">

          <el-button size="small" type="text">修改</el-button>
          <el-button size="small" type="text">{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
          </template>
      </el-table-column>
    </el-table>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [] // 定义一个数据接收返回结果
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(res => {
        // 把获取到的文章列表数据赋值给list数组
        this.list = res.data.results
      })
    },
    // 定义一个格式化的函数
    formatterBoolean (row, column, cellValue, index) {
      // row 当前行数据
      // column 当前列信息
      // cellValue 当前单元格的值
      // index 索引
    //   有多少条数据就执行多少次formatter
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>

</style>
