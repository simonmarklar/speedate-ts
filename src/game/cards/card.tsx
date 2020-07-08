import React from "react";
import styled from "styled-components";
import { animated } from "react-spring";
import { Card } from "../../config/cards";

import cardImage from "./card.png";

const GameCard = styled(animated.div)`
  background: url(${cardImage}) no-repeat center center;
  text-align: center;
  font-family: "Roboto Condensed", sans-serif;
  font-size: 16px;
  display: flex;
  align-items: center;
  flex: 1 0 auto;
  background-size: contain;
  height: 100%;
`;

const CardText = styled.div`
  flex: 1 1 auto;
`;

const PlayersCard = ({ card }: { card: Card }) => {
  return (
    <GameCard>
      <CardText>{card.name}</CardText>
    </GameCard>
  );
};

export default PlayersCard;
