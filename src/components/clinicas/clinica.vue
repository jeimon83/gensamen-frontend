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
            <h3>pacientes</h3>
            <el-table :data="clinica.pacientes" style="width: 100%">
                <el-table-column prop="id" label="#">
                </el-table-column>
                <el-table-column prop="name" label="Nombre">
                </el-table-column>
                <el-table-column prop="last_name" label="apellido">
                </el-table-column>
                <el-table-column prop="dni" label="dni">
                </el-table-column>
                <el-table-column prop="numero_de_paciente" label="numero de paciente">
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <router-link :to="{ name: 'Paciente', params: { id: scope.row.id } }">Ver</router-link>
                    </template>
                </el-table-column>
            </el-table>
            {{ dialogFormVisible }}
            <el-dialog title="Shipping address" :visible.sync="dialogFormVisible">
                <el-form :model="newEntry" label-width="120px">
                    <el-form-item label="Promotion name">
                        <el-input v-model="newEntry.name"></el-input>
                    </el-form-item>
                    <el-form-item label="Zones">
                        <el-select v-model="newEntry.region" style="width: 100%;">
                            <el-option label="Zone No.1" value="shanghai"></el-option>
                            <el-option label="Zone No.2" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
                </span>
            </el-dialog>
        </el-main>
        <div class="comment-frame">
            <div class="comment-box">
                <textarea class="comment-box-input js-new-comment-input" placeholder="Escriba un comentario..." dir="auto" style="overflow: hidden; overflow-wrap: break-word; height: 79px;"></textarea>
                <div class="comment-box-options">
                    <a class="comment-box-options-item js-comment-add-attachment" href="#" title="Añadir un adjunto...">
                        <span class="icon-sm icon-attachment"></span>
                    </a>
                    <a class="comment-box-options-item js-comment-mention-member" href="#" title="Designar a un miembro…">
                        <span class="icon-sm icon-mention"></span>
                    </a>
                    <a class="comment-box-options-item js-comment-add-emoji" href="#" title="Añadir un emoticono...">
                        <span class="icon-sm icon-emoji"></span>
                    </a><a class="comment-box-options-item js-comment-add-card" href="#" title="Añadir tarjeta...">
                        <span class="icon-sm icon-card"></span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Clinica",
    data() {
        return {
            dialogFormVisible: false,
            newEntry: {
                name: "",
                region: ""
            },
            clinica: {
                id: 1,
                name: "casa",
                beds_available: 100,
                permission: "cualca",
                pacientes: [{
                    id: 1,
                    name: "Carlos",
                    last_name: "Gomez",
                    dni: "12.134.565",
                    numero_de_paciente: "0012-19"
                }]
            }
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