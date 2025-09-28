import axios from "axios";
import { BASE_API_URL } from "../../config/app.config";
import get from "../../secureStore/get"; // to fetch token from storage

const eventOrganizerService = {
  async getMyInfo() {
    try {
      const token = await get("auth");
      const res = await axios.get(`${BASE_API_URL}/eventOrganizer/gerMyInfo`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true, data: res.data.data, message: res.data.message };
    } catch (err) {
      console.error("getMyInfo API error:", err.response?.data || err.message);
      return {
        success: false,
        message:
          err.response?.data?.message || "Failed to fetch eventOrganizer info",
      };
    }
  },

  // ✅ Placeholder for future APIs
};
export default eventOrganizerService;
