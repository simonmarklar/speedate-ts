import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { Card as TCard } from "../config/cards";
import { useTrail, animated } from "react-spring";

import Card from "./cards/card";

const CardHolder = styled.div`
  flex: auto;
  display: flex;
  justify-content: space-around;
  overflow-y: hidden;
`;

const dealingCardsConfig = { mass: 1, tension: 500, friction: 50 };

const DealingCardsAnimation = ({
  cards,
  children
}: PropsWithChildren<{ cards: TCard[] }>) => {
  const trail = useTrail(cards.length, {
    y: 0,
    opacity: 1,
    width: "25%",
    from: { y: 200, opacity: 0.5, width: "25%" },
    dealingCardsConfig
  });

  return (
    <>
      {trail.map(({ y, ...rest }, index) => (
        <animated.div
          key={index}
          style={{
            ...rest,
            transform: y.interpolate(y => `translate3d(0,${y}px,0)`)
          }}
        >
          {children?.apply ? children(index) : null}
        </animated.div>
      ))}
    </>
  );
};

const PlayersCards = ({ cards }: { cards: TCard[] }) => {
  return (
    <CardHolder>{(index: number) => <Card card={cards[index]} />}</CardHolder>
  );
};

export default PlayersCards;
