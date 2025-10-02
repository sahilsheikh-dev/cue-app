import api from "../../config/axiosConfig";
import { BASE_API_URL } from "../../config/app.config";
import get from "../../secureStore/get"; // to fetch token from storage

const productCompanyService = {
  async getMyInfo() {
    try {
      const res = await api.get(`${BASE_API_URL}/productCompany/me`);
      return { success: true, data: res.data.data, message: res.data.message };
    } catch (err) {
      console.error("getMyInfo API error:", err.response?.data || err.message);
      return {
        success: false,
        message:
          err.response?.data?.message || "Failed to fetch productCompany info",
      };
    }
  },

  // ✅ Placeholder for future APIs
};
export default productCompanyService;
