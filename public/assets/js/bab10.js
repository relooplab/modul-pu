/**
 * bab10.js — Bab 10 Studi Kasus Pencemaran Udara.
 * Komparator audit data (resmi vs revisi), penjelajah tahap GRAP, Mermaid, Chart.js, KaTeX.
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
      "b10-rantai": [
        "flowchart TB",
        'A["Emisi sumber (Bab 3)"] --> B["Meteorologi: inversi + stagnasi (Bab 6)"]',
        'B --> C["Konsentrasi & paparan (Bab 4–5)"]',
        'C --> D["Dampak kesehatan & ekonomi"]',
        'D --> E["Respons: teknologi (Bab 9) + regulasi (Bab 8)"]:::accent',
        'C --> F["Pemodelan dispersi (Bab 7) memvalidasi rantai"]',
        "classDef accent fill:" + c.terraBg + ",stroke:" + c.terra + ",color:" + c.text + ",font-weight:600;"
      ].join("\n"),
      "b10-karhutla": [
        "flowchart TB",
        'A["El Niño + musim kemarau (Bab 6.11)"] --> B["Gambut kering + drainase terbakar"]',
        'B --> C["Kabut asap lintas batas (PM2.5)"]',
        'C --> D["Diplomasi AATHP + Roadmap Haze-Free 2030"]',
        'D --> E["Restorasi gambut: −37% luas, −24% PM2.5 (pra-api)"]:::accent',
        "classDef accent fill:" + c.terraBg + ",stroke:" + c.terra + ",color:" + c.text + ",font-weight:600;"
      ].join("\n"),
      "b10-miniriset": [
        "flowchart TB",
        'A["Pilih kasus lokal + parameter (Bab 4.6, SNI 7119)"] --> B["Ukur + catat meteo (Bab 6)"]',
        'B --> C["Modelkan: kotak / Gaussian / garis (Bab 7)"]',
        'C --> D["Bandingkan PP 22/2021 vs WHO + ISPU (Bab 8)"]',
        'D --> E["Usulkan pengendalian (Bab 9) + laporan audit"]:::accent',
        "classDef accent fill:" + c.terraBg + ",stroke:" + c.terra + ",color:" + c.text + ",font-weight:600;"
      ].join("\n")
    };
    for (var id in src) {
      var t = document.getElementById(id);
      if (!t) continue;
      try { var out = await mermaid.render(id + "-svg-" + Date.now(), src[id]); t.innerHTML = out.svg; } catch (e) { t.innerHTML = '<p class="note">Diagram tidak dapat dimuat.</p>'; }
    }
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }

  function initAudit() {
    var root = $("#b10-audit");
    if (!root || !APP_DATA.AUDIT_CASES) return;
    var cases = APP_DATA.AUDIT_CASES;
    root.innerHTML =
      '<div class="b2-tool-head"><div><p class="eyebrow">Komparator 10.1</p><h3 class="h3">Audit data: resmi vs revisi</h3><p class="sec-desc">Pilih kasus; bedakan pemantauan, estimasi model, dan penilaian.</p></div><div class="b2-formula-mini">Rasio = revisi ÷ resmi</div></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b10-case">Kasus</label></div><select class="b2-select" id="b10-case" aria-label="Pilih kasus">' +
      cases.map(function (k) { return '<option value="' + k.id + '">' + esc(k.label) + '</option>'; }).join("") +
      '</select></div>' +
      '<div class="b2-tool-grid" style="margin-top:.6rem"><div class="b2-tool-output"><div class="b2-output-hero"><span class="b2-output-label">Angka resmi / awal</span><strong id="b10-off" style="font-size:1.15rem">—</strong><span> </span></div></div>' +
      '<div class="b2-tool-output"><div class="b2-output-hero"><span class="b2-output-label">Angka revisi / pembanding</span><strong id="b10-rev" style="font-size:1.15rem">—</strong><span> </span></div></div></div>' +
      '<div class="b2-metrics" style="margin-top:.6rem"><div><span>Selisih orde</span><strong id="b10-ratio">—</strong></div><div style="grid-column:span 2"><span>Klasifikasi audit</span><strong id="b10-cls" style="font-size:.82rem">—</strong></div></div>' +
      '<p class="note" id="b10-audit-note"></p><p class="sim-hint">Aturan: tampilkan keduanya + metode tiap angka; jangan menuduh salah satu berbohong atas selisih metode.</p>';
    var sel = $("#b10-case");
    function render() {
      var k = cases.find(function (x) { return x.id === sel.value; }) || cases[0];
      $("#b10-off").textContent = k.official;
      $("#b10-rev").textContent = k.revised;
      $("#b10-ratio").textContent = k.ratio;
      $("#b10-cls").textContent = k.cls;
      $("#b10-audit-note").textContent = k.label + " — resmi: " + k.official + " | revisi: " + k.revised + " (" + k.ratio + ").";
    }
    sel.addEventListener("change", render);
    render();
  }

  function initGrap() {
    var root = $("#b10-grap");
    if (!root || !APP_DATA.GRAP) return;
    var stages = APP_DATA.GRAP;
    root.innerHTML =
      '<div class="b2-tool-head"><div><p class="eyebrow">Penjelajah 10.2</p><h3 class="h3">Tahap GRAP Delhi-NCR</h3><p class="sec-desc">Rencana darurat bertingkat CAQM: aksi otomatis per AQI.</p></div><div class="b2-formula-mini">I Poor → IV Severe+</div></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b10-stage">Tahap GRAP</label></div><select class="b2-select" id="b10-stage" aria-label="Pilih tahap GRAP">' +
      stages.map(function (s) { return '<option value="' + s.stage + '">Tahap ' + s.stage + ' — ' + esc(s.cat) + ' (' + s.aqi + ')</option>'; }).join("") +
      '</select></div>' +
      '<div class="b2-output-hero" style="margin-top:.6rem"><span class="b2-output-label">Tindakan utama</span><strong id="b10-grap-act" style="font-size:1rem">—</strong><span id="b10-grap-aqi"> </span></div>' +
      '<p class="note" id="b10-grap-note"></p><p class="sim-hint">Kritik: reaktif — Tahap IV dideklarasikan setelah toksik berhari-hari; PM2.5 naik 220–310% selama GRAP karena puncak musim dingin.</p>';
    var sel = $("#b10-stage");
    function render() {
      var s = stages.find(function (x) { return x.stage === sel.value; }) || stages[0];
      $("#b10-grap-act").textContent = s.act;
      $("#b10-grap-aqi").textContent = "AQI " + s.aqi;
      $("#b10-grap-note").textContent = "Tahap " + s.stage + " (" + s.cat + ", AQI " + s.aqi + "): " + s.act + ".";
    }
    sel.addEventListener("change", render);
    render();
  }

  var charts = {};
  function buildCharts() {
    if (!window.Chart) return;
    var c = colors();
    Chart.defaults.font.family = "'IBM Plex Mono', monospace";
    Chart.defaults.font.size = 11;
    Chart.defaults.color = c.muted;
    var elB = $("#chart-beijing");
    if (elB && APP_DATA.CHART_BEIJING) {
      if (charts.beijing) charts.beijing.destroy();
      charts.beijing = new Chart(elB, {
        type: "bar",
        data: {
          labels: APP_DATA.CHART_BEIJING.labels,
          datasets: [
            { label: "2013", data: APP_DATA.CHART_BEIJING.y2013, backgroundColor: c.terra, borderRadius: 7, maxBarThickness: 42 },
            { label: "2017", data: APP_DATA.CHART_BEIJING.y2017, backgroundColor: c.sage, borderRadius: 7, maxBarThickness: 42 }
          ]
        },
        options: { maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { boxWidth: 12, padding: 12, usePointStyle: true } } }, scales: { y: { beginAtZero: true, grid: { color: c.border }, title: { display: true, text: "µg/m³" } }, x: { grid: { display: false } } } }
      });
      var cap = $("#cap-beijing"); if (cap) cap.textContent = APP_DATA.CHART_BEIJING.caption;
    }
    var elK = $("#chart-karhutla");
    if (elK && APP_DATA.CHART_KARHUTLA) {
      if (charts.karhutla) charts.karhutla.destroy();
      charts.karhutla = new Chart(elK, {
        type: "bar",
        data: {
          labels: APP_DATA.CHART_KARHUTLA.labels,
          datasets: [{ label: "Juta ha (KLHK)", data: APP_DATA.CHART_KARHUTLA.data, backgroundColor: c.sage, borderRadius: 7, maxBarThickness: 56 }]
        },
        options: { maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: c.border }, title: { display: true, text: "juta ha" } }, x: { grid: { display: false } } } }
      });
      var cap2 = $("#cap-karhutla"); if (cap2) cap2.textContent = APP_DATA.CHART_KARHUTLA.caption;
    }
  }
  function initThemeWatch() {
    if (!window.MutationObserver) return;
    var last = document.documentElement.getAttribute("data-theme");
    new MutationObserver(function () { var cur = document.documentElement.getAttribute("data-theme"); if (cur === last) return; last = cur; buildCharts(); renderMermaid(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  }
  function init() { renderFormulas(); renderMermaid(); initAudit(); initGrap(); buildCharts(); initThemeWatch(); }
  document.addEventListener("DOMContentLoaded", init);
})();
