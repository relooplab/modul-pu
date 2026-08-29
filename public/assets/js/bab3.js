/**
 * bab3.js — interaksi khusus Bab 3: Sumber Pencemaran Udara.
 * Kalkulator inventarisasi E = A × EF × (1−ER/100), diagram Mermaid,
 * grafik Chart.js, dan KaTeX. Mengikuti pola bab2.js.
 */
(function () {
  "use strict";

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }

  function colors() {
    var cs = getComputedStyle(document.documentElement);
    function v(k) { return cs.getPropertyValue(k).trim(); }
    return {
      sage: v("--sage"), sageBg: v("--sage-bg"), terra: v("--terra"), terraBg: v("--terra-bg"),
      text: v("--text"), muted: v("--muted"), border: v("--border-strong"), surface: v("--surface")
    };
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
    mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      securityLevel: "strict",
      useMaxWidth: false,
      fontFamily: "'DM Sans', sans-serif",
      themeVariables: {
        primaryColor: c.sageBg,
        primaryBorderColor: c.sage,
        primaryTextColor: c.text,
        lineColor: c.muted,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "15px"
      }
    });
    var sources = {
      "b3-klasifikasi": [
        "flowchart TB",
        'A["Sumber pencemaran udara"] --> B["Asal: alami vs antropogenik"]',
        'A --> C["Geometri: titik / garis / area / volume"]',
        'A --> D["Pola waktu: kontinu vs episodik"]',
        'B --> E["Regulasi: bergerak vs tidak bergerak (PP 22/2021)"]:::accent',
        'C --> E', 'D --> E',
        "classDef accent fill:" + c.terraBg + ",stroke:" + c.terra + ",color:" + c.text + ",font-weight:600;"
      ].join("\n"),
      "b3-inventarisasi": [
        "flowchart TB",
        'A["Data aktivitas (A) × Faktor emisi (EF)"] --> B["Bottom-up: agregasi per sumber"]',
        'C["Konsentrasi satelit / stasiun"] --> D["Top-down: inversi model transport"]',
        'B --> E["Inventarisasi emisi (E per polutan, grid, waktu)"]:::accent',
        'D --> E',
        'E --> F["Input model dispersi (Bab 7) & kebijakan (Bab 8)"]',
        "classDef accent fill:" + c.terraBg + ",stroke:" + c.terra + ",color:" + c.text + ",font-weight:600;"
      ].join("\n"),
      "b3-shifting": [
        "flowchart TB",
        'A["Elektrifikasi: EV hapus tailpipe & evaporatif"] --> B["Beban pindah ke PLTU"]',
        'C["Co-firing biomassa 1-5%"] --> B',
        'B --> D["Manfaat kota nyata, total sistem tergantung BME & bauran grid"]:::accent',
        'E["Sektor informal & open burning 48-50% KK"] --> D',
        'F["PSBB 2020: CO/NO2 turun, PM2.5 naik"] --> D',
        "classDef accent fill:" + c.terraBg + ",stroke:" + c.terra + ",color:" + c.text + ",font-weight:600;"
      ].join("\n")
    };
    for (var id in sources) {
      var target = document.getElementById(id);
      if (!target) continue;
      try {
        var out = await mermaid.render(id + "-svg-" + Date.now(), sources[id]);
        target.innerHTML = out.svg;
      } catch (e) {
        target.innerHTML = '<p class="note">Diagram tidak dapat dimuat.</p>';
      }
    }
  }

  function formatId(n, digits) {
    return Number(n).toLocaleString("id-ID", { minimumFractionDigits: digits || 0, maximumFractionDigits: digits || 0 });
  }

  function initInventory() {
    var root = $("#b3-inventory");
    if (!root || !APP_DATA.INVENTORY) return;
    var cfg = APP_DATA.INVENTORY;
    var presets = cfg.presets;
    var cur = presets.find(function (p) { return p.id === cfg.defaultPreset; }) || presets[0];

    root.innerHTML =
      '<div class="b2-tool-head"><div><p class="eyebrow">Kalkulator 3.1</p><h3 class="h3">E = A × EF × (1 − ER/100)</h3><p class="sec-desc">Presets ilustratif berbasis AP-42/EMEP; ganti angka untuk eksplorasi ketidakpastian.</p></div><div class="b2-formula-mini">E = A × EF × (1 − ER/100)</div></div>' +
      '<div class="b2-tool-grid"><div class="b2-tool-controls">' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b3-preset">Preset sumber</label></div>' +
      '<select class="b2-select" id="b3-preset" aria-label="Pilih preset sumber">' + presets.map(function (p) {
        return '<option value="' + p.id + '"' + (p.id === cur.id ? " selected" : "") + '>' + p.label + '</option>';
      }).join("") + '</select><p class="note" id="b3-preset-hint" style="margin:.45rem 0 0">' + cur.hint + '</p></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b3-A">Aktivitas A (unit per tahun)</label><span class="b2-range-value" id="b3-A-out"></span></div>' +
      '<input class="range" type="range" id="b3-A" min="1000" max="80000000" step="1000" value="' + cur.a + '"><div class="b2-range-meta"><span>10³</span><span>8×10⁷</span></div><p class="note" id="b3-A-unit" style="margin:.35rem 0 0"></p></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b3-EF">Faktor emisi EF</label><span class="b2-range-value" id="b3-EF-out"></span></div>' +
      '<input class="range" type="range" id="b3-EF" min="0.1" max="50" step="0.1" value="' + cur.ef + '"></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b3-ER">Efisiensi reduksi ER</label><span class="b2-range-value" id="b3-ER-out"></span></div>' +
      '<input class="range" type="range" id="b3-ER" min="0" max="99" step="1" value="' + cur.er + '"><div class="b2-range-meta"><span>0% (tanpa kontrol)</span><span>99% (kontrol tinggi)</span></div></div>' +
      '</div><div class="b2-tool-output"><div class="b2-output-hero"><span class="b2-output-label">Emisi E</span><strong id="b3-E-out">0</strong><span id="b3-E-unit">ton/tahun</span></div>' +
      '<div class="b2-metrics"><div><span>Tanpa kontrol</span><strong id="b3-E-raw">0</strong></div><div><span>Reduksi</span><strong id="b3-E-cut">0</strong></div><div><span>Rating AP-42</span><strong id="b3-rating">C</strong></div></div>' +
      '<p class="note" id="b3-formula"></p><p class="sim-hint">E = A×EF adalah estimasi; rating AP-42 (A sangat baik → E buruk) dan Tier EMEP (1 default → 3 model) menentukan ketidakpastian. Alokasi grid memakai proxy populasi bukan lokasi riil (3.6.4).</p></div></div>';

    var selPreset = $("#b3-preset"), inpA = $("#b3-A"), inpEF = $("#b3-EF"), inpER = $("#b3-ER");

    function ratingForPreset(id) {
      if (id === "pltu_so2") return "B";
      if (id === "motor_co") return "C";
      return "E";
    }

    function render() {
      var A = Number(inpA.value), EF = Number(inpEF.value), ER = Number(inpER.value);
      var raw = A * EF;
      var E = raw * (1 - ER / 100);
      var presetId = selPreset.value;
      var unitRaw = presets.find(function (p) { return p.id === presetId; });
      var unitLabel = unitRaw ? unitRaw.unit : "unit → massa";
      $("#b3-A-out").textContent = formatId(A, 0);
      $("#b3-EF-out").textContent = formatId(EF, 1) + "  (massa/activity)";
      $("#b3-ER-out").textContent = ER + "%";
      $("#b3-A-unit").textContent = unitLabel;
      $("#b3-preset-hint").textContent = unitRaw ? unitRaw.hint : "";
      // Heuristic: EF sudah dalam gram atau kg, raw dalam gram/kg; display ton/tahun for readability
      var rawTon = raw / 1000, eTon = E / 1000;
      // Adapt display: if A large and EF small, rawTon small; show with locale
      var displayRaw = rawTon >= 1 ? formatId(rawTon, 1) + " ton" : formatId(raw, 0) + " kg";
      var displayE = eTon >= 1 ? formatId(eTon, 1) + " ton" : formatId(E, 0) + " kg";
      $("#b3-E-raw").textContent = displayRaw;
      $("#b3-E-cut").textContent = formatId(raw - E, 0) + " kg";
      $("#b3-E-out").textContent = displayE.replace(" ton","").replace(" kg","");
      $("#b3-E-unit").textContent = eTon >= 1 ? "ton/tahun" : "kg/tahun";
      $("#b3-rating").textContent = ratingForPreset(presetId);
      $("#b3-formula").textContent = "E = " + formatId(A,0) + " × " + formatId(EF,1) + " × (1 − " + ER + "/100) = " + formatId(E,0) + " (massa/tahun)";
    }

    selPreset.addEventListener("change", function () {
      var p = presets.find(function (x) { return x.id === selPreset.value; });
      if (!p) return;
      // Adapt slider max to preset magnitude (preserve current max if larger)
      var needed = Math.max(p.a * 1.2, 10000000);
      if (needed > Number(inpA.max)) inpA.max = String(Math.ceil(needed / 1000000) * 1000000);
      inpA.value = p.a; inpEF.value = p.ef; inpER.value = p.er;
      render();
    });
    [inpA, inpEF, inpER].forEach(function (el) { el.addEventListener("input", render); });
    render();
  }

  var charts = {};
  function buildCharts() {
    if (!window.Chart) return;
    var c = colors();
    Chart.defaults.font.family = "'IBM Plex Mono', monospace";
    Chart.defaults.font.size = 11;
    Chart.defaults.color = c.muted;

    var elA = $("#chart-armada");
    if (elA && APP_DATA.CHART_ARMADA) {
      if (charts.armada) charts.armada.destroy();
      charts.armada = new Chart(elA, {
        type: "bar",
        data: {
          labels: APP_DATA.CHART_ARMADA.labels,
          datasets: [{ label: "Juta unit sepeda motor", data: APP_DATA.CHART_ARMADA.data, backgroundColor: c.sage, borderRadius: 8, maxBarThickness: 56 }]
        },
        options: {
          maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: { callbacks: { label: function (ctx) { return " " + ctx.parsed.y.toLocaleString("id-ID") + " juta"; } } } },
          scales: { y: { beginAtZero: true, grid: { color: c.border } }, x: { grid: { display: false } } }
        }
      });
      var capA = $("#cap-armada"); if (capA) capA.textContent = APP_DATA.CHART_ARMADA.caption;
    }

    var elK = $("#chart-karhutla-gambut");
    if (elK && APP_DATA.CHART_KARHUTLA_GAM) {
      if (charts.gambut) charts.gambut.destroy();
      var vals = APP_DATA.CHART_KARHUTLA_GAM.data;
      charts.gambut = new Chart(elK, {
        type: "bar",
        data: {
          labels: APP_DATA.CHART_KARHUTLA_GAM.labels,
          datasets: [{ label: "Juta ha gambut terbakar", data: vals, backgroundColor: vals.map(function (v, i) { return i === 0 ? c.terra : c.sage; }), borderRadius: 8, maxBarThickness: 56 }]
        },
        options: {
          maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: { callbacks: { label: function (ctx) { return " " + ctx.parsed.y.toLocaleString("id-ID") + " juta ha"; } } } },
          scales: { y: { beginAtZero: true, grid: { color: c.border } }, x: { grid: { display: false } } }
        }
      });
      var capK = $("#cap-karhutla-gambut"); if (capK) capK.textContent = APP_DATA.CHART_KARHUTLA_GAM.caption;
    }
  }

  function initThemeWatch() {
    if (!window.MutationObserver) return;
    var last = document.documentElement.getAttribute("data-theme");
    new MutationObserver(function () {
      var cur = document.documentElement.getAttribute("data-theme");
      if (cur === last) return;
      last = cur;
      buildCharts(); renderMermaid();
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  }

  function init() {
    renderFormulas();
    renderMermaid();
    initInventory();
    buildCharts();
    initThemeWatch();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
