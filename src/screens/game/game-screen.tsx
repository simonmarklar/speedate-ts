import React, { useCallback } from "react";
import styled from "styled-components";

import GuySprite from "../../game/guy";
import GirlSprite from "../../game/girls";

import Timer from "../../game/timer";

import tableImg from "./table.png";
import background from "./bg.jpg";
import useDateNightConfig from "../../game/hooks/use-date-night-config";
import PlayersCards from "../../game/players-cards";
import { useHistory } from "react-router-dom";

const Table = styled.div`
  background: url(${tableImg}) no-repeat center center;
  width: 100vw;
  height: 143px;
  position: absolute;
  bottom: 0;
`;
Table.displayName = "Table";

const Screen = styled.div`
  background: url(${background}) repeat-x center top;
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  align-items: flex-start;
`;
Screen.displayName = "Screen";

const Stage = styled.div`
  flex: 1 1 auto;
  min-height: 80%;
  display: flex;
  width: 100%;
  overflow: hidden;
  position: relative;
`;
Stage.displayName = "Stage";

const Interface = styled.div`
  background: black;
  display: flex;
  flex-grow: 1;
  width: 100%;
`;
Interface.displayName = "Interface";

const UIContainer = styled.div`
  background: rgb(71, 73, 70);
  border: 4px solid #696666;
  border-radius: 8px;
  text-align: center;
  position: absolute;
  top: 1em;
  display: flex;
  padding: 0.2rem 0.4rem;
  justify-content: center;
`;
UIContainer.displayName = "UIContainer";

const Digit = styled.span`
  font-size: 3em;
  color: rgb(248, 250, 248);
`;
Digit.displayName = "DateCounterDigit";
export default function GameScreen() {
  const { difficulty, round, timeLeft, playersHand, actions } = useDateNightConfig();
  const history = useHistory()
  const nextDate = useCallback(() => {
    actions?.startNextRound();
  }, [actions]);

  const backToMenu = useCallback(() => {
    history.push('/')
  },[history])

  return (
    <Screen>
      <Stage>
        <UIContainer><Digit>Date #{round}!</Digit></UIContainer>
        <Timer timeLeft={timeLeft} />
        <Table />
        <GuySprite imageUrl={difficulty.menuItem.image} />
        <GirlSprite dateNumber={round} />
      </Stage>

      <Interface>
        <PlayersCards cards={playersHand} discard={actions.discardCard}/>

        <button onClick={backToMenu}>Stop the dates!</button>
        <button onClick={nextDate}>Bail on this date</button>
        <button
          disabled={!playersHand.some(c=>c.isDiscarded)}
          onClick={actions?.drawCards}
        >
          Hit me!
        </button>
      </Interface>
    </Screen>
  );
}
