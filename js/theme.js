/**
 * Dark / Light theme toggle with localStorage persistence.
 * Applies data-theme="dark" or removes it for light.
 */
(function () {
  "use strict";

  var THEME_KEY = (window.BLOG_CONFIG && window.BLOG_CONFIG.THEME_KEY) || "blog-theme";
  var STORAGE_KEY = "blog-theme";

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY) || "light";
    } catch (e) {
      return "light";
    }
  }

  function setStoredTheme(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {}
  }

  function applyTheme(value) {
    var root = document.documentElement;
    if (value === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
  }

  function setToggleLabel(btn, theme) {
    if (!btn) return;
    btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    btn.textContent = theme === "dark" ? "\u263C" : "\u263E";
  }

  function init() {
    var theme = getStoredTheme();
    applyTheme(theme);

    var btn = document.getElementById("theme-toggle");
    if (btn) {
      setToggleLabel(btn, theme);
      btn.addEventListener("click", function () {
        var next = theme === "dark" ? "light" : "dark";
        theme = next;
        applyTheme(theme);
        setStoredTheme(theme);
        setToggleLabel(btn, theme);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
