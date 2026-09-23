/**
 * bab8.js — Bab 8 Peraturan & Standar
 * Tangga Interim Target WHO & kalkulator ISPU vs AQI, Mermaid, Chart.js, KaTeX
 */
(function () {
  "use strict";
  function $(s, c) { return (c || document).querySelector(s); }
  function colors() {
    var cs = getComputedStyle(document.documentElement);
    function v(k) { return cs.getPropertyValue(k).trim(); }
    return { sage: v("--sage"), sageBg: v("--sage-bg"), terra: v("--terra"), terraBg: v("--terra-bg"), text: v("--text"), muted: v("--muted"), border: v("--border-strong"), surface: v("--surface") };
  }
  function renderFormulas() {
    if (!window.katex || !window.katex.renderToString) return;
    Array.prototype.forEach.call(document.querySelectorAll("[data-tex]"), function (el) {
      try { el.innerHTML = katex.renderToString(el.getAttribute("data-tex"), { throwOnError: false, displayMode: true }); } catch (e) {}
    });
  }
  async function renderMermaid() {
    if (!window.mermaid) return;
    var c = colors();
    mermaid.initialize({ startOnLoad: false, theme: "base", securityLevel: "strict", useMaxWidth: false, fontFamily: "'DM Sans', sans-serif", themeVariables: { primaryColor: c.sageBg, primaryBorderColor: c.sage, primaryTextColor: c.text, lineColor: c.muted, fontFamily: "'DM Sans', sans-serif", fontSize: "15px" } });
    var src = {
      "b8-hierarki": [
        "flowchart TB",
        'A["Konstitusi: hak lingkungan sehat (Pasal 28H)"] --> B["UU 32/2009 PPLH (payung)"]',
        'B --> C["PP 22/2021 Lamp.VII BMUA (25 °C,1 atm)"]',
        'C --> D["Permen LHK: P.15/2019 BME PLTU, P.14/2020 ISPU, P.13/2021 SISPEK"]',
        'D --> E["Daerah: Perda DKI 2/2005 & Pergub 210/2017 uji emisi, Kepgub 576/2023 SPPU/LEZ"]:::accent',
        "classDef accent fill:" + c.terraBg + ",stroke:" + c.terra + ",color:" + c.text + ",font-weight:600;"
      ].join("\n"),
      "b8-rezim": [
        "flowchart TB",
        'A["WHO AQG 2021 (pedoman tidak mengikat) + IT-1→4"] --> B["NAAQS AS (6 polutan, 12→9,0 2024) & EU 2024/2881 (2030 mendekati AQG)"]',
        'C["CLRTAP (1979, bukan pihak)"] --> E["AATHP 2002 → Haze-Free Roadmap 2023–2030 ke IT-3 (15 µg/m³)"]',
        'D["Stockholm POPs & Minamata Hg"] --> E',
        'E --> F["Sistem nasional: BMUA vs BME"]:::accent',
        "classDef accent fill:" + c.terraBg + ",stroke:" + c.terra + ",color:" + c.text + ",font-weight:600;"
      ].join("\n"),
      "b8-spku": [
        "flowchart TB",
        'A["SPKU KLHK (ambien, 25 °C,1 atm) + SPKU daerah"] --> C["ISPU (P.14/2020): max sub-indeks 7 parameter → 5 kategori"]',
        'B["CEMS cerobong (Permen P.15/2019) → SISPEK (P.13/2021) ke KLHK"] --> C',
        'C --> D["Perizinan: AMDAL/UKL-UPL → persetujuan lingkungan (PP 5/2021) → persetujuan teknis → PROPER/Audit"]:::accent',
        "classDef accent fill:" + c.terraBg + ",stroke:" + c.terra + ",color:" + c.text + ",font-weight:600;"
      ].join("\n")
    };
    for (var id in src) {
      var t = document.getElementById(id);
      if (!t) continue;
      try { var out = await mermaid.render(id + "-svg-" + Date.now(), src[id]); t.innerHTML = out.svg; } catch (e) { t.innerHTML = '<p class="note">Diagram tidak dapat dimuat.</p>'; }
    }
  }
  function fmt(n, d) { return Number(n).toLocaleString("id-ID", { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); }

  function initITLadder() {
    var root = $("#b8-it");
    if (!root || !APP_DATA.IT_LADDER) return;
    var cfg = APP_DATA.IT_LADDER;
    root.innerHTML =
      '<div class="b2-tool-head"><div><p class="eyebrow">Kalkulator 8.1</p><h3 class="h3">Tangga Interim Target WHO PM2.5</h3><p class="sec-desc">Geser posisi Indonesia di tangga IT-1→AQG; lihat rasio terhadap PP 22.</p></div><div class="b2-formula-mini">PP 15 µg/m³ = IT-3 (3× AQG)</div></div>' +
      '<div class="b2-tool-grid"><div class="b2-tool-controls">' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b8-pm25-it">Konsentrasi tahunan PM2.5 tujuan</label><span class="b2-range-value" id="b8-it-val"></span></div><input class="range" type="range" id="b8-pm25-it" min="5" max="35" step="1" value="15"><div class="b2-range-meta"><span>5 AQG</span><span>35 IT-1</span></div><div style="margin-top:.5rem;display:flex;gap:.4rem;flex-wrap:wrap"><button type="button" class="btn btn-ghost" data-it="5">AQG 5</button><button type="button" class="btn btn-ghost" data-it="10">IT-4 10</button><button type="button" class="btn btn-ghost" data-it="15">PP 15 (IT-3)</button><button type="button" class="btn btn-ghost" data-it="25">IT-2 25</button><button type="button" class="btn btn-ghost" data-it="35">IT-1 35</button></div></div>' +
      '</div><div class="b2-tool-output"><div class="b2-output-hero"><span class="b2-output-label">Posisi di tangga</span><strong id="b8-it-label">IT-3</strong><span id="b8-it-desc">PP 22 Indonesia</span></div>' +
      '<div class="b2-metrics"><div><span>Rasio vs AQG 5</span><strong id="b8-it-ratio">3,0×</strong></div><div><span>Indeks mortalitas</span><strong id="b8-it-mort">108</strong></div><div><span>vs EU 2030 / NAAQS</span><strong id="b8-it-peers">-</strong></div></div>' +
      '<div class="ispu-band-row" id="b8-it-bar" aria-hidden="true" style="height:16px;border-radius:9px;overflow:hidden;display:flex;border:1px solid var(--border)"><span style="flex:1;background:var(--ispu-berbahaya)" title="IT-1"></span><span style="flex:1;background:var(--ispu-sangat)" title="IT-2"></span><span style="flex:1;background:var(--ispu-tidak)" title="IT-3"></span><span style="flex:1;background:var(--ispu-sedang)" title="IT-4"></span><span style="flex:1;background:var(--ispu-baik)" title="AQG"></span></div>' +
      '<p class="note" id="b8-it-note"></p></div></div>';
    var inp = $("#b8-pm25-it");
    function render() {
      var v = Number(inp.value);
      $("#b8-it-val").textContent = v + " µg/m³";
      var label = v <= 5 ? "AQG" : v <= 10 ? "IT-4" : v <= 15 ? "IT-3" : v <= 25 ? "IT-2" : "IT-1";
      var desc = v === 15 ? "PP 22 Indonesia (IT-3)" : v === 5 ? "WHO AQG akhir" : v === 10 ? "EU 2030 & IT-4" : v === 9 ? "NAAQS 2024" : v <= 10 ? "IT-4" : "—";
      $("#b8-it-label").textContent = label;
      $("#b8-it-desc").textContent = desc;
      $("#b8-it-ratio").textContent = (v / 5).toFixed(1).replace(".", ",") + "×";
      var idxMap = { 35: 124, 25: 116, 15: 108, 10: 104, 5: 100 };
      var mort = idxMap[v] || (v <= 10 ? 104 + (10 - v) * 0.8 : v <= 15 ? 108 + (15 - v) * 0.8 : v <= 25 ? 116 - (25 - v) * 0.8 : 124);
      $("#b8-it-mort").textContent = Math.round(mort);
      $("#b8-it-peers").textContent = "EU 10 | US 9,0";
      $("#b8-it-note").textContent = "Pada " + v + " µg/m³ → " + label + " (indeks mortalitas ±" + Math.round(mort) + " vs 100 di AQG). Turun IT-1→AQG kurangi mortalitas ~20% (124→100).";
    }
    inp.addEventListener("input", render);
    root.querySelectorAll("[data-it]").forEach(function (b) { b.addEventListener("click", function () { inp.value = b.getAttribute("data-it"); render(); }); });
    render();
  }

  // ISPU vs AQI — simplified breakpoint interpolation for PM2.5
  var ispuBP = [
    { cLo: 0, cHi: 15.4, iLo: 0, iHi: 50 },
    { cLo: 15.5, cHi: 55.4, iLo: 51, iHi: 100 },
    { cLo: 55.5, cHi: 150.4, iLo: 101, iHi: 200 },
    { cLo: 150.5, cHi: 250.4, iLo: 201, iHi: 300 },
    { cLo: 250.5, cHi: 500, iLo: 301, iHi: 500 }
  ];
  var aqiBP = [
    { cLo: 0, cHi: 9.0, iLo: 0, iHi: 50 },
    { cLo: 9.1, cHi: 35.4, iLo: 51, iHi: 100 },
    { cLo: 35.5, cHi: 55.4, iLo: 101, iHi: 150 },
    { cLo: 55.5, cHi: 125.4, iLo: 151, iHi: 200 },
    { cLo: 125.5, cHi: 225.4, iLo: 201, iHi: 300 },
    { cLo: 225.5, cHi: 500, iLo: 301, iHi: 500 }
  ];
  function interp(c, bps) {
    for (var i = 0; i < bps.length; i++) {
      var b = bps[i];
      if (c >= b.cLo && c <= b.cHi) {
        var I = (b.iHi - b.iLo) / (b.cHi - b.cLo) * (c - b.cLo) + b.iLo;
        return { I: Math.round(I), b: b };
      }
    }
    return c > 500 ? { I: 500, b: bps[bps.length - 1] } : { I: 0, b: bps[0] };
  }
  function catISPU(I) { if (I <= 50) return "Baik"; if (I <= 100) return "Sedang"; if (I <= 200) return "Tidak Sehat"; if (I <= 300) return "Sangat Tidak Sehat"; return "Berbahaya"; }
  function catAQI(I) { if (I <= 50) return "Good"; if (I <= 100) return "Moderate"; if (I <= 150) return "Unhealthy for Sensitive"; if (I <= 200) return "Unhealthy"; if (I <= 300) return "Very Unhealthy"; return "Hazardous"; }

  function initISPUAQI() {
    var root = $("#b8-ispu-aqi");
    if (!root) return;
    root.innerHTML =
      '<div class="b2-tool-head"><div><p class="eyebrow">Kalkulator 8.2</p><h3 class="h3">ISPU vs AQI untuk PM2.5</h3><p class="sec-desc">Konsentrasi sama → indeks & kategori berbeda karena jangkar BMUA berbeda.</p></div><div class="b2-formula-mini">I = (I<sub>hi</sub>−I<sub>lo</sub>)/(C<sub>hi</sub>−C<sub>lo</sub>)×(C−C<sub>lo</sub>)+I<sub>lo</sub></div></div>' +
      '<div class="b2-tool-grid"><div class="b2-tool-controls">' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b8-pm25">PM2.5 (µg/m³, 24 jam efektif)</label><span class="b2-range-value" id="b8-pm25-out"></span></div><input class="range" type="range" id="b8-pm25" min="0" max="200" step="1" value="35"><div class="b2-range-meta"><span>0</span><span>200</span></div><div style="margin-top:.5rem;display:flex;gap:.4rem;flex-wrap:wrap"><button type="button" class="btn btn-ghost" data-pm="15">15 WHO 24j</button><button type="button" class="btn btn-ghost" data-pm="35">35 NAAQS 24j</button><button type="button" class="btn btn-ghost" data-pm="55">55 BMUA 24j</button><button type="button" class="btn btn-ghost" data-pm="68">68 contoh SPKU</button></div></div>' +
      '</div><div class="b2-tool-output"><div style="display:grid;grid-template-columns:1fr 1fr;gap:.8rem"><div class="b2-output-hero" style="margin-bottom:0;border-left:4px solid var(--ispu-baik)"><span class="b2-output-label">ISPU (ID)</span><strong id="b8-ispu-val">0</strong><span id="b8-ispu-cat">Baik</span></div><div class="b2-output-hero" style="margin-bottom:0;border-left:4px solid var(--ispu-baik)"><span class="b2-output-label">AQI (US)</span><strong id="b8-aqi-val">0</strong><span id="b8-aqi-cat">Good</span></div></div>' +
      '<div style="display:flex;gap:.8rem;margin-top:.8rem"><span id="b8-ispu-color" style="flex:1;height:14px;border-radius:9px;background:var(--ispu-baik);border:1px solid var(--border)"></span><span id="b8-aqi-color" style="flex:1;height:14px;border-radius:9px;background:var(--ispu-baik);border:1px solid var(--border)"></span></div>' +
      '<p class="note" id="b8-compare-note" style="margin-top:.6rem"></p><p class="sim-hint">Breakpoint PM2.5: ISPU 15,5→50 vs AQI 9,0→50 (pasca-2024). Pada 30 µg/m³, AQI sudah 89 (Moderate) sementara ISPU 73 (Sedang).</p></div></div>';
    var inp = $("#b8-pm25");
    function colorFor(cat) {
      if (cat === "Baik" || cat === "Good") return "var(--ispu-baik)";
      if (cat === "Sedang" || cat === "Moderate") return "var(--ispu-sedang)";
      if (cat.indexOf("Sensitive") !== -1) return "#E67E22";
      if (cat === "Tidak Sehat" || cat === "Unhealthy") return "var(--ispu-tidak)";
      if (cat === "Sangat Tidak Sehat" || cat === "Very Unhealthy") return "var(--ispu-sangat)";
      return "var(--ispu-berbahaya)";
    }
    function render() {
      var c = Number(inp.value);
      $("#b8-pm25-out").textContent = c + " µg/m³";
      var rI = interp(c, ispuBP), rA = interp(c, aqiBP);
      var cI = catISPU(rI.I), cA = catAQI(rA.I);
      $("#b8-ispu-val").textContent = rI.I;
      $("#b8-ispu-cat").textContent = cI;
      $("#b8-aqi-val").textContent = rA.I;
      $("#b8-aqi-cat").textContent = cA;
      $("#b8-ispu-color").style.background = colorFor(cI);
      $("#b8-aqi-color").style.background = colorFor(cA);
      $("#b8-compare-note").textContent = "Pada " + c + " µg/m³: ISPU " + rI.I + " (" + cI + ") vs AQI " + rA.I + " (" + cA + "). ISPU 5 kategori (101–200 satu ‘Tidak Sehat’) vs AQI 6 kategori (101–150 sensitif →151–200).";
    }
    inp.addEventListener("input", render);
    root.querySelectorAll("[data-pm]").forEach(function (b) { b.addEventListener("click", function () { inp.value = b.getAttribute("data-pm"); render(); }); });
    render();
  }

  var charts = {};
  function buildCharts() {
    if (!window.Chart) return;
    var c = colors();
    Chart.defaults.font.family = "'IBM Plex Mono', monospace";
    Chart.defaults.font.size = 11;
    Chart.defaults.color = c.muted;
    var elGap = $("#chart-gap");
    if (elGap && APP_DATA.CHART_GAP) {
      if (charts.gap) charts.gap.destroy();
      charts.gap = new Chart(elGap, {
        type: "bar",
        data: {
          labels: APP_DATA.CHART_GAP.labels,
          datasets: [
            { label: "PP 22/2021", data: APP_DATA.CHART_GAP.pp, backgroundColor: c.terra, borderRadius: 7, maxBarThickness: 42 },
            { label: "WHO AQG", data: APP_DATA.CHART_GAP.who, backgroundColor: c.sage, borderRadius: 7, maxBarThickness: 42 },
            { label: "NAAQS", data: APP_DATA.CHART_GAP.nAAQS, backgroundColor: "#9BBE8A", borderRadius: 7, maxBarThickness: 42 },
            { label: "EU 2030", data: APP_DATA.CHART_GAP.eu, backgroundColor: "#C6A87A", borderRadius: 7, maxBarThickness: 42 }
          ]
        },
        options: {
          maintainAspectRatio: false,
          plugins: { legend: { position: "bottom", labels: { boxWidth: 12, padding: 12, usePointStyle: true } }, tooltip: { callbacks: { label: function (ctx) { return " " + ctx.dataset.label + ": " + ctx.parsed.y.toLocaleString("id-ID") + " µg/m³"; } } } },
          scales: { y: { beginAtZero: true, grid: { color: c.border }, title: { display: true, text: "µg/m³" } }, x: { grid: { display: false } } }
        }
      });
      var cap = $("#cap-gap"); if (cap) cap.textContent = APP_DATA.CHART_GAP.caption;
    }
    var elBreak = $("#chart-break");
    if (elBreak && APP_DATA.CHART_ISPU_BREAK) {
      if (charts.break) charts.break.destroy();
      charts.break = new Chart(elBreak, {
        type: "line",
        data: {
          labels: [0, 10, 20, 40, 60, 100, 160, 260, 500],
          datasets: [
            { label: "ISPU", data: [0, 32, 60, 85, 110, 150, 210, 310, 500], borderColor: c.terra, backgroundColor: "transparent", tension: 0.25, pointRadius: 0, borderWidth: 2.5 },
            { label: "AQI", data: [0, 55, 70, 102, 135, 165, 210, 315, 500], borderColor: c.sage, backgroundColor: "transparent", tension: 0.25, pointRadius: 0, borderWidth: 2.5 }
          ]
        },
        options: {
          maintainAspectRatio: false,
          plugins: { legend: { position: "bottom", labels: { boxWidth: 12, usePointStyle: true } } },
          scales: { y: { beginAtZero: true, grid: { color: c.border }, title: { display: true, text: "Indeks" } }, x: { grid: { display: false }, title: { display: true, text: "PM2.5 µg/m³" } } }
        }
      });
      var cap2 = $("#cap-break"); if (cap2) cap2.textContent = APP_DATA.CHART_ISPU_BREAK.caption;
    }
  }
  function initThemeWatch() {
    if (!window.MutationObserver) return;
    var last = document.documentElement.getAttribute("data-theme");
    new MutationObserver(function () { var cur = document.documentElement.getAttribute("data-theme"); if (cur === last) return; last = cur; buildCharts(); renderMermaid(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  }
  function init() { renderFormulas(); renderMermaid(); initITLadder(); initISPUAQI(); buildCharts(); initThemeWatch(); }
  document.addEventListener("DOMContentLoaded", init);
})();
