import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { BsPencilSquare } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { ImCross } from "react-icons/im";

export const Profile = ({setIsProfile}) => {
  const { username, email, userId, imageUrl, getProfileImage, notes, BACKEND_URL } =
    useAuth();
  const [imageEdit, setImageEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageEdit = () => {
    if (imageEdit) {
      setImageEdit(false);
    } else {
      setImageEdit(true);
    }
  };

  const handleUploadImage = async () => {
    try {
      if (!image) alert("Please selct any image");

      setIsUploading(true);

      const imageData = new FormData();
      imageData.append("file", image);
      imageData.append("upload_preset", "makeNotes");
      imageData.append("cloud_name", "dbkpqsbzm");

      const data = await axios.post(
        import.meta.env.VITE_API_CLOUDINARY_URL,
        imageData
      );

      const imageUrl = data.data.secure_url;

      const res = await axios.post(`${BACKEND_URL}/profile/upload`, {
        imageUrl,
        userId,
      });
      console.log("after uploading on db", res);
      getProfileImage();
      setImage(false);
      setImageEdit(false);
      setIsUploading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const res = await axios.delete(
        `${BACKEND_URL}/authentication/signout`,
        {
          withCredentials: true,
        }
      );
      console.log(res);

      alert("Successful logout");
      // setTimeout(() => {
      //   navigate("/login");
      //   window.location.reload();
      // }, 1500);
      window.location.reload();
    } catch (error) {
      alert("Logout failed");
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-between gap-y-4 bg-black rounded-xl border border-green-400 p-4 w-70">
        {/* image section,, handleing image upload and all */}
        <div className="flex flex-col gap-y-2">
          <div className="flex justify-between text-green-500">
            <img
              className="w-50 h-50 rounded-full border-2 border-green-500 "
              src={imageUrl}
              alt=""
            />
            <div className="flex flex-col justify-between">
              <RxCross2 onClick={() => setIsProfile(false)} size={25} className="ml-1 font-semibold hover:cursor-pointer" />
              {/* <ImCross/> */}
              <BsPencilSquare
                className="hover:cursor-pointer"
                size={25}
                onClick={() => handleImageEdit()}
              />
            </div>
          </div>
          {imageEdit && (
            <>
              <div className="flex flex-col gap-y-2 px-1 scale-90">
                <div className="flex flex-col ">
                  {!image && (
                    <label className="w-full text-center border border-green-500 text-green-500 py-1 rounded cursor-pointer hover:bg-green-500 hover:text-black transition">
                      Choose Image
                      <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        accept="image/*"
                        hidden
                      />
                    </label>
                  )}

                  {image && (
                    <p className="text-sm text-green-400 mt-1 truncate">
                      {image.name}
                    </p>
                  )}

                  {isUploading && (
                    <p className="text-red-500">wait, file is uploading...</p>
                  )}
                </div>
                <div className="flex justify-between gap-x-2">
                  <button
                    onClick={() => setImageEdit(false)}
                    className="w-full px-1 py-1 bg-red-500 rounded hover:bg-red-600 hover:cursor-pointer"
                  >
                    Cancle
                  </button>
                  <button
                    onClick={() => handleUploadImage()}
                    className="w-full px-2 py-1 bg-green-500 rounded hover:bg-green-600 hover:cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex gap-x-2">
            no of notes:
            <p className="text-green-500">{notes.length}</p>
          </div>
          <div className="flex gap-x-2 ">
            username:
            <p className="text-green-500">{username}</p>
          </div>
          <div className="flex gap-x-2">
            email:
            <p className="text-green-500">{email}</p>
          </div>
        </div>
        <button
          onClick={() => logout()}
          className="bg-red-500 rounded-2xl px-2 py-1 hover:cursor-pointer hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </>
  );
};
