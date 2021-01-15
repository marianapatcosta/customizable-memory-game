import React, { forwardRef } from "react";
import "./Button.css";

const Button = forwardRef(({ className, disabled, onClick, type, size, label }, ref) => {
  return (
    <button
      className={`button ${className} ${size === "large" ? "button--large" : ""}`}
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
      ref={ref}
    >
      {label}
    </button>
  );
});

export default Button;
