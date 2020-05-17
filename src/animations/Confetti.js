import React from "react";

import "./Confetti.css";

const confetti = Array(40).fill("");

const Confetti = () => {
  return (
    <div className="confetti__container">
      {confetti.map((item, index) => (
        <div className="confetti" key={index * Math.random()}>{item}</div>
      ))}
    </div>
  );
};

export default Confetti;
