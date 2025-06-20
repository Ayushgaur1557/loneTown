import { checkMessageMilestones } from "../services/message.service.js";

export const runMessageMilestoneJob = async () => {
  try {
    await checkMessageMilestones();
    console.log("✅ Message milestone check complete.");
  } catch (err) {
    console.error("❌ Error in milestone job:", err.message);
  }
};
