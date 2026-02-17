// models/CustomAvatar.js

import mongoose from 'mongoose'

const customAvatarSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CustomeAvatar = mongoose.model("CustomAvatar", customAvatarSchema);

export default CustomeAvatar
