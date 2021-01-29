import React, { useState } from "react";
import { Card } from "..";
import "./Image.css";

const Image = ({ className, src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <Card className={`image__wrapper ${className}`}>
      {!isLoaded && <div className={`image image--placeholder`}></div>}
      <img
        className={`image  ${!isLoaded ? "image--not-loaded" : ""}`}
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
      />
    </Card>
  );
};

export default Image;
