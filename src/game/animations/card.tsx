import React, { PropsWithChildren, useState } from "react";
import PlayerAnimation from "./player-animation";

const animations: { [p: string]: object } = {
  dealt: {
    delay: 50,
    from: {
      left: -1000,
      opacity: 0,
      position: "absolute",
      width: 180,
      height: 300
    },
    to: {
      left: 0,
      opacity: 1,
      position: "absolute",
      width: 211,
      height: 329
    }
  }
};
export default function CardAnimation({ children }: PropsWithChildren<{}>) {
  const [currentAnimation, setCurrentAnimation] = useState("dealt");

  return (
    <PlayerAnimation animation={animations[currentAnimation]}>
      {children}
    </PlayerAnimation>
  );
}
