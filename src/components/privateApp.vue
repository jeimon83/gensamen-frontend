<template>
	<el-container>
    <el-aside width="200px">
      <el-header class="menu-header">
        <div class="main-title">Gensamen</div>
      </el-header>
      <div class="user">
      	<div class="userData">{{ user.first_name }} {{ user.last_name }}</div>
      	<p class="userEmail">{{ user.email }}</p>
      </div>
      <el-menu>
        <el-menu-item>
          <router-link :to="{ name:'Dashboard' }" class="el-link el-link--default">
            <i class="el-icon-s-operation"></i> Dashboard </router-link>
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
import interceptorSetup from '../services/interceptor';
export default {
	name: 'PrivateApp',
	data() {
		return {
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
		interceptorSetup();
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
	background: #f9f9f9;
	.userData {
		font-size: 1em;
		color: #409EFF; 
	}
	.userEmail {
		font-size: 0.8em;
		color: gray;
	}
}
</style>