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
      className={`game-card ${
        isSelected && !isMatched ? "game-card--selected" : ""
      } ${landscape ? "game-card--landscape" : ""}`}
      onClick={onClick}
    >
      <img
        className="game-card__image"
        src={isSelected || isMatched ? imageSrc : "./cover.jpg"}
        alt={alt}
      />
    </li>
  );
};

export default GameCard;
