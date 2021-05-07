import React, { useRef } from 'react';
import { Button } from '..';
import { Upload as UploadIcon } from '../../assets/icons';
import './Upload.css';

const Upload = ({
  className,
  label = 'upload',
  title,
  hasPreview = true,
  disabled,
  fileTypes,
  areMultipleFilesAllowed,
  imagesPreview,
  filesPreview,
  onUpload,
  onDeleteFile,
}) => {
  const inputRef = useRef();
  return (
    <div className='upload__wrapper'>
      <div className='upload'>
        <div className='upload__title'>{title}</div>
        <Button
          icon={UploadIcon}
          label={label}
          className={`upload__button ${className}`}
          disabled={disabled}
          onClick={() => inputRef.current.click()}
        />
        <input
          ref={inputRef}
          className='upload__input'
          type='file'
          multiple={areMultipleFilesAllowed ? 'multiple' : ''}
          accept={fileTypes}
          onChange={onUpload}
        />
      </div>
      {hasPreview && (!!imagesPreview || !!filesPreview) && (
        <div
          className={`upload__preview ${
            !!filesPreview && !!filesPreview.length
              ? 'upload__preview--files'
              : ''
          }`}
        >
          {!!imagesPreview &&
            !!imagesPreview.length &&
            imagesPreview.map((image, index) => (
              <div
                className='upload__preview-container'
                key={`image-preview-${index}`}
              >
                <img
                  className='upload__image-preview'
                  src={image}
                  alt='uploaded preview'
                />
                <button
                  aria-label={'remove uploaded image'}
                  className='upload__preview-close'
                  onClick={() => onDeleteFile(index)}
                />
              </div>
            ))}
          {!!filesPreview &&
            !!filesPreview.length &&
            filesPreview.map((file, index) => (
              <div
                className='upload__preview-container'
                key={`file-preview-${index}`}
              >
                <p className='upload__file-preview'>{file}</p>
                <button
                  aria-label={'remove uploaded file'}
                  className='upload__preview-close upload__preview-file-close'
                  onClick={() => onDeleteFile(index)}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Upload;
