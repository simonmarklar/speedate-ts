import React, { useCallback, useMemo } from "react";
import styled from "styled-components";

import MenuButton from "./menu-button";
import Repeat from "../../components/Repeat";
import config, { Difficulty } from "../../config";
import useScreenManager from "../../game/hooks/use-screen-manager";
import useDateNightConfig from "../../game/hooks/use-date-night-config";

const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  width: 80%;
  margin: 0 auto;
`;

export default function Menu() {
  const { show } = useScreenManager();
  const { actions } = useDateNightConfig();

  const startGame = useCallback(
    (difficulty: Difficulty) => {
      actions.setDifficulty(difficulty);
      show("game");
    },
    [actions, show]
  );

  const menuItems = useMemo(
    () =>
      config.gameDifficulties.map((d) => ({
        ...d.menuItem,
        name: d.name,
      })),
    []
  );

  return (
    <MenuContainer>
      <Repeat list={menuItems}>
        {({ name, description, image }) => (
          <MenuButton
            title={name}
            description={description}
            key={name}
            onClick={() => {
              console.log({
                name,
                d: config.gameDifficulties,
                m: config.gameDifficulties.find((d) => d.name === name),
              });
              const difficulty = config.gameDifficulties.find(
                (d) => d.name === name
              );
              if (!difficulty) return;
              startGame(difficulty);
            }}
          >
            <img src={image} alt={name} />
          </MenuButton>
        )}
      </Repeat>
    </MenuContainer>
  );
}
