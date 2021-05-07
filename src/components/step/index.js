import React, { forwardRef } from 'react';
import './Step.css';

const Step = forwardRef(({ renderContent, stepClassName }, ref) => (
  <div ref={ref} className={`step ${stepClassName}`}>
    {renderContent()}
  </div>
));

export default Step;
