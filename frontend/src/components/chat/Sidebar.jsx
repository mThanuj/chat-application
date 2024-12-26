import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { io } from "socket.io-client";

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

          socket.emit("login", data._id);

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
    <div className="h-screen">
      <h1>Online Users</h1>
      {onlineUsers.length > 0 ? (
        onlineUsers.map((u, index) => <p key={index}>{u}</p>)
      ) : (
        <p>No users online</p>
      )}
    </div>
  );
}
