import MessageHistory from "./MessageHistory";
import MessageInput from "./MessageInput";

const Chatbox = () => {
  return (
    <div className="w-full flex flex-col justify-end m-4">
      <MessageHistory />
      <MessageInput />
    </div>
  );
};

export default Chatbox;
