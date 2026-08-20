(function () {
  "use strict";

  function initIcons() {
    if (window.lucide && lucide.createIcons) {
      try { lucide.createIcons(); } catch (e) {}
    }
  }

  function setTheme(theme) {
    var root = document.documentElement;
    var button = document.getElementById("theme-toggle");
    root.setAttribute("data-theme", theme);
    if (button) {
      button.setAttribute("aria-pressed", String(theme === "dark"));
      var icon = button.querySelector(".icon");
      if (icon) icon.setAttribute("data-lucide", theme === "dark" ? "sun" : "moon");
    }
    initIcons();
    try { localStorage.setItem("pu-theme", theme); } catch (e) {}
  }

  document.addEventListener("DOMContentLoaded", function () {
    var saved = null;
    try { saved = localStorage.getItem("pu-theme"); } catch (e) {}
    var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(saved || (prefersDark ? "dark" : "light"));
    var button = document.getElementById("theme-toggle");
    if (button) button.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
      setTheme(current === "dark" ? "light" : "dark");
    });
  });
})();
