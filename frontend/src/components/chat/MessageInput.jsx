import { ArrowRightCircle } from "lucide-react";
import { Button } from "../ui/button.jsx";
import { Input } from "../ui/input.jsx";

const MessageInput = () => {
  return (
    <form className="w-full flex space-x-4">
      <div className="flex-1">
        <Input />
      </div>
      <Button>
        Send <ArrowRightCircle />
      </Button>
    </form>
  );
};

export default MessageInput;
