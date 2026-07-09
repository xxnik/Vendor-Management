import axios from "axios";

export const API_BASE_URL = "http://10.210.94.213:5000";

export const api = axios.create({
  baseURL: API_BASE_URL,
});
