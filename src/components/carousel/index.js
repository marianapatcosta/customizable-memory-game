import React, { useState, useEffect, useRef } from "react";
import { Image, ToggleSwitch } from "../";
import { Chevron } from "../../assets/icons";
import { ORIENTATIONS, PREVIEWS_POSITION } from "../../constants";
import { isEventValid } from "../../utils";
import "./Carousel.css";

const Carousel = ({
  title,
  items,
  hasPreviews = false,
  imageOrientation = ORIENTATIONS.LANDSCAPE,
}) => {
  const [presentingItemIndex, setPresentingItemIndex] = useState(0);
  const [isAutomaticView, setAutomaticView] = useState(true);
  const chevronRef = useRef();

  useEffect(() => {
    let interval;
    if (isAutomaticView) {
      interval = setInterval(() => chevronRef.current.click(), 1500);
    }
    return () => clearInterval(interval);
  }, [isAutomaticView]);

  const toggleAutomaticView = (event) => setAutomaticView(event.target.checked);

  const handleNextItemClick = () => {
    const newIndex =
      presentingItemIndex < items.length - 1 ? presentingItemIndex + 1 : 0;
    setPresentingItemIndex(newIndex);
  };

  const handlePreviousItemClick = () => {
    const newIndex =
      presentingItemIndex > 0 ? presentingItemIndex - 1 : items.length - 1;
    setPresentingItemIndex(newIndex);
  };

  const handleItemClick = (index) => setPresentingItemIndex(index);
  const renderPreviews = (previewPosition) => {
    const nextIndex =
      presentingItemIndex < items.length - 1 ? presentingItemIndex + 1 : 0;
    const afterNextIndex = nextIndex < items.length - 1 ? nextIndex + 1 : 0;
    const previousIndex =
      presentingItemIndex > 0 ? presentingItemIndex - 1 : items.length - 1;
    const beforePreviousIndex =
      previousIndex > 0 ? previousIndex - 1 : items.length - 1;
    const isBefore = previewPosition === PREVIEWS_POSITION.BEFORE;

    return (
      <div
        className={`carousel__previews ${
          imageOrientation === ORIENTATIONS.LANDSCAPE
            ? "carousel__previews--landscape"
            : ""
        }`}
      >
        <Image
          className="carousel__previews-image"
          role="button"
          tabIndex={0}
          src={isBefore ? items[beforePreviousIndex].src : items[nextIndex].src}
          alt={`preview ${
            isBefore ? items[beforePreviousIndex].name : items[nextIndex].name
          }`}
          onClick={() =>
            handleItemClick(isBefore ? beforePreviousIndex : nextIndex)
          }
          onKeyDown={(event) =>
            isEventValid(event) &&
            handleItemClick(isBefore ? beforePreviousIndex : nextIndex)
          }
        />
        <Image
          className="carousel__previews-image"
          role="button"
          tabIndex={0}
          src={isBefore ? items[previousIndex].src : items[afterNextIndex].src}
          alt={`preview ${
            isBefore ? items[previousIndex].src : items[afterNextIndex].name
          }`}
          onClick={() =>
            handleItemClick(isBefore ? previousIndex : afterNextIndex)
          }
          onKeyDown={(event) =>
            isEventValid(event) &&
            handleItemClick(isBefore ? beforePreviousIndex : nextIndex)
          }
        />
      </div>
    );
  };

  return (
    <div className="carousel" role="listbox">
      <div
        className={`carousel__header ${
          imageOrientation === ORIENTATIONS.LANDSCAPE
            ? "carousel__header--landscape"
            : ""
        }`}
      >
        <h2 className="carousel__header-title">{title}</h2>
        <ToggleSwitch
          className="carousel__header-toggle"
          leftLabel="off"
          rightLabel="on"
          checked={isAutomaticView}
          onChange={toggleAutomaticView}
        />
      </div>
      <div className="carousel__content">
        <div
          className={`carousel__selected ${
            imageOrientation === ORIENTATIONS.LANDSCAPE
              ? "carousel__selected--landscape"
              : ""
          }`}
        >
          {hasPreviews && renderPreviews(PREVIEWS_POSITION.BEFORE)}
          <div
            className={`carousel__image-wrapper ${
              imageOrientation === ORIENTATIONS.LANDSCAPE
                ? "carousel__image-wrapper--landscape"
                : ""
            }`}
          >
            <button
              aria-label="click to watch next image"
              className="carousel__chevron carousel__chevron-left"
              onClick={handlePreviousItemClick}
            >
              <img src={Chevron} alt="left chevron" />
            </button>
            {items.map((item, index) => (
              <Image
                key={`slide-image-${item.name}`}
                className={`carousel__image ${
                  presentingItemIndex === index
                    ? "carousel__image--selected"
                    : ""
                }`}
                src={item.src}
                alt={item.name}
              />
            ))}
            <button
              ref={chevronRef}
              aria-label="click to watch next image"
              className="carousel__chevron carousel__chevron-right"
              onClick={handleNextItemClick}
            >
              <img src={Chevron} alt="right chevron" />
            </button>
            <div className="carousel__bar">
              {items.map((item, index) => (
                <button
                  key={`carousel-item-${index * Math.random()}`}
                  className={`carousel__bar-item ${
                    index <= presentingItemIndex
                      ? "carousel__bar-item--shown"
                      : ""
                  }`}
                  onClick={() => handleItemClick(index)}
                />
              ))}
            </div>
          </div>
          {hasPreviews && renderPreviews(PREVIEWS_POSITION.AFTER)}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
