<template>
  <div class="container-wrapper" v-loading="loading">
    <el-header>
      <div class="main-title"><a @click="goBack()"><i class="el-icon-back"></i></a> Clinica {{ clinica.name }}</div>
      <div class="main-controls">
        <el-button type="primary" @click="openInternacionModal()">Ingresar Paciente</el-button>
        <router-link class="el-button el-button--primary" style="text-decoration: none;" :to="{ name: 'ClinicaPacientes', params: { id: clinica.id } }">
          Pacientes
        </router-link>
        <el-button type="success" @click="openClinicaModal()">Actualizar clinica</el-button>
      </div>
    </el-header>
    <el-main style="margin-bottom: 40px;">
      <div class="clinic-row">
        <div class="label">CUIT</div>
        <div class="value">{{ clinica.cuit }} </div>
      </div>
      <div class="clinic-row">
        <div class="label">Nro Habilitacion</div>
        <div class="value">{{ clinica.habilitation }} </div>
      </div>
      <div class="clinic-row">
        <div class="label">Camas disponibles (judicial)</div>
        <div class="value">{{ clinica.beds_judicial }} </div>
      </div>
      <div class="clinic-row">
        <div class="label">Camas disponibles (voluntario)</div>
        <div class="value">{{ clinica.beds_voluntary }} </div>
      </div>
      <el-divider/>
      <el-table :data="internaciones" style="width: 100%" v-loading="loading">
        <el-table-column label="Paciente">
          <template slot-scope="scope">
            {{ scope.row.patient.firstname }} {{ scope.row.patient.lastname }}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="tipo" />
        <el-table-column prop="begin_date" label="Inicio" />
        <el-table-column prop="end_date" label="Fin" />
        <el-table-column>
          <template slot-scope="scope">
            <router-link :to="{ name: 'Paciente', params: { id: scope.row.patient.id } }" style="color: blue;">
              ver {{ scope.row.patient.id }}
            </router-link>
            <br>
            <a @click="openEditInternacionModal(scope.row)" style="color: green;">actualizar</a><br>
            <a @click="openNewContactModal(scope.row)" style="color: blue;">nuevo contacto</a>
          </template>
        </el-table-column>
      </el-table>
    
      <el-dialog
      	title="Actualizacion de clinica"
      	:visible.sync="showClinicaModal"
      	:show-close="false"
      	:close-on-press-escape="false"
      	:close-on-click-modal="false">
          <el-form :model="editClinic" label-width="120px">
              <el-form-item label="Nombre">
                  <el-input v-model="editClinic.name"></el-input>
              </el-form-item>
              <el-form-item label="cuit">
                  <el-input v-model="editClinic.cuit"></el-input>
              </el-form-item>
              <el-form-item label="Permiso">
                  <el-input v-model="editClinic.habilitation"></el-input>
              </el-form-item>
              <el-form-item label="Camas disponibles (voluntario)">
                  <el-input-number v-model="editClinic.beds_voluntary" :min="1" :max="500"></el-input-number>
              </el-form-item>
              <el-form-item label="Camas disponibles (judicial)">
                  <el-input-number v-model="editClinic.beds_judicial" :min="1" :max="500"></el-input-number>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="closeClinicModal()">Cancelar</el-button>
            <el-button type="primary" @click="saveClinic()">Guardar</el-button>
          </span>
      </el-dialog>
      
      <nueva-internacion
      	v-if="clinica.id"
      	:clinica-id="clinica.id"
      	:open-form="showInternacionModal"
      	@close="showInternacionModal = false"
      	@finish="(data) => addInternacion(data)"/>

      <nuevo-contacto
        v-if="paciente.id"
        :paciente-id="paciente.id"
        :open-form="showNewContactModal"
        @close="showNewContactModal = false"
        @finish="(data) => addContact(data)"/>

      <!-- <nuevo-informe
        v-if="clinica.id"
        :clinica-id="clinica.id"
        :open-form="showInformeModal"
        @close="showInformeModal = false"
        @finish="(data) => addInforme(data)"/> -->
      
      <el-dialog 
        title="Actualizar Internacion"
        :visible.sync="showInternacion"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="copyInternacion" label-width="120px">
          <el-form-item label="Tipo">
            <el-input v-model="copyInternacion.type" disabled readonly/>
          </el-form-item>
          <el-form-item label="Inicio">
            <el-date-picker
              v-model="copyInternacion.begin_date"
              type="date"
              style="width: 100%;"
              placeholder="Seleccione fecha de ingreso"
              format="dd/MM/yyyy"
              value-format="MM/dd/yyyy">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="Fin Internacion">
            <el-date-picker
              v-model="copyInternacion.end_date"
              type="date"
              style="width: 100%;"
              placeholder="Seleccione fecha de egreso"
              format="dd/MM/yyyy"
              value-format="MM/dd/yyyy">
            </el-date-picker>
          </el-form-item>    
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelEditInternacion()">Cancelar</el-button>
          <el-button type="primary" @click="updateInternacion()">Guardar</el-button>
        </span>
      </el-dialog>
    </el-main>
	</div>
