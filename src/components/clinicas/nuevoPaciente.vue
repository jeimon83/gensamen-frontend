<template>
  <el-dialog title="Nuevo Paciente"
  	:visible.sync="showForm"
  	:show-close="false"
  	:close-on-press-escape="false"
  	:close-on-click-modal="false">
    <div v-loading="loading">
      <el-form :model="newEntry" ref="pacienteForm" :rules="rules">
        <el-form-item label="Nombre" prop="firstname">
          <el-input placeholder="nombre" v-model="newEntry.firstname" />
        </el-form-item>
        <el-form-item label="Apellido" prop="lastname">
          <el-input placeholder="apellido" v-model="newEntry.lastname" />
        </el-form-item>
        <el-form-item label="Dni" prop="document_number">
          <el-input placeholder="dni" v-model="newEntry.document_number" />
        </el-form-item>
        <el-form-item prop="gender" label="Genero">
        	<el-select placeholder="Genero" v-model="newEntry.gender" style="width: 100%">
           	<el-option label="Hombre" value="hombre"></el-option>
        	  <el-option label="Mujer" value="mujer"></el-option>
        	  <el-option label="otro" value="otro"></el-option>
        	</el-select>
        </el-form-item>
        <el-form-item label="Fecha de nacimiento" prop="birth_date">
  	      <el-date-picker
  		      v-model="newEntry.birth_date"
  		      type="date"
  		      placeholder="Pick a day" style="width: 100%">
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
    </div>
  </el-dialog>
</template>
<script>
import pacientesApi from "@/services/api/pacientes";
export default {
	props: {
		clinicId: {
			type: Number|String,
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
      loading: false,
      newEntry: {
      	firstname: "",
      	lastname: "",
      	document_number: "",
      	gender: "",
        birth_date: "",
      },
      rules: {
              firstname: [
                { required: true, message: 'El Nombre no puede estar en blanco', trigger: 'blur' },
              ],
              lastname: [
                { required: true, message: 'El Apellido no puede estar en blanco', trigger: 'blur'}
              ],
              document_number: [
                { required: true, message: 'El DNI no es valido', trigger: 'blur' }
              ],
              gender: [
                { required: true, message: 'debes deleccionar un Genero', trigger: 'change' }
              ],
              birth_date: [
                { required: true, message: 'debes deleccionar una fecha', trigger: 'blur' }
              ]
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
      console.log("Validando formulario", this.$refs.pacienteForm);
      this.$refs.pacienteForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          pacientesApi.createPacientes(this.clinicId, this.newEntry)
            .then(response => {
      	      this.$message({
                message: 'El paciente se guardado con exito',
                type: 'success'
              });
              this.$emit('finish', response.data.patient);
            })
            .catch(error => {
              console.log(error);
              this.$message({
                message: 'Hubo un error al guardar el paciente',
                type: 'error'
              });
            })
            .finally(() => {
              this.loading = true;
              this.showForm = false;
            });
        } else {
          console.log("Es valido?", valid)
        }
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