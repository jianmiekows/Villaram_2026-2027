import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const api = axios.create({ baseURL: `${API_URL}/api` });

// These endpoints must be called WITHOUT a token: DRF rejects an expired token
// even on public endpoints.
const NO_TOKEN = ["/token/", "/register/"];

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  const skip = NO_TOKEN.some((path) => (config.url || "").startsWith(path));
  if (token && !skip) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If a request fails with 401, try to get a new access token once, then retry.
let refreshing = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const refresh = localStorage.getItem("refresh");
    const isAuthCall = (original?.url || "").startsWith("/token/");

    if (error.response?.status === 401 && refresh && original && !original._retry && !isAuthCall) {
      original._retry = true;
      try {
        refreshing =
          refreshing ||
          axios
            .post(`${API_URL}/api/token/refresh/`, { refresh })
            .finally(() => {
              refreshing = null;
            });
        const { data } = await refreshing;
        localStorage.setItem("access", data.access);
        if (data.refresh) localStorage.setItem("refresh", data.refresh);
        original.headers.Authorization = `Bearer ${data.access}`;
        return api(original);
      } catch {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.dispatchEvent(new Event("auth-expired"));
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// Turn a DRF error response into one readable line.
export function errorMessage(error) {
  const data = error?.response?.data;
  if (!error?.response) return error?.message || "Something went wrong.";
  if (!data || typeof data === "string") return "Server error. Check the Django terminal.";
  if (data.detail) return Array.isArray(data.detail) ? data.detail.join(" ") : String(data.detail);
  return Object.entries(data)
    .map(([field, msg]) => `${field}: ${Array.isArray(msg) ? msg.join(" ") : msg}`)
    .join(" | ");
}

// Change currency here.
export const money = (value) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(Number(value));
