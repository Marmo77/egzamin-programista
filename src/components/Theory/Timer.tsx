import React, { useEffect, memo } from "react";
import { Card } from "../ui/card";
import { Clock } from "lucide-react";

const Timer = memo(
  ({
    timeLeft,
    setTimeLeft,
  }: {
    timeLeft: number;
    setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  }) => {
    const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60); // example: 3600 / 60 = 60 minutes
      const seconds = time % 60; // example: 3600 % 60 = 0 seconds
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    //time going down
    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }, [timeLeft]);

    return (
      <Card className="py-4 text-center">
        <div className="flex justify-center">
          <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Pozostało</span>
        </div>
        <div
          className={`text-2xl font-mono font-medium 
${timeLeft < 300 ? "text-red-600" : "text-foreground"}`}
        >
          {formatTime(timeLeft)}
        </div>
      </Card>
    );
  }
);

export default memo(Timer);
