const applyDarkModeStyles = (enabled) => {
  const header = document.querySelector("header");
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");

  const toggleClasses = (element, classes, add) => {
    classes.forEach(cls => element.classList[add ? "add" : "remove"](cls));
  };

  const darkClasses = {
    header: ["header-dark-mode", "fastChange"],
    main: ["main-dark-mode", "fastChange"],
    footer: ["footer-dark-mode", "fastChange"]
  };

  toggleClasses(header, darkClasses.header, enabled);
  toggleClasses(main, darkClasses.main, enabled);
  toggleClasses(footer, darkClasses.footer, enabled);
};

const updateIcons = (enabled) => {
  const toggleOn = document.querySelector(".fa-toggle-on");
  const toggleOff = document.querySelector(".fa-toggle-off");

  if (enabled) {
    toggleOn.classList.remove("displayOff");
    toggleOff.classList.add("displayOff");
  } else {
    toggleOn.classList.add("displayOff");
    toggleOff.classList.remove("displayOff");
  }
};

const loadSavedTheme = () => {
  const savedTheme = localStorage.getItem("darkMode") === "enabled";
  applyDarkModeStyles(savedTheme);
  updateIcons(savedTheme);
};

const DarkMode = () => {
  const currentTheme = localStorage.getItem("darkMode");
  const enabled = currentTheme !== "enabled";

  localStorage.setItem("darkMode", enabled ? "enabled" : "disabled");
  applyDarkModeStyles(enabled);
  updateIcons(enabled);
};

document.addEventListener("DOMContentLoaded", loadSavedTheme);
