<template>
	<div class="container-wrapper" v-loading="loading">
    <el-header>
    	<div class="main-title">
        Internaciones
      </div>
    </el-header>
    <el-main>
	  	<el-table :data="internaciones" style="width: 100%" v-loading="loading">
	      <el-table-column label="Paciente">
	        <template slot-scope="scope">
	          {{ scope.row.patient.firstname }} {{ scope.row.patient.lastname }}
	        </template>
	      </el-table-column>
	      <el-table-column prop="type" label="tipo" />
	      <el-table-column prop="begin_date" label="Inicio" />
	      <el-table-column prop="end_date" label="Fin" />
	      <el-table-column>
          <template slot-scope="scope">
            <router-link :to="{ name: 'Internacion', params: { id: clinicaId, internacion_id: scope.row.id } }" style="color: blue;">
              ver
            </router-link>
          </template>
        </el-table-column>
	    </el-table>
	  </el-main>
	</div>

</template>

<script>
import internacionesApi from '@/services/api/internaciones';
	
	export default {
		name: "ClinicaInternacion",
		data() {
			return {
				loading: false,
				internaciones: [],
				clinicaId: null
      }
    },
    created() {
    	this.clinicaId = this.$route.params.id;
    	this.loadInternaciones()
    },
    methods: {
      loadInternaciones() {
		    this.loading = true;
		    internacionesApi.getInternacionesClinica(this.clinicaId)
		    	.then(response => {
		      	this.internaciones = response.data.internments;
		    	})
		    	.catch(error => {
		        console.log("Error cargando internaciones", error);
		      })
		      .finally(() => {
		        this.loading = false;
        	})
		  },
		}
	};
</script>