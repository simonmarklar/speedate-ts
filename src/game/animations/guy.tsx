import React, { PropsWithChildren, useState } from "react";
import PlayerAnimation from "./player-animation";

const animations: { [p: string]: object } = {
  walkIn: {
    delay: 500,
    from: {
      left: -2000,
      opacity: 0,
      position: "absolute",
      width: 446,
      bottom: 0
    },
    to: {
      left: -20,
      opacity: 1,
      position: "absolute",
      width: 446,
      bottom: 0
    }
  }
};
export default function GuyAnimation({ children }: PropsWithChildren<{}>) {
  const [currentAnimation, setCurrentAnimation] = useState("walkIn");

  return (
    <PlayerAnimation animation={animations[currentAnimation]}>
      {children}
    </PlayerAnimation>
  );
}
