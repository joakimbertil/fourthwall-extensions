/**
 * Dark Mode
 * @version 1.0.3
 * @description This script adds dark mode to your Fourthwall website.
 */
const useCustomScheme = false;

const scheme = {
  mode: "dark",
  selectors: [":root", "#fw-section-header"],
  vars: {
    "color-primary": "#000",
    "color-on-primary": "#fff",
    "color-background": "#000",
    "color-on-background": "#fff",
    "color-product-image-background": "rgba(51, 51, 51, 0.1)",
    "color-primary-rgb": "0, 0, 0",
    "color-on-primary-rgb": "255, 255, 255",
    "color-background-rgb": "0, 0, 0",
    "color-on-background-rgb": "51, 51, 51",
    "color-background-brightness": "248",
  }
};

const icons = {
  lightbulbOn: `<svg class="svg-fill-current-color" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M272 384c9.6-31.9 29.5-59.1 49.2-86.2c0 0 0 0 0 0c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C368 78.8 289.2 0 192 0S16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4c0 0 0 0 0 0c19.8 27.1 39.7 54.4 49.2 86.2l160 0zM192 512c44.2 0 80-35.8 80-80l0-16-160 0 0 16c0 44.2 35.8 80 80 80zM112 176c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.9 50.1-112 112-112c8.8 0 16 7.2 16 16s-7.2 16-16 16c-44.2 0-80 35.8-80 80z"/></svg>`,
  lightbulbOff: `<svg class="svg-fill-current-color" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M297.2 248.9C311.6 228.3 320 203.2 320 176c0-70.7-57.3-128-128-128S64 105.3 64 176c0 27.2 8.4 52.3 22.8 72.9c3.7 5.3 8.1 11.3 12.8 17.7c0 0 0 0 0 0c12.9 17.7 28.3 38.9 39.8 59.8c10.4 19 15.7 38.8 18.3 57.5L109 384c-2.2-12-5.9-23.7-11.8-34.5c-9.9-18-22.2-34.9-34.5-51.8c0 0 0 0 0 0s0 0 0 0c-5.2-7.1-10.4-14.2-15.4-21.4C27.6 247.9 16 213.3 16 176C16 78.8 94.8 0 192 0s176 78.8 176 176c0 37.3-11.6 71.9-31.4 100.3c-5 7.2-10.2 14.3-15.4 21.4c0 0 0 0 0 0s0 0 0 0c-12.3 16.8-24.6 33.7-34.5 51.8c-5.9 10.8-9.6 22.5-11.8 34.5l-48.6 0c2.6-18.7 7.9-38.6 18.3-57.5c11.5-20.9 26.9-42.1 39.8-59.8c0 0 0 0 0 0s0 0 0 0s0 0 0 0c4.7-6.4 9-12.4 12.7-17.7zM192 128c-26.5 0-48 21.5-48 48c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-44.2 35.8-80 80-80c8.8 0 16 7.2 16 16s-7.2 16-16 16zm0 384c-44.2 0-80-35.8-80-80l0-16 160 0 0 16c0 44.2-35.8 80-80 80z"/></svg>`,
};

const toggleElement = (() => {
  const toggleElement = document.createElement("a");
  toggleElement.id = "scheme-toggle";
  toggleElement.style = "cursor: pointer;";
  toggleElement.innerHTML = icons.lightbulbOff;

  const listItem = document.createElement("li");
  listItem.className = "header__list-item";
  listItem.append(toggleElement);

  const section = document.querySelector(".header__icons > .header__list");
  section?.append(listItem);

  return toggleElement;
})();

const styleElement = (() => {
  const styleElement = document.createElement("style");

  let css;

  if(useCustomScheme) {
    css = scheme.selectors.join(",");

    css += "{";

    Object.entries(scheme.vars).map((variable) => {
      const [key, value] = variable;
      css += `--${key}: ${value};`;
    });

    css += "}";
  }
  else {
    css = "html,img,video,iframe{filter: invert(1) hue-rotate(180deg);}";
  }

  styleElement.innerText = css;

  return styleElement;
})();

const getUserMode = () => localStorage.getItem("fw_color_scheme");
const setUserMode = (scheme) => localStorage.setItem("fw_color_scheme", scheme);

const toggleIcon = () => {
  const mode = detectScheme();

  toggleElement.innerHTML = mode === "dark" ? icons.lightbulbOn : icons.lightbulbOff;
}

const detectScheme = () => {
  const defaultMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
  const userMode = getUserMode();

  if (userMode) {
    return userMode;
  } else {
    setUserMode(defaultMode);

    return defaultMode;
  }
};

const toggleScheme = () => {
  const mode = detectScheme();

  setUserMode(mode === "dark" ? "light" : "dark");

  toggleIcon();

  if (scheme.mode !== mode) {
    document.body.append(styleElement);
  } else {
    styleElement.remove();
  }
};

const recallScheme = () => {
  const mode = detectScheme();

  if (scheme.mode === mode) {
    toggleIcon();
    document.body.append(styleElement);
  }
};

const initSchemeState = () => {
  recallScheme();

  toggleElement.addEventListener("click", toggleScheme);
};

initSchemeState();