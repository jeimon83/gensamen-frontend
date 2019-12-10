 <template>
	<div class="container-wrapper">
    <el-header>
      <div class="main-title">Usuarios</div>
      <div>
        <el-button type="primary" 
        size="small" 
        @click="openUserModal()" 
        icon="el-icon-s-custom">
        nuevo usuario
        </el-button>
      </div>
    </el-header>

    <el-dialog title="nuevo usuario" :visible.sync="visible">
      <el-form :model="user" ref="usersForm" :rules="rules" label-width="200px">
        <el-form-item label="Nombre" prop="name">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label="Rol">
          <el-select placeholder="Rol" style="width: 100%" v-model="user.role" prop="role">
            <el-option v-for="role in roles" :key="role.value" :label="role.label" :value="role.value"/>
          </el-select>
        </el-form-item>
        <el-form-item v-if="user.role" label="Clinica">
          <el-select placeholder="Clinica" style="width: 100%" :disabled="disableClinic" v-model="user.clinic_id">
            <el-option v-for="clinica in clinicas" :key="clinica.id" :label="clinica.name" :value="clinica.id"/>
          </el-select>
        </el-form-item>
        {{ user }}
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="entryVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="saveUser()">Guardar</el-button>
      </span>
    </el-dialog>

		<el-main>
			<el-table
        id="usersTable"
        :data="users"
        style="width: 100%"
        v-loading="loading">
        <el-table-column
          prop="email"
          label="Email">
        </el-table-column>
        <el-table-column
          prop="full_name"
          label="Nombre completo">
        </el-table-column>
        <el-table-column
          label="Clinica">
          <template v-slot="scope">
            <span v-if="scope.row.clinic">{{scope.row.clinic.name }}</span>
            <span v-else>----</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="role"
          label="Rol">
        </el-table-column>    
      </el-table>
		</el-main>
	</div>
</template>

<script>
import usersApi from "@/services/api/user";
import clinicasApi from "@/services/api/clinicas";

export default {
	name: 'AdminApp',
	data() {
		return {
			users: [],
      loading: false,
      visible: false,
      clinicas: [],
      disableClinic: false,
      roles: [
        { label: "Administrador", value: "admin" },
        { label: "Operador", value: "studio_op" },
        { label: "Operador de clinica", value: "clinic_op" }
      ],
      user: {
        name: "",
        email: "",
        clinic_id: "",
        role: ""
      },
      rules: {
        name: [
          { required: true, message: 'Nombre no valido', trigger: 'blur' },
        ],
        email: [
          { required: true, message: 'Email no valido', trigger: 'blur'}
        ],
        Clinica: [
          { required: true, message: 'Clinica no valida', trigger: 'blur' }
        ],
        role: [
          { required: true, message: 'role no valida', trigger: 'blur' }
        ],
      }
		}
	},
  watch: {
    'user.role': function(newValue, oldValue) {
      console.log(oldValue, newValue)
      if (newValue === 'admin') {
        this.user.clinic_id = null;
        this.disableClinic = true
      } else {
        this.disableClinic = false;
      }
    }
  },
	created() {
    this.users = this.$route.params.id;
    this.loadUsers();
    this.clinicas = this.$route.params.id;
    this.loadClinicas();
  },
  methods: {
  	loadUsers() {
      this.loading = true;
      usersApi.getUsers(this.users).then(response => {
        this.users = response.data.users;
      }).catch(error => {
        console.log("Error cargando usuario", error);
      }).finally(() => {
        this.loading = false;
      });
    },
    openUserModal() {
        this.visible = true;
    },
    loadClinicas() {
      this.loadingClinicas = true;
      clinicasApi.getClinicas().then(response => {
        this.clinicas = response.data.clinics;
      }).catch(error => {
        console.log("Error cargando clinicas", error);
      }).finally(() => {
        this.loadingClinicas = false;
      })
    },
    saveUser() {
      this.loading = true;
      this.$refs.usersForm.validate((valid) => {
        if (valid) {
          usersApi.createUsers(this.user)
            .then(response => {
              this.user.push(response.data.users);
              this.$message({
                message: 'El usuario se a guardado con exito',
                type: 'success'
              });
              this.visible = false;
              this.user = {
                name: "",
                email: "",
                Clinica: "",
                role: "",
              };
            })
            .catch(error => {
              console.log(error)
              this.$message({
                message: 'Hubo un error al guardar El usuario',
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