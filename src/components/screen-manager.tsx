import React, { useState } from "react";

import MenuScreen from "../menu/menu-screen";
import GameScreen from "../game/game-screen";
import { GameStateProvider } from "../game/game-settings";

export default function ScreenManager() {
  const [screen, setScreen] = useState("menu");

  const showGameScreen = () => setScreen("game");
  const showMenu = () => setScreen("menu");

  switch (screen) {
    case "game":
      return (
        <GameStateProvider>
          <GameScreen onBackToMenuClick={showMenu} />
        </GameStateProvider>
      );
    default:
      return <MenuScreen startGame={showGameScreen} />;
  }
}
