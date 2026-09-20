"use strict";

/* =========================
   LIGHT / DARK THEME
   ========================= */

const themeToggle = document.querySelector(".theme-toggle");
const root = document.documentElement;
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

function getSavedTheme() {
  try {
    return localStorage.getItem("portfolio-theme");
  } catch {
    return null;
  }
}

function applyTheme(theme) {
  const isDark = theme === "dark";

  // Your CSS uses :root[data-theme="light"] and "dark".
  root.dataset.theme = theme;

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", "Dark mode");
  }
}

const savedTheme = getSavedTheme();
let hasChosenTheme = savedTheme === "light" || savedTheme === "dark";

applyTheme(
  hasChosenTheme
    ? savedTheme
    : systemTheme.matches
      ? "dark"
      : "light"
);

if (themeToggle) {
  themeToggle.hidden = false;

  themeToggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);
    hasChosenTheme = true;

    try {
      localStorage.setItem("portfolio-theme", nextTheme);
    } catch {
      // The toggle still works if browser storage is unavailable.
    }
  });
}

// Follow system changes until the visitor chooses a theme.
systemTheme.addEventListener("change", (event) => {
  if (!hasChosenTheme) {
    applyTheme(event.matches ? "dark" : "light");
  }
});

/* =========================
   MOBILE NAVIGATION
   ========================= */

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

// This breakpoint must match the mobile navigation breakpoint in your CSS.
const mobileScreen = window.matchMedia("(max-width: 700px)");

if (menuToggle && navigation) {
  function setMenuOpen(isOpen, restoreFocus = false) {
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    navigation.hidden = !isOpen;
    navigation.classList.toggle("is-open", isOpen);

    if (restoreFocus) {
      menuToggle.focus();
    }
  }

  function updateNavigation() {
    const isMobile = mobileScreen.matches;
    const focusWasInNavigation = navigation.contains(document.activeElement);
    const focusWasOnToggle = document.activeElement === menuToggle;

    menuToggle.hidden = !isMobile;

    if (isMobile) {
      setMenuOpen(false, focusWasInNavigation);
    } else {
      navigation.hidden = false;
      navigation.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");

      if (focusWasOnToggle) {
        navigation.querySelector("a")?.focus();
      }
    }
  }

  menuToggle.addEventListener("click", () => {
    if (!mobileScreen.matches) return;

    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
  });

  // Close after selecting a navigation link.
  navigation.addEventListener("click", (event) => {
    if (mobileScreen.matches && event.target.closest("a")) {
      setMenuOpen(false, true);
    }
  });

  // Escape closes the menu and returns focus to its button.
  document.addEventListener("keydown", (event) => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    if (event.key === "Escape" && mobileScreen.matches && isOpen) {
      setMenuOpen(false, true);
    }
  });

  // Close when clicking outside the menu.
  document.addEventListener("click", (event) => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    if (
      mobileScreen.matches &&
      isOpen &&
      !navigation.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      const focusIsInside = navigation.contains(document.activeElement);
      setMenuOpen(false, focusIsInside);
    }
  });

  mobileScreen.addEventListener("change", updateNavigation);
  updateNavigation();
}