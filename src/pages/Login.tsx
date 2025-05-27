import React, { useState } from "react";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "../api/api";

function Login() {
  const api = useApi()
  const [formData, setFormData] = useState<any>({});
  const navigate = useNavigate()

  const onChange = (e: any) => {
    setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    api.login(formData).then((res)=>{
      console.log(res.data)
      navigate(`/`)
    }).catch((err)=>console.log('error'))
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="-mt-16 max-w-[350px] bg-white mx-auto border border-gray-300 rounded-md p-6 pb-12">
        <h1 className="text-center my-8 font-black text-3xl text-zinc-500">
          <span className="text-blue-500">Order</span>
          <span className="text-orange-500">Xoom</span>
        </h1>
        <h3 className="text-center mb-6 text-xl font-bold">Login</h3>

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
            value={formData?.password}
            onChange={onChange}
          />

          <div className="mt-4 text-end">
            <Link
              to={`/password-change`}
              className="focus:text-gray-200 text-[12px] text-gray-500 hover:underline font-medium cursor-pointer"
            >
              Forgot password
            </Link>
          </div>

          <Button type="Outline" className="mt-5 w-full py-2" submit>
            Login
          </Button>

          <div className="mt-3"></div>

          <Link
            to={`/signup`}
            className="focus:text-gray-200 text-[12px] text-gray-500 text-center hover:underline font-medium cursor-pointer"
          >
            Not have account ? Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
