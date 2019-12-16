<template>
	<div class="container-wrapper" v-loading="loading">
		<el-header>
			<div class="main-title"><a @click="goBack()"><i class="el-icon-back"></i></a>
      	Internacion
    	</div>
	</el-header>
		<el-main>
			{{ internacion }}
			<div class="clinic-row">
        <div class="label">CUIT</div>
        <div class="value">{{ clinica.cuit }} </div>
      </div>
      <div class="clinic-row">
        <div class="label">Nro Habilitacion</div>
        <div class="value">{{ clinica.habilitation }} </div>
      </div>
      <div class="clinic-row">
        <div class="label">Camas disponibles (judicial)</div>
        <div class="value">{{ clinica.beds_judicial }} </div>
      </div>
      <div class="clinic-row">
        <div class="label">Camas disponibles (voluntario)</div>
        <div class="value">{{ clinica.beds_voluntary }} </div>
      </div>
			<br>
			<br>
			<div>
				<div class="internacion-row">
					<div class="label">tipo:</div>
			  	<div class="value">{{ internacion.type }} </div>
			  </div>
			  <div class="internacion-row">
			  	<div class="label">fecha de entrada:</div>
			  	<div class="value">{{ internacion.begin_date }}</div>
			  </div>
			  <div class="internacion-row">
			  	<div class="label">fecha de salida:</div>
			  	<div class="value">{{ internacion.end_date }}</div>
			  </div>
  		</div>
 		</el-main>
	</div>
</template>


<script>
import internacionesApi from '@/services/api/internaciones';
import clinicasApi from "@/services/api/clinicas";
	export default {
		name: "Internacion",
		data() {
			return {
				loading: false,
				internacionId: null,
				internacion: {
					firstname: "",
					type: "",
					begin_date: "",
					end_date: ""
				},
				clinica: {
          id: "",
          name: "",
          cuit: "",
          habilitation: "",
          beds_voluntary: "",
          beds_judicial: "",
      },
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
		  loadClinica() {
		    this.loading = true;
		    clinicasApi.getClinica(this.clinicaId).then(response => {
		      this.clinica = response.data.clinic;
		      this.loadInternaciones();
		    }).catch(error => {
		        console.log("Error cargando clinica", error);
		      }).finally(() => {
		        this.loading = false;
		      });
		  },
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
