import axios from "axios";
import React from "react";
import { useState } from "react";
 import { ToastContainer, toast } from 'react-toastify';

export const UpdateNote = ({
  setIsUpdate,
  updateId,
  updateTitle,
  setUpdateTitle,
  updateDes,
  setUpdateDes,
  getNotes,
}) => {
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put("http://localhost:8000/note/update", {
        id: updateId,
        title: updateTitle,
        description: updateDes,
      });

      console.log(res.data);
      getNotes();
      setIsUpdate(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="fixed inset-0 backdrop-blur-sm  flex justify-center items-center ">
        <div className="p-5 flex flex-col justify-between h-75 w-70 border border-green-500 rounded-2xl">
          <h2 className="text-green-500 text-center text-2xl font-semibold">
            Update Note
          </h2>
          <div className="flex flex-col">
            <label className="text-green-500 font-semibold">Title</label>
            <input
              className=" border border-dashed border-green-500 p-2"
              value={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
              type="text"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-green-500 font-semibold">Description</label>
            <textarea
              className="h-20  border border-dashed border-green-500 p-2"
              value={updateDes}
              onChange={(e) => setUpdateDes(e.target.value)}
              type="text"
            />
          </div>
          <div className="flex justify-between">
            <button
              className="px-2 py-1 bg-green-500 rounded"
              onClick={() => setIsUpdate(false)}
            >
              Cancle
            </button>
            <button
              className="px-2 py-1 bg-red-500 rounded"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
