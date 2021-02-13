import React from "react";
import "./RadioButton.css";

const RadioButton = ({
  className,
  label,
  id,
  isSelected,
  disabled,
  name,
  onChange,
}) => {
  return (
    <label
      aria-checked={isSelected}
      className={`radio-button__wrapper ${className}`}
    >
      <input
        type="radio"
        id={id}
        checked={isSelected}
        onChange={onChange}
        name={name}
        disabled={disabled}
      />
      <span
        className={`radio-button ${disabled ? "radio-button--disabled" : ""}`}
      ></span>

      {label}
    </label>
  );
};

export default RadioButton;
