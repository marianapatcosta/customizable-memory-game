import React from "react";
import Button from "../../components/button/Button";
import Emoji from "../../components/emoji/Emoji";

import "./GameStart.css";

const GameStart = ({ startGame }) => {
  return (
    <div className="game-start">
      <h2 className="game-start__title">Welcome to the most cute memory game!</h2>
      <div className="game-start__present"><Emoji label="present" emoji="🎁"/></div>
      <Button onClick={startGame} label="Start Game"/>
    </div>
  );
};

export default GameStart;
