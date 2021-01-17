import React, { useState, useEffect, useCallback } from "react";
import { Emoji, ToggleSwitch } from "../";
import "./Header.css";

const Header = ({ title, isElectron }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleMode = () => {
    setIsDarkTheme(!isDarkTheme);
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
    <header className={`header ${isElectron ? "header--electron" : ""}`}>
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
