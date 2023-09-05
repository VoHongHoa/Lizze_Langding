import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api",
});
//axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
instance.interceptors.response.use((response) => {
  return response;
});
instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("access_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
export default instance;
