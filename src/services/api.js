import axios from "axios";

const api = axios.create({
  baseURL: "https://rrfinancesback.herokuapp.com",
});

export default api;
