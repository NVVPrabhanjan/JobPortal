import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { USER_API_END_POINT } from "../../utils/constant.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const {loading} = useSelector(store=>store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.role) {
        toast.error("Please select a role.");
        return;
    }

    try {
      dispatch(setLoading(true));
        const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        console.log("API Response:", res.data);
        if (res.data.success) {
          dispatch(setUser(res.data.user));
          navigate("/"); // Navigate to the home page
            toast.success(res.data.message);
        } else {
            toast.error(res.data.message || "Login failed.");
        }
    } catch (error) {
        console.error("Error during login:", error.response?.data);
        toast.error(error.response?.data?.message || "Something went wrong!");
    }
    finally{
      dispatch(setLoading(false));
    }
};
  const radioChangeHandler = (e) => {
    setInput({ ...input, role: e.target.value });
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
          onSubmit={submitHandler}
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>
          <div className="my-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Prabhanjan@gmail.com"
              required
            />
          </div>
          <div className="my-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              required
            />
          </div>
          <fieldset className="my-4">
            <legend className="font-medium mb-2">Select Your Role</legend>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={radioChangeHandler}
                  className="form-radio"
                />
                <span>Recruiter</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={radioChangeHandler}
                  className="form-radio"
                />
                <span>Student</span>
              </label>
            </div>
          </fieldset>
          <div>
            {
              loading ? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 animate-spin"/>Please Wait</Button> :
              <Button
              type="submit"
              className="text-white w-full my-4 bg-black font-bold hover:bg-gray-800"
            >
              Login
            </Button>
            }
            <span className="text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500">
                SignUp
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
