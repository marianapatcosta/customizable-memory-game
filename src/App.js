import React, { useState } from "react";
import { Game, GameBoard, GameOver, GameStart, GameSetup } from "./pages/";
import { Header } from "./components";
import "./App.css";

const App = () => {
  const [isSetupReady, setIsSetupReady] = useState(false);
  const [gameSetup, setGameSetup] = useState({});
  /*   const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const startGame = () => setIsGameStarted(true);

  const showGameOver = () => setIsGameOver(true);

  const restartGame = () => {
    setIsGameStarted(false);
    setIsGameOver(false);
  };
 */

  const handleGameSetup = (setup) => {
    setGameSetup(setup);
    setIsSetupReady(true);
  };

  return (
    <div className="app">
      <Header title="Memory Game" />
      <div className="app__spacer">&nbsp;</div>
      {isSetupReady ? (
        <Game gameSetup={gameSetup} />
      ) : (
        <GameSetup handleSubmit={handleGameSetup} />
      )}
      {/*     {!isGameStarted && !isGameOver && <GameStart startGame={startGame} />}
           {isGameStarted && !isGameOver && (
             <GameBoard handleGameOver={showGameOver} restartGame={restartGame} />
           )}
           {isGameStarted && isGameOver && <GameOver restartGame={restartGame} />} */}
    </div>
  );
};

export default App;
