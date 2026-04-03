import { setGiscusTheme } from "./giscus";

function toggleTheme(dark: boolean): void {
  const css = document.createElement("style");
  css.appendChild(
    document.createTextNode(
      `* {
           -webkit-transition: none !important;
           -moz-transition: none !important;
           -o-transition: none !important;
           -ms-transition: none !important;
           transition: none !important;
        }`,
    ),
  );
  document.head.appendChild(css);

  if (dark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  window.getComputedStyle(css).opacity;
  document.head.removeChild(css);

  setGiscusTheme();
}

function updateThemeButtons(): void {
  const theme = localStorage.getItem("theme");
  const lightThemeButton = document.getElementById("light-theme-button");
  const darkThemeButton = document.getElementById("dark-theme-button");
  const systemThemeButton = document.getElementById("system-theme-button");

  function removeActiveButtonTheme(button: HTMLElement | null): void {
    button?.classList.remove("bg-black/5");
    button?.classList.remove("dark:bg-white/5");
  }

  function addActiveButtonTheme(button: HTMLElement | null): void {
    button?.classList.add("bg-black/5");
    button?.classList.add("dark:bg-white/5");
  }

  removeActiveButtonTheme(lightThemeButton);
  removeActiveButtonTheme(darkThemeButton);
  removeActiveButtonTheme(systemThemeButton);

  if (theme === "light") {
    addActiveButtonTheme(lightThemeButton);
  } else if (theme === "dark") {
    addActiveButtonTheme(darkThemeButton);
  } else {
    addActiveButtonTheme(systemThemeButton);
  }
}

export function init(): void {
  updateThemeButtons();

  const lightThemeButton = document.getElementById("light-theme-button");
  lightThemeButton?.addEventListener("click", () => {
    localStorage.setItem("theme", "light");
    toggleTheme(false);
    updateThemeButtons();
  });

  const darkThemeButton = document.getElementById("dark-theme-button");
  darkThemeButton?.addEventListener("click", () => {
    localStorage.setItem("theme", "dark");
    toggleTheme(true);
    updateThemeButtons();
  });

  const systemThemeButton = document.getElementById("system-theme-button");
  systemThemeButton?.addEventListener("click", () => {
    localStorage.setItem("theme", "system");
    toggleTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);
    updateThemeButtons();
  });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      if (localStorage.theme === "system") {
        toggleTheme(event.matches);
      }
    });
}
