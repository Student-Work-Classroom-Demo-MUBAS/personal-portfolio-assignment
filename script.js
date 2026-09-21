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

// Article table of contents
function initArticleNavigation() {
  const toc = document.querySelector(".page-article .article-toc");

  if (!toc || toc.dataset.initialized) return;
  toc.dataset.initialized = "true";

  const links = [...toc.querySelectorAll('a[href^="#"]')];
  const items = links
    .map((link) => ({
      link,
      section: document.getElementById(link.hash.slice(1)),
    }))
    .filter((item) => item.section);

  if (!items.length) return;

  const mobile = window.matchMedia("(max-width: 700px)");
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  // Desktop starts expanded; mobile starts collapsed.
  const updateLayout = () => {
    toc.open = !mobile.matches;
  };

  updateLayout();
  mobile.addEventListener("change", updateLayout);

  function setActive(activeLink) {
    items.forEach(({ link }) => {
      if (link === activeLink) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function updateActiveSection() {
    // Matches the section's CSS scroll offset.
    const offset =
      parseFloat(getComputedStyle(items[0].section).scrollMarginTop) || 100;

    let active = items[0];

    for (const item of items) {
      if (item.section.getBoundingClientRect().top <= offset + 24) {
        active = item;
      }
    }

    // Ensure the conclusion becomes active at the bottom of the page.
    const atBottom =
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 4;

    if (atBottom) active = items[items.length - 1];

    setActive(active.link);
  }

  items.forEach(({ link, section }) => {
    link.addEventListener("click", (event) => {
      // Preserve normal browser behaviour for modified clicks.
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      event.preventDefault();

      if (mobile.matches) toc.open = false;

      if (window.location.hash !== link.hash) {
        history.pushState(null, "", link.hash);
      }

      // Make the destination accessible to keyboard and screen-reader users.
      if (!section.hasAttribute("tabindex")) {
        section.setAttribute("tabindex", "-1");
      }

      section.focus({ preventScroll: true });

      section.scrollIntoView({
        behavior: reducedMotion.matches ? "instant" : "smooth",
        block: "start",
      });

      setActive(link);
    });
  });

  // Limit scroll updates to one per animation frame.
  let scheduled = false;

  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;

    requestAnimationFrame(() => {
      updateActiveSection();
      scheduled = false;
    });
  }

  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);
  window.addEventListener("hashchange", scheduleUpdate);
  window.addEventListener("load", scheduleUpdate);
  toc.addEventListener("toggle", scheduleUpdate);

  updateActiveSection();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initArticleNavigation);
} else {
  initArticleNavigation();
}

/* =========================
   LIVE GITHUB REPOSITORIES
   ========================= */

const githubRepos = document.querySelector("#github-repos");
const githubStatus = document.querySelector("#github-status");
const githubRetry = document.querySelector("#github-retry");

if (githubRepos && githubStatus && githubRetry) {
  const username = "Jeshurun-coder";
  let isLoading = false;

  function createRepoCard(repo) {
    const card = document.createElement("article");
    card.className = "github-card";

    const heading = document.createElement("h3");
    heading.textContent = repo.name;

    const description = document.createElement("p");
    description.textContent =
      repo.description || "No description added to this repository yet.";

    const language = document.createElement("p");
    language.className = "github-meta";
    language.textContent = repo.language
      ? `Main language: ${repo.language}`
      : "Main language: Not specified";

    const link = document.createElement("a");
    link.className = "text-link";

    // Construct a GitHub URL using encoded path segments.
    link.href =
      `https://github.com/${encodeURIComponent(username)}/` +
      encodeURIComponent(repo.name);

    link.textContent = "View repository →";
    link.setAttribute("aria-label", `View ${repo.name} on GitHub`);

    // textContent displays API data as text, rather than interpreting HTML.
    card.append(heading, description, language, link);

    return card;
  }

  async function loadGithubRepos() {
    if (isLoading) return;

    isLoading = true;
    githubRetry.disabled = true;
    githubStatus.textContent = "Loading repositories…";
    githubRepos.setAttribute("aria-busy", "true");
    githubRepos.replaceChildren();

    const controller = new AbortController();

    // Stop waiting if GitHub takes longer than 12 seconds.
    const timeoutId = window.setTimeout(() => {
      controller.abort();
    }, 12000);

    let loadedSuccessfully = false;

    try {
      const response = await fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}` +
          "/repos?sort=updated&direction=desc&per_page=6",
        {
          headers: {
            Accept: "application/vnd.github+json"
          },
          signal: controller.signal
        }
      );

      // fetch does not automatically throw for HTTP errors.
      if (!response.ok) {
        let message = "GitHub is unavailable. Please try again.";

        if (response.status === 403 || response.status === 429) {
          message =
            "GitHub has temporarily restricted requests. " +
            "Please try again later or use the profile link below.";
        } else if (response.status === 404) {
          message = "The GitHub account could not be found.";
        }

        throw new Error(message);
      }

      const repositories = await response.json();

      if (
        !Array.isArray(repositories) ||
        !repositories.every(
          (repo) => repo && typeof repo.name === "string"
        )
      ) {
        throw new Error("GitHub returned unexpected data. Please try again.");
      }

      const cards = document.createDocumentFragment();

      repositories.forEach((repo) => {
        cards.appendChild(createRepoCard(repo));
      });

      githubRepos.appendChild(cards);

      githubStatus.textContent = repositories.length
        ? `${repositories.length} repositories loaded.`
        : "No public repositories are available yet.";

      loadedSuccessfully = true;
    } catch (error) {
      if (error.name === "AbortError") {
        githubStatus.textContent =
          "The request took too long. Please try again.";
      } else if (error instanceof TypeError) {
        githubStatus.textContent =
          "Could not connect to GitHub. Check your connection and try again.";
      } else {
        githubStatus.textContent = error.message;
      }
    } finally {
      window.clearTimeout(timeoutId);
      githubRepos.setAttribute("aria-busy", "false");
      githubRetry.disabled = false;
      isLoading = false;

      // Keep keyboard focus usable after a successful retry.
      if (loadedSuccessfully && document.activeElement === githubRetry) {
        githubStatus.tabIndex = -1;
        githubStatus.focus();
      }

      githubRetry.hidden = loadedSuccessfully;
    }
  }

  githubRetry.addEventListener("click", loadGithubRepos);
  loadGithubRepos();
}