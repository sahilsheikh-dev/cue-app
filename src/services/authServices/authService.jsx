import api from "../../config/axiosConfig";
import put from "../../secureStore/put";
import get from "../../secureStore/get";
import remove from "../../secureStore/remove";
import { BASE_API_URL } from "../../config/app.config";

/** Persist auth & role */
export async function saveAuthTokenAndRole(authToken, role, user) {
  try {
    await Promise.all([
      put("auth", authToken || ""),
      put("role", role || ""),
      put("user", JSON.stringify(user || {})),
    ]);
    return true;
  } catch (err) {
    console.error("authService.saveAuthTokenAndRole error:", err);
    return false;
  }
}

/** Load persisted auth */
export async function initializeAuth() {
  try {
    const [authTokenRaw, roleRaw, dfRaw, userRaw] = await Promise.all([
      get("auth"),
      get("role"),
      get("data_filled"),
      get("user"),
    ]);
    return {
      authToken: authTokenRaw || null,
      role: roleRaw || null,
      data_filled: dfRaw === "true",
      user: userRaw ? JSON.parse(userRaw) : null,
    };
  } catch (err) {
    console.error("authService.initializeAuth error:", err);
    return { authToken: null, role: null, data_filled: false, user: null };
  }
}

export async function checkedToday() {
  try {
    await put("checked", new Date().toISOString());
    return true;
  } catch (err) {
    console.error("authService.checkedToday error:", err);
    return false;
  }
}

export async function markDataFilled() {
  try {
    await put("data_filled", "true");
    return true;
  } catch (err) {
    console.error("authService.markDataFilled error:", err);
    return false;
  }
}

export async function logout() {
  try {
    await Promise.all([
      remove("auth"),
      remove("role"),
      remove("data_filled"),
      remove("user"),
    ]);
    return true;
  } catch (err) {
    console.error("authService.logout error:", err);
    return false;
  }
}

/**
 * Server-backed login
 * - For coach: POST /coach/login => { ok, accessToken, coach }
 * - (Other roles keep legacy shape for now)
 */
export async function loginWithApi(mobile, password, role) {
  try {
    if (role === "coach") {
      const res = await api.post(`${BASE_API_URL}/coach/login`, {
        mobile,
        password,
      });
      const data = res.data || {};
      if (!data.ok || !data.accessToken) {
        return {
          ok: false,
          status: res.status,
          data,
          error: data.message || "Login failed",
        };
      }
      const token = data.accessToken;
      const user = data.coach || null;
      await saveAuthTokenAndRole(token, role, user);
      return { ok: true, token, user };
    } else {
      // fallback to old endpoints if you still have them
      const res = await api.post(`${BASE_API_URL}/${role}/login`, {
        mobile,
        password,
      });
      const data = res.data;
      const token = data.token;
      await saveAuthTokenAndRole(token, role, data[role] || null);
      return { ok: true, token, user: data[role] || null };
    }
  } catch (err) {
    console.error(
      "authService.loginWithApi error:",
      err.response?.data || err.message
    );
    return {
      ok: false,
      status: err.response?.status,
      data: err.response?.data,
      error: err.message || "Network error",
    };
  }
}

/**
 * POST /coach/logout (protected)
 * We best-effort call server to revoke the refresh session then
 * clear local storage regardless. (Server expects Authorization header)
 */
export async function serverLogout() {
  try {
    const token = await get("auth");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    // server: POST /coach/logout (verifyCoach protected) — revokes current cookie session if present
    await api
      .post(`${BASE_API_URL}/coach/logout`, {}, { headers })
      .catch((e) => {
        console.warn(
          "serverLogout axios error (ignored):",
          e.response?.data || e.message
        );
      });
  } catch (err) {
    console.warn("authService.serverLogout error (ignored):", err.message);
  } finally {
    await logout();
    return true;
  }
}

export async function updatePassword(role, id, oldPassword, newPassword) {
  try {
    const token = await get("auth");
    if (!token) return { ok: false, error: "No auth token found" };
    const res = await api.put(
      `${BASE_API_URL}/${role}/updatePassword/${id}`,
      { oldPassword, newPassword },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return { ok: true, data: res.data };
  } catch (err) {
    console.error("updatePassword error:", err.response?.data || err.message);
    return {
      ok: false,
      status: err.response?.status,
      error: err.response?.data?.message || err.message,
    };
  }
}

export async function forgetPassword(role, mobile, newPassword) {
  try {
    // coach backend: PUT /coach/forget-password
    const res = await api.put(`${BASE_API_URL}/${role}/forget-password`, {
      mobile,
      newPassword,
    });
    return { ok: true, data: res.data };
  } catch (err) {
    console.error("forgetPassword error:", err.response?.data || err.message);
    return {
      ok: false,
      status: err.response?.status,
      error: err.response?.data?.message || err.message,
    };
  }
}

export async function validateToken(role) {
  try {
    const token = await get("auth");
    if (!token) return { ok: false };

    const headers = { Authorization: `Bearer ${token}` };

    let endpoint;
    if (role === "coach") endpoint = "/coach/me";
    else if (role === "client") endpoint = "/client/me";
    else if (role === "eventOrganizer") endpoint = "/eventOrganizer/me";
    else if (role === "productCompany") endpoint = "/productCompany/me";

    const res = await api.get(`${BASE_API_URL}${endpoint}`, { headers });

    if (res.data?.ok || res.data?.success) {
      return { ok: true, user: res.data.data || res.data[role] };
    }
    return { ok: false };
  } catch (err) {
    console.warn("validateToken failed:", err.response?.data || err.message);
    return { ok: false };
  }
}

// Mark coach first login
export async function setCoachFirstLogin(flag) {
  try {
    await put("coach_first_login", flag ? "true" : "false");
  } catch (err) {
    console.error("setCoachFirstLogin error:", err);
  }
}

export async function getCoachFirstLogin() {
  try {
    const val = await get("coach_first_login");
    if (val === null || val === undefined) return null; // first ever login
    return val === "true"; // true = already did intro
  } catch (err) {
    console.error("getCoachFirstLogin error:", err);
    return null;
  }
}

const authService = {
  saveAuthTokenAndRole,
  initializeAuth,
  checkedToday,
  markDataFilled,
  logout,
  loginWithApi,
  serverLogout,
  updatePassword,
  forgetPassword,
  validateToken,
  setCoachFirstLogin,
  getCoachFirstLogin,
};

export default authService;
