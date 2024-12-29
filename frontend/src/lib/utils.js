import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import chalk from "chalk";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const refreshToken = async () => {
  try {
    console.log(chalk.cyan("🔄 Refreshing token..."));
    const response = await api.post("/auth/refreshToken");
    console.log(chalk.green("✅ Token refreshed successfully"));
    return response.data.data;
  } catch (error) {
    console.error(chalk.red("❌ Token refresh failed:", error.message));
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
      console.log(chalk.cyan("🔑 Adding Authorization header"));
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(chalk.red("❌ Request interceptor failed:", error.message));
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(chalk.green("✅ Response received:", response.status));
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log(
        chalk.yellow("⚠️ Unauthorized. Attempting to refresh token...")
      );
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken();
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        console.log(
          chalk.green("✅ New access token obtained, retrying request")
        );
        return api(originalRequest);
      } catch (refreshError) {
        console.error(
          chalk.red(
            "❌ Refresh token expired or invalid:",
            refreshError.message
          )
        );
        return Promise.reject(refreshError);
      }
    }
    console.error(chalk.red("❌ Response error:", error.message));
    return Promise.reject(error);
  }
);

export function formatMessageTime(date) {
  const formattedTime = new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  console.log(chalk.cyan(`🕒 Formatted time: ${formattedTime}`));
  return formattedTime;
}
