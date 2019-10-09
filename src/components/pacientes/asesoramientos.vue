<template>
	<div>
		<el-dialog title="asesoramientos" 
			:visible.sync="openForm"
			:show-close="false"
	  	:close-on-press-escape="false"
	  	:close-on-click-modal="false">
      <el-form :model="asesoramientos" label-width="120px">
      	<el-form-item label="Tipo de asesoramiento">
	        <el-select v-model="reporte.type" style="width: 100%;">
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
		data() {
			asesoramiento: {
				type: "",
				comentario: ""
			}
		}

		methods: {
			closeModal() {
    	this.$emit('close');
    },
    guardarAsesoramiento() {
      pacientesApi.guardarAsesoramiento(this.paciente.id, this.asesoramiento).then(response => {
        console.log("Update asesoramiento response", response);
      this.$message({
          message: 'El asesoramiento se guardado con exito',
          type: 'success'
      });
      }).catch(error => {
      console.log(error);
      this.$message({
        message: 'Hubo un error al guardar el sesoramiento',
        type: 'error'
      });
    }).finally(() => {
      this.openForm = false;
    });
    }
		}
	};
</script>