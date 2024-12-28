import useChatStore from "@/stores/useChatStore";
import clsx from "clsx";
import { useEffect, useRef } from "react";

const MessageHistory = () => {
  const {
    messages,
    fetchMessages,
    receiver,
    subscribeToMessages,
    unsubscribeToMessages,
  } = useChatStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    fetchMessages(receiver);

    subscribeToMessages();

    return () => {
      unsubscribeToMessages();
    };
  }, [receiver, fetchMessages, subscribeToMessages, unsubscribeToMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="h-screen overflow-y-auto space-y-4 p-6">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.sender === receiver ? "justify-start" : "justify-end"}`}
          ref={messageEndRef}
        >
          <div
            className={clsx(
              "max-w-md px-4 py-2 rounded-lg",
              message.sender === receiver
                ? "bg-gray-300 text-black rounded-lg rounded-tl-none"
                : "bg-blue-600 text-white rounded-lg rounded-br-none"
            )}
          >
            <p>{message.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageHistory;
