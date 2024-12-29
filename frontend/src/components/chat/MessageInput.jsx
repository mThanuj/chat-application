import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button.jsx";
import { Input } from "../ui/input.jsx";
import { useState } from "react";
import useChatStore from "@/stores/useChatStore.js";
import chalk from "chalk";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { sendMessage } = useChatStore();

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      console.log(chalk.yellow("⚠️ Empty message, not sending"));
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
    <form className="w-full m-4 flex items-center space-x-4">
      <div className="flex-1">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-slate-800 text-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          placeholder="Type your message"
        />
      </div>
      <Button
        onClick={handleSendMessage}
        className="flex items-center px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      >
        Send <ArrowRight className="ml-2" />
      </Button>
    </form>
  );
};

export default MessageInput;
