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
        <el-form :model="reporte" prop="type">
          <el-form-item>
            <el-select v-model="reporte.type" style="width: 100%;" placeholder="seleccionar tipo">
              <el-option label="Internacion" value="a"></el-option>
              <el-option label="Evaluacion" value="c"></el-option>
              <el-option label="Comporamiento" value="d"></el-option>
              <el-option label="Alta Medica" value="e"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input type="textarea" :rows="2" placeholder="comentarios" v-model="reporte.comentario"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="guardarReporte">Guardar</el-button>
          </el-form-item>
        </el-form>
      </div>
  </el-drawer>
</template>
<script>
import pacientesApi from '@/services/api/pacientes';
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
      showPanel: false,
      reporte: {
        type: "",
        comentario: "",
        item_id: "",
        item_type: ""
      },
      rules: {
        type: [
          { required: true, message: 'tipo no valido', trigger: 'change' },
        ],
      }
    }
  },
  methods: {
    openPanel() {
      this.showPanel = true;
    },
    confirmClose() {
      this.showPanel = false;
    },
    guardarReporte() {
      this.loading = true;
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
      		this.reporte.item_id = this.item.id;
      		this.reporte.item_type = this.item.type;
          pacientesApi.guardarReporte(this.paciente.id, this.reporte)
          .then(response => {
            console.log("Update reporte response", response);
            this.$message({
              message: 'El reporte se guardado con exito',
              type: 'success'
            });
          })
          .catch(error => {
            console.log(error);
            this.$message({
              message: 'Hubo un error al guardar el reporte',
              type: 'error'
            });
          })
          .finally(() => {
            this.openForm = false;
          });
        }
      });
    }
  }
};
</script>

<style>
  .panel-content {
    padding: 20px;
  }

</style>