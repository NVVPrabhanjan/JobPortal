import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "@/hooks/use-toast";

function Signup() {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student",
    file: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };


  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5 MB");
      return;
    }
    setInput({ ...input, file });
  };


  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.fullName || !input.email || !input.password || !input.role) {
      toast.error("Please fill all required fields.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.post(`http://localhost:8000/api/v1/user/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(res)

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">SignUp</h1>
          <div className="my-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              type="text"
              id="fullName"
              value={input.fullName}
              name="fullName"
              onChange={changeEventHandler}
              placeholder="Prabhanjan"
            />
          </div>
          <div className="my-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Prabhanjan@gmail.com"
            />
          </div>
          <div className="my-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              type="tel"
              id="phoneNumber"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="+91-7893152309"
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
            />
          </div>

          <fieldset className="my-4">
            <legend className="font-medium">Select Your Role</legend>
            <RadioGroup className="flex items-center gap-4 my-3">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  id="r1"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="r1">Recruiter</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  id="r2"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="r2">Student</Label>
              </div>
            </RadioGroup>
          </fieldset>

          <div className="flex items-center gap-2 my-4">
            <Label htmlFor="file">Profile Photo</Label>
            <Input
              accept="image/*"
              type="file"
              id="file"
              name="file"
              onChange={changeFileHandler}
            />
          </div>

          <div>
            <Button
              type="submit"
              className="text-white w-full my-4 bg-black font-bold hover:bg-gray-800"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Signup"}
            </Button>
            <span className="text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
