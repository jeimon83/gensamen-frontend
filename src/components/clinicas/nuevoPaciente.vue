<template>
  <el-dialog title="Nuevo Paciente"
  	:visible.sync="showForm"
  	:show-close="false"
  	:close-on-press-escape="false"
  	:close-on-click-modal="false">
    <el-form>
      <el-form-item label="Nombre">
        <el-input placeholder="nombre" v-model="newEntry.firstname" />
      </el-form-item>
      <el-form-item label="Apellido">
        <el-input placeholder="apellido" v-model="newEntry.lastname" />
      </el-form-item>
      <el-form-item label="Dni">
        <el-input placeholder="dni" v-model="newEntry.document_number" />
      </el-form-item>
      <el-form-item>
      	<el-select placeholder="Genero" v-model="newEntry.gender">
         	<el-option label="Hombre" value="hombre"></el-option>
        	 <el-option label="Mujer" value="mujer"></el-option>
      	 </el-select>
      </el-form-item>
      <el-form-item label="Fecha de nacimiento">
	      <el-date-picker
		      v-model="newEntry.birth_date"
		      type="date"
		      placeholder="Pick a day">
		    </el-date-picker>
			 </el-form-item>
      <el-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <el-button type="primary" @click="guardarPaciente">
          Guardar
        </el-button>
        <el-button @click="closeForm()">
          Cancelar
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import pacientesApi from "@/services/api/pacientes";
import internacionesApi from "@/services/api/internaciones"

export default {
	props: {
		clinicId: {
			type: Number,
			required: true
		},
		showForm: {
			type: Boolean,
			required: false,
			default: () => {
				return false
			}
		}
	},
  data() {
    return {
      newEntry: {
      	firstname: "",
      	lastname: "",
      	document_number: "",
      	gender: "",
        birth_date: "",
      }
    }
  },
  watch: {
  	showForm: function(newVal, oldValue) {
  		if (newVal)
  			this.newEntry = {
	      	nombre: "",
	      	apellido: "",
	      	dni: "",
	      	gender: "",
	      	birth_date: ""
	      }
  	}
  },
  methods: {
  	guardarPaciente() {
  		this.newEntry.clinic_id = this.clinicId;
    	pacientesApi.createPacientes(this.clinicId, this.newEntry).then(response => {
    		this.$emit('finish', response.data.patient);
    	});
	  },
	  closeForm() {
	  	this.$emit('close');
	  }
	}
};
</script>
<style>
.demo-input-label {
    display: inline-block;
    width: 130px;
}
</style>