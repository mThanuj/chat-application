import { create } from "zustand";

const useChatStore = create((set, get) => ({
  messages: [],
  receiver: null,

  getCurrentReceiver: () => {
    return get().receiver;
  },
}));

export default useChatStore;
