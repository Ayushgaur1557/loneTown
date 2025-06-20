import { runUnfreezeJob } from "./unfreeze.job.js";
import { runMessageMilestoneJob } from "./messageMilestone.job.js"; 

export const startScheduledJobs = () => {
  // Every 10 minutes: check for expired freezes and message milestones
  setInterval(() => {
    console.log("⏳ Running scheduled jobs...");
    runUnfreezeJob();
    runMessageMilestoneJob(); 
  }, 10 * 60 * 1000); // every 10 minutes
};
