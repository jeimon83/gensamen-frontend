<template>
	<div>
		<el-dialog title="Solicitud de Informe" :visible.sync="showInformeModal">
      <el-form :model="newInform" label-width="120px" ref="informeForm" :rules="rules">
	      <el-form-item label="Paciente" prop="paciente_id">
	        <el-select v-model="newInform.paciente_id">
	          <el-option v-for="paciente in pacientes" :key="paciente.id" :label="paciente.name" :value="paciente.id"></el-option>
	        </el-select>
	      </el-form-item>
	      <el-form-item label="Motivo" prop="motivo">
	        <el-select v-model="newInform.motivo" style="width: 100%;">
	          <el-option label="Judicial" value="judicial"></el-option>
	          <el-option label="Voluntario" value="vluntario"></el-option>
	        </el-select>
	      </el-form-item>
	      <el-form-item label="Fecha" prop="fecha">
	        <el-date-picker
			      v-model="newInform.fecha"
			      type="date"
			      placeholder="Pick a day">
			    </el-date-picker>
	      </el-form-item>
	      <el-form-item label="comentarios">
	        <el-input
					  type="textarea"
					  :rows="2"
					  placeholder="Deja tu comentario"
					  v-model="newInform.comentarios">
					</el-input>
	      </el-form-item>
	    </el-form>
	    <span slot="footer" class="dialog-footer">
	      <el-button @click="informVisible = false">Cancel</el-button>
	      <el-button type="primary" @click="informVisible = false">Confirm</el-button>
	    </span>
	  </el-dialog>
	</div>
</template>

<script>
import { clone } from "lodash";
export default {
      		data() {
		   			return {
							newInform: {
              	paciente_id: "",
              	fecha: "",
         	    	motivo: "",
              	comentarios: "",
            	},
            	rules: {
              paciente_id: [
                { required: true, message: 'Nombre no valido', trigger: 'change' },
              ],
              motivo: [
                { required: true, message: 'Cuit no valido', trigger: 'change'}
              ],
              fecha: [
                { required: true, message: 'DNI no valido', trigger: 'blur' }
              ]
            }
					}
			}
	};



</script>