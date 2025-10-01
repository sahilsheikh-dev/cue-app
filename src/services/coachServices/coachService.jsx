// src/services/coachServices/coachService.js
import axios from "axios";
import { BASE_API_URL } from "../../config/app.config";
import get from "../../secureStore/get"; // secure token

// helper: get Bearer header from secure store
async function authHeader() {
  const token = await get("auth");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const coachService = {
  /* -------------------- Auth-adjacent -------------------- */

  async signup(data) {
    // POST /coach/signup   (name, mobile, password, agree_*, mobileVerified?)
    try {
      const res = await axios.post(`${BASE_API_URL}/coach/signup`, data);
      return {
        success: !!res.data?.ok,
        message: res.data?.message || "Signup successful",
        data: res.data?.data,
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
    // POST /coach/check-mobile
    try {
      const res = await axios.post(`${BASE_API_URL}/coach/check-mobile`, {
        mobile,
      });
      // { ok, available, message }
      return {
        available: !!res.data?.available,
        message: res.data?.message,
      };
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

  /* -------------------- Coach profile/info -------------------- */

  async getMyInfo() {
    // GET /coach/me  (protected)
    try {
      const headers = await authHeader();
      const res = await axios.get(`${BASE_API_URL}/coach/me`, { headers });
      return {
        success: !!res.data?.ok,
        data: res.data?.data || res.data?.coach, // controller returns {ok, data} for many; for /me it returns coach in data
        message: res.data?.message || "Success",
      };
    } catch (err) {
      console.error("getMyInfo API error:", err.response?.data || err.message);
      return {
        success: false,
        message: err.response?.data?.message || "Failed to fetch coach info",
      };
    }
  },

  async coachProfileSetup(payload) {
    // PATCH /coach/profile-setup (protected)
    try {
      const headers = await authHeader();
      const res = await axios.patch(
        `${BASE_API_URL}/coach/profile-setup`,
        payload,
        { headers }
      );
      return {
        success: !!res.data?.ok,
        message: res.data?.message,
        data: res.data?.data,
      };
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
    // PATCH /coach/story (protected)
    try {
      const headers = await authHeader();
      const res = await axios.patch(
        `${BASE_API_URL}/coach/story`,
        { id, story },
        { headers }
      );
      return {
        success: !!res.data?.ok,
        message: res.data?.message,
        data: res.data?.data,
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
    // PATCH /coach/agreement-terms (protected)
    try {
      const headers = await authHeader();
      const res = await axios.patch(
        `${BASE_API_URL}/coach/agreement-terms`,
        { id, agreement_terms },
        { headers }
      );
      return {
        success: !!res.data?.ok,
        message: res.data?.message,
        data: res.data?.data,
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

  async deleteCoachAccount(coachId) {
    // DELETE /coach/delete/:id (protected)
    try {
      const headers = await authHeader();
      const res = await axios.delete(
        `${BASE_API_URL}/coach/delete/${coachId}`,
        { headers }
      );
      return {
        success: !!res.data?.ok,
        message: res.data?.message,
        data: res.data?.data,
      };
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

  /* -------------------- Uploads -------------------- */

  async uploadCertificate({ id, index, file }) {
    // POST /coach/upload/certificates  (protected)
    // field name: "certificates" (array), body.index can be single or array
    try {
      const headers = await authHeader();

      const formData = new FormData();
      formData.append("id", id);
      formData.append("index", index);

      if (file) {
        formData.append("certificates", {
          uri: file.content,
          type: "image/jpeg",
          name: `certificate_${index}.jpg`,
        });
      }

      const res = await axios.post(
        `${BASE_API_URL}/coach/upload/certificates`,
        formData,
        {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return {
        success: !!res.data?.ok,
        message: res.data?.message,
        data: res.data?.data,
      };
    } catch (err) {
      console.error(
        "uploadCertificate API error:",
        err.response?.data || err.message
      );
      return {
        success: false,
        message:
          err.response?.data?.message || "Failed to upload/delete certificate",
        error: err.response?.data?.error || err.message,
      };
    }
  },

  async uploadWorkAsset({ id, index, file }) {
    // PATCH /coach/upload/work-assets (protected)
    try {
      const headers = await authHeader();

      const formData = new FormData();
      formData.append("id", id);
      formData.append("index", index);
      if (file) {
        formData.append("workAsset", {
          uri: file.content,
          type:
            file.mimeType ||
            (file.type === "video" ? "video/mp4" : "image/jpeg"),
          name:
            file.fileName ||
            `asset_${index}.${file.type === "video" ? "mp4" : "jpg"}`,
        });
      }

      const res = await axios.patch(
        `${BASE_API_URL}/coach/upload/work-assets`,
        formData,
        {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return {
        success: !!res.data?.ok,
        message: res.data?.message,
        data: res.data?.data,
      };
    } catch (err) {
      console.error(
        "uploadWorkAsset error:",
        err.response?.data || err.message
      );

      const status = err.response?.status;
      const backendMessage = err.response?.data?.message;
      const backendError = err.response?.data?.error;

      let userMessage = "Failed to upload/delete work asset";
      if (status === 400 && backendMessage) userMessage = backendMessage;
      else if (status === 404) userMessage = "Coach not found";
      else if (status === 415)
        userMessage =
          backendMessage || "Invalid file type. Only images and videos allowed";
      else if (backendMessage) userMessage = backendMessage;

      return {
        success: false,
        message: userMessage,
        error: backendError || err.message,
        status,
      };
    }
  },

  // add inside coachService (optional)
  async uploadProfilePicture(fileUri) {
    try {
      const headers = await authHeader();
      const form = new FormData();
      form.append("profilePicture", {
        uri: fileUri,
        type: "image/jpeg",
        name: "profile.jpg",
      });
      const res = await axios.post(
        `${BASE_API_URL}/coach/upload/profile-picture`,
        form,
        { headers: { ...headers, "Content-Type": "multipart/form-data" } }
      );
      return {
        success: !!res.data?.ok,
        message: res.data?.message,
        data: res.data?.data,
      };
    } catch (e) {
      return { success: false, message: "Failed to upload" };
    }
  },
};

export default coachService;
