import { api } from "@/lib/utils.js";
import { create } from "zustand";
import useAuthStore from "./useAuthStore";
import { persist } from "zustand/middleware";
import chalk from "chalk";

const useChatStore = create(
  persist(
    (set, get) => ({
      messages: [],
      users: [],
      receiver: null,
      isFetchingUsers: false,
      isFetchingMessages: false,
      isSendingMessage: false,

      setReceiver: (receiver) => {
        set({ receiver });
        console.log(chalk.cyan(`🎯 Setting receiver: ${chalk.bold(receiver)}`));
      },

      getUsers: async () => {
        console.log(chalk.cyan("🔄 Fetching users..."));
        set({ isFetchingUsers: true });
        try {
          const { data } = await api.get("/messages/users");
          set({ users: data.data });
          console.log(
            chalk.green(
              `✅ Users fetched successfully: ${data.data.length} users`
            )
          );
        } catch (error) {
          console.error("Error fetching users:", error.message);
          console.error(chalk.red("❌ Error fetching users:", error.message));
        } finally {
          set({ isFetchingUsers: false });
        }
      },

      fetchMessages: async (receiverId) => {
        if (!receiverId) {
          console.log(
            chalk.yellow("⚠️ Receiver ID is missing. Cannot fetch messages.")
          );
          return;
        }

        console.log(
          chalk.cyan(`🔄 Fetching messages for receiver ID: ${receiverId}`)
        );
        set({ isFetchingMessages: true });
        try {
          const { data } = await api.get(`/messages/${receiverId}`);
          set({ messages: data.data });
          console.log(
            chalk.green(
              `✅ Messages fetched successfully: ${data.data.length} messages`
            )
          );
        } catch (error) {
          console.error(
            chalk.red("❌ Error fetching messages:", error.message)
          );
        } finally {
          set({ isFetchingMessages: false });
        }
      },

      sendMessage: async (messageData) => {
        const { receiver } = get();

        if (!receiver) {
          console.log(chalk.yellow("⚠️ No receiver set. Cannot send message."));
          return;
        }

        console.log(chalk.cyan(`✉️ Sending message to receiver: ${receiver}`));
        set({ isSendingMessage: true });
        try {
          const { data } = await api.post(
            `/messages/send/${receiver}`,
            messageData
          );
          set((state) => ({
            messages: state.messages.concat(data),
          }));
          console.log(chalk.green("✅ Message sent successfully"));
        } catch (error) {
          console.error(chalk.red("❌ Error sending message:", error.message));
        } finally {
          set({ isSendingMessage: false });
        }
      },

      subscribeToMessages: () => {
        const { receiver } = get();
        if (!receiver) {
          console.log(
            chalk.yellow("⚠️ No receiver set. Cannot subscribe to messages.")
          );
          return;
        }

        const socket = useAuthStore.getState().socket;

        if (!socket) {
          console.log(
            chalk.yellow("⚠️ Socket not connected. Attempting to connect...")
          );
          useAuthStore.getState().connectSocket();
          return;
        }

        const messageHandler = (newMessage) => {
          if (newMessage.sender !== receiver) {
            console.log(
              chalk.yellow(
                "⚠️ New message does not match the current receiver. Ignored."
              )
            );
            return;
          }

          set((state) => ({
            messages: [...state.messages, newMessage],
          }));
          console.log(
            chalk.green(
              `✅ New message received from sender: ${newMessage.sender}`
            )
          );
        };

        socket.off("newMessage", messageHandler);
        socket.on("newMessage", messageHandler);
        console.log(chalk.cyan("🔗 Subscribed to new messages"));
      },

      unsubscribeToMessages: () => {
        const socket = useAuthStore.getState().socket;
        if (socket) {
          socket.off("newMessage");
          console.log(chalk.cyan("🔗 Unsubscribed from new messages"));
        } else {
          console.log(
            chalk.yellow("⚠️ Socket not connected. Cannot unsubscribe.")
          );
        }
      },
    }),
    {
      name: "chat-store",
      getStorage: () => localStorage,
      blacklist: ["messages", "users", "receiver"],
    }
  )
);

export default useChatStore;
