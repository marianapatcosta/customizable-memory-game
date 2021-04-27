import React, { useEffect, useState } from "react";
import "./Toast.css";

const Toast = ({ message, type = "info", className, style, onClean }) => {
  const getTypeClass = () => {
    const toastTypesClasses = {
      alert: "toast--alert",
      info: "toast--info",
      success: "toast--success",
      warning: "toast--warning",
    };
    return toastTypesClasses[type];
  };
  const [willBeDeleted, setWillBeDeleted] = useState(false);

  useEffect(() => {
    let autoDeleteTimer;
    let fadeOutTimer;
    if (message) {
      const fadeOutTime = 2500;
      fadeOutTimer = setTimeout(() => setWillBeDeleted(true), fadeOutTime);
      autoDeleteTimer = setTimeout(() => onClean({}), 3000);
    }
    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(autoDeleteTimer);
    };
  }, [message, onClean]);

  return (
    <div
      className={`toast ${getTypeClass()} ${className} ${
        willBeDeleted ? "toast--deleting" : ""
      }`}
      style={style}
      type={type}
    >
      <div className="toast__message">{message}</div>
    </div>
  );
};

export default Toast;
