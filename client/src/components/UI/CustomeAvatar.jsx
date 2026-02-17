import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export const CustomeAvatar = ({ setCustomeAvatar, changeAvatar}) => {
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
  const [customeAvatars, setCustomeAvatars] = useState([])

  const getCustomeAvatars = async() => {
    try {
        const res = await axios.get(`${BACKEND_URL}/customeAvatar/get`,{
        params: {
          username: username,
        },})
        setCustomeAvatars(res.data.avatars)
    } catch (error) {
        consoel.log(error)
    }
  }

  useEffect(() => {
    getCustomeAvatars()
  }, [])

  const handleUploadImage = async () => {
    try {
      if (!image){
        toast.warning("Please select a image");
        return;
      }

      setIsUploading(true);

      const imageData = new FormData();
      imageData.append("file", image);
      imageData.append("upload_preset", "makeNotes");
      imageData.append("cloud_name", import.meta.env.CLOUD_NAME);

      const data = await axios.post(
        import.meta.env.VITE_API_CLOUDINARY_URL,
        imageData,
      );

      const imageUrl = data.data.secure_url;

      //upload the image in custome avatar schema
      await axios.post(`${BACKEND_URL}/customeAvatar/upload`, {
        imageUrl,
        username,
      });
  
      getProfileImage();
      getCustomeAvatars()
      setImage(false);
      setImageEdit(false);
      setIsUploading(false);
    } catch (error) {
      console.log(error);
    }
  };
 return (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-gray-900 w-[95%] sm:w-[600px] max-h-[90vh] rounded-2xl shadow-2xl p-6 overflow-y-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-green-500">Custom Avatars</h2>
        <button
          onClick={() => setCustomeAvatar(false)}
          className="text-gray-500 hover:text-red-500 text-sm hover:cursor-pointer"
        >
          Close
        </button>
      </div>

      {/* Avatar Grid */}
      <div className="mb-8">
        <p className="text-lg font-medium mb-3">Your Avatars</p>

        {customeAvatars.length === 0 ? (
          <p className="text-gray-400 text-sm">
            You haven't uploaded any avatars yet.
          </p>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
            {customeAvatars.map((avatar) => (
              <img
                key={avatar._id}
                onClick={() =>
                  changeAvatar(avatar._id, avatar.imageUrl)
                }
                src={avatar.imageUrl}
                alt=""
                className={`w-16 h-16 rounded-full object-cover cursor-pointer transition-all duration-200 border-3
                  ${
                    avatar.imageUrl === imageUrl
                      ? "border-green-500 scale-110 shadow-lg"
                      : "border-transparent hover:scale-105 hover:shadow-md"
                  }
                `}
              />
            ))}
          </div>
        )}
      </div>

      {/* Upload Section */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <p className="text-lg font-medium">Add New Avatar</p>
          <button
            onClick={() => setImageEdit(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md text-sm hover:cursor-pointer"
          >
            Upload
          </button>
        </div>

        {isUploading && (
          <p className="text-sm text-red-500 mb-2">
            Uploading image... please wait
          </p>
        )}

        {imageEdit && !isUploading && (
          <div className="border rounded-xl p-4  space-y-4">
            {!image ? (
              <label className="block w-full text-center border border-green-500 text-green-600 py-2 rounded-lg cursor-pointer hover:bg-green-500 hover:text-white transition">
                Choose Image
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  accept="image/*"
                  hidden
                />
              </label>
            ) : (
              <p className="text-sm text-green-600 truncate">
                Selected: {image.name}
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setImageEdit(false)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadImage}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

};
