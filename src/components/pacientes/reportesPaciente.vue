<template>
	<div>
		<el-dialog title="reportes" 
			:visible.sync="openForm"
			:show-close="false"
	  	:close-on-press-escape="false"
	  	:close-on-click-modal="false">
      <el-form :model="reporte" label-width="120px">
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
				}
			}
		}
	};



</script>