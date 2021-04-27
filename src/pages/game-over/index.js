import React from "react";
import { Button, Carousel, Emoji } from "../../components";
import { Confetti } from "../../animations";
import { PartyHat } from "../../assets/images";
import { isElectron } from "../../utils";
import "./GameOver.css";

const photos = Array.from(Array(4), (item, index) => ({
  src: `./${index}.jpg`,
}));

const getAgeNumbers = (age) => {
  if (!age) return { firstAgeNumber: "?", secondAgeNumber: "?" };
  if (age.length === 1) return { firstAgeNumber: "?", secondAgeNumber: age };
  return { firstAgeNumber: age[0], secondAgeNumber: age[1] };
};

const GameOver = ({ gameSetup, restartGame, backToSetup }) => {
  const {
    carouselOrientation,
    carouselImages,
    age,
    balloonImage,
    birthdayAudio,
  } = gameSetup;
  const { firstAgeNumber, secondAgeNumber } = getAgeNumbers(age);
  const isElectronProcess = isElectron();

  return (
    <div className="game-over">
      <Confetti />
      <h2 className="game-over__title">
        Congratulations! <br /> You won!
      </h2>
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
        <img className="game-over__party-hat" src={PartyHat} alt="party hat" />
      </div>
      <div className="game-over__body">
        {!!carouselImages.length && (
          <div className="game-over__carousel--mobile">
            <Carousel
              items={carouselImages}
              imageOrientation={carouselOrientation}
            />
          </div>
        )}
        <div className="game-over__body--bottom">
          {!!birthdayAudio && (
            <audio controls autoPlay loop>
              <source src={birthdayAudio.src} type="audio/mpeg" />
            </audio>
          )}
          <Button
            className="game-over__button"
            onClick={restartGame}
            label="Play Again"
          />
        </div>
        {!isElectronProcess && (
          <button className="button-link game-over__link" onClick={backToSetup}>
            Back to setup
          </button>
        )}
        {!!carouselImages?.length && (
          <div className="game-over__carousel--desktop">
            <Carousel
              items={carouselImages}
              imageOrientation={carouselOrientation}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GameOver;
