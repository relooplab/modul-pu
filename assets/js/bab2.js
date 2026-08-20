/**
 * bab2.js — interaksi khusus Bab 2:
 * konversi konsentrasi, model kotak, formula KaTeX, dan diagram Mermaid.
 */
(function () {
  "use strict";

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }

  function colors() {
    var cs = getComputedStyle(document.documentElement);
    function v(key) { return cs.getPropertyValue(key).trim(); }
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
      "b2-cycle": [
        "flowchart LR",
        'A["Sumber dan emisi"] --> B["Transport dan dispersi"]',
        'B --> C["Transformasi fisik-kimia"]',
        'C --> D["Deposisi kering/basah"]',
        'D --> E["Reseptor: manusia, ekosistem, material"]:::accent',
        "classDef accent fill:" + c.terraBg + ",stroke:" + c.terra + ",color:" + c.text + ",font-weight:600;"
      ].join("\n"),
      "b2-chemistry": [
        "flowchart TB",
        'A["NO2 + sinar matahari"] --> B["NO + O"]',
        'B --> C["O + O2 -> O3"]',
        'C --> D["O3 + NO -> NO2"]',
        'V["VOC + HO2/RO2"] --> D',
        'D --> E["Produksi bersih O3 dan aerosol sekunder"]:::accent',
        "classDef accent fill:" + c.terraBg + ",stroke:" + c.terra + ",color:" + c.text + ",font-weight:600;"
      ].join("\n"),
      "b2-one-atmosphere": [
        "flowchart TB",
        'A["Pembakaran fosil dan biomassa"] --> B["Pencemaran udara"]',
        'A --> C["Perubahan iklim"]',
        'B <--> C',
        'B --> D["Kesehatan dan ekosistem"]:::accent',
        'C --> D',
        "classDef accent fill:" + c.terraBg + ",stroke:" + c.terra + ",color:" + c.text + ",font-weight:600;"
      ].join("\n")
    };
    for (var id in sources) {
      var target = document.getElementById(id);
      if (!target) continue;
      try {
        var output = await mermaid.render(id + "-svg-" + Date.now(), sources[id]);
        target.innerHTML = output.svg;
      } catch (e) {
        target.innerHTML = '<p class="note">Diagram tidak dapat dimuat.</p>';
      }
    }
  }

  function format(value, digits) {
    return Number(value).toLocaleString("id-ID", { minimumFractionDigits: digits || 0, maximumFractionDigits: digits || 0 });
  }

  function initConverter() {
    var root = $("#b2-converter");
    if (!root || !APP_DATA.CONVERTER) return;
    var cfg = APP_DATA.CONVERTER;
    root.innerHTML =
      '<div class="b2-tool-grid">' +
      '<div class="b2-tool-controls">' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b2-conv-gas">Gas</label></div>' +
      '<select class="b2-select" id="b2-conv-gas" aria-label="Pilih gas">' + cfg.gases.map(function (gas) {
        return '<option value="' + gas.id + '"' + (gas.id === cfg.defaultGas ? " selected" : "") + '>' + gas.label + ' · BM ' + gas.mw + ' g/mol</option>';
      }).join("") + '</select></div>' +
      '<div class="b2-range-row"><div class="b2-range-head"><label for="b2-conv-ppm">Konsentrasi (ppm)</label><span class="b2-range-value" id="b2-conv-ppm-output"></span></div>' +
      '<input class="range" type="range" id="b2-conv-ppm" min="0" max="1" step="0.001" value="' + cfg.defaultPpm + '" aria-label="Konsentrasi dalam ppm">' +
      '<div class="b2-range-meta"><span>0 ppm</span><span>1 ppm</span></div></div>' +
      '</div>' +
      '<div class="b2-tool-output"><div class="b2-output-hero"><span class="b2-output-label">Konsentrasi massa</span><strong id="b2-conv-output">0</strong><span>µg/m³</span></div>' +
      '<p class="note" id="b2-conv-formula"></p><p class="sim-hint">Asumsi: gas ideal, 25 °C, 1 atm, volume molar 24,45 L/mol. Ubah kondisi acuan sebelum membandingkan angka dari sumber berbeda.</p></div>' +
      '</div>';

    var gasSelect = $("#b2-conv-gas");
    var ppmInput = $("#b2-conv-ppm");
    function render() {
      var gas = cfg.gases.find(function (item) { return item.id === gasSelect.value; }) || cfg.gases[0];
      var ppm = Number(ppmInput.value);
      var result = ppm * gas.mw / cfg.molarVolume * 1000;
      $("#b2-conv-ppm-output").textContent = ppm.toLocaleString("id-ID", { maximumFractionDigits: 3 }) + " ppm";
      $("#b2-conv-output").textContent = result.toLocaleString("id-ID", { maximumFractionDigits: 1 });
      $("#b2-conv-formula").textContent = "C = " + ppm.toLocaleString("id-ID", { maximumFractionDigits: 3 }) + " × " + gas.mw + " / 24,45 × 1000 = " + result.toLocaleString("id-ID", { maximumFractionDigits: 1 }) + " µg/m³";
    }
    gasSelect.addEventListener("change", render);
    ppmInput.addEventListener("input", render);
    render();
  }

  function initBoxModel() {
    var root = $("#b2-box-model");
    if (!root || !APP_DATA.BOX_MODEL) return;
    var cfg = APP_DATA.BOX_MODEL;
    var keys = ["q", "length", "wind", "height", "background"];
    root.innerHTML = '<div class="b2-tool-grid"><div class="b2-tool-controls" id="b2-box-controls"></div><div class="b2-tool-output"><div class="b2-output-hero"><span class="b2-output-label">Konsentrasi tunak (C)</span><strong id="b2-box-output">0</strong><span>µg/m³</span></div><div class="b2-metrics"><div><span>Ventilation coefficient</span><strong id="b2-box-vc">0</strong></div><div><span>Emisi q</span><strong id="b2-box-q">0</strong></div><div><span>Rasio terhadap latar</span><strong id="b2-box-ratio">0×</strong></div></div><p class="note" id="b2-box-formula"></p><p class="sim-hint">Model kotak mengasumsikan pencampuran sempurna. Gunakan sebagai estimasi awal, bukan pengganti model dispersi detail.</p></div></div>';
    $("#b2-box-controls").innerHTML = keys.map(function (key) {
      var item = cfg[key];
      return '<div class="b2-range-row"><div class="b2-range-head"><label for="b2-box-' + key + '">' + item.label + '</label><span class="b2-range-value" id="b2-box-' + key + '-output"></span></div>' +
        '<input class="range" type="range" id="b2-box-' + key + '" min="' + item.min + '" max="' + item.max + '" step="' + item.step + '" value="' + item.def + '" aria-label="' + item.label + '">' +
        '<div class="b2-range-meta"><span>' + item.min + '</span><span>' + item.max + ' ' + item.unit + '</span></div></div>';
    }).join("");
    function render() {
      var values = {};
      keys.forEach(function (key) { values[key] = Number($("#b2-box-" + key).value); });
      var concentration = values.q * values.length * 1000 / (values.wind * values.height) + values.background;
      var vc = values.wind * values.height;
      keys.forEach(function (key) { $("#b2-box-" + key + "-output").textContent = values[key].toLocaleString("id-ID", { maximumFractionDigits: 2 }) + " " + cfg[key].unit; });
      $("#b2-box-output").textContent = concentration.toLocaleString("id-ID", { maximumFractionDigits: 1 });
      $("#b2-box-vc").textContent = vc.toLocaleString("id-ID", { maximumFractionDigits: 0 }) + " m²/s";
      $("#b2-box-q").textContent = values.q.toLocaleString("id-ID", { maximumFractionDigits: 1 });
      $("#b2-box-ratio").textContent = values.background > 0 ? (concentration / values.background).toLocaleString("id-ID", { maximumFractionDigits: 1 }) + "×" : "—";
      $("#b2-box-formula").textContent = "C = (q × L × 1000) / (u × H) + C_latar = " + concentration.toLocaleString("id-ID", { maximumFractionDigits: 1 }) + " µg/m³";
    }
    keys.forEach(function (key) { $("#b2-box-" + key).addEventListener("input", render); });
    render();
  }

  function initThemeWatch() {
    if (!window.MutationObserver) return;
    var last = document.documentElement.getAttribute("data-theme");
    new MutationObserver(function () {
      var current = document.documentElement.getAttribute("data-theme");
      if (current === last) return;
      last = current;
      renderMermaid();
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  }

  function init() {
    renderFormulas();
    renderMermaid();
    initConverter();
    initBoxModel();
    initThemeWatch();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
