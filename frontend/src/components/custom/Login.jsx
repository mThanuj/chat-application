import { Card, CardContent, CardHeader } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/useAuthStore";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

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
        "h-screen w-screen bg-zinc-950 p-4 flex justify-center items-center"
      }
    >
      <Card
        className={
          "h-[450px] w-[400px] bg-slate-900 border-[1px] border-slate-50 border-opacity-10"
        }
      >
        <CardHeader className={"text-center"}>
          <span className={"text-slate-50 text-2xl"}>Login</span>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className={"flex flex-col gap-6"}>
            <div>
              <label className={"text-slate-50"}>
                Username
                <Input
                  id={"username"}
                  type={"text"}
                  placeholder={"Username"}
                  className={
                    "h-16 bg-slate-900 border-0 border-b-[1px] border-white " +
                    "caret-amber-50 text-slate-50"
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  value={formData.username}
                />
              </label>
            </div>
            <div>
              <label className={"text-slate-50"}>
                Password
                <Input
                  id={"password"}
                  type={"password"}
                  placeholder={"Password"}
                  className={
                    "h-16 bg-slate-900 border-0 border-b-[1px] border-white " +
                    "caret-amber-50 text-slate-50"
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  value={formData.password}
                />
              </label>
            </div>
          </CardContent>
          <div className={"flex justify-center p-4"}>
            <Button
              type={"submit"}
              variant={"secondary"}
              className={"mt-2 flex-1"}
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
