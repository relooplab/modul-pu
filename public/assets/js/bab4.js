/**
 * bab4.js — interaksi khusus Bab 4: Parameter & Pemantauan.
 * Konverter ppm↔µg/m³ (dengan T,P), kalkulator ISPU PM2.5,
 * diagram Mermaid, grafik Chart.js, KaTeX.
 */
(function () {
  "use strict";
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
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
    var sources = {
      "b4-param": [
        "flowchart TB",
        'A["Parameter: PM (TSP/PM10/PM2.5/UFP) + gas kriteria + HC/PAH + HAP + emerging (BC/NH3/mikroplastik)"] --> B["SNI 7119 manual & SNI 7117 emisi"]',
        'A --> C["Analizer kontinu SPKU (FRM/FEM)"]',
        'B --> D["Pemantauan & QA/QC"]:::accent',
        'C --> D', 'E["Passive sampler (Palmes/Ogawa)"] --> D',
        "classDef accent fill:" + c.terraBg + ",stroke:" + c.terra + ",color:" + c.text + ",font-weight:600;"
      ].join("\n"),
      "b4-modern": [
        "flowchart TB",
        'A["SPKU referensi (jarang, FRM/FEM)"] --> D["Data fusion: peta resolusi km"]:::accent',
        'B["LCS IoT padat (R2 0,2-0,58 -> 0,72)"] --> D',
        'C["TROPOMI kolom 7x3,5 km (NO2/HCHO)"] --> D',
        'E["LIDAR profil vertikal PBL/asap"] --> D',
        "classDef accent fill:" + c.terraBg + ",stroke:" + c.terra + ",color:" + c.text + ",font-weight:600;"
      ].join("\n"),
      "b4-satuan": [
        "flowchart TB",
        'A["Konsentrasi aktual (T,P)"] --> B["Koreksi ke acuan 25 C, 1 atm: C_acuan = C_aktual x T/298,15 x 1/P"]',
        'B --> C["Konversi ppm <-> ug/m3: C(ug/m3)=C(ppm) x BM x 40,9 (jika 25 C)"]',
        'C --> D["Pilih waktu rata-rata yang sama (1/8/24 jam/tahun) -> ISPU"]:::accent',
        "classDef accent fill:" + c.terraBg + ",stroke:" + c.terra + ",color:" + c.text + ",font-weight:600;"
      ].join("\n")
    };
    for (var id in sources) {
      var t = document.getElementById(id);
      if (!t) continue;
      try { var out = await mermaid.render(id + "-svg-" + Date.now(), sources[id]); t.innerHTML = out.svg; } catch (e) { t.innerHTML = '<p class="note">Diagram tidak dapat dimuat.</p>'; }
    }
  }
  function formatId(n, digits) { return Number(n).toLocaleString("id-ID", { minimumFractionDigits: digits || 0, maximumFractionDigits: digits || 0 }); }

  function initConverter() {
    var root = $("#b4-converter");
    if (!root || !APP_DATA.CONVERTER) return;
    var cfg = APP_DATA.CONVERTER;
    var cur = cfg.gases.find(function (g) { return g.id === cfg.defaultGas; }) || cfg.gases[0];
    root.innerHTML =
      '<div class="b2-tool-head"><div><p class="eyebrow">Kalkulator 4.1</p><h3 class="h3">ppm ↔ µg/m³ (dengan koreksi T, P)</h3><p class="sec-desc">Kondisi acuan PP 22/2021: 25 °C, 1 atm → 40,9 × BM. Pada 0 °C (basis Nm³) faktor = BM / 22,4 × 1000.</p></div><div class="b2-formula-mini">C(µg/m³)=C(ppm)×BM×40,9</div></div>' +
      '<div class="b2-tool-grid"><div class="b2-tool-controls">' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b4-gas">Gas</label></div><select class="b2-select" id="b4-gas" aria-label="Pilih gas">' + cfg.gases.map(function (g) { return '<option value="' + g.id + '"' + (g.id === cur.id ? " selected" : "") + '>' + g.label + ' · BM ' + g.mw + ' g/mol</option>'; }).join("") + '</select></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b4-ppm">Konsentrasi volume</label><span class="b2-range-value" id="b4-ppm-out"></span></div><input class="range" type="range" id="b4-ppm" min="0" max="1" step="0.001" value="' + (cfg.defaultPpb / 1000) + '" aria-label="ppm"><div class="b2-range-meta"><span>0 ppm</span><span>1 ppm</span></div><div class="b2-range-head" style="margin-top:.35rem"><label for="b4-ppb-input">atau ppb</label></div><input class="b2-select" id="b4-ppb-input" type="number" step="1" value="' + cfg.defaultPpb + '" aria-label="ppb" style="text-align:right"></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b4-T">Suhu acuan T</label><span class="b2-range-value" id="b4-T-out"></span></div><input class="range" type="range" id="b4-T" min="0" max="40" step="1" value="' + cfg.defaultT + '"><div class="b2-range-meta"><span>0 °C</span><span>40 °C</span></div></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b4-P">Tekanan P</label><span class="b2-range-value" id="b4-P-out"></span></div><input class="range" type="range" id="b4-P" min="0.8" max="1.2" step="0.02" value="' + cfg.defaultP + '"><div class="b2-range-meta"><span>0,8 atm</span><span>1,2 atm</span></div></div>' +
      '</div><div class="b2-tool-output"><div class="b2-output-hero"><span class="b2-output-label">Konsentrasi massa (acuan)</span><strong id="b4-ug-out">0</strong><span>µg/m³</span></div>' +
      '<div class="b2-metrics"><div><span>Vm (L/mol)</span><strong id="b4-Vm">24,45</strong></div><div><span>Faktor BM×(1000/Vm)</span><strong id="b4-fac">0</strong></div><div><span>Nilai pada 0 °C</span><strong id="b4-zero">0</strong></div></div>' +
      '<p class="note" id="b4-formula"></p><p class="sim-hint">Koreksi: C_acuan = C_aktual × T(K)/298,15 × 1/P. Gunakan always basis yang sama sebelum membandingkan terhadap baku mutu (mis. CO 10.000 µg/m³ ≈8,7 ppm pada 25 °C).</p></div></div>';
    var selGas = $("#b4-gas"), inpPpm = $("#b4-ppm"), inpPpb = $("#b4-ppb-input"), inpT = $("#b4-T"), inpP = $("#b4-P");
    function render() {
      var gas = cfg.gases.find(function (g) { return g.id === selGas.value; }) || cfg.gases[0];
      var ppm = Number(inpPpm.value);
      // sync ppb input if not focused? Just sync both ways
      var T = Number(inpT.value), P = Number(inpP.value);
      var Vm = 0.08206 * (T + 273.15) / P; // L/mol, with R=0.08206 L atm /mol K
      // For ppb input overriding ppm, if user edited ppb field recently? Use ppm slider as master, update ppb
      // Detect which changed: if active is ppb input, use it
      var activeIsPpb = document.activeElement === inpPpb;
      if (activeIsPpb) {
        ppm = Number(inpPpb.value) / 1000;
        inpPpm.value = String(ppm);
      } else {
        inpPpb.value = String(Math.round(ppm * 1000));
      }
      var ug = ppm * gas.mw / Vm * 1000;
      var Vm0 = 22.414; // at 0C 1 atm approx
      var ug0 = ppm * gas.mw / Vm0 * 1000;
      $("#b4-ppm-out").textContent = ppm.toLocaleString("id-ID", { maximumFractionDigits: 3 }) + " ppm (" + Math.round(ppm * 1000).toLocaleString("id-ID") + " ppb)";
      $("#b4-T-out").textContent = T + " °C (" + (T + 273.15).toLocaleString("id-ID") + " K)";
      $("#b4-P-out").textContent = P.toLocaleString("id-ID", { minimumFractionDigits: 2 }) + " atm";
      $("#b4-ug-out").textContent = ug.toLocaleString("id-ID", { maximumFractionDigits: 1 });
      $("#b4-Vm").textContent = Vm.toLocaleString("id-ID", { maximumFractionDigits: 2 });
      $("#b4-fac").textContent = (1000 / Vm).toLocaleString("id-ID", { maximumFractionDigits: 1 }) + " × BM";
      $("#b4-zero").textContent = ug0.toLocaleString("id-ID", { maximumFractionDigits: 1 }) + " µg/m³";
      $("#b4-formula").textContent = "C = " + ppm.toLocaleString("id-ID", { maximumFractionDigits: 4 }) + " ppm × " + gas.mw + " / " + Vm.toLocaleString("id-ID", { maximumFractionDigits: 2 }) + " × 1000 = " + ug.toLocaleString("id-ID", { maximumFractionDigits: 1 }) + " µg/m³ (pada " + T + " °C, " + P + " atm)";
    }
    selGas.addEventListener("change", render);
    inpPpm.addEventListener("input", render);
    inpPpb.addEventListener("input", render);
    inpT.addEventListener("input", render);
    inpP.addEventListener("input", render);
    render();
  }

  function initISPU() {
    var root = $("#b4-ispu");
    if (!root || !APP_DATA.ISPU) return;
    var cfg = APP_DATA.ISPU;
    function calcISPU(c) {
      if (c < 0) return null;
      if (c > 500) return { ispu: 500, cat: "Berbahaya", overflow: true };
      for (var i = 0; i < cfg.pm25_breakpoints.length; i++) {
        var b = cfg.pm25_breakpoints[i];
        if (c >= b.cLow && c <= b.cHigh) {
          var ispu = ((b.iHigh - b.iLow) / (b.cHigh - b.cLow)) * (c - b.cLow) + b.iLow;
          return { ispu: Math.round(ispu), cat: b.cat, b: b };
        }
      }
      return null;
    }
    function catColor(cat) {
      if (cat === "Baik") return "var(--ispu-baik)";
      if (cat === "Sedang") return "var(--ispu-sedang)";
      if (cat === "Tidak Sehat") return "var(--ispu-tidak)";
      if (cat === "Sangat Tidak Sehat") return "var(--ispu-sangat)";
      return "var(--ispu-berbahaya)";
    }
    root.innerHTML =
      '<div class="b2-tool-head"><div><p class="eyebrow">Kalkulator 4.2</p><h3 class="h3">ISPU PM₂.₅ (Permen P.14/2020)</h3><p class="sec-desc">Interpolasi linier antar breakpoint; kategori 0–50 Baik … ≥300 Berbahaya.</p></div><div class="b2-formula-mini">I = (I<sub>hi</sub>−I<sub>lo</sub>)/(C<sub>hi</sub>−C<sub>lo</sub>) × (C−C<sub>lo</sub>)+I<sub>lo</sub></div></div>' +
      '<div class="b2-tool-grid"><div class="b2-tool-controls">' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b4-pm25">Konsentrasi PM₂.₅ (µg/m³)</label><span class="b2-range-value" id="b4-pm25-out"></span></div><input class="range" type="range" id="b4-pm25" min="0" max="300" step="1" value="' + cfg.defaultPM25 + '"><div class="b2-range-meta"><span>0</span><span>300 → 500 via clamp</span></div>' +
      '<div style="margin-top:.6rem;display:flex;gap:.5rem"><input class="b2-select" id="b4-pm25-num" type="number" value="' + cfg.defaultPM25 + '" style="flex:1;text-align:right" aria-label="PM2.5 numerik"><button type="button" class="btn btn-ghost" id="b4-pm25-35" style="flex:none">35,5 (ILL)</button><button type="button" class="btn btn-ghost" id="b4-pm25-55" style="flex:none">55 (BM 24j)</button></div></div>' +
      '</div><div class="b2-tool-output"><div class="b2-output-hero" id="b4-ispu-hero" style="border-left:6px solid var(--border)"><span class="b2-output-label">ISPU</span><strong id="b4-ispu-val">0</strong><span id="b4-ispu-cat">Baik</span></div>' +
      '<div class="ispu-band-row" id="b4-ispu-bar" aria-hidden="true" style="height:14px;border-radius:9px;overflow:hidden;display:flex;margin-bottom:.8rem;border:1px solid var(--border)"><span style="flex:1;background:var(--ispu-baik)"></span><span style="flex:1;background:var(--ispu-sedang)"></span><span style="flex:1;background:var(--ispu-tidak)"></span><span style="flex:1;background:var(--ispu-sangat)"></span><span style="flex:1;background:var(--ispu-berbahaya)"></span></div>' +
      '<p class="note" id="b4-ispu-formula"></p><p class="sim-hint">ISPU dihitung per polutan; ISPU wilayah = nilai tertinggi antar 7 parameter ISPU (PM₁₀, PM₂.₅, SO₂, CO, O₃, NO₂, HC). Baku mutu ≠ ISPU; bandingkan hanya pada waktu rata-rata yang sama.</p></div></div>';
    var inp = $("#b4-pm25"), inpNum = $("#b4-pm25-num");
    function render() {
      var c = Number(inp.value);
      inpNum.value = String(c);
      $("#b4-pm25-out").textContent = c.toLocaleString("id-ID") + " µg/m³";
      var r = calcISPU(c);
      if (!r) { $("#b4-ispu-val").textContent = "—"; $("#b4-ispu-cat").textContent = "—"; return; }
      $("#b4-ispu-val").textContent = String(r.ispu);
      $("#b4-ispu-cat").textContent = r.cat + (r.overflow ? " (≥300)" : "");
      $("#b4-ispu-hero").style.borderLeftColor = catColor(r.cat);
      $("#b4-ispu-hero").style.background = "var(--surface-2)";
      if (r.b) {
        $("#b4-ispu-formula").textContent = "I = (" + r.b.iHigh + "−" + r.b.iLow + ")/(" + r.b.cHigh + "−" + r.b.cLow + ") × (" + c + "−" + r.b.cLow + ") + " + r.b.iLow + " = " + r.ispu + " → " + r.cat;
      } else $("#b4-ispu-formula").textContent = "ISPU = " + r.ispu + " → " + r.cat;
    }
    inp.addEventListener("input", render);
    inpNum.addEventListener("input", function () { inp.value = inpNum.value; render(); });
    $("#b4-pm25-35").addEventListener("click", function () { inp.value = "35"; render(); });
    $("#b4-pm25-55").addEventListener("click", function () { inp.value = "55"; render(); });
    render();
  }

  var charts = {};
  function buildCharts() {
    if (!window.Chart) return;
    var c = colors();
    Chart.defaults.font.family = "'IBM Plex Mono', monospace";
    Chart.defaults.font.size = 11;
    Chart.defaults.color = c.muted;
    var elB = $("#chart-baku");
    if (elB && APP_DATA.CHART_BAKU) {
      if (charts.baku) charts.baku.destroy();
      charts.baku = new Chart(elB, {
        type: "bar",
        data: {
          labels: APP_DATA.CHART_BAKU.labels,
          datasets: [
            { label: "PP 22/2021", data: APP_DATA.CHART_BAKU.pp, backgroundColor: c.terra, borderRadius: 7, maxBarThickness: 42 },
            { label: "WHO AQG 2021", data: APP_DATA.CHART_BAKU.who, backgroundColor: c.sage, borderRadius: 7, maxBarThickness: 42 }
          ]
        },
        options: {
          maintainAspectRatio: false,
          plugins: { legend: { position: "bottom", labels: { boxWidth: 12, padding: 12, usePointStyle: true } }, tooltip: { callbacks: { label: function (ctx) { return " " + ctx.dataset.label + ": " + ctx.parsed.y.toLocaleString("id-ID") + " µg/m³"; } } } },
          scales: { y: { beginAtZero: true, grid: { color: c.border }, title: { display: true, text: "µg/m³", color: c.muted } }, x: { grid: { display: false } } }
        }
      });
      var cap = $("#cap-baku"); if (cap) cap.textContent = APP_DATA.CHART_BAKU.caption;
    }
    var elM = $("#chart-micro");
    if (elM && APP_DATA.CHART_MICRO) {
      if (charts.micro) charts.micro.destroy();
      var vals = APP_DATA.CHART_MICRO.data;
      charts.micro = new Chart(elM, {
        type: "bar",
        data: { labels: APP_DATA.CHART_MICRO.labels, datasets: [{ label: "partikel / 2 jam", data: vals, backgroundColor: vals.map(function (v, i) { return i === 0 ? c.terra : c.sage; }), borderRadius: 8, maxBarThickness: 56 }] },
        options: { maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: c.border } }, x: { grid: { display: false } } } }
      });
      var cap2 = $("#cap-micro"); if (cap2) cap2.textContent = APP_DATA.CHART_MICRO.caption;
    }
    var elS = $("#chart-spku");
    if (elS && APP_DATA.CHART_SPKU) {
      if (charts.spku) charts.spku.destroy();
      charts.spku = new Chart(elS, {
        type: "bar",
        data: { labels: APP_DATA.CHART_SPKU.labels, datasets: [{ label: "Jumlah SPKU", data: APP_DATA.CHART_SPKU.data, backgroundColor: c.sage, borderRadius: 8, maxBarThickness: 56 }] },
        options: { maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: c.border } }, x: { grid: { display: false } } } }
      });
      var cap3 = $("#cap-spku"); if (cap3) cap3.textContent = APP_DATA.CHART_SPKU.caption;
    }
  }
  function initThemeWatch() {
    if (!window.MutationObserver) return;
    var last = document.documentElement.getAttribute("data-theme");
    new MutationObserver(function () { var cur = document.documentElement.getAttribute("data-theme"); if (cur === last) return; last = cur; buildCharts(); renderMermaid(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  }
  function init() { renderFormulas(); renderMermaid(); initConverter(); initISPU(); buildCharts(); initThemeWatch(); }
  document.addEventListener("DOMContentLoaded", init);
})();
