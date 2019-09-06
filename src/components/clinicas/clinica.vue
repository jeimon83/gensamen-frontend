<template>
  <div class="container-wrapper">
    <el-header style="position: absolute; top: 0; width: 100%;">
      <div class="main-title">Clinica {{ clinica.name }}</div>
      <div class="main-controls">
        <el-button type="primary" @click="openInternacionModal()">Ingresar Paciente</el-button>
        <!-- <el-button type="primary" @click="openInformeModal()">Solicitar informe</el-button> -->
        <el-button type="success" @click="openClinicaModal()">Actualizar clinica</el-button>
      </div>
    </el-header>
    <el-main style="margin-bottom: 40px;">
      <h3> id: {{ clinica.id }} </h3>
      <p> nombre: {{ clinica.name }}</p>
      <p> cuit: {{ clinica.cuit }} </p>
      <p> habilitacion: {{ clinica.habilitation }} </p>
      <p> camas disponibles (judicial): {{ clinica.beds_judicial }} </p>
      <p> camas disponibles (voluntario): {{ clinica.beds_voluntary }} </p>
      <el-divider/>
      <el-table :data="internaciones" style="width: 100%">
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
            <a @click="openEditInternacionModal(scope.row)">ver/actualizar</a>
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
import internacionesApi from "@/services/api/internaciones"
export default {
  name: "Clinica",
  components: { nuevaInternacion },
  data() {
    return {
      clinicaId: null,
      showClinicaModal: false,
      showInternacionModal: false,
      showInternaciones: false,
      showInformeModal: false,
      showInternacion: false,
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
      }
    }
  },
  created() {
    this.clinicaId = this.$route.params.id;
    this.loadClinica();
  },
  methods: {
    openInternacionModal() {
      this.showInternacionModal = true;
    },
    openInformeModal() {
      this.showInformeModal = true;
    },
    openClinicaModal() {
      this.showClinicaModal = true;
      this.editClinic = clone(this.clinica)
      delete this.editClinic.id;
    },
    loadClinica() {
      clinicasApi.getClinica(this.clinicaId).then(response => {
        this.clinica = response.data.clinic;
        this.loadInternaciones();
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
      internacionesApi.getInternaciones(this.clinicaId).then(response => {
        this.internaciones = response.data.internments;
      });
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
    }
  }
};
</script>
<style>
.comment-frame {
    border-radius: 3px;
    margin: 4px 4px 12px 0;
}
</style>