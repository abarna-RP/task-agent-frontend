import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

// ✅ CORRECT Token Interceptor
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("🔑 Getting token:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("✅ Token added to request");
  }
  return config;
});

// ✅ CORRECT setAuth Function
export function setAuth(token) {
  console.log("💾 Saving token:", token);
  if (token) {
    localStorage.setItem("token", token);
    // ✅ IMPORTANT: API headers automatically update agum
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}

export default API;