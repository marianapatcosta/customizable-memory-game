import React from "react";

import "./GameCard.css";

const GameCard = ({
  imageSrc,
  alt,
  isSelected,
  isMatched,
  landscape,
  onClick,
}) => {
  return (
    <li
      className={`game-card-wrapper  ${
        landscape ? "game-card-wrapper--landscape" : ""
      }`}
    >
      <div
        className={`game-card game-card--front ${
          isSelected || isMatched ? "game-card--selected-front" : ""
        } ${isMatched ? "game-card--matched" : ""}
          `}
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
          alt={"card-cover"}
        />
      </div>
    </li>
  );
};

export default GameCard;
