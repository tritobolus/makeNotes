import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {zodResolver} from "@hookform/resolvers/zod"
import { signupSchema } from "../config/zodValidator";
import { useForm } from "react-hook-form";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export const SignUp = () => {

    const[showConfirmPass, setShowConfirmPass] = useState(false)
    const[showPass, setShowPass] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(signupSchema)});

    const navigate = useNavigate()

    const Submit = async(data) => {
        try {
            const res = await axios.post("http://localhost:8000/authentication/signup",
               data
            )
            console.log(res)
            alert(res.data.message)
            navigate("/signin")
            
        } catch (error) {
            console.log(error.response.data.message)
            alert(error.response.data.message)
        }
    }
  return (
    <>
      <div className=" fixed inset-0 flex justify-center items-center bg-black">
        <div className="flex flex-col gap-y-5">
          <h1 className="text-3xl font-semibold">
            Welcome To <span className="text-green-500">make</span>Note
          </h1>

          <form onSubmit={handleSubmit(Submit)} className="flex flex-col gap-y-3">
            <h2 className="text-2xl text-center font-semibold">SignUp</h2>
            <div className="flex flex-col gap-y-1">
                <label>Email Id</label>
                <input 
                    {...register("email")}
                    className="px-3 py-2 p-2 border border-green-500"
                    type="email" 
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div className="flex flex-col gap-y-1">
                <label>Username</label>
                <input 
                    {...register("username")}
                    className="px-3 py-2 p-2 border border-green-500"
                    type="text" 
                />
                {errors.username && <p className="text-red-500">{errors.username.message}</p>}
            </div>
            <div className="flex flex-col gap-y-1 relative">
                <label>Password</label>
                <input 
                    {...register("password")}
                    className="px-3 py-2 p-2 border border-green-500"
                    type={`${showPass ? "text" : "password"}`}
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                <div 
                    onClick={() => setShowPass(!showPass)} 
                    className="absolute text-green-500 top-10 right-2 hover:cursor-pointer hover:text-green-600 ">
                    {showPass ? <FaEye size={20}/> : <FaEyeSlash size={20}/>}
                    
                </div>
            </div>
            <div className="flex flex-col gap-y-1 relative">
                <label>Confirm Password</label>
                <input 
                    {...register("confirmPassword")}
                    className="px-3 py-2 p-2 border border-green-500"
                    type={`${showConfirmPass ? "text" : "password"}`} 
                    
                />
                {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}

                <div 
                    onClick={() => setShowConfirmPass(!showConfirmPass)} 
                    className="absolute text-green-500 top-10 right-2 hover:cursor-pointer hover:text-green-600 ">
                    {showConfirmPass ? <FaEye size={20}/> : <FaEyeSlash size={20}/>}
                    
                </div>
            </div>
            <button 
                type="submit"
                className="bg-green-500 px-2 py-1 rounded mt-4 hover:bg-green-600 hover:cursor-pointer"
            >
                SignUp
            </button>
            {/* <hr className="border border-dashed" /> */}
            <div className="flex gap-x-2 justify-center mt-5">
                <p>Already Have Account?</p>
                <Link to='/signin' className="text-green-500 hover:cursor-pointer hover:underline">
                SignIn
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
