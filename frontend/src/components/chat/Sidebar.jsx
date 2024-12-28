import useAuthStore from "@/stores/useAuthStore";
import { Button } from "@/components/ui/button";
import useChatStore from "@/stores/useChatStore";

export function SideBar() {
  const { user, onlineUsers } = useAuthStore();
  const { receiver, setCurrentReceiver } = useChatStore();

  return (
    <div className="h-screen w-[20%] border-2 text-center flex flex-col overflow-y-auto gap-4 p-4">
      <h2>
        Hello: <span>{user.username}</span>
      </h2>
      <h1 className={"font-bold text-lg"}>Online Users</h1>
      {onlineUsers.length > 0 ? (
        onlineUsers.map((u, index) => (
          <Button
            key={index}
            onClick={() => {
              setCurrentReceiver(u._id);
            }}
          >
            <span className={"flex justify-center items-center"}>
              {u.username}
            </span>
          </Button>
        ))
      ) : (
        <p>No users online</p>
      )}
    </div>
  );
}
