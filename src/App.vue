<template>
  <router-view/>
</template>

<script>

export default {
  name: 'app'
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
  background: #f1f4f8;
}
.el-header, .el-footer {
  background: #f1f4f8;
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
}
/* Global styles */
.main-title {
  font-size: 1em;
}
</style>
