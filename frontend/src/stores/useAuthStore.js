import { api } from "@/lib/utils.js";
import { io } from "socket.io-client";
import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  onlineUsers: [],
  user: null,
  socket: null,

  initializeUser: async () => {
    const response = await api.get("/auth/current-user");

    if (response.status === 200) {
      const user = await response.data.data;
      set({ user });
    } else {
      set({ user: null });
    }
  },

  login: async (username, password) => {
    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });

      const user = res.data.data;
      set({ user });

      get().connectSocket();
    } catch (error) {
      throw new Error("Internal Server Error", error.message);
    }
  },

  logout: async () => {
    try {
      await api.get("/auth/logout");
      set({ user: null });

      get().disconnectSocket();
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

    socket.on("getOnlineUsers", (data) => {
      set({ onlineUsers: data });
    });
  },

  disconnectSocket: async () => {
    if (get().socket && get().socket?.connected) {
      get().socket.disconnect();
    }
  },

  refreshToken: async () => {},
}));

export default useAuthStore;
