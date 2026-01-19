import express from "express";
import ProfileImage from "../../models/profileImage.js";

const router = express.Router();

router.post("/upload", async (req, res) => {
  try {
    const { userId, imageUrl } = req.body;

    const alreadyExist = await ProfileImage.findOne({
      userId,
    });

    //if the profile is alredy exist then only update the imgaUrl with new one
    if (alreadyExist) {
      const result = await ProfileImage.findOneAndUpdate(
        { userId },
        { imageUrl }, 
        { new: true } 
      );
      return res.status(200).json({ message: "updated profile photo", result });
    }

    //create new profile image
    const responce = await ProfileImage.create({
      userId: userId,
      imageUrl: imageUrl,
    });
    return res
      .status(201)
      .json({ message: "Profile photo uploaded!", responce });
  } catch (error) {
    console.log(error);
  }
});
router.get("/getProfile", async(req,res) => {
    try {
        const {userId} = req.query;
        const data = await ProfileImage.findOne({ userId})

        return res.status(200).json({message:"get profile image", imageUrl: data.imageUrl})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "internal server error"})
        
    }
})

export default router;
