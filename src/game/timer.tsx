import React from "react";
import styled from "styled-components";

const TimerContainer = styled.div`
  background: rgb(71, 73, 70);
  border: 4px solid #696666;
  border-radius: 8px;
  width: 6em;
  text-align: center;
  position: absolute;
  right: 1em;
  top: 1em;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
TimerContainer.displayName = "TimerContainer";

const Digit = styled.span<{ $danger: boolean }>`
  font-size: 3em;
  flex: 1 1 auto;
  text-align: center;
  color: ${({ $danger }) =>
    $danger ? "color: rgb(209, 46, 46)" : "rgb(97, 252, 58)"};
  border: 2px solid #696666;
  min-width: 50%;
`;
Digit.displayName = "TimerDigit";
export default function Timer({ timeLeft }: { timeLeft: number }) {
  return (
    <TimerContainer>
      {timeLeft
        .toString()
        .split("")
        .map((digit, idx) => (
          <Digit $danger={timeLeft < 15} key={digit + idx}>
            {digit}
          </Digit>
        ))}
    </TimerContainer>
  );
}
