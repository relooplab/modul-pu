/**
 * bab5.js — interaksi khusus Bab 5: Dampak Pencemaran Udara.
 * Kalkulator dosis terdeposisi (D=C×VE×t×DF), visualisasi kurva U,
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
      "b5-rantai": [
        "flowchart TB",
        'A["Emisi"] --> B["Transport & transformasi atmosfer"]',
        'B --> C["Konsentrasi ambien (C)"]',
        'C --> D["Paparan × Ventilasi (VE×t)"]',
        'D --> E["DF(d_ae): ET / TB / AI — kurva U"]',
        'E --> F["Dosis terdeposisi → klirens → dosis efektif → respons"]:::accent',
        "classDef accent fill:" + c.terraBg + ",stroke:" + c.terra + ",color:" + c.text + ",font-weight:600;"
      ].join("\n"),
      "b5-kesehatan": [
        "flowchart TB",
        'A["PM2,5 / gas terdeposisi"] --> B["Stres oksidatif & inflamasi lokal"]',
        'B --> C["Inflamasi sistemik & disfungsi endotel"]',
        'C --> D["PPOK, PJK, stroke, kanker paru (IARC Grup 1)"]:::accent',
        'A --> E["UFP translokasi ke sirkulasi"]',
        'E --> C',
        "classDef accent fill:" + c.terraBg + ",stroke:" + c.terra + ",color:" + c.text + ",font-weight:600;"
      ].join("\n"),
      "b5-iklim": [
        "flowchart TB",
        'A["SO2 -> sulfat (-1,1 W/m2 pendinginan)"] --> D["Unmasking: kurangi sulfat -> pemanasan terbuka ±1 W/m2"]:::accent',
        'B["BC +0,11 & O3 +0,47 pemanasan"] --> D',
        'C["Kurangi BC/metana/O3 -> co-benefit kesehatan+iklim jangka pendek"] --> E["One atmosphere: udara bersih & iklim bersama"]',
        'D --> E',
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

  function initDosis() {
    var root = $("#b5-dosis");
    if (!root || !APP_DATA.DOSIS) return;
    root.innerHTML =
      '<div class="b2-tool-head"><div><p class="eyebrow">Kalkulator 5.1</p><h3 class="h3">Dosis terdeposisi: D = C × VE × t × DF</h3><p class="sec-desc">Bandingkan pekerja luar ruang vs anak sekolah pada C sama — lihat efek ventilasi & DF.</p></div><div class="b2-formula-mini">D = C × VE × t × DF</div></div>' +
      '<div class="b2-tool-grid"><div class="b2-tool-controls">' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b5-C">Konsentrasi ambien C</label><span class="b2-range-value" id="b5-C-out"></span></div><input class="range" type="range" id="b5-C" min="5" max="300" step="1" value="55"><div class="b2-range-meta"><span>5 µg/m³</span><span>300 µg/m³</span></div><div style="margin-top:.4rem;display:flex;gap:.4rem"><button type="button" class="btn btn-ghost" data-preset-c="15" style="flex:1">15 (WHO 24j)</button><button type="button" class="btn btn-ghost" data-preset-c="55" style="flex:1">55 (PP 24j)</button><button type="button" class="btn btn-ghost" data-preset-c="150" style="flex:1">150 (Tidak Sehat)</button></div></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b5-VE">Laju ventilasi VE</label><span class="b2-range-value" id="b5-VE-out"></span></div><select class="b2-select" id="b5-VE" aria-label="Ventilasi"><option value="0.45">Istirahat — 0,45 m³/jam</option><option value="0.9">Ringan — 0,9 m³/jam</option><option value="1.2">Sedang — 1,2 m³/jam</option><option value="1.5" selected>Berat — 1,5 m³/jam (pekerja luar)</option><option value="0.5">Anak ringan — 0,5 m³/jam</option></select></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b5-t">Durasi paparan t</label><span class="b2-range-value" id="b5-t-out"></span></div><input class="range" type="range" id="b5-t" min="1" max="24" step="1" value="8"><div class="b2-range-meta"><span>1 jam</span><span>24 jam</span></div></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b5-DF">Fraksi deposisi alveolar DF</label><span class="b2-range-value" id="b5-DF-out"></span></div><input class="range" type="range" id="b5-DF" min="0.05" max="0.5" step="0.05" value="0.25"><div class="b2-range-meta"><span>0,05 (minimum)</span><span>0,50 (ultrahalus)</span></div><p class="note" style="margin:.35rem 0 0;font-size:.78rem">DF 0,25 ≈ PM2,5 pada AI; 0,05 ≈ minimum 0,3–0,5 µm; 0,45–0,50 ≈ UFP difusi.</p></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b5-bb">Bobot badan (untuk per-kg)</label><span class="b2-range-value" id="b5-bb-out"></span></div><input class="range" type="range" id="b5-bb" min="15" max="90" step="5" value="70"><div class="b2-range-meta"><span>15 kg (anak)</span><span>90 kg</span></div></div>' +
      '</div><div class="b2-tool-output"><div class="b2-output-hero"><span class="b2-output-label">Dosis terdeposisi alveolar</span><strong id="b5-D-out">0</strong><span>µg / hari paparan</span></div>' +
      '<div class="b2-metrics"><div><span>Dosis total terhirup</span><strong id="b5-inhaled">0</strong></div><div><span>Per kg BB</span><strong id="b5-perkg">0</strong></div><div><span>Vs PP 22 24j (55)</span><strong id="b5-ratio">0×</strong></div></div>' +
      '<p class="note" id="b5-formula"></p>' +
      '<div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-top:.6rem"><button type="button" class="btn btn-ghost" id="b5-scen-pekerja">Skenario pekerja: 55 ×1,5×8×0,25 /70kg</button><button type="button" class="btn btn-ghost" id="b5-scen-anak">Skenario anak: 35 ×0,5×24×0,25 /25kg</button></div>' +
      '<p class="sim-hint">Hanya fraksi DF yang terdeposisi di AI; sisanya di ET/TB atau terembus kembali. Klirens alveolar (makrofaga, minggu–bulan) menentukan dosis efektif, bukan D saja.</p></div></div>';
    var inpC = $("#b5-C"), selVE = $("#b5-VE"), inpT = $("#b5-t"), inpDF = $("#b5-DF"), inpBB = $("#b5-bb");
    function render() {
      var C = Number(inpC.value), VE = Number(selVE.value), t = Number(inpT.value), DF = Number(inpDF.value), bb = Number(inpBB.value);
      var inhaled = C * VE * t;
      var D = inhaled * DF;
      var perkg = D / bb;
      var ref = 55 * 1.5 * 8 * 0.25; // pekerja ref 55
      $("#b5-C-out").textContent = C + " µg/m³";
      $("#b5-VE-out").textContent = VE + " m³/jam";
      $("#b5-t-out").textContent = t + " jam";
      $("#b5-DF-out").textContent = DF.toLocaleString("id-ID", { minimumFractionDigits: 2 });
      $("#b5-bb-out").textContent = bb + " kg";
      $("#b5-D-out").textContent = formatId(D, 1);
      $("#b5-inhaled").textContent = formatId(inhaled, 1) + " µg";
      $("#b5-perkg").textContent = formatId(perkg, 2) + " µg/kg";
      $("#b5-ratio").textContent = (ref > 0 ? (D / ref).toLocaleString("id-ID", { maximumFractionDigits: 1 }) : "0") + "×";
      $("#b5-formula").textContent = "D = " + C + " × " + VE + " × " + t + " × " + DF.toLocaleString("id-ID", { minimumFractionDigits: 2 }) + " = " + formatId(D, 1) + " µg (AI); " + formatId(perkg, 2) + " µg/kg BB";
    }
    [inpC, selVE, inpT, inpDF, inpBB].forEach(function (el) { el.addEventListener("input", render); el.addEventListener("change", render); });
    root.querySelectorAll("[data-preset-c]").forEach(function (b) { b.addEventListener("click", function () { inpC.value = b.getAttribute("data-preset-c"); render(); }); });
    $("#b5-scen-pekerja").addEventListener("click", function () { inpC.value = "55"; selVE.value = "1.5"; inpT.value = "8"; inpDF.value = "0.25"; inpBB.value = "70"; render(); });
    $("#b5-scen-anak").addEventListener("click", function () { inpC.value = "35"; selVE.value = "0.5"; inpT.value = "24"; inpDF.value = "0.25"; inpBB.value = "25"; render(); });
    render();
  }

  function initCurveU() {
    var root = $("#b5-curve");
    if (!root) return;
    // Skematis pola-U kualitatif (ICRP HRTM): bentuk kurva ilustratif, BUKAN nilai ukur.
    // MD hanya memberi pola: tinggi di ET untuk kasar & UFP, minimum ±0,3–0,5 µm, puncak AI 0,1–2,5 µm.
    var dae = [0.001, 0.002, 0.005, 0.01, 0.02, 0.05, 0.1, 0.2, 0.3, 0.5, 0.8, 1, 2, 5, 10, 20, 50, 100];
    var dfTotal = [0.95, 0.92, 0.85, 0.78, 0.65, 0.45, 0.35, 0.28, 0.22, 0.20, 0.25, 0.30, 0.45, 0.62, 0.78, 0.90, 0.97, 0.99];
    var dfAlv =   [0.45, 0.48, 0.42, 0.35, 0.28, 0.18, 0.13, 0.15, 0.18, 0.22, 0.25, 0.24, 0.18, 0.08, 0.03, 0.01, 0, 0];
    function level(v) { return v >= 0.7 ? "Tinggi" : v >= 0.35 ? "Sedang" : "Rendah"; }
    // Use Chart.js line log X approximation via labels as categories with log spacing visual
    root.innerHTML =
      '<div class="b2-tool-head"><div><p class="eyebrow">Kalkulator 5.2</p><h3 class="h3">Kurva U — DF vs diameter aerodinamik (skematis)</h3><p class="sec-desc">Gerakkan diameter untuk melihat dominansi mekanisme (difusi/impaksi) dan kompartemen AI/ET. Kurva skematis — nilai kualitatif, bukan hasil pengukuran.</p></div><div class="b2-formula-mini">ET ↑ besar & UFP · AI ↑ 0,1–2,5 µm</div></div>' +
      '<div class="b2-tool-grid"><div class="b2-tool-controls">' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b5-dae">Diameter aerodinamik d_ae</label><span class="b2-range-value" id="b5-dae-out"></span></div><input class="range" type="range" id="b5-dae" min="0" max="' + (dae.length - 1) + '" step="1" value="9"><div class="b2-range-meta"><span>0,001 µm</span><span>100 µm</span></div><p class="note" id="b5-dae-desc" style="margin:.35rem 0 0;font-size:.78rem"></p></div>' +
      '<div class="b2-metrics"><div><span>Deposisi total</span><strong id="b5-df-total">—</strong></div><div><span>Deposisi alveolar</span><strong id="b5-df-alv">—</strong></div><div><span>Mekanisme</span><strong id="b5-mech">—</strong></div></div>' +
      '<p class="note" id="b5-dae-note" style="margin-top:.6rem"></p>' +
      '</div><div class="b2-tool-output"><div class="chart-wrap" style="height:260px"><canvas id="b5-curve-chart" aria-label="Kurva U deposisi vs diameter" role="img"></canvas></div><p class="sim-hint">Kurva ilustratif berdasar ICRP HRTM (±0,3–0,5 µm minimum). PM2,5 ≈ puncak AI; masker N95 diuji pada 0,3 µm — ukuran tersulit.</p></div></div>';
    var inp = $("#b5-dae");
    var chart = null;
    function descFor(d, idx) {
      if (d < 0.01) return "Difusi Brown dominan → ET + AI tinggi (ultrafine)";
      if (d < 0.1) return "Difusi menurun, sedimentasi belum efektif → transisi";
      if (d <= 0.5) return "Minimum deposisi total (celah) — sebagian terembus kembali";
      if (d <= 2.5) return "Sedimentasi dominan → AI maksimum (PM2,5)";
      if (d <= 10) return "Impaksi–sedimentasi → TB dominan";
      return "Impaksi inersia → ET dominan (>10 µm)";
    }
    function mechFor(d) {
      if (d < 0.05) return "Difusi";
      if (d < 0.5) return "Difusi→min";
      if (d < 5) return "Sedimentasi";
      return "Impaksi";
    }
    function buildChart() {
      if (!window.Chart) return;
      var c = colors();
      Chart.defaults.font.family = "'IBM Plex Mono', monospace";
      Chart.defaults.font.size = 11;
      Chart.defaults.color = c.muted;
      var el = $("#b5-curve-chart");
      if (!el) return;
      if (chart) chart.destroy();
      // Plugin to draw vertical line at selected index
      var selIdx = Number(inp.value);
      var verticalLinePlugin = {
        id: "verticalLine",
        afterDraw: function (ch) {
          var ctx = ch.ctx;
          var xScale = ch.scales.x;
          var idx = Number(inp.value);
          if (idx < 0 || idx >= dae.length) return;
          var x = xScale.getPixelForValue(idx);
          ctx.save();
          ctx.strokeStyle = c.terra;
          ctx.setLineDash([6, 4]);
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(x, ch.chartArea.top);
          ctx.lineTo(x, ch.chartArea.bottom);
          ctx.stroke();
          ctx.restore();
        }
      };
      chart = new Chart(el, {
        type: "line",
        data: {
          labels: dae.map(function (v) { return v < 0.1 ? v.toFixed(3) : v < 1 ? v.toFixed(1) : String(v); }),
          datasets: [
            { label: "Total (skematis)", data: dfTotal, borderColor: c.terra, backgroundColor: "transparent", tension: 0.35, pointRadius: 0, borderWidth: 2.5 },
            { label: "Alveolar (skematis)", data: dfAlv, borderColor: c.sage, backgroundColor: "transparent", tension: 0.35, pointRadius: 0, borderWidth: 2.5, borderDash: [6, 4] }
          ]
        },
        options: {
          maintainAspectRatio: false,
          interaction: { intersect: false, mode: "index" },
          plugins: { legend: { position: "bottom", labels: { boxWidth: 12, usePointStyle: true } }, tooltip: { callbacks: { title: function (ctx) { return "d_ae " + dae[ctx[0].dataIndex] + " µm (skematis)"; }, label: function (ctx) { return " " + ctx.dataset.label + ": " + level(ctx.parsed.y); } } } },
          scales: { y: { beginAtZero: true, max: 1, grid: { color: c.border }, ticks: { display: false }, title: { display: true, text: "Tingkat relatif (skematis)" } }, x: { grid: { display: false }, title: { display: true, text: "d_ae (µm, skala log ilustratif)" } } }
        },
        plugins: [verticalLinePlugin]
      });
    }
    function render() {
      var idx = Number(inp.value);
      var d = dae[idx];
      $("#b5-dae-out").textContent = (d < 0.1 ? d.toFixed(3) : d < 10 ? d.toFixed(1) : String(Math.round(d))) + " µm";
      $("#b5-df-total").textContent = level(dfTotal[idx]);
      $("#b5-df-alv").textContent = level(dfAlv[idx]);
      $("#b5-mech").textContent = mechFor(d);
      $("#b5-dae-desc").textContent = descFor(d);
      $("#b5-dae-note").textContent = "Pada " + d + " µm: deposisi total " + level(dfTotal[idx]).toLowerCase() + ", AI " + level(dfAlv[idx]).toLowerCase() + " — " + mechFor(d) + " dominan (kualitatif, bukan nilai ukur).";
      buildChart();
    }
    inp.addEventListener("input", render);
    render();
  }

  var charts = {};
  function buildCharts() {
    if (!window.Chart) return;
    var c = colors();
    Chart.defaults.font.family = "'IBM Plex Mono', monospace";
    Chart.defaults.font.size = 11;
    Chart.defaults.color = c.muted;
    var elB = $("#chart-beban");
    if (elB && APP_DATA.CHART_BEBAN) {
      if (charts.beban) charts.beban.destroy();
      charts.beban = new Chart(elB, {
        type: "bar",
        data: { labels: APP_DATA.CHART_BEBAN.labels, datasets: [{ label: "Juta kematian/tahun", data: APP_DATA.CHART_BEBAN.data, backgroundColor: APP_DATA.CHART_BEBAN.data.map(function (v, i) { return i === 3 ? c.terra : c.sage; }), borderRadius: 7, maxBarThickness: 56 }] },
        options: { maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: c.border } }, x: { grid: { display: false } } } }
      });
      var cap = $("#cap-beban"); if (cap) cap.textContent = APP_DATA.CHART_BEBAN.caption;
    }
    var elK = $("#chart-karhutla-bab5");
    if (elK && APP_DATA.CHART_KARHUTLA) {
      if (charts.karhutla) charts.karhutla.destroy();
      var vals = APP_DATA.CHART_KARHUTLA.data;
      charts.karhutla = new Chart(elK, {
        type: "bar",
        data: { labels: APP_DATA.CHART_KARHUTLA.labels, datasets: [{ label: "Ribu kematian (est. model)", data: vals.map(function (v) { return v * 1000; }), backgroundColor: vals.map(function (v, i) { return i === 0 ? c.terra : c.sage; }), borderRadius: 7, maxBarThickness: 56 }] },
        options: { maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: function (ctx) { return " " + ctx.parsed.y.toLocaleString("id-ID") + " kematian"; } } } }, scales: { y: { beginAtZero: true, grid: { color: c.border } }, x: { grid: { display: false } } } }
      });
      var cap2 = $("#cap-karhutla-bab5"); if (cap2) cap2.textContent = APP_DATA.CHART_KARHUTLA.caption;
    }
  }
  function initThemeWatch() {
    if (!window.MutationObserver) return;
    var last = document.documentElement.getAttribute("data-theme");
    new MutationObserver(function () { var cur = document.documentElement.getAttribute("data-theme"); if (cur === last) return; last = cur; buildCharts(); renderMermaid(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  }
  function init() { renderFormulas(); renderMermaid(); initDosis(); initCurveU(); buildCharts(); initThemeWatch(); }
  document.addEventListener("DOMContentLoaded", init);
})();
