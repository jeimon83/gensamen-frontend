import axios from "axios"

axios.defaults.baseURL = "https://gensamen-backend-testing.herokuapp.com/"


async function login(email, password) {
	try {
    const response = await axios.post(`/login`, {
    	auth: {
    		email: email,
    		password: password
    	}
    });
    let { auth_token, user } = response.data;
    localStorage.setItem('token', auth_token);
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  } catch (error) {
    console.error(error);
    throw error
  }
}

export default {
	login
}