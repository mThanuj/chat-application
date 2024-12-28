import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import useAuthStore from "@/stores/useAuthStore";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    navigate("/login");
  };

  return (
    <nav className={"p-4 w-[10%]"}>
      <Button onClick={handleLogout}>Logout</Button>
    </nav>
  );
};

export default Navbar;
