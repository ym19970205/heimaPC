<template>
<el-card v-loading="loading">
     <!--头部内容，面包屑 -->
    <bread-crumb slot="header">
    <template slot="title">
        素材管理
    </template>
    </bread-crumb>
    <!--上传 -->
    <el-row type="flex" justify="end">
      <el-upload action="" :http-request="uploadImg" :show-file-list="false">
        <el-button size="small" type="primary">上传图片</el-button>
      </el-upload>
    </el-row>

    <!--标签页 -->
     <el-tabs v-model="activeName" @tab-click="changeTab">
    <el-tab-pane label="全部" name="all">
      <div class="img-list">
        <el-card class="img-card" v-for="(item,index) in list" :key="item.id">
          <img @click="openDialog(index)" :src="item.url" alt="">
          <el-row class="operate" type="flex" align="middle" justify="space-around">
            <!--需要根据当前是否收藏的状态来决定 是否给图标颜色-->
           <i @click="collectOrCancel(item)" :style="{color:item.is_collected?'red':'#000' }" class="el-icon-star-on"></i>
           <i @click="delImg(item.id)" class="el-icon-delete-solid"></i>
          </el-row>
        </el-card>
      </div>

    </el-tab-pane>
    <el-tab-pane label="收藏" name="sc">
      <div class="img-list">
        <el-card class="img-card" v-for="item in list" :key="item.id">
          <img @click="openDialog(index)" :src="item.url" alt="">
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
      <el-dialog @opened="openEnd" :visible="dialogVisible" @close="dialogVisible=false">
         <el-carousel ref="mycarousel" indicator-position="outside">
    <el-carousel-item v-for="(item,index) in list" :key="index">
      <img style="width:100%;height:100%" :src="item.url" alt="">
    </el-carousel-item>
  </el-carousel>
      </el-dialog>
</el-card>

</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false, // 弹层显示隐藏
      loading: false,
      activeName: 'all',
      list: [], // 定义一个接受的数组
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 0

      },
      clickIndex: -1 // 点击的index
    }
  },
  methods: {
    openEnd () {
      // 此时 已经可以获取走马灯实例了 ref
      this.$refs.mycarousel.setActiveItem(this.clickIndex)
    },
    // 打开弹层
    openDialog (index) {
      this.dialogVisible = true
      this.clickIndex = index // 存储点击索引
    },
    // 删除用户图片素材
    delImg (id) {
      this.$confirm('你确定要删除此图片吗？').then(() => {
        this.$axios({
          method: 'delete',
          url: `/user/images/${id}`
        }).then(() => {
          this.getMaterial()
        })
      })
    },
    // 取消或者收藏方法
    collectOrCancel (item) {
      this.$axios({
        method: 'put',
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected // 取反，因为是收藏，所以点击需要取消收藏
        }
      }).then(res => {
        // 再去获取一下素材方法
        this.getMaterial()
      })
    },
    uploadImg (params) {
      this.loading = true // 先弹个层
      let data = new FormData()
      data.append('image', params.file) // 参数名：参数
      this.$axios({
        method: 'post',
        url: '/user/images',
        data
      }).then(res => {
        this.loading = false // 关闭弹层
        this.getMaterial()
      })
    },
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
      i {
        cursor: pointer;
      }
    }
  }
}
</style>
