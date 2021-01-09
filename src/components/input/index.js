import React from "react";
import "./Input.css";

const Input = ({
  id,
  label,
  type,
  maxLength,
  value,
  placeholder,
  errorText,
  onChange,
  onBlur
}) => {
  return (
    <div  className="input__wrapper">
      <label htmlFor={id} className="input__label">
        {label}
      </label>
      <input
        id={id}
        className={`input ${!!errorText ? 'input--error' : ''}`}
        errorText={errorText}
        type={type || "text"}
        maxLength={maxLength || 150}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        />
      {!!errorText && <p className="input__error">{errorText}</p>}
    </div>
  );
};

export default Input;
