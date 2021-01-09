import React from "react";
import { Button, RadioButtonGroup } from "../../components";
import { orientation } from "../../constants";
import "./GameSetup.css";

const GameSetup = ({ startGame }) => {
  return (
    <div className="game-setup">
      <h2 className="game-start__title">Setup you game!</h2>
     <div className="game-setup__form">
     <RadioButtonGroup radioButtonMetadata={orientation} display={orientation[1]} />
     </div>
      <Button onClick={startGame} label="Generate your game"/>
    </div>
  );
};

export default GameSetup;
