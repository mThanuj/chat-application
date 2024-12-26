import { useContext } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    navigate("/login");
  };

  return (
    <nav className={"p-4"}>
      <Button onClick={handleLogout}>Logout</Button>
    </nav>
  );
};

export default Navbar;
