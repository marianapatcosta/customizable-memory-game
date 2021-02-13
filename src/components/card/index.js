import React, { forwardRef } from "react";
import "./Card.css";

const Card = forwardRef(({ children, className, id, ...otherProps }, ref) => {
  return (
    <div id={id} className={`card ${className}`} ref={ref} {...otherProps}>
      {children}
    </div>
  );
});

export default Card;
