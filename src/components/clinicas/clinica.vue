<template>
    <div class="container-wrapper">
        <el-header>
            <div class="main-title">Clinica {{ clinica.name }}</div>
            <div class="main-controls">
                <el-button type="primary" @click="openModal()">Ingresar Paciente</el-button>
            </div>
        </el-header>
        <el-main>
            <h3> id: {{ clinica.id }} </h3>
            <h3> camas disponibles: {{ clinica.beds_available }}</h3>
            <h3> permission: {{ clinica.permission }} </h3>
            <el-dialog title="Ingreso de Paciente" :visible.sync="dialogFormVisible">
                <el-form :model="newEntry" label-width="120px">
                    <el-form-item label="Paciente">
                        <el-select v-model="newEntry.paciente_id">
                            <el-option v-for="paciente in pacientes" :key="paciente.id" :label="paciente.name" :value="paciente.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Motivo">
                        <el-select v-model="newEntry.motivo" style="width: 100%;">
                            <el-option label="Judicial" value="judicial"></el-option>
                            <el-option label="Voluntario" value="vluntario"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Fecha">
                        <el-date-picker
										      v-model="newEntry.fecha"
										      type="date"
										      placeholder="Pick a day">
										    </el-date-picker>
                    </el-form-item>
                    <el-form-item label="Fecha">
                        <el-input
												  type="textarea"
												  :rows="2"
												  placeholder="Please input"
												  v-model="newEntry.comentarios">
												</el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
                </span>
            </el-dialog>
        </el-main>
    </div>
</template>
<script>
export default {
    name: "Clinica",
    data() {
        return {
            dialogFormVisible: false,
            newEntry: {
                paciente_id: "",
                fecha: "",
                motivo: "",
                comentarios: "",
            },
            clinica: {
                id: 1,
                name: "casa",
                beds_available: 100,
                permission: "cualca"
            },
            pacientes: [{
                id: 1,
                name: "Carlos Gomez",
                dni: "12.134.565",
                numero_de_paciente: "0012-19"
            }]
        }
    },
    methods: {
        openModal() {
            this.dialogFormVisible = true;
        }
    }
};
</script>
<style>
.comment-frame {
    border-radius: 3px;
    margin: 4px 4px 12px 0;
}
</style>