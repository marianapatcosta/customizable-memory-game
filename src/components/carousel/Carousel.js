import React, { useState, useEffect, useRef } from "react";

import ToggleSwitch from "../toggle-switch/ToggleSwitch";
import "./Carousel.css";

const Carousel = ({ header, items, hasPreviews, landscape }) => {
  const [active, setActive] = useState(0);
  const [isAutomaticView, setAutomaticView] = useState(true);
  const chevronRef = useRef();

  useEffect(() => {
    let interval;
    if (isAutomaticView) {
      interval = setInterval(() => chevronRef.current.click(), 1500);
    }
    return () => clearInterval(interval);
  }, [isAutomaticView]);

  const toggleAutomaticView = () => {
    setAutomaticView((prevState) => !prevState);
  };

  const nextItem = () => {
    if (active === items.length - 1) {
      return setActive(0);
    }
    setActive((prevActive) => prevActive + 1);
  };

  const previousItem = () => {
    if (active === 0) {
      return setActive(items.length - 1);
    }
    setActive((prevActive) => prevActive - 1);
  };

  const handleItemClick = (index) => {  
    setActive(index);
  };
  
  const handlePreviewClick = (clickedItem) => {
    const index = items.findIndex((item) => item === clickedItem);
    setActive(index);
  };

  return (
    <div className="carousel">
      <div className="carousel__header">
        <h2 className="carousel__header--title">{header}</h2>
        <span className="carousel__header--toggle-switch">
          <ToggleSwitch
            leftLabel="off"
            rightLabel="on"
            checked={isAutomaticView}
            handleToggle={toggleAutomaticView}
          />
        </span>
      </div>
      <div className="carousel__content">
        {hasPreviews && (
          <div className="carousel__previews">
            <img
              src={items[active - 2] || items[items.length - 2]}
              onClick={() => handlePreviewClick(items[active - 2] || items[items.length - 2])}
              alt="small view"
            />
            <img
              src={items[active - 1] || items[items.length - 1]}
              onClick={() => handlePreviewClick(items[active - 1] || items[items.length - 1])}
              alt="small view"
            />
          </div>
        )}
        <div
          className={`carousel__selected ${
            landscape ? "carousel__selected--landscape" : ""
          }`}
        >
          <span
            className="carousel__chevron carousel__chevron-left"
            onClick={previousItem}
          >
            <img src="./chevron.svg" alt="left chevron" />
          </span>
          <img src={items[active]} alt="selected view" />
          <span
            className="carousel__chevron carousel__chevron-right"
            onClick={nextItem}
            ref={chevronRef}
          >
            <img src="./chevron.svg" alt="right chevron" />
          </span>
          <span className="carousel__bar">
            {items.map((item, index) => (
              <span
                key={index * Math.random()}
                className={`carousel__bar--item ${
                  index <= active ? "carousel__bar--item--shown" : ""
                }`}
                onClick={() => handleItemClick(index)}
              ></span>
            ))}
          </span>
        </div>
        {hasPreviews && (
          <div className="carousel__previews">
            <img
              src={items[active + 1] || items[0]}
              onClick={() => handlePreviewClick(items[active + 1] || items[0])}
              alt="small view"
            />
            <img
              src={items[active + 2] || items[1]}
              onClick={() => handlePreviewClick(items[active + 2] || items[1])}
              alt="small view"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;
