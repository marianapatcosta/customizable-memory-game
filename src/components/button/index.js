import React, { forwardRef } from "react";
import "./Button.css";

const Button = forwardRef(
  ({ className, icon, disabled, onClick, type, size, label }, ref) => {
    return (
      <button
        className={`button ${className} ${
          size === "large" ? "button--large" : ""
        }`}
        type={type || "button"}
        onClick={onClick}
        disabled={disabled}
        ref={ref}
      >
        {icon && <img src={icon} alt="button icon" />}
        {label}
      </button>
    );
  }
);

export default Button;
