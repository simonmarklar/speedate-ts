import React from "react";
import Sprite from "../../components/sprite";
import "./guy.css";

import useAnimations from "../../hooks/useAnimations";

interface GuyProps {
  imageUrl: string;
}

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
      bottom: 0
    }
  }
};

const Guy: React.FC<GuyProps> = ({ imageUrl }) => {
  const [animation] = useAnimations(animations, "walkIn");

  return (
    <Sprite
      imageUrl={imageUrl}
      animation={animation}
      alt="you"
      className="guy"
    />
  );
};

export default Guy;
