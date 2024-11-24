import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
function Login() {
    const [input, setInput] = useState({
        email:"",
        password:"",
        role :"recruiter"
    })
    const changeEventHandler = (e) =>{
        setInput({...input, [e.target.name]:e.target.value});
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
          if (res.data.success) {
            navigate("/");
            toast.success(res.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error(error.response.data.message);
        }
      };
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
            onSubmit={submitHandler }
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>
          <div className="my-2">
            <Label>Email</Label>
            <Input
            type="email"
            value={input.email}
            name = "email"
            onChange = {changeEventHandler}
            placeholder="Prabhanjan@gmail.com" />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
            type="password"
            value={input.password}
            name = "password"
            onChange = {changeEventHandler} />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-3">
              <div className="flex items-center space-x-2">
                <Input
                type="radio"
                name="role"
                value="Recruiter"
                checked = {input.role == 'recruiter'}
                onChange = {changeEventHandler} />
                <Label htmlFor="r1">Recruiter</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                type="radio"
                name="role"
                value="Student"
                checked = {input.role == 'student'}
                onChange = {changeEventHandler} />
                <Label htmlFor="r2">Student</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Button
              type="submit"
              className="text-white w-full my-4 bg-black font-bold hover:bg-gray-800" onClick={()=>{
                submitHandler() 
              }}
            >
              Login
            </Button>
            <span className="text-sm">Don't have an account ? <Link to="/signup" className="text-blue-500">SignUp</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
