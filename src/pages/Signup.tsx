import React, { useState } from "react";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { Link } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState<any>({});

  const onChange = (e: any) => {
    setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="-mt-16 max-w-[350px] bg-white mx-auto border border-gray-300 rounded-md p-6 pb-12">
        <h1 className="text-center my-8 font-black text-3xl text-zinc-500">
          <span className="text-blue-500">Order</span>
          <span className="text-orange-500">Xoom</span>
        </h1>

        <h3 className="text-center mb-6 text-xl font-bold">Create Account</h3>


        <form onSubmit={handleLogin}>
          <TextInput
            id="email"
            type="text"
            name="email"
            placeholder="Email or username"
            value={formData?.email}
            onChange={onChange}
          />
          <div className="mt-6"></div>
          <TextInput
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={formData?.password1}
            onChange={onChange}
          />

          <div className="mt-6"></div>
          <TextInput
            id="password"
            type="password"
            name="password"
            placeholder="Confirm Password"
            value={formData?.password2}
            onChange={onChange}
          />

          <div className="mt-4 text-end">
            <Link
              to={`/password-change`}
              className="text-[12px] text-gray-500 mt-4 text-end hover:underline font-medium cursor-pointer"
            >
              Forgot password
            </Link>
          </div>

          <Button type="Outline" className="mt-5 w-full py-2" submit>
            Sign Up
          </Button>

          <div className="mt-3"></div>

          <Link
            to={`/login`}
            className="focus:text-gray-200 text-[12px] text-gray-500 mt-4 text-center hover:underline font-medium cursor-pointer"
          >
            Already have account ? Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
