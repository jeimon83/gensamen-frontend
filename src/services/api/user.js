import axios from "axios"

axios.defaults.baseURL = "https://gensamen-backend-testing.herokuapp.com/"

async function updateUser(data) {
	try {
		const response = await axios.patch(`/users/update`, { user: data })
		return response;
		console.log(response);
	} catch (error) {
		console.error(error);
	}
}

export default {
	updateUser
}
