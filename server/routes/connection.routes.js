// /server/routes/connection.routes.js
import express from "express";
import ConnectionRequest from "../models/connectionRequest.model.js";
import Match from "../models/match.model.js";

const router = express.Router();

// ✅ POST /api/requests/send
router.post("/send", async (req, res) => {
  const { from, to } = req.body;

  if (!from || !to) {
    return res.status(400).json({ error: "Both sender and receiver are required" });
  }

  if (from === to) {
    return res.status(400).json({ error: "Cannot send request to yourself" });
  }

  try {
    const exists = await ConnectionRequest.findOne({ from, to, status: "pending" });

    if (exists) {
      return res.status(409).json({ error: "Request already sent" });
    }

    const request = await ConnectionRequest.create({ from, to });
    res.status(201).json(request);
  } catch (err) {
    console.error("❌ Failed to send request:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ GET /api/requests/incoming/:userId
router.get("/incoming/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const incomingRequests = await ConnectionRequest.find({
      to: userId,
      status: "pending",
    }).populate("from", "name email"); // show who sent it

    res.json(incomingRequests);
  } catch (err) {
    console.error("❌ Failed to fetch incoming requests:", err.message);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
});

// ✅ POST /api/requests/accept
router.post("/accept", async (req, res) => {
  const { requestId } = req.body;

  if (!requestId) {
    return res.status(400).json({ error: "Request ID is required" });
  }

  try {
    const request = await ConnectionRequest.findById(requestId);
    if (!request || request.status !== "pending") {
      return res.status(404).json({ error: "Connection request not found or already handled" });
    }

    request.status = "accepted";
    await request.save();

    const match = await Match.create({
      userA: request.from,
      userB: request.to,
    });

    res.status(201).json({ message: "Match created!", match });
  } catch (err) {
    console.error("❌ Failed to accept request:", err.message);
    res.status(500).json({ error: "Failed to accept request" });
  }
});

export default router;
