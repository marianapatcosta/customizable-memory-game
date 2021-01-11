import React, { useState } from "react";
import { GameBoard, GameOver, GameStart } from "../";
import "./Game.css";

const Game = ({ gameSetup }) => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const startGame = () => setIsGameStarted(true);
  const showGameOver = () => setIsGameOver(true);
  const restartGame = () => {
    setIsGameStarted(false);
    setIsGameOver(false);
  };

  return (
    <div className="game">
      {!isGameStarted && !isGameOver && <GameStart startGame={startGame} />}
      {isGameStarted && !isGameOver && (
        <GameBoard
          gameSetup={gameSetup}
          handleGameOver={showGameOver}
          restartGame={restartGame}
        />
      )}
      {isGameStarted && isGameOver && <GameOver restartGame={restartGame} />}
    </div>
  );
};

export default Game;
