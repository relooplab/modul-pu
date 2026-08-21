(function () {
  "use strict";

  function parseISODate(raw) {
    if (!raw) return null;
    var s = String(raw).trim();
    if (!s) return null;
    // Terima YYYY-MM-DD atau ISO lengkap; jika hanya tanggal, tambah T00:00:00
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) s += "T00:00:00";
    var d = new Date(s);
    if (Number.isNaN(d.getTime())) return null;
    return d;
  }

  function renderFooter() {
    var year = document.querySelector("[data-current-year]");
    var modified = document.querySelector("[data-last-modified]");
    if (year) year.textContent = String(new Date().getFullYear());
    if (!modified) return;

    // Sumber kebenaran: atribut statis per-halaman (A). Jangan pakai Date() sebagai fallback.
    var raw = modified.getAttribute("data-last-modified") || modified.getAttribute("datetime");
    var parsed = parseISODate(raw);

    // Fallback legacy: document.lastModified HANYA jika atribut tidak ada (untuk dev lama)
    if (!parsed) {
      var legacy = parseISODate(document.lastModified);
      if (legacy) parsed = legacy;
    }

    if (!parsed) {
      // Tidak ada sumber valid -> sembunyikan baris agar tidak tampil "hari ini" yang menyesatkan
      var row = modified.closest(".foot-modified");
      if (row) row.hidden = true;
      return;
    }

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
