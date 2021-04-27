import React, { useState } from "react";
import { Close, Maximize, Minimize, Restore } from "../../assets/icons";
import { isElectron } from "../../utils";
import "./MenuBar.css";

const isElectronProcess = isElectron();
const electron = isElectronProcess && window.require("electron");
const remote = isElectronProcess && electron.remote;

const Menubar = ({ title }) => {
  const [isWindowMaximized, setIsWindowMaximized] = useState(false);

  const handleQuit = () => {
    const window = remote.getCurrentWindow();
    window.close();
  };

  const handleMinimize = () => {
    const window = remote.getCurrentWindow();
    window.minimize();
  };

  const handleMaximize = () => {
    const window = remote.getCurrentWindow();
    window.maximize();
    setIsWindowMaximized(true);
  };

  const handleRestore = () => {
    const window = remote.getCurrentWindow();
    window.restore();
    setIsWindowMaximized(false);
  };

  return (
    <div className="menu-bar">
      <div className="menu-bar__title">{title}</div>
      <div className="menu-bar__icons">
        <img
          className="menu-bar__icon"
          alt="minimize icon"
          src={Minimize}
          onClick={handleMinimize}
        />
        {isWindowMaximized ? (
          <img
            className="menu-bar__icon"
            alt="restore icon"
            src={Restore}
            onClick={handleRestore}
          />
        ) : (
          <img
            className="menu-bar__icon"
            alt="maximize icon"
            src={Maximize}
            onClick={handleMaximize}
          />
        )}
        <img
          className="menu-bar__icon menu-bar__icon--red-hover"
          alt="close icon"
          src={Close}
          onClick={handleQuit}
        />
      </div>
    </div>
  );
};

export default Menubar;
