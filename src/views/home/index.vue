<template>
  <el-container>
    <el-aside style="height:100vh;background-color:#323745;width:230px">
     <layoutAside></layoutAside>
    </el-aside>
    <el-container>
      <el-header>
       <layoutHeader></layoutHeader>
      </el-header>
      <el-main>
        内容
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutAside from '../../components/home/layout-aside'
import layoutHeader from '../../components/home/layout-header'
export default {
  components: {
    layoutAside,
    layoutHeader
  }
}
</script>
