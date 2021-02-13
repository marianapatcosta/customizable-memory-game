import React, { useState } from "react";
import { Card } from "..";
import "./Image.css";

const Image = ({ className, src, alt, onClick, ...otherProps }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <Card className={`image__wrapper ${className}`} {...otherProps}>
      {!isLoaded && <div className={`image image--placeholder`}></div>}
      <img
        onClick={onClick}
        className={`image  ${!isLoaded ? "image--not-loaded" : ""}`}
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
      />
    </Card>
  );
};

export default Image;
