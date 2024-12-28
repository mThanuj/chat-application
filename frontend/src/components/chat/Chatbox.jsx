import MessageHistory from "./MessageHistory";
import MessageInput from "./MessageInput";

const Chatbox = () => {
  return (
    <div className="w-full flex flex-col flex-1 justify-end h-full">
      <MessageHistory />
      <MessageInput />
    </div>
  );
};

export default Chatbox;
