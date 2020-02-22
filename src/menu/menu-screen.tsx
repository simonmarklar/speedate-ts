import React from "react";
import styled from "styled-components";

import useDifficulties from "../config/difficulties";
import Menu from "./menu";

import logo from "./logo.png";

const Screen = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-content: center;
`;

const HeaderItem = styled.div`
  flex: 0 0 auto;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Logo = styled.h1`
  background: url(${logo}) no-repeat 50%;
  width: 100%;
  height: 200px;
  text-indent: -999em;
  display: block;
`;

const Text = styled.div`
  text-align: center;
  padding: 0 2em;
`;

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
    <Screen>
      <Header>
        <HeaderItem>
          <Logo>Speedate!</Logo>
        </HeaderItem>
        <HeaderItem>
          <Text>
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
          </Text>
        </HeaderItem>
      </Header>
      <Menu menuItems={menuItems} onClick={start} />
    </Screen>
  );
}
