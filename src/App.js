import React, { useEffect, useState } from "react";
//import isDev from "electron-is-dev";
import { Game, GameSetup, Goodbye, Intro } from "./pages/";
import { Header, MenuBar } from "./components";
import { isElectron } from "./utils";
/* import JsonSetupDev from "./assets/docs/setup.json";
import JsonSetupProd from "../../../../../../setup.json"; */
import { Github, Linkedin } from "./assets/icons";
import "./App.css";

//const JsonSetup = require(`${process.env.REACT_APP_MAIN}`);

const isElectronProcess = isElectron();
const electron = isElectronProcess && window.require("electron");
const remote = isElectronProcess && electron.remote;

const ipcRenderer = isElectronProcess && electron.ipcRenderer;
/*const mainProcess =
  isElectronProcess && remote.require(`${process.env.REACT_APP_MAIN}`); */

const App = () => {
  const [isIntro, setIsIntro] = useState(!isElectronProcess);
  const [isSetupReady, setIsSetupReady] = useState(false);
  const [gameSetup, setGameSetup] = useState({});
  const [isDownload, setIsDownload] = useState(false);
  const [jsonSetup, setJsonSetup] = useState({});
  /*   isDev ? JsonSetupDev : JsonSetupProd */
  //const [jsonSetup, setJsonSetup] = useState(mainProcess.getJsonData());

  useEffect(() => {
    /*   console.log(444, isElectronProcess, window.location.pathname);
    isElectronProcess && ipcRenderer.send("request-json-data");
    isElectronProcess &&
      ipcRenderer.on("send-json-data", (e, data, a, b) => {
        console.log(999, data, a, b);
        setJsonSetup(data);
      }); */
    console.log(66, `${window.location.pathname.split("Memory")[0]}setup.json`);
    const fetchData = async () => {
      const response = await fetch(
        `${window.location.pathname.split("Memory")[0]}setup.json`
      );
      const jsonData = await response.json();
      console.log(2222, jsonData, response);
      setJsonSetup(jsonData);
    };

    fetchData();
  }, []);

  /*  console.log(
    333,
    `${process.env.REACT_APP_MAIN} ${process.env.REACT_APP_VERSION}`,
    jsonSetup
  ); */
  console.log(555, jsonSetup);

  //const jsonProd = "../../../../../../setup.json";

  const goToGame = (setup) => {
    setGameSetup(setup);
    setIsSetupReady(true);
  };

  const goToSetup = () => setIsIntro(false);

  const backToSetup = () => {
    setIsSetupReady(false);
  };

  const setupNewGame = () => {
    setIsIntro(false);
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

    if (isIntro) return <Intro goToSetup={goToSetup} />;

    if (!isIntro && !isSetupReady)
      return (
        <GameSetup
          gameSetup={gameSetup}
          goToGame={goToGame}
          onDownload={onDownload}
        />
      );

    if (!isIntro && isSetupReady && !isDownload)
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
        <p>©</p> <p>{`2021 - Designed and developed by Mariana Costa`}</p>
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
