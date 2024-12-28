import { api } from "@/lib/utils.js";
import { create } from "zustand";
import useAuthStore from "./useAuthStore";

const useChatStore = create((set, get) => ({
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
      throw new Error("Internal Server Error", error.message);
    }
  },

  fetchMessages: async (receiverId) => {
    if (!receiverId) {
      return;
    }
    try {
      const { data } = await api.get(`/messages/${receiverId}`);
      set({ messages: data.data });
    } catch (error) {
      throw new Error("Internal Server Error", error.message);
    }
  },

  sendMessage: async (messageData) => {
    const { receiver, messages } = get();

    try {
      const { data } = await api.post(
        `/messages/send/${receiver}`,
        messageData
      );
      set({ messages: [...messages, data] });
    } catch (error) {
      throw new Error("Internal Server Error", error.message);
    }
  },

  subscribeToMessages: () => {
    const { receiver } = get();
    if (!receiver) {
      return;
    }

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const messageFromReceiver = newMessage.sender === receiver;

      if (!messageFromReceiver) {
        return;
      }

      set({
        messages: [...get().messages, newMessage],
      });
      console.log(get().messages);
    });
  },

  unsubscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));

export default useChatStore;
