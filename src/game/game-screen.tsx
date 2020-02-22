import React from "react";
import styled from "styled-components";

import Loading from "../components/loading";
import GuySprite from "../players/guy/guy";
import GirlSprite from "../players/girl/girl";
import PlayersCards from "./players-cards";

import useGameState from "./game-state/game-state";

import tableImg from "./table.png";
import background from "./bg.jpg";

const Table = styled.div`
  background: url(${tableImg}) no-repeat center center;
  width: 100vw;
  height: 143px;
  position: absolute;
  bottom: 0;
`;

const Screen = styled.div`
  background: url(${background}) repeat-x center top;
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  align-items: flex-start;
`;

const Stage = styled.div`
  flex: 1 1 auto;
  min-height: 342px;
  display: flex;
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const Interface = styled.div`
  background: black;
  display: flex;
  flex-grow: 1;
  width: 100%;
`;

export default function GameScreen({
  onBackToMenuClick
}: {
  onBackToMenuClick: () => void;
}) {
  const { gameState, actionDispatchers } = useGameState();

  if (!gameState || !actionDispatchers) {
    return <Loading />;
  }

  return (
    <Screen>
      <Stage>
        <Table />
        <GuySprite imageUrl={gameState.difficulty.menuItem.playerImage} />
        <GirlSprite dateNumber={gameState.dateNumber} />
      </Stage>

      <Interface>
        <PlayersCards cards={gameState.playersCards} />

        <button onClick={onBackToMenuClick}>Bail on this date</button>
        <button onClick={actionDispatchers.deal}>Hit me!</button>
      </Interface>
    </Screen>
  );
}
