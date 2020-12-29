import React, { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";

import { Switch, Route } from "react-router-dom";

import MenuScreen from "../../screens/menu/menu-screen";
import GameScreen from "../../screens/game/game-screen";
import { DateNightConfigProvider } from "./use-date-night-config";

type ScreenName = "menu" | "game" | "date-results";

export interface ScreenManagerContextType {
  show: (_name: ScreenName) => void;
}

const ScreenManagerContext = React.createContext<ScreenManagerContextType>({
  show: (_name: ScreenName) => {},
});

export default function useScreenManager() {
  return useContext(ScreenManagerContext);
}
export function ScreenManager() {
  const history = useHistory();

  const show = useCallback((name: ScreenName) => {
    let url = "/";
    switch (name) {
      case "game":
        url = "/date";
        break;
    }
    history.push(url);
  }, [history]);

  return (
    <ScreenManagerContext.Provider value={{ show }}>
      <DateNightConfigProvider>
        <Switch>
          <Route path="/" exact>
            <MenuScreen />
          </Route>
          <Route path="/date">
            <GameScreen />
          </Route>
        </Switch>
      </DateNightConfigProvider>
    </ScreenManagerContext.Provider>
  );
}
