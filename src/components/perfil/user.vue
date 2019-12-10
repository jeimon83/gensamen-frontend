<template>
	<div>
		<el-header>
      <div class="title">usuario</div>
      <el-button type="primary" @click="openEditUser()" icon="el-icon-edit">editar usuario</el-button>      
    </el-header>

    <el-main>
    <div class="user-row">
        <div class="label">Nombre:</div>
        <div class="value"> {{ user.first_name }} {{ user.last_name }} </div>
      </div>
      <div class="user-row">
        <div class="label">Email:</div>
        <div class="value">{{ user.email }} </div>
      </div>
      <div class="user-row">
        <div class="label">Roll:</div>
        <div class="value">{{ user.role }} </div>
      </div>
      <el-dialog
      	title="editar usuario"
      	:visible.sync="showEditUser"
      	:show-close="false"
      	:close-on-press-escape="false"
      	:close-on-click-modal="false">
          <el-form :model="user" label-width="120px">
              <el-form-item label="Nombre">
                  <el-input v-model="user.first_name"></el-input>
              </el-form-item>
              <el-form-item label="Apellido">
                  <el-input v-model="user.last_name"></el-input>
              </el-form-item>
              <el-form-item label="Email">
                  <el-input v-model="user.email" disabled readonly/>
              </el-form-item>
              <el-form-item label="Roll">
                  <el-input v-model="user.role" disabled readonly/>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="closeUserModal()">Cancelar</el-button>
            <el-button type="primary" @click="saveUser()">Guardar</el-button>
          </span>
      </el-dialog>
    </el-main>
	</div>
</template>

<script>
import userApi from '@/services/api/user'
export default {
	data() {
		return {
			showEditUser: false,
			user: {
				first_name: "",
				last_name: "",
				email: "",
				role: ""
			}
		}
	},
	 created() {
        this.loadUser()
      },
	methods: {
		loadUser() {
			this.user = JSON.parse(localStorage.getItem('user'));
			console.log(this.user)
		},
		openEditUser() {
			this.showEditUser = true;
		},
		closeUserModal() {
      this.showEditUser = false;
		},
		saveUser() {
      userApi.updateUser(this.user.data)
        .then(response => {
          this.user = response.data.user;
          this.$message({
            message: 'el usuario se actualizo con exito',
            type: 'success'
          });
        }).catch(error => {
          console.log(error);
          this.$message({
            message: 'Hubo un error al actualizar el usuario',
            type: 'error'
          });
        }).finally(() => {
          this.openEditUser = false;
        });
    },
	}
};

</script>
<style lang="scss">
.user-row {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  font-size: 1.1em;
  .label {
    flex: 1;
    padding: 5px 0px;
    font-weight: bold;
  }
  .value { 
    border-bottom: dashed #ddd 1px;
    flex: 5;
    padding: 5px 10px;
  }
}

</style>