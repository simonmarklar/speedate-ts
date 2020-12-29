import React from "react";
import styled from "styled-components";
import { animated } from "react-spring";
import { PlayersCard } from "../../game/hooks/use-date-night-config";

import cardImage from "./card.png";
import back from './back.png'

const GameCard = styled(animated.div)<{isDiscarded: boolean}>`
  background: url(${({isDiscarded}) => isDiscarded ? back : cardImage}) no-repeat center center;
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

export default function PlayerCard({ card, onClick }: { card: PlayersCard, onClick: ( ) => void }) {
  return (
    <GameCard onClick={onClick} isDiscarded={card.isDiscarded || false}>
      {!card.isDiscarded && <CardText>{card.name}</CardText>}
    </GameCard>
  );
}
