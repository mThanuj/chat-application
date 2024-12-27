import { create } from "zustand";

const useChatStore = create((set, get) => ({
  messages: [],
  receiver: null,
}));

export default useChatStore;
