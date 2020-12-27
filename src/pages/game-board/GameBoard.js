import React, { useState, useEffect, useCallback } from "react";

import "./GameBoard.css";
import GameCard from "../../components/game-card/GameCard";
import Modal from "../../components/modal/Modal";
import Button from "../../components/button/Button";

const defineRandomizedCards = () => {
  let cards = Array.from(Array(6), (item, index) => {
    return {
      path: `./${index}.jpg`,
      isSelected: false,
      isMatched: false,
    };
  });

  let randomizedCards = (cards = [...cards, ...cards]);
  let count = randomizedCards.length;
  let temporaryStoredCard;

  while (count > 0) {
    const randomInt = Math.floor(Math.random() * count);
    count--;
    temporaryStoredCard = randomizedCards[count];
    randomizedCards[count] = randomizedCards[randomInt];
    randomizedCards[randomInt] = temporaryStoredCard;
  }
  return randomizedCards;
};

const GameBoard = ({ handleGameOver, restartGame }) => {
  const initCards = defineRandomizedCards();
  const [cards, setCards] = useState(initCards);
  const [errorMessage, setErrorMessage] = useState("");
  const [isConfirmationModal, setIsConfirmationModal] = useState("");

  const updateGameCards = useCallback(() => {
    const selectedCards = cards.filter((card) => card.isSelected);
    if (selectedCards.length <= 1) {
      return;
    }
    const indexCardOne = cards.indexOf(selectedCards[0]);
    const indexCardTwo = cards.indexOf(selectedCards[1]);

    if (selectedCards[0].path === selectedCards[1].path) {
      return setCards((prevCards) => {
        let newCards = [...prevCards];
        newCards[indexCardOne].isSelected = false;
        newCards[indexCardOne].isMatched = true;
        newCards[indexCardTwo].isSelected = false;
        newCards[indexCardTwo].isMatched = true;
        return newCards;
      });
    }

    setTimeout(() => {
      setCards((prevCards) => {
        let newCards = [...prevCards];
        newCards[indexCardOne].isSelected = false;
        newCards[indexCardOne].isMatched = false;
        newCards[indexCardTwo].isSelected = false;
        newCards[indexCardTwo].isMatched = false;
        return newCards;
      });
    }, 1000);
  }, [cards]);

  const checkGameOver = useCallback(() => {
    const matchingCards = cards.filter((cards) => cards.isMatched);
    if (matchingCards.length === cards.length) {
      handleGameOver();
    }
  }, [cards, handleGameOver]);

  useEffect(() => {
    updateGameCards();
    setTimeout(() => checkGameOver(), 500);
  }, [cards, checkGameOver, updateGameCards]);

  const handleCardSelection = (index) => {
    
    const selectedCards = cards.filter((card) => card.isSelected);
/*     if (cards[index].isMatched) {
      return setErrorMessage("This card is already matched!");
    } */

    if (selectedCards.length >= 2) {
      return setErrorMessage("You can only select 2 cards!");
    }

    return setCards((prevCards) => {
      let newCards = [...prevCards];
      newCards.splice(index, 1, {
        path: prevCards[index].path,
        isSelected: true,
        isMatched: prevCards[index].isMatched,
      });
      return newCards;
    });
  };

  const handleQuitGame = () => {
    setErrorMessage("Are you sure you want to quit?");
    setIsConfirmationModal(true);
  };

  const onCloseModal = () => {
    setErrorMessage("");
    setIsConfirmationModal(false);
  };

  return (
    <div className="game-board">
      <h2 className="game-board__title">Select two cards and match them all</h2>
      {errorMessage && (
        <Modal
          confirmationModal={isConfirmationModal}
          onConfirmation={restartGame}
          onClose={onCloseModal}
          buttonLabel={isConfirmationModal ? "Cancel" : "OK"}
          confirmationLabel="Yes"
          message={errorMessage}
        />
      )}
      <ul className="game-board__card-list">
        {cards.map((card, index) => (
          <GameCard
            key={`card-${index}`}
            imageSrc={card.path}
            alt={`card ${index}`}
            isSelected={card.isSelected}
            isMatched={card.isMatched}
            landscape
            onClick={() => handleCardSelection(index)} //onClick={handleCardSelection.bind(null, index)} 
          />
        ))}
      </ul>
      <footer>
        <Button onClick={handleQuitGame} label="Quit game" />
      </footer>
    </div>
  );
};

export default GameBoard;
