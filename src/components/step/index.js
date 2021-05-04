import React from 'react';
import './Step.css';

const Step = ({ renderContent, stepClassName }) => (
  <div className={`step ${stepClassName}`}>{renderContent()}</div>
);

export default Step;
