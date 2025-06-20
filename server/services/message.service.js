//Track when two matched users exchange 100 messages within 48 hours, and unlock video calling once they do.

import Message from "../models/message.model.js";
import Match from "../models/match.model.js";
import mongoose from "mongoose";

export const checkMessageMilestones = async () => {
  const now = new Date();
  const cutoff = new Date(now.getTime() - 48 * 60 * 60 * 1000); // 48h ago

  // Find matches not yet unlocked for video
  const matches = await Match.find({
    videoUnlocked: false,
    createdAt: { $gte: cutoff }
  });

  for (const match of matches) {
    const messageCount = await Message.countDocuments({
      matchId: match._id,
      createdAt: { $gte: match.createdAt }, // Count only from match start
    });

    if (messageCount >= 100) {
      match.videoUnlocked = true;
      await match.save();
      console.log(`🎥 Video unlocked for match ${match._id}`);
    }
  }
};
