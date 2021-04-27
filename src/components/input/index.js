import React from "react";
import "./Input.css";

const Input = ({
  id,
  isInvalid,
  label,
  errorText,
  className,
  ...inputProps
}) => {
  return (
    <div className={`input__wrapper `}>
      {label && (
        <label htmlFor={id} className="input__label">
          {label}
        </label>
      )}
      <input
        id={id}
        name={id}
        {...inputProps}
        className={`input ${isInvalid ? "input--error" : ""} ${className}`}
      />
      {isInvalid && <p className="input__error">{errorText}</p>}
    </div>
  );
};

Input.defaultProps = {
  type: "text",
  maxLength: 150,
  id: "",
  label: "",
  value: "",
  isInvalid: true,
  placeholder: "",
  errorText: "",
  onChange: () => null,
  onBlur: () => null,
};

export default Input;
