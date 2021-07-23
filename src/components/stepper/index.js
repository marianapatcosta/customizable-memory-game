import React, { useRef, useState } from 'react';
import { Button, Step } from '..';
import { DoubleChevron } from '../../assets/icons';
import { ORIENTATIONS } from '../../constants';
import './Stepper.css';

const Stepper = ({
  className,
  stepsMetadata,
  activeStep,
  buttonLabel = 'submit',
  orientation = ORIENTATIONS.LANDSCAPE,
  onSubmit,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(activeStep || 0);
  const progressPerStep = 100 / (stepsMetadata.length - 1);
  const hasNextButton =
    activeStepIndex !== stepsMetadata.length - 1 ||
    (activeStepIndex === stepsMetadata.length - 1 && !!onSubmit);

  const nodeRef = useRef(null);

  const handleNextStepClick = () => {
    if (activeStepIndex === stepsMetadata.length - 1) return;
    setActiveStepIndex((prevActiveStepIndex) => prevActiveStepIndex + 1);
  };

  const handlePreviousStepClick = () => {
    if (activeStepIndex === 0) return;
    setActiveStepIndex((prevActiveStepIndex) => prevActiveStepIndex - 1);
  };

  const getProgressBarPercentage = () => activeStepIndex * progressPerStep;

  return (
    <div
      className={`stepper ${className} ${
        orientation === ORIENTATIONS.PORTRAIT ? 'stepper--portrait' : ''
      }`}
      data-steps={stepsMetadata.length}
    >
      <ul
        role='group'
        aria-label='progress'
        className={`stepper__indicator ${
          orientation === ORIENTATIONS.PORTRAIT
            ? 'stepper__indicator--portrait'
            : ''
        }`}
      >
        <progress
          className={`stepper__progress-bar ${
            orientation === ORIENTATIONS.PORTRAIT
              ? 'stepper__progress-bar--portrait'
              : ''
          }`}
          value={getProgressBarPercentage()}
          max='100'
        />

        {stepsMetadata.map((step, index) => (
          <li
            key={`step-indicator-${index + Math.random()}`}
            aria-current={'step'}
            className={`stepper__indicator-item ${
              index <= activeStepIndex ? 'stepper__indicator-item--filled' : ''
            }`}
          >
            {index + 1}
          </li>
        ))}
      </ul>
      <div
        className={`${
          orientation === ORIENTATIONS.PORTRAIT
            ? 'stepper-container--portrait'
            : ''
        }`}
      >
          {stepsMetadata.map(
            ({ renderContent }, index) =>
              index === activeStepIndex && (
                <Step
                  stepClassName={`stepper__step ${index === activeStepIndex ? 'stepper__step--active': ''}`}
                  ref={nodeRef}
                  renderContent={renderContent}
                  isActive={index === activeStepIndex}
                />
              )
          )}
        <div className={`stepper__footer ${className}`}>
          {activeStepIndex > 0 && (
            <Button
              className='stepper__footer-button stepper__footer-button--left'
              aria-label='click to go to previous step'
              icon={DoubleChevron}
              onClick={handlePreviousStepClick}
            />
          )}
          {hasNextButton && (
            <Button
              className='stepper__footer-button stepper__footer-button--right'
              aria-label='click to go to previous step'
              icon={
                activeStepIndex !== stepsMetadata.length - 1
                  ? DoubleChevron
                  : ''
              }
              label={
                activeStepIndex === stepsMetadata.length - 1 ? buttonLabel : ''
              }
              disabled={!stepsMetadata[activeStepIndex].isValid}
              onClick={
                activeStepIndex === stepsMetadata.length - 1
                  ? onSubmit
                  : handleNextStepClick
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
