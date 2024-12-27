import { Button } from "../ui/button";
import useAuthStore from "@/stores/useAuthStore";

const Navbar = () => {
  const { logout } = useAuthStore();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
  };

  return (
    <nav className={"p-4"}>
      <Button onClick={handleLogout}>Logout</Button>
    </nav>
  );
};

export default Navbar;
