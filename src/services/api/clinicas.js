import axios from "axios"

axios.defaults.baseURL = "https://gensamen-backend-testing.herokuapp.com/"
async function getClinicas() {
	try {
    const response = await axios.get('/clinics');
    return response;
  } catch (error) {
    console.error(error);
    throw error
  }
}

async function getClinica(clinicaId) {
	try {
    const response = await axios.get(`/clinics/${clinicaId}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error
  }
}

async function createClinica(data) {
	try {
		const response = await axios.post('/clinics', { clinic: data });
		return response;
	} catch (error) {
		console.error(error);
		throw error;
	}

}

async function updateClinica(id, data) {
	try {
		const response = await axios.patch('/clinicas');
		console.log(response);
		return response;
	} catch (error) {
		console.error(error);
	}
}

//async function deleteClinica() {
	//try {
		//const responce = await axios.get('/clinicas');
		//console.log(response);
	//} catch (error) {
		//console.error(error);
	//}
//}

async function getPacientes() {
	try {
		const responce = await axios.get('/Pacientes')
		console.log(responce);
	} catch (error) {
		console.error(error);
	}
}

async function createPacientes() {
	try {
		const responce = await axios.post('/Pacientes')
		console.log(responce);
	} catch (error) {
		console.error(error);
  }
}

async function updatePacientes(id, data) {
	try {
		const responce = await axios.patch('/pacientes')
		console.log(responce);
	} catch (error) {
		console.error(error);
	}
}

//async function deletePacientes(id, data) {
//	try {
//		const responce = await axios.delete('/pacientes')
//		console.log(responce);
//	} catch (error) {
//		console.error(error);
//	}
//}






export default {
	getClinicas,
	createClinica,
	updateClinica,
	//deleteClinica,
	getPacientes,
	createPacientes,
	updatePacientes,
	//deletePacientes,
	getClinica
}