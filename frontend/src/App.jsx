import { Navigate, Route, Routes } from "react-router-dom";
import { Login, Home } from "./components/custom/exportComponents.js";
import useAuthStore from "./stores/useAuthStore.js";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthStore();

  return user ? children : <Navigate to="/login" />;
};

<Route
  path="/"
  element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  }
/>;

function App() {
  return (
    <div>
      <Routes>
        <Route
          path={"/"}
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<h1>Register page</h1>} />
      </Routes>
    </div>
  );
}

export default App;
