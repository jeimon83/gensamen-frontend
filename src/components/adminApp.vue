<template>
	<el-container>
    <el-aside width="200px">
      <el-header class="menu-header">
        <router-link :to="{ name: 'Users' }" class="main-title">Gensamen</router-link>
      </el-header>
      <div class="user">
      	<router-link :to="{ name: 'UserProfile' }" class="userData">
          <i class="el-icon-user"></i> {{ user.first_name }} {{ user.last_name }}
        </router-link>
      	<p class="userEmail">{{ user.email }}</p>
        <p class="userEmail"><span><b>Rol:</b> {{ user.role }}</span></p>
      </div>
      <el-menu>
        <el-menu-item>
          <router-link :to="{ name:'Users' }" class="el-link el-link--default">
            <i class="el-icon-s-operation"></i> Usuarios </router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link :to="{ name:'Clinicas' }" class="el-link el-link--default">
            <i class="el-icon-school"></i> Clinicas </router-link>
        </el-menu-item>
        <el-menu-item index="3">
		      <a @click="logout()" class="el-link el-link--default">
		      	<i class="el-icon-unlock"></i> Salir
		      </a>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container style="position: relative;">
      <div class="app-content">
      	<router-view/>
      </div>
      <el-footer class="footer-gensamen">
	      Gensamen ® 2019
	    </el-footer>
    </el-container>
  </el-container>
</template>

<script>
export default {
	name: 'AdminApp',
	data() {
		return {
			showPerfil: false,
			user: {
				email: "",
				first_name: "",
				last_name: "",
				role: "",
				id: ""
			}
		}
	},
	created() {
		this.loadUser();
	},
	methods: {
		loadUser() {
			this.user = JSON.parse(localStorage.getItem('user'));
		},
		logout() {
			localStorage.removeItem('token');
			localStorage.removeItem('user')
			this.$router.push('/login');
		},
		perfil() {
			this.showPerfil = true;
		}
	}
};
</script>

<style lang="scss">
.app-content {
	height: 100%;
	overflow: scroll;
}
.footer-gensamen {
	position: absolute;
	bottom: 0px;
	left: 0;
	width: 100%;
}
.user {
	padding: 20px;
	background: #f1f1f1;
	.userData {
		font-size: 1em;
		color: #409EFF;
    text-decoration: none;
	}
	.userEmail {
		font-size: 0.8em;
		color: gray;
	}
}
</style>