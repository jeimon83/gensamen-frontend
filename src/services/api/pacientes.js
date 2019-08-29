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

async function updatePacientes(clinicId, id, data) {
	try {
		const response = await axios.patch(`/clinics/${clinicId}/patients/${id}`)
		console.log(response);
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
	updatePacientes,
	//deletePacientes
} 