import axios from "axios";
import router from "../router";

export default function setup() {
  axios.interceptors.request.use(
    function(config) {
      const token = localStorage.getItem("token");
      if (token) config.headers.common["Authorization"] = `Bearer ${token}`;
      config.headers.common["Accept"] = "application/json";
      config.headers.common["Content-Type"] = "application/json";
      config.headers.common["Access-Control-Allow-Origin"] = "*";
      config.headers.common["Access-Control-Allow-Headers"] =
        "Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin";
      return config;
    },
    function(err) {
      return Promise.reject(err);
    }
  );
  axios.interceptors.response.use(
    response => {
      return Promise.resolve(response);
    },
    error => {
      console.log(this.$route.matched.some(({ name }) => name === 'login'))
      if (error.response.status === 401) {
        router.push("/login");
      }
      return Promise.reject(error);
    }
  );
}