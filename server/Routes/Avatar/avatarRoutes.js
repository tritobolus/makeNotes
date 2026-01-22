import express from 'express'
import Avatar from '../../models/avatar.js'
const router = express.Router()

router.get("/get", async (req, res) => {
  const avatars = await Avatar.find();
  return res.json({message: "get all avatars", avatars:avatars});
});

export default router;