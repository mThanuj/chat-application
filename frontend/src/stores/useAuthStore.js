import { api } from "@/lib/utils.js";
import { io } from "socket.io-client";
import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  onlineUsers: JSON.parse(localStorage.getItem("onlineUsers")) || [],
  user: JSON.parse(localStorage.getItem("user")) || null,
  socket: null,

  login: async (username, password) => {
    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });

      const user = res.data.data;
      set({ user });

      localStorage.setItem("user", JSON.stringify(user));

      get().connectSocket();
    } catch (error) {
      throw new Error("Internal Server Error", error.message);
    }
  },

  logout: async () => {
    try {
      await api.get("/auth/logout");
      set({ user: null });

      localStorage.clear();

      get().disconnectSocket();
    } catch (error) {
      throw new Error("Internal Server Error", error.message);
    }
  },

  getCurrentUser: async () => {
    try {
      const { data } = await api.get("/auth/current-user");
      set({ user: data.data });

      localStorage.setItem("user", JSON.stringify(data.data));

      get().connectSocket();
    } catch (error) {
      throw new Error("Internal Server Error", error.message);
    }
  },

  connectSocket: async () => {
    const { user } = get();
    if (!user || get().socket?.connected) {
      return;
    }

    const socket = io("http://localhost:5000", {
      query: {
        userId: user._id,
      },
    });
    socket.connect();

    set({ socket });

    socket.on("connect", () => {
      // TODO:
    });

    socket.on("getOnlineUsers", (data) => {
      localStorage.setItem("onlineUsers", JSON.stringify(data));
      set({ onlineUsers: data });
    });

    socket.on();
  },

  disconnectSocket: async () => {
    if (get().socket && get().socket?.connected) {
      get().socket.disconnect();
    }
  },

  refreshToken: async () => {},
}));

export default useAuthStore;
