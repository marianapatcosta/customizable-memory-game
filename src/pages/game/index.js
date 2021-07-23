import React, { useState } from "react";
import { GameBoard, GameOver, GameStart } from "../";
import "./Game.css";

const Game = ({ gameSetup, backToSetup }) => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const {
    cardOrientation,
    gameCardBackImage,
    gameCardImages,
    carouselOrientation,
    carouselImages,
    age,
    balloonImage,
    birthdayAudio,
  } = gameSetup;

  const startGame = () => setIsGameStarted(true);
  const showGameOver = () => setIsGameOver(true);
  const restartGame = () => {
    setIsGameStarted(false);
    setIsGameOver(false);
  };

  return (
    <>
      {!isGameStarted && !isGameOver && <GameStart startGame={startGame} backToSetup={backToSetup}/>}
      {isGameStarted && !isGameOver && (
        <GameBoard
          gameSetup={{ cardOrientation, gameCardBackImage, gameCardImages }}
          handleGameOver={showGameOver}
          restartGame={restartGame}
        />
      )}
      {isGameStarted && isGameOver && (
        <GameOver
          gameSetup={{
            carouselOrientation,
            carouselImages,
            age,
            balloonImage,
            birthdayAudio,
          }}
          restartGame={restartGame}
          backToSetup={backToSetup}
        />
      )}
    </>
  );
};

export default Game;
