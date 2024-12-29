import { api } from "@/lib/utils.js";
import { io } from "socket.io-client";
import { create } from "zustand";
import useChatStore from "./useChatStore";
import chalk from "chalk";

const useAuthStore = create((set, get) => ({
  onlineUsers: [],
  user: null,
  socket: null,

  initializeUser: async () => {
    console.log(chalk.cyan("🔄 Initializing user..."));
    try {
      const response = await api.get("/auth/current-user");

      if (response.status === 200) {
        const user = response.data.data;
        set({ user });
        console.log(chalk.green("✅ User initialized successfully"));
      } else {
        set({ user: null });
        useChatStore.setState({ receiver: null });
        console.log(chalk.yellow("⚠️ No current user found"));
      }
    } catch (error) {
      console.error(chalk.red("❌ Failed to initialize user:", error.message));
      set({ user: null });
    }
  },

  login: async (username, password) => {
    console.log(chalk.cyan("🔑 Logging in..."));
    try {
      const res = await api.post("/auth/login", { username, password });
      const user = res.data.data;
      set({ user });

      console.log(
        chalk.green(
          `✅ Login successful for user: ${chalk.bold(user.username)}`
        )
      );
      get().connectSocket();
    } catch (error) {
      console.error(chalk.red("❌ Login failed:", error.message));
      throw new Error(`Internal Server Error: ${error.message}`);
    }
  },

  logout: async () => {
    console.log(chalk.cyan("🔓 Logging out..."));
    try {
      await api.get("/auth/logout");
      set({ user: null });
      get().disconnectSocket();
      console.log(chalk.green("✅ Logout successful"));
    } catch (error) {
      console.error(chalk.red("❌ Logout failed:", error.message));
      throw new Error(`Internal Server Error: ${error.message}`);
    }
  },

  connectSocket: async () => {
    console.log(chalk.cyan("📡 Connecting to socket..."));
    const { user, socket } = get();
    if (!user || (socket && socket.connected)) {
      console.log(
        chalk.yellow(
          "⚠️ Socket connection skipped. User not logged in or socket already connected."
        )
      );
      return;
    }

    if (socket) {
      socket.disconnect();
      console.log(
        chalk.yellow("⚠️ Existing socket disconnected before reconnecting.")
      );
    }

    const newSocket = io("http://localhost:5000", {
      query: { userId: user._id },
    });

    newSocket.connect();
    set({ socket: newSocket });

    newSocket.on("getOnlineUsers", (data) => {
      set({ onlineUsers: data });
      console.log(chalk.green("✅ Online users updated:", data));
    });

    console.log(chalk.green("✅ Socket connected successfully"));
  },

  disconnectSocket: async () => {
    console.log(chalk.cyan("📴 Disconnecting socket..."));
    const { socket } = get();
    if (socket && socket.connected) {
      socket.disconnect();
      set({ socket: null });
      console.log(chalk.green("✅ Socket disconnected"));
    } else {
      console.log(chalk.yellow("⚠️ No socket to disconnect."));
    }
  },

  refreshToken: async () => {
    console.log(chalk.cyan("🔄 Refreshing token..."));
    try {
      const response = await api.post("/auth/refreshToken");
      if (response.status === 200) {
        const user = response.data.data;
        set({ user });
        console.log(chalk.green("✅ Token refreshed successfully"));
      } else {
        set({ user: null });
        console.log(
          chalk.yellow("⚠️ Token refresh failed. No user data returned.")
        );
      }
    } catch (error) {
      console.error(chalk.red("❌ Token refresh failed:", error.message));
      set({ user: null });
    }
  },
}));

export default useAuthStore;
