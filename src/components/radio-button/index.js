import React from "react";
import { orientation } from "../../constants";
import "./RadioButton.css";

const RadioButton = ({ label, isActive, disabled, display, onClick }) => {
  return (
    <div
      className={`radio-button__wrapper ${display === orientation[1] ? 'radio-button__wrapper--landscape' : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      <div
        className={`radio-button ${disabled ? "radio-button--disabled" : ""}`}
      >
        {isActive && <div className="radio-button--active"></div>}
      </div>
      <label className="radio-button__label">{label}</label>
    </div>
  );
};

export default RadioButton;
