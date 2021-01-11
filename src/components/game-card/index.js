import React from "react";
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
        <img
          className="game-card__image"
          src={"./cover.jpg"}
          alt={gameCardBackImage}
        />
      </div>
    </li>
  );
};

export default GameCard;
