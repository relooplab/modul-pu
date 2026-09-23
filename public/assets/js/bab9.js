/**
 * bab9.js — Bab 9 Teknologi Pengendalian Pencemaran Udara.
 * Kalkulator nines/Deutsch–Anderson, koreksi O₂ & W_fan, Mermaid, Chart.js, KaTeX.
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
      "b9-hirarki": [
        "flowchart TB",
        'A["Pencegahan (ganti bahan bakar rendah S)"] --> B["Recovery (gipsum FGD, pelarut)"]',
        'B --> C["End-of-pipe: ESP/baghouse, FGD, LNB/SCR, oksidator/biofilter"]',
        'C --> D["Dispersi cerobong tinggi (pengencer, bukan pengurangan)"]:::accent',
        "classDef accent fill:" + c.terraBg + ",stroke:" + c.terra + ",color:" + c.text + ",font-weight:600;"
      ].join("\n"),
      "b9-pm": [
        "flowchart TB",
        'A["Alat dinding: gravity, siklon, ESP (wA/Q)"] --> C["Kolektor PM: pilih via d_cut, T, ΔP, sifat debu"]',
        'B["Alat pembelah: baghouse, venturi (ΔP tinggi)"] --> C',
        'C --> D["Kriteria: baghouse halus & ΔP tinggi vs ESP volume besar ΔP rendah"]:::accent',
        "classDef accent fill:" + c.terraBg + ",stroke:" + c.terra + ",color:" + c.text + ",font-weight:600;"
      ].join("\n"),
      "b9-soxnox": [
        "flowchart TB",
        'A["Bahan bakar rendah S / blending"] --> C["FGD basah CaCO₃→gipsum (>90%) vs seawater 36–43%"]',
        'B["LNB/FGR/staging (puluhan %)"] --> D["SCR 300–400°C 80–90% vs SNCR 850–1100°C jendela sempit"]',
        'C --> E["Kombinasi: ESP/baghouse + FGD + LNB/SCR + CEMS"]:::accent',
        'D --> E',
        "classDef accent fill:" + c.terraBg + ",stroke:" + c.terra + ",color:" + c.text + ",font-weight:600;"
      ].join("\n")
    };
    for (var id in src) {
      var t = document.getElementById(id);
      if (!t) continue;
      try { var out = await mermaid.render(id + "-svg-" + Date.now(), src[id]); t.innerHTML = out.svg; } catch (e) { t.innerHTML = '<p class="note">Diagram tidak dapat dimuat.</p>'; }
    }
  }
  function fmt(n, d) { return Number(n).toLocaleString("id-ID", { minimumFractionDigits: d || 0, maximumFractionDigits: d == null ? 2 : d }); }

  function initEfficiency() {
    var root = $("#b9-eff");
    if (!root) return;
    root.innerHTML =
      '<div class="b2-tool-head"><div><p class="eyebrow">Kalkulator 9.1</p><h3 class="h3">η, P, nines & Deutsch–Anderson</h3><p class="sec-desc">Geser η atau gunakan nines; lihat kebutuhan A untuk ESP (ideal) vs seri.</p></div><div class="b2-formula-mini">η=1−P · A=−(Q/w)ln P</div></div>' +
      '<div class="b2-tool-grid"><div class="b2-tool-controls">' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b9-eta">Efisiensi η</label><span class="b2-range-value" id="b9-eta-out"></span></div><input class="range" type="range" id="b9-eta" min="90" max="99.99" step="0.01" value="99"><div class="b2-range-meta"><span>90% (one nine)</span><span>99,99% (four nines)</span></div><div style="margin-top:.4rem;display:flex;gap:.4rem;flex-wrap:wrap"><button type="button" class="btn btn-ghost" data-nine="90">90%</button><button type="button" class="btn btn-ghost" data-nine="99">99%</button><button type="button" class="btn btn-ghost" data-nine="99.9">99,9%</button><button type="button" class="btn btn-ghost" data-nine="99.99">99,99%</button></div></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b9-Q">Q (gas)</label><span class="b2-range-value" id="b9-Q-out"></span></div><input class="range" type="range" id="b9-Q" min="50" max="300" step="10" value="100"><div class="b2-range-meta"><span>50 m³/s</span><span>300 m³/s</span></div></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b9-w">w (drift, untuk A ideal)</label><span class="b2-range-value" id="b9-w-out"></span></div><input class="range" type="range" id="b9-w" min="0.04" max="0.15" step="0.01" value="0.08"><div class="b2-range-meta"><span>0,04 m/s</span><span>0,15 m/s</span></div></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b9-k">Eksponen modifikasi k (halus)</label><span class="b2-range-value" id="b9-k-out"></span></div><input class="range" type="range" id="b9-k" min="0.5" max="1" step="0.1" value="0.5"><div class="b2-range-meta"><span>0,5 (modifikasi)</span><span>1,0 (ideal)</span></div></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label>Seri dua alat</label><span class="b2-range-value" id="b9-seri-info"></span></div><div style="display:flex;gap:.4rem"><select class="b2-select" id="b9-eta1" style="flex:1"><option value="90">90%</option><option value="95">95%</option><option value="99">99%</option></select><select class="b2-select" id="b9-eta2" style="flex:1"><option value="90" selected>90%</option><option value="95">95%</option><option value="99">99%</option></select></div></div>' +
      '</div><div class="b2-tool-output"><div class="b2-output-hero"><span class="b2-output-label">Penetrasi P & nines</span><strong id="b9-P-out">0</strong><span id="b9-nines">two nines</span></div>' +
      '<div class="b2-metrics"><div><span>A ideal (m²)</span><strong id="b9-A">0</strong></div><div><span>A/A(90%)</span><strong id="b9-Aratio">0</strong></div><div><span>η seri</span><strong id="b9-seri">0</strong></div></div>' +
      '<p class="note" id="b9-eff-formula"></p><p class="note" id="b9-A-formula"></p><p class="sim-hint">Modifikasi: P=exp[−(wA/Q)^k]. Untuk halus, k≈0,5 → kebutuhan A lebih besar dari ideal. Cerobong Suralaya PM<60/100 adalah C_out, bukan η tanpa C_in.</p></div></div>';
    var inpEta = $("#b9-eta"), inpQ = $("#b9-Q"), inpW = $("#b9-w"), inpK = $("#b9-k"), sel1 = $("#b9-eta1"), sel2 = $("#b9-eta2");
    function ninesLabel(p) {
      if (p <= 0.00011) return "four nines";
      if (p <= 0.0011) return "three nines";
      if (p <= 0.011) return "two nines";
      if (p <= 0.11) return "one nine";
      return "—";
    }
    function render() {
      var eta = Number(inpEta.value) / 100, P = 1 - eta, Q = Number(inpQ.value), w = Number(inpW.value), k = Number(inpK.value);
      var Aideal = -(Q / w) * Math.log(P);
      var Aratio = Aideal / (-(Q / w) * Math.log(0.1));
      var Amod = Math.pow(-Math.log(P), 1 / k) * (Q / w);
      var p1 = 1 - Number(sel1.value) / 100, p2 = 1 - Number(sel2.value) / 100;
      var etaSeri = 1 - p1 * p2;
      $("#b9-eta-out").textContent = fmt(Number(inpEta.value), 2) + "%";
      $("#b9-Q-out").textContent = Q + " m³/s";
      $("#b9-w-out").textContent = fmt(w, 2) + " m/s";
      $("#b9-k-out").textContent = fmt(k, 1);
      $("#b9-seri-info").textContent = sel1.value + "% + " + sel2.value + "%";
      $("#b9-P-out").textContent = fmt(P, 4);
      $("#b9-nines").textContent = ninesLabel(P);
      $("#b9-A").textContent = fmt(Aideal, 0) + " m² (k=1) · " + fmt(Amod, 0) + " m² (k=" + fmt(k, 1) + ")";
      $("#b9-Aratio").textContent = fmt(Aratio, 2) + "×";
      $("#b9-seri").textContent = fmt(etaSeri * 100, 1) + "%";
      $("#b9-eff-formula").textContent = "η=" + fmt(Number(inpEta.value), 2) + "% → P=" + fmt(P, 4) + " (" + ninesLabel(P) + "); seri " + sel1.value + "% & " + sel2.value + "% → η_total=1−" + fmt(p1, 3) + "·" + fmt(p2, 3) + "=" + fmt(etaSeri * 100, 1) + "%";
      $("#b9-A-formula").textContent = "A=−(Q/w)ln P = −(" + Q + "/" + fmt(w, 2) + ")·ln " + fmt(P, 4) + " = " + fmt(Aideal, 0) + " m² (ideal); 90→99 butuh 2× (ln0,01/ln0,1), 90→99,9 3×, 99,99 4×.";
    }
    inpEta.addEventListener("input", render); inpQ.addEventListener("input", render); inpW.addEventListener("input", render); inpK.addEventListener("input", render); sel1.addEventListener("change", render); sel2.addEventListener("change", render);
    root.querySelectorAll("[data-nine]").forEach(function (b) { b.addEventListener("click", function () { inpEta.value = b.getAttribute("data-nine"); render(); }); });
    render();
  }

  function initO2Fan() {
    var root = $("#b9-o2fan");
    if (!root) return;
    root.innerHTML =
      '<div class="b2-tool-head"><div><p class="eyebrow">Kalkulator 9.2</p><h3 class="h3">Koreksi O₂ & daya fan</h3><p class="sec-desc">Basis kering konsisten &amp; ΔP menentukan parasit PLTU.</p></div><div class="b2-formula-mini">C_ref=C·(20,9−O₂ref)/(20,9−O₂ukur) · W=QΔP/η</div></div>' +
      '<div class="b2-tool-grid"><div class="b2-tool-controls">' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b9-Cukur">C_ukur</label><span class="b2-range-value" id="b9-Cukur-out"></span></div><input class="range" type="range" id="b9-Cukur" min="10" max="800" step="10" value="480"><div class="b2-range-meta"><span>10 mg/Nm³</span><span>800</span></div></div>' +
      '<div class="b2-range-row" style="display:grid;grid-template-columns:1fr 1fr;gap:.6rem"><div><label style="font-size:.82rem;font-weight:600">O₂ ukur (%)</label><input class="b2-select" id="b9-O2ukur" type="number" step="0.5" value="9" style="text-align:right"></div><div><label style="font-size:.82rem;font-weight:600">O₂ ref (%)</label><select class="b2-select" id="b9-O2ref"><option value="6">6 (padat)</option><option value="3">3 (gas)</option><option value="7" selected>7 (contoh)</option></select></div></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b9-Q2">Q aktual</label><span class="b2-range-value" id="b9-Q2-out"></span></div><input class="range" type="range" id="b9-Q2" min="50" max="400" step="10" value="100"><div class="b2-range-meta"><span>50 m³/s (aktual)</span><span>400</span></div></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b9-dP">ΔP alat</label><span class="b2-range-value" id="b9-dP-out"></span></div><input class="range" type="range" id="b9-dP" min="200" max="4000" step="100" value="1500"><div class="b2-range-meta"><span>200 Pa</span><span>4000 Pa (venturi)</span></div></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b9-etafan">η_fan</label><span class="b2-range-value" id="b9-etafan-out"></span></div><input class="range" type="range" id="b9-etafan" min="0.6" max="0.85" step="0.05" value="0.7"><div class="b2-range-meta"><span>0,60</span><span>0,85</span></div></div>' +
      '</div><div class="b2-tool-output"><div class="b2-output-hero"><span class="b2-output-label">C_ref (O₂ terkoreksi)</span><strong id="b9-Cref-out">0</strong><span>mg/Nm³</span></div>' +
      '<div class="b2-metrics"><div><span>Faktor koreksi</span><strong id="b9-fO2">0</strong></div><div><span>Daya fan W</span><strong id="b9-Wfan">0</strong></div><div><span>Vs BME 550</span><strong id="b9-vsBME">—</strong></div></div>' +
      '<p class="note" id="b9-O2-formula"></p><p class="note" id="b9-fan-formula"></p><p class="sim-hint">Pengenceran udara menaikkan O₂ ukur → C tampak turun. Basis kering/basah harus konsisten; Q untuk W_fan adalah Q aktual (bukan Nm³).</p></div></div>';
    var inpC = $("#b9-Cukur"), inpO2m = $("#b9-O2ukur"), selO2r = $("#b9-O2ref"), inpQ2 = $("#b9-Q2"), inpDP = $("#b9-dP"), inpEtaF = $("#b9-etafan");
    function render() {
      var C = Number(inpC.value), O2m = Number(inpO2m.value), O2r = Number(selO2r.value), Q = Number(inpQ2.value), dP = Number(inpDP.value), ef = Number(inpEtaF.value);
      var f = (20.9 - O2r) / (20.9 - O2m);
      var Cref = C * f;
      var W = Q * dP / ef;
      $("#b9-Cukur-out").textContent = C + " mg/Nm³";
      $("#b9-Q2-out").textContent = Q + " m³/s";
      $("#b9-dP-out").textContent = fmt(dP, 0) + " Pa";
      $("#b9-etafan-out").textContent = fmt(ef, 2);
      $("#b9-Cref-out").textContent = fmt(Cref, 1);
      $("#b9-fO2").textContent = fmt(f, 3) + "×";
      $("#b9-Wfan").textContent = fmt(W / 1000, 1) + " kW";
      $("#b9-vsBME").textContent = Cref <= 550 ? "Patuh Kat.1" : Cref <= 200 ? "Perlu Kat.baru" : "Tidak patuh";
      $("#b9-O2-formula").textContent = "C_ref=" + C + "·(20,9−" + O2r + ")/(20,9−" + O2m + ")=" + C + "·" + fmt(f, 3) + "=" + fmt(Cref, 1) + " mg/Nm³";
      $("#b9-fan-formula").textContent = "W=" + Q + "·" + fmt(dP, 0) + "/" + fmt(ef, 2) + "=" + fmt(W, 0) + " W (" + fmt(W / 1e6, 3) + " MW); baghouse/venturi ΔP tinggi → parasit besar.";
    }
    [inpC, inpO2m, selO2r, inpQ2, inpDP, inpEtaF].forEach(function (el) { el.addEventListener("input", render); el.addEventListener("change", render); });
    render();
  }

  var charts = {};
  function buildCharts() {
    if (!window.Chart) return;
    var c = colors();
    Chart.defaults.font.family = "'IBM Plex Mono', monospace";
    Chart.defaults.font.size = 11;
    Chart.defaults.color = c.muted;
    var elBME = $("#chart-bme");
    if (elBME && APP_DATA.CHART_BME) {
      if (charts.bme) charts.bme.destroy();
      charts.bme = new Chart(elBME, {
        type: "bar",
        data: {
          labels: APP_DATA.CHART_BME.labels,
          datasets: [
            { label: "Kat.1 lama 550/100", data: APP_DATA.CHART_BME.indoOld, backgroundColor: c.terra, borderRadius: 7, maxBarThickness: 42 },
            { label: "Baru 200/50", data: APP_DATA.CHART_BME.indoNew, backgroundColor: "#9BBE8A", borderRadius: 7, maxBarThickness: 42 },
            { label: "Tiongkok 50/35/10", data: APP_DATA.CHART_BME.china, backgroundColor: c.sage, borderRadius: 7, maxBarThickness: 42 }
          ]
        },
        options: { maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { boxWidth: 12, padding: 12, usePointStyle: true } } }, scales: { y: { beginAtZero: true, grid: { color: c.border }, title: { display: true, text: "mg/Nm³" } }, x: { grid: { display: false } } } }
      });
      var cap = $("#cap-bme"); if (cap) cap.textContent = APP_DATA.CHART_BME.caption;
    }
    var elCo = $("#chart-cofiring");
    if (elCo && APP_DATA.CHART_COFIRING) {
      if (charts.cofiring) charts.cofiring.destroy();
      charts.cofiring = new Chart(elCo, {
        type: "bar",
        data: {
          labels: APP_DATA.CHART_COFIRING.labels,
          datasets: [
            { label: "MWh (juta)", data: APP_DATA.CHART_COFIRING.mwh, backgroundColor: c.sage, borderRadius: 7, maxBarThickness: 42 },
            { label: "CO₂ turun (juta ton)", data: APP_DATA.CHART_COFIRING.co2, backgroundColor: c.terra, borderRadius: 7, maxBarThickness: 42 }
          ]
        },
        options: { maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { boxWidth: 12, padding: 12, usePointStyle: true } } }, scales: { y: { beginAtZero: true, grid: { color: c.border } }, x: { grid: { display: false } } } }
      });
      var cap2 = $("#cap-cofiring"); if (cap2) cap2.textContent = APP_DATA.CHART_COFIRING.caption;
    }
  }
  function initThemeWatch() {
    if (!window.MutationObserver) return;
    var last = document.documentElement.getAttribute("data-theme");
    new MutationObserver(function () { var cur = document.documentElement.getAttribute("data-theme"); if (cur === last) return; last = cur; buildCharts(); renderMermaid(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  }
  function init() { renderFormulas(); renderMermaid(); initEfficiency(); initO2Fan(); buildCharts(); initThemeWatch(); }
  document.addEventListener("DOMContentLoaded", init);
})();
