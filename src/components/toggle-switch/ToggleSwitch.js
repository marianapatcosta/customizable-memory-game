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
    <div
      className={`toggle-switch ${disabled ? "toggle-switch--disabled" : ""} ${
        label ? "toggle-switch--with-label" : ""
      }`}
      onClick={handleToggle}
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
    </div>
  );
};

export default ToggleSwitch;
