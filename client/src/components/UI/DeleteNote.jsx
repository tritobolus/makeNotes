import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { useAuth } from "../../context/AuthContext";

export const DeleteNote = ({
  setIsDelete,
  deleteId,
  deleteTitle,
  deleteDes,
  getNotes,
}) => {
  const[isDeleting, setIsDeleting] = useState(false)

  const {BACKEND_URL} = useAuth()
  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      const res = await axios.delete(`${BACKEND_URL}/note/delete`, {
        data: { id: deleteId },
      });
      toast.success(res.data.message);
      getNotes();
      setIsDeleting(false)
      setTimeout(() => {
        setIsDelete(false);
      },1500)
    } catch (error) {
      console.log(error);
      alert("server is not working")
    }
  };
  return (
    <>
      <div className="fixed inset-0  backdrop-blur-sm  flex justify-center items-center ">
        <div className="p-5 flex flex-col justify-between h-75 w-85 border border-green-500 rounded-2xl">
          <h2 className="text-green-500 text-center text-2xl font-semibold">Want to Delete This Note ?</h2>
          {isDeleting && <p className="text-red-500 text-center ">wait, server is waking up</p>}
          <div className="flex flex-col">
            <label className="text-green-500 font-semibold">Title</label>
            <p>{deleteTitle}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-green-500 font-semibold">Description</label>
            <p>{deleteDes}</p>
          </div>
          <div className="flex gap-x-2 justify-between">
            <button
              className="px-2 py-1 bg-green-500 rounded w-full hover:bg-green-600 hover:cursor-pointer transition-all duration-150 active:scale-90"
              onClick={() => setIsDelete(false)}
            >
              No
            </button>
            <button 
              className="px-2 py-1 bg-red-500 rounded w-full hover:bg-red-600 hover:cursor-pointer transition-all duration-150 active:scale-90" 
              onClick={handleDelete}>
              Yes
            </button>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={2000} theme="dark" /> 
      </div>
    </>
  );
};
