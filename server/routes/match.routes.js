// /server/routes/match.routes.js
import express from "express";
import Match from "../models/match.model.js";

const router = express.Router();

// ✅ GET /api/matches/:userId → All matches for logged-in user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const matches = await Match.find({
      $or: [{ userA: userId }, { userB: userId }],
    })
      .populate("userA", "name email")
      .populate("userB", "name email");

    res.json(matches);
  } catch (err) {
    console.error("❌ Error fetching matches:", err.message);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});

export default router;
