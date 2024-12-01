import React, { useState, useRef, useDebugValue } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { setLoading } from "@/redux/authSlice";

function Signup() {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });
  const {loading} = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5 MB");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setInput({ ...input, file });
  };

  const roleChangeHandler = (e) => {
    setInput({ ...input, role: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Destructure input values
    const { fullName, email, phoneNumber, password, role, file } = input;

    if (!role) {
      toast.error("Please select a role");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("password", password);
    formData.append("role", role);
    if (file) {
      formData.append("file", file);
    }

    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message || "Signup successful!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed!");
      console.error("Error during registration:", error.response?.data || error);
    } finally {
      dispatch(setLoading(true));
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
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              type="text"
              id="fullName"
              value={input.fullName}
              name="fullName"
              onChange={changeEventHandler}
              placeholder="Prabhanjan"
              required
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
              required
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
            <legend className="font-medium">Select Your Role</legend>
            <RadioGroup className="flex items-center gap-4 my-3">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  id="r1"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={roleChangeHandler}
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
                  onChange={roleChangeHandler}
                />
                <Label htmlFor="r2">Student</Label>
              </div>
            </RadioGroup>
          </fieldset>

          <div className="flex items-center gap-2 my-4">
            <Label htmlFor="file">Profile Photo</Label>
            <Input
              ref={fileInputRef}
              accept="image/*"
              type="file"
              id="file"
              name="file"
              onChange={changeFileHandler}
            />
          </div>

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
