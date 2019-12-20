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
              <el-form-item label="Tipo de reporte" prop="type">
                <el-select v-model="reporte.type" style="width: 100%;" clearable placeholder="seleccionar tipo">
                  <el-option label="Internacion" value="internacion"></el-option>
                  <el-option label="Evaluacion" value="evaluacion"></el-option>
                  <el-option label="Comporamiento" value="comportamiento"></el-option>
                  <el-option label="Alta Medica" value="alta_medica"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Fecha limite de entrega" prop="expiration_date">
                <el-date-picker
                  v-model="reporte.expiration_date"
                  type="date"
                  style="width: 100%;"
                  placeholder="Seleccione fecha de reporte"
                  format="dd/MM/yyyy"
                  value-format="MM/dd/yyyy">
                </el-date-picker>
              </el-form-item>
              <el-divider/>
              <el-form-item>
                <el-button type="primary" @click="guardarReporte">Guardar</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="Reportes solicitados" name="second">
            <el-table :data="reportes" style="width: 100%;" v-loading="loading">
              <el-table-column label="#" width="60" prop="id"></el-table-column>
              <el-table-column label="Tipo" prop="type"></el-table-column>
              <el-table-column label="Creado" prop="requested_date"></el-table-column>
              <el-table-column label="Vencimiento" prop="expiration_date"></el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="sendReport(scope.row)">Enviar Reporte</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-dialog
              v-if="currentReport"
              :visible.sync="showFileModal"
              :append-to-body="true"
              title="Enviar Report">
              <p>Enviar archvo para el reporte {{ currentReport.id }}</p>
              <div>
                <el-upload
                  class="upload-demo"
                  drag
                  :action="`https://gensamen-backend-testing.herokuapp.com/report_requests/${currentReport.id}/add_report`"
                  :on-success="closeModal"
                  :on-error="errorFileAction">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                  <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
                </el-upload>
              </div>
            </el-dialog>
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
      showFileModal: false,
      activeName: "first",
      reportes: [],
      currentReport: null,
      reporte: {
        type: "",
        expiration_date: new Date(),
      },
      rules: {
        type: [
          { required: true, message: 'Tenes que seleccionar un tipo', trigger: 'change' }
        ],
        expiration_date: [
          { required: true, message: 'expiracion no puede estar en blanco', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleClick(tab) {
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
      this.loading = true;
      reportesApi.getReportes(this.item.id)
        .then(response => {
          this.reportes = response.data.report_requests
        })
        .catch(error => console.log("Error loading reports", error))
        .finally(() => this.loading = false);
    },
    sendReport(report) {
      this.currentReport = report;
      setTimeout(() => {
        this.showFileModal = true;
      }, 500)
    },
    closeModal() {
      this.showFileModal = false;
      this.currentReport = null;
    },
    errorFileAction(error) {
      console.log("Error file action", error);
      this.$message({
        message: `No se pudo enviar el archivo del reporte ${this.currentReport.id}`,
        type: 'error'
      });
      this.closeModal();
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

<style lang="scss">
  .panel-content {
    padding: 20px;
  }
  .el-upload {
    width: 100%;
    .el-upload-dragger {
      width: 100%;
    }
  }
</style>