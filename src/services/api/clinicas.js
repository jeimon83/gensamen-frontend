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
	console.log(data)
	try {
		const response = await axios.patch(`/clinics/${id}`, { clinic: data });
		console.log(response);
		return response;
	} catch (error) {
		throw error;
	}
}

//async function deleteClinica() {
	//try {
		//const response = await axios.get('/clinicas');
		//console.log(response);
	//} catch (error) {
		//console.error(error);
	//}
//}

//async function getUsers(id,data) {
//	try {
//		const response = await axios.get('/users')
//		console.log(response);
//	} catch (error) {
//		console.log(error);
//	}
//}

//async function createdLogin(id) {
//	try {
//		const response = await axios.post('/login')
//		console.log(response);
//	} catch (error) {
//		console.log(error);
//	}
//}




export default {
	getClinicas,
	createClinica,
	updateClinica,
	getClinica
	//deleteClinica,
}
