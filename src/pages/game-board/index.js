import React, { useState, useEffect, useCallback } from "react";
import { Button, GameCard, Modal } from "../../components";
import "./GameBoard.css";

const defineRandomizedCards = (imageFilesAsDataUrl) => {
  let cards = imageFilesAsDataUrl.map((imageFile) => ({
    name: imageFile.name,
    path: imageFile.src,
    isSelected: false,
    isMatched: false,
  }));

  let randomizedCards = [...cards, ...cards];
  let count = randomizedCards.length;
  let temporaryStoredCard;

  while (count > 0) {
    const randomIndex = Math.floor(Math.random() * count);
    count--;
    temporaryStoredCard = randomizedCards[count];
    randomizedCards[count] = randomizedCards[randomIndex];
    randomizedCards[randomIndex] = temporaryStoredCard;
  }
  return randomizedCards;
};

const GameBoard = ({ gameSetup, handleGameOver, restartGame }) => {
  const { cardOrientation, gameCardBackImage, gameCardImages } = gameSetup;

  const [cards, setCards] = useState(defineRandomizedCards(gameCardImages));
  const [errorMessage, setErrorMessage] = useState("");
  const [isConfirmationModal, setIsConfirmationModal] = useState("");

  const updateGameCards = useCallback(() => {
    const selectedCards = cards.filter((card) => card.isSelected);
    if (selectedCards.length <= 1) {
      return;
    }
    const indexCardOne = cards.indexOf(selectedCards[0]);
    const indexCardTwo = cards.indexOf(selectedCards[1]);

    if (selectedCards[0].name === selectedCards[1].name) {
      return setCards((prevCards) => {
        const newCards = [...prevCards];
        newCards[indexCardOne].isSelected = false;
        newCards[indexCardOne].isMatched = true;
        newCards[indexCardTwo].isSelected = false;
        newCards[indexCardTwo].isMatched = true;
        return newCards;
      });
    }

    setTimeout(() => {
      setCards((prevCards) => {
        const newCards = [...prevCards];
        newCards[indexCardOne].isSelected = false;
        newCards[indexCardOne].isMatched = false;
        newCards[indexCardTwo].isSelected = false;
        newCards[indexCardTwo].isMatched = false;
        return newCards;
      });
    }, 1000);
  }, [cards]);

  const checkGameOver = useCallback(() => {
    if (cards.every((cards) => cards.isMatched)) {
      handleGameOver();
    }
  }, [cards, handleGameOver]);

  useEffect(() => {
    updateGameCards();
    setTimeout(() => checkGameOver(), 500);
  }, [cards, checkGameOver, updateGameCards]);

  const handleCardSelection = (index) => {
    if (cards[index].isMatched) return;

    const selectedCards = cards.filter((card) => card.isSelected);
    if (selectedCards.length >= 2) {
      return setErrorMessage("You can only select 2 cards at a time!");
    }

    return setCards((prevCards) => {
      let newCards = [...prevCards];
      newCards.splice(index, 1, {
        name: prevCards[index].name,
        path: prevCards[index].path,
        isSelected: true,
        isMatched: false,
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
      <h2 className="game-board__title">
        Select 2 cards at a time until all of them are matched
      </h2>
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
            alt={`card ${card.name}`}
            isSelected={card.isSelected}
            isMatched={card.isMatched}
            gameCardBackImage={gameCardBackImage.src}
            cardOrientation={cardOrientation}
            onClick={() => handleCardSelection(index)} //onClick={handleCardSelection.bind(null, index)}
          />
        ))}
      </ul>
      <Button
        className="game-board__footer"
        onClick={handleQuitGame}
        label="Quit game"
      />
    </div>
  );
};

export default GameBoard;
