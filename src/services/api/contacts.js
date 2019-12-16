import axios from "axios"

axios.defaults.baseURL = "https://gensamen-backend-testing.herokuapp.com/"

async function createContact(pacienteId, data) {
	try {
		const response = await axios.post(`/patients/${pacienteId}/contacts`,  {
			contact: data
		})
		return response;
	} catch (error) {
		console.error(error);
	}
}

async function getContacts(pacienteId) {
	try {
		const response = await axios.get(`/patients/${pacienteId}/contacts`)
		return response;
	} catch (error) {
		console.error(error);
	}
}

export default {
	createContact,
	getContacts
}