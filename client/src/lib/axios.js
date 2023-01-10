import { API_URL } from "../config";
import Axios from "axios";
import Cookies from "js-cookie";

const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use((request) => {
  request.headers["X-Auth-Token"] = Cookies.get("authToken");

  return request;
});

axios.interceptors.response.use((response) => {
  return response.data;
});

export default axios;
