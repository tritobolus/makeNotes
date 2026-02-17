import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/dbConnection.js";
import cors from 'cors'
import noteRoutes from './Routes/NoteRoutes/noteRoutes.js'
import authentication from './Routes/AuthRoutes/authenticantion.js'
import cookieParser from "cookie-parser";
import profile from "./Routes/Profile/profileRoutes.js"
import avatar from "./Routes/Avatar/avatarRoutes.js"

import customeAvatar from "./Routes/Avatar/customeAvatarRoutes.js"


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://make-notes-theta.vercel.app"
  ],
  credentials: true
}));

connectDB();

app.use("/note",noteRoutes)
app.use("/authentication",authentication)
app.use("/profile",profile)
app.use("/avatar",avatar)
app.use("/customeAvatar",customeAvatar)

app.get("/", (req,res) => {
    res.send("Hey this is from howly bhoi...")
})


app.listen(process.env.PORT || 8000, () => console.log("Server is runing..."));
