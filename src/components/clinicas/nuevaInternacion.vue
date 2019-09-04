<template>
    <div>
        <el-dialog
        	title="Ingreso de Paciente"
        	:visible.sync="openForm"
        	:show-close="false"
			  	:close-on-press-escape="false"
			  	:close-on-click-modal="false">
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
                            <el-button style="float: right;" type="primary" @click="openNewPatientForm()">Nuevo Paciente</el-button>
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
                            <el-date-picker v-model="newEntry.fecha" type="date" style="width: 100%;" placeholder="Pick a day">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="comentarios">
                    <el-input type="textarea" :rows="2" placeholder="Deja tu comentario" v-model="newEntry.comentarios">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeModal()">Cancelar</el-button>
                <el-button type="primary" @click="guardarInternacion">Guardar</el-button>
            </span>
        </el-dialog>
        <nuevo-paciente
        	v-if="clinicaId"
        	:clinic-id="clinicaId"
        	:show-form="newPatients"
        	@close="newPatients = false;"
        	@finish="(data) => closeNewPatient(data)" />
    </div>
</template>
<script>
import nuevoPaciente from "@/components/clinicas/nuevoPaciente";
import pacientesApi from "@/services/api/pacientes";
import iternacionesApi from "@/services/api/internaciones"
export default {
    props: {
        clinicaId: {
            type: Number,
            required: true
        },
        openForm: {
            type: Boolean,
            required: false,
            default: () => {
                return false;
            }
        }
    },
    components: {
        nuevoPaciente
    },
    data() {
        return {
            newEntry: {
                paciente_id: "",
                fecha: "",
                motivo: "",
                comentarios: "",
            },
            pacientes: [],
            newPatients: false,
        }
    },
    methods: {
      loadPatients() {
          pacientesApi.getPacientes(this.clinicaId).then(response => {
              this.pacientes = response.data.patients
          })
      },
      guardarInternacion() {
          internacionesApi.createInternacion(this.newEntry.paciente_id, this.newEntry).then(response => {
              this.$emit('finish', response.data.internment);
          })
      },
       closeModal() {
      	this.$emit('close');
      },
      openNewPatientForm() {
      	this.newPatients = true;
      },
      closeNewPatient(paciente) {
      	this.newPatients = false;
      	if (paciente)
      		this.pacientes.push(paciente);
      }
    }
};
</script>