</template>

<script>
import clinicasApi from "@/services/api/clinicas";
import { clone } from "lodash";
import nuevaInternacion from "./nuevaInternacion";
import internacionesApi from "@/services/api/internaciones";
import nuevoInforme from "./nuevoInforme";
import nuevoContacto from "@/components/pacientes/nuevoContacto";
export default {
  name: "Clinica",
  components: { nuevaInternacion, nuevoInforme,nuevoContacto },
  data() {
    return {
      clinicaId: null,
      showClinicaModal: false,
      showInternacionModal: false,
      showInternaciones: false,
      showVerPacientes: false,
      showInternacion: false,
      showNewContactModal: false,
      loading: false,
      clinica: {
          id: "",
          name: "",
          cuit: "",
          habilitation: "",
          beds_voluntary: "",
          beds_judicial: "",
      },
      editClinic: {
          name: "",
          cuit: "",
          habilitation: "",
          beds_judicial: "",
          beds_voluntary: ""
      },
      internaciones: [],
      copyInternacion: {
        id: "",
        type: "",
        end_date: "",
        begin_date: ""
      },
      paciente: {}
    }
  },
  created() {
    this.clinicaId = this.$route.params.id;
    this.loadClinica();
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'Clinicas'});
    },
     openNewContactModal(internacion) {
      this.paciente = clone(internacion.patient)
      this.showNewContactModal = true;
    },
    openInternacionModal() {
      this.showInternacionModal = true;
    },
    openVerPacientes() {
      this.showVerPacientes = true;
    },
    openClinicaModal() {
      this.showClinicaModal = true;
      this.editClinic = clone(this.clinica)
      delete this.editClinic.id;
    },
    loadClinica() {
      this.loading = true;
      clinicasApi.getClinica(this.clinicaId).then(response => {
        this.clinica = response.data.clinic;
        this.loadInternaciones();
      }).catch(error => {
          console.log("Error cargando clinica", error);
        }).finally(() => {
          this.loading = false;
        });
    },
    addInternacion(internacion) {
      this.showInternacionModal = false;
      if (internacion) {
        this.loadInternaciones();
      }
    },
    saveClinic() {
      clinicasApi.updateClinica(this.clinica.id, this.editClinic)
        .then(response => {
          this.clinica = response.data.clinic;
          this.$message({
            message: 'La clinica se actualizo con exito',
            type: 'success'
          });
        }).catch(error => {
          console.log(error);
          this.$message({
            message: 'Hubo un error al actualizar la clinica',
            type: 'error'
          });
        }).finally(() => {
          this.openClinicModal = false;
        });
    },
    closeClinicModal() {
      this.showClinicaModal = false;
      this.editClinic = {};
    },
    loadInternaciones() {
      this.loading = true;
      internacionesApi.getInternaciones(this.clinicaId).then(response => {
        this.internaciones = response.data.internments;
      }).catch(error => {
          console.log("Error cargando internaciones", error);
        }).finally(() => {
          this.loading = false;
          })
    },
    openEditInternacionModal(internacion) {
      this.copyInternacion = clone(internacion)
      this.showInternacion = true;
    },
    cancelEditInternacion() {
      this.copyInternacion = {
        type: "",
        end_date: "",
        begin_date: ""
      }
      this.showInternacion = false;
    },
    updateInternacion() {
      let internacionId = clone(this.copyInternacion.id);
      this.copyInternacion.begin_date = new Date(this.copyInternacion.begin_date);
      this.copyInternacion.end_date = new Date(this.copyInternacion.end_date);
        
      delete this.copyInternacion.id;
      internacionesApi.updateInternacion(internacionId, this.copyInternacion).then(response => {
        console.log("Update internacion response", response);
        this.loadInternaciones();
        this.showInternacion = false;
      })
    },
    addContact(contacto) {
      console.log(contacto);
      this.paciente = {};
      this.showNewContactModal = false;
    }
  }
};
</script>
<style lang="scss">
.comment-frame {
    border-radius: 3px;
    margin: 4px 4px 12px 0;
}
.clinic-row {
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