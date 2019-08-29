<template>
  <div class="container-wrapper">

    <el-header>
      <div class="main-title">Clinica {{ clinica.name }}</div>
      <div class="main-controls">
        <el-button type="primary" @click="openModal()">Ingresar Paciente</el-button>
        <el-button type="primary" @click="openInform()">Ingresar informe</el-button>
        <el-button type="success" @click="openClinicForm()">Actualizar clinica</el-button>
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

    <el-dialog title="Actualizacion de clinica" :visible.sync="openClinicModal">
      <el-form :model="editClinic" label-width="120px">
        <el-form-item label="Nombre">
            <el-input v-model="editClinic.name"></el-input>
        </el-form-item>
        <el-form-item label="cuit">
            <el-input v-model="editClinic.cuit"></el-input>
        </el-form-item>
        <el-form-item label="Permiso">
            <el-input v-model="editClinic.habilitation"></el-input>
        </el-form-item>
        <el-form-item label="Camas disponibles (voluntario)">
	        <el-input-number v-model="editClinic.beds_voluntary" :min="1" :max="500"></el-input-number>
	      </el-form-item>
	      <el-form-item label="Camas disponibles (judicial)">
	        <el-input-number v-model="editClinic.beds_judicial" :min="1" :max="500"></el-input-number>
	      </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="entryVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="saveClinic()">Guardar</el-button>
      </span>
    </el-dialog>

    <el-dialog title="Ingreso de Paciente" :visible.sync="entryVisible">
      <el-form :model="newEntry" label-position="top">
	      <el-form-item label="Paciente">
	      	<el-row :gutter="10">
	      		<el-col :span="12">
			        <el-select style="width: 100%;" v-model="newEntry.paciente_id">
			          <el-option v-for="paciente in pacientes" :key="paciente.id" :label="getFullName(paciente)" :value="paciente.id">
			          	{{ paciente.firstname }} {{ paciente.lastname }}
			          </el-option>
			        </el-select>
			      </el-col>
			      <el-col :span="12">
	        		<el-button style="float: right;" type="primary" @click="openewPatientForm()">Nuevo Paciente</el-button>
	        	</el-col>
	        </el-row>
	      </el-form-item>
	      <el-row :gutter="10">
	      	<el-col :span="12">
			      <el-form-item label="Motivo">
			        <el-select v-model="newEntry.motivo" style="width: 100%;">
			          <el-option label="Judicial" value="judicial"></el-option>
			          <el-option label="Voluntario" value="vluntario"></el-option>
			        </el-select>
			      </el-form-item>
			    </el-col>
			    <el-col :span="12">
			      <el-form-item label="Fecha">
			        <el-date-picker
					      v-model="newEntry.fecha"
					      type="date"
					      style="width: 100%;"
					      placeholder="Pick a day">
					    </el-date-picker>
			      </el-form-item>
			    </el-col>
			  </el-row>
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
	      <el-button type="primary" @click="entryVisible">Confirm</el-button>
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

	  <nuevo-paciente
	  	v-if="clinica.id"
	  	:clinic-id="clinica.id"
	  	:show-form="newPatients"
	  	@close="newPatients = false;"
	   	@finish="(data) => closeNewPatient(data)"/>
  </div>
</template>
<script>
import clinicasApi from "@/services/api/clinicas";
import pacienteApi from "@/services/api/pacientes";
import { clone } from "lodash";
import nuevoPaciente from "@/components/clinicas/nuevoPaciente"
export default {
    name: "Clinica",
    components: {
    	nuevoPaciente
    },
    data() {
        return {
            entryVisible: false,
            informVisible: false,
            clinicaId: null,
            openClinicModal: false,
            newPatients: false,
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
            pacientes: [],
            editClinic: {
            	name: "",
            	cuit: "",
            	habilitation: "",
            	beds_judicial: "",
            	beds_voluntary: ""
            }
            
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
        getFullName(paciente) {
        	return `${paciente.firstname} ${paciente.lastname}`;
        },
        loadClinica() {
        	clinicasApi.getClinica(this.clinicaId).then(response => {
        		this.clinica = response.data.clinic;
        		this.loadPatients();
        	})
        },
        loadPatients() {
        	pacienteApi.getPacientes(this.clinicaId).then(response => {
        		this.pacientes = response.data.patients
        	})
        },
        openClinicForm() {
        	this.openClinicModal = true;
        	this.editClinic = clone(this.clinica)
        	delete this.editClinic.id;
        },
        saveClinic() {
        	clinicasApi.updateClinica(this.clinica.id, this.editClinic)
        		.then(response => {
        			this.clinica = response.data.clinic;
        			this.$message({
			          message: 'La clinica se actualizo con exito',
			          type: 'success'
			        });
        		}).catch(error => {
        			console.log(error);
        			this.$message({
			          message: 'Hubo un error al actualizar la clinica',
			          type: 'error'
			        });
        		}).finally(() => {
	        		this.openClinicModal = false;
        		})
        },
        openewPatientForm() {
        	console.log("newPatients", this.newPatients);
        	this.newPatients = true;
        },
        closeNewPatient(paciente) {
        	this.newPatients = false;
        	console.log("newPatients", this.newPatients)
        	console.log("Tenemos paciente?", paciente);
        	if (paciente)
        		this.pacientes.push(paciente);
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