<template>
  <el-card class="articles">
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
        <!-- {{searchForm}} -->
        </el-form-item>
        <el-form-item label="频道列表：">
            <el-select v-model="searchForm.channel_id" placeholder="请选择频道">
        <!--循环生成频道列表 -->
        <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
             </el-select>
        </el-form-item>
        <el-form-item label="时间选择：">
        <el-date-picker value-format="yyyy-MM-dd" type="daterange" v-model="searchForm.dateRange">
        </el-date-picker>
            <!-- {{searchForm.dateRange}} -->
        </el-form-item>
    </el-form>
    <el-row class="total" type="flex" align="middle">
        <span>共找到{{page.total}}条符合条件的内容</span>
    </el-row>
    <!--左侧div-->
    <div class="article-item" v-for="item in list" :key="item.id.toString()">
        <div class="left">
            <img :src="item.cover.images.length?item.cover.images[0]:defaultImg" alt="">
            <div class="info">
                <span>{{item.title}}</span>
                <el-tag :type="item.status | filterType" class='tag'>{{item.status | filterStatus}}</el-tag>
                <span class='date'>{{item.pubdate}}</span>
            </div>
        </div>
            <div class="right">
        <span @click="toModify(item.id)"><i class="el-icon-edit"></i>修改</span>
        <span @click="delMaterial(item.id)"><i class="el-icon-delete"></i>删除</span>
    </div>
    </div>
<el-row type="flex" justify="center" align="middle" style="height:60px">
  <el-pagination
  background
  layout="prev, pager, next"
  :total="page.total"
  :current-page="page.currentPage"
  :page-size="page.pageSize"
  @current-change="changPage"
  >
</el-pagination>
</el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 分页对象
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10

      },
      searchForm: {
        status: 5, // 默认应该选中全部
        channel_id: null,
        dateRange: []

      },
      channels: [], // 接收频道数据
      list: [], // 文章列表
      defaultImg: require('../../assets/img/default.jpg')
    }
  },
  // 通过watch监听三种状态
  watch: {
    searchForm: {
      deep: true,
      handler () {
        this.changeCondition()
      }
    }
  },

  // 过滤器，用来判断状态对应的值
  filters: {
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'

        default:
          break
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'

        default:
          break
      }
    }

  },
  methods: {
    // 点击修改页面，跳转到发布文章页面
    toModify (id) {
      this.$router.push(`/home/publish/${id.toString()}`)
    },
    // 删除文章
    async delMaterial (id) {
      await this.$confirm('是否要删除该文章？')
      await this.$axios({
        method: 'delete',
        url: `articles/${id.toString()}`
      })
      this.$message({
        type: 'success',
        message: '删除成功'
      })
      // 重新拉取数据
      this.getArticles()
    },
    // 改变页码事件：
    changPage (newPage) {
      this.page.currentPage = newPage // 把当前页码赋值给点击的新页码
      this.getConditionArticles()
    },
    // 三个状态 改变条件
    changeCondition () {
      this.page.currentPage = 1 // 切换时强制将页码切换为1
      this.getConditionArticles()
    },
    getConditionArticles () {
      let params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id,
        begin_pubdate: this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null,
        end_pubdate: this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
      }
      this.getArticles(params)
    },
    // 获取所有的频道
    async getChannels () {
      let res = await this.$axios({
        url: '/channels'
      })
      this.channels = res.data.channels
    },

    // 获取文章列表数据
    async getArticles (params) {
      let res = await this.$axios({
        url: '/articles',
        params
      })
      this.list = res.data.results
      this.page.total = res.data.total_count
    }
  },
  created () {
    this.getChannels()
    this.getArticles({ page: 1, per_page: 10 })
  }
}
</script>

<style lang="less" scoped>
.articles{
    .total{
        // background-color: red;
        height: 60px;
        border-bottom: 1px dashed #ccc;
    }
    .article-item{
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
        border-bottom: 1px solid #f2f3f5;
        .left{
            display: flex;
            img{
                width: 160px;
                height: 100px;
                border-radius: 4px;
            }
        }
        .info{
            height: 100px;
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .date{
                color: #999;
                font-size: 12px;
            }
            .tag{
                text-align: center;
                width: 60px;
            }
        }
    }
             .right {
              span {
                  font-size:14px;
                  margin-right: 8px;
                  cursor: pointer;
              }
          }
}
</style>
