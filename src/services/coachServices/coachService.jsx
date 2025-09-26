import axios from "axios";
import { BASE_API_URL } from "../../config/app.config";

const coachService = {
  async signup(data) {
    try {
      const res = await axios.post(`${BASE_API_URL}/coach/signup`, data);

      // If server responds with success
      return {
        success: true,
        message: res.data.message,
        data: res.data.data,
      };
    } catch (err) {
      console.error("Signup API error:", err.response?.data || err.message);
      return {
        success: false,
        message: err.response?.data?.message || "Signup failed",
        error: err.response?.data?.error || err.message,
      };
    }
  },

  async checkMobileAvailability(mobile) {
    try {
      const res = await axios.post(`${BASE_API_URL}/coach/check-mobile`, {
        mobile,
      });

      // Response format: { available: true/false, message: "..." }
      return res.data;
    } catch (err) {
      console.error(
        "CheckMobile API error:",
        err.response?.data || err.message
      );
      return {
        available: false,
        message: err.response?.data?.message || err.message || "Network error",
      };
    }
  },

  // ✅ Placeholder for future APIs
};

export default coachService;
