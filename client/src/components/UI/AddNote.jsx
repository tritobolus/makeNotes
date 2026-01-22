import { useState } from "react";
import axios from 'axios'
import { useAuth } from "../../context/AuthContext";

import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema } from "../config/zodValidator";
import { useForm } from "react-hook-form";

import { ToastContainer, toast } from "react-toastify";

export const AddNote = ({ setAddNote, getNotes }) => {
  const [isAdding, setIsAdding] = useState(false);

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({ resolver: zodResolver(noteSchema) });

    const {userId, BACKEND_URL} = useAuth();

  const Submit = async (data) => {
    try {
      setIsAdding(true)
      const res = await axios.post(`${BACKEND_URL}/note/create`,{...data, userId} )
      toast.success(res.data.message)
      // toast.success(res.data.message)
      setIsAdding(false)
    } catch (error) {
      console.log(error);
      alert("Server error")
    }
    getNotes()
    setTimeout(() => {
      setAddNote(false);
    }, 1500)
  };
  return (
    <>
      <div className="fixed inset-0 backdrop-blur-sm  flex justify-center items-center ">
        <form
          onSubmit={handleSubmit(Submit)}
          className="flex flex-col justify-between h-100 w-80  shadow-md border border-green-500 p-5 rounded-xl"
        >
          <h2 className="text-2xl text-green-500 font-semibold text-center">
            Add Your Note
          </h2>
          {isAdding && <p className="text-red-500 text-center">wait, server is working</p>}
          <div className="flex flex-col">
            <label className="text-xl font-semibold">Title</label>
            <input
              {...register("title")}
              className="px-3 py-2 w-full  border border-dashed border-green-500"
              placeholder="write your title..."
              type="text"
            />
            {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
          </div>
          <div className="flex flex-col">
            <label className="text-xl font-semibold">Description</label>
            <textarea
              {...register("description")}
              className="px-3 py-2 w-full  border border-dashed border-green-500 h-25 "
              placeholder="write your description..."
            />
            {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
          </div>

          <div className=" flex gap-x-2 justify-between">
            <button
              onClick={() => setAddNote(false)}
              className="py-2 w-full px-3 rounded bg-red-500 hover:bg-red-600 active:scale-90 duration-150 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 w-full px-3 rounded bg-green-500 hover:bg-green-600 active:scale-90 duration-150 transition-all"
            >
              Save
            </button>
          </div>
        </form>
        <ToastContainer position="top-right" autoClose={2000} theme="dark" />
      </div>
    </>
  );
};
