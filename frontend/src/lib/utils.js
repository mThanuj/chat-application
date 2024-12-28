import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const refreshToken = async () => {
  try {
    const response = await api.post("/auth/refreshToken");
    return response.data.data;
  } catch (error) {
    console.error("Token refresh failed:", error.message);
  }
};

export const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken();
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error(
          "Refresh token expired or invalid:",
          refreshError.message
        );
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
