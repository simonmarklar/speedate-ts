import { useSpring, animated } from "react-spring";
import React, { PropsWithChildren, useState } from "react";

export default function PlayerAnimation({
  animation,
  children
}: PropsWithChildren<{ animation: object }>) {
  const props = useSpring(animation);

  return <animated.div style={props}>{children}</animated.div>;
}
