<template>
  <div>
    <h1>clinicaa</h1>
    <h3> id: {{ clinica.id }} </h3>
    <h3> nombre: {{ clinica.name }}</h3>
    <h3> camas disponibles: {{ clinica.beds_available }}</h3>
    <h3> permission: {{ clinica.permission }} </h3>
  </div>
</template>
<script>
export default {
  name: "clinica",
  data() {
    return {
      clinica: {
        id: 1,
        name: "casa",
        beds_available: 100,
        permission: "cualca"
      }
    }
  }
};
</script>