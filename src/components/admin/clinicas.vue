<template>
  <div class="container-wrapper">
    <el-header>
      <div class="main-title">Clinicas</div>
      <div>
        <el-button type="primary" size="small" @click="openModal()">Ingresar clinica</el-button>
        <el-button type="primary" size="small" @click="loadClinicas()">Recargar</el-button>
      </div>
    </el-header>
    <el-main style="margin-bottom: 40px;">
      <el-table :data="clinicas" style="width: 100%" v-loading="loading">
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
      <el-form :model="newEntry" ref="clinicasForm" :rules="rules" label-width="200px">
        <el-form-item label="Nombre" prop="name">
          <el-input v-model="newEntry.name"></el-input>
        </el-form-item>
        <el-form-item label="cuit" prop="cuit">
          <el-input v-model="newEntry.cuit"></el-input>
        </el-form-item>
        <el-form-item label="Permiso" prop="habilitation">
          <el-input v-model="newEntry.habilitation"></el-input>
        </el-form-item>
        <el-form-item label="Camas (voluntario)" prop="beds_voluntary">
          <el-input-number v-model="newEntry.beds_voluntary" :min="1" :max="500"></el-input-number>
        </el-form-item>
        <el-form-item label="Camas (judicial)" prop="beds_judicial">
          <el-input-number v-model="newEntry.beds_judicial" :min="1" :max="500"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="entryVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="saveEntry()">Guardar</el-button>
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
            loading: false,
            num: 1,
            newEntry: {
                name: "",
                cuit: "",
                habilitation: "",
                beds_voluntary: "",
                beds_judicial: "",
            },
            rules: {
              name: [
                { required: true, message: 'Nombre no valido', trigger: 'blur' },
              ],
              cuit: [
                { required: true, message: 'cuit no valido', trigger: 'blur'}
              ],
              habilitation: [
                { required: true, message: 'habilitation no valida', trigger: 'blur' }
              ],
              beds_voluntary: [
                { min: 1, max: 500, message: 'es necesario 1 cama como minimo', trigger: 'input' }
              ],
              beds_judicial: [
                { min: 1, max: 500, message: 'es necesario 1 cama como minimo', trigger: 'blur' }
              ]
            }
        }
    },
    created() {
      this.loadClinicas()
    },
    methods: {
      loadClinicas() {
        this.loading = true;
        clinicasApi.getClinicas().then(response => {
          this.clinicas = response.data.clinics;
        }).catch(error => {
          console.log("Error cargando clinicas", error);
        }).finally(() => {
          this.loading = false;
        })
      },
      openModal() {
          this.visible = true;
      },
      saveEntry() {
        this.loading = true;
        this.$refs.clinicasForm.validate((valid) => {
          if (valid) {
            clinicasApi.createClinica(this.newEntry)
              .then(response => {
                this.clinicas.push(response.data.clinic);
                this.$message({
                  message: 'La clinica se a guardado con exito',
                  type: 'success'
                });
                this.visible = false;
                this.newEntry = {
                  name: "",
                  cuit: "",
                  habilitation: "",
                  beds_voluntary: "",
                  beds_judicial: "",
                };
              })
              .catch(error => {
                console.log(error)
                this.$message({
                  message: 'Hubo un error al guardar la clinica',
                  type: 'error'
                });
              })
              .finally(() => {
                this.loading = false
              })
          } else {
            return false;
          }
        });
      }
    }
};
</script>