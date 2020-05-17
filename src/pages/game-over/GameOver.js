import React from "react";
import Button from "../../components/button/Button";
import Confetti from "../../animations/Confetti";
import Carousel from "../../components/carousel/Carousel";
import Emoji from "../../components/emoji/Emoji";

import "./GameOver.css";

const photos = Array.from(Array(6), (item, index) => `./${index}.jpg`);

const GameOver = ({ restartGame }) => {
  return (
    <div className="game-over">
      <Confetti />
      <h1 className="game-over__title">
        CONGRATULATIONS! <br /> You won!
      </h1>
      <div className="game-over__balloons">
        <div className="game-over__balloon">
          <span className="game-over__balloon--number">?</span>
        </div>
        <div className="game-over__balloon">
          <span className="game-over__balloon--number">?</span>
        </div>
        <div className="game-over__balloon game-over__balloon--image">
          <Emoji label="party" emoji="🥳" />
          {/*  <img
            className="game-over__balloon--image"
            src="./0.jpg"
            alt="balloon"
          /> */}
        </div>
      </div>
      <img
        className="game-over__party-hat"
        src="./party-hat.png"
        alt="party hat"
      />
      <div className="game-over__carousel">
        <Carousel
          header="Carousel Photos"
          items={photos}
          /* hasPreviews={true}*/ landscape={true}
        />
      </div>
      <Button onClick={restartGame} label="Play Again" />
      <audio controls autoPlay loop>
        <source src="./parabens.mp3" type="audio/mpeg"></source>
      </audio>
    </div>
  );
};

export default GameOver;
