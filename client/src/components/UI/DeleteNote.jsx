import axios from "axios";
import React from "react";
import { useAuth } from "../../context/AuthContext";

export const DeleteNote = ({
  setIsDelete,
  deleteId,
  deleteTitle,
  deleteDes,
  getNotes,
}) => {
  const {BACKEND_URL} = useAuth()
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${BACKEND_URL}/note/delete`, {
        data: { id: deleteId },
      });
      console.log(res);
      getNotes();
      setIsDelete(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="fixed inset-0 backdrop-blur-sm  flex justify-center items-center ">
        <div className="p-5 flex flex-col justify-between h-75 border border-green-500 rounded-2xl">
          <h2 className="text-green-500 text-center text-2xl font-semibold">Want to Delete This Note ?</h2>
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
              className="px-2 py-1 bg-green-500 rounded w-full hover:bg-green-600 hover:cursor-pointer transition-all duration-150"
              onClick={() => setIsDelete(false)}
            >
              No
            </button>
            <button 
              className="px-2 py-1 bg-red-500 rounded w-full hover:bg-red-600 hover:cursor-pointer transition-all duration-150" 
              onClick={handleDelete}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
