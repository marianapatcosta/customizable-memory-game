import React from "react";
import { Button, Emoji } from "../../components";
import { isElectron } from "../../utils";
import "./GameStart.css";

const GameStart = ({ startGame, backToSetup }) => {
  const isElectronProcess = isElectron();

  return (
    <div className="game-start">
      <h2 className="game-start__title">
        Welcome to the cutest memory game ever!
      </h2>
      <div className="game-start__present">
        <Emoji label="present" emoji="🎁" />
      </div>
      {!isElectronProcess && (
          <button className='button-link game-start__link' onClick={backToSetup}>
            back to setup
          </button>
        )}
      <Button className="game-start__button" onClick={startGame} label="Start Game" />
    </div>
  );
};

export default GameStart;
