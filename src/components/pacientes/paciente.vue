<template>
  <div class="container-wrapper" v-loading="loading">
    <el-header>
      <div class="main-title">
        <a @click="goBack()"><i class="el-icon-back"></i></a>Paciente {{ paciente.firstname }} {{ paciente.lastname }}</a>
      </div>
      <div>
        <el-button type="primary" size="small" @click="openModalReporte()" icon="el-icon-document">Solicitar Reporte</el-button>
        <el-button type="primary" size="small" @click="openModalAsesoramientos()" icon="el-icon-chat-line-round">Solicitar asesoramientos</el-button>
      </div>
    </el-header>
    <el-main>
      <div class="patient-row">
        <div class="label">Nombre:</div>
        <div class="value"> {{ paciente.firstname }}</div>
      </div>
      <div class="patient-row">
        <div class="label">Apellido:</div>
        <div class="value">{{ paciente.lastname }}</div>
      </div>
      <div class="patient-row">
        <div class="label">Dni:</div>
        <div class="value">{{ paciente.document_number }}</div>
      </div>
      <div class="patient-row">
        <div class="label">Numero de paciente: </div>
        <div class="value">{{ paciente.birth_date }}</div>
      </div>
      <el-divider/>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <h3>Internaciones</h3>
            <div class="internacion">
              <el-table :data="internaciones" style="width: 100%" v-loading="loading">
                <el-table-column prop="type" label="tipo" />
                <el-table-column prop="begin_date" label="Inicio" />
                <el-table-column prop="end_date" label="Fin" />
              </el-table>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <h3>Contactos del Paciente</h3>
            <div clss="contactos">
              <el-table :data="contactos" style="width: 100%" v-loading="loading">
                <el-table-column prop="first_name" label="Nombre" />
                <el-table-column prop="last_name" label="Apellido" />
                <el-table-column prop="number" label="Numero" />
                <el-table-column prop="dni" label="DNI" />
                <el-table-column prop="relation" label="Relacion" />
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-main>
  
    <reporte 
      v-if="paciente.id"
      :item="paciente"
      ref="reportePanel"
      item-type="paciente"/>

    <asesoramiento
      v-if="paciente.id"
      ref="asesoramientoPanel"
      :item="paciente"
      item-type="Patient"/>
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
        this.loadInternaciones()
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
      internacionesApi.getInternacionesPaciente(this.pacienteId).then(response => {
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
      this.$refs.reportePanel.openPanel();
    },
    openModalAsesoramientos() {
      this.$refs.asesoramientoPanel.openPanel();
    },
    addContact(contacto) {
      console.log(contacto);
      this.paciente = {};
    }
  }
};
</script>

<style lang="scss">
  .internacion {
    padding: 10px 10px 10px 20px;
  }

  .contactos {
    padding: 10px 10px 10px 20px;
  }
  .patient-row {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    font-size: 1.1em;
    .label {
      flex: 2;
      padding: 5px 0px;
      font-weight: bold;
    }
    .value { 
      border-bottom: dashed #ddd 1px;
      flex: 3;
      padding: 5px 10px;
    }
  }
</style>