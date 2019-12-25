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
        <span>共找到999999条符合条件的内容</span>
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
        <span><i class="el-icon-edit"></i>修改</span>
        <span><i class="el-icon-delete"></i>删除</span>
    </div>
    </div>

    <!--右侧div-->
    <div></div>
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
    // 改变条件
    changeCondition () {
      let params = {
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id,
        begin_pubdate: this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null,
        end_pubdate: this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
      }
      this.getArticles(params)
    },
    // 获取所有的频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then((res) => {
        this.channels = res.data.channels
      })
    },

    // 获取文章列表数据
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then((res) => {
        this.list = res.data.results
      })
    }
  },
  created () {
    this.getChannels()
    this.getArticles()
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
