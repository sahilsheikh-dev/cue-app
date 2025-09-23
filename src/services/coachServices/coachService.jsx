// services/coachService.js
import axios from "axios";
import { BASE_API_URL } from "../../config/app.config";

export const deleteCoachAccount = async (coachId, token) => {
  try {
    const response = await axios.delete(
      `${BASE_API_URL}/coach/deleteCoach/${coachId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // token in header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Delete coach error:", error.response?.data || error.message);
    throw error;
  }
};
