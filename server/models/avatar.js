import mongoose from "mongoose";

const avatarSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    current: {
      type: Boolean
    }
  },
  
);

const Avatar = mongoose.model("avatar", avatarSchema, "avatar");

export default Avatar;
