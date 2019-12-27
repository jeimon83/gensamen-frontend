import axios from "axios"

axios.defaults.baseURL = "https://gensamen-backend-testing.herokuapp.com/"

async function getAsesoramiento(asesoramientoId) {
	try {
		const response = await axios.get(`/internments/${asesoramientoId}/help_requests`);
    return response;
  } catch (error) {
    console.error(error);
    throw error
	}
}

async function getAsesoramientosByInternacion(internacionId) {
	try {
		const response = await axios.get(`/clinics/${internacionId}/help_requests`);
    return response;
  } catch (error) {
    console.error(error);
    throw error
	}
}

async function getAsesoramientosByClinica(help_request_id) {
	try {
		const response = await axios.get(`/help_requests/${help_request_id}/comments`);
    return response;
  } catch (error) {
    console.error(error);
    throw error
	}
}


async function createAsesoramiento(help_request_id, data) {
  try {
	const response = await axios.post(`/help_requests/${help_request_id}/comments`, { help_request: data });
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
	createAsesoramiento
}