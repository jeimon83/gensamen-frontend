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
                    <el-button>Guardar</el-button>
                </el-form-item>
            </el-form>
        </el-main>
        <el-input type="textarea" :rows="4" placeholder="informe del paciente" v-model="textarea">
        </el-input>
        <el-cascader :options="options" clearable>tipo de internacion</el-cascader>
        <div class="block">
            <span class="demonstration">fecha de entrada</span>
            <el-date-picker v-model="value1" type="date" placeholder="fecha">
            </el-date-picker>
        </div>
        <br>
        <br>
        <br>
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
    }
};
</script>
<style>
.demo-input-label {
    display: inline-block;
    width: 130px;
}
</style>