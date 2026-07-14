import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const API_BASE_URL = "https://vendor-management-xd2c.onrender.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

let routerRef = null;

export const setRouter = (router) => {
  routerRef = router;
};

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync("@ict_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.log("Token attach error:", e);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const failedUrl = error.config?.url || "";
    if (
      error.response?.status === 401 &&
      routerRef &&
      failedUrl.includes("/api/auth/me")
    ) {
      try {
        await SecureStore.deleteItemAsync("@ict_token");
        await SecureStore.deleteItemAsync("@ict_user");
      } catch (e) {
        console.log("Token clear error:", e);
      }
      routerRef.replace("/(auth)/login");
    }
    return Promise.reject(error);
  }
);

export const pingBackend = async () => {
  try {
    await api.get("/ping");
  } catch (error) {
    console.log("Ping failed:", error.message);
  }
};
