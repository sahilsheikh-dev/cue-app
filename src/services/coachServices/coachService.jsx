// src/services/coachServices/coachService.js
import axios from "axios";
import { BASE_API_URL } from "../../config/app.config";
import get from "../../secureStore/get"; // secure token

// helper: get Bearer header from secure store
async function authHeader() {
  const token = await get("auth");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/** RN-safe file part builder */
function buildFilePartFromAsset(file, defaultName = "upload.jpg") {
  let uri = file?.content || "";
  if (!uri) return null;

  const ensuredName =
    file?.fileName ||
    (uri.includes("/") ? uri.substring(uri.lastIndexOf("/") + 1) : defaultName);
  const hasExt = /\.[a-z0-9]+$/i.test(ensuredName);
  const name = hasExt ? ensuredName : defaultName;

  // detect mime
  let type = "application/octet-stream";
  if (file?.mimeType) {
    type = file.mimeType;
  } else if (name.endsWith(".jpg") || name.endsWith(".jpeg")) {
    type = "image/jpeg";
  } else if (name.endsWith(".png")) {
    type = "image/png";
  } else if (name.endsWith(".mp4")) {
    type = "video/mp4";
  }

  return { uri, name, type };
}

const coachService = {
  /* -------------------- Auth-adjacent (unchanged) -------------------- */

  async signup(data) {
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
    try {
      const res = await axios.post(`${BASE_API_URL}/coach/check-mobile`, {
        mobile,
      });
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
    try {
      const headers = await authHeader();
      const res = await axios.get(`${BASE_API_URL}/coach/me`, { headers });
      return {
        success: !!res.data?.ok,
        data: res.data?.data || res.data?.coach,
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

  /* -------------------- Certificates -------------------- */
  async uploadCertificate({ coachId, certificateId, file }) {
    try {
      const token = await get("auth");
      const formData = new FormData();
      formData.append("coachId", coachId);

      if (certificateId) {
        formData.append("certificateId", certificateId);
      }
      if (file) {
        const part = buildFilePartFromAsset(file, "certificate.jpg");
        formData.append("file", part);
      }

      const res = await axios.post(
        `${BASE_API_URL}/coach/upload/certificates`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return { success: true, message: res.data.message, data: res.data.data };
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

  /* -------------------- Work Assets -------------------- */

  async uploadWorkAsset({ coachId, assetId, file }) {
    try {
      const token = await get("auth");
      const formData = new FormData();
      formData.append("coachId", coachId);

      if (assetId) {
        formData.append("assetId", assetId);
      }
      if (file) {
        const part = buildFilePartFromAsset(
          file,
          file.mimeType?.startsWith("video")
            ? "work-asset.mp4"
            : "work-asset.jpg"
        );
        formData.append("file", part);
      }

      const res = await axios.patch(
        `${BASE_API_URL}/coach/upload/work-assets`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return { success: true, message: res.data.message, data: res.data.data };
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

  // Save Pricing Slots API
  async savePricingSlots(payload) {
    try {
      const headers = await authHeader();
      const res = await axios.post(
        `${BASE_API_URL}/coach/pricing/save`,
        payload,
        {
          headers,
        }
      );
      return {
        success: !!res.data?.ok,
        message: res.data?.message || "Pricing saved successfully",
        data: res.data?.data,
      };
    } catch (err) {
      console.error(
        "savePricingSlots API error:",
        err.response?.data || err.message
      );
      return {
        success: false,
        message: err.response?.data?.message || "Failed to save pricing",
        error: err.response?.data?.error || err.message,
      };
    }
  },

  /* -------------------- Activities (NEW) -------------------- */
  /**
   * Public route: GET /activities
   * - Without parentId: returns layer 1 (roots)
   * - With parentId: returns children for that parent
   * Returns normalized items: { id, title, parent_id, contains_subtopic }
   */
  async listActivities(parentId = null) {
    try {
      const url = `${BASE_API_URL}/activities`;
      const res = await axios.get(url, {
        params: parentId ? { parentId } : undefined,
      });
      const items = Array.isArray(res.data?.data) ? res.data.data : [];
      const normalized = items.map((a) => ({
        id: a._id || a.id,
        title: a.title,
        parent_id: a.parent_id || null,
        contains_subtopic: !!a.contains_subtopic,
      }));
      return { success: true, data: normalized };
    } catch (err) {
      console.error(
        "listActivities API error:",
        err.response?.data || err.message
      );
      return {
        success: false,
        message: err.response?.data?.message || "Failed to load activities",
        data: [],
      };
    }
  },
};

export default coachService;
