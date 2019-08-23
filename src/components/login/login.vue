<template>
    <div>
        <el-form :model="form" :rules="rules" ref="loginForm" label-width="120px" class="demo-Form">
          <el-form-item prop="email">
            <el-input type="email" placeholder="email" v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submitForm()" type="success">guardar</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
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
          console.log(this.$refs.loginForm)
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formEmail) {
            this.$refs[formEmail].resetFields();
        },
    },
};
</script>