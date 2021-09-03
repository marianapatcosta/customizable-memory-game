const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1150,
    height: 950,
    webPreferences: {
      nodeIntegration: true, // to enable window.require and access main process from React components
      enableRemoteModule: true, // to allow access remote mode in react components,
      webSecurity: false,
    },
    icon: `${__dirname}/memory.png`,
    show: false,
    frame: false, // to remove default menu bar
  });

  const baseURL = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`;

  mainWindow.loadURL(baseURL);

  mainWindow.once("ready-to-show", () => mainWindow.show());
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};
app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

const jsonDataUrl = isDev
  ? path.join(__dirname, "..", "src", "assets", "docs", "setup.json")
  : path.join(__dirname, "..", "..", "..", "..", "..", "..", "setup.json");
ipcMain.on("request-json-data", async (event) => {
  const jsonDataResp = await fetch(jsonDataUrl);
  const jsonData = await jsonDataResp.blob();
  event.reply("send-json-data", jsonData, __dirname, jsonDataUrl);
});
