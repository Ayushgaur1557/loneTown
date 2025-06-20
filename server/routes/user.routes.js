// /server/routes/user.routes.js
import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

// GET /api/users/:id → Get user profile by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // exclude password if exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("❌ Failed to fetch user:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Update user profile
router.put("/:id", async (req, res) => {
  try {
    const updates = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(" Failed to update user:", err.message);
    res.status(500).json({ error: "Update failed" });
  }
});


export default router;
