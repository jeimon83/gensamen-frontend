<template>
  <div class="container-wrapper">

    <el-header>
      <div class="main-title">Clinica {{ clinica.name }}</div>
      <div class="main-controls">
        <el-button type="primary" @click="openModal()">Ingresar Paciente</el-button>
        <el-button type="primary" @click="openInform()">Ingresar informe</el-button>
      </div>
    </el-header>

    <el-main>
      <h3> id: {{ clinica.id }} </h3>
      <h3> nombre: {{ clinica.name }}</h3>
      <h3> cuit: {{ clinica.cuit }} </h3>
      <h3> habilitacion: {{ clinica.habilitation }} </h3>
      <h3> camas disponibles (judicial): {{ clinica.beds_judicial }} </h3>
      <h3> camas disponibles (voluntario): {{ clinica.beds_voluntary }} </h3>
    </el-main>

    <el-dialog title="Ingreso de Paciente" :visible.sync="entryVisible">
      <el-form :model="newEntry" label-width="120px">
	      <el-form-item label="Paciente">
	        <el-select v-model="newEntry.paciente_id">
	          <el-option v-for="paciente in pacientes" :key="paciente.id" :label="paciente.name" :value="paciente.id"></el-option>
	        </el-select>
	      </el-form-item>
	      <el-form-item label="Motivo">
	        <el-select v-model="newEntry.motivo" style="width: 100%;">
	          <el-option label="Judicial" value="judicial"></el-option>
	          <el-option label="Voluntario" value="vluntario"></el-option>
	        </el-select>
	      </el-form-item>
	      <el-form-item label="Fecha">
	        <el-date-picker
			      v-model="newEntry.fecha"
			      type="date"
			      placeholder="Pick a day">
			    </el-date-picker>
	      </el-form-item>
	      <el-form-item label="comentarios">
	        <el-input
					  type="textarea"
					  :rows="2"
					  placeholder="Deja tu comentario"
					  v-model="newEntry.comentarios">
					</el-input>
	      </el-form-item>
	    </el-form>
	    <span slot="footer" class="dialog-footer">
	      <el-button @click="entryVisible = false">Cancel</el-button>
	      <el-button type="primary" @click="entryVisible = false">Confirm</el-button>
	    </span>
	  </el-dialog>


	  <el-dialog title="Solicitud de Informe" :visible.sync="informVisible">
      <el-form :model="newInform" label-width="120px">
	      <el-form-item label="Paciente">
	        <el-select v-model="newInform.paciente_id">
	          <el-option v-for="paciente in pacientes" :key="paciente.id" :label="paciente.name" :value="paciente.id"></el-option>
	        </el-select>
	      </el-form-item>
	      <el-form-item label="Motivo">
	        <el-select v-model="newInform.motivo" style="width: 100%;">
	          <el-option label="Judicial" value="judicial"></el-option>
	          <el-option label="Voluntario" value="vluntario"></el-option>
	        </el-select>
	      </el-form-item>
	      <el-form-item label="Fecha">
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
import clinicasApi from "@/services/api/clinicas";
export default {
    name: "Clinica",
    data() {
        return {
            entryVisible: false,
            informVisible: false,
            clinicaId: null,
            newEntry: {
                paciente_id: "",
                fecha: "",
                motivo: "",
                comentarios: "",
            },
            newInform: {
                paciente_id: "",
                fecha: "",
                motivo: "",
                comentarios: "",
            },
            clinica: {
                id: "",
                name: "",
                cuit: "",
                habilitation: "",
                beds_voluntary: "",
                beds_judicial: "",
            },
            pacientes: [{
                id: "",
                name: "",
                dni: "",
                numero_de_paciente: ""
            }]
        }
    },
    created() {
    	this.clinicaId = this.$route.params.id;
    	this.loadClinica(); 
    },
    methods: {
        openModal() {
            this.entryVisible = true;
        },
        openInform() {
        	this.informVisible = true;
        },
        loadClinica() {
        	clinicasApi.getClinica(this.clinicaId).then(response => {
        		this.clinica = response.data.clinic;
        	})
        }
    }
};
</script>
<style>
.comment-frame {
    border-radius: 3px;
    margin: 4px 4px 12px 0;
}
</style>