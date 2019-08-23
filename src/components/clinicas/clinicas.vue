<template>
    <div class="container-wrapper">
        <el-header>
            <div class="main-title">Clinicas</div>
            <el-button type="primary" @click="openModal()">Ingresar clinica</el-button>
        </el-header>
        <el-dialog title="Ingreso de clinica" :visible.sync="visible">
            <el-form :model="newEntry" label-width="120px">
                <el-form-item label="clinica">
                    <el-select v-model="newEntry.clinica">
                        <el-option v-for="clinica in clinicas" :key="clinica" :label="clinica.name" :value="clinica"></el-option>
                    </el-select>
                </el-form-item>
                        <el-form-item label="Nombre">
                            <el-input v-model="clinica.name"></el-input>
                        </el-form-item>
                        <el-form-item label="Camas disponibles">
                            <el-input v-model="clinica.beds_available"></el-input>
                        </el-form-item>
                        <el-form-item label="Permiso">
                            <el-input v-model="clinica.permission"></el-input>
                        </el-form-item>
                    </el-form>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="entryVisible = false">Cancel</el-button>
                <el-button type="primary" @click="entryVisible = false">Confirm</el-button>
            </span>
        </el-dialog>
        <el-main>
            <el-table :data="clinicas" style="width: 100%">
                <el-table-column prop="id" label="#">
                </el-table-column>
                <el-table-column prop="name" label="Nombre">
                </el-table-column>
                <el-table-column prop="beds_available" label="camas disponibles">
                </el-table-column>
                <el-table-column prop="permission" label="permission">
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <router-link :to="{ name: 'Clinica', params: { id: scope.row.id } }">Ver</router-link>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
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
            clinica: "",
             newEntry: {
            name: "",
            beds_available: "",
            permission: ""
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
    }
  }
};
</script>