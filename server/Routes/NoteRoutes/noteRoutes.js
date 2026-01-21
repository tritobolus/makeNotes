import express from 'express'
import Note from "../../models/note.js";

const router = express.Router()

router.get("/get", async (req, res) => {
  const {userId} = req.query
  const notes = await Note.find({userId: userId}).sort({ createdAt: -1 });;
  return res.json(notes);
});

router.post("/create", async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    const note = await Note.create({
      title: title,
      description: description,
      userId: userId
    });
    return res.status(201).json({ message: "Note created succesfull", note });
} catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal Server error"})
  }
});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  await Note.findByIdAndDelete(id);
  res.status(200).json({ message: "Note deleted" });
});

router.put("/update", async (req, res) => {
  const { id, title, description } = req.body;

  await Note.findByIdAndUpdate(
    id,
    { title, description },
    { new: true }
  );

  res.status(200).json({message: "Note Updated"});
});



export default router;