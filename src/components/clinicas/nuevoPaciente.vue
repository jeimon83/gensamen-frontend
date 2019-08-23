<template>
    <div class="container-wrapper">
        <el-header>
            <div class="main-title">Nuevo Paciente</div>
        </el-header>
        <el-main>
            <el-form>
                <el-form-item label="Nombre">
                    <el-input placeholder="nombre" v-model="input1" />
                </el-form-item>
                <el-form-item label="Apellido">
                    <el-input placeholder="apellido" v-model="input2" />
                </el-form-item>
                <el-form-item label="Dni">
                    <el-input placeholder="dni" v-model="input3" />
                </el-form-item>
                <el-form-item label="Numero de paciente">
                    <el-input placeholder="numero de paciente" v-model="input4" />
                </el-form-item>
                <el-form-item>
                    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                        <a-button type="primary" html-type="guardarPaciente">
                            Submit
                        </a-button>
                    </a-form-item>
                </el-form-item>
            </el-form>
        </el-main>
    </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            input1: '',
            input2: '',
            input3: '',
            input4: '',
            textarea: '',
            value1: '',
            options: [{
                value: 'voluntario',
                label: 'judicial',
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: 'Today',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, ]
                }
            }]
        }
    },
    methods: {
    guardarPaciente(e) {
			e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
        	extend(this.nuevoPaciente, values.nuevoPaciente)
          this.agregarPaciente(this.nuevoPaciente);
					this.$router.push({ name: 'Pacientes' });	
        }
      });
    }
  }
};
</script>
<style>
.demo-input-label {
    display: inline-block;
    width: 130px;
}
</style>