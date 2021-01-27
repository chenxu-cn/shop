<template>
  <div class="Login">
    <div class="box">
      <!-- 头像区域 -->
      <div class="tou">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 表单区域 -->
      <el-form
        :model="form"
        :rules="rules"
        ref="Formref"
        label-width="0px"
        class="login_from"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            prefix-icon="el-icon-s-custom"
            type="username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            prefix-icon="el-icon-unlock"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //表单提交对象
      form: {
        username: 'admin',
        password: '123456'
      },
      //验证规则
      rules: {
        //用户名验证是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        //密码验证是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    //重置按钮
    resetForm() {
      console.log(this)
      //api提供的重置属性resetFields
      this.$refs.Formref.resetFields()
    },
    //登录按钮
    login() {
      this.$refs.Formref.validate(async valoid => {
        console.log(valoid)
        if (!valoid) return
        const { data: res } = await this.$http.post('login', this.form)
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error('登录失败！')
        this.$message({
          message: '登录成功',
          type: 'success',
          duration: 1000
        })
        //存token
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  },
  created() {},
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  components: {}
}
</script>

<style lang="scss" scoped>
.Login {
  background: #2b4b6b;
  height: 100%;
}
.box {
  width: 450px;
  height: 300px;
  background: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .tou {
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_from {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: center;
}
</style>
