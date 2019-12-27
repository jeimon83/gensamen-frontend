<template>
	<el-drawer
		:visible.sync="showPanel"
    :width-header="true"
  	:before-close="confirmClose"
    size="50%">
    <div slot="title">Asesoramientos</div>
    <div class="panel-content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Nuevo Reporte" name="first">
          <el-form :model="asesoramiento" :rules="rules" ref="helpForm">
          	<el-form-item label="tipo de asesoramiento" prop="type">
              <el-select v-model="asesoramiento.type" style="width: 100%;" placeholder="seleccionar tipo">
                <el-option label="a" value="a"></el-option>
                <el-option label="b" value="b"></el-option>
            	</el-select>
          	</el-form-item>
          	<el-form-item>
          		<el-input
      				  type="textarea"
      				  :rows="2"
      				  placeholder="comentarios"
      				  v-model="asesoramiento.comentario">
      				</el-input>
          	</el-form-item>
            <el-form-item>
              <el-button type="primary" @click="guardarAsesoramiento">Guardar</el-button>
            </el-form-item>
      		  </el-form>
        </el-tab-pane>
        <el-tab-pane label="Asesoramientos solicitados" name="second">
          <el-table :data="asesoramientos" style="width: 100%;" v-loading="loading">
            <el-table-column label="#" width="60" prop="id"></el-table-column>
            <el-table-column label="Tipo" prop="type"></el-table-column>
            <el-table-column label="Creado" prop="requested_date"></el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="sendAsesoramientos(scope.row)">Enviar Asesoramiento</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>  
      </el-tabs>
    </div>
  </el-drawer>
</template>

<script>
import asesoramientosApi from '@/services/api/asesoramientos';

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
        loading: false,
        asesoramientos: [],
        activeName: "first",
  			asesoramiento: {
  				type: "",
          requested_date: "",
          internment_id: null,
          clinic_id: null,
          comentarios: ""
  			},
    		rules: {
          type: [
            { required: true, message: 'tipo no valido', trigger: 'change' },
          ],
          expiration_date: [
            { required: true, message: 'expiracion no puede estar en blanco', trigger: 'change' }
          ]
        }
      };
		},

		methods: {
      openPanel() {
        this.showPanel = true;
      },
      confirmClose() {
        this.showPanel = false;
      },
      handleClick(tab) {
        if (this.activeName == "second") {
          this.getAsesoramiento()
        } else {
          this.reporte = {
            type: "",
            expiration_date: new Date()
          }
        }
      },
      sendAsesoramientos(report) {
        this.currentReport = report;
        setTimeout(() => {
          this.showFileModal = true;
        }, 500)
      },
      getAsesoramiento() {
        this.loading = true;
        if (this.itemType === 'clinica')
          asesoramientosApi.getAsesoramientosByClinica(this.item.id)
          .then(response => {
            this.asesoramientos = response.data.help_requests
          })
          .catch(error => console.log(error))
          .finally(() => this.loading = false)
        else
          asesoramientosApi.getAsesoramientosByInternacion(this.item.id)
          .then(response => {
            this.asesoramientos = response.data.help_requests
          })
          .catch(error => console.log(error))
          .finally(() => this.loading = false)
      },
      guardarAsesoramiento() {
        this.loading = true;
        this.asesoramiento.requested_date = new Date();

        if (this.itemType === 'clinica')
          this.asesoramiento.clinic_id = this.item.id;
        else
          this.asesoramiento.internment_id = this.item.id;
        
        asesoramientosApi.createAsesoramiento(this.asesoramiento)
          .then(response => {
            this.asesoramiento.push(response.data.asesoramientos);
            this.$message({
              message: 'El asesoramiento se creo con exito',
              type: 'success'
            });
          })
          .catch(error => {
            this.$message({
              message: 'Hubo un error al crear el asesoramiento',
              type: 'error'
            });
          })
          .finally(() => {
            this.activeName = "second";
          });
      }
    }
  };
</script>

<style>
  .panel-content {
    padding: 20px;
  }
  .el-drawer__header {
    font-size: 1.25em !important;
    margin-bottom: 15px !important;
  }
</style>