import React from "react";
import styled from "styled-components";
import { Card as TCard } from "../config/cards";
import { useTrail, animated } from "react-spring";

import Card from "./card";

const CardHolder = styled.div`
  flex: auto;
  display: flex;
  justify-content: space-around;
`;

const config = { mass: 1, tension: 500, friction: 50 };

const PlayersCards = ({ cards }: { cards: TCard[] }) => {
  const trail = useTrail(cards.length, {
    y: 0,
    opacity: 1,
    width: "25%",
    from: { y: 200, opacity: 0.5, width: "25%" },
    config
  });

  return (
    <CardHolder>
      {trail.map(({ y, ...rest }, index) => {
        return (
          <animated.div
            key={index}
            style={{
              ...rest,
              transform: y.interpolate(y => `translate3d(0,${y}px,0)`)
            }}
          >
            <Card card={cards[index]} />
          </animated.div>
        );
      })}
      {/* <AnimatedRepeat
        list={cards}
        keyFn={card => card.name}
        animation={animation}
      >
        {card => <Card card={card} />}
      </AnimatedRepeat> */}
    </CardHolder>
  );
};

export default PlayersCards;
