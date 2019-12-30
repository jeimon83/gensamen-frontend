<template>
  <div>
	<el-drawer
		:visible.sync="showPanel"
    :width-header="true"
  	:before-close="confirmClose"
    size="50%">
    <div slot="title">Asesoramientos</div>
    <div class="panel-content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Nuevo Asesoramiento" name="first">
          <el-form :model="asesoramiento" :rules="rules" ref="helpForm">
          	<el-form-item label="Titulo" prop="title">
              <el-input v-model="asesoramiento.title" placeholder="Titulo">
            	</el-input>
          	</el-form-item>
          	<el-form-item>
          		<el-input
      				  type="textarea"
      				  :rows="4"
      				  placeholder="Descripcion"
      				  v-model="asesoramiento.description">
      				</el-input>
          	</el-form-item>
            <el-form-item>
              <el-button type="primary" @click="guardarAsesoramiento">Guardar</el-button>
            </el-form-item>
      		  </el-form>
        </el-tab-pane>
        <el-tab-pane label="Asesoramientos solicitados" name="second">
          <el-table :data="asesoramientos" style="width: 100%;" v-loading="loading">
            <el-table-column label="Titulo" prop="title"></el-table-column>
            <el-table-column label="Descripcion" prop="description"></el-table-column>
            <el-table-column label="Creado" prop="requested_date"></el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="openAsesoramiento(scope.row)">Ver Asesoramiento</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>  
      </el-tabs>
    </div>
  </el-drawer>

  <el-drawer
  title="Asesoramientos"
  :visible.sync="showAsesoramiento"
  :with-header="false"
  :before-close="closeAsesoramiento">
  <span>
    <div class="clinic-row">
      <div class="label">Titulo</div>
      <div class="value">{{ asesoramiento.title }}</div>
    </div>
    <div class="clinic-row">
      <div class="label">Creado</div>
      <div class="value">{{ asesoramiento.requested_date }}</div>
    </div>
    <div class="clinic-row">
      <div class="label">Internacion</div>
      <div class="value">{{ asesoramiento.internment_id }}</div>
    </div>
    <div class="clinic-row">
      <div class="label">Clinica</div>
      <div class="value">{{ asesoramiento.clinic_id }}</div>
    </div>
    <div class="clinic-row">
      <div class="label">Descripcion</div>
      <div class="value">{{ asesoramiento.description }}</div>
    </div>
  </span>
</el-drawer>

</div>
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
        showAsesoramiento: false,
        asesoramientos: [],
        activeName: "first",
  			asesoramiento: {
  				title: "",
          requested_date: "",
          internment_id: null,
          clinic_id: null,
          description: ""
  			},
    		rules: {
          title: [
            { required: true, message: 'El titulo no puede estar en blanco', trigger: 'blur' },
          ],
          description: [
            { required: true, message: 'La descripcion no puede estar en blanco', trigger: 'blur' }
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
          this.getAsesoramientos()
        } else {
          this.reporte = {
            type: "",
            expiration_date: new Date()
          }
        }
      },
      openAsesoramiento() {
        this.showAsesoramiento = true;
      },
      closeAsesoramiento() {
        this.showAsesoramiento = false;
      },
      getAsesoramientos() {
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
            this.asesoramientos.push(response.data.help_request);
            this.asesoramiento = {
              title: "",
              requested_date: "",
              internment_id: null,
              clinic_id: null,
              description: ""
            }
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
            this.loading = false;
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