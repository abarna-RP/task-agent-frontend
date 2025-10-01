import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
});

// Token interceptor
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ✅ Export setAuth
export function setAuth(token) {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
}

export default API;
