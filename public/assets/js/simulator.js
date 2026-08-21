/**
 * simulator.js — Simulasi "Beban ke TPA": W ≈ Q × (1 − ηr) × (1 − ηp).
 * Tiga slider (Q, ηr, ηp) + preset Tabel 1.1 (A–D). Dijalankan oleh
 * main.js lewat TPASimulator.init(config).
 */
(function () {
  "use strict";

  var state = { q: 400, etaR: 20, etaP: 40 };
  var cfg = null;

  function fmt(n, dec) {
    return n.toLocaleString("id-ID", { minimumFractionDigits: dec, maximumFractionDigits: dec });
  }

  function compute() {
    var frac = (1 - state.etaR / 100) * (1 - state.etaP / 100);
    var beban = state.q * frac;
    return { frac: frac, beban: beban, diverted: state.q - beban, pct: frac * 100, umur: 1 / frac, yearly: beban * 365 };
  }

  function buildControls(c) {
    var box = document.getElementById("sim-controls");
    if (!box) return;
    var html = '<div class="sim-slider-row">';
    [["q", c.q], ["etaR", c.etaR], ["etaP", c.etaP]].forEach(function (entry) {
      var key = entry[0], p = entry[1];
      var fmtVal = key === "q" ? fmt(state[key], 0) : state[key];
      html += '<div class="sim-slider" data-k="' + key + '">' +
        '<div class="sim-sl-head"><label class="sim-sl-label" for="sl-' + key + '">' + p.label + "</label>" +
        '<output class="sim-sl-val" id="sl-out-' + key + '">' + fmtVal + " " + p.unit + "</output></div>" +
        '<input type="range" id="sl-' + key + '" class="range" min="' + p.min + '" max="' + p.max +
        '" step="' + p.step + '" value="' + state[key] + '" aria-label="' + p.label + '">' +
        '<div class="sim-sl-minmax"><span>' + p.min + "</span><span>" + p.max + " " + p.unit + "</span></div>" +
        "</div>";
    });
    html += "</div>";
    html += '<div class="sim-presets" role="group" aria-label="Preset skenario Tabel 1.1">' +
      c.presets.map(function (pr, i) {
        return '<button type="button" class="preset-btn" data-i="' + i + '">' + pr.label + "</button>";
      }).join("") + "</div>";
    box.innerHTML = html;
  }

  function buildReadout() {
    var out = document.getElementById("sim-readout");
    if (!out) return;
    out.innerHTML =
      '<div class="formula small" id="sim-formula"></div>' +
      '<div class="sim-stats">' +
      '<div class="sim-stat card"><span class="sim-stat-lbl">Beban ke TPA</span><span class="sim-stat-val" id="out-beban">0</span><span class="sim-stat-unit">ton/hari</span></div>' +
      '<div class="sim-stat card"><span class="sim-stat-lbl">% dari timbulan</span><span class="sim-stat-val" id="out-pct">0</span><span class="sim-stat-unit">%</span></div>' +
      '<div class="sim-stat card"><span class="sim-stat-lbl">Umur pakai relatif</span><span class="sim-stat-val" id="out-umur">1,0</span><span class="sim-stat-unit">×</span></div>' +
      '<div class="sim-stat card"><span class="sim-stat-lbl">Perkiraan per tahun</span><span class="sim-stat-val" id="out-tahun">0</span><span class="sim-stat-unit">ton</span></div>' +
      "</div>" +
      '<div class="bar"><div class="bar-track">' +
      '<div class="bar-seg bar-diverted" id="bar-diverted"></div>' +
      '<div class="bar-seg bar-to-lpa" id="bar-to-lpa"></div></div>' +
      '<div class="bar-legend">' +
      '<span class="bar-d legend"><i class="sw sw-d"></i>Dilimpahkan di hulu</span>' +
      '<span class="bar-l legend"><i class="sw sw-l"></i>Masuk TPA</span></div></div>' +
      '<p class="sim-hint" id="sim-hint"></p>';
  }

  function renderFormula() {
    var el = document.getElementById("sim-formula");
    if (!el) return;
    var r = compute();
    var fracR = (1 - state.etaR / 100);
    var fracP = (1 - state.etaP / 100);
    var tex = "W \\approx " + state.q + " \\times (" + fracR.toFixed(2) + ") \\times (" + fracP.toFixed(2) +
      ") = " + fmt(r.beban, 0);
    if (window.katex && katex.renderToString) {
      try { el.innerHTML = katex.renderToString(tex, { throwOnError: false, displayMode: true }); return; } catch (e) {}
    }
    el.textContent = "W ≈ " + state.q + " × (" + fracR.toFixed(2) + ") × (" + fracP.toFixed(2) + ") = " + fmt(r.beban, 0) + " ton/hari";
  }
  function update() {
    var r = compute();
    function set(id, val) { var el = document.getElementById(id); if (el) el.textContent = val; }
    set("out-beban", fmt(r.beban, r.beban < 50 ? 1 : 0));
    set("out-pct", fmt(r.pct, 1));
    set("out-umur", r.umur.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 }));
    set("out-tahun", fmt(r.yearly, 0));
    var bd = document.getElementById("bar-diverted");
    var bl = document.getElementById("bar-to-lpa");
    if (bd) bd.style.width = (r.diverted / state.q * 100) + "%";
    if (bl) bl.style.width = (r.beban / state.q * 100) + "%";
    var hint = document.getElementById("sim-hint");
    if (hint) {
      hint.textContent = "Dari " + fmt(state.q, 0) + " ton/hari timbulan, sekitar " +
        fmt(r.beban, r.beban < 50 ? 1 : 0) + " ton/hari (≈" + fmt(r.pct, 1) + "%) benar-benar masuk TPA; sisanya (" +
        fmt(r.diverted, 0) + " ton/hari) dilimpahkan di hulu. Makin tinggi ηr dan ηp, umur pakai TPA meluas secara multiplikatif.";
    }
    renderFormula();
  }

  function markPreset() {
    var btns = document.querySelectorAll(".preset-btn");
    btns.forEach(function (b) {
      var pr = cfg.presets[+b.getAttribute("data-i")];
      b.classList.toggle("active", pr && pr.etaR === state.etaR && pr.etaP === state.etaP);
    });
  }

  function init(config) {
    cfg = config || ((window.APP_DATA && window.APP_DATA.SIM) ? window.APP_DATA.SIM : null);
    if (!cfg) { window.TPASimulator = { init: init }; return; }
    state.q = cfg.q.def; state.etaR = cfg.etaR.def; state.etaP = cfg.etaP.def;
    buildControls(cfg);
    buildReadout();
    var box = document.getElementById("sim-controls");
    if (box) {
      ["q", "etaR", "etaP"].forEach(function (key) {
        var input = document.getElementById("sl-" + key);
        if (!input) return;
        input.addEventListener("input", function () {
          state[key] = +input.value;
          var out = document.getElementById("sl-out-" + key);
          if (out) out.textContent = fmt(state[key], key === "q" ? 0 : 0) + " " + cfg[key].unit;
          update();
          markPreset();
        });
      });
      box.addEventListener("click", function (e) {
        var pbtn = e.target.closest(".preset-btn");
        if (!pbtn) return;
        var pr = cfg.presets[+pbtn.getAttribute("data-i")];
        if (!pr) return;
        state.etaR = pr.etaR; state.etaP = pr.etaP;
        var iR = document.getElementById("sl-etaR"); if (iR) iR.value = state.etaR;
        var iP = document.getElementById("sl-etaP"); if (iP) iP.value = state.etaP;
        var oR = document.getElementById("sl-out-etaR"); if (oR) oR.textContent = state.etaR + " %";
        var oP = document.getElementById("sl-out-etaP"); if (oP) oP.textContent = state.etaP + " %";
        update();
        markPreset();
      });
    }
    update();
    markPreset();
  }

  window.TPASimulator = { init: init };
})();