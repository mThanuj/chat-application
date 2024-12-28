import { api } from "@/lib/utils.js";
import { io } from "socket.io-client";
import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  onlineUsers: [],
  user: null,
  socket: null,

  initializeUser: async () => {
    try {
      const response = await api.get("/auth/current-user");

      if (response.status === 200) {
        const user = response.data.data;
        set({ user });
      } else {
        set({ user: null });
      }
    } catch (error) {
      console.error("Failed to initialize user:", error.message);
      set({ user: null });
    }
  },

  login: async (username, password) => {
    try {
      const res = await api.post("/auth/login", { username, password });
      const user = res.data.data;
      set({ user });

      get().connectSocket();
    } catch (error) {
      console.error("Login failed:", error.message);
      throw new Error(`Internal Server Error: ${error.message}`);
    }
  },

  logout: async () => {
    try {
      await api.get("/auth/logout");
      set({ user: null });
      get().disconnectSocket();
    } catch (error) {
      console.error("Logout failed:", error.message);
      throw new Error(`Internal Server Error: ${error.message}`);
    }
  },

  connectSocket: async () => {
    const { user, socket } = get();
    if (!user || (socket && socket.connected)) {
      return;
    }

    if (socket) {
      socket.disconnect();
    }

    const newSocket = io("http://localhost:5000", {
      query: { userId: user._id },
    });

    newSocket.connect();
    set({ socket: newSocket });

    newSocket.on("getOnlineUsers", (data) => {
      set({ onlineUsers: data });
    });
  },

  disconnectSocket: async () => {
    const { socket } = get();
    if (socket && socket.connected) {
      socket.disconnect();
      set({ socket: null });
    }
  },

  refreshToken: async () => {
    try {
      const response = await api.post("/auth/refresh-token");
      if (response.status === 200) {
        const user = response.data.data;
        set({ user });
      } else {
        set({ user: null });
      }
    } catch (error) {
      console.error("Token refresh failed:", error.message);
      set({ user: null });
    }
  },
}));

export default useAuthStore;
