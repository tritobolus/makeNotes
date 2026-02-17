import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { BsPencilSquare } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import { CustomeAvatar } from "./CustomeAvatar";

export const Profile = ({ setIsProfile }) => {
  const {
    username,
    email,
    userId,
    imageUrl,
    getProfileImage,
    notes,
    BACKEND_URL,
    avatars,
    getAvatars,
  } = useAuth();
  const [imageEdit, setImageEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAvatarChanging, setIsAvatarChanging] = useState(false);
  const [customeAvatar, setCustomeAvatar] = useState(false);

  // const handleImageEdit = () => {
  //   if (imageEdit) {
  //     setImageEdit(false);
  //   } else {
  //     setImageEdit(true);
  //   }
  // };



  const changeAvatar = async (avatarId, imageUrl) => {
    try {
      setIsAvatarChanging(true)
      const res = await axios.post(`${BACKEND_URL}/profile/upload`, {
        avatarId,
        imageUrl,
        username,
        type: "avatar",
      });
      // console.log("after uploading on db", res);
      getProfileImage();
      getAvatars();
      setIsAvatarChanging(false)
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const res = await axios.delete(`${BACKEND_URL}/authentication/signout`, {
        withCredentials: true,
      });
      console.log(res);

      toast.success("Successful logout");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      alert("Logout failed");
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between gap-y-4 bg-black rounded-xl border border-green-400 p-4 w-70 z-100">
        {/* image section,, handleing image upload and all */}
        <div className="flex flex-col gap-y-2">
          <div className="flex justify-between text-green-500">
            <img
              className="w-50 h-50 rounded-full border-2 border-green-500 object-cover"
              src={imageUrl}
              alt=""
            />
            <div className="flex flex-col justify-between">
              <RxCross2
                onClick={() => setIsProfile(false)}
                size={25}
                className="ml-1 font-semibold hover:cursor-pointer"
              />
              {/* <ImCross/> */}
              <BsPencilSquare
                className="hover:cursor-pointer"
                size={25}
                onClick={() => setCustomeAvatar(true)}
              />
            </div>
          </div>
        </div>

          {/* Avatar section */}
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-x-2">
            <p>Avatar</p>
            {isAvatarChanging && <p className="text-red-500">changing...</p>}
          </div>
          <div className="flex justify-between gap-x-1">
            {avatars.map((avatar) => (
              <img
                key={avatar._id}
                src={avatar.imageUrl}
                onClick={() => changeAvatar(avatar._id, avatar.imageUrl)}
                className={`w-10 h-10 rounded-full border ${avatar.imageUrl != imageUrl ? "border-white hover:scale-105 active:scale-90"  : "border-green-500 scale-110 "} hover:cursor-pointer  duration-150 transition-all  `}
              />
            ))}
          </div>
        </div>

        {/* profile details section */}
        <div className="flex flex-col">
           <div className="flex gap-x-2 ">
            Hey👋
            <p className="text-green-500">{username}</p>
          </div>
          <div className="flex gap-x-2">
            no of notes:
            <p className="text-green-500">{notes.length}</p>
          </div>
         
          <div className="flex gap-x-2">
            email:
            <p className="text-green-500">{email}</p>
          </div>
        </div>

        {/* logout button */}
        <button
          onClick={() => logout()}
          className="bg-red-500 rounded-2xl px-2 py-1 hover:cursor-pointer hover:bg-red-600 active:scale-95 transition-all duration-150"
        >
          Signout
        </button>
        <ToastContainer position="top-right" autoClose={2000} theme="dark" />
        {customeAvatar && <CustomeAvatar setCustomeAvatar={setCustomeAvatar} changeAvatar={changeAvatar} />}
      </div>
    </>
  );
};
