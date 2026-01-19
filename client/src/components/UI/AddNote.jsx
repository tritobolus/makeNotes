import { useState } from "react";
import axios from 'axios'
import { useAuth } from "../../context/AuthContext";

export const AddNote = ({ setAddNote, getNotes }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

    const {userId} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/note/create",{title,description, userId} )
      console.log(res)
    } catch (error) {
      console.log(error);
    }
    getNotes()
    setAddNote(false);
  };
  return (
    <>
      <div className="fixed inset-0 backdrop-blur-sm  flex justify-center items-center ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between h-100 w-80 bg-black shadow-md shadow-green-400 border-green-500 p-5 rounded-xl"
        >
          <h2 className="text-2xl text-green-500 font-semibold text-center">
            Add Your Note
          </h2>
          <div className="flex flex-col">
            <label className="text-xl font-semibold">Title</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              className="px-3 py-2 w-full  border border-dashed border-green-500"
              placeholder="write your title..."
              type="text"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xl font-semibold">Description</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              className="px-3 py-2 w-full  border border-dashed border-green-500 h-25 "
              placeholder="write your description..."
            />
          </div>

          <div className=" flex justify-between">
            <button
              onClick={() => setAddNote(false)}
              className="py-2 px-3 rounded bg-red-500 hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-3 rounded bg-green-500 hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
