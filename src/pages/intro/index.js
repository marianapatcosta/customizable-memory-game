import React from 'react';
import { GameCardsExample } from '../../assets/images';
import { Intro as IntroVideo } from '../../assets/video';
import { Card } from '../../components';
import './Intro.css';

const Intro = ({ goToSetup }) => (
  <div className='intro'>
    <Card className='intro__video-container'>
      <div className='intro__video-wrapper'>
        <video
          className='intro__video'
          poster={GameCardsExample}
          src={IntroVideo}
          autoPlay
          muted
          onEnded={goToSetup}
        />
      </div>
    </Card>
    <button className='button-link intro__link' onClick={goToSetup}>
      skip intro
    </button>
  </div>
);

export default Intro;
