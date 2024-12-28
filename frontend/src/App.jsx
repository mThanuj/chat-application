import { Route, Routes } from "react-router-dom";
import useAuthStore from "./stores/useAuthStore.js";
import { Home } from "./components/pages/Home.jsx";
import { Login } from "./components/pages/Login.jsx";
import { useEffect } from "react";

function App() {
  const initializeUser = useAuthStore((state) => state.initializeUser);
  const { user } = useAuthStore();

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  return (
    <Routes>
      <Route path={"/"} element={user ? <Home /> : <Login />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/register"} element={<h1>Register page</h1>} />
    </Routes>
  );
}

export default App;
