import axios from "axios"

axios.defaults.baseURL = "https://gensamen-backend-testing.herokuapp.com/"

async function getReporte(reporteId) {
	try {
		const response = await axios.get(`/report_requests/${reporteId}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error
	}
}

async function getReportes(internacionId) {
	try {
		const response = await axios.get(`/internments/${internacionId}/report_requests`);
    return response;
  } catch (error) {
    console.error(error);
    throw error
	}
}

async function createReporte(id, data) {
  try {
	const response = await axios.post(`/internments/${id}/report_requests`, { report_request: data });
    return response;
  } catch (error) {
    console.error(error);
    throw error
  }
}

async function updateReporte(id) {
	console.log(data)
	try {
		const response = await axios.patch(`/reportes/${id}`);
		console.log(response);
		return response;
	} catch (error) {
		throw error;
	}
}



export default {
	getReporte,
	getReportes,
	createReporte,
	updateReporte
}