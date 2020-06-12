import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://172.22.3.36:3131",
  headers: {
    authorization: `Bearer ${token}`
  }
});

export default api;
