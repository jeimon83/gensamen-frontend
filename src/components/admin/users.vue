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

    <el-dialog
      title="Ingresar nuevo Usuario"
      :visible.sync="visible"
      top="60px"
      width="50%">
      <div v-loading="loadingNewUser">
        <el-form :model="user" ref="usersForm" :rules="rules">      
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Nombre" prop="name">
                <el-input placeholder="nombre completo" v-model="user.name"></el-input>
              </el-form-item>
              <el-form-item label="Email" prop="email">
                <el-input placeholder="email" v-model="user.email"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Contraseña" prop="password">
                <el-input type="password" placeholder="Contraseña" v-model="user.password"/>
              </el-form-item>
              <el-form-item label="Confimar Contraseña" prop="password_confirmation">
                <el-input type="password" placeholder="Confimar Contraseña" v-model="user.password_confirmation"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="Rol" prop="role">
                <el-select placeholder="Rol" style="width: 100%" v-model="user.role" prop="role">
                  <el-option v-for="role in roles" :key="role.value" :label="role.label" :value="role.value"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="Clinica" prop="clinic_id">
                <el-select placeholder="Clinica" style="width: 100%" :disabled="disableClinic" v-model="user.clinic_id">
                  <el-option v-for="clinica in clinicas" :key="clinica.id" :label="clinica.name" :value="clinica.id"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeForm()">Cancelar</el-button>
        <el-button type="primary" @click="saveUser()" :disabled="loadingNewUser">Guardar</el-button>
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
    var validatePass = (rule, value, callback) => {
      if (value === '' || value == null || value == undefined) {
        callback(new Error('La contraseña no puede estar en blanco'));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '' || value == null || value == undefined) {
        callback(new Error('La contraseña no puede estar en blanco'));
      } else if (value !== this.user.password) {
        callback(new Error('El password no coincide!'));
      } else {
        callback();
      }
    };

    var checkClinic = (rule, value, callback) => {
      if (this.user.role === 'admin') {
        callback()
      } else {
        if (this.user.clinic_id == null)
          callback(new Error('La clinica no puede estar en blanco'));
      }
    }
		return {
			users: [],
      loading: false,
      loadingNewUser: false,
      visible: false,
      clinicas: [],
      disableClinic: true,
      roles: [
        { label: "Administrador", value: "admin" },
        { label: "Operador", value: "studio_op" },
        { label: "Operador de clinica", value: "clinic_op" }
      ],
      user: { name: null, email: null, clinic_id: null, role: null, password: null, password_confirmation: null },
      rules: {
        name: [
          { required: true, message: 'Nombre no puede estar en blanco', trigger: 'blur' },
        ],
        email: [
          { required: true, message: 'Email no puede estar en blanco', trigger: 'blur'}
        ],
        clinic_id: [
          { required: true, validator: checkClinic, trigger: 'blur' }
        ],
        role: [
          { required: true, message: 'El role no puede estar en blanco', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'La contraseña no puede estar en blanco', validator: validatePass, trigger: 'blur' }
        ],
        password_confirmation: [
          { required: true, message: 'La contraseña no puede estar en blanco', validator: validatePass2, trigger: 'blur' }
        ]
      }
		}
	},
  watch: {
    'user.role': function(newValue, oldValue) {
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
      usersApi.getUsers().then(response => {
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
    closeForm() {
      this.visible = false;
      this.loadingNewUser = false;
      this.user = { name: null, email: null, clinic_id: null, role: null, password: null, password_confirmation: null };
    },
    saveUser() {
      this.loadingNewUser = true;
      usersApi.createUsers(this.user)
        .then(response => {
          this.user.push(response.data.users);
          this.$message({
            message: 'El usuario se a guardado con exito',
            type: 'success'
          });
          this.closeForm();
        })
        .catch(error => {
          this.$message({
            message: 'Hubo un error al guardar El usuario',
            type: 'error'
          });
        })
        .finally(() => {
          this.loadingNewUser = false
        })
    }
  }
};
</script>