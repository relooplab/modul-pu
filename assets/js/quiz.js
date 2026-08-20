/**
 * quiz.js — Checkpoint quiz. Satu soal per langkah, validasi instan per soal
 * (benar/salah + pembahasan), skor akhir, confetti hanya bila 100%,
 * dan tombol "Coba lagi". Dijalankan oleh main.js via TPAQuiz.init(quiz).
 */
(function () {
  "use strict";

  var quiz = [], i = 0, correct = 0, answered = false, locked = false;

  function esc(s) {
    if (window.TPAMain && window.TPAMain.esc) return window.TPAMain.esc(s);
    return String(s).replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }
  function letter(n) { return String.fromCharCode(65 + n); }

  function root() { return document.getElementById("quiz-root"); }

  function confetti() {
    var c = window.confetti;
    if (!c) return;
    try { c({ particleCount: 120, spread: 75, origin: { y: 0.6 } }); setTimeout(function () { c({ particleCount: 60, angle: 60, spread: 60, origin: { x: 0 } }); c({ particleCount: 60, angle: 120, spread: 60, origin: { x: 1 } }); }, 250); } catch (e) {}
  }

  function showResult() {
    var r = root(); if (!r) return;
    var total = quiz.length;
    var pct = Math.round(correct / total * 100);
    var msg = pct === 100 ? "Skor maksimal. Pemahaman terhadap materi sudah sangat baik."
      : pct >= 60 ? "Pemahaman sudah cukup baik. Tinjau kembali pembahasan pada soal yang belum tepat."
        : "Pemahaman masih perlu diperkuat. Pelajari kembali bagian terkait, kemudian ulangi kuis.";
    r.innerHTML = '<div class="q-result" role="status">' +
      '<span class="q-result-ic"><span class="icon" data-lucide="' + (pct === 100 ? "trophy" : "gauge") + '"></span></span>' +
      '<h3 class="h3">Skor akhir</h3>' +
      '<div class="q-score">' + correct + " / " + total + '<span class="q-score-pct">' + pct + "%</span></div>" +
      "<p class=\"q-msg\">" + esc(msg) + "</p>" +
      '<button type="button" class="btn btn-primary" id="q-retry">Coba lagi</button></div>';
    if (window.lucide && lucide.createIcons) { try { lucide.createIcons(); } catch (e) {} }
    var retry = document.getElementById("q-retry");
    if (retry) retry.addEventListener("click", reset);
    if (pct === 100) confetti();
  }

  function renderQuestion() {
    var r = root(); if (!r) return;
    var q = quiz[i]; if (!q) return;
    answered = false; locked = false;
    r.innerHTML = '<div class="q" aria-live="polite">' +
      '<div class="q-meta">Soal ' + (i + 1) + " dari " + quiz.length + "</div>" +
      '<p class="q-text">' + esc(q.q) + "</p>" +
      '<div class="q-opts">' + q.options.map(function (opt, j) {
        return '<button type="button" class="q-opt" data-j="' + j + '"><span class="q-letter">' + letter(j) +
          "</span><span class=\"q-opt-txt\">" + esc(opt) + "</span></button>";
      }).join("") + "</div>" +
      '<div class="q-feedback" id="q-feedback" hidden></div>' +
      '<div class="q-nav"><button type="button" class="btn btn-primary" id="q-next" disabled>' +
      (i === quiz.length - 1 ? "Lihat hasil" : "Lanjut") + ' <span class="icon" data-lucide="chevron-right"></span></button></div>' +
      "</div>";
    if (window.lucide && lucide.createIcons) { try { lucide.createIcons(); } catch (e) {} }
    bind();
  }

  function evaluate(j) {
    if (locked) return;
    locked = true; answered = true;
    var q = quiz[i], opts = document.querySelectorAll(".q-opt");
    opts.forEach(function (b, k) {
      if (k === q.answer) b.classList.add("ok");
      else if (k === j) b.classList.add("no");
      b.setAttribute("aria-pressed", k === j ? "true" : "false");
    });
    if (j === q.answer) correct++;
    var fb = document.getElementById("q-feedback");
    if (fb) {
      var head = j === q.answer
        ? '<span class="fb-head ok">Benar</span>'
        : '<span class="fb-head no">Kurang tepat</span>';
      fb.innerHTML = head + "<p class=\"fb-text\">" + esc(q.pembahasan) + "</p>";
      fb.hidden = false;
    }
    var next = document.getElementById("q-next");
    if (next) next.disabled = false;
  }

  function bind() {
    var opts = document.querySelectorAll(".q-opt");
    opts.forEach(function (b) {
      b.addEventListener("click", function () { evaluate(+b.getAttribute("data-j")); });
    });
    var next = document.getElementById("q-next");
    if (next) next.addEventListener("click", function () {
      if (!answered) return;
      if (i === quiz.length - 1) showResult();
      else { i++; renderQuestion(); }
    });
  }

  function reset() {
    i = 0; correct = 0; answered = false; locked = false;
    renderQuestion();
  }

  function init(list) {
    quiz = list || (window.APP_DATA && window.APP_DATA.QUIZ) || [];
    if (!quiz.length) return;
    i = 0; correct = 0;
    renderQuestion();
  }

  window.TPAQuiz = { init: init };
})();
