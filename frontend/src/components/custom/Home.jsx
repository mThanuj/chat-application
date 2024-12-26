import { useEffect } from "react";
import { SideBar } from "../chat/Sidebar";
import MessageInput from "../chat/MessageInput";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Chatbox from "../chat/Chatbox";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  return (
    <div className={"flex"}>
      <SideBar />
      <Chatbox />
      <Navbar />
    </div>
  );
};

export { Home };
