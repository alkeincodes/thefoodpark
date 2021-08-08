<template>
  <div class="login">
    <div class="logo-container">
      <img src="@/assets/the_food_park_logo.png" alt="The Food Park" />
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item prop="email">
        <el-input v-model="ruleForm.email" placeholder="Email Address"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" type="password" placeholder="Password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="isLoading" @click="submitForm('ruleForm')"
          >Login</el-button
        >
      </el-form-item>
    </el-form>
    <p class="text--danger">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      error: null,
      isLoading: false,
      ruleForm: {
        email: 'alkein@codes.com',
        password: ''
      },
      rules: {
        email: [{ required: true, message: 'Email is required', trigger: 'blur' }],
        password: [{ required: true, message: 'Password is required', trigger: 'change' }]
      }
    }
  },
  watch: {
    ruleForm: {
      handler () {
        this.error = null
      },
      deep: true
    }
  },
  methods: {
    submitForm (formName) {
      this.isLoading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios
            .post('/login', this.ruleForm)
            .then(({ data }) => {
              localStorage.setItem('token', data.token)
              this.$store.dispatch('auth/authenticate')
              this.isLoading = false
              this.$router.push({ name: data.user.role })
            })
            .catch((err) => {
              this.error = err.response.data.message
              this.isLoading = false
            })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  async mounted () {
    await this.$store.dispatch('auth/authenticate')
    if (this.$store.getters['auth/authenticated']) {
      this.$router.push({ name: this.$store.getters['auth/user'].role })
    }
  }
}
</script>
