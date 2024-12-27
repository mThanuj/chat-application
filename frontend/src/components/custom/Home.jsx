import { SideBar } from "../chat/Sidebar";
import Navbar from "./Navbar";
import Chatbox from "../chat/Chatbox";

const Home = () => {
  return (
    <div className={"flex"}>
      <SideBar />
      <Chatbox />
      <Navbar />
    </div>
  );
};

export { Home };
