import { api } from "@/lib/utils.js";
import { create } from "zustand";

const useChatStore = create((set, get) => ({
  messages: [],
  receiver: null,

  fetchMessages: async (receiverId) => {
    try {
      const { data } = await api.get(`/messages/${receiverId}`);

      set({ messages: data.data });
    } catch (error) {
      throw new Error("Internal Server Error", error.message);
    }
  },

  setCurrentReceiver: (receiverId) => {
    get().fetchMessages(receiverId);
    set({ receiver: receiverId });
  },
}));

export default useChatStore;
