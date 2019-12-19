import axios from "axios"

axios.defaults.baseURL = "https://gensamen-backend-testing.herokuapp.com/"

async function updateUser(data) {
	try {
		const response = await axios.patch(`/users/update`, { user: data })
		return response;
	} catch (error) {
		console.error(error);
	}
}

async function createUsers(data) {
	try {
		const response = await axios.post(`/users`, { user: data })
		return response;
	} catch (error) {
		console.log(error);
	}
}

async function getUsers() {
	try {
		const response = await axios.get(`/users`)
		return response;
	} catch (error) {
		console.log(error);
	}
}

export default {
	updateUser,
	getUsers,
	createUsers
}
