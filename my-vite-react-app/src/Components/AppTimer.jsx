
import React, { useEffect, useState, useRef } from "react";
import "./AppTimer.scss";

function AppTimer({ duration, onTimeUp }) {
  const [counter, setCounter] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((cur) => cur + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (counter === duration) {
      clearInterval(intervalRef.current);
      onTimeUp();
    }
  }, [counter, duration, onTimeUp]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="app-timer">
      <span className="timer-time"><i class="bi bi-stopwatch-fill"></i>{formatTime(duration - counter)}</span>
      <span className="timer-label">Time Remaining</span>
    </div>
  );
}

export default AppTimer;
