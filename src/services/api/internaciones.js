import axios from "axios"

axios.defaults.baseURL = "https://gensamen-backend-testing.herokuapp.com/"

async function getInternacion(clinicId, patientId) {
	try {
		const response = await axios.get(`/clinics/${clinicId}/patients/${patientId}/internments`);
    return response;
  } catch (error) {
    console.error(error);
    throw error
	}
}

async function createInternacion(clinicId, patientId, data) {
	try {
		const response = await axios.post(`/clinics/${clinicId}/patients/${patientId}/internments`);
		return response;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function updateInternacion(clinicId, patientId, id, data) {
	try {
		const response = await axios.patch(`/clinics/${clinicId}/patients/${patientId}/internments/${id}`);
		console.log(response);
		return response;
	} catch (error) {
		throw error;
	}
}