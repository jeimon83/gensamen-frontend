<template>
  <el-container>
    <el-aside width="200px">
      <el-header class="menu-header">
        <div class="main-title">Gensamen</div>
      </el-header>
      <el-menu>
        <el-menu-item>
          <router-link :to="{ name:'Dashboard' }" class="el-link el-link--default">
            <i class="el-icon-school"></i> Dashboard </router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link :to="{ name:'Clinicas' }" class="el-link el-link--default">
            <i class="el-icon-school"></i> Clinicas </router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link :to="{ name: 'NuevoPaciente' }" class="el-link el-link--default">
            nuevo paciente
          </router-link>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <router-view/>
      <el-footer>
        Gensamen ® 2019
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>

export default {
  name: 'app'
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
html, body {
  height: 100%;
  margin: 0px;
  font-family: 'Open Sans';
}

.el-container, .container-wrapper {
  height: 100%;
}
.el-aside {
  border-right: solid 1px #e6e6e6;
}
.el-header, .el-footer {
  background: #e6e6e6;
  display: flex;
  align-items: center;
  height: 50px;
}

.menu-header {
  display: flex;
  align-items: center;
  height: 50px;
  background: transparent;
}
ul.el-menu {
  border-right: none;
}

/* Global styles */
.main-title {
  display: flex;
  align-items: center;
  justify-content: space-between; 
  font-size: 1em;
  padding: 10px 0px;
}
</style>
