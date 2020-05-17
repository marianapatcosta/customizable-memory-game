import React from "react";

import "./ToggleSwitch.css";

const ToggleSwitch = ({
  label,
  leftLabel,
  rightLabel,
  checked,
  disabled,
  handleToggle,
}) => {
  return (
    <label
      className={`toggle-switch ${label ? "toggle-switch--with-label" : ""}`}
    >
      {label && (
        <span
          className={`toggle-switch__label ${
            disabled ? "toggle-switch__label--disabled" : ""
          }`}
        >
          {label}{" "}
        </span>
      )}
      <input
        className="toggle-switch__input"
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleToggle}
      />
      <span
        className={`toggle-switch__slider ${
          disabled ? "toggle-switch__slider--disabled" : ""
        }`}
      >
        <span
          className={`toggle-switch__label toggle-switch__label-left {disabled ? 'toggle-switch__label--disabled' : ''}`}
        >
          {leftLabel}
        </span>

        <span
          className={`toggle-switch__label toggle-switch__label-right {disabled ? 'toggle-switch__label--disabled' : ''}`}
        >
          {rightLabel}
        </span>
      </span>
    </label>
  );
};

export default ToggleSwitch;
