import { SideBar } from "../chat/Sidebar";
import Navbar from "./Navbar";
import Chatbox from "../chat/Chatbox";
import useChatStore from "@/stores/useChatStore";

const Home = () => {
  const { receiver } = useChatStore();

  return (
    <div className={"flex"}>
      <SideBar />
      {!receiver ? <div>select a user to chat</div> : <Chatbox />}
      <Navbar />
    </div>
  );
};

export { Home };
