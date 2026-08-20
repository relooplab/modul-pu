(function () {
  "use strict";

  function renderFooter() {
    var year = document.querySelector("[data-current-year]");
    var modified = document.querySelector("[data-last-modified]");
    if (year) year.textContent = String(new Date().getFullYear());
    if (!modified) return;

    var parsed = new Date(document.lastModified);
    if (Number.isNaN(parsed.getTime())) parsed = new Date();
    modified.dateTime = parsed.toISOString();
    modified.textContent = parsed.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", renderFooter);
  else renderFooter();
})();
