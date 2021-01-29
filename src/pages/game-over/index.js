import React from "react";
import { Button, Carousel, Emoji } from "../../components";
import { Confetti } from "../../animations";
import { PartyHat } from "../../assets/images";
import { Parabens } from "../../assets/audio";
import "./GameOver.css";

// const photos = Array.from(Array(6), (item, index) => `./${index}.jpg`);

const getAgeNumbers = (age) => {
  if (!age) return { firstAgeNumber: "?", secondAgeNumber: "?" };
  if (age.length === 1) return { firstAgeNumber: "?", secondAgeNumber: age };
  return { firstAgeNumber: age[0], secondAgeNumber: age[1] };
};

const GameOver = ({ gameSetup, restartGame }) => {
  const {
    carouselOrientation,
    carouselImages,
    age,
    balloonImage,
    birthdayAudio,
  } = gameSetup;
  const { firstAgeNumber, secondAgeNumber } = getAgeNumbers(age);

  return (
    <div className="game-over">
      <Confetti />
      <h1 className="game-over__title">
        Congratulations! <br /> You won!
      </h1>
      <div className="game-over__top">
        <div className="game-over__balloons">
          <div className="game-over__balloon">
            <span className="game-over__balloon--number">{firstAgeNumber}</span>
          </div>
          <div className="game-over__balloon">
            <span className="game-over__balloon--number">
              {secondAgeNumber}
            </span>
          </div>
          <div className="game-over__balloon">
            <div className="game-over__balloon--image">
              {!balloonImage ? (
                <Emoji label="party" emoji="🥳" />
              ) : (
                <img
                  className="game-over__balloon--image"
                  src={balloonImage.src}
                  alt="balloon"
                />
              )}
            </div>
          </div>
        </div>
        <img
          className="game-over__party-hat"
          src={PartyHat}
          alt="party hat"
        />
      </div>
      <div className="game-over__body">
        {window.matchMedia("(max-width: 768px)").matches &&
          !!carouselImages.length && (
            <div className="game-over__carousel">
              <Carousel
                items={carouselImages.map(({ src }) => src)}
                imageOrientation={carouselOrientation}
              />
            </div>
          )}
        <div className="game-over__body--bottom">
          <audio controls autoPlay loop>
            <source
              src={
                birthdayAudio.src || Parabens
              }
              type="audio/mpeg"
            ></source>
          </audio>
          <Button
            className="game-over__button"
            onClick={restartGame}
            label="Play Again"
          />
        </div>
        {window.matchMedia("(min-width: 767px)").matches &&
          !!carouselImages.length && (
            <div className="game-over__carousel">
              <Carousel
                items={carouselImages.map(({ src }) => src)}
                imageOrientation={carouselOrientation}
              />
            </div>
          )}
      </div>
    </div>
  );
};

export default GameOver;
