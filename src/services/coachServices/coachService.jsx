import { BASE_API_URL } from "../../config/app.config";

const coachService = {
  async signup(data) {
    try {
      const response = await fetch(`${BASE_API_URL}/coach/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        return {
          success: false,
          message: result.message || "Signup failed",
          error: result.error,
        };
      }

      return {
        success: true,
        message: result.message,
        data: result.data,
      };
    } catch (err) {
      console.error("Signup API error:", err);
      return {
        success: false,
        message: "Network or server error",
        error: err.message,
      };
    }
  },

  // ✅ placeholder for future APIs (e.g. registration, etc.)
};

export default coachService;
