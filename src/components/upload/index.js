import React, { useRef, Fragment } from "react";
import { Button } from "..";
import "./Upload.css";

const Upload = ({
  label,
  disabled,
  fileTypes,
  areMultipleFilesAllowed,
  onUpload,
  className,
}) => {
  const inputRef = useRef();
  return (
    <Fragment>
      <Button
        label={label}
        className={`upload ${className}`}
        disabled={disabled}
        onClick={() => inputRef.current.click()}
      />
      <input
        ref={inputRef}
        className="upload__input"
        type="file"
        multiple={areMultipleFilesAllowed ? "multiple" : ""}
        accept={fileTypes}
        onChange={(e) => onUpload(e)}
      />
    </Fragment>
  );
};

export default Upload;
