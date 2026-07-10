import axios from "axios";

export const API_BASE_URL = "http://localhost:5000";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const pingBackend = async () => {
  try {
    await api.get("/ping");
  } catch (error) {
    console.log("Ping failed:", error.message);
  }
};
// "http://localhost:5000"
// "https://vendor-management-xd2c.onrender.com"