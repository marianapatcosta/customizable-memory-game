import React, { useState } from "react";
import { RadioButton } from "..";
import { orientation } from "../../constants";
import "./RadioButtonGroup.css";

const RadioButtonGroup = ({ disabled, display, radioButtonMetadata }) => {
  const [activeRadioButtonIndex, setActiveRadioButtonIndex] = useState(0);

  const onClickRadioButton = (radioButtonIndex) =>
    setActiveRadioButtonIndex(radioButtonIndex);

  return (
    <div className={`radio-button-group ${display === orientation[1] ? 'radio-button-group--landscape' : ''}`}>
      {radioButtonMetadata.map((data, index) => (
        <RadioButton
          key={index * Math.random()}
          isActive={activeRadioButtonIndex === index}
          disabled={disabled}
          label={data}
          display={display}
          onClick={() => onClickRadioButton(index)}
        />
      ))}
    </div>
  );
};

export default RadioButtonGroup;
