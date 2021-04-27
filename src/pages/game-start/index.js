import React from "react";
import { Button, Emoji } from "../../components";
import "./GameStart.css";

const GameStart = ({ startGame }) => {
  return (
    <div className="game-start">
      <h2 className="game-start__title">
        Welcome to the cutest memory game ever!
      </h2>
      <div className="game-start__present">
        <Emoji label="present" emoji="🎁" />
      </div>
      <Button onClick={startGame} label="Start Game" />
    </div>
  );
};

export default GameStart;
