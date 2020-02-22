import { useSpring, animated } from "react-spring";
import React, { ReactNode, RefForwardingComponent } from "react";

const Animated = <T, K extends keyof T>({
  animation,
  children
}: {
  animation: T;
  children?: ReactNode | RefForwardingComponent<any>;
}) => {
  const props = useSpring(animation);

  return <animated.div style={props}>{children}</animated.div>;
};

export default Animated;
