<template>
  <div class="container-wrapper">
    <el-header>
      <div class="main-title">Clinicas</div>
      <el-button type="primary" @click="openModal()">Ingresar clinica</el-button>
    </el-header>
    <el-main style="margin-bottom: 40px;">
      <el-table :data="clinicas" style="width: 100%">
        <el-table-column prop="id" label="#">
        </el-table-column>
        <el-table-column prop="name" label="Nombre">
        </el-table-column>
        <el-table-column prop="cuit" label="Cuit">
        </el-table-column>
        <el-table-column prop="habilitation" label="Habilitacion">
        </el-table-column>
        <el-table-column prop="beds_judicial" label="Camas (judicial)">
        </el-table-column>
        <el-table-column prop="beds_voluntary" label="Camas (voluntario)">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <router-link :to="{ name: 'Clinica', params: { id: scope.row.id } }">Ver</router-link>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

     <el-dialog title="Ingreso de clinica" :visible.sync="visible">
      <el-form :model="newEntry" label-width="120px">
        <el-form-item label="Nombre">
          <el-input v-model="newEntry.name"></el-input>
        </el-form-item>
        <el-form-item label="cuit">
          <el-input v-model="newEntry.cuit"></el-input>
        </el-form-item>
        <el-form-item label="Permiso">
          <el-input v-model="newEntry.habilitation"></el-input>
        </el-form-item>
        <el-form-item label="Camas disponibles (voluntario)">
          <el-input-number v-model="newEntry.beds_voluntary" :min="1" :max="500"></el-input-number>
        </el-form-item>
        <el-form-item label="Camas disponibles (judicial)">
          <el-input-number v-model="newEntry.beds_judicial" :min="1" :max="500"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="entryVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="saveClinic()">Guardar</el-button>
      </span>
    </el-dialog>        
  </div>
</template>
<script>
import clinicasApi from "@/services/api/clinicas";

export default {
    name: "clinicas",
    data() {
        return {
            visible: false,
            clinicas: [],
            num: 1,
            newEntry: {
                name: "",
                cuit: "",
                habilitation: "",
                beds_voluntary: "",
                beds_judicial: "",
            },
        }
    },
    created() {
        console.log(clinicasApi)
        this.loadClinicas()
    },
    methods: {
        loadClinicas() {
            clinicasApi.getClinicas().then(response => {
                console.log(response)
                this.clinicas = response.data.clinics
            })
        },
        openModal() {
            this.visible = true;
        },
        saveEntry() {
            clinicasApi.createClinica(this.newEntry).then(response => {
                this.clinicas.push(response.data.clinic);
                this.visible = false;
                this.newEntry = {
	                name: "",
	                cuit: "",
	                habilitation: "",
	                beds_voluntary: "",
	                beds_judicial: "",
	            };
            })
        },
        saveClinic() {
      clinicasApi.updateClinica(this.clinica.id, this.editClinic)
        .then(response => {
          this.clinica = response.data.clinic;
        })
      },
    }
};
</script>