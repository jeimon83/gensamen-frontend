import axios from "axios"

axios.defaults.baseURL = "https://gensamen-backend-testing.herokuapp.com/"

async function getAsesoramiento(asesoramientoId) {
	try {
		const response = await axios.get(`/help_requests/${asesoramientoId}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error
	}
}

async function getAsesoramientosByInternacion(internacionId) {
	try {
		const response = await axios.get(`/internments/${internacionId}/help_requests`);
    return response;
  } catch (error) {
    console.error(error);
    throw error
	}
}

async function getAsesoramientosByClinica(clinicaId) {
	try {
		const response = await axios.get(`/clinics/${clinicaId}/help_requests`);
    return response;
  } catch (error) {
    console.error(error);
    throw error
	}
}


async function createAsesoramiento(data) {
  try {
	const response = await axios.post(`/help_requests`, { help_request: data });
    return response;
  } catch (error) {
    console.error(error);
    throw error
  }
}

async function addComentAsesoramiento(data, asesoramientoId) {
  try {
		const response = await axios.post(`/help_requests/${asesoramientoId}/comments`, { comment: data });
    return response;
  } catch (error) {
    console.error(error);
    throw error
  }
}


export default {
	getAsesoramiento,
	getAsesoramientosByInternacion,
	getAsesoramientosByClinica,
	createAsesoramiento,
	addComentAsesoramiento
}