import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

import {zodResolver} from "@hookform/resolvers/zod"
import { signinSchema } from "../config/zodValidator";
import { useForm } from "react-hook-form";


export const SignIn = () => {

   const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(signinSchema)});

  const {checkAuth} = useAuth()

  const navigate = useNavigate();
  console.log("render")

  const Submit = async (data) => {
  console.log(data)
    try {
      const res = await axios.post(
        "http://localhost:8000/authentication/signin",
        data,
        {
            withCredentials:true
        }
      );
      alert(res.data.message)
      await checkAuth()
      navigate('/')
    } catch (error) {
      console.log(error);
      alert(error.response.data.message)
    }
  };
  return (
    <>
      <div className=" fixed inset-0 flex justify-center items-center bg-black">
        <div className="flex flex-col gap-y-10">
          <h1 className="text-3xl font-semibold">
            Welcome To <span className="text-green-500">make</span>Note
          </h1>

          <form onSubmit={handleSubmit(Submit)} className="flex flex-col gap-y-5">
            <h2 className="text-2xl text-center font-semibold">SignIn</h2>
            <div className="flex flex-col gap-y-1">
              <label>Username</label>
              <input
                {...register("username")}
                className="px-3 py-2 p-2 border border-green-500"
                type="text"
              />
              {errors.username && <p className="text-red-500">{errors.username.message}</p>}
            </div>
            <div className="flex flex-col gap-y-1">
              <label>Password</label>
              <input
                {...register("password")}
                className="px-3 py-2 p-2 border border-green-500"
                type="password"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              className="bg-green-500 px-2 py-1 rounded mt-2"
            >
              SignIn
            </button>
            {/* <hr className="border border-dashed" /> */}
            <div className="flex gap-x-2 justify-center mt-5">
              <p>Don't Hav Account?</p>
              <Link to='/signup' className="text-green-500 hover:cursor-pointer hover:underline">
                SignUp
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
