import { useEffect, useState } from "react";

const FreezeTimer = () => {
  // Set initial freeze period (e.g., 24 hours from now)
  const storedFreezeEnd = localStorage.getItem("freezeEnd");
  const initialFreezeEnd = storedFreezeEnd
    ? new Date(storedFreezeEnd)
    : new Date(Date.now() + 24 * 60 * 60 * 1000);

  const [freezeEndTime] = useState(initialFreezeEnd);
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(freezeEndTime));
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Store in localStorage to persist on refresh
    localStorage.setItem("freezeEnd", freezeEndTime.toISOString());

    const interval = setInterval(() => {
      const remaining = getTimeRemaining(freezeEndTime);
      setTimeLeft(remaining);

      if (remaining.total <= 0) {
        clearInterval(interval);
        setIsComplete(true);
        localStorage.removeItem("freezeEnd"); // Clean up when done
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [freezeEndTime]);

  if (isComplete) {
    return (
      <div className="mt-4 text-green-600 font-medium">
        ✅ Reflection complete. A new match will arrive soon.
      </div>
    );
  }

  return (
    <div className="mt-4 text-lg font-mono text-[#AA14EC]">
      ⏳ {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s remaining
    </div>
  );
};

function getTimeRemaining(endTime) {
  const total = Date.parse(endTime) - Date.now();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);

  return { total, hours, minutes, seconds };
}

export default FreezeTimer;
