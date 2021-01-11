import React, { useState } from "react";
import {
  Button,
  Card,
  Input,
  RadioButton,
  Toast,
  Upload,
} from "../../components";
import {
  FILE_TYPES,
  MAX_GAME_CARDS,
  MIN_GAME_CARDS,
  ORIENTATIONS,
  TOAST_TYPES,
} from "../../constants";
import "./GameSetup.css";

const GameSetup = ({handleSubmit}) => {
  const [cardOrientation, setCardOrientation] = useState(ORIENTATIONS.VERTICAL);
  const [numberOfCards, setNumberOfCards] = useState({
    value: 10,
    isValid: false,
    isTouched: false,
  });
  const [gameCardBackImage, setGameCardBackImage] = useState();
  const [gameCardImages, setGameCardImages] = useState([]);
  const [toastData, setToastData] = useState({});
  const imageFileTypes = `${FILE_TYPES.JPG}, ${FILE_TYPES.JPEG}, ${FILE_TYPES.GIF}, ${FILE_TYPES.PNG}, ${FILE_TYPES.SVG}`;

  const areAllFilesValid = (files, validator) => {
    return Array.from(files).every((file) => {
      const fileType = `.${file.name.split(".").pop()}`;
      return validator.includes(fileType);
    });
  };

  const onFileUpload = (e, numberOfFiles, validator, setter) => {
    if (!areAllFilesValid(e.target.files, validator)) {
      setToastData({
        message: `you uploaded invalid files. Please upload only ${validator} files.`,
        type: TOAST_TYPES.ALERT,
      });
      return;
    }

    if (e.target.files.length > numberOfFiles) {
      setToastData({
        message: `you uploaded ${
          e.target.files.length
        } files. Only the first ${numberOfFiles} ${
          numberOfFiles > 1 ? "files were" : "was"
        } considered.`,
        type: TOAST_TYPES.WARNING,
      });
    }

    const uploadedFiles = Array.from(e.target.files).slice(0, numberOfFiles);

    // reads file and the result attribute has a data: URL representing the file's data
    // after reading the file, the onloadend function defined above is called
    uploadedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () =>
        setter((prevResult) =>
          numberOfFiles > 1 ? [...prevResult, reader.result] : reader.result
        );

      reader.readAsDataURL(file);
    });
  };

  const isValidNumberOfCards = (numberOfCards) =>
    MIN_GAME_CARDS <= numberOfCards && numberOfCards <= MAX_GAME_CARDS;

  const handleInputChange = (value, validator, setter) =>
    setter((prevState) => ({
      ...prevState,
      value,
      isValid: validator(value),
    }));

  const handleInputTouch = (setter) =>
    setter((prevState) => ({ ...prevState, isTouched: true }));

/*   const isGameSetupValid = () => {
    return !!cardOrientation && numberOfCards.isValid 
  } */

  const handleSetupSubmit = (e) => {
    e.preventDefault();
    const gameSetup = {
      cardOrientation,
      numberOfCards: numberOfCards.value,
      gameCardBackImage,
      gameCardImages
    };
    handleSubmit(gameSetup);
  };

  return (
    <div className="game-setup">
      <h2 className="game-setup__title">Setup you game!</h2>
      <Card className="game-setup__form">
        {toastData.message && <Toast {...toastData} onClean={setToastData} />}
        <form onSubmit={handleSetupSubmit}>
          <div className="game-setup__form-item">
            <h5 className="game-setup__form-item-title">Card orientation</h5>
            <div className="game-setup__form-item-radio">
              {Object.values(ORIENTATIONS).map((orientation, index) => (
                <RadioButton
                  key={`radio-${index + Math.random()}`}
                  id={`{orientation-${orientation}}`}
                  className={"game-setup__radio"}
                  name={cardOrientation}
                  isSelected={cardOrientation === orientation}
                  label={orientation}
                  onClick={() => setCardOrientation(orientation)}
                />
              ))}
            </div>
          </div>
          <div className="game-setup__form-item">
            <h5 className="game-setup__form-item-title game-setup__form-item-title--input">
              Number of game cards
            </h5>
            <Input
              id={"nr-of-cards"}
              min={MIN_GAME_CARDS}
              max={MAX_GAME_CARDS}
              errorText={"Please enter a valid number of game cards (4-16)."}
              type="number"
              maxLength={16}
              placeholder={"number of cards"}
              value={numberOfCards.value}
              isInvalid={!numberOfCards.isValid && numberOfCards.isTouched}
              onChange={(e) =>
                handleInputChange(
                  e.target.value,
                  isValidNumberOfCards,
                  setNumberOfCards
                )
              }
              onBlur={() => handleInputTouch(setNumberOfCards)}
            />
          </div>
          <div className="game-setup__form-item">
            <h5 className="game-setup__form-item-title">
              Upload game card back
            </h5>
            <Upload
              label="Upload"
              fileTypes={imageFileTypes}
              areMultipleFilesAllowed={false}
              onUpload={(e) =>
                onFileUpload(e, 1, imageFileTypes, setGameCardBackImage)
              }
            />
          </div>
          <div className="game-setup__form-item">
            <h5 className="game-setup__form-item-title">
              Upload game card images
            </h5>
            <Upload
              label="Upload"
              disabled={!numberOfCards.isValid}
              fileTypes={imageFileTypes}
              areMultipleFilesAllowed={true}
              onUpload={(e) =>
                onFileUpload(
                  e,
                  numberOfCards.value / 2,
                  imageFileTypes,
                  setGameCardImages
                )
              }
            />
          </div>
          <div className="game-setup__form-item game-setup__form-button">
            <Button
              label={"Generate your game"}
              size="large"
              onClick={handleSetupSubmit}
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default GameSetup;
