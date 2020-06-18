import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "https://rrfinancesback.herokuapp.com",
  headers: {
    authorization: `Bearer ${token}`
  }
});

export default api;
