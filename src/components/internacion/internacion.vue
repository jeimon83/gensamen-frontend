<template>
	<div class="container-wrapper" v-loading="loading">
		<el-header>
			<div class="main-title">
      	Internacion
    	</div>
	</el-header>
		<el-main>
			<div>
				<el-divider content-position="left">tipo:</el-divider>
			  <span>{{ internacion.type }} </span>
			  <el-divider content-position="left">fecha de entrada</el-divider>
			  <span>{{ internacion.begin_date }}</span>
			  <el-divider content-position="left">fecha de salida</el-divider>
			  <span>{{ internacion.end_date }}</span>
  		</div>
 		</el-main>
	</div>
</template>


<script>
import internacionesApi from '@/services/api/internaciones'
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
		}
	};
</script>
