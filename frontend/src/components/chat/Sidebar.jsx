import useAuthStore from "@/stores/useAuthStore";

export function SideBar() {
  const { user, onlineUsers } = useAuthStore();

  return (
    <div className="h-screen w-[20%] border-2 text-center flex flex-col overflow-y-auto gap-4 p-4">
      <h2>
        Hello: <span>{user.username}</span>
      </h2>
      <h1 className={"font-bold text-lg"}>Online Users</h1>
      {onlineUsers.length > 0 ? (
        onlineUsers.map((u, index) => (
          <div key={index} onClick={() => {}}>
            <span className={"flex justify-center items-center"}>
              <p>{u.username}</p>
            </span>
          </div>
        ))
      ) : (
        <p>No users online</p>
      )}
    </div>
  );
}
