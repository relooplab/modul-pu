/**
 * extras.js — bagian pelengkap interaktif Bab 1:
 * kata kunci (chips), pertanyaan diskusi (accordion), latihan (checklist
 * tersimpan di localStorage), daftar pustaka, grafik Chart.js (tema-aware),
 * dan diagram Mermaid (tema-aware). Data dari data.js (APP_DATA).
 */
(function () {
  "use strict";

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function esc(s) {
    if (window.TPAMain && window.TPAMain.esc) return window.TPAMain.esc(s);
    return String(s).replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }
  var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function smoothTo(id) {
    var el = $(id);
    if (!el) return;
    var top = el.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({ top: top, behavior: REDUCED ? "auto" : "smooth" });
  }

  /* ---------- Navigasi antar bab ---------- */
  function initChapters() {
    var nav = $("#chapter-nav");
    if (!nav) return;
    var btn = nav.querySelector(".chapter-btn");
    var menu = nav.querySelector(".chapter-menu");
    var label = nav.querySelector(".chapter-btn-label");
    if (!btn || !menu || !(APP_DATA.CHAPTERS || []).length) return;
    var current = null;
    APP_DATA.CHAPTERS.forEach(function (c) { if (c.current) current = c; });
    if (label && current) label.textContent = "Bab " + current.n;
    menu.innerHTML = APP_DATA.CHAPTERS.map(function (c) {
      if (c.href) {
        return '<button type="button" class="chapter-item' + (c.current ? " current" : "") + '" role="menuitem" data-href="' + esc(c.href) + '">' +
          '<span class="chapter-num">' + c.n + '</span><span class="chapter-item-txt">Bab ' + c.n + ' · ' + esc(c.title) + '</span>' +
          '<span class="chapter-soon">' + (c.current ? "Aktif" : "Buka") + '</span></button>';
      }
      return '<div class="chapter-item locked" role="menuitem" aria-disabled="true">' +
        '<span class="chapter-num">' + c.n + '</span><span class="chapter-item-txt">Bab ' + c.n + ' · ' + esc(c.title) + '</span>' +
        '<span class="chapter-soon">Segera</span></div>';
    }).join("");

    function setOpen(open) {
      btn.setAttribute("aria-expanded", String(open));
      menu.hidden = !open;
    }
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      setOpen(menu.hidden);
    });
    menu.addEventListener("click", function (e) {
      var it = e.target.closest(".chapter-item[data-href]");
      if (!it) return;
      setOpen(false);
      var h = it.getAttribute("data-href");
      if (!h) return;
      if (h.charAt(0) === "#") smoothTo(h);
      else window.location.href = h;
    });
    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target)) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* ---------- Kata kunci ---------- */
  function initKeywords() {
    var box = $("#kw-cloud");
    if (!box || !(APP_DATA.KEYWORDS || []).length) return;
    box.innerHTML = APP_DATA.KEYWORDS.map(function (k) {
      return '<button type="button" class="kw-chip" data-to="' + esc(k.to) + '">' + esc(k.t) + "</button>";
    }).join("");
    Array.prototype.forEach.call(box.querySelectorAll(".kw-chip"), function (chip) {
      chip.addEventListener("click", function () { smoothTo(chip.getAttribute("data-to")); });
    });
  }

  /* ---------- Pertanyaan diskusi (accordion) ---------- */
  function initDiskusi() {
    var box = $("#diskusi-list");
    if (!box || !(APP_DATA.DISKUSI || []).length) return;
    box.innerHTML = APP_DATA.DISKUSI.map(function (d, i) {
      return '<details class="acc-item">' +
        '<summary><span class="acc-num">' + (i + 1) + '</span><span class="acc-q">' + esc(d.q) + '</span><span class="icon acc-chev" data-lucide="chevron-down"></span></summary>' +
        '<div class="acc-body"><span class="icon" data-lucide="lightbulb"></span><p>' + esc(d.h) + "</p></div>" +
        "</details>";
    }).join("");
    if (window.lucide && lucide.createIcons) { try { lucide.createIcons(); } catch (e) {} }
  }

  /* ---------- Latihan (checklist + localStorage) ---------- */
  var LAT_KEY = "pu-latihan";
  function loadDone() {
    try { return JSON.parse(localStorage.getItem(LAT_KEY)) || []; } catch (e) { return []; }
  }
  function saveDone(arr) {
    try { localStorage.setItem(LAT_KEY, JSON.stringify(arr)); } catch (e) {}
  }
  function initLatihan() {
    var list = $("#latihan-list");
    if (!list || !(APP_DATA.LATIHAN || []).length) return;
    var done = loadDone();
    list.innerHTML = APP_DATA.LATIHAN.map(function (l, i) {
      var checked = done.indexOf(i) > -1;
      return '<li class="lat-item' + (checked ? " done" : "") + '" data-i="' + i + '">' +
        '<button type="button" class="lat-check" aria-pressed="' + checked + '" aria-label="Tandai selesai">' +
        '<span class="icon" data-lucide="check"></span></button>' +
        '<div class="lat-body"><span class="lat-tag">' + esc(l.tag) + '</span><p>' + esc(l.t) + "</p></div>" +
        "</li>";
    }).join("");
    if (window.lucide && lucide.createIcons) { try { lucide.createIcons(); } catch (e) {} }
    Array.prototype.forEach.call(list.querySelectorAll(".lat-item"), function (item) {
      var i = +item.getAttribute("data-i");
      item.querySelector(".lat-check").addEventListener("click", function () {
        var d = loadDone();
        var idx = d.indexOf(i);
        if (idx > -1) d.splice(idx, 1); else d.push(i);
        saveDone(d);
        item.classList.toggle("done", idx === -1);
        var btn = item.querySelector(".lat-check");
        btn.setAttribute("aria-pressed", String(idx === -1));
        updateLatProgress();
      });
    });
    updateLatProgress();
  }
  function updateLatProgress() {
    var n = (APP_DATA.LATIHAN || []).length;
    var done = loadDone().length;
    var fill = $("#lat-fill"), count = $("#lat-count");
    if (fill) fill.style.width = (n ? (done / n) * 100 : 0) + "%";
    if (count) count.textContent = done + " / " + n + " selesai";
  }

  /* ---------- Daftar pustaka ---------- */
  function initPustaka() {
    var box = $("#pustaka-list");
    if (!box || !(APP_DATA.PUSTAKA || []).length) return;
    box.innerHTML = APP_DATA.PUSTAKA.map(function (g) {
      return '<h3 class="pustaka-group">' + esc(g.group) + "</h3>" +
        '<ul class="pustaka-list">' + g.items.map(function (it) {
          return "<li>" + esc(it) + "</li>";
        }).join("") + "</ul>";
    }).join("");
  }

  /* ---------- Tema & warna (Chart.js + Mermaid) ---------- */
  function themeColors() {
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    var cs = getComputedStyle(document.documentElement);
    function v(n) { return cs.getPropertyValue(n).trim(); }
    return {
      dark: dark,
      sage: v("--sage"), terra: v("--terra"), muted: v("--muted"),
      muted2: v("--muted-2"), text: v("--text"), border: v("--border-strong"), surface: v("--surface"),
      open: v("--terra"),
      sanitary: v("--sage"),
      lainnya: dark ? "#3A424F" : "#C6D2DF",
      mmFill: dark ? "#1D2A39" : "#E9F1FA",
      mmStroke: dark ? "#5E9AD4" : "#3A7EC2",
      mmLine: dark ? "#4A5563" : "#8FA3B8",
      accentFill: dark ? "#222A34" : "#EDF1F5",
      accentStroke: dark ? "#8393A4" : "#6B7A8C",
      accentText: dark ? "#B4C0CC" : "#465563"
    };
  }

  /* ---------- Chart.js ---------- */
  var charts = {};
  function buildCharts() {
    if (!window.Chart) return;
    var c = themeColors();
    Chart.defaults.font.family = "'IBM Plex Mono', monospace";
    Chart.defaults.font.size = 11;
    Chart.defaults.color = c.muted;

    var k = $("#chart-karhutla");
    if (k && APP_DATA.CHART_KARHUTLA) {
      if (charts.karhutla) charts.karhutla.destroy();
      var kd = APP_DATA.CHART_KARHUTLA.data;
      charts.karhutla = new Chart(k, {
        type: "bar",
        data: {
          labels: APP_DATA.CHART_KARHUTLA.labels,
          datasets: [{
            label: "Luas terbakar (juta ha)",
            data: kd,
            backgroundColor: kd.map(function (v, i) { return i === 1 ? c.terra : c.sage; }),
            borderRadius: 8, maxBarThickness: 64
          }]
        },
        options: {
          maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: { callbacks: { label: function (ctx) { return " " + ctx.parsed.y.toLocaleString("id-ID") + " juta ha"; } } } },
          scales: { y: { beginAtZero: true, grid: { color: c.border } }, x: { grid: { display: false } } }
        }
      });
    }
    var a = $("#chart-aqg");
    if (a && APP_DATA.CHART_AQG) {
      if (charts.aqg) charts.aqg.destroy();
      var cols = [c.terra, c.sage, c.lainnya];
      charts.aqg = new Chart(a, {
        type: "bar",
        data: {
          labels: APP_DATA.CHART_AQG.labels,
          datasets: APP_DATA.CHART_AQG.series.map(function (s, i) {
            return { label: s.label, data: s.data, backgroundColor: cols[i], borderRadius: 6, maxBarThickness: 40 };
          })
        },
        options: {
          maintainAspectRatio: false,
          plugins: { legend: { position: "bottom", labels: { boxWidth: 12, padding: 12, usePointStyle: true } },
            tooltip: { callbacks: { label: function (ctx) { return " " + ctx.dataset.label + ": " + ctx.parsed.y.toLocaleString("id-ID") + " µg/m³"; } } } },
          scales: { y: { beginAtZero: true, grid: { color: c.border }, title: { display: true, text: "µg/m³", color: c.muted } }, x: { grid: { display: false } } }
        }
      });
    }
    var capk = $("#cap-karhutla"); if (capk && APP_DATA.CHART_KARHUTLA) capk.textContent = APP_DATA.CHART_KARHUTLA.caption;
    var capa = $("#cap-aqg"); if (capa && APP_DATA.CHART_AQG) capa.textContent = APP_DATA.CHART_AQG.caption;
  }

  /* ---------- Mermaid ---------- */
  function mmSources(c) {
    return {
      "mm-mekanisme": [
        "flowchart LR",
        'V["VOC / hidrokarbon"] --> UV["Sinar matahari (UV)"]',
        'N["NOx (oksida nitrogen)"] --> UV',
        'UV --> O["Oksidan fotokimia: O3 dan PAN"]',
        'O --> S["Kabut dan aerosol - smog fotokimia"]:::leak',
        "classDef leak fill:" + c.accentFill + ",stroke:" + c.accentStroke + ",color:" + c.accentText + ",font-weight:600;"
      ].join("\n"),
      "mm-paradigma": [
        "flowchart TB",
        'A["Fokus awal: asap kasatmata, SO2, CO, NO2"] --> B["Bukti epidemiologi kohort (Harvard Six Cities)"]',
        'B --> C["Paradigma baru: partikel halus PM2.5"]:::leak',
        'C --> D["WHO AQG 2021 - ambang dikencangkan drastis"]',
        "classDef leak fill:" + c.accentFill + ",stroke:" + c.accentStroke + ",color:" + c.accentText + ",font-weight:600;"
      ].join("\n")
    };
  }

  async function renderMermaid() {
    if (!window.mermaid) return;
    var c = themeColors();
    mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      securityLevel: "strict",
      fontFamily: "'DM Sans', sans-serif",
      themeVariables: {
        primaryColor: c.mmFill,
        primaryBorderColor: c.mmStroke,
        primaryTextColor: c.text,
        lineColor: c.mmLine,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "15px"
      }
    });
    var srcs = mmSources(c);
    for (var id in srcs) {
      var el = document.getElementById(id);
      if (!el) continue;
      try {
        var res = await mermaid.render(id + "-svg", srcs[id]);
        el.innerHTML = res.svg;
      } catch (e) {
        el.innerHTML = '<p class="note">Diagram tidak dapat dimuat.</p>';
      }
    }
  }

  /* ---------- Re-render saat tema berganti ---------- */
  function initThemeWatch() {
    var last = document.documentElement.getAttribute("data-theme");
    if (window.MutationObserver) {
      new MutationObserver(function () {
        var t = document.documentElement.getAttribute("data-theme");
        if (t !== last) { last = t; buildCharts(); renderMermaid(); }
      }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    }
  }

  /* ---------- Boot ---------- */
  function init() {
    initChapters();
    initKeywords();
    initDiskusi();
    initLatihan();
    initPustaka();
    buildCharts();
    renderMermaid();
    initThemeWatch();
  }
  document.addEventListener("DOMContentLoaded", init);
})();
