import express from 'express'
import CustomeAvatar from '../../models/customeAvatar.js'
const router = express.Router()

router.post("/upload", async (req, res) => {
     try {
    const { imageUrl, username} = req.body;

    if (!imageUrl || !username) {
      return res.status(400).json({
        success: false,
        message: "imageUrl and username are required",
      });
    }

    // Create new document
    const newAvatar = new CustomeAvatar({
      imageUrl,
      username,
    });

    // Save to MongoDB
    const savedAvatar = await newAvatar.save();

    return res.status(201).json({
      success: true,
      message: "Custom avatar uploaded successfully",
      data: savedAvatar,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
})

router.get("/get", async (req, res) => {
try {
    const { username } = req.query;
    const avatars = await CustomeAvatar.find({ username });

    return res
      .status(200)
      .json({ message: "get profile image", avatars: avatars });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
});

export default router;