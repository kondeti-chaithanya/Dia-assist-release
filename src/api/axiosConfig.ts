import axios from "axios";



const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    if (!config.url?.startsWith("/auth")) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    console.error(" Request interceptor error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized - Token may be expired");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("tokenExpiry");
      window.location.href = "/";
    }

    if (error.response?.status === 403) {
      console.error(" Access forbidden");
    }

    if (error.response?.status === 429) {
      console.error(" Too many requests - Rate limited");
      error.message = "Too many requests. Please try again later.";
    }

    if (error.response?.status && error.response.status >= 500) {
      console.error(" Server error:", error.response.status);
    }

    if (error.code === "ECONNABORTED") {
      console.error(" Request timeout");
      error.message = "Request timeout. Please check your connection.";
    }

    if (error.message === "Network Error") {
      console.error(" Network error - Server may be offline");
      error.message = "Network error. Please check your connection.";
    }

    return Promise.reject(error);
  }
);

export default api;
