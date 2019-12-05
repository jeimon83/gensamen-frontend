import axios from "axios"

axios.defaults.baseURL = "https://gensamen-backend-testing.herokuapp.com/"

async function getUsers() {
	try {
    const response = await axios.get('/users');
    return response;
  } catch (error) {
    console.error(error);
    throw error
  }
}

export default {
	getUsers
}