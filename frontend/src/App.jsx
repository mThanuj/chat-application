import { Route, Routes } from "react-router-dom";
import useAuthStore from "./stores/useAuthStore.js";
import { Home } from "./components/custom/Home.jsx";
import { Login } from "./components/custom/Login.jsx";
import { useEffect } from "react";

function App() {
  const initializeUser = useAuthStore((state) => state.initializeUser);
  const { user } = useAuthStore();

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  return (
    <div>
      <Routes>
        <Route path={"/"} element={user ? <Home /> : <Login />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<h1>Register page</h1>} />
      </Routes>
    </div>
  );
}

export default App;
