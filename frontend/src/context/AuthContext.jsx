import { createContext } from "react";
import { api } from "@/lib/utils.js";

const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const login = async (username, password) => {
    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.data.accessToken);
    } catch (error) {
      throw new Error("Internal Server Error", error.message);
    }
  };

  const logout = async () => {
    try {
      await api.get("/auth/logout");
      localStorage.clear();
    } catch (error) {
      throw new Error("Internal Server Error", error.message);
    }
  };

  const getCurrentUser = async () => {
    try {
      const { data } = await api.get("/auth/current-user");

      return data.data;
    } catch (error) {
      throw new Error("Internal Server Error", error.message);
    }
  };

  const refreshToken = async () => {};

  return (
    <AuthContext.Provider
      value={{ login, logout, refreshToken, getCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
