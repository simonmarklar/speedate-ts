import React, { ImgHTMLAttributes } from "react";
import { animated } from "react-spring";

interface SpriteProps extends ImgHTMLAttributes<HTMLImageElement> {
  imageUrl: string;
  animation?: { [k: string]: any };
}

const Sprite = ({ imageUrl, animation, ...props }: SpriteProps) => {
  if (animation) {
    return (
      <animated.div style={animation}>
        <img src={imageUrl} alt="" {...props} />
      </animated.div>
    );
  }

  return <img src={imageUrl} alt="" {...props} />;
};

export default Sprite;
