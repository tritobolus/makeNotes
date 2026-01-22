import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProfileImage = mongoose.model("profileimage", imageSchema)

export default ProfileImage;