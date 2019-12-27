<template>
  <el-card>
      <bread-crumb slot="header">
      <template slot="title">
          发布文章
      </template>
      </bread-crumb>
      <el-form :model="formData" :rules="rules" ref="formPublish" style="margin-left:50px" label-width="100px">
          <el-form-item label="标题" prop="title">
              <el-input v-model="formData.title" style="width:60%"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
              <quill-editor
              v-model="formData.content"
              style="height:300px">

              </quill-editor>
          </el-form-item>
          <el-form-item style="margin-top:120px" label="封面" prop="cover">
            <el-radio-group @change="changeType" v-model="formData.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          </el-form-item>
          <!--父传子，把image的传给子
          步骤：1.给谁传就在谁的标签上写属性    ：自定义属性名=‘父组件属性名’
                2.在子组件写props:['自定义的属性名']
                3.在子组件中使用-->
          <cover-img @selectTwoImg="receiveImg" :list='formData.cover.images'></cover-img>
          <el-form-item label="频道" prop="channel_id">
              <el-select v-model="formData.channel_id" placeholder="请选择">
                <el-option
                v-for="item in channels"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
             </el-select>
          </el-form-item>
          <el-form-item>
              <el-button @click="publishArticle(false)" type="primary">发表</el-button>
              <el-button @click="publishArticle(true)" >存入草稿</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 定义频道数据
      formData: {
        title: '', // 标题
        content: '', // 内容
        cover: { // 封面
          type: 0, // 封面类型
          images: []// 封面图片
        },
        channel_id: null
      },
      rules: {
        title: [{ required: true, message: '文章标题不能为空' },
          { min: 5,
            max: 30,
            message: '标题的长度在5到30个字符之间' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '文章频道不能为空' }]

      }
    }
  },
  watch: {
    // 处理 两个地址对应同一个组件跳转的时候 组件不销毁 但是数据没有重置的问题
    $route: function (to, from) {
      if (to.params.articleId) {
        // 如果有参数，就是修改
      } else {
        // 如果没有参数，就是发布。发布的时候需要把所有的内容清空
        this.formData = {
          title: '', // 标题
          content: '', // 内容
          cover: { // 封面
            type: 0, // 封面类型
            images: []// 封面图片
          },
          channel_id: null
        }
      }
    }
    // 'formData.cover.type': function () {
    //   if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
    //     this.formData.cover.images = [] // 无图或者自动
    //   } else if (this.formData.cover.type === 1) {
    //     this.formData.cover.images = ['']
    //   } else if (this.formData.cover.type === 3) {
    //     this.formData.cover.images = ['', '', '']
    //   }
    // }
  },
  methods: {
    receiveImg (url, index) {
      // 现在拿到的是url地址，但是要改的是数组,所以获取了下标
      // this.formData.cover.images[index] = url  //这种方法是错误的，不能保证每次都成功
      // this.formData.cover.images = this.formData.cover.images.map(function (item, i) {
      //   if (index === i) {
      //     return url
      //   }
      //   return item
      // })
      // 一行代码简写上面
      this.formData.cover.images = this.formData.cover.images.map((item, i) => i === index ? url : item)
    },
    changeType () {
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        this.formData.cover.images = [] // 无图或者自动
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      }
    },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then((res) => {
        this.channels = res.data.channels
      })
    },
    // 发布文章 发布到草稿/正式文章
    publishArticle (draft) {
      this.$refs.formPublish.validate((isOk) => {
        if (isOk) {
          // 判断是修改还是发布文章（看有没有id）
          let{ articleId } = this.$route.params
          this.$axios({
            url: articleId ? `/articles/${articleId}` : `/articles`,
            method: articleId ? 'put' : 'post',
            params: { draft },
            data: this.formData
          }).then((res) => {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.$router.push('/home/articles')
          })

        //   if (articleId) {
        //     // 如果存在调用修改
        //     this.$axios({
        //         url:`/articles/${articleId}`,
        //         params: { draft },
        //         data: this.formData,
        //         method:
        //     })
        //   } else {
        //     this.$axios({
        //       url: '/articles',
        //       method: 'post',
        //       params: { draft },
        //       data: this.formData
        //     }).then((res) => {
        //     // 提示信息
        //       this.$message({
        //         type: 'success',
        //         message: '保存成功'
        //       })
        //       // 跳转到文章列表页
        //       this.$router.push('/home/articles')
        //     })
        //   }
        //   // 如果验证通过就调用发布接口
        //   this.$axios({
        //     url: '/articles',
        //     method: 'post',
        //     params: { draft },
        //     data: this.formData
        //   }).then((res) => {
        //     // 提示信息
        //     this.$message({
        //       type: 'success',
        //       message: '保存成功'
        //     })
        //     // 跳转到文章列表页
        //     this.$router.push('/home/articles')
        //   })
        }
      })
    },
    // 通过id查询文章数据
    getArticleById (articleId) {
      this.$axios({
        url: `articles/${articleId}`
      }).then((res) => {
        this.formData = res.data
      })
    }
  },
  created () {
    this.getChannels()
    // 一进入页面就要获取文章id
    let{ articleId } = this.$route.params
    articleId && this.getArticleById(articleId) // 如果id存在 直接查询文章数据
  }
}
</script>

<style>

</style>
