import axios from "axios"

axios.defaults.baseURL = "https://gensamen-backend-testing.herokuapp.com/"

async function getPacientes(clinicId) {
	try {
		const response = await axios.get(`/clinics/${clinicId}/patients`)
		console.log(response);
		return response;
	} catch (error) {
		console.error(error);
	}
}

async function createPacientes(clinicId, data) {
	try {
		const response = await axios.post(`/clinics/${clinicId}/patients`, {
			patient: data
		})
		console.log(response);
		return response;
	} catch (error) {
		console.error(error);
  }
}

async function updatePaciente(id, data) {
	try {
		const response = await axios.patch(`/patients/${id}`, { patient: data })
		return response;
	} catch (error) {
		console.error(error);
	}
}

async function getPaciente(pacienteId) {
	try {
		const response = await axios.get(`/patients/${pacienteId}`)
		console.log(response);
		return response;
	} catch (error) {
		console.error(error);
	}
}

//async function deletePacientes(id, data) {
//	try {
//		const response = await axios.delete('/pacientes')
//		console.log(response);
//	} catch (error) {
//		console.error(error);
//	}
//}
export default {
	getPacientes,
	createPacientes,
	updatePaciente,
	getPaciente
	//deletePacientes
} 