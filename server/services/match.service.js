import User from "../models/user.model.js";
import Match from "../models/match.model.js";

export const findCompatibleMatch = async (userId) => {
  try {
    // 1. Get user info
    const currentUser = await User.findById(userId);
    if (!currentUser) throw new Error("User not found");

    // 2. Exclude already matched users (optional for enhancement)

    // 3. Find another available user
    const potentialMatch = await User.findOne({
      _id: { $ne: userId },
      currentState: "available",
    });

    if (!potentialMatch) return null;

    // 4. Create Match record
    const newMatch = await Match.create({
      userA: userId,
      userB: potentialMatch._id,
    });

    // 5. Update user states
    await User.findByIdAndUpdate(userId, { currentState: "matched" });
    await User.findByIdAndUpdate(potentialMatch._id, { currentState: "matched" });

    return newMatch;
  } catch (err) {
    console.error("Matchmaking error:", err);
    throw err;
  }
};
