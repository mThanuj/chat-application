
import {useContext} from "react";
import {ReceiverContext} from "@/context/ReceiverContext.jsx";

const MessageHistory = () => {
  const {receiverId} = useContext(ReceiverContext);
  return <div>{receiverId}</div>;
};

export default MessageHistory;
