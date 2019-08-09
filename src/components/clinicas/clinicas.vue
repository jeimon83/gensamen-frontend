<template>
	<div class="container-wrapper">
		<el-header>
			<div class="main-title">Clinicas</div>
		</el-header>
		<el-main>
			<table>
				<tr v-for="clinica in clinicas" :key="clinica.id">
					<td>{{ clinica.id }}</td>
					<td>{{ clinica.name }}</td>
					<td>{{ clinica.beds_available }}</td>
					<td>{{ clinica.permission }}</td>
				</tr>
			</table>				
		</el-main>
  </div>
</template>
<script>
export default {
	name: "clinicas",
	data() {
		return {
			clinicas: [
				{ id: 1, name: "Borda 1", beds_available:100, permission: "123213-22" },
				{ id: 2, name: "Borda 2", beds_available:100, permission: "123213-22" },
				{ id: 3, name: "Borda 3", beds_available:100, permission: "123213-22" },
				{ id: 4, name: "Borda 4", beds_available:100, permission: "123213-22" },
				{ id: 5, name: "Borda 4", beds_available:100, permission: "123213-22" },
				{ id: 6, name: "Borda 4", beds_available:100, permission: "123213-22" },
				{ id: 7, name: "Borda 4", beds_available:100, permission: "123213-22" },
				{ id: 8, name: "Borda 4", beds_available:100, permission: "123213-22" },
				{ id: 9, name: "Borda 4", beds_available:100, permission: "123213-22" },
				{ id: 10, name: "Borda 4", beds_available:100, permission: "123213-22" },
				{ id: 11, name: "Borda 4", beds_available:100, permission: "123213-22" },
				{ id: 12, name: "Borda 4", beds_available:100, permission: "123213-22" },
				{ id: 13, name: "Borda 4", beds_available:100, permission: "123213-22" }
			]
		}
	}
};
</script>