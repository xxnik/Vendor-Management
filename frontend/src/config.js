import axios from "axios";

export const API_BASE_URL = "https://vendor-management-xd2c.onrender.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
});
// "http://localhost:5000"
// "https://vendor-management-xd2c.onrender.com"