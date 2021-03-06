<template>
  <div>
    <el-drawer
    	:visible.sync="openForm"
      :width-header="true"
      :close-on-press-escape="false"
      size="50%">
      <div slot="title">Ingreso de nuevo paciente</div>
      <div style="padding: 20px">
        <el-form :model="newEntry" label-position="top" ref="informeForm" :rules="rules">
          <el-form-item label="Paciente" prop="patient_id">
            <el-row :gutter="10">
              <el-col :span="18">
                <el-select style="width: 100%;" v-model="newEntry.patient_id">
                  <el-option v-for="paciente in pacientes" :key="paciente.id" :label="getFullName(paciente)" :value="paciente.id">
                    {{ paciente.firstname }} {{ paciente.lastname }}
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-button style="float: right;" type="primary" @click="openNewPatientForm()">Nuevo Paciente</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="Motivo" prop="type">
                <el-select v-model="newEntry.type" style="width: 100%;">
                  <el-option label="Judicial" value="judicial"></el-option>
                  <el-option label="Voluntario" value="voluntario"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Fecha" prop="begin_date">
                <el-date-picker
                	v-model="newEntry.begin_date"
                	type="date"
                	style="width: 100%;"
                	placeholder="Seleccione fecha de ingreso"
                	format="dd/MM/yyyy"
                	value-format="MM/dd/yyyy">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button @click="closeModal()">Cancelar</el-button>
            <el-button type="primary" @click="guardarInternacion">Guardar</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
    <nuevo-paciente
    	v-if="clinicaId"
    	:clinic-id="clinicaId"
    	:show-form="newPatients"
    	@close="newPatients = false;"
    	@finish="(data) => closeNewPatient(data)" />
    </div>
</template>

<script>
import { clone } from "lodash";
import nuevoPaciente from "@/components/clinicas/nuevoPaciente";
import pacientesApi from "@/services/api/pacientes";
import internacionesApi from "@/services/api/internaciones"
export default {
  props: {
    clinicaId: {
      type: Number,
      required: true
    }
  },
  components: {
    nuevoPaciente
  },
  data() {
    return {
      newEntry: {
        patient_id: "",
        begin_date: "",
        type: ""
      },
      openForm: false,
      pacientes: [],
      newPatients: false,
      rules: {
        paciente_id: [
          { required: true, message: 'Nombre no valido', trigger: 'blur' },
        ],
        type: [
          { required: true, message: 'Cuit no valido', trigger: 'blur'}
        ],
        begin_date: [
          { required: true, message: 'DNI no valido', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
  	this.loadPatients();
  },
  methods: {
    loadPatients() {
        pacientesApi.getPacientes(this.clinicaId).then(response => {
            this.pacientes = response.data.patients
        })
    },
    guardarInternacion() {
    	let patientId = clone(this.newEntry.patient_id)
    	delete this.newEntry.patient_id; 
      this.newEntry.begin_date = new Date(this.newEntry.begin_date);
      internacionesApi.createInternacion(patientId, this.newEntry).then(response => {
        this.$emit('finish', response.data.internment);
        this.$message({
          message: 'La internacion se guardado con exito',
          type: 'success'
        });
      }).catch(error => {
        console.log(error);
        this.$message({
          message: 'Hubo un error al guardar la internacion',
          type: 'error'
        });
      }).finally(() => {
        this.openForm = false;
      });
    },
    openDrawer() {
      this.openForm = true;
    },
    openNewPatientForm() {
    	this.newPatients = true;
    },
    closeNewPatient(paciente) {
    	this.newPatients = false;
    	if (paciente) {
    		this.pacientes.push(paciente);
    	}
    },
    getFullName(paciente) {
    	return `${paciente.firstname} ${paciente.lastname}`;
    }
  }
};
</script>