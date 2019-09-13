<template>
  <div>
    <el-header>
      <div><a @click="goBack()"><i class="el-icon-back"></i></a>Pacientes</div>
      <el-button type="primary" @click="openNewPatientForm()">Nuevo Paciente</el-button>
    </el-header>
    <el-main>
      <el-table :data="pacientes" style="width: 100%">
        <el-table-column prop="firstname" label="Nombre" />
        <el-table-column prop="lastname" label="Apellido" />
        <el-table-column prop="document_number" label="DNI" />
        <el-table-column prop="gender" label="genero" />
        <el-table-column prop="birth_date" label="fecha de nacimiento" />
        <el-table-column>
          <template slot-scope="scope">
            <a @click="openEditPacienteModal(scope.row)">actualizar</a><br>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <el-dialog 
      title="Actualizar Paciente" 
      :visible.sync="showPaciente" 
      :show-close="false" 
      :close-on-press-escape="false" 
      :close-on-click-modal="false">
        <el-form :model="copyPaciente" label-position="top">
          <el-form-item label="Nombre">
            <el-input placeholder="nombre" v-model="copyPaciente.firstname" />
          </el-form-item>
          <el-form-item label="Apellido">
            <el-input placeholder="apellido" v-model="copyPaciente.lastname" />
          </el-form-item>
          <el-form-item label="Dni">
            <el-input placeholder="dni" v-model="copyPaciente.document_number" />
          </el-form-item>
          <el-form-item>
            <el-select placeholder="Genero" v-model="copyPaciente.gender">
              <el-option label="Hombre" value="hombre"></el-option>
              <el-option label="Mujer" value="mujer"></el-option>
              <el-option label="otro" value="otro"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Fecha de nacimiento">
            <el-date-picker
              v-model="copyPaciente.birth_date"
              type="date"
              placeholder="Pick a day">
            </el-date-picker>
           </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeModal()">Cancelar</el-button>
            <el-button type="primary" @click="updatePaciente()">Guardar</el-button>
        </span>
    </el-dialog>

    <nuevo-paciente 
      v-if="clinicaId" 
      :clinic-id="clinicaId" 
      :show-form="newPatients" 
      @close="newPatients = false;" 
      @finish="(data) => closeNewPatient(data)" />
  </div>
</template>
<script>
import pacientesApi from '@/services/api/pacientes';
import nuevoPaciente from '@/components/clinicas/nuevoPaciente';
import { clone } from "lodash";
export default {
  name: 'listadoPacientes',
  components: {
    nuevoPaciente
  },
  props: {
    openForm: {
      type: Boolean,
      required: false,
      default: () => {
         return false;
      }
    }
  },
  data() {
    return {
      pacientes: [],
      visible: false,
      clinicaId: null,
      newPatients: false,
      showPaciente: false,
      copyPaciente: {
        firstname: "",
        lastname: "",
        document_number: "",
        gender: "",
        birth_date: ""
      }
    }
  },
  created() {
    this.clinicaId = this.$route.params.id;
    this.loadListadoPacientes();
  },
  methods: {
    loadListadoPacientes() {
      pacientesApi.getPacientes(this.clinicaId).then(response => {
        this.pacientes = response.data.patients;
      })
    },
    closeNewPatient(paciente) {
      this.newPatients = false;

      if (paciente) {
        this.pacientes.push(paciente);
      }
    },
    openNewPatientForm() {
      this.newPatients = true;
    },
    openEditPacienteModal(paciente) {
      this.copyPaciente = clone(paciente)
      this.showPaciente = true;
    },
    updatePaciente() {
      let pacienteId = clone(this.copyPaciente.id);
      delete this.copyPaciente.id;
      pacientesApi.updatePaciente(pacienteId, this.copyPaciente).then(response => {
        console.log("Update paciente response", response);
        this.loadListadoPacientes();
        this.showPaciente = false;
      });
    },
    getFullName(paciente) {
      return `${paciente.firstname} ${paciente.lastname}`;
    },
    closeModal() {
      this.$emit('close');
    },
    goBack() {
      this.$router.push({ name: 'Clinica'});
    },
  }
};
</script>