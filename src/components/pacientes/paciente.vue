<template>
    <div class="container-wrapper" v-loading="loading">
        <el-header>
            <div class="main-title"><a @click="goBack()"><i class="el-icon-back"></i></a>Paciente {{ paciente.firstname }} {{ paciente.lastname }}</div>
            <div>
            <el-button type="primary" size="small" @click="openModalReporte()">Solicitar Reporte</el-button>
            <el-button type="primary" size="small" @click="openModalAsesoramientos()">Solicitar asesoramientos</el-button>
            </div>
        </el-header>
        <el-main>
            <h3> Nombre: {{ paciente.firstname }}</h3>
            <h3> Apellido: {{ paciente.lastname }} </h3>
            <h3> Dni: {{ paciente.document_number }} </h3>
            <h3> Numero de paciente: {{ paciente.birth_date }} </h3>
        </el-main>
        <h3>Internaciones</h3>
        <el-table :data="internaciones" style="width: 50%" v-loading="loading">
        </el-table-column>
        <el-table-column prop="type" label="tipo" />
        <el-table-column prop="begin_date" label="Inicio" />
        <el-table-column prop="end_date" label="Fin" />
      </el-table>
      <h3>Contactos del Paciente</h3>
      <el-table :data="contactos" style="width: 50%" v-loading="loading">
        </el-table-column>
        <el-table-column prop="first_name" label="Nombre" />
        <el-table-column prop="last_name" label="Apellido" />
        <el-table-column prop="number" label="Numero" />
        <el-table-column prop="dni" label="DNI" />
        <el-table-column prop="relation" label="Relacion" />
      </el-table>

      <reporte 
        v-if="paciente.id"
        :item="paciente"
        :open-form="showReporte"
        item-type="paciente"
        @close="showReporte = false"/>

      <asesoramiento
        v-if="paciente.id"
        :open-form="showAsesoramiento"
        :item="paciente"
        item-type="Patient"
        @close="showAsesoramiento = false"/>

    </div>
</template>
<script>
import pacientesApi from '@/services/api/pacientes';
import internacionesApi from '@/services/api/internaciones';

import asesoramiento from '@/components/shared/asesoramiento';
import reporte from '@/components/shared/reporte';

export default {
    name: "paciente",
    components: {
      reporte, asesoramiento
    },
    data() {
      return {
        loading: false,
        showInternacion: false,
        showReporte: false,
        showAsesoramiento: false,
        internaciones: [],
        contactos: [],
        paciente: {
          firstname: "",
          lastname: "",
          document_number: "",
          gender: "",
          birth_date: ""
        },
        pacienteId: null,
        Internacion: {
          type: "",
          end_date: "",
          begin_date: ""
      },
      }
    },
    created() {
    this.pacienteId = this.$route.params.id;
    this.loadPaciente();
  },
    methods: {
      loadPaciente() {
        this.loading = true
      pacientesApi.getPaciente(this.pacienteId).then(response => {
        this.paciente = response.data.patient;
      }).catch(error => {
          console.log("Error cargando clinicas", error);
        }).finally(() => {
          this.loading = false;
        });
    },
     goBack() {
      this.$router.push({ name: 'Clinica', params:{ id: this.paciente.clinic.id }});
    },
    loadInternaciones() {
      this.loading = true;
      internacionesApi.getInternacion(this.pacienteId).then(response => {
        this.internaciones = response.data.internments;
      }).catch(error => {
          console.log("Error cargando internaciones", error);
        }).finally(() => {
          this.loading = false;
          })
    },
    addInternacion(internacion) {
      this.showInternacion = false;
      if (internacion) {
        this.loadInternaciones();
      }
    },
    openModalReporte() {
      this.showReporte = true;
    },
    openModalAsesoramientos() {
      this.showAsesoramiento = true;
    },
    addContact(contacto) {
      console.log(contacto);
      this.paciente = {};
      this.openModalReporte = false;
    }
  }
};
</script>