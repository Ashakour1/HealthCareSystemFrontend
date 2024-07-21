import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { user, login } = useUser();

  const redirectTo = location.search.split("/")[1];

  useEffect(() => {
    if (user) {
      redirectTo ? navigate(`/${redirectTo}`) : navigate("/dashboard");
    }
  }, [user, redirectTo]);

  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/admins/login",
        formData
      );

    console.log(response.data);
      login(response.data.data);
      navigate("/dashboard");

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="w-full">
      <Card>
        <CardHeader className="text-blue-600">
          <CardTitle>Login Form</CardTitle>
          <CardDescription className="pt-2">
            Fill in the form below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-blue-600"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
