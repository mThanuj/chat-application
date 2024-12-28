import { SideBar } from "../chat/Sidebar";
import Navbar from "../common/Navbar";
import Chatbox from "../chat/Chatbox";
import useChatStore from "@/stores/useChatStore";
import ChatBoxSkeleton from "../skeletons/ChatBoxSkeleton";

const Home = () => {
  const { receiver } = useChatStore();

  return (
    <div
      className={
        "h-screen flex bg-gradient-to-tr from-gray-900 to-gray-800 p-4"
      }
    >
      <SideBar />
      {!receiver ? <ChatBoxSkeleton /> : <Chatbox />}
      <Navbar />
    </div>
  );
};

export { Home };
