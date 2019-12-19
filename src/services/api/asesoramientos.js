import axios from "axios"

axios.defaults.baseURL = "https://gensamen-backend-testing.herokuapp.com/"

async function getAsesoramiento(asesoramientoId) {
	try {
		const response = await axios.get(`/asesoramientos/${asesoramientoId}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error
	}
}

async function getAsesoramientos(asesoramientoId) {
	try {
		const response = await axios.get(`/internments/${internacionId}/asesoramientos`);
    return response;
  } catch (error) {
    console.error(error);
    throw error
	}
}

async function createAsesoramientos(id, data) {
  try {
	const response = await axios.post(`/internments/${id}/asesoramientos`, { asesoramientos: data });
    return response;
  } catch (error) {
    console.error(error);
    throw error
  }
}