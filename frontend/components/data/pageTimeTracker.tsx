import { useState, useEffect } from "react";
import { Timer } from "lucide-react";
import { Button, Tooltip } from "@nextui-org/react";

const PageTimeTracker = () => {
  const [timeSpent, setTimeSpent] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined; // Using ReturnType to infer the correct type

    if (isActive) {
      interval = setInterval(() => {
        setTimeSpent((prevTime) => prevTime + 1);
      }, 1000);
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsActive(false);
        if (interval) clearInterval(interval); // Clear interval when page visibility changes
      } else {
        setIsActive(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (interval) clearInterval(interval); // Clear interval when component unmounts
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };

  return (
    <Tooltip
      content={
        <div className="flex flex-col text-gray-400 items-center p-2">
          <span className="text-white font-medium">
            {formatTime(timeSpent)}
          </span>
          Time so far
        </div>
      }
    >
      <Button isIconOnly variant="light">
        <Timer
          className={`w-6 ${isActive ? "text-blue-500" : "text-gray-400"}`}
        />
      </Button>
    </Tooltip>
  );
};

export default PageTimeTracker;
