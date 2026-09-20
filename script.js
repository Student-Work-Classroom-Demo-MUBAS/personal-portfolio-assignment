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
/* =========================
   CONTACT FORM VALIDATION
   ========================= */

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  const fieldset = contactForm.querySelector(".contact-form-fields");
  const formStatus = contactForm.querySelector("#contact-form-status");

  const fields = [
    {
      input: contactForm.querySelector("#contact-name"),
      requiredMessage: "Please enter your name."
    },
    {
      input: contactForm.querySelector("#contact-email"),
      requiredMessage: "Please enter your email address."
    },
    {
      input: contactForm.querySelector("#contact-subject"),
      requiredMessage: "Please enter a subject."
    },
    {
      input: contactForm.querySelector("#contact-message"),
      requiredMessage: "Please enter your message."
    }
  ];

  function getError(input, requiredMessage) {
    if (!input.value.trim()) {
      return requiredMessage;
    }

    if (input.type === "email" && input.validity.typeMismatch) {
      return "Enter a valid email address, such as name@example.com.";
    }

    if (
      input.maxLength > -1 &&
      input.value.length > input.maxLength
    ) {
      return `Please use no more than ${input.maxLength} characters.`;
    }

    return "";
  }

  function validateField(field) {
    const message = getError(field.input, field.requiredMessage);

    field.error.textContent = message;
    field.error.hidden = !message;

    if (message) {
      field.input.setAttribute("aria-invalid", "true");
    } else {
      field.input.removeAttribute("aria-invalid");
    }

    return message === "";
  }

  fields.forEach((field) => {
    const error = document.createElement("p");

    error.id = `${field.input.id}-error`;
    error.className = "field-error";
    error.hidden = true;
    error.setAttribute("aria-live", "polite");

    field.input.insertAdjacentElement("afterend", error);
    field.error = error;

    // Preserve any existing help-text associations.
    const descriptionIds = new Set(
      (field.input.getAttribute("aria-describedby") || "")
        .split(/\s+/)
        .filter(Boolean)
    );

    descriptionIds.add(error.id);

    field.input.setAttribute(
      "aria-describedby",
      [...descriptionIds].join(" ")
    );

    // Validate when the visitor leaves a field.
    field.input.addEventListener("blur", () => {
      validateField(field);
    });

    // Recheck an invalid field while the visitor corrects it.
    field.input.addEventListener("input", () => {
      formStatus.textContent = "";

      if (field.input.getAttribute("aria-invalid") === "true") {
        validateField(field);
      }
    });
  });

  contactForm.addEventListener("submit", (event) => {
    // Prevent submission until a real form service is connected.
    event.preventDefault();

    const invalidFields = fields.filter(
      (field) => !validateField(field)
    );

    if (invalidFields.length > 0) {
      const count = invalidFields.length;

      formStatus.textContent =
        `Please correct ${count} ${count === 1 ? "field" : "fields"} below.`;

      invalidFields[0].input.focus();
      return;
    }

    formStatus.textContent =
      "Your details are valid, but this form cannot send messages yet. " +
      "Please email uchixy2005@gmail.com.";

    // Keep the entered details; nothing has been sent.
  });

  // Enable custom validation only after the handlers are ready.
  contactForm.noValidate = true;
  fieldset.disabled = false;
}