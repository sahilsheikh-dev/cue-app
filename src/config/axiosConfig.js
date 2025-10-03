import axios from "axios";
import get from "../secureStore/get";
import { BASE_API_URL } from "./app.config";
import { logout as localLogout } from "../services/authServices/authService";

const api = axios.create({
  baseURL: BASE_API_URL,
});

// Attach token on every request (from secure store)
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

// Prevent duplicate logout/reset if multiple 401s happen at once
let isLoggingOut = false;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401 && !isLoggingOut) {
      isLoggingOut = true;
      console.warn("❌ JWT expired or invalid. Auto-logging out...");
      try {
        await localLogout(); // clears storage
      } catch (e) {
        console.warn("localLogout failed:", e.message);
      }
      if (global.onUnauthorized) {
        // schedule after current tick so React state updates in order
        setTimeout(() => {
          try {
            global.onUnauthorized();
          } finally {
            isLoggingOut = false;
          }
        }, 0);
      } else {
        // fallback if no handler is present
        isLoggingOut = false;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
