import { Button } from "@/components/ui/button.jsx";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { SideBar } from "../chat/Sidebar";
import {Input} from "@/components/ui/input.jsx";
import {ArrowRight} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, []);

  const { logout } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await logout();
    navigate("/login");
  };
  return (
    <div className={'flex'}>
      <SideBar />
      <div className={'w-screen h-screen'}>
        <nav className={'w-full'}>
          <form onSubmit={handleSubmit} className={'p-4 fixed right-0'}>
            <Button>Logout</Button>
          </form>
        </nav>
        <div className={'w-full h-12 flex justify-center items-center mt-auto'}>
          <Input/>
          <Button variant={'ghost'}><ArrowRight/></Button>
        </div>
      </div>
    </div>
  );
};

export {Home};
