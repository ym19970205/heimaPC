<template>
<el-card>
    <bread-crumb slot="header">
    <template slot="title">
        素材管理
    </template>
    </bread-crumb>
     <el-tabs v-model="activeName" @tab-click="changeTab">
    <el-tab-pane label="全部" name="all">
      <div class="img-list">
        <el-card class="img-card" v-for="item in list" :key="item.id">
          <img :src="item.url" alt="">
          <el-row class="operate" type="flex" align="middle" justify="space-around">
           <i class="el-icon-star-on"></i>
           <i class="el-icon-delete-solid"></i>
          </el-row>
        </el-card>
      </div>

    </el-tab-pane>
    <el-tab-pane label="收藏" name="sc">
      <div class="img-list">
        <el-card class="img-card" v-for="item in list" :key="item.id">
          <img :src="item.url" alt="">
        </el-card>
      </div>
    </el-tab-pane>
  </el-tabs>
  <!-- 公共的分页组件-->
      <el-row type="flex" justify="center">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page.total"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          @current-change="changePage"
          >
        </el-pagination>
      </el-row>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [], // 定义一个接受的数组
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 0

      }
    }
  },
  methods: {
    // 改变页码的方法
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    // 切换页签的方法
    changeTab () {
      this.page.currentPage = 1 // 切换页签时，我们需要把组件中的页码切换到第一页
      this.getMaterial() // 当点击这个改变事件的时候，触发收藏与全部布尔值的判断
    },
    // 获取素材的方法
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          // collect: false // 传入false是获取所有的数据，传入true是获取收藏的数据
          collect: this.activeName === 'sc',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then((res) => {
        this.list = res.data.results // 获取图片信息
        this.page.total = res.data.total_count
        // this.page.currentPage = res.data.page
        // this.page.pageSize = res.data.per_page
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.img-list{
  display: flex;
  flex-wrap: wrap;
  .img-card{
    width: 200px;
    height: 220px;
    margin: 20px 25px;
    position: relative;
    img{
      width: 100%;
      height: 100%;
    }
    .operate{
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      font-size: 20px;
      height: 36px;
      background-color: #f4f5f6;
    }
  }
}
</style>
