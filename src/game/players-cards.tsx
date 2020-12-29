import React from "react";
import styled from "styled-components";
import { Card as TCard } from "../config";
import { useTrail, animated } from "react-spring";

import Card from "./cards";
import { PlayersCard } from "./hooks/use-date-night-config";

const CardHolder = styled.div`
  flex: auto;
  display: flex;
  justify-content: space-around;
  overflow-y: hidden;
`;

const config = { mass: 1, tension: 500, friction: 50 };

const PlayersCards = ({
  cards,
  discard,
}: {
  cards: TCard[];
  discard: (c: PlayersCard) => void;
}) => {
  const trail = useTrail(cards.length, {
    y: 0,
    opacity: 1,
    width: "25%",
    from: { y: 200, opacity: 0.5, width: "25%" },
    config,
  });

  return (
    <CardHolder>
      {trail.map(({ y, ...rest }, index) => {
        return (
          <animated.div
            key={cards[index].name}
            style={{
              ...rest,
              transform: y.interpolate((y) => `translate3d(0,${y}px,0)`),
            }}
          >
            <Card card={cards[index]} onClick={() => discard(cards[index])} />
          </animated.div>
        );
      })}
    </CardHolder>
  );
};

export default PlayersCards;
