import User from "../models/user.model.js";
import Match from "../models/match.model.js";

/**
 * Set a user's current state.
 */
export const updateUserState = async (userId, newState) => {
  try {
    return await User.findByIdAndUpdate(userId, { currentState: newState }, { new: true });
  } catch (error) {
    console.error("Error updating user state:", error);
    throw error;
  }
};

/**
 * Freeze a user for 24 hours after unpinning.
 */
export const freezeUser = async (userId) => {
  try {
    const freezeUntil = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hrs from now
    return await User.findByIdAndUpdate(
      userId,
      { currentState: "frozen", freezeUntil },
      { new: true }
    );
  } catch (error) {
    console.error("Error freezing user:", error);
    throw error;
  }
};

/**
 * Check and unfreeze user if time has passed.
 */
export const unfreezeExpiredUsers = async () => {
  const now = new Date();
  try {
    const updatedUsers = await User.updateMany(
      { currentState: "frozen", freezeUntil: { $lt: now } },
      { currentState: "available", freezeUntil: null }
    );
    return updatedUsers;
  } catch (error) {
    console.error("Error unfreezing users:", error);
    throw error;
  }
};
