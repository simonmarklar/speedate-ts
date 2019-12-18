import React, { PropsWithChildren, useState } from "react";
import PlayerAnimation from "./player-animation";

const animations: { [p: string]: object } = {
  walkIn: {
    delay: 2500,
    from: {
      right: -2000,
      opacity: 0,
      position: "absolute",
      bottom: 0
    },
    to: {
      right: -20,
      opacity: 1,
      position: "absolute",
      bottom: 0
    }
  }
};
export default function GirlAnimation({ children }: PropsWithChildren<{}>) {
  const [currentAnimation, setCurrentAnimation] = useState("walkIn");

  return (
    <PlayerAnimation animation={animations[currentAnimation]}>
      {children}
    </PlayerAnimation>
  );
}
