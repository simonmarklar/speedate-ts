import { useState } from "react";
import { useSpring } from "react-spring";

const useAnimations = <T>(animations: T, defaultAnimation: keyof T) => {
  const [current, setCurrentAnimation] = useState(defaultAnimation);
  const animationStyle = useSpring(animations[current]);

  return [animationStyle, setCurrentAnimation];
};

export default useAnimations;
