import React, { useState } from "react";
import {
  Card,
  Image,
  Input,
  RadioButton,
  Stepper,
  Toast,
  Upload,
} from "../../components";
import {
  BalloonsExample,
  GameCardsExample,
  SlideExample,
} from "../../assets/images";
import {
  AUDIO_FILE_TYPES,
  IMAGE_FILE_TYPES,
  MAX_GAME_CARDS,
  MAX_AGE,
  MIN_AGE,
  ORIENTATIONS,
  TOAST_TYPES,
} from "../../constants";
import "./GameSetup.css";

const GameSetup = ({ handleSubmit }) => {
  const [cardOrientation, setCardOrientation] = useState(ORIENTATIONS.PORTRAIT);
  const [carouselOrientation, setCarouselOrientation] = useState(
    ORIENTATIONS.LANDSCAPE
  );
  const [age, setAge] = useState({
    value: "",
    isValid: false,
    isTouched: false,
  });
  const [gameCardBackImage, setGameCardBackImage] = useState([]);
  const [gameCardImages, setGameCardImages] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);
  const [balloonImage, setBalloonImage] = useState([]);
  const [birthdayAudio, setBirthdayAudio] = useState([]);
  const [toastData, setToastData] = useState({});
  const imageFileTypes = Object.values(IMAGE_FILE_TYPES).join(", ");
  const audioFileTypes = Object.values(AUDIO_FILE_TYPES).join(", ");

  const areAllFilesValid = (files, validator) => {
    return Array.from(files).every((file) => {
      const fileType = `.${file.name.split(".").pop()}`.toLowerCase();
      return validator.includes(fileType);
    });
  };

  const handleFileUpload = (e, maxNumberOfFiles, validator, setter) => {
    if (!areAllFilesValid(e.target.files, validator)) {
      setToastData({
        message: `you uploaded invalid files. Please upload only ${validator} files.`,
        type: TOAST_TYPES.ALERT,
      });
      return;
    }

    console.log(e.target.files);
    if (e.target.files.length > maxNumberOfFiles) {
      setToastData({
        message: `you uploaded ${e.target.files.length} files. Only the first ${maxNumberOfFiles} files will be considered.`,
        type: TOAST_TYPES.WARNING,
      });
    }

    const uploadedFiles = Array.from(e.target.files).slice(0, maxNumberOfFiles);

    // reads file and the result attribute has a data: URL representing the file's data
    // after reading the file, the onloadend function defined above is called
    uploadedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () =>
        setter((prevState) =>
          !!prevState && prevState.length < maxNumberOfFiles
            ? [...prevState, { name: file.name, src: reader.result }]
            : [{ name: file.name, src: reader.result }]
        );

      reader.readAsDataURL(file);
    });
  };

  const isValidAge = (age) => MIN_AGE <= age && age <= MAX_AGE;

  const handleInputChange = (value, validator, setter) =>
    setter((prevState) => ({
      ...prevState,
      value,
      isValid: validator(value),
    }));

  const handleInputTouch = (setter) =>
    setter((prevState) => ({ ...prevState, isTouched: true }));

  const isGameSetupValid = () =>
    !!cardOrientation && !!gameCardBackImage && !!gameCardImages.length;

  const handleSetupSubmit = (e) => {
    e.preventDefault();
    const gameSetup = {
      cardOrientation,
      gameCardBackImage: gameCardBackImage[0],
      gameCardImages,
      carouselOrientation,
      carouselImages,
      age: age.value,
      balloonImage: balloonImage[0],
      birthdayAudio: birthdayAudio[0],
    };
    isGameSetupValid() && handleSubmit(gameSetup);
  };

  const handleFileDelete = (clickedItemIndex, setter) => {
    setter((prevState) =>
      prevState.filter((item, index) => index !== clickedItemIndex)
    );
  };

  const renderStep1 = () => (
    <div>
      <h2 className="game-setup__step-title">Game card customization</h2>
      <Image
        className="game-setup__step-image"
        src={GameCardsExample}
      />
      <div className="game-setup__form-item">
        <h3 className="game-setup__form-item-title">card orientation</h3>
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
        <Upload
          title="card back"
          className="game-setup__form-upload"
          label="Upload"
          fileTypes={imageFileTypes}
          areMultipleFilesAllowed={false}
          imagesPreview={gameCardBackImage.map(({ src }) => src)}
          onUpload={(e) =>
            handleFileUpload(e, 1, imageFileTypes, setGameCardBackImage)
          }
          onDeleteFile={(clickedItemIndex) =>
            handleFileDelete(clickedItemIndex, setGameCardBackImage)
          }
        />
      </div>
      <div className="game-setup__form-item">
        <Upload
          title="card fronts (1-8)"
          className="game-setup__form-upload"
          label="Upload"
          fileTypes={imageFileTypes}
          areMultipleFilesAllowed={true}
          imagesPreview={gameCardImages.map(({ src }) => src)}
          onUpload={(e) =>
            handleFileUpload(
              e,
              MAX_GAME_CARDS / 2,
              imageFileTypes,
              setGameCardImages
            )
          }
          onDeleteFile={(clickedItem) =>
            handleFileDelete(clickedItem, setGameCardImages)
          }
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <h2 className="game-setup__step-title">Photo slider customization</h2>
      <Image
        className="game-setup__step-image"
        src={SlideExample}
      />
      <div className="game-setup__form-item">
        <h3 className="game-setup__form-item-title">
          {" "}
          photo orientation
        </h3>
        <div className="game-setup__form-item-radio">
          {Object.values(ORIENTATIONS).map((orientation, index) => (
            <RadioButton
              key={`radio-${index + Math.random()}`}
              id={`{orientation-${orientation}}`}
              className={"game-setup__radio"}
              name={carouselOrientation}
              isSelected={carouselOrientation === orientation}
              label={orientation}
              onClick={() => setCarouselOrientation(orientation)}
            />
          ))}
        </div>
      </div>
      <div className="game-setup__form-item">
        <Upload
          label="Upload"
          title={"slider photos (1-10)"}
          fileTypes={imageFileTypes}
          areMultipleFilesAllowed={true}
          imagesPreview={carouselImages.map(({ src }) => src)}
          onUpload={(e) =>
            handleFileUpload(e, 10, imageFileTypes, setCarouselImages)
          }
          onDeleteFile={(clickedItem) =>
            handleFileDelete(clickedItem, setCarouselImages)
          }
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div>
      <h2 className="game-setup__step-title">Balloons customization</h2>
      <Image
        className="game-setup__step-image"
        src={BalloonsExample}
      />
      <div className="game-setup__form-item">
        <h3 className="game-setup__form-item-title game-setup__form-item-title--input">
          age
        </h3>
        <Input
          id={"nr-of-cards"}
          min={MIN_AGE}
          max={MAX_AGE}
          errorText={`Please enter a valid age (${MIN_AGE}-${MAX_AGE}).`}
          type="number"
          value={age.value}
          isInvalid={!age.isValid && age.isTouched}
          onChange={(e) =>
            handleInputChange(e.target.value, isValidAge, setAge)
          }
          onBlur={() => handleInputTouch(setAge)}
        />
      </div>
      <div className="game-setup__form-item">
        <Upload
          label="Upload"
          title={"ballon photo"}
          fileTypes={imageFileTypes}
          areMultipleFilesAllowed={false}
          imagesPreview={balloonImage.map(({ src }) => src)}
          onUpload={(e) =>
            handleFileUpload(e, 1, imageFileTypes, setBalloonImage)
          }
          onDeleteFile={(clickedItem) =>
            handleFileDelete(clickedItem, setBalloonImage)
          }
        />
      </div>
      <div className="game-setup__form-item">
        <Upload
          label="Upload"
          title={"birthday song"}
          fileTypes={audioFileTypes}
          areMultipleFilesAllowed={false}
          filesPreview={birthdayAudio.map(({ name }) => name)}
          onUpload={(e) =>
            handleFileUpload(e, 1, audioFileTypes, setBirthdayAudio)
          }
          onDeleteFile={(clickedItem) =>
            handleFileDelete(clickedItem, setBirthdayAudio)
          }
        />
      </div>
    </div>
  );

  const stepsMetadata = [
    {
      renderContent: renderStep1,
      isValid: true,
      /*  !!cardOrientation &&
        !!gameCardBackImage?.length &&
        !!gameCardImages?.length, */
    },
    {
      renderContent: renderStep2,
      isValid: true,
    },
    {
      renderContent: renderStep3,
      isValid: true,
    },
  ];

  return (
    <div className="game-setup">
      <h2 className="game-setup__title">Setup you game!</h2>
      <Card className="game-setup__form">
        <Stepper stepsMetadata={stepsMetadata} onSubmit={handleSetupSubmit} />
        {toastData.message && (
          <Toast
            className="game-setup__toast"
            style={{ top: `calc(${window.scrollY}px + 200px)` }}
            {...toastData}
            onClean={setToastData}
          />
        )}
      </Card>
    </div>
  );
};

export default GameSetup;
