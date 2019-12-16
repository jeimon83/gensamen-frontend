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
            <a @click="openContactDrawer(scope.row)" style="color: blue">Ver Contactos</a>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <el-drawer
      :visible.sync="showContactDrawer"
      :show-close="false"
      size="50%"
      :close-on-press-escape="false">
      <div slot="title">
        Contactos
        <el-button size="small" type="primary" style="float: right;"
            @click="openContactModal(currentPaciente)">Nuevo Contacto</el-button>
      </div>
      <div style="padding: 0px 20px 20px">
        <div v-for="contacto in contactos" :key="contacto.id" class="contacto">
          <div class="contact-row">
            <div class="label">Nombre:</div>
            <div class="value">{{ contacto.firstname }} </div>
          </div>
          <div class="contact-row">
            <div class="label">Apellido:</div>
            <div class="value">{{ contacto.lastname }} </div>
          </div>
          <div class="contact-row">
            <div class="label">Telefono:</div>
            <div class="value">{{ contacto.phone }} </div>
          </div>
          <div class="contact-row">
            <div class="label">DNI:</div>
            <div class="value">{{ contacto.document_number }} </div>
          </div>
          <div class="contact-row">
            <div class="label">Relacion:</div>
            <div class="value">{{ contacto.relationship }} </div>
          </div>
        </div>
      </div>
    </el-drawer>

    <el-dialog 
      title="Actualizar Paciente" 
      :visible.sync="showPaciente" 
      :show-close="false" 
      :close-on-press-escape="false" 
      :close-on-click-modal="false">
        <el-form :model="copyPaciente" label-position="top" ref="informeForm" :rules="rulesPatient">
          <el-form-item label="Nombre" prop="firstname">
            <el-input placeholder="nombre" v-model="copyPaciente.firstname" />
          </el-form-item>
          <el-form-item label="Apellido" prop="lastname">
            <el-input placeholder="apellido" v-model="copyPaciente.lastname" />
          </el-form-item>
          <el-form-item label="Dni" prop="document_number">
            <el-input placeholder="dni" v-model="copyPaciente.document_number" />
          </el-form-item>
          <el-form-item>
            <el-select placeholder="Genero" v-model="copyPaciente.gender" prop="gender">
              <el-option label="Hombre" value="hombre"></el-option>
              <el-option label="Mujer" value="mujer"></el-option>
              <el-option label="otro" value="otro"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Fecha de nacimiento" prop="birth_date">
            <el-date-picker
              v-model="copyPaciente.birth_date"
              type="date"
              placeholder="Pick a day">
            </el-date-picker>
           </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeModalPaciente()">Cancelar</el-button>
            <el-button type="primary" @click="updatePaciente()">Guardar</el-button>
        </span>
    </el-dialog>

    <el-dialog
      title="Nuevo Contacto"
      :visible.sync="showOpenContactModal"
      :show-close="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false">
      <el-form :model="contacto" label-width="120px" ref="clinicasForm" :rules="rulesContact">
        <el-form-item label="Nombre" prop="firstname">
          <el-input v-model="contacto.firstname"></el-input>
        </el-form-item>
        <el-form-item label="Apellido" prop="lastname">
          <el-input v-model="contacto.lastname"></el-input>
        </el-form-item>
        <el-form-item label="Telefono" prop="phone">
          <el-input v-model="contacto.phone"></el-input>
        </el-form-item>
        <el-form-item label="DNI" prop="document_number">
          <el-input v-model="contacto.document_number"></el-input>
        </el-form-item>
        <el-form-item label="Relacion" prop="relationship">
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
      @finish="(data) => closeNewPatient(data)"
    />
  </div>
</template>
<script>
import pacientesApi from '@/services/api/pacientes';
import nuevoPaciente from '@/components/clinicas/nuevoPaciente';
import contactsApi from '@/services/api/contacts'
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
      showContactDrawer: false,
      showClosePacienteModal: false,
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
      },
      contactos: [],
      rulesContact: {
        firstname: [
          { required: true, message: 'Nombre no valido', trigger: 'blur' }
        ],
        lastname: [
          { required: true, message: 'apellido no valido', trigger: 'blur'}
        ],
        phone: [
          { required: true, message: 'telefono no valido', trigger: 'blur' }
        ],
        document_number: [
          { required: true, message: 'telefono no valido', trigger: 'blur' }
        ],
        relationship: [
          { required: true, message: 'telefono no valido', trigger: 'change' }
        ]
      },
      rulesPatient: {
        firstname: [
          { required: true, message: 'Nombre no valido', trigger: 'blur' }
        ],
        lastname: [
          { required: true, message: 'apellido no valido', trigger: 'blur'}
        ],
        document_number: [
          { required: true, message: 'DNI no valido', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: 'elige un genero', trigger: 'change' }
        ],
        birth_date: [
          { required: true, message: 'elige tu fecha de nacimiento', trigger: 'change' }
        ]
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
        console.log(response)
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
    openContactDrawer(paciente) {
      this.currentPaciente = paciente;
      this.contactos = [];
      this.$nextTick(() => {
        this.showContactDrawer = true;
        this.loadContacts();        
      });
    },
    loadContacts() {
      this.contactsLoading = true;
      contactsApi.getContacts(this.currentPaciente.id).then(response => {
        console.log(response)
        this.contactos = response.data.contacts;
      }).catch(error => {
        console.log("error cargando contactos", error);
      }).finally(() => {
        this.contactsLoading = false;
      });
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
    closeModalPaciente() {
      this.showClosePacienteModal = false;
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
      };
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
      this.loading = true;
      this.$refs.clinicasForm.validate((valid) => {
        if (valid) { 
          contactsApi.createContact(this.currentPaciente.id, this.contacto)
            .then(response => {
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
            })
            .catch(error => {
              console.log(error);
              this.$message({
                message: 'Hubo un error al guardar el contacto',
                type: 'error'
              });
            })
            .finally(() => {
              this.showOpenContactModal = false;
            });
        }
      });
    }
  }
};
</script>

<style lang="scss">
.el-drawer__body {
  overflow-y: scroll;
}
.contacto {
  border-bottom: solid 1px #888;
  margin-bottom: 10px;
  padding-bottom: 10px;
  .contact-row {
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
}
</style>