/**
 * bab6.js — interaksi khusus Bab 6: Meteorologi & Termodinamika.
 * Kalkulator stabilitas (ELR/θ/Pasquill), VC & profil angin, Mermaid, Chart.js, KaTeX.
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
      "b6-rantai": [
        "flowchart TB",
        'A["Emisi Q (g/s)"] --> B["Meteorologi: u & H (VC=H·u)"]',
        'B --> C["Konsentrasi ambien C≈Q/(u·H)"]',
        'C --> D["Stabil bila: ELR<DALR (θ↑) -> akumulasi"]',
        'D --> E["Stagnasi ≥4 hari -> episode smog (Bab 1)"]:::accent',
        "classDef accent fill:" + c.terraBg + ",stroke:" + c.terra + ",color:" + c.text + ",font-weight:600;"
      ].join("\n"),
      "b6-stabilitas": [
        "flowchart TB",
        'A["Sounding T(z) -> ELR = -dT/dz"] --> B{"ELR ? Γ_d (9,8)"}',
        'B -->|"Γ > 9,8"| C["Superadiabatik: tidak stabil (A–C)"]',
        'B -->|"Γ ≈ 9,8"| D["Netral D"]',
        'B -->|"Γ < 9,8"| E["Subadiabatik stabil (E–F)"]',
        'B -->|"Γ < 0"| F["Inversi: radiasi/subsidensi/frontal/adveksi"]:::accent',
        "classDef accent fill:" + c.terraBg + ",stroke:" + c.terra + ",color:" + c.text + ",font-weight:600;"
      ].join("\n"),
      "b6-tropis": [
        "flowchart TB",
        'A["Monsun Asia barat (hujan Okt–Apr) vs Australia timur (kemarau Apr–Okt)"] --> C["Kemarau = puncak PM (washout hilang)"]',
        'B["ENSO+ & IOD+: konveksi menjauh, hujan <20 mm/bln"] --> C',
        'C --> D["Lahan gambut kering -> karhutla -> PM2,5 lintas batas"]:::accent',
        'D --> E["Stagnasi +40 hari/tahun tropis pada akhir abad (Horton)"]',
        "classDef accent fill:" + c.terraBg + ",stroke:" + c.terra + ",color:" + c.text + ",font-weight:600;"
      ].join("\n"),
      "b6-plume": [
        "flowchart TB",
        'A["Stabil di bawah plume, tak stabil di atas"] --> B["Lofting (baik)"]',
        'C["Superadiabatik bawah"] --> D["Looping / Coning"]',
        'E["Stabil kuat F"] --> F["Fanning (pipih)"]',
        'G["Inversi diruntuhkan pagi"] --> H["Fumigation (lonjakan sesaat)"]:::accent',
        'I["Inversi atas+bawah"] --> J["Trapping"]',
        "classDef accent fill:" + c.terraBg + ",stroke:" + c.terra + ",color:" + c.text + ",font-weight:600;"
      ].join("\n"),
      "b6-angin": [
        "flowchart TB",
        'A["Anemometer 10 m"] --> B["Power law: u(z)=u₁(z/z₁)^p"]',
        'B --> C["Siang konvektif: PBL 1–3 km, campuran baik"]',
        'B --> D["Malam stabil: nokturnal ±100–200 m + residual"]',
        'D --> E["Pagi: konvektif memakan residual -> fumigation"]:::accent',
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

  function theta(T, p) { // T in C, p in hPa -> K
    var Tk = T + 273.15;
    return Tk * Math.pow(1000 / p, 0.286);
  }

  function pasquillClass(u, insol, nightCloud) {
    // insol: strong/medium/weak, nightCloud: cloudy/clear, u in m/s
    // simplified per Table 6.1; night detection via insol === 'night'
    if (insol === "overcast") return "D";
    if (nightCloud) {
      if (u < 2) return nightCloud === "clear" ? "F" : "—";
      if (u < 3) return nightCloud === "clear" ? "F" : "E";
      if (u < 5) return nightCloud === "clear" ? "E" : "D";
      return "D";
    }
    // day
    if (u < 2) {
      if (insol === "strong") return "A";
      if (insol === "medium") return "A–B";
      return "B";
    }
    if (u < 3) {
      if (insol === "strong") return "A–B";
      if (insol === "medium") return "B";
      return "C";
    }
    if (u < 5) {
      if (insol === "strong") return "B";
      if (insol === "medium") return "B–C";
      return "C";
    }
    if (u < 6) {
      if (insol === "strong") return "C";
      if (insol === "medium") return "C–D";
      return "D";
    }
    if (insol === "strong") return "C";
    return "D";
  }

  function initStability() {
    var root = $("#b6-stability");
    if (!root) return;
    root.innerHTML =
      '<div class="b2-tool-head"><div><p class="eyebrow">Kalkulator 6.1</p><h3 class="h3">ELR & θ & Pasquill</h3><p class="sec-desc">Masukkan sounding 2 titik; lihat Γ vs 9,8 dan kelas Pasquill otomatis.</p></div><div class="b2-formula-mini">Γ = −dT/dz · θ = T(p₀/p)^0,286</div></div>' +
      '<div class="b2-tool-grid"><div class="b2-tool-controls">' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b6-T0">T permukaan (°C, 0 m, ±1000 hPa)</label><span class="b2-range-value" id="b6-T0-out"></span></div><input class="range" type="range" id="b6-T0" min="10" max="38" step="0.5" value="20"><div class="b2-range-meta"><span>10 °C</span><span>38 °C</span></div></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b6-T1">T atas (°C, pada z₁)</label><span class="b2-range-value" id="b6-T1-out"></span></div><input class="range" type="range" id="b6-T1" min="5" max="38" step="0.5" value="12"><div class="b2-range-meta"><span>5 °C</span><span>38 °C</span></div></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b6-z1">Ketinggian lapisan z₁</label><span class="b2-range-value" id="b6-z1-out"></span></div><input class="range" type="range" id="b6-z1" min="100" max="1500" step="50" value="500"><div class="b2-range-meta"><span>100 m</span><span>1500 m</span></div></div>' +
      '<div class="b2-range-row" style="display:grid;grid-template-columns:1fr 1fr;gap:.6rem"><div><label style="font-size:.82rem;font-weight:600">Angin 10 m (m/s)</label><select class="b2-select" id="b6-u"><option value="1.5">1,5 (lemah)</option><option value="2.5" selected>2,5</option><option value="4">4,0</option><option value="5.5">5,5</option><option value="7">7,0 (kuat)</option></select></div><div><label style="font-size:.82rem;font-weight:600">Kondisi waktu</label><select class="b2-select" id="b6-insol"><option value="strong">Siang terik</option><option value="medium" selected>Siang sedang</option><option value="weak">Siang lemah/dingin</option><option value="overcast">Berawan tebal</option><option value="night-clear">Malam cerah (&lt;50%)</option><option value="night-cloudy">Malam berawan (≥50%)</option></select></div></div>' +
      '</div><div class="b2-tool-output"><div class="b2-output-hero"><span class="b2-output-label">Stabilitas</span><strong id="b6-stab-out">—</strong><span id="b6-pasq-out">Pasquill —</span></div>' +
      '<div class="b2-metrics"><div><span>ELR Γ</span><strong id="b6-elr">0</strong></div><div><span>θ₀ → θ₁</span><strong id="b6-theta">0</strong></div><div><span>∂θ/∂z</span><strong id="b6-dtheta">0</strong></div></div>' +
      '<p class="note" id="b6-stab-formula"></p><p class="sim-hint">Superadiabatik Γ>9,8 tidak stabil; subadiabatik stabil; Γ<0 inversi. Pasquill A–F menentukan σ_y, σ_z Bab 7.</p></div></div>';
    var inpT0 = $("#b6-T0"), inpT1 = $("#b6-T1"), inpZ1 = $("#b6-z1"), selU = $("#b6-u"), selInsol = $("#b6-insol");
    function render() {
      var T0 = Number(inpT0.value), T1 = Number(inpT1.value), z1 = Number(inpZ1.value);
      var p0 = 1000, p1 = 1000 - z1 * 0.11; // approx -11 hPa per 100 m
      if (p1 < 850) p1 = 850;
      var elr = (T0 - T1) / (z1 / 1000); // K/km
      var th0 = theta(T0, p0), th1 = theta(T1, p1);
      var dtheta = (th1 - th0) / (z1 / 1000);
      var stab = "", desc = "";
      if (elr < 0) { stab = "Inversi (stabil ekstrem)"; desc = "Γ<0 → fanning/trapping; malam–dini hari, lembah"; }
      else if (elr > 9.8) { stab = "Superadiabatik — tidak stabil"; desc = "Γ>Γd → looping (A–B) siang terik"; }
      else if (elr >= 8.8) { stab = "Mendekati netral"; desc = "Γ≈Γd (toleransi ±1) → coning (D)"; }
      else { stab = "Subadiabatik — stabil"; desc = "Γ<Γd → dispersi lemah (E–F); bila 4–7 dan jenuh, tak stabil kondisional (Γs)"; }
      // Cross-check with theta
      var thetaStab = dtheta < -0.5 ? " (θ turun = tidak stabil)" : dtheta > 0.5 ? " (θ naik = stabil)" : " (θ≈ netral)";
      var u = Number(selU.value);
      var insol = selInsol.value;
      var pasq = "";
      if (insol === "overcast") pasq = "D (overcast)";
      else if (insol === "night-clear" || insol === "night-cloudy") {
        var nc = insol === "night-clear" ? "clear" : "cloudy";
        pasq = pasquillClass(u, null, nc);
      } else {
        pasq = pasquillClass(u, insol, null);
      }
      $("#b6-T0-out").textContent = T0.toLocaleString("id-ID") + " °C";
      $("#b6-T1-out").textContent = T1.toLocaleString("id-ID") + " °C @ " + z1 + " m";
      $("#b6-z1-out").textContent = z1 + " m (p≈" + Math.round(p1) + " hPa)";
      $("#b6-stab-out").textContent = stab;
      $("#b6-pasq-out").textContent = "Pasquill " + pasq;
      $("#b6-elr").textContent = formatId(elr, 1) + " K/km";
      $("#b6-theta").textContent = formatId(th0, 1) + " → " + formatId(th1, 1) + " K";
      $("#b6-dtheta").textContent = formatId(dtheta, 1) + " K/km";
      $("#b6-stab-formula").textContent = "Γ = (" + T0 + "−" + T1 + ")/" + (z1 / 1000).toLocaleString("id-ID") + " = " + formatId(elr, 1) + " K/km vs 9,8" + thetaStab + "; " + desc + " | Pasquill " + pasq + " → σ di Bab 7.";
    }
    [inpT0, inpT1, inpZ1, selU, selInsol].forEach(function (el) { el.addEventListener("input", render); el.addEventListener("change", render); });
    render();
  }

  function initVCWind() {
    var root = $("#b6-vcwind");
    if (!root) return;
    root.innerHTML =
      '<div class="b2-tool-head"><div><p class="eyebrow">Kalkulator 6.2</p><h3 class="h3">VC = H·ū & profil angin</h3><p class="sec-desc">Ambang 6.000 m²/s dan ekstrapolasi power-law untuk tinggi cerobong.</p></div><div class="b2-formula-mini">VC = H×ū · u(z)=u₁(z/z₁)^p</div></div>' +
      '<div class="b2-tool-grid"><div class="b2-tool-controls">' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b6-H">Mixing height H</label><span class="b2-range-value" id="b6-H-out"></span></div><input class="range" type="range" id="b6-H" min="100" max="2500" step="50" value="1500"><div class="b2-range-meta"><span>100 m (dini)</span><span>2500 m (konvektif)</span></div></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b6-ubar">Kecepatan angin rata-rata ū</label><span class="b2-range-value" id="b6-ubar-out"></span></div><input class="range" type="range" id="b6-ubar" min="0.5" max="8" step="0.5" value="4"><div class="b2-range-meta"><span>0,5 m/s</span><span>8 m/s</span></div></div>' +
      '<div class="b2-range-row" style="border-top:1px solid var(--border);padding-top:.6rem;margin-top:.2rem"><div class="b2-range-head"><label for="b6-u10">u₁₀ observasi</label><span class="b2-range-value" id="b6-u10-out"></span></div><input class="range" type="range" id="b6-u10" min="0.5" max="8" step="0.5" value="3"><div class="b2-range-meta"><span>0,5</span><span>8 m/s di 10 m</span></div></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b6-p">Eksponen p (stabilitas & kekasaran)</label><span class="b2-range-value" id="b6-p-out"></span></div><input class="range" type="range" id="b6-p" min="0.1" max="0.6" step="0.05" value="0.14"><div class="b2-range-meta"><span>0,10 tidak stabil terbuka</span><span>0,60 stabil kota</span></div><select class="b2-select" id="b6-p-preset" style="margin-top:.4rem"><option value="0.14">p=0,14 netral terbuka (1/7)</option><option value="0.25">p=0,25 industri tepi kota</option><option value="0.35">p=0,35 kota stabil</option><option value="0.5">p=0,50 sangat stabil kota</option></select></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b6-z">Tinggi target z</label><span class="b2-range-value" id="b6-z-out"></span></div><input class="range" type="range" id="b6-z" min="10" max="300" step="10" value="150"><div class="b2-range-meta"><span>10 m</span><span>300 m cerobong</span></div></div>' +
      '</div><div class="b2-tool-output"><div class="b2-output-hero"><span class="b2-output-label">Ventilation coefficient</span><strong id="b6-VC-out">0</strong><span>m²/s</span></div>' +
      '<div class="b2-metrics"><div><span>Status</span><strong id="b6-VC-status">—</strong></div><div><span>u(z) target</span><strong id="b6-uz">0</strong></div><div><span>Vs Beijing semi</span><strong id="b6-vc-vs">—</strong></div></div>' +
      '<p class="note" id="b6-VC-formula"></p><p class="note" id="b6-wind-formula"></p><p class="sim-hint">VC&lt;6.000 potensi tinggi (Portelli & Lewis). Power law hanya untuk PBL; di atas ~300 m gunakan log law dengan z₀.</p></div></div>';
    var inpH = $("#b6-H"), inpUbar = $("#b6-ubar"), inpU10 = $("#b6-u10"), inpP = $("#b6-p"), selP = $("#b6-p-preset"), inpZ = $("#b6-z");
    selP.addEventListener("change", function () { inpP.value = selP.value; render(); });
    function render() {
      var H = Number(inpH.value), ubar = Number(inpUbar.value), u10 = Number(inpU10.value), p = Number(inpP.value), z = Number(inpZ.value);
      var vc = H * ubar;
      var uz = u10 * Math.pow(z / 10, p);
      $("#b6-H-out").textContent = H + " m";
      $("#b6-ubar-out").textContent = ubar.toLocaleString("id-ID") + " m/s";
      $("#b6-u10-out").textContent = u10.toLocaleString("id-ID") + " m/s";
      $("#b6-p-out").textContent = p.toLocaleString("id-ID", { minimumFractionDigits: 2 });
      $("#b6-z-out").textContent = z + " m";
      $("#b6-VC-out").textContent = formatId(vc, 0);
      var status = vc < 6000 ? "Potensi tinggi (<6.000)" : vc < 8000 ? "Ambang" : "Baik";
      $("#b6-VC-status").textContent = status;
      $("#b6-uz").textContent = formatId(uz, 1) + " m/s";
      $("#b6-vc-vs").textContent = vc < 2580 ? "< gugur Beijing" : vc < 2953 ? "< panas Beijing" : vc < 3940 ? "< semi Beijing" : "> semi";
      $("#b6-VC-formula").textContent = "VC = " + H + " × " + ubar + " = " + formatId(vc, 0) + " m²/s " + (vc < 6000 ? "(<6.000 → potensi tinggi)" : "(≥6.000 → baik)");
      $("#b6-wind-formula").textContent = "u(" + z + ") = " + u10 + " × (" + z + "/10)^" + p.toLocaleString("id-ID", { minimumFractionDigits: 2 }) + " = " + formatId(uz, 2) + " m/s";
    }
    [inpH, inpUbar, inpU10, inpP, inpZ].forEach(function (el) { el.addEventListener("input", render); });
    render();
  }

  var charts = {};
  function buildCharts() {
    if (!window.Chart) return;
    var c = colors();
    Chart.defaults.font.family = "'IBM Plex Mono', monospace";
    Chart.defaults.font.size = 11;
    Chart.defaults.color = c.muted;
    var elVC = $("#chart-vc");
    if (elVC && APP_DATA.CHART_VC) {
      if (charts.vc) charts.vc.destroy();
      charts.vc = new Chart(elVC, {
        type: "bar",
        data: { labels: APP_DATA.CHART_VC.labels, datasets: [{ label: "VC (m²/s)", data: APP_DATA.CHART_VC.data, backgroundColor: APP_DATA.CHART_VC.data.map(function (v, i) { return i === 3 ? c.terra : c.sage; }), borderRadius: 7, maxBarThickness: 56 }] },
        options: { maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: c.border }, title: { display: true, text: "m²/s" } }, x: { grid: { display: false } } } }
      });
      var cap = $("#cap-vc"); if (cap) cap.textContent = APP_DATA.CHART_VC.caption;
    }
    var elK = $("#chart-karhutla-enso");
    if (elK && APP_DATA.CHART_KARHUTLA_ENSO) {
      if (charts.enso) charts.enso.destroy();
      charts.enso = new Chart(elK, {
        type: "bar",
        data: { labels: APP_DATA.CHART_KARHUTLA_ENSO.labels, datasets: [{ label: "Juta ha", data: APP_DATA.CHART_KARHUTLA_ENSO.data, backgroundColor: c.sage, borderRadius: 7, maxBarThickness: 56 }] },
        options: { maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: c.border } }, x: { grid: { display: false } } } }
      });
      var cap2 = $("#cap-karhutla-enso"); if (cap2) cap2.textContent = APP_DATA.CHART_KARHUTLA_ENSO.caption;
    }
  }
  function initThemeWatch() {
    if (!window.MutationObserver) return;
    var last = document.documentElement.getAttribute("data-theme");
    new MutationObserver(function () { var cur = document.documentElement.getAttribute("data-theme"); if (cur === last) return; last = cur; buildCharts(); renderMermaid(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  }
  function init() { renderFormulas(); renderMermaid(); initStability(); initVCWind(); buildCharts(); initThemeWatch(); }
  document.addEventListener("DOMContentLoaded", init);
})();
