import { unfreezeExpiredUsers } from "../services/state.service.js";

export const runUnfreezeJob = async () => {
  try {
    const result = await unfreezeExpiredUsers();
    console.log("✅ Unfreeze job ran. Users updated:", result.modifiedCount);
  } catch (error) {
    console.error("❌ Unfreeze job failed:", error.message);
  }
};
