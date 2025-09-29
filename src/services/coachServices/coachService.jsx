import axios from "axios";
import { BASE_API_URL } from "../../config/app.config";
import get from "../../secureStore/get"; // to fetch token from storage

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

  async coachProfileSetup(payload) {
    try {
      const token = await get("auth"); // read from secureStore
      const res = await axios.patch(
        `${BASE_API_URL}/coach/coachProfileSetup`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return { success: true, message: res.data.message, data: res.data.data };
    } catch (err) {
      console.error(
        "coachProfileSetup API error:",
        err.response?.data || err.message
      );
      return {
        success: false,
        message: err.response?.data?.message || "Profile setup failed",
        error: err.response?.data?.error || err.message,
      };
    }
  },

  async saveStory({ id, story }) {
    try {
      const token = await get("auth");
      const res = await axios.patch(
        `${BASE_API_URL}/coach/saveStory`,
        { id, story },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return {
        success: true,
        message: res.data.message,
        data: res.data.data,
      };
    } catch (err) {
      console.error("saveStory API error:", err.response?.data || err.message);
      return {
        success: false,
        message: err.response?.data?.message || "Failed to save story",
        error: err.response?.data?.error || err.message,
      };
    }
  },

  async coachAgreementTerms({ id, agreement_terms }) {
    try {
      const token = await get("auth");
      const res = await axios.patch(
        `${BASE_API_URL}/coach/coachAgreementTerms`,
        { id, agreement_terms },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return {
        success: true,
        message: res.data.message,
        data: res.data.data,
      };
    } catch (err) {
      console.error(
        "coachAgreementTerms API error:",
        err.response?.data || err.message
      );
      return {
        success: false,
        message:
          err.response?.data?.message || "Failed to save agreement terms",
        error: err.response?.data?.error || err.message,
      };
    }
  },

  async getMyInfo() {
    try {
      const token = await get("auth");
      const res = await axios.get(`${BASE_API_URL}/coach/gerMyInfo`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true, data: res.data.data, message: res.data.message };
    } catch (err) {
      console.error("getMyInfo API error:", err.response?.data || err.message);
      return {
        success: false,
        message: err.response?.data?.message || "Failed to fetch coach info",
      };
    }
  },

  async uploadWorkAsset({ id, index, file }) {
    try {
      const token = await get("auth");

      const formData = new FormData();
      formData.append("id", id);
      formData.append("index", index); // must be single index

      if (file) {
        formData.append("workAsset", {
          uri: file.content,
          type: file.type === "video" ? "video/mp4" : "image/jpeg",
          name: `asset_${index}.${file.type === "video" ? "mp4" : "jpg"}`,
        });
      }

      const res = await axios.patch(
        `${BASE_API_URL}/coach/upload-work-asset`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return {
        success: true,
        message: res.data.message,
        data: res.data.data,
      };
    } catch (err) {
      console.error(
        "uploadWorkAsset API error:",
        err.response?.data || err.message
      );
      return {
        success: false,
        message:
          err.response?.data?.message || "Failed to upload/delete work asset",
        error: err.response?.data?.error || err.message,
      };
    }
  },

  async deleteCoachAccount(coachId) {
    try {
      const token = await get("auth"); // get auth token from secure store

      const res = await axios.delete(
        `${BASE_API_URL}/coach/deleteCoach/${coachId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return { success: true, message: res.data.message, data: res.data.data };
    } catch (err) {
      console.error(
        "deleteCoachAccount API error:",
        err.response?.data || err.message
      );
      return {
        success: false,
        message:
          err.response?.data?.message || "Failed to delete coach account",
        error: err.response?.data?.error || err.message,
      };
    }
  },

  // ✅ Placeholder for future APIs
};

export default coachService;
