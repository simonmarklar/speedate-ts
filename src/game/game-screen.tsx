import React from "react";

import FadeIn from "../components/fade-in";
import Loading from "../components/loading";

import GuyAnimation from "./animations/guy";
import GirlAnimation from "./animations/girl";
import CardAnimation from "./animations/card";
import Guy from "../players/guy/guy";
import Girl from "../players/girl/girl";
import Table from "./table";
import Card from "./card";
import Repeat from "../components/repeat";

import useGameState from "./game-settings";

import "./game-screen.css";

export default function GameScreen({
  onBackToMenuClick
}: {
  onBackToMenuClick: () => void;
}) {
  const { gameState, gameActions } = useGameState();

  if (!gameState || !gameActions) {
    return <Loading />;
  }

  return (
    <FadeIn className="gameScreen">
      <div className="stage">
        <div className="boundary">
          <Table />
          <GuyAnimation>
            <Guy imageUrl={gameState.difficulty.menuItem.playerImage} />
          </GuyAnimation>
          <GirlAnimation>
            <Girl dateNumber={gameState.dateNumber} />
          </GirlAnimation>
        </div>
      </div>

      <div className="interface">
        <div className="playersCards">
          <Repeat list={gameState.playersCards}>
            {card => (
              <CardAnimation>
                <Card card={card} key={card} />
              </CardAnimation>
            )}
          </Repeat>
        </div>

        <button className="playYourHand" onClick={onBackToMenuClick}>
          Play your hand
        </button>
        <button className="playYourHand" onClick={gameActions.deal}>
          Hit me!
        </button>
      </div>
    </FadeIn>
  );
}
