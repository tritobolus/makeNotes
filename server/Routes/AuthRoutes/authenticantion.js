import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user.js";
import verifyUser from "../../middleware/verifyUser.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    console.log(email, username, password)

    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //checking email is already there or not
    const checkEmail = await User.findOne({email});
    if (checkEmail) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    //checking username is already there or not
    const checkUsername = await User.findOne({username});
    if (checkUsername) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/signin", async (req, res) => {
  console.log("Enterted in signin");
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({
      username,
    });

    if (!user) {
      return res.status(400).json({ message: "Username not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "password not matched" });
    }

    const payload = {
      username: username,
      userId: user._id.toString(),
      email: user.email
    };
    const secretKey = "this_is_my_seret_key";
    const options = { expiresIn: "1d" };

    const token = jwt.sign(payload, secretKey, options);

    res.cookie("token", token);

    return res.status(200).json({ message: "User login successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/verify", verifyUser, async(req,res) => {
    return res.status(200).json({message: "Success" ,userId: req.userId, username: req.username, email: req.email})
})

router.delete("/signout", async(req,res) => {
   try {
    res.clearCookie("token"); 
    return res.status(200).json({ message: "Successfully signout" });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Can't delete JWT token!" });
  }
})

export default router;
