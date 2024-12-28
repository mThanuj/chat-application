import useChatStore from "@/stores/useChatStore";
import { useEffect } from "react";

const MessageHistory = () => {
  const {
    messages,
    fetchMessages,
    receiver,
    subscribeToMessages,
    unsubscribeToMessages,
  } = useChatStore();

  useEffect(() => {
    fetchMessages(receiver);

    subscribeToMessages();

    return () => {
      unsubscribeToMessages();
    };
  }, [receiver, fetchMessages, subscribeToMessages, unsubscribeToMessages]);

  return (
    <div className="p-4">
      {messages.map((message, index) => {
        return (
          <div key={index}>
            <div>{message.message && <p>{message.message}</p>}</div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageHistory;
