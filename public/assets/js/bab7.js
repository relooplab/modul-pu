/**
 * bab7.js — interaksi khusus Bab 7: Pemodelan Pencemaran Udara.
 * Kalkulator kotak (C=b+qL/(uH)), Gaussian plume (C_x vs σ), Mermaid, Chart.js, KaTeX.
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
      "b7-peta": [
        "flowchart TB",
        'A["Inventaris emisi"] --> B["Model sumber: kotak/Gaussian/AERMOD/garis/CTM"]',
        'C["Komposisi kimia reseptor"] --> D["Model reseptor: PMF / CMB"]',
        'E["Meteo + terrain + batas"] --> B',
        'F["Pengamatan lapangan"] --> G["Rona awal, latar, evaluasi, koreksi bias"]',
        'B --> H["Konsentrasi & deposisi (source-oriented)"]:::accent',
        'D --> I["Kontribusi sumber (receptor-oriented)"]:::accent',
        "classDef accent fill:" + c.terraBg + ",stroke:" + c.terra + ",color:" + c.text + ",font-weight:600;"
      ].join("\n"),
      "b7-aermod": [
        "flowchart TB",
        'A["AERMET: meteo permukaan+atas+permukaan"] --> C["AERMOD dispersi"]',
        'B["AERMAP: DEM → elevasi & hill-height"] --> C',
        'D["AERSURFACE: albedo/Bowen/kekasaran"] --> A',
        'E["BPIPPRM: downwash GEP"] --> C',
        'C --> F["AERSCREEN: penapisan ≥ AERMOD (conservatif)"]:::accent',
        "classDef accent fill:" + c.terraBg + ",stroke:" + c.terra + ",color:" + c.text + ",font-weight:600;"
      ].join("\n"),
      "b7-ctm": [
        "flowchart TB",
        'A["WRF (meteo)"] --> D["CTM (CMAQ/CAMx/WRF-Chem)"]',
        'B["Emisi: SMOKE/FUME 2.0 → grid/jam/spesiasi"] --> D',
        'C["Batas lateral (GEOS-Chem/CAMS)"] --> D',
        'D --> E["O3, PM primer/sekunder, deposisi + atribusi OSAT/PSAT"]:::accent',
        "classDef accent fill:" + c.terraBg + ",stroke:" + c.terra + ",color:" + c.text + ",font-weight:600;"
      ].join("\n"),
      "b7-digital": [
        "flowchart TB",
        'A["Inventaris + meteo + CTM/dispersi → prakiraan dasar"] --> B["Fusi: satelit + monitor referensi + LCS"]',
        'B --> C["Asimilasi / koreksi bias ML"]',
        'C --> D["Prakiraan probabilistik + ketidakpastian"]:::accent',
        'D --> E["Digital twin: model digital → shadow → twin adaptif"]',
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

  function initBox() {
    var root = $("#b7-box");
    if (!root || !APP_DATA.BOX) return;
    var d = APP_DATA.BOX;
    root.innerHTML =
      '<div class="b2-tool-head"><div><p class="eyebrow">Kalkulator 7.1</p><h3 class="h3">Model kotak: c = b + qL/(uH)</h3><p class="sec-desc">Estimasi orde besaran; sensitif pada VC = u·H (Bab 6.7). Default = Kotak 7.1 (E=1.000 kg/jam ↔ q≈1,39×10⁻⁶).</p></div><div class="b2-formula-mini">c = b + qL/(uH)</div></div>' +
      '<div class="b2-tool-grid"><div class="b2-tool-controls">' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b7-q">q = laju emisi per luas</label><span class="b2-range-value" id="b7-q-out"></span></div><input class="range" type="range" id="b7-q" min="0.5" max="10" step="0.01" value="' + (d.defaultQ * 1e6) + '"><div class="b2-range-meta"><span>0,5×10⁻⁶</span><span>10×10⁻⁶ g·s⁻¹·m⁻²</span></div></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b7-L">Panjang kota searah angin L</label><span class="b2-range-value" id="b7-L-out"></span></div><input class="range" type="range" id="b7-L" min="5" max="30" step="1" value="' + d.defaultL + '"><div class="b2-range-meta"><span>5 km</span><span>30 km</span></div></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b7-u">Kecepatan angin u</label><span class="b2-range-value" id="b7-u-out"></span></div><input class="range" type="range" id="b7-u" min="0.5" max="8" step="0.5" value="' + d.defaultU + '"><div class="b2-range-meta"><span>0,5</span><span>8 m/s</span></div></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b7-H">Tinggi pencampuran H</label><span class="b2-range-value" id="b7-H-out"></span></div><input class="range" type="range" id="b7-H" min="200" max="2000" step="100" value="' + d.defaultH + '"><div class="b2-range-meta"><span>200 m</span><span>2000 m</span></div></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b7-b">Latar belakang b</label><span class="b2-range-value" id="b7-b-out"></span></div><input class="range" type="range" id="b7-b" min="0" max="30" step="1" value="' + d.defaultB + '"><div class="b2-range-meta"><span>0</span><span>30 µg/m³</span></div></div>' +
      '</div><div class="b2-tool-output"><div class="b2-output-hero"><span class="b2-output-label">Konsentrasi rata-rata kota c</span><strong id="b7-c-out">0</strong><span>µg/m³</span></div>' +
      '<div class="b2-metrics"><div><span>Tambahan qL/(uH)</span><strong id="b7-delta">0</strong></div><div><span>VC = u·H</span><strong id="b7-vc">0</strong></div><div><span>τ_a = L/u</span><strong id="b7-tau">0</strong></div></div>' +
      '<p class="note" id="b7-box-formula"></p><p class="sim-hint">Hasil = rata-rata ideal volume, bukan titik panas jalan/cerobong; tak ada gradien, tak ada kimia. Untuk episode, gunakan Gaussian/CTM.</p></div></div>';
    var inpQ = $("#b7-q"), inpL = $("#b7-L"), inpU = $("#b7-u"), inpH = $("#b7-H"), inpB = $("#b7-b");
    function render() {
      var q = Number(inpQ.value) * 1e-6, L = Number(inpL.value) * 1000, u = Number(inpU.value), H = Number(inpH.value), b = Number(inpB.value);
      var delta = (q * L) / (u * H) * 1e6; // g/m3 → µg/m3
      var c = b + delta;
      var vc = u * H;
      var tau = L / u / 3600;
      $("#b7-q-out").textContent = formatId(Number(inpQ.value), 1) + "×10⁻⁶ g·s⁻¹·m⁻²";
      $("#b7-L-out").textContent = (L / 1000) + " km";
      $("#b7-u-out").textContent = u.toLocaleString("id-ID") + " m/s";
      $("#b7-H-out").textContent = H + " m";
      $("#b7-b-out").textContent = b + " µg/m³";
      $("#b7-c-out").textContent = formatId(c, 1);
      $("#b7-delta").textContent = formatId(delta, 1) + " µg/m³";
      $("#b7-vc").textContent = formatId(vc, 0) + " m²/s";
      $("#b7-tau").textContent = formatId(tau, 2) + " jam";
      $("#b7-box-formula").textContent = "c = " + b + " + " + formatId(Number(inpQ.value), 1) + "×10⁻⁶·" + (L / 1000) + "000 / (" + u + "·" + H + ")×10⁶ = " + formatId(c, 1) + " µg/m³; VC=" + formatId(vc, 0) + "; τ_a=" + formatId(tau * 3600, 0) + " s";
    }
    [inpQ, inpL, inpU, inpH, inpB].forEach(function (el) { el.addEventListener("input", render); });
    render();
  }

  function sigmaFor(stab, x) {
    var tbl = APP_DATA.GAUSSIAN.briggs[stab] || APP_DATA.GAUSSIAN.briggs["C"];
    var ay = tbl.ay, by = tbl.by, cy = tbl.cy, az = tbl.az, bz = tbl.bz, cz = tbl.cz;
    var sy = ay * x * Math.pow(1 + by * x, -cy);
    var sz = az * x * Math.pow(1 + bz * x, -cz);
    return { sy: sy, sz: sz };
  }

  function initGaussian() {
    var root = $("#b7-gauss");
    if (!root || !APP_DATA.GAUSSIAN) return;
    var G = APP_DATA.GAUSSIAN;
    root.innerHTML =
      '<div class="b2-tool-head"><div><p class="eyebrow">Kalkulator 7.2</p><h3 class="h3">Gaussian plume: C(x,0,0)</h3><p class="sec-desc">Briggs rural; refleksi tanah; geser x untuk melihat puncak σ_z≈H/√2.</p></div><div class="b2-formula-mini">C = Q/(πuσ_yσ_z)·exp(−H²/2σ_z²)</div></div>' +
      '<div class="b2-tool-grid"><div class="b2-tool-controls">' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b7-Q">Q laju emisi</label><span class="b2-range-value" id="b7-Q-out"></span></div><input class="range" type="range" id="b7-Q" min="1" max="200" step="1" value="' + G.defaultQ + '"><div class="b2-range-meta"><span>1 g/s</span><span>200 g/s</span></div></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b7-u2">u pada H_e</label><span class="b2-range-value" id="b7-u2-out"></span></div><input class="range" type="range" id="b7-u2" min="1" max="8" step="0.5" value="' + G.defaultU + '"><div class="b2-range-meta"><span>1 m/s</span><span>8 m/s</span></div></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b7-He">H_e tinggi efektif</label><span class="b2-range-value" id="b7-He-out"></span></div><input class="range" type="range" id="b7-He" min="20" max="200" step="5" value="' + G.defaultHe + '"><div class="b2-range-meta"><span>20 m</span><span>200 m</span></div></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b7-stab">Stabilitas</label><span class="b2-range-value" id="b7-stab-out"></span></div><select class="b2-select" id="b7-stab">' + ["A", "B", "C", "D", "E", "F"].map(function (s) { return '<option value="' + s + '"' + (s === G.defaultStab ? " selected" : "") + '>Kelas ' + s + '</option>'; }).join("") + '</select></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b7-x">Jarak hilir x</label><span class="b2-range-value" id="b7-x-out"></span></div><input class="range" type="range" id="b7-x" min="100" max="10000" step="100" value="1164"><div class="b2-range-meta"><span>100 m</span><span>10 km</span></div></div>' +
      '</div><div class="b2-tool-output"><div class="b2-output-hero"><span class="b2-output-label">C(x,0,0) permukaan, garis tengah</span><strong id="b7-gauss-out">0</strong><span>µg/m³</span></div>' +
      '<div class="b2-metrics"><div><span>σ_y</span><strong id="b7-sy">0</strong></div><div><span>σ_z</span><strong id="b7-sz">0</strong></div><div><span>H/√2 vs σ_z</span><strong id="b7-hsig">0</strong></div></div>' +
      '<p class="note" id="b7-gauss-formula"></p>' +
      '<div class="chart-wrap" style="height:220px;margin-top:.6rem"><canvas id="b7-gauss-chart" aria-label="Profil Gaussian vs jarak" role="img"></canvas></div><p class="sim-hint">Asumsi tunak, konservatif, datar, refleksi total; tak untuk calm, >10–50 km, atau O₃ sekunder.</p></div></div>';
    var inpQ = $("#b7-Q"), inpU = $("#b7-u2"), inpHe = $("#b7-He"), selStab = $("#b7-stab"), inpX = $("#b7-x");
    var chart = null;
    function calcC(Q, u, sy, sz, He) {
      return Q / (Math.PI * u * sy * sz) * Math.exp(-He * He / (2 * sz * sz)) * 1e6; // µg/m3
    }
    function render() {
      var Q = Number(inpQ.value), u = Number(inpU.value), He = Number(inpHe.value), stab = selStab.value, x = Number(inpX.value);
      var s = sigmaFor(stab, x);
      var c = calcC(Q, u, s.sy, s.sz, He);
      $("#b7-Q-out").textContent = Q + " g/s";
      $("#b7-u2-out").textContent = u.toLocaleString("id-ID") + " m/s";
      $("#b7-He-out").textContent = He + " m";
      $("#b7-stab-out").textContent = "Kelas " + stab;
      $("#b7-x-out").textContent = x.toLocaleString("id-ID") + " m";
      $("#b7-gauss-out").textContent = formatId(c, 1);
      $("#b7-sy").textContent = formatId(s.sy, 1) + " m";
      $("#b7-sz").textContent = formatId(s.sz, 1) + " m";
      $("#b7-hsig").textContent = formatId(He / Math.SQRT2, 1) + " vs " + formatId(s.sz, 1);
      $("#b7-gauss-formula").textContent = "C=" + Q + "/(π·" + u + "·" + formatId(s.sy, 1) + "·" + formatId(s.sz, 1) + ")·exp(−" + He + "²/2·" + formatId(s.sz, 1) + "²) = " + formatId(c, 1) + " µg/m³";
      buildMiniChart();
    }
    function buildMiniChart() {
      if (!window.Chart) return;
      var c = colors();
      Chart.defaults.font.family = "'IBM Plex Mono', monospace";
      Chart.defaults.font.size = 10;
      Chart.defaults.color = c.muted;
      var el = $("#b7-gauss-chart");
      if (!el) return;
      if (chart) chart.destroy();
      var Q = Number(inpQ.value), u = Number(inpU.value), He = Number(inpHe.value), stab = selStab.value;
      var xs = [], cs = [];
      for (var x = 100; x <= 10000; x += 200) { var s = sigmaFor(stab, x); xs.push(x); cs.push(calcC(Q, u, s.sy, s.sz, He)); }
      chart = new Chart(el, {
        type: "line",
        data: { labels: xs, datasets: [{ label: "C(x,0,0) µg/m³", data: cs, borderColor: c.sage, backgroundColor: "transparent", tension: 0.3, pointRadius: 0, borderWidth: 2 }] },
        options: {
          maintainAspectRatio: false,
          interaction: { intersect: false, mode: "index" },
          plugins: { legend: { display: false }, tooltip: { callbacks: { title: function (ctx) { return ctx[0].label + " m"; } } } },
          scales: { y: { beginAtZero: true, grid: { color: c.border }, title: { display: true, text: "µg/m³" } }, x: { grid: { display: false }, title: { display: true, text: "x (m)" }, ticks: { maxTicksLimit: 6, callback: function (v, i) { return xs[i]; } } } }
        }
      });
    }
    [inpQ, inpU, inpHe, selStab, inpX].forEach(function (el) { el.addEventListener("input", render); el.addEventListener("change", render); });
    render();
  }

  var charts = {};
  function buildCharts() {
    if (!window.Chart) return;
    var c = colors();
    Chart.defaults.font.family = "'IBM Plex Mono', monospace";
    Chart.defaults.font.size = 11;
    Chart.defaults.color = c.muted;
    var elG = $("#chart-gauss-profil");
    if (elG) {
      if (charts.gauss) charts.gauss.destroy();
      var Q = APP_DATA.GAUSSIAN.defaultQ, u = APP_DATA.GAUSSIAN.defaultU, He = APP_DATA.GAUSSIAN.defaultHe;
      var xs = [500, 1000, 1164, 2000, 5000, 10000];
      var cs = xs.map(function (x) { var s = sigmaFor("C", x); return Q / (Math.PI * u * s.sy * s.sz) * Math.exp(-He * He / (2 * s.sz * s.sz)) * 1e6; });
      charts.gauss = new Chart(elG, {
        type: "bar",
        data: { labels: xs.map(function (v) { return v.toLocaleString("id-ID") + " m"; }), datasets: [{ label: "µg/m³", data: cs, backgroundColor: xs.map(function (v, i) { return i === 2 ? c.terra : c.sage; }), borderRadius: 7, maxBarThickness: 56 }] },
        options: { maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: c.border } }, x: { grid: { display: false } } } }
      });
      var cap = $("#cap-gauss-profil"); if (cap) cap.textContent = APP_DATA.CHART_GAUSS.caption;
    }
  }
  function initThemeWatch() {
    if (!window.MutationObserver) return;
    var last = document.documentElement.getAttribute("data-theme");
    new MutationObserver(function () { var cur = document.documentElement.getAttribute("data-theme"); if (cur === last) return; last = cur; buildCharts(); renderMermaid(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  }
  function init() { renderFormulas(); renderMermaid(); initBox(); initGaussian(); buildCharts(); initThemeWatch(); }
  document.addEventListener("DOMContentLoaded", init);
})();
