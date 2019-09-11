<template>
	<div>
    <el-header>
      listado de pacientes <div>{{ clinica.name }}</div>
    </el-header>
    <el-main>
   <el-table :data="pacientes" style="width: 100%">
        <el-table-column label="Pacientes"/>
        <el-table-column prop="firstname" label="Nombre" />
        <el-table-column prop="lastname" label="Apellido" />
        <el-table-column prop="dni" label="DNI" />
        <el-table-column prop="gender" label="genero" />
        <el-table-column prop="birth_date" label="fecha de nacimiento" />
      </el-table>
      </el-main> 
  </div>
</template>

<script>
import pacientesApi from '@/services/api/pacientes';
export default {
  name: '',
  // props: {},
  // components: {},
  data() {
    return {
      pacientes: [],
      clinica: {
          id: "",
          name: ""
      }
    }
  },
  // computed: {}
  created() {},
  // destroyed() {},
  methods: {}
};
</script>