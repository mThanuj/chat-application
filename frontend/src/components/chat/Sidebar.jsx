import useAuthStore from "@/stores/useAuthStore";
import { Button } from "@/components/ui/button";
import useChatStore from "@/stores/useChatStore";
import { useEffect } from "react";
import UsersSkeleton from "@/components/skeletons/UsersSkeleton";

export function SideBar() {
  const { onlineUsers, user, initializeUser } = useAuthStore();
  const { users, setReceiver, getUsers, isFetchingUsers } = useChatStore();
  const filteredUsers = users.filter((u) => onlineUsers.includes(u._id));

  useEffect(() => {
    initializeUser();
    getUsers();
  }, [getUsers, initializeUser]);

  if (user === null) {
    return <div>Loading...</div>;
  }

  const handleClick = () => {
    setReceiver(null);
  };

  return (
    <div className="h-full w-[15%] border-2 text-center flex flex-col overflow-y-auto gap-6 p-6 bg-slate-800 rounded-lg shadow-lg">
      <Button
        onClick={handleClick}
        className="w-full bg-blue-600 text-slate-50 font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Hello: <span className="font-bold">{user.username}</span>
      </Button>
      <h1 className="font-bold text-xl text-slate-50">Online Users</h1>
      {!isFetchingUsers ? (
        filteredUsers.length > 0 ? (
          filteredUsers.map((u, index) => (
            <Button
              key={index}
              onClick={() => {
                setReceiver(u._id);
              }}
              className="w-full text-left bg-slate-700 text-slate-50 font-medium py-2 px-4 rounded-lg hover:bg-slate-600 transition-colors"
            >
              <div className="flex items-center justify-between w-full">
                <div className="font-medium truncate">{u.username}</div>
              </div>
            </Button>
          ))
        ) : (
          <p className="text-slate-400">No users online</p>
        )
      ) : (
        <UsersSkeleton />
      )}
    </div>
  );
}
