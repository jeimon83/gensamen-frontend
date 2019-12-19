<template>
  <el-drawer 
    :width-header="true"
    :visible.sync="showPanel"
    :before-close="confirmClose" 
    size="50%" 
    :close-on-press-escape="false" 
    :close-on-click-modal="false">
      <div slot="title">Reporte</div>
      <div class="panel-content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="Nuevo Reporte" name="first">
            <el-form :model="reporte" :rules="rules" ref="reportForm">
              <el-form-item prop="type">
                <el-select v-model="reporte.type" style="width: 100%;" placeholder="seleccionar tipo">
                  <el-option label="Internacion" value="internacion"></el-option>
                  <el-option label="Evaluacion" value="evaluacion"></el-option>
                  <el-option label="Comporamiento" value="comportamiento"></el-option>
                  <el-option label="Alta Medica" value="alta_medica"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Fecha" prop="expiration_date">
                <el-date-picker
                  v-model="reporte.expiration_date"
                  type="date"
                  style="width: 100%;"
                  placeholder="Seleccione fecha de reporte"
                  format="dd/MM/yyyy"
                  value-format="MM/dd/yyyy">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="guardarReporte">Guardar</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="Reportes solicitados" name="second" v-loading="loading">
            <el-table :data="reportes" style="width: 100%;" v-loading="loading">
              <el-table-column label="#" prop="id"></el-table-column>
              <el-table-column label="Tipo" prop="type"></el-table-column>
              <el-table-column label="Creado" prop="requested_date"></el-table-column>
              <el-table-column label="Vencimiento" prop="expiration_date"></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
  </el-drawer>
</template>
<script>
import pacientesApi from '@/services/api/pacientes';
import reportesApi from '@/services/api/reportes';
import { clone } from "lodash";
export default {
  props: {
    itemType: {
    	type: String,
    	required: true
    },
    item: {
        type: Object,
        required: true
    }
  },
  data() {
    return {
      loading: false,
      showPanel: false,
      activeName: "first",
      reportes: [],
      reporte: {
        type: "",
        expiration_date: new Date(),
      },
      rules: {
        type: [
          { required: true, message: 'tipo no valido', trigger: 'change' }
        ],
        expiration_date: [
          { required: true, message: 'expiracion no puede estar en blanco', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleClick(tab) {
      console.log(tab);
      if (this.activeName == "second") {
        this.getReports()
      } else {
        this.reporte = {
          type: "",
          expiration_date: new Date()
        }
      }
    },
    openPanel() {
      this.showPanel = true;
    },
    confirmClose() {
      this.showPanel = false;
    },
    getReports() {
      reportesApi.getReportes(this.item.id).then(response => {
        this.reportes = response.data.report_requests
      })
    },
    guardarReporte() {
      this.reporte.requested_date = new Date();
      this.reporte.internment_id = this.item.id;
      reportesApi.createReporte(this.item.id, this.reporte)
        .then(response => {
          this.reportes.push(response.data.report_request);
          this.$message({
            message: 'El reporte se creo con exito',
            type: 'success'
          });
        })
        .catch(error => {
          this.$message({
            message: 'Hubo un error al crear El reporte',
            type: 'error'
          });
        })
        .finally(() => {
          this.activeName = "second";
        });
    },
  }
};
</script>

<style>
  .panel-content {
    padding: 20px;
  }

</style>