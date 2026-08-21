/**
 * stepper.js — Step-by-step "7 komponen sanitary landfill".
 * Next/Prev + dots, indikator "Langkah X dari 7", transisi GSAP.
 * Dijalankan oleh main.js lewat TPAStepper.init(steps).
 */
(function () {
  "use strict";

  var idx = 0, steps = [];
  var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function render() {
    var stage = document.getElementById("stepper-stage");
    if (!stage) return;
    var s = steps[idx];
    if (!s) return;
    stage.innerHTML = '<div class="step">' +
      '<span class="step-ic"><span class="icon" data-lucide="' + s.icon + '"></span></span>' +
      '<h3 class="h3 step-title">' + s.title + "</h3>" +
      '<p class="step-body">' + s.body + "</p>" +
      (s.note ? '<p class="step-note">' + s.note + "</p>" : "") +
      "</div>";
    if (window.lucide && lucide.createIcons) { try { lucide.createIcons(); } catch (e) {} }
    var pos = document.getElementById("stepper-pos");
    if (pos) pos.textContent = "Langkah " + (idx + 1) + " dari " + steps.length;
    var prev = document.getElementById("step-prev");
    var next = document.getElementById("step-next");
    if (prev) prev.toggleAttribute("disabled", idx === 0);
    if (next) next.toggleAttribute("disabled", idx === steps.length - 1);
    var dots = document.getElementById("stepper-dots");
    if (dots) {
      dots.innerHTML = steps.map(function (_, i) {
        return '<button type="button" class="dot' + (i === idx ? " active" : "") + '" data-i="' + i + '" aria-label="Langkah ' + (i + 1) + '"></button>';
      }).join("");
      var pct = steps.length > 1 ? (idx / (steps.length - 1)) * 100 : 0;
      dots.style.setProperty("--prog", pct + "%");
    }
  }

  function animate() {
    var stage = document.getElementById("stepper-stage");
    if (!stage) return;
    if (!window.gsap || REDUCED) { stage.style.opacity = 1; return; }
    gsap.fromTo(stage, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
  }

  function go(n) {
    var next = Math.min(Math.max(n, 0), steps.length - 1);
    if (next === idx) return;
    idx = next;
    render();
    animate();
  }

  function init(list) {
    steps = list || (window.APP_DATA && window.APP_DATA.STEPS) || [];
    if (!steps.length) return;
    idx = 0;
    render();
    var prev = document.getElementById("step-prev");
    var next = document.getElementById("step-next");
    var dots = document.getElementById("stepper-dots");
    if (prev) prev.addEventListener("click", function () { go(idx - 1); });
    if (next) next.addEventListener("click", function () { go(idx + 1); });
    if (dots) dots.addEventListener("click", function (e) {
      var d = e.target.closest(".dot"); if (d) go(+d.getAttribute("data-i"));
    });
  }

  window.TPAStepper = { init: init };
})();