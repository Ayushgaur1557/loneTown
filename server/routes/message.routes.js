import express from "express";
import Message from "../models/message.model.js";

const router = express.Router();

// Get messages for a match
router.get("/:matchId", async (req, res) => {
  try {
    const { matchId } = req.params;
    const messages = await Message.find({ matchId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

export default router;
