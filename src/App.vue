<template>
  <router-view/>
</template>

<script>
import interceptorSetup from './services/interceptor';

export default {
  name: 'app',
  created() {
    interceptorSetup()
  }
};
</script>

<style lang="scss">
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
html, body {
  height: 100%;
  margin: 0px;
  font-family: 'Raleway', sans-serif;
}

.el-container, .container-wrapper {
  height: 100%;
}
.el-aside {
  border-right: solid 1px #ccc;
}
.el-header.menu-header {
  background: #f4f4f4;
}
.el-header, .el-footer {
  background: #f4f4f4;
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

.el-header {
  display: flex !important;
  justify-content: space-between;
  padding: 10px 0px;
  .main-title {
  font-size: 1.2em;
}
}
/* Global styles */
.menu-header {
  .main-title {
    font-size: 1.2em;
    font-weight: 444;
    color: #555;
    text-decoration: none;
    text-transform: uppercase;
  }
}
</style>
