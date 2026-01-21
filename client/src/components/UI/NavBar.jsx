import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useState } from "react";

export const NavBar = ({ setIsProfile, isProfile }) => {

  const {userId, imageUrl, getProfileImage, setSearchQuery} = useAuth()
  const handleProfile = () => {
    if (isProfile) {
      setIsProfile(false);
    } else {
      setIsProfile(true);
    }
  };

  useEffect(() =>{
    getProfileImage()
  }, [userId])
  return (
    <>
      <div className="flex h-[60px] justify-between rounded-xl bg-gray-950 px-3 py-2">
        <h1 className=" flex font-semibold text-2xl">
          <p className="text-green-500">make</p>
          <p>Notes</p>
        </h1>
        <input 
          className="border border-green-500 px-3 scale-90  rounded-xl mr-2 w-30 sm:w-auto"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search notes"
          type="text" />
        <div>
          <img
            onClick={() => handleProfile()}
            src={imageUrl}
            alt="Avatar"
            className="w-10 h-10 border-2 hover:cursor-pointer shadow-2xl shadow-green-500 border-green-500 rounded-full object-cover"
          />
        </div>
      </div>
    </>
  );
};
