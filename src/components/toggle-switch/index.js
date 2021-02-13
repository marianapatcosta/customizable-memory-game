import React from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = ({
  className,
  name,
  label,
  leftLabel,
  rightLabel,
  checked,
  disabled,
  onChange,
}) => {
  return (
    <label
      className={`toggle-switch toggle-switch__label ${className} ${
        disabled ? "toggle-switch--disabled" : ""
      } ${label ? "toggle-switch--with-label" : ""}`}
    >
      <input
        className="toggle-switch__input "
        type="checkbox"
        name={name || label}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      {!!label && label}
      <span
        className={`toggle-switch__slider ${
          disabled ? "toggle-switch__slider--disabled" : ""
        } ${checked ? "toggle-switch__slider--checked" : ""}`}
      >
        <span
          className={`toggle-switch__label ${
            disabled ? "toggle-switch__label--disabled" : ""
          }`}
        >
          {checked && leftLabel}
        </span>

        <span
          className={`toggle-switch__label ${
            disabled ? "toggle-switch__label--disabled" : ""
          }`}
        >
          {!checked && rightLabel}
        </span>
      </span>
    </label>
  );
};

export default ToggleSwitch;
