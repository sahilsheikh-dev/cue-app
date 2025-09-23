/**
 * Authentication & session service
 * - Uses SecureStore wrappers: put, get, remove
 * - All functions return booleans or normalized values and never throw
 */

import put from "../../secureStore/put";
import get from "../../secureStore/get";
import remove from "../../secureStore/remove";

/**
 * Save auth token and role to secure storage
 * @param {string} authToken
 * @param {string} role
 * @returns {Promise<boolean>}
 */
export async function saveAuthTokenAndRole(authToken, role) {
  try {
    await Promise.all([put("auth", authToken || ""), put("role", role || "")]);
    return true;
  } catch (err) {
    console.error("authService.saveAuthTokenAndRole error:", err);
    return false;
  }
}

/**
 * Initialize auth values from storage
 * @returns {Promise<{ authToken: string|null, role: string|null, data_filled: boolean }>}
 */
export async function initializeAuth() {
  try {
    const [authTokenRaw, roleRaw, dfRaw] = await Promise.all([
      get("auth"),
      get("role"),
      get("data_filled"),
    ]);

    return {
      authToken: authTokenRaw || null,
      role: roleRaw || null,
      data_filled: dfRaw === "true",
    };
  } catch (err) {
    console.error("authService.initializeAuth error:", err);
    return { authToken: null, role: null, data_filled: false };
  }
}

/**
 * Mark user checked app today
 * @returns {Promise<boolean>}
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
 * @returns {Promise<boolean>}
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
 * Logout user (clear secure storage keys)
 * @returns {Promise<boolean>}
 */
export async function logout() {
  try {
    await Promise.all([remove("auth"), remove("role"), remove("data_filled")]);
    return true;
  } catch (err) {
    console.error("authService.logout error:", err);
    return false;
  }
}

/**
 * Convenience default export
 */
const authService = {
  saveAuthTokenAndRole,
  initializeAuth,
  checkedToday,
  markDataFilled,
  logout,
};

export default authService;
