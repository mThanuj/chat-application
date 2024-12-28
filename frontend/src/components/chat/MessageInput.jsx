import { ArrowRightCircle } from "lucide-react";
import { Button } from "../ui/button.jsx";
import { Input } from "../ui/input.jsx";
import { useState } from "react";
import useChatStore from "@/stores/useChatStore.js";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { sendMessage } = useChatStore();

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    try {
      await sendMessage({
        message,
      });

      setMessage("");
    } catch (error) {
      console.log("Failed to send message:", error);
    }
  };

  return (
    <form className="w-full flex space-x-4">
      <div className="flex-1">
        <Input value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <Button onClick={handleSendMessage}>
        Send <ArrowRightCircle />
      </Button>
    </form>
  );
};

export default MessageInput;
