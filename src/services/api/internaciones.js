import axios from "axios"

axios.defaults.baseURL = "https://gensamen-backend-testing.herokuapp.com/"

async function getInternacionesClinica(clinicaId) {
	try {
		const response = await axios.get(`/clinics/${clinicaId}/internments`);
    return response;
  } catch (error) {
    console.error(error);
    throw error
	}
}

async function getInternacionesPaciente(patientId) {
	try {
		const response = await axios.get(`/patients/${patientId}/internments`);
    return response;
  } catch (error) {
    console.error(error);
    throw error
	}
}

async function getInternacion(internacionId) {
	try {
		const response = await axios.get(`/internments/${internacionId}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error
	}
}

async function createInternacion(patientId, data) {
	console.log(data.begin_date);
	try {
		const response = await axios.post(`/patients/${patientId}/internments`, {
			internment: data
		});
		return response;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function updateInternacion(id, data) {
	try {
		const response = await axios.patch(`/internments/${id}`, {
			internment: data
		});
		return response;
	} catch (error) {
		throw error;
	}
}

export default {
	getInternacionesClinica,
	getInternacionesPaciente,
	getInternacion,
	createInternacion,
	updateInternacion
}