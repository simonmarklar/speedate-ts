import React from "react";

import useDifficulties from "../config/difficulties";
import Menu from "./menu/menu";
import FadeIn from "../components/fade-in";
import "./menu-screen.css";

export default function MenuScreen({ startGame }: { startGame: () => void }) {
  const { difficulties, selectDifficulty } = useDifficulties();
  const menuItems = Array.from(difficulties.values()).map(d => ({
    ...d.menuItem,
    name: d.name
  }));

  const start = (difficultyName: string) => {
    selectDifficulty(difficultyName);
    startGame();
  };

  return (
    <FadeIn className="menu-screen">
      <div className="banner-container">
        <div className="banner-item">
          <h1 className="logo">Speedate!</h1>
        </div>
        <div className="banner-item">
          <div className="intro">
            <p>Douchey McDouchebag needs some lovin'</p>
            <p>
              Nothing like a bit of speed dating to get your
              <span className="loves">heart pumping!</span>
            </p>

            <p>
              Try and make your dates heart race by figuring out what she loves
              and hates.
            </p>

            <p>
              The girls gradually reveal their interests. Discard the bad cards
              and keep the good ones to make a perfect hand and win them over!
            </p>
          </div>
        </div>
      </div>
      <Menu menuItems={menuItems} onClick={start} />
    </FadeIn>
  );
}
