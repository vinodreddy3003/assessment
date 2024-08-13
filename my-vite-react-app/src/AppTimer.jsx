import "./AppTimer.scss";
import { useEffect, useState, useRef } from "react";

function AppTimer({ duration, onTimeUp }) {
  const [counter, setCounter] = useState(0);
  const [progressLoaded, setProgressLoaded] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((cur) => cur + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    setProgressLoaded(100 * (counter / duration));

    if (counter === duration) {
      clearInterval(intervalRef.current);

      setTimeout(() => {
        onTimeUp();
      }, 1000);
    }
  }, [counter, duration, onTimeUp]);

  return (
    <div className="app-timer-container">
      <div className="progress-box">
        <div
          style={{
            width: `${progressLoaded}%`,
            backgroundColor: `${
              progressLoaded < 40
                ? "lightgreen"
                : progressLoaded < 70
                ? "orange"
                : "red"
            }`,
          }}
          className="progress"
        ></div>
      </div>
      <div className="timer-display">
        {duration - counter} seconds remaining
      </div>
    </div>
  );
}

export default AppTimer;

