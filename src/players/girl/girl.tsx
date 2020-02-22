import React, { useMemo } from "react";
import _ from "lodash";
import Sprite from "../../components/sprite";
import useAnimations from "../../hooks/useAnimations";

import "./style.css";

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

const Girl = ({ dateNumber }: { dateNumber: number }) => {
  const [animation] = useAnimations(animations, "walkIn");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const imgUrl = useMemo(() => `/assets/img/girls/girl${_.random(0, 9)}.png`, [
    dateNumber
  ]);

  return (
    <Sprite
      imageUrl={imgUrl}
      animation={animation}
      alt="Your date"
      className="girl"
    />
  );
};

export default Girl;
