import React, { useState, useEffect, useCallback } from "react";
import { Emoji, ToggleSwitch } from "../";
import "./Header.css";

const Header = ({ title }) => {
  const [isDarkTheme, setDarkTheme] = useState(false);

  const toggleMode = () => {
    setDarkTheme(!isDarkTheme);
    setTheme();
  };

  const setTheme = useCallback(() => {
    isDarkTheme
      ? document.documentElement.setAttribute("theme", "dark")
      : document.documentElement.setAttribute("theme", "light");
  }, [isDarkTheme]);

  useEffect(() => {
    setTheme();
  }, [setTheme]);

  return (
    <header className="header">
      <h2 className="header__title">
        {title}
        <span>
          Bday <br />
          Edition
        </span>
      </h2>
      <div className="header__toggle">
        <ToggleSwitch
          label="Theme color"
          leftLabel={<Emoji label="sun" emoji="☀️" />}
          rightLabel={<Emoji label="moon" emoji="🌙" />}
          checked={isDarkTheme}
          handleToggle={toggleMode}
        />
      </div>
    </header>
  );
};

export default Header;
