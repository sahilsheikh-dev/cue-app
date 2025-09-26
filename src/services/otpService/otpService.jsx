// src/services/otpService.jsx
import axios from "axios";
import { BASE_API_URL } from "../../config/app.config";

const otpService = {
  sendOtp: async (phone, userType) => {
    try {
      const res = await axios.post(`${BASE_API_URL}/otp/send`, {
        phone,
        userType,
      });
      return res.data;
    } catch (err) {
      console.log("sendOtp error:", err.response?.data || err.message);
      throw err.response?.data || { message: err.message };
    }
  },

  verifyOtp: async (otpId, otp) => {
    try {
      const res = await axios.post(`${BASE_API_URL}/otp/verify`, {
        otpId,
        otp,
      });
      return res.data;
    } catch (err) {
      console.log("verifyOtp error:", err.response?.data || err.message);
      throw err.response?.data || { message: err.message };
    }
  },

  resendOtp: async (otpId) => {
    try {
      const res = await axios.post(`${BASE_API_URL}/otp/resend`, { otpId });
      return res.data;
    } catch (err) {
      console.log("resendOtp error:", err.response?.data || err.message);
      throw err.response?.data || { message: err.message };
    }
  },
};

export default otpService;
