import React, { useState, useEffect, useCallback } from "react";
import { Emoji, ToggleSwitch } from "../";
import "./Header.css";

const Header = ({ title, className }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleMode = (event) => {
    setIsDarkTheme(event.target.checked);
    const storedData = JSON.parse(localStorage.getItem("userPreferences"));
    localStorage.setItem(
      "userPreferences",
      JSON.stringify({
        ...storedData,
        isDarkTheme: !isDarkTheme,
      })
    );
  };

  const setTheme = useCallback(() => {
    isDarkTheme
      ? document.documentElement.setAttribute("theme", "dark")
      : document.documentElement.setAttribute("theme", "light");
  }, [isDarkTheme]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userPreferences"));
    storedData?.isDarkTheme && setIsDarkTheme(storedData.isDarkTheme);
  }, []);

  useEffect(() => {
    setTheme();
  }, [isDarkTheme, setTheme]);

  return (
    <header className={`header ${className}`}>
      <h2 className="header__title">
        {title}
        <span>
          Bday <br />
          Edition
        </span>
      </h2>
      <div className="header__toggle">
        <ToggleSwitch
          leftLabel={<Emoji label="sun" emoji="☀️" />}
          rightLabel={<Emoji label="moon" emoji="🌙" />}
          checked={isDarkTheme}
          onChange={toggleMode}
        />
      </div>
    </header>
  );
};

export default Header;
