<template>
  <div class="container-wrapper">
		<el-header>
			<div class="main-title">Clinica {{ clinica.name }}</div>
		</el-header>
		<el-main>
		  <h3> id: {{ clinica.id }} </h3>
		  <h3> camas disponibles: {{ clinica.beds_available }}</h3>
		  <h3> permission: {{ clinica.permission }} </h3>
		  <h3>pacientes</h3>
		  <el-table
	      :data="clinica.pacientes"
	      style="width: 100%">
	      <el-table-column
	        prop="id"
	        label="#">
	      </el-table-column>
	      <el-table-column
	        prop="name"
	        label="Nombre">
	      </el-table-column>
	      <el-table-column
	        prop="last_name"
	        label="apellido">
	      </el-table-column>
	       <el-table-column
	        prop="dni"
	        label="dni">
	      </el-table-column>
	       <el-table-column
	        prop="numero_de_paciente"
	        label="numero de paciente">
	      </el-table-column>
	       <el-table-column>
	       	<template slot-scope="scope">
	       		<router-link :to="{ name: 'Paciente', params: { id: scope.row.id } }">Ver</router-link>
	       	</template>
	      </el-table-column>
	    </el-table>
		</el-main>
  </div>
</template>
<script>
export default {
  name: "clinica",
  data() {
    return {
      clinica: {
        id: 1,
        name: "casa",
        beds_available: 100,
        permission: "cualca",
        pacientes: [
        	{
        		id: 1,
        		name: "Carlos",
        		last_name: "Gomez",
        		dni: "12.134.565",
        		numero_de_paciente: "0012-19"
        	}
        ]
      }
    }
  }
};
</script>