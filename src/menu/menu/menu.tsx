import React from "react";

import MenuButton from "../menu-button/menu-button";
import Guy from "../../players/guy/guy";
import Repeat from "../../components/repeat";
import { Difficulty } from "../../config/difficulties";

import "./menu.css";

type MenuItemConfig = { name: string } & Difficulty["menuItem"];
type MenuProps = {
  menuItems: Array<MenuItemConfig>;
  onClick: (arg0: string) => void;
};

export default function Menu({ menuItems, onClick }: MenuProps) {
  return (
    <div className="menu-container">
      <Repeat list={menuItems}>
        {({ name, description, playerImage }) => (
          <MenuButton
            title={name}
            description={description}
            key={name}
            onClick={() => onClick(name)}
          >
            <Guy imageUrl={playerImage} />
          </MenuButton>
        )}
      </Repeat>
    </div>
  );
}
