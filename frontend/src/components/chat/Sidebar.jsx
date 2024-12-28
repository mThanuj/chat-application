import useAuthStore from "@/stores/useAuthStore";
import { Button } from "@/components/ui/button";
import useChatStore from "@/stores/useChatStore";
import { useEffect } from "react";

export function SideBar() {
  const { onlineUsers, user, initializeUser } = useAuthStore();
  const { users, setReceiver, getUsers } = useChatStore();
  const filteredUsers = users.filter((u) => onlineUsers.includes(u._id));

  useEffect(() => {
    initializeUser();
    getUsers();
  }, [getUsers, initializeUser]);

  if (user === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-[20%] border-2 text-center flex flex-col overflow-y-auto gap-4 p-4">
      <h2>
        Hello: <span>{user.username}</span>
      </h2>
      <h1 className={"font-bold text-lg"}>Online Users</h1>
      {filteredUsers.length > 0 ? (
        filteredUsers.map((u, index) => (
          <Button
            key={index}
            onClick={() => {
              setReceiver(u._id);
            }}
          >
            <div className="text-left min-w-0">
              <div className="font-medium truncate">{u.username}</div>
            </div>
          </Button>
        ))
      ) : (
        <p>No users online</p>
      )}
    </div>
  );
}
