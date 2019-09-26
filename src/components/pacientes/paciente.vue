<template>
    <div class="container-wrapper">
        <el-header>
            <div class="main-title"><a @click="goBack()"><i class="el-icon-back"></i></a>paciente {{ paciente.firstname }} {{ paciente.lastname }}</div>
        </el-header>
        <el-main>
            <h3> nombre: {{ paciente.firstname }}</h3>
            <h3> apellido: {{ paciente.lastname }} </h3>
            <h3> dni: {{ paciente.document_number }} </h3>
            <h3> numero de paciente: {{ paciente.birth_date }} </h3>
        </el-main>
    </div>
</template>
<script>
import pacientesApi from '@/services/api/pacientes';
export default {
    name: "paciente",
    data() {
      return {
        paciente: {
          firstname: "",
          lastname: "",
          document_number: "",
          gender: "",
          birth_date: ""
        },
        pacienteId: null
      }
    },
    created() {
    this.pacienteId = this.$route.params.id;
    this.loadPaciente();
  },
    methods: {
      loadPaciente() {
      pacientesApi.getPaciente(this.pacienteId).then(response => {
        this.paciente = response.data.patient;
      })
    },
     goBack() {
      this.$router.push({ name: 'Clinica', params:{ id: this.paciente.clinic.id }});
    }
  }
};
</script>