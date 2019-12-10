<template>
	<el-drawer
		:visible.sync="showPanel"
    :width-header="true"
  	:before-close="confirmClose"
    size="50%">
    <div slot="title">Asesoramientos</div>
    <div class="panel-content">
      <el-form :model="asesoramiento">
      	<el-form-item>
          <el-select v-model="asesoramiento.type" style="width: 100%;" prop="type" placeholder="seleccionar tipo">
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
    </div>
  </el-drawer>
</template>

<script>
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
  			asesoramiento: {
  				type: "",
  				comentario: ""
  			},
    		rules: {
          type: [
            { required: true, message: 'tipo no valido', trigger: 'change' },
          ],
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
      guardarAsesoramiento() {
      	this.loading = true;
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.reporte.item_id = this.item.id;
            this.reporte.item_type = this.item.type;
            pacientesApi.guardarAsesoramiento(this.paciente.id, this.asesoramiento)
              .then(response => {
                console.log("Update asesoramiento response", response);
                this.$message({
                  message: 'El asesoramiento se guardado con exito',
                  type: 'success'
                });
              })
              .catch(error => {
                console.log(error);
                this.$message({
                  message: 'Hubo un error al guardar el sesoramiento',
                  type: 'error'
                });
              })
              .finally(() => {
                this.loading = false;
              });
          }
  		  })
      }
    }
	};
</script>

<style>
  .panel-content {
    padding: 10px;
  }
  .el-drawer__header {
    font-size: 1.25em !important;
    margin-bottom: 15px !important;
  }
</style>