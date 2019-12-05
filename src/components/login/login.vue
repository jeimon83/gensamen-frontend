<template>
  <div class="login-page" v-loading="loading">
    <h3>Bienvenido a Gensamen</h3>
    <el-container>
      <el-form :model="form" :rules="rules" ref="loginForm" style="width: 60%; margin: auto;">
        <el-form-item prop="email">
          <el-input type="email" placeholder="email" v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm()" style="width: 100%;" type="success">Ingresar</el-button>
        </el-form-item>
      </el-form>
    </el-container>
  </div>
</template>
<script>
import userApi from "@/services/api/auth"
export default {
  data() {
    return {
      loading: false,
      form: {
        email: "",
        password: ""
      },
        rules: {
          email: [
            { required: true, message: 'email no valido', trigger: 'blur' },
          ],
          password: [
            { required: true, message: 'password no valido', trigger: 'blur'}
          ]
        }
    };
  },
  methods: {
    submitForm() {
      this.loading = true;
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          userApi.login(this.form.email, this.form.password)
            .then(response => {
              if (response.role === 'admin')
                this.$router.push({ name: 'Users' })
              else
                this.$router.push({ name: 'Clinicas' });
            })
            .catch(error => {
              console.log("ERROR LOGIN", error);
              this.$message({
                message: error,
                type: 'error'
              });
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      })
   },
    resetForm(formEmail) {
      this.$refs[formEmail].resetFields();
    }
  }
};
</script>
<style>
  .login-page {
    padding: 30px;
    text-align: center;
    width: 50%;
    margin: auto;
  }
</style>