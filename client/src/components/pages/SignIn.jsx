import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "../config/zodValidator";
import { useForm } from "react-hook-form";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { ThreeDot } from "react-loading-indicators";

import { ToastContainer, toast } from "react-toastify";

export const SignIn = () => {
  const [isSignin, setIsSignin] = useState(false);

  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signinSchema) });

  const { checkAuth, username, email, BACKEND_URL } = useAuth();

  const navigate = useNavigate();

  const Submit = async (data) => {
    try {
      setIsSignin(true);
      const res = await axios.post(
        `${BACKEND_URL}/authentication/signin`,
        data,
        {
          withCredentials: true,
        },
      );

      await checkAuth();
      setIsSignin(false);
      toast.success( res.data.message);
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.log(error);
      // alert(error.response.data.message);
      toast.error(error.response.data.message);
      setIsSignin(false);
    }
  };
  return (
    <>
      <div className=" fixed inset-0 flex justify-center items-center bg-black">
        <div className="flex flex-col gap-y-10">
          <h1 className="text-3xl font-semibold">
            Welcome To <span className="text-green-500">make</span>Note
          </h1>

          <form
            onSubmit={handleSubmit(Submit)}
            className="flex flex-col gap-y-5"
          >
            <h2 className="text-2xl text-center font-semibold">SignIn</h2>
            <div className="flex flex-col gap-y-1">
              <label>Username</label>
              <input
                {...register("username")}
                className="px-3 py-2 p-2 border border-green-500"
                type="text"
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-1 relative">
              <label>Password</label>
              <input
                {...register("password")}
                className="px-3 py-2 p-2 border border-green-500"
                type={`${showPass ? "text" : "password"}`}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              <div
                onClick={() => setShowPass(!showPass)}
                className="absolute text-green-500 top-10 right-2 hover:cursor-pointer hover:text-green-600 "
              >
                {showPass ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </div>
            </div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 cursor-pointer px-2 py-1 rounded mt-2"
            >
              {isSignin ? (
                <ThreeDot color="#000000" size="small" text="" textColor="" />
              ) : (
                "SignUp"
              )}
            </button>
            {/* <hr className="border border-dashed" /> */}
            <div className="flex gap-x-2 justify-center mt-5">
              <p>Don't Have Account?</p>
              <Link
                to="/signup"
                className="text-green-500 hover:cursor-pointer hover:underline"
              >
                SignIn
              </Link>
            </div>
          </form>
        </div>
        <ToastContainer position="top-right" autoClose={2000} theme="dark" />
      </div>
    </>
  );
};
