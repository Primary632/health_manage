<template>
  <el-container >
    <el-aside width="auto" >
      <CommonAside/>
    </el-aside>
    <el-container>
      <el-header>
        <CommonHeader />
      </el-header>
      <CommonTag/>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import CommonAside from '.././components/CommonAside'//引入侧边栏ConmmonAside
import CommonHeader from '.././components/CommonHeader.vue'
import CommonTag from '.././components/CommonTag.vue'
export default {
  name:'Home',
  components:{
    CommonAside,
    CommonHeader,
    CommonTag
  },
  data(){
    return {}
  }
}
</script>
<style lang="less" scoped>

.el-header{
  background: black;

}
.el-main{
  padding-top: 0;
}

</style>
