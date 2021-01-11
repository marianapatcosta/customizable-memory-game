import React, { forwardRef } from "react";
import "./Card.css";

const Card = forwardRef(({ children, className, id }, ref) => {
  return (
    <div id={id} className={`card ${className}`} ref={ref}>
      {children}
    </div>
  );
});

export default Card;
