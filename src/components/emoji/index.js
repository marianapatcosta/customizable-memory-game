import React from 'react';
import './Emoji.css';

const Emoji = ({ label, emoji, className }) => (
  <span
    className={`emoji ${className}`}
    role='img'
    aria-label={label ? label : ''}
    aria-hidden={label ? 'false' : 'true'}
  >
    {emoji}
  </span>
);

export default Emoji;
