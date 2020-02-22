import React from "react";

import { DifficultyProvider } from "./config/difficulties";
import { CardsProvider } from "./config/cards";
import ScreenManager from "./components/screen-manager";

const App: React.FC = () => {
  return (
    <DifficultyProvider>
      <CardsProvider>
        <ScreenManager />
      </CardsProvider>
    </DifficultyProvider>
  );
};

export default App;
