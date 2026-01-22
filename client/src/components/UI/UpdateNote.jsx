import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema } from "../config/zodValidator";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";

export const UpdateNote = ({
  setIsUpdate,
  updateId,
  updateTitle,
  setUpdateTitle,
  updateDes,
  setUpdateDes,
  getNotes,
}) => {

  const[isUpdating, setIsUpdating] = useState(false)
  const { BACKEND_URL } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(noteSchema),
  });

  // set default values when modal opens
  useEffect(() => {
    setValue("title", updateTitle);
    setValue("description", updateDes);
  }, [updateTitle, updateDes, setValue]);

  const handleUpdate = async (data) => {
    try {
      setIsUpdating(true)
      const res = await axios.put(`${BACKEND_URL}/note/update`, {
        id: updateId,
        ...data,
      });

      toast.success(res.data.message);
      setIsUpdating(false)
      getNotes();
      setTimeout(() => {
        setIsUpdate(false);
      }, 1500)
    } catch (error) {
      console.log(error);
      toast.error("Server error");
    }
  };

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center">
        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="p-5 flex flex-col justify-between h-100 w-80 border border-green-500 rounded-2xl"
        >
          <h2 className="text-green-500 text-center text-2xl font-semibold">
            Update Note
          </h2>
          {isUpdating && <p className="text-red-500 text-center">Server is working...</p>}

          <div className="flex flex-col">
            <label className="text-green-500 font-semibold">Title</label>
            <input
              {...register("title")}
              className="border border-dashed border-green-500 p-2"
              type="text"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-green-500 font-semibold">
              Description
            </label>
            <textarea
              {...register("description")}
              className="h-20 border border-dashed border-green-500 p-2"
            />
            {errors.description && (
              <p className="text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex gap-x-2 justify-between">
            <button
              type="button"
              className=" w-full hover:bg-green-600 active:scale-90 duration-150 transition-all px-2 py-1 bg-green-500 rounded"
              onClick={() => setIsUpdate(false)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className=" w-full hover:bg-red-600 active:scale-90 duration-150 transition-all px-2 py-1 bg-red-500 rounded"
            >
              Update
            </button>
          </div>
        </form>
       <ToastContainer position="top-right" autoClose={2000} theme="dark" /> 
      </div>
    </>
  );
};
