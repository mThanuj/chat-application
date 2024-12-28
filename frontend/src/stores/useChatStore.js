import { api } from "@/lib/utils.js";
import { create } from "zustand";
import useAuthStore from "./useAuthStore";
import { persist } from "zustand/middleware";

const useChatStore = create(
  persist(
    (set, get) => ({
      messages: [],
      users: [],
      receiver: null,

      setReceiver: (receiver) => {
        set({ receiver });
      },

      getUsers: async () => {
        try {
          const { data } = await api.get("/messages/users");
          set({ users: data.data });
        } catch (error) {
          console.error("Error fetching users:", error.message);
        }
      },

      fetchMessages: async (receiverId) => {
        if (!receiverId) return;

        try {
          const { data } = await api.get(`/messages/${receiverId}`);
          set({ messages: data.data });
        } catch (error) {
          console.error("Error fetching messages:", error.message);
        }
      },

      sendMessage: async (messageData) => {
        const { receiver } = get();

        try {
          const { data } = await api.post(
            `/messages/send/${receiver}`,
            messageData
          );
          set((state) => ({
            messages: state.messages.concat(data),
          }));
        } catch (error) {
          console.error("Error sending message:", error.message);
        }
      },

      subscribeToMessages: () => {
        const { receiver } = get();
        if (!receiver) return;

        const socket = useAuthStore.getState().socket;

        if (!socket) {
          useAuthStore.getState().connectSocket();
          return;
        }

        const messageHandler = (newMessage) => {
          if (newMessage.sender !== receiver) {
            return;
          }

          set((state) => ({
            messages: [...state.messages, newMessage],
          }));
        };

        socket.off("newMessage", messageHandler);
        socket.on("newMessage", messageHandler);
      },

      unsubscribeToMessages: () => {
        const socket = useAuthStore.getState().socket;
        if (socket) {
          socket.off("newMessage");
        }
      },
    }),
    {
      name: "chat-store",
      getStorage: () => localStorage,
      blacklist: ["messages", "users"],
    }
  )
);

export default useChatStore;
