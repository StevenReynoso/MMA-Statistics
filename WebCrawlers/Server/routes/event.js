import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

router.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;