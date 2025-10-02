import api from "../../config/axiosConfig";
import { BASE_API_URL } from "../../config/app.config";

/**
 * Send OTP
 * body: { phone: "+91xxxx", userType: "coach" }
 * POST /otp/send   -> { ok: true, otpId: "<encrypted>" }
 */
async function sendOtp(phone, userType = "client") {
  try {
    const res = await api.post(`${BASE_API_URL}/otp/send`, {
      phone,
      userType,
    });
    if (res.data?.ok) {
      return { ok: true, otpId: res.data.otpId, message: res.data?.message };
    }
    return { ok: false, message: res.data?.message || "Failed to send OTP" };
  } catch (err) {
    return {
      ok: false,
      message: err.response?.data?.message || err.message || "Network error",
    };
  }
}

/**
 * Verify OTP
 * body: { otpId: "<encrypted>", otp: "12345/6" }
 * POST /otp/verify  -> { ok: true, message, recordId, userType, phone }
 */
async function verifyOtp(otpId, otp) {
  try {
    const res = await api.post(`${BASE_API_URL}/otp/verify`, { otpId, otp });
    if (res.data?.ok) {
      return { ok: true, ...res.data };
    }
    return { ok: false, message: res.data?.message || "Invalid OTP" };
  } catch (err) {
    return {
      ok: false,
      message:
        err.response?.data?.message || err.message || "Verification failed",
    };
  }
}

/**
 * Resend OTP
 * body: { otpId: "<encrypted>" }
 * POST /otp/resend -> { ok: true } OR { ok: true, otpId: "<encrypted>" } if reissued
 */
async function resendOtp(otpId) {
  try {
    const res = await api.post(`${BASE_API_URL}/otp/resend`, { otpId });
    if (res.data?.ok) {
      return { ok: true, ...res.data };
    }
    return { ok: false, message: res.data?.message || "Could not resend OTP" };
  } catch (err) {
    return {
      ok: false,
      message: err.response?.data?.message || err.message || "Network error",
    };
  }
}

export default { sendOtp, verifyOtp, resendOtp };
