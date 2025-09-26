// src/services/authServices/authService.js
import axios from "axios";
import put from "../../secureStore/put";
import get from "../../secureStore/get";
import remove from "../../secureStore/remove";
import { BASE_API_URL } from "../../config/app.config"; // adjust path if needed

/**
 * Save auth token and role to secure storage
 */
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

/**
 * Initialize auth values from storage
 */
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

/**
 * Mark checked today
 */
export async function checkedToday() {
  try {
    await put("checked", new Date().toISOString());
    return true;
  } catch (err) {
    console.error("authService.checkedToday error:", err);
    return false;
  }
}

/**
 * Mark onboarding/profile completed
 */
export async function markDataFilled() {
  try {
    await put("data_filled", "true");
    return true;
  } catch (err) {
    console.error("authService.markDataFilled error:", err);
    return false;
  }
}

/**
 * Logout (local only) - clears secure storage
 */
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
 * @returns { ok: boolean, token?, coach?, status?, data? }
 */
export async function loginWithApi(mobile, password, role) {
  try {
    const res = await axios.post(`${BASE_API_URL}/${role}/login`, {
      mobile,
      password,
    });

    const data = res.data;
    const token = data.token;

    await saveAuthTokenAndRole(token, role, data[role] || null);

    return { ok: true, token, user: data[role] || null };
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
 * Call server logout endpoint (best-effort), then clear local storage.
 * Always clears local storage (so user is logged out locally even if server call fails).
 */
export async function serverLogout() {
  try {
    const token = await get("auth");
    if (!token) {
      await logout();
      return true;
    }

    // POST to /coach/logout with Bearer token
    await axios
      .post(
        `${BASE_API_URL}/coach/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .catch((e) => {
        // swallow and continue to clear local storage
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

/**
 * Default export (convenience)
 */
const authService = {
  saveAuthTokenAndRole,
  initializeAuth,
  checkedToday,
  markDataFilled,
  logout,
  loginWithApi,
  serverLogout,
};

export default authService;
