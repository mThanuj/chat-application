import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { io } from "socket.io-client";
import {Button} from "@/components/ui/button.jsx";
import {PersonStandingIcon} from "lucide-react";

export function SideBar() {
  const { getCurrentUser } = useContext(AuthContext);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let socket;

    const initializeSocket = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);

        if (data && data._id) {
          socket = io("http://localhost:5000");

          socket.emit("login", data);

          socket.on("onlineUsers", (data) => {
            setOnlineUsers(data);
          });
        }
      } catch (error) {
        console.error("Error initializing socket:", error);
      }
    };

    initializeSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <div className="h-screen w-[20%] border-2 border-red-500 text-center flex flex-col overflow-y-auto gap-4 p-4">
      <h1 className={'font-bold text-lg'}>Online Users</h1>
      {onlineUsers.length > 0 ? (
        onlineUsers.map((u, index) =>
            <Button variant={"ghost"} key={index}>
              <span className={'flex justify-center items-center'}><PersonStandingIcon/> <p>{u.username}</p></span>
            </Button>)
      ) : (
        <p>No users online</p>
      )}
    </div>
  );
}
