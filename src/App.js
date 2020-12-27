import React, { useState } from "react";
import GameStart from "./pages/game-start/GameStart";
import GameOver from "./pages/game-over/GameOver";
import GameBoard from "./pages/game-board/GameBoard";
import Header from "./components/header/Header";
import "./App.css";

const App = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

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
