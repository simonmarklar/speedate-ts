import React, { PropsWithChildren, HTMLAttributes } from "react";
import { useSpring, animated } from "react-spring";
export default function FadeIn({
  children,
  ...props
}: PropsWithChildren<{} & HTMLAttributes<HTMLDivElement>>) {
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <animated.div style={fadeIn} {...props}>
      {children}
    </animated.div>
  );
}
