import React from "react";
import "./RadioButton.css";

const RadioButton = ({ className, label, id, isSelected, disabled, name, onClick }) => {
  return (
    <div
      className={`radio-button__wrapper ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      <div
        className={`radio-button ${disabled ? "radio-button--disabled" : ""}`}
      >
        <input type="radio" id={id} checked={isSelected} onChange={onClick} name={name} />
        <div
          className={`radio-button__check ${
            isSelected ? "radio-button__check--active" : ""
          }`}
        ></div>
      </div>
      <label className="radio-button__label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
