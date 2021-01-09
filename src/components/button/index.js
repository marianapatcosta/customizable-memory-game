import React, { forwardRef } from "react";
import "./Button.css";

const Button = forwardRef(({ disabled, onClick, type, label }, ref) => {
  return (
    <button
      className="button"
      type={type}
      onClick={onClick}
      disabled={disabled}
      ref={ref}
    >
      {label}
    </button>
  );
});

export default Button;