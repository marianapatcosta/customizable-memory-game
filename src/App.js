import React, { useState } from "react";
import { GameBoard, GameOver, GameStart } from "./pages/";
import { Header } from "./components";
import "./App.css";

const App = () => {
  const [isGameStarted, setIsGameStarted] = useState(true);
  const [isGameOver, setIsGameOver] = useState(true);

  const startGame = () => setIsGameStarted(true);

  const showGameOver = () => setIsGameOver(true);

  const restartGame = () => {
    setIsGameStarted(false);
    setIsGameOver(false);
  };

  return (
    <div className="app">
      <Header title="Memory Game" />
      <div className="app__spacer">&nbsp;</div>
      {!isGameStarted && !isGameOver && <GameStart startGame={startGame} />}
      {isGameStarted && !isGameOver && (
        <GameBoard handleGameOver={showGameOver} restartGame={restartGame} />
      )}
      {isGameStarted && isGameOver && <GameOver restartGame={restartGame} />}
    </div>
  );
};

export default App;
