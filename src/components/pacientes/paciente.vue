<template>
    <div class="container-wrapper">
        <el-header>
            <div class="main-title">paciente {{ paciente.name }}</div>
        </el-header>
        <el-main>
            <h3> id: {{ paciente.id }} </h3>
            <h3> nombre: {{ paciente.name }}</h3>
            <h3> apellido: {{ paciente.last_name }} </h3>
            <h3> dni: {{ paciente.dni }} </h3>
            <h3> numero de paciente: {{ paciente.numero_de_paciente }} </h3>
        </el-main>
    </div>
</template>
<script>
export default {
    name: "paciente",
    data() {
        return {
            paciente: {
                id: 1,
                name: "pepe",
                last_name: "moreno",
                dni: "12.345.678",
                numero_de_paciente: "0023-19"
            }
        }
    }
};
</script>