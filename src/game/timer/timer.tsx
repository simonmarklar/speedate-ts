import * as React from "react";

import "./timer.css";

const Timer = ({ timeLeft }: { timeLeft: string }) => {
  return (
    <div className="timerContainer gradientBg">
      {timeLeft.split("").map((digit, idx) => (
        <span className={`digit ${+timeLeft < 15 ? "danger" : ""}`} key={idx}>
          {digit}
        </span>
      ))}
    </div>
  );
};

export default Timer;
