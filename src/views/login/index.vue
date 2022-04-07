<template>

<div class="box">
 <h3 class="login-title">系统登录</h3>
 2131312
<div class="left">

</div>
<div class="right">
<el-form
    :model="form"
    status-icon
    :rules="rules"
    ref="form"
    label-width="100px"
    class="login-container"

  >
<el-form-item
      label="用户名"
      label-width="80px"
      prop="username"
      class="username"
    >
      <el-input
        type="input"
        v-model="form.username"
        autocomplete="off"
        placeholder="请输入账号"
      >
      </el-input>
    </el-form-item>
    <el-form-item label="密码" label-width="80px" prop="password">
      <el-input
        type="password"
        v-model="form.password"
        autocomplete="off"
        placeholder="请输入密码"
      >
      </el-input>
    </el-form-item>
    <el-form-item class="login-sumbit">
      <el-button type="primary" @click="login" class="login_name">登录</el-button>
    </el-form-item>
  </el-form>
</div>
</div>
</template>
<style scoped>
html{
  width:100%;
height:100%;
z-index:999;
}
.box{
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
</style>
<script>
export default {
  name: '',
  data () {
    return {

    }
  }
}
</script>
