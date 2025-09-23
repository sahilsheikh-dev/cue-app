// src/services/apiService.js
import { BASE_API_URL } from "../config/app.config";
import get from "../secureStore/get"; // matches your secureStore helpers

async function buildHeaders(extra = {}) {
  const token = await get("auth");
  const headers = { "Content-Type": "application/json", ...extra };
  if (token) {
    headers.Authorization = `Bearer ${token}`; // common pattern; see troubleshooting if your backend expects another header
  }
  return headers;
}

async function apiFetch(
  path,
  { method = "GET", body, headers = {}, ...opts } = {}
) {
  const allHeaders = await buildHeaders(headers);
  const res = await fetch(`${BASE_API_URL}${path}`, {
    method,
    headers: allHeaders,
    body: body ? JSON.stringify(body) : undefined,
    ...opts,
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error("Network or API error");
    err.status = res.status;
    err.body = json;
    throw err;
  }
  return json;
}

export const apiGet = (path, opts) =>
  apiFetch(path, { method: "GET", ...opts });
export const apiPost = (path, body, opts) =>
  apiFetch(path, { method: "POST", body, ...opts });
export const apiPut = (path, body, opts) =>
  apiFetch(path, { method: "PUT", body, ...opts });
export const apiDelete = (path, opts) =>
  apiFetch(path, { method: "DELETE", ...opts });

export default { apiGet, apiPost, apiPut, apiDelete };
