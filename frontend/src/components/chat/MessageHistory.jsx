import useChatStore from "@/stores/useChatStore";
import clsx from "clsx";

const MessageHistory = () => {
  const { receiver, messages } = useChatStore();

  return (
    <div className="p-4">
      {messages.map((msg, idx) => {
        return (
          <div
            key={idx}
            className={clsx(
              "",
              msg.sender === receiver ? "text-left" : "text-right"
            )}
          >
            {msg.message}
            <span className="text-sm">{msg.createdAt}</span>
          </div>
        );
      })}
    </div>
  );
};

export default MessageHistory;
