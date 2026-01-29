import { IoMdAdd } from "react-icons/io";
import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { AddNote } from "./AddNote";
import axios from "axios";
import { useEffect } from "react";
import { DeleteNote } from "./DeleteNote";
import { UpdateNote } from "./UpdateNote";

import { useAuth } from "../../context/AuthContext";
import { Profile } from "./Profile";
import { filterNote } from "../config/filterNotes";

export const Notes = ({ isProfile, setIsProfile }) => {
  const [addNote, setAddNote] = useState(false);
  const [filteredNote, setFilteredNote] = useState([]);

  const [isDelete, setIsDelete] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const [deleteId, setDeleteId] = useState("");
  const [deleteTitle, setDeleteTitle] = useState("");
  const [deleteDes, setDeleteDes] = useState("");

  const [updateId, setUpdateId] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDes, setUpdateDes] = useState("");

  const { userId, notes, getNotes, searchQuery } = useAuth();

  useEffect(() => {
    if (searchQuery) setFilteredNote(filterNote(notes, searchQuery));
  }, [searchQuery]);

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <div className="relative h-[calc(100vh-100px)] sm:h-[calc(100vh-104px)] mt-3 mx-auto max-w-5xl overflow-y-auto  px-2">
        {isProfile && (
          <div className="absolute z-50 right-6">
            <Profile setIsProfile={setIsProfile} />
          </div>
        )}
        {notes.length == 0 && (
          <p className="text-gray-500 flex justify-center items-center mt-60">
            click on '<span className="font-bold text-xl">+</span>' button to add a Note
          </p>
        )}
        {filteredNote.length == 0 && searchQuery.length != 0 && (
          <p className="text-gray-500 flex justify-center items-center mt-60">
            No result found
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2  overflow-y-auto">
          {searchQuery &&
            filteredNote.map((note) => (
              <div
                key={note.item._id}
                className=" flex flex-col gap-x-2 p-3 border hover:border-dashed hover:border-green-500  rounded-md  duration-100 transition-all  "
              >
                <h2 className="font-semibold text-xl text-green-500">
                  {note.item.title}
                </h2>
                <p>{note.item.description}</p>
                <div className="flex justify-between">
                  <p className="text-gray-500">
                    {new Date(note.item.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                  <div className=" flex mt-1 gap-x-4 text-green-500">
                    <BsPencilSquare
                      onClick={() => {
                        (setIsUpdate(true),
                          setUpdateId(note.item._id),
                          setUpdateTitle(note.item.title),
                          setUpdateDes(note.item.description),
                          setIsProfile(false));
                      }}
                      className="hover:cursor-pointer"
                    />
                    <MdDelete
                      onClick={() => {
                        (setIsDelete(true),
                          setDeleteId(note.item._id),
                          setDeleteTitle(note.item.title),
                          setDeleteDes(note.item.description),
                          setIsProfile(false));
                      }}
                      className="hover:cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            ))}

          {searchQuery.length == 0 &&
            notes.map((note) => (
              <div
                key={note._id}
                className=" flex flex-col gap-x-2 p-3 border hover:border-dashed hover:border-green-500  rounded-md  duration-100 transition-all  "
              >
                <h2 className="font-semibold text-xl text-green-500">
                  {note.title}
                </h2>
                <p>{note.description}</p>
                <div className="flex justify-between">
                  <p className="text-gray-500">
                    {new Date(note.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                  <div className=" flex mt-1 gap-x-4 text-green-500">
                    <BsPencilSquare
                      onClick={() => {
                        (setIsUpdate(true),
                          setUpdateId(note._id),
                          setUpdateTitle(note.title),
                          setUpdateDes(note.description),
                          setIsProfile(false));
                      }}
                      className="hover:cursor-pointer"
                    />
                    <MdDelete
                      onClick={() => {
                        (setIsDelete(true),
                          setDeleteId(note._id),
                          setDeleteTitle(note.title),
                          setDeleteDes(note.description),
                          setIsProfile(false));
                      }}
                      className="hover:cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            ))}
        </div> 
        <div className=" absolute hover:cursor-pointer text-green-500 top-[calc(100vh-200px)]  z-10 rounded-full border border-dashed border-gray-500 sm:top-130 right-6 active:scale-90 transition-all duration-150 ">
          <IoMdAdd
            onClick={() => {
              (setAddNote(true), setIsProfile(false));
            }}
            size={40}
          />
        </div>
      </div>

      {addNote && <AddNote setAddNote={setAddNote} getNotes={getNotes} />}
      {isDelete && (
        <DeleteNote
          getNotes={getNotes}
          setIsDelete={setIsDelete}
          deleteId={deleteId}
          deleteTitle={deleteTitle}
          deleteDes={deleteDes}
        />
      )}
      {isUpdate && (
        <UpdateNote
          getNotes={getNotes}
          setIsUpdate={setIsUpdate}
          updateId={updateId}
          updateTitle={updateTitle}
          updateDes={updateDes}
          setUpdateTitle={setUpdateTitle}
          setUpdateDes={setUpdateDes}
        />
      )}
    </>
  );
};
