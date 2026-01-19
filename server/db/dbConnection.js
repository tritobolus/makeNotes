import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DBCONNECTION, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error to connet MongoDB");
  }
};

export default connectDB;
