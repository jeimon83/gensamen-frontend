<template>
	<div>
		<el-dialog title="reportes" 
			:visible.sync="openForm"
			:show-close="false"
	  	:close-on-press-escape="false"
	  	:close-on-click-modal="false">
      <el-form :model="reporte" label-width="120px" prop="type">
      	<el-form-item label="Tipo de reporte">
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
					  v-model="reporte.comentario">
					</el-input>
	    		</el-form-item>
	    		</el-form>
    			<span slot="footer" class="dialog-footer">
            <el-button @click="closeModal()">Cancelar</el-button>
            <el-button type="primary" @click="guardarReporte">Guardar</el-button>
        	</span>
    	</el-dialog>
	</div>
</template>

<script>
import pacientesApi from '@/services/api/pacientes';
import { clone } from "lodash";
	export default {
		props: {
			openForm: {
				type: Boolean,
				default: () => {
					return false
				}
			},
			paciente: {
				type: Object,
				required: true
			}
		}, 
		data() {
			return {
				reporte: {
					type: "",
					comentario: ""
				},
				rules: {
              type: [
                { required: true, message: 'tipo no valido', trigger: 'change' },
              ],
            }
			}
		},
	methods: {
		closeModal() {
    	this.$emit('close');
    },
    guardarReporte() {
    	 this.loading = true;
      	this.$refs.loginForm.validate((valid) => {
        if (valid)
      pacientesApi.guardarReporte(this.paciente.id, this.reporte).then(response => {
        console.log("Update reporte response", response);
      this.$message({
            message: 'El reporte se guardado con exito',
            type: 'success'
          });
    });
        }).catch(error => {
          console.log(error);
          this.$message({
            message: 'Hubo un error al guardar el reporte',
            type: 'error'
          });
        }).finally(() => {
          this.openForm = false;
        });
    }
	}
};


</script>