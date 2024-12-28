import { ArrowRightCircle } from "lucide-react";
import { Button } from "../ui/button.jsx";
import { Input } from "../ui/input.jsx";
import useAuthStore from "@/stores/useAuthStore.js";
import useChatStore from "@/stores/useChatStore.js";
import { useState } from "react";

const MessageInput = () => {
  const { user, socket } = useAuthStore();
  const { receiver } = useChatStore();

  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();

    const newMessage = {
      sender: user.id,
      receiver,
      message,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    socket.emit("sendMessage", newMessage);

    setMessage("");
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
