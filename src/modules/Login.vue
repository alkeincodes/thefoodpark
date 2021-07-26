<template>
  <div class="login">
    <div class="logo-container">
      <img src="@/assets/the_food_park_logo.png" alt="The Food Park">
    </div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <el-form-item prop="email">
        <el-input v-model="ruleForm.email" placeholder="Email Address"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" placeholder="Password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      ruleForm: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, message: 'Email is required', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Password is required', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('/login', this.ruleForm).then(res => {
            console.log('@res: ', res)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
