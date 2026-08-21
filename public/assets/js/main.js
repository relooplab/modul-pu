/**
 * main.js — inisialisasi, navigasi, progress bar, theme toggle, tooltip,
 * modal bento, tilt 3D, scrollytelling (GSAP ScrollTrigger), dan formula KaTeX.
 * Data berasal dari data.js (APP_DATA). Jalan via file:// tanpa server.
 */
(function () {
  "use strict";

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var lastFocused = null;

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }

  /* ---------- Icons (Lucide) ---------- */
  function initIcons() {
    if (window.lucide && lucide.createIcons) { try { lucide.createIcons(); } catch (e) {} }
  }

  /* ---------- Theme toggle ---------- */
  function setTheme(theme) {
    var root = document.documentElement;
    var btn = $("#theme-toggle");
    root.setAttribute("data-theme", theme);
    if (btn) {
      btn.setAttribute("aria-pressed", String(theme === "dark"));
      var ic = btn.querySelector(".icon");
      if (ic) ic.setAttribute("data-lucide", theme === "dark" ? "sun" : "moon");
    }
    initIcons();
    try { localStorage.setItem("pu-theme", theme); } catch (e) {}
  }
  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem("pu-theme"); } catch (e) {}
    var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = saved || (prefersDark ? "dark" : "light");
    setTheme(theme);
    var btn = $("#theme-toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        var cur = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
        setTheme(cur === "dark" ? "light" : "dark");
      });
    }
  }

  /* ---------- Objectives ---------- */
  function initObjectives() {
    var list = $("#objectives-list");
    if (!list) return;
    list.innerHTML = (APP_DATA.OBJECTIVES || []).map(function (o) {
      return '<li><span class="obj-ic"><span class="icon" data-lucide="check"></span></span><span>' + esc(o) + "</span></li>";
    }).join("");
    initIcons();
  }

  /* ---------- Back-to-top ---------- */
  function initToTop() {
    var btn = $("#to-top");
    if (!btn) return;
    function toggle() {
      if ((window.scrollY || 0) > 600) btn.removeAttribute("hidden");
      else btn.setAttribute("hidden", "");
    }
    window.addEventListener("scroll", toggle, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" });
    });
    toggle();
  }

  /* ---------- Reading progress + sticky header ---------- */
  function initProgress() {
    var bar = $("#progress-bar");
    var header = $("#site-header");
    if (bar) {
      function update() {
        var h = document.documentElement;
        var max = h.scrollHeight - h.clientHeight;
        var pct = max > 0 ? (window.scrollY || h.scrollTop) / max * 100 : 0;
        bar.style.width = pct.toFixed(2) + "%";
      }
      window.addEventListener("scroll", update, { passive: true });
      update();
    }
    if (header) {
      function pin() {
        var rect = header.parentElement ? null : null; // header sudah sticky via CSS
      }
      window.addEventListener("scroll", function () { /* sticky dihandle CSS */ }, { passive: true });
    }
  }

  /* ---------- TOC scroll-spy + quick nav ---------- */
  function initTOC() {
    var chips = $$(".chip[data-scroll]");
    var airColumn = $("#air-column");
    var airToggle = $("#air-column-toggle");
    var airBackdrop = $("#air-column-backdrop");

    function setAirOpen(open) {
      if (!airColumn) return;
      airColumn.classList.toggle("is-open", open);
      if (airToggle) airToggle.setAttribute("aria-expanded", String(open));
      if (airBackdrop) airBackdrop.hidden = !open;
      document.body.classList.toggle("air-open", open);
    }

    if (airToggle) airToggle.addEventListener("click", function () {
      setAirOpen(!airColumn.classList.contains("is-open"));
    });
    if (airBackdrop) airBackdrop.addEventListener("click", function () { setAirOpen(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setAirOpen(false);
    });

    var map = {};
    chips.forEach(function (chip) {
      var id = chip.getAttribute("data-scroll");
      if (map[id]) return;
      var sec = $(id);
      if (!sec) return;
      map[id] = { chip: chip, sec: sec };
      chip.addEventListener("click", function () {
        var top = sec.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: top, behavior: REDUCED ? "auto" : "smooth" });
        setAirOpen(false);
      });
    });
    var ids = Object.keys(map);
    if (!ids.length || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        ids.forEach(function (id) {
          var m = map[id];
          if (m.chip) m.chip.classList.toggle("active", m.sec === en.target);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    ids.forEach(function (id) { io.observe(map[id].sec); });
  }
  /* ---------- Glossary tooltip ---------- */
  function initGlossary() {
    var tip = $("#tooltip");
    if (!tip) return;
    var terms = $$(".term[data-gloss]");
    if (!terms.length) return;
    function show(term) {
      var def = APP_DATA.GLOSSARY[term.getAttribute("data-gloss")];
      if (!def) return;
      var enHtml = def.en && def.en !== def.term ? '<em class="tt-en">' + esc(def.en) + "</em>" : "";
      tip.innerHTML = '<span class="tt-term">' + esc(def.term) + "</span>" + enHtml +
        '<span class="tt-def">' + esc(def.def) + "</span>";
      tip.hidden = false;
      position(term);
    }
    function position(term) {
      var r = term.getBoundingClientRect();
      var tw = tip.offsetWidth || 250;
      var left = Math.min(Math.max(r.left + r.width / 2 - tw / 2, 10), window.innerWidth - tw - 10);
      var top = r.bottom + 9;
      if (top + tip.offsetHeight > window.innerHeight - 10) top = r.top - tip.offsetHeight - 9;
      tip.style.left = left + "px";
      tip.style.top = top + "px";
    }
    function hide() { tip.hidden = true; }
    terms.forEach(function (t) {
      t.setAttribute("tabindex", "0");
      t.addEventListener("mouseenter", function () { show(t); });
      t.addEventListener("mouseleave", hide);
      t.addEventListener("focus", function () { show(t); });
      t.addEventListener("blur", hide);
      t.addEventListener("keydown", function (e) { if (e.key === "Escape") hide(); });
    });
    document.addEventListener("scroll", hide, true);
    window.addEventListener("resize", hide);
  }

  /* ---------- Modal ---------- */
  var modal = $("#modal");
  function visible(el) { return el.offsetParent !== null; }
  function openModal(eyebrow, title, bodyHTML) {
    if (!modal) return;
    lastFocused = document.activeElement;
    $("#modal-eyebrow").textContent = eyebrow;
    $("#modal-title").textContent = title;
    $("#modal-body").innerHTML = bodyHTML;
    initIcons();
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    var close = $(".modal-close", modal);
    if (close) close.focus();
  }
  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }
  function bindModal() {
    if (!modal) return;
    $$("[data-close-modal]").forEach(function (el) { el.addEventListener("click", closeModal); });
    modal.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { e.preventDefault(); closeModal(); return; }
      if (e.key !== "Tab") return;
      var f = $$("a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex='-1'])", modal)
        .filter(visible);
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
      else { if (document.activeElement === last || !modal.contains(document.activeElement)) { e.preventDefault(); first.focus(); } }
    });
  }
  /* ---------- Bento cards ---------- */
  function openBento(i) {
    var c = APP_DATA.BENTO[i];
    if (!c) return;
    var body = c.detail.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
      '<div class="callout callout-ok"><span class="icon" data-lucide="lightbulb"></span><p>' +
      esc(c.takeaway) + "</p></div>";
    openModal(c.tag, c.title, body);
  }
  function enableTilt(card) {
    if (!window.gsap) return;
    var ry = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power2" });
    var rx = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power2" });
    card.style.transformStyle = "preserve-3d";
    card.addEventListener("pointermove", function (e) {
      var r = card.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      ry(px * 7); rx(-py * 7);
    });
    card.addEventListener("pointerleave", function () { rx(0); ry(0); });
  }
  function initBento() {
    var grid = $("#bento-grid");
    if (!grid) return;
    grid.innerHTML = APP_DATA.BENTO.map(function (c, i) {
      return '<button type="button" class="bento-card" data-i="' + i + '" aria-haspopup="dialog" tabindex="0">' +
        '<span class="bento-ic"><span class="icon" data-lucide="' + esc(c.icon) + '"></span></span>' +
        '<span class="bento-tag">' + esc(c.tag) + "</span>" +
        '<span class="bento-title">' + esc(c.title) + "</span>" +
        '<span class="bento-sum">' + esc(c.summary) + "</span>" +
        '<span class="bento-link">Buka detail <span class="icon" data-lucide="arrow-up-right"></span></span>' +
        "</button>";
    }).join("");
    initIcons();
    $$(".bento-card", grid).forEach(function (card) {
      card.addEventListener("click", function () { openBento(+card.getAttribute("data-i")); });
      if (!REDUCED) enableTilt(card);
    });
  }

  /* ---------- Timeline (studi kasus) ---------- */
  function initTimeline() {
    var tl = $("#timeline");
    if (!tl) return;
    tl.innerHTML = APP_DATA.TIMELINE.map(function (e) {
      return '<div class="tl-item" role="listitem">' +
        '<div class="tl-year">' + esc(e.year) + "</div>" +
        '<div class="tl-body"><div class="tl-title">' + esc(e.title) + "</div>" +
        '<div class="tl-text">' + esc(e.text) + "</div></div></div>";
    }).join("");
  }

  /* ---------- Formula (KaTeX, graceful fallback) ---------- */
  function renderMath(el) {
    if (!el || !el.getAttribute("data-tex")) return;
    if (window.katex && katex.renderToString) {
      try { el.innerHTML = katex.renderToString(el.getAttribute("data-tex"), { throwOnError: false, displayMode: true }); } catch (e) {}
    }
  }
  function initFormula() { renderMath($("#formula-utama")); }

  /* ---------- Scrollytelling reveals ---------- */
  function initReveals() {
    if (!window.gsap || !window.ScrollTrigger || REDUCED) return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".hero-copy > *", { opacity: 0, y: 26, duration: 0.6, stagger: 0.09, ease: "power2.out", delay: 0.1 });
    gsap.from("#hero-fig", { opacity: 0, x: 34, duration: 0.8, delay: 0.25, ease: "power2.out" });
    gsap.from(".stat-strip .stat", { opacity: 0, y: 18, duration: 0.5, stagger: 0.1, delay: 0.5, ease: "power2.out" });
    $$(".sec-body, .sec-head, .sim, .stepper, .quiz, .bento-grid").forEach(function (el) {
      gsap.from(el, { opacity: 0, y: 30, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%" } });
    });
    $$(".tl-item").forEach(function (el) {
      gsap.from(el, { opacity: 0, x: 26, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 92%" } });
    });
  }

  /* ---------- Stat count-up ---------- */
  function initStatCount() {
    if (!window.gsap || REDUCED) return;
    $$(".stat-num").forEach(function (el) {
      var raw = el.textContent.trim();
      var num = parseFloat(raw.replace(/\./g, "").replace(",", "."));
      if (isNaN(num)) return;
      var dec = raw.indexOf(",") > -1 ? 1 : 0;
      var o = { v: 0 };
      gsap.to(o, { v: num, duration: 1.3, ease: "power1.out",
        scrollTrigger: { trigger: el, start: "top 92%" },
        onUpdate: function () { el.textContent = o.v.toLocaleString("id-ID", { minimumFractionDigits: dec, maximumFractionDigits: dec }); } });
    });
  }

  /* ---------- Public API untuk feature files ---------- */
  window.TPAMain = { $: $, $$: $$, esc: esc, closeModal: closeModal, REDUCED: REDUCED };

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initIcons();
    initObjectives();
    initTheme();
    initProgress();
    initTOC();
    initGlossary();
    bindModal();
    initBento();
    initTimeline();
    initFormula();
    if (window.TPASimulator) window.TPASimulator.init(APP_DATA.SIM);
    if (window.TPAStepper) window.TPAStepper.init(APP_DATA.STEPS);
    if (window.TPAQuiz) window.TPAQuiz.init(APP_DATA.QUIZ);
    initReveals();
    initStatCount();
    initToTop();
  });
})();
