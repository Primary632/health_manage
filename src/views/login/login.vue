<template >
  <el-form
    :model="form"
    status-icon
    :rules="rules"
    ref="form"
    label-width="100px"
    class="login-container"

  >
    <h3 class="login-title">系统登录</h3>
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

</template>
<script>
import request from '@/utils/request.js'
export default {

  name: 'login',
  data () {
    return {
      form: {},
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            message: '用户名长度不能小于3位',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }

        ]
      }

    }
  },
  methods: {

    login () {
      request.post('/user/login', this.form).then((res) => {
        

        if (res.code === 200) {
          this.$store.commit('clearMenu')
          this.$store.commit('setMenu', res.menu)
          this.$store.commit('setToken', res.user)
          this.$store.commit('addMenu', this.$router)
          
          alert(res.msg)
          this.$router.push('/home')
        } else if (res.code === 400) {
          alert(res.msg)
        }
      })
    }
  }
}
</script>
<style  scoped>
html{
  width:100%;
height:100%;
z-index:999;
}
.login-container{
border-radius: 15px;
background-clip: padding-box;
margin: 180px auto;
width: 350px;
padding: 35px 35px 15px 35px;
background-color: #fff;
border: 1px solid #eaeaea;
box-shadow: 0 0 24px #cac6c6;

}
.login-title{
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.login-container .login-sumbit{
margin: 10px auto 0px auto;
}
</style>
