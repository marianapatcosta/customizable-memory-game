import React from "react";
import { Emoji } from "../../components";
import "./Goodbye.css";

const Goodbye = ({ setupNewGame }) => {
  return (
    <div className="goodbye">
      <h2 className="goodbye__title">
        Thank you for you visit! <br />
      </h2>
      <h3 className="goodbye__subtitle">Come back soon!</h3>
      <div className="goodbye__hand">
        <Emoji label="waving-hand" emoji="👋" />
      </div>
      <button className="button-link" onClick={setupNewGame}>
        Setup a new game
      </button>
    </div>
  );
};

export default Goodbye;
