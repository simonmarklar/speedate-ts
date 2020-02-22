import React from "react";
import styled from "styled-components";

import MenuButton from "./menu-button";
import Repeat from "../components/repeat";
import { Difficulty } from "../config/difficulties";

const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  width: 80%;
  margin: 0 auto;
`;

type MenuItemConfig = { name: string } & Difficulty["menuItem"];
type MenuProps = {
  menuItems: Array<MenuItemConfig>;
  onClick: (arg0: string) => void;
};

export default function Menu({ menuItems, onClick }: MenuProps) {
  return (
    <MenuContainer>
      <Repeat list={menuItems}>
        {({ name, description, playerImage }) => (
          <MenuButton
            title={name}
            description={description}
            key={name}
            onClick={() => onClick(name)}
          >
            <img src={playerImage} alt={name} />
          </MenuButton>
        )}
      </Repeat>
    </MenuContainer>
  );
}
