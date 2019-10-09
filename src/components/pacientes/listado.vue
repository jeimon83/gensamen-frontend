<template>
  <div v-loading="loading">
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
        <el-table-column prop="birth_date" label="fecha nacimiento" />
        <el-table-column>
          <template slot-scope="scope">
            <a @click="openEditPacienteModal(scope.row)" style="color: green">Actualizar</a><br>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <router-link :to="{ name: 'Paciente', params: { id: scope.row.id } }" style="color: blue;">ver</router-link><br>
            <a @click="openContactModal(scope.row)" style="color: blue">Contactos</a>
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

  <el-dialog
    title="Nuevo Contacto"
    :visible.sync="showOpenContactModal"
    :show-close="false"
    :close-on-press-escape="false"
    :close-on-click-modal="false">
      <el-form :model="contacto" label-width="120px">
        <el-form-item label="Nombre">
            <el-input v-model="contacto.firstname"></el-input>
        </el-form-item>
        <el-form-item label="Apellido">
            <el-input v-model="contacto.lastname"></el-input>
        </el-form-item>
        <el-form-item label="Telefono">
            <el-input v-model="contacto.phone"></el-input>
        </el-form-item>
        <el-form-item label="DNI">
            <el-input v-model="contacto.document_number"></el-input>
        </el-form-item>
       <el-form-item label="Relacion">
        <el-select v-model="contacto.relationship" clearable filterable style="width: 100%;">
          <el-option value="padre">Padre</el-option>
          <el-option value="madre">Madre</el-option>
          <el-option value="hijo">Hijo/a</el-option>
          <el-option value="hermano">Hermano/a</el-option>
          <el-option value="tutor">Tutor/a</el-option>
          <el-option value="conyuge">Conyuge</el-option>
        </el-select>
      </el-form-item>
    </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeModal()">Cancelar</el-button>
        <el-button type="primary" @click="saveContact">Guardar</el-button>
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
import contactApi from '@/services/api/contact'
import { clone } from "lodash";
export default {
  name: 'listadoPacientes',
  components: {
    nuevoPaciente
  },

  data() {
    return {
      pacientes: [],
      visible: false,
      clinicaId: null,
      newPatients: false,
      showPaciente: false,
      showOpenContactModal: false,
      loading: false,
      copyPaciente: {
        firstname: "",
        lastname: "",
        document_number: "",
        gender: "",
        birth_date: ""
      },
      contacto: {
        paciente_id: "",
        firstname: "",
        lastname: "",
        phone: "",
        document_number: "",
        relationship: ""
      }
    }
  },
  created() {
    this.clinicaId = this.$route.params.id;
    this.loadListadoPacientes();
  },
  methods: {
    loadListadoPacientes() {
      this.loading = true;
      pacientesApi.getPacientes(this.clinicaId).then(response => {
        this.pacientes = response.data.patients;
      }).catch(error => {
          console.log("Error cargando pacientes", error);
        }).finally(() => {
          this.loading = false;
        });
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
        this.$message({
            message: 'El paciente se a actualizado con exito',
            type: 'success'
          });
        }).catch(error => {
          console.log(error);
          this.$message({
            message: 'Hubo un error al actualizar el paciente',
            type: 'error'
          });
        }).finally(() => {
          this.showPaciente = false;
        });
    },
    getFullName(paciente) {
      return `${paciente.firstname} ${paciente.lastname}`;
    },
    closeModal() {
      this.showOpenContactModal = false;
      this.contacto = {
        paciente_id: "",
        firstname: "",
        lastname: "",
        phone: "",
        document_number: "",
        relationship: ""
      }
    },
    goBack() {
      this.$router.push({ name: 'Clinica'});
    },
    openContactModal(paciente) {
      this.showOpenContactModal = true;
      this.currentPaciente = paciente;
    },
    saveContact() {
      this.contacto.paciente_id = this.currentPaciente.id;

      contactApi.createContact(this.currentPaciente.id, this.contacto).then(response => {
        // this.currentPaciente.contacts.push(response.data.contact);
        this.showOpenContactModal = false;
        this.contacto = {
          paciente_id: "",
          firstname: "",
          lastname: "",
          phone: "",
          document_number: "",
          relationship: ""
        }
        this.$message({
              message: 'El contacto se a guardado con exito',
              type: 'success'
            });
          }).catch(error => {
            console.log(error);
            this.$message({
              message: 'Hubo un error al guardar el contacto',
              type: 'error'
            });
          }).finally(() => {
            this.showOpenContactModal = false;
          });
      }
    }
  };
</script>