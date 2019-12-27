<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="素材库" name="material">
      <!--外层容器-->
      <div class="select-image-list">
        <!--循环生成多个el-card-->
        <el-card v-for="item in list" :key="item.id" class="img-card">
            <!--给图片添加点击事件-->
          <img @click="clickImg(item.url)" :src="item.url" alt />
        </el-card>
      </div>
      <!--放置一个分页组件-->
      <el-row type="flex" justify="center">
          <el-pagination background layout="prev, pager, next"
          :total="page.total"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          @current-change="changePage">
          </el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload">上传图片</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material', // 默认选中是素材路
      list: [], // 定义一个接受的数组
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 0
      }
    }
  },
  methods: {
    // 图片点击事件
    clickImg (url) {
      // 给父组件传值
      this.$emit('selectOneImg', url)
    },
    // 页码点击事件
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    // 获取素材图片
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang="less" scoped>
.select-image-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 20px 0px;
  .img-card {
    width: 150px;
    height: 150px;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
