<template>
	<div>
		<el-dialog title="Solicitar Asesoramiento" 
			:visible.sync="openForm"
			:show-close="false"
	  	:close-on-press-escape="false"
	  	:close-on-click-modal="false">
      <el-form :model="asesoramiento" label-width="120px">
      	<el-form-item label="Tipo">
	        <el-select v-model="asesoramiento.type" style="width: 100%;" prop="type">
	          <el-option label="a" value="a"></el-option>
	          <el-option label="b" value="b"></el-option>
        	</el-select>
	    	</el-form-item>
	    	<el-form-item label="comentario">
	    		<el-input
					  type="textarea"
					  :rows="2"
					  placeholder="comentarios"
					  v-model="asesoramiento.comentario">
					</el-input>
	    		</el-form-item>
	    		</el-form>
    			<span slot="footer" class="dialog-footer">
            <el-button @click="closeModal()">Cancelar</el-button>
            <el-button type="primary" @click="guardarAsesoramiento">Guardar</el-button>
        	</span>
    	</el-dialog>
	</div>
</template>

<script>
	export default {
     props: {
        openForm: {
            type: Boolean,
            default: () => {
              return false
            }
        },
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
			closeModal() {
      	this.$emit('close');
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
                this.openForm = false;
              });
          }
  		  })
      }
    }
	};
</script>