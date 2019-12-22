<template>
<el-card v-loading="loading">
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
          <el-button @click="openOrCloseState(obj.row)" size="small" type="text">{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
          </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" align="middle" style="height:80px">
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="page.currentPage"
      @current-change="changePage"
      :page-size="page.pageSize"
      :total="page.total">
    </el-pagination>
    </el-row>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [], // 定义一个数据接收返回结果
      loading: false,
      page: { // 创建一个对象，专门存放分页信息数据
        total: 0, // 评论总条数
        pageSize: 10, // 每页显示多少条
        currentPage: 1 // 当前页码
      }
    }
  },
  methods: {
    // 页码改变事件
    changePage (newPage) {
      this.page.currentPage = newPage // 获取到了最新的页码，拿到最新的页码，我们就需要刷新页面
      // alert(newPage)
      this.getComment()
    },
    getComment () {
      this.loading = true
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(res => {
        // 把获取到的文章列表数据赋值给list数组
        this.list = res.data.results
        this.page.total = res.data.total_count
        this.loading = false
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
    },
    openOrCloseState (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您是否确定要${mess}评论吗`, '提示').then(() => {
        // 调用接口
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status } // 因为当前如果是打开 ,就要关闭 如果是关闭 就要打开
        }).then(result => {
          //  表示执行成功
          this.getComment() // 重新拉取评论管理数据
        }).catch(() => {
          debugger
        })
      })
    }
  },
  created () {
    this.getComment()
    // 直接调用接口
  }
}
</script>

<style>

</style>
