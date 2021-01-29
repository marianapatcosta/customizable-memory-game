import React, { useEffect } from "react";
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

  useEffect(() => {
    let timer;
    if (message) timer = setTimeout(() => onClean({}), 2000);
    return () => clearTimeout(timer);
  }, [message, onClean]);

  return (
    <div
      className={`toast ${getTypeClass()} ${className}`}
      style={style}
      type={type}
    >
      <div className="toast__message">{message}</div>
    </div>
  );
};

export default Toast;
