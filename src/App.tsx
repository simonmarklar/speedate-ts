import React from "react";
import { ScreenManager } from "./game/hooks/use-screen-manager";
import { BrowserRouter as Router } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <ScreenManager />
    </Router>
  );
};

export default App;
