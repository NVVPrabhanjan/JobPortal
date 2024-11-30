import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { USER_API_END_POINT } from '../../utils/constant.js'
function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        console.log(res.data, "hithesh"); // Log res.data *after* the axios call
        if (res.data.success) {
            navigate("/");
            toast.success(res.data.message);
        } else {
            // Handle unsuccessful login explicitly
            toast.error(res.data.message || "Login failed.");  // Provide more specific feedback
        }
    } catch (error) {
        console.error("Error during login:", error); //Improved error logging

        // Check if error.response exists before accessing its properties
        toast.error(error.response?.data?.message || "Something went wrong!"); 
    }
};

  const radioChangeHandler = (e) => {
    setInput({ ...input, role: e.target.value });
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
          onSubmit={submitHandler} // Use onSubmit for form
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Prabhanjan@gmail.com"
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-3">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={radioChangeHandler}
                />
                <Label htmlFor="r1">Recruiter</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={radioChangeHandler}
                />
                <Label htmlFor="r2">Student</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Button
              type="submit"
              className="text-white w-full my-4 bg-black font-bold hover:bg-gray-800"
            >
              Login
            </Button>
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
