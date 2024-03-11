import express from "express";
import Fight from "../models/Fight.js";

const router = express.Router();

router.get("/fights", async (req, res) => {
  try {
    const fights = await Fight.find();
    res.status(200).json(fights);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;