import React from "react";
import { Button, Carousel, Emoji } from "../../components";
import { Confetti } from "../../animations";
import "./GameOver.css";

const photos = Array.from(Array(6), (item, index) => `./${index}.jpg`);

const GameOver = ({ restartGame }) => {
  return (
    <div className="game-over">
      <Confetti />
      <h1 className="game-over__title">
        Congratulations! <br /> You won!
      </h1>
      <div className="game-over__top">
        <div className="game-over__balloons">
          <div className="game-over__balloon">
            <span className="game-over__balloon--number">?</span>
          </div>
          <div className="game-over__balloon">
            <span className="game-over__balloon--number">?</span>
          </div>
          <div className="game-over__balloon">
            <div className="game-over__balloon--image">
              <Emoji label="party" emoji="🥳" />
            </div>
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
      </div>
      <div className="game-over__body">
        {window.matchMedia("(max-width: 768px)").matches && (
          <div className="game-over__carousel">
            <Carousel
              header="Carousel Photos"
              items={photos}
              landscape={true}
            />
          </div>
        )}
        <div className="game-over__body--bottom">
          <audio controls autoPlay loop>
            <source src="./parabens.mp3" type="audio/mpeg"></source>
          </audio>
          <Button
            className="game-over__button"
            onClick={restartGame}
            label="Play Again"
          />
        </div>
        {window.matchMedia("(min-width: 767px)").matches && (
          <div className="game-over__carousel">
            <Carousel
              header="Carousel Photos"
              items={photos}
              /* hasPreviews={true}*/ landscape={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GameOver;
