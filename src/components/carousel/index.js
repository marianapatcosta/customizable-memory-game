import React, { useState, useEffect, useRef } from "react";
import { Image, ToggleSwitch } from "../";
import { Chevron } from "../../assets/icons";
import { ORIENTATIONS, PREVIEWS_POSITION } from "../../constants";
import { isEventValid } from "../../utils";
import "./Carousel.css";

const Carousel = ({
  title,
  items,
  hasPreviews = true,
  imageOrientation = "landscape",
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
          tabIndex="0"
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
      <div className="carousel__content">
        {hasPreviews && renderPreviews(PREVIEWS_POSITION.BEFORE)}
        <div
          className={`carousel__selected ${
            imageOrientation === ORIENTATIONS.LANDSCAPE
              ? "carousel__selected--landscape"
              : ""
          }`}
        >
          <div className={`carousel__header`}>
            <h2 className="carousel__header-title">{title}</h2>

            <ToggleSwitch
              className="carousel__header-toggle"
              leftLabel="off"
              rightLabel="on"
              checked={isAutomaticView}
              onChange={toggleAutomaticView}
            />
          </div>
          <span
            role="button"
            title="previous"
            tabIndex="0"
            className="carousel__chevron carousel__chevron-left"
            onClick={handlePreviousItemClick}
            onKeyDown={(event) =>
              isEventValid(event) && handlePreviousItemClick()
            }
          >
            <img src={Chevron} alt="previous item" />
          </span>
          <Image
            className="carousel__selected-image"
            src={items[presentingItemIndex].src}
            alt={items[presentingItemIndex].name}
          />
          <span
            role="button"
            title="next"
            tabIndex="0"
            className="carousel__chevron carousel__chevron-right"
            onClick={handleNextItemClick}
            onKeyDown={(event) => isEventValid(event) && handleNextItemClick()}
            ref={chevronRef}
          >
            <img src={Chevron} alt="next item" />
          </span>
          <span className="carousel__bar">
            {items.map((item, index) => (
              <span
                role="button"
                tabIndex="0"
                key={`carousel-item-${index * Math.random()}`}
                className={`carousel__bar-item ${
                  index <= presentingItemIndex
                    ? "carousel__bar-item--shown"
                    : ""
                }`}
                onClick={() => handleItemClick(index)}
                onKeyDown={(event) =>
                  isEventValid(event) && handleItemClick(index)
                }
              />
            ))}
          </span>
        </div>
        {hasPreviews && renderPreviews(PREVIEWS_POSITION.AFTER)}
      </div>
    </div>
  );
};

export default Carousel;
