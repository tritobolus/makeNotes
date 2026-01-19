import mongoose from "mongoose";
const URL = "mongodb://localhost:27017/makeNote";
const connectDB = async () => {
  try {
    await mongoose.connect(URL, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error to connet MongoDB");
  }
};

export default connectDB;
