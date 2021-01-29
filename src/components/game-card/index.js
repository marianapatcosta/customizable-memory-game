import React, { useState } from "react";
import { ORIENTATIONS } from "../../constants";
import "./GameCard.css";

const GameCard = ({
  imageSrc,
  alt,
  isSelected,
  isMatched,
  cardOrientation,
  gameCardBackImage,
  onClick,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <li
      className={`game-card-wrapper  ${
        cardOrientation === ORIENTATIONS.LANDSCAPE
          ? "game-card-wrapper--landscape"
          : ""
      }`}
    >
      <div
        className={`game-card game-card--front ${
          isSelected || isMatched ? "game-card--selected-front" : ""
        }`}
      >
        <img className="game-card__image" src={imageSrc} alt={alt} />
      </div>

      <div
        className={`game-card ${
          isSelected || isMatched ? "game-card--selected-back" : ""
        }`}
        onClick={onClick}
      >
        {!isLoaded && (
          <div className={`game-card__image game-card__image--placeholder`}></div>
        )}
        <img
          className={`game-card__image ${!isLoaded ? 'game-card__image--not-loaded' : ''}`}
          src={gameCardBackImage}
          alt={'card-back'}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </li>
  );
};

export default GameCard;
