import axios from "axios";

const API = axios.create({
  // ✅ Load from env
  baseURL: import.meta.env.VITE_API_URL,
});

// Token interceptor → attach JWT token if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ✅ Export setAuth (manages token in localStorage)
export function setAuth(token) {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
}

export default API;
