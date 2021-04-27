import { KEYBOARD_CODES } from "./constants";
const { SPACE_KEY, ENTER_KEY } = KEYBOARD_CODES;

export const isEventValid = (event) =>
  event.type === "click" ||
  event.code === SPACE_KEY ||
  event.code === ENTER_KEY;

export const isElectron = () => {
  // Renderer process
  if (
    !!window &&
    typeof window.process === "object" &&
    window.process.type === "renderer"
  ) {
    return true;
  }

  // Main process
  if (
    !!process &&
    typeof process.versions === "object" &&
    !!process.versions.electron
  ) {
    return true;
  }

  // Detect the user agent when the `nodeIntegration` option is set to true
  if (
    typeof navigator === "object" &&
    typeof navigator.userAgent === "string" &&
    navigator.userAgent.indexOf("Electron") >= 0
  ) {
    return true;
  }

  return false;
};
