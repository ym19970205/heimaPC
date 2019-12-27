<template>
  <div class="cover-image">
      <div @click="openDialog(index)" v-for="(item,index) in list" :key="index" class="cover-image-item">
          <img :src="item?item:defaultImg" alt="">
      </div>
      <!--放置一个对话框-->
      <el-dialog
        :visible="dialogVisible"
        @close="closeDialog">
        <select-image @selectOneImg="receiveImg"></select-image>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false, // 用来控制弹层的开关
      selectIndex: -1 // 用来存储点击的哪个图片的下标
    }
  },
  methods: {
    // 子组件传过来的：
    receiveImg (url) {
      // 把参数传给它的父组件
      // alert(this.selectIndex)
      this.$emit('selectTwoImg', url, this.selectIndex) // 再次传递 把下标传递过去
      this.closeDialog()
      // alert('接受到子组件传过来')
    },
    openDialog (index) {
      this.dialogVisible = true
      this.selectIndex = index // 记录当前点击的是哪个图片
    },
    closeDialog () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.cover-image{
    margin:20px 100px;
    display: flex;
    .cover-image-item{
        border: 1px solid #ccc;
        width: 250px;
        height: 250px;
        padding: 20px;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>
