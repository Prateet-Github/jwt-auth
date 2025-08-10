import axios from "axios";

// Change this to your backend URL
// Example: "https://your-backend.onrender.com/api"
const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5001/api",
});

// Add token to headers for each request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;