import React, { useEffect, useState } from "react";
import { Game, GameSetup, Goodbye, Intro } from "./pages/";
import { Header, MenuBar } from "./components";
import { isElectron } from "./utils";
import { Github, Linkedin } from "./assets/icons";
import "./App.css";

const isElectronProcess = isElectron();

const App = () => {
  const [hasIntro, setHasIntro] = useState(!isElectronProcess);
  const [isSetupReady, setIsSetupReady] = useState(false);
  const [gameSetup, setGameSetup] = useState({});
  const [isDownload, setIsDownload] = useState(false);
  const [jsonSetup, setJsonSetup] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${window.location.pathname.split("Memory")[0]}setup.json`
      );
      const jsonData = await response.json();
      setJsonSetup(jsonData);
    };

    fetchData();
  }, []);

  const goToGame = (setup) => {
    setGameSetup(setup);
    setIsSetupReady(true);
  };

  const goToSetup = () => setHasIntro(false);

  const backToSetup = () => {
    setIsSetupReady(false);
  };

  const setupNewGame = () => {
    setHasIntro(false);
    setIsSetupReady(false);
    setGameSetup({});
    setIsDownload(false);
  };

  const onDownload = () => {
    setIsSetupReady(true);
    setIsDownload(true);
  };

  const renderContent = () => {
    if (isElectronProcess) return <Game gameSetup={jsonSetup} />;

    if (hasIntro) return <Intro goToSetup={goToSetup} />;

    if (!hasIntro && !isSetupReady)
      return (
        <GameSetup
          gameSetup={gameSetup}
          goToGame={goToGame}
          onDownload={onDownload}
        />
      );

    if (!hasIntro && isSetupReady && !isDownload)
      return <Game gameSetup={gameSetup} backToSetup={backToSetup} />;

    return <Goodbye setupNewGame={setupNewGame} />;
  };

  return (
    <div className="app">
      {isElectronProcess && <MenuBar title="Memory Game" />}
      <Header
        className={`${isElectronProcess ? "app__header--electron" : ""}`}
        title="Customizable Memory Game"
        isElectron={isElectronProcess}
      />
      <div
        className={`app__main ${
          isElectronProcess ? "app__main--electron" : ""
        }`}
      >
        {renderContent()}
      </div>
      <footer className="app__footer">
        <p>{`©2021 - Designed and developed by Mariana Costa`}</p>
        <a
          className="app__footer-link"
          href={"https://github.com/marianapatcosta"}
          aria-label={`go to Mariana Costa's Github`}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <img src={Github} alt="github icon" />
        </a>
        <a
          className="app__footer-link"
          href={"https://www.linkedin.com/in/marianapatcosta"}
          aria-label={`go to Mariana Costa's Linkedin`}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <img src={Linkedin} alt="linkedin icon" />
        </a>
      </footer>
    </div>
  );
};

export default App;
