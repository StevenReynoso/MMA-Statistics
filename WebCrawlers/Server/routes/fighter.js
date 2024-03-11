import express from "express";
import Fighter from "../models/Fighter.js";

const router = express.Router();

router.get("/fighters", async (req, res) => {
  try {
    const fighters = await Fighter.find();
    res.status(200).json(fighters);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;