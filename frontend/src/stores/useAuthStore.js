import { api } from "@/lib/utils";
import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("token") || null,
  user: null,

  login: async (username, password) => {
    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });

      const accessToken = res.data.data.accessToken;
      localStorage.setItem("token", accessToken);
      set({ token: accessToken });
    } catch (error) {
      throw new Error("Internal Server Error", error.message);
    }
  },

  logout: async () => {
    try {
      await api.get("/auth/logout");
      localStorage.clear();
      set({ token: null, user: null });
    } catch (error) {
      throw new Error("Internal Server Error", error.message);
    }
  },

  getCurrentUser: async () => {
    try {
      const { data } = await api.get("/auth/current-user");

      set({ user: data.data });
    } catch (error) {
      throw new Error("Internal Server Error", error.message);
    }
  },

  refreshToken: async () => {},
}));

export default useAuthStore;
