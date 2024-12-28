import { Card, CardContent, CardHeader } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/useAuthStore";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuthStore();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(formData.username, formData.password);
    navigate("/");
  };

  return (
    <div
      className={
        "min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 p-4"
      }
    >
      <Card
        className={
          "w-full max-w-md bg-slate-900 border border-slate-50 border-opacity-10 shadow-lg rounded-lg"
        }
      >
        <CardHeader className={"text-center py-4"}>
          <span className={"text-slate-50 text-3xl font-semibold"}>Login</span>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className={"flex flex-col gap-6 px-6 py-4"}>
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className={"text-slate-50 text-sm"}>
                Username
              </label>
              <Input
                id={"username"}
                type={"text"}
                placeholder={"Enter your username"}
                className={
                  "h-12 bg-slate-800 border border-slate-700 rounded-lg px-4 caret-amber-50 text-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-50"
                }
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                value={formData.username}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className={"text-slate-50 text-sm"}>
                Password
              </label>
              <Input
                id={"password"}
                type={"password"}
                placeholder={"Enter your password"}
                className={
                  "h-12 bg-slate-800 border border-slate-700 rounded-lg px-4 caret-amber-50 text-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-50"
                }
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                value={formData.password}
              />
            </div>
          </CardContent>
          <div className={"flex justify-center p-4"}>
            <Button
              type={"submit"}
              variant={"secondary"}
              className={
                "w-full h-12 bg-amber-500 text-slate-900 font-medium rounded-lg shadow hover:bg-amber-600 transition-all"
              }
            >
              Login
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export { Login };
