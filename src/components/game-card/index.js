import React, { useState } from "react";
import { ORIENTATIONS } from "../../constants";
import { isEventValid } from "../../utils";
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

  const getAriaLabel = () => {
    if (isSelected) return `${alt} - Selected`;
    if (isMatched) return `${alt} - Matched`;
    return " Press Space or Enter to select this card";
  };

  const onKeyDown = (e) => isEventValid(e) && onClick();

  return (
    <li
      className={`game-card-wrapper  ${
        cardOrientation === ORIENTATIONS.LANDSCAPE
          ? "game-card-wrapper--landscape"
          : ""
      }`}
      tabIndex="0"
      aria-label={getAriaLabel()}
      onClick={onClick}
      onKeyDown={onKeyDown}
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
      >
        {!isLoaded && (
          <div
            className={`game-card__image game-card__image--placeholder`}
          ></div>
        )}
        <img
          className={`game-card__image ${
            !isLoaded ? "game-card__image--not-loaded" : ""
          }`}
          src={gameCardBackImage}
          alt={"card-back"}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </li>
  );
};

export default GameCard;
