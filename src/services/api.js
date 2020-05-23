import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://192.168.1.8:3131",
  headers: {
    authorization: `Bearer ${token}`
  }
});

export default api;
