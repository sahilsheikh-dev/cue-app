import axios from "axios";
import get from "../secureStore/get";
import { BASE_API_URL } from "./app.config";
import { logout as localLogout } from "../services/authServices/authService";

// Create instance
const api = axios.create({
  baseURL: BASE_API_URL,
});

// Attach token on every request
api.interceptors.request.use(
  async (config) => {
    const token = await get("auth");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 globally
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("❌ JWT expired or invalid. Auto-logging out...");
      await localLogout(); // clears storage

      // 🔹 optional: notify app-level listener
      if (global.onUnauthorized) {
        global.onUnauthorized();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
