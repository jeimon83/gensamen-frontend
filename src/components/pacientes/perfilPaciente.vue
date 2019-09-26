<template>
	<div>
		<el-main style="margin-bottom: 40px;">
      <div class="patient-row">
        <div class="label">Nombre:</div>
        <div class="value">{{ paciente.firstname }} </div>
      </div>
      <div class="patient-row">
        <div class="label">Apellido:</div>
        <div class="value">{{ paciente.lastname }} </div>
      </div>
      <div class="patient-row">
        <div class="label">DNI:</div>
        <div class="value">{{ paciente.document_number }} </div>
      </div>
      <div class="patient-row">
        <div class="label">Genero:</div>
        <div class="value">{{ paciente.gender }} </div>
      </div>
      <div class="patient-row">
        <div class="label">Fecha de nacimiento:</div>
        <div class="value">{{ paciente.birth_date }} </div>
      </div>
    </el-main>
	</div>
</template>

<script>
import pacientesApi from '@/services/api/pacientes';
	export default {
		data() {
			return {
				paciente: {
        firstname: "",
        lastname: "",
        document_number: "",
        gender: "",
        birth_date: ""
      },
			}
		},
	methods: {
		loadPaciente() {
      pacientesApi.getPacientes(this.pacienteId).then(response => {
        this.paciente = response.data.patients;
      });
    }
	}
};
</script>