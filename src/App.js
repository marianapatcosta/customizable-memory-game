import React, { useState } from "react";
import { Game, GameSetup } from "./pages/";
import { Header, MenuBar } from "./components";
import { isElectron } from "./utils";
import "./App.css";

const App = () => {
  const [isSetupReady, setIsSetupReady] = useState(false);
  const [gameSetup, setGameSetup] = useState({});
  const isElectronProcess = isElectron();

  const handleGameSetup = (setup) => {
    setGameSetup(setup);
    setIsSetupReady(true);
  };

  return (
    <div className="app">
      {isElectronProcess && <MenuBar title="Memory Game" />}
      <Header className={`${isElectron ? 'app__header--electron' : ''}`} title="Memory Game" isElectron={isElectronProcess} />
      <div
        className={`app__spacer ${
          isElectronProcess ? "app__spacer--electron" : ""
        }`}
      >
        &nbsp;
      </div>
      {isSetupReady ? (
        <Game gameSetup={gameSetup} />
      ) : (
        <GameSetup handleSubmit={handleGameSetup} />
      )}
    </div>
  );
};

export default App;
