<template>
	<div class="container-wrapper" v-loading="loading">
		<el-header>
			<div class="main-title"><a @click="goBack()"><i class="el-icon-back"></i></a>
      	Internacion {{ internacion.id }}
    	</div>
      <div style="float: right">
        <el-button-group style="margin-right: 10px;">
          <el-button size="small" type="primary" @click="openModalReporte()">Reportes</el-button>
          <el-button size="small" type="primary" @click="openModalAsesoramientos()">Asesoramientos</el-button>
          <el-button size="small" type="primary">Imprimir Ficha</el-button>
        </el-button-group>
        <el-button-group>
          <el-button size="small" type="warning" @click="openEditInternacionModal()">Editar</el-button>
          <el-button size="small" type="danger" @click="closeInternacion()">Cerrar</el-button>
        </el-button-group>
      </div>
	  </el-header>
		<el-main v-if="internacion.id">
      <h4 style="padding: 10px; color: #409EFF; background: #f3f3f3;margin: 5px -3px;">Clinica</h4>
			<div class="clinic-row">
        <div class="label">Clinica</div>
        <div class="value">{{ internacion.clinic.name }} </div>
      </div>
      <div class="clinic-row">
        <div class="label">Nro Habilitacion</div>
        <div class="value">{{ internacion.clinic.habilitation }} </div>
      </div>
      <h4 style="padding: 10px; color: #409EFF; background: #f3f3f3;margin: 5px -3px;">Paciente</h4>
      <div class="clinic-row">
        <div class="label">Nombre Completo</div>
        <div class="value">{{ internacion.patient.firstname }} {{ internacion.patient.lastname }}</div>
      </div>
      <div class="clinic-row">
        <div class="label">Fecha Nac.</div>
        <div class="value">{{ internacion.patient.birth_date || 'Sin datos' }} </div>
      </div>
      <div class="clinic-row">
        <div class="label">Documento</div>
        <div class="value">{{ internacion.patient.document_number }} </div>
      </div>
      <div class="clinic-row">
        <div class="label">Genero</div>
        <div class="value">{{ internacion.patient.gender || 'Sin datos' }} </div>
      </div>
      <h4 style="padding: 10px; color: #409EFF; background: #f3f3f3;margin: 5px -3px;">Internacion</h4>
			<div>
				<div class="internacion-row">
					<div class="label">Internacion <span style="color: red;">{{ internacion.type }}</span></div>
			  	<div class="value">
            Nro #{{ internacion.id }}
          </div>
			  </div>
			  <div class="internacion-row">
			  	<div class="label">Inicio:</div>
			  	<div class="value">{{ internacion.begin_date }}</div>
			  </div>
			  <div class="internacion-row">
			  	<div class="label">Estado:</div>
			  	<div class="value">{{ internacion.end_date ? 'Finalizado' : 'En curso' }}</div>
			  </div>
  		</div>

      <reportes
        v-if="internacion.id"
        :item="internacion"
        ref="reportePanel"
        item-type="Internment"/>

      <asesoramientos
        v-if="internacion.id"
        ref="asesoramientoPanel"
        :item="internacion"
        item-type="Internment"/>

      <el-dialog 
        v-if="copyInternacion"
        title="Actualizar Internacion"
        :visible.sync="showInternacion"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        width="30%">
        <el-form :model="copyInternacion" ref="internacionForm" :rules="rulesInternacion">
          <el-form-item label="Tipo" prop="type">
            <el-select v-model="copyInternacion.type" style="width: 100%;">
              <el-option label="Judicial" value="judicial"></el-option>
              <el-option label="Voluntario" value="voluntario"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Inicio" prop="begin_date">
            <el-date-picker
              v-model="copyInternacion.begin_date"
              type="date"
              style="width: 100%;"
              placeholder="Seleccione fecha de ingreso"
              format="dd/MM/yyyy"
              value-format="MM/dd/yyyy">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelEditInternacion()">Cancelar</el-button>
          <el-button type="primary" @click="updateInternacion()">Guardar</el-button>
        </span>
      </el-dialog>
 		</el-main>
	</div>
</template>


<script>
import { clone } from 'lodash';
import internacionesApi from '@/services/api/internaciones';
import asesoramientos from '@/components/shared/asesoramiento';
import reportes from '@/components/shared/reporte';

import clinicasApi from "@/services/api/clinicas";
	export default {
		name: "Internacion",
    components: {
      asesoramientos,
      reportes
    },
		data() {
			return {
				loading: false,
        showInternacion: false,
        showReporte: false,
        showInternacion: false,
				internacionId: null,
        copyInternacion: null,
				internacion: {
          id: null,
          clinic: {},
          patient: {}
        },
        rulesInternacion: {
          type: [
            { required: true, message: 'tipo no valido', trigger: 'blur' },
          ],
          begin_date: [
            { required: true, message: 'elige una fecha', trigger: 'blur'}
          ],
          end_date: [
            { required: true, message: 'elige una fecha', trigger: 'blur' }
          ]
        }
			}
		},
		 created() {
    	this.internacionId = this.$route.params.internacion_id;
    	this.loadInternacion()
    },
		methods: {
			loadInternacion() {
		    this.loading = true;
		    internacionesApi.getInternacion(this.internacionId)
	    	.then(response => {
	      	this.internacion = response.data.internment;
	    	})
	    	.catch(error => {
	        console.log("Error cargando internaciones", error);
	      })
	      .finally(() => {
	        this.loading = false;
      	})
		  },
		  goBack() {
        this.$router.push({ name: 'ClinicaInternaciones' });
      },
      openModalReporte() {
        this.$refs.reportePanel.openPanel();
      },
      openModalAsesoramientos() {
        this.$refs.asesoramientoPanel.openPanel();
      },
      openEditInternacionModal() {
        this.copyInternacion = clone(this.internacion)
        this.copyInternacion.begin_date = new Date(this.copyInternacion.begin_date);
        this.copyInternacion.end_date = new Date(this.copyInternacion.end_date)
        if (this.copyInternacion)
          this.showInternacion = true;
      },
      cancelEditInternacion() {
        this.showInternacion = false;
        this.copyInternacion = null
      },
      updateInternacion() {
        this.copyInternacion.begin_date = new Date(this.copyInternacion.begin_date);
        delete this.copyInternacion.id;

        this.$refs.internacionForm.validate(valid => {
          internacionesApi.updateInternacion(this.internacion.id, this.copyInternacion).then(response => {
            console.log("Update internacion response", response);
            this.internacion = response.data.internment;
            this.showInternacion = false;
            this.copyInternacion = null;
          })
        });
      },
      closeInternacion() {
        let accepted = confirm("Seguro de finalizar la internacion?");
        if (accepted)
          internacionesApi.closeInternacion(this.internacion.id).then(response => {
            this.internacion = response.data;
          });
      }
		}
	};
</script>

<style lang="scss">
	.internacion-row {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    font-size: 1.1em;
    .label {
      flex: 2;
      padding: 5px 0px;
      font-weight: bold;
    }
    .value { 
      border-bottom: dashed #ddd 1px;
      flex: 3;
      padding: 5px 10px;
    }
  }
  .clinic-row {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  font-size: 1.1em;
  .label {
    flex: 2;
    padding: 5px 0px;
    font-weight: bold;
  }
  .value { 
    border-bottom: dashed #ddd 1px;
    flex: 3;
    padding: 5px 10px;
  }
}
</style>
