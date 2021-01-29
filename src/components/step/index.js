import React from "react";
import "./Step.css";

const Step = ({ renderContent, stepClassName }) => {
  return <div className={`step ${stepClassName}`}>{renderContent()}</div>;
};

export default Step;
