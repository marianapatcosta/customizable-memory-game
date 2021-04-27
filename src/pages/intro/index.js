import React, { useEffect, useState } from "react";
import "./Intro.css";

const Intro = ({ goToSetup }) => {
  useEffect(() => {
    const timer = setTimeout(goToSetup, 3000);

    return () => clearTimeout(timer);
  }, [goToSetup]);

  return (
    <div className="intro">
      intro
      <button className="button-link" onClick={goToSetup}>
        Skip intro
      </button>
    </div>
  );
};

export default Intro;
