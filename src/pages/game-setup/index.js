import React, { useEffect, useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import {
  Button,
  Card,
  Image,
  Input,
  RadioButton,
  Stepper,
  Toast,
  Upload,
} from '../../components';
import {
  BalloonsExample,
  GameCardsExample,
  SlideExample,
  CardBackDefault,
  CardBackPortraitDefault,
} from '../../assets/images';
import * as Icons from '../../assets/icons';
import { AudioDefault } from '../../assets/audio';
import {
  AUDIO_FILE_TYPES,
  IMAGE_FILE_TYPES,
  MAX_GAME_CARDS,
  MAX_AGE,
  MIN_AGE,
  ORIENTATIONS,
  OPERATIVE_SYSTEMS,
  TOAST_TYPES,
} from '../../constants';
import './GameSetup.css';

const GameSetup = ({ gameSetup, goToGame, onDownload }) => {
  const [cardOrientation, setCardOrientation] = useState(ORIENTATIONS.PORTRAIT);
  const [carouselOrientation, setCarouselOrientation] = useState(
    ORIENTATIONS.PORTRAIT
  );
  const [age, setAge] = useState({
    value: '',
    isValid: false,
    isTouched: false,
  });
  const [gameCardBackImage, setGameCardBackImage] = useState([]);
  const [gameCardImages, setGameCardImages] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);
  const [balloonImage, setBalloonImage] = useState([]);
  const [birthdayAudio, setBirthdayAudio] = useState([]);
  const [toastData, setToastData] = useState({});
  const [audioDefault, setAudioDefault] = useState();
  const imageFileTypes = Object.values(IMAGE_FILE_TYPES).join(', ');
  const audioFileTypes = Object.values(AUDIO_FILE_TYPES).join(', ');

  useEffect(() => {
    if (!!Object.keys(gameSetup)?.length) {
      setCardOrientation(gameSetup.cardOrientation || ORIENTATIONS.PORTRAIT);
      setGameCardBackImage(
        !!gameSetup.gameCardBackImage ? [gameSetup.gameCardBackImage] : []
      );
      setGameCardImages(gameSetup.gameCardImages || []);
      setCarouselOrientation(
        gameSetup.carouselOrientation || ORIENTATIONS.PORTRAIT
      );
      setCarouselImages(
        !!gameSetup.carouselImages.length ? gameSetup.carouselImages : []
      );
      setAge((prevAge) => ({ ...prevAge, value: gameSetup.age || '' }));
      setBalloonImage(!!gameSetup.balloonImage ? [gameSetup.balloonImage] : []);
      setBirthdayAudio(
        !!gameSetup.birthdayAudio ? [gameSetup.birthdayAudio] : []
      );
    }
  }, [gameSetup]);

  useEffect(() => {
    const getDefaultAudio = async () => {
      try {
        const audioData = await fetch(AudioDefault);
        const audioBlob = await audioData.blob();
        const reader = new FileReader();

        await reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          setAudioDefault({
            name: 'birthday audio default',
            src: reader.result,
          });
        };
      } catch (error) {
        console.error(error);
      }
    };
    getDefaultAudio();
  }, []);

  const areAllFilesValid = (files, validator) => {
    return Array.from(files).every((file) => {
      const fileType = `.${file.name.split('.').pop()}`.toLowerCase();
      return validator.includes(fileType);
    });
  };

  const handleFileUpload = (e, maxNumberOfFiles, validator, setter) => {
    if (!areAllFilesValid(e.target.files, validator)) {
      setToastData({
        message: `you uploaded invalid files. Please upload only ${validator} files`,
        type: TOAST_TYPES.ALERT,
      });
      return;
    }

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

  const handleFileDelete = (clickedItemIndex, setter) => {
    setter((prevState) =>
      prevState.filter((item, index) => index !== clickedItemIndex)
    );
  };

  const getCardBack = () => {
    if (!!gameCardBackImage[0]) return gameCardBackImage[0];

    return {
      name: 'card back default',
      src:
        cardOrientation === ORIENTATIONS.LANDSCAPE
          ? CardBackDefault
          : CardBackPortraitDefault,
    };
  };

  const getGameSetup = () => ({
    cardOrientation,
    gameCardBackImage: getCardBack(),
    gameCardImages,
    carouselOrientation,
    carouselImages,
    age: age.value,
    balloonImage: balloonImage[0],
    birthdayAudio: birthdayAudio[0] || audioDefault,
  });

  const handlePlayGame = (e) => {
    e.preventDefault();
    const gameSetup = getGameSetup();
    isGameSetupValid() && goToGame(gameSetup);
  };

  const handleDownload = async (os) => {
    const gameSetup = getGameSetup();
    const configJsonData = JSON.stringify(gameSetup);
    const configJsonBlob = new Blob([configJsonData], { type: 'text/plain' });

    /*  const link = document.createElement("a");
    link.href = `/your-game-${os.toLowerCase()}.app`;
    console.log(555, `/your-game-${os.toLowerCase()}.app`);
    link.download = "file.app";
    document.body.appendChild(link);
    link.click(); */
    try {
      const appData = await fetch(`/your-game-${os.toLowerCase()}.app`);
      console.log(111, appData);
      const appBlob = await appData.blob();
      console.log(222, appBlob);

      const zip = new JSZip();
      zip.file('setup.json', configJsonBlob);
      zip.file(`app-${os.toLowerCase()}`, appBlob);
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `bday-app-${os.toLowerCase()}.zip`);
      onDownload();
    } catch (error) {
      console.error(error);
    }
  };

  const renderStep1 = () => (
    <>
      <h3 className='game-setup__step-title'>Game card customization</h3>
      <Image className='game-setup__step-image' src={GameCardsExample} />
      <div className='game-setup__form-item'>
        <h4 className='game-setup__form-item-title'>card orientation</h4>
        <div className='game-setup__form-item-radio' role='radiogroup'>
          {Object.values(ORIENTATIONS).map((orientation, index) => (
            <RadioButton
              key={`radio-${index + Math.random()}`}
              id={`orientation-${orientation}`}
              className={'game-setup__radio'}
              name={'card-orientation'}
              isSelected={cardOrientation === orientation}
              label={orientation}
              onChange={() => setCardOrientation(orientation)}
            />
          ))}
        </div>
      </div>
      <div className='game-setup__form-item'>
        <Upload
          title='card back'
          className='game-setup__form-upload'
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
      <div className='game-setup__form-item'>
        <Upload
          title='card faces (2-8)'
          className='game-setup__form-upload'
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
    </>
  );

  const renderStep2 = () => (
    <>
      <h3 className='game-setup__step-title'>Photo slider customization</h3>
      <Image className='game-setup__step-image' src={SlideExample} />
      <div className='game-setup__form-item'>
        <h4 className='game-setup__form-item-title'>photo orientation</h4>
        <div className='game-setup__form-item-radio'>
          {Object.values(ORIENTATIONS).map((orientation, index) => (
            <RadioButton
              key={`radio-${index + Math.random()}`}
              id={`orientation-${orientation}`}
              className={'game-setup__radio'}
              name={'slider-orientation'}
              isSelected={carouselOrientation === orientation}
              label={orientation}
              onChange={() => setCarouselOrientation(orientation)}
            />
          ))}
        </div>
      </div>
      <div className='game-setup__form-item'>
        <Upload
          title={'slider photos (1-10)'}
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
    </>
  );

  const renderStep3 = () => (
    <>
      <h3 className='game-setup__step-title'>Balloons customization</h3>
      <Image className='game-setup__step-image' src={BalloonsExample} />
      <div className='game-setup__form-item'>
        <h4 className='game-setup__form-item-title game-setup__form-item-title--input'>
          age
        </h4>
        <Input
          className='game-setup__form-item--input'
          id={'nr-of-cards'}
          min={MIN_AGE}
          max={MAX_AGE}
          errorText={`Please enter a valid age (${MIN_AGE}-${MAX_AGE})`}
          type='number'
          value={age.value}
          isInvalid={!age.isValid && age.isTouched}
          onChange={(e) =>
            handleInputChange(e.target.value, isValidAge, setAge)
          }
          onBlur={() => handleInputTouch(setAge)}
        />
      </div>
      <div className='game-setup__form-item'>
        <Upload
          title={'ballon photo'}
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
      <div className='game-setup__form-item'>
        <Upload
          title={'birthday song'}
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
    </>
  );

  const renderStep4 = () => (
    <>
      <h3 className='game-setup__step-title'>Get your game!</h3>
      <div className='game-setup__play'>
        <h4>Play online</h4>
        <Button
          className='game-setup__button'
          label='Play now'
          onClick={handlePlayGame}
        />
      </div>
      <div className='game-setup__play'>
        <h4>Download and send to a friend</h4>
        <div className='game-setup__download'>
          {Object.values(OPERATIVE_SYSTEMS).map((os, index) => (
            <Button
              key={`dowbload-button-${os}`}
              className='game-setup__icon-button'
              icon={Icons[os]}
              aria-label={`download for ${os}`}
              onClick={() => handleDownload(os)}
            />
          ))}
        </div>
      </div>
    </>
  );

  const stepsMetadata = [
    {
      id: 's1',
      renderContent: renderStep1,
      isValid: !!cardOrientation && gameCardImages?.length > 1,
    },
    {
      id: 's2',
      renderContent: renderStep2,
      isValid: true,
    },
    {
      id: 's3',
      renderContent: renderStep3,
      isValid: true,
    },
    { id: 's4', renderContent: renderStep4, isValid: true,},

  ];

  return (
    <div className='game-setup'>
      <h2 className='game-setup__title'>Setup you game!</h2>
      <Card className='game-setup__form'>
        <Stepper
          stepsMetadata={stepsMetadata}
          activeStep={
            !!Object.keys(gameSetup)?.length && stepsMetadata.length - 1
          }
        />
        {toastData.message && <Toast {...toastData} onClean={setToastData} />}
      </Card>
    </div>
  );
};

export default GameSetup;
