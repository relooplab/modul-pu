#!/usr/bin/env node
/**
 * stamp-last-modified.js — sinkronkan tanggal footer per-halaman dari git log (A+B).
 *
 * Sumber kebenaran per-halaman: `git log -1 --format=%cs -- <file>` (YYYY-MM-DD).
 * Jika file belum pernah di-commit / di luar git → pakai tanggal hari ini (hanya fallback) atau biarkan.
 *
 * Pemakaian:
 *   node tools/stamp-last-modified.js                 # update semua HTML yang punya [data-last-modified]
 *   node tools/stamp-last-modified.js bab-1.html      # hanya file tertentu
 *   node tools/stamp-last-modified.js --check         # exit 1 jika ada HTML tanpa atribut / tidak sinkron
 *   node tools/stamp-last-modified.js --set 2026-08-19 -- bab-1.html index.html  # set manual
 *
 * Git hook (opsional): copy ke .git/hooks/pre-commit untuk auto-stamp sebelum commit.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");

function gitDateForFile(relPath) {
  try {
    const out = execSync(`git log -1 --format=%cs -- "${relPath}"`, { cwd: ROOT, encoding: "utf8" }).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(out)) return out;
  } catch (_) {}
  return null;
}

function listHtmlFiles() {
  return fs.readdirSync(ROOT).filter((f) => f.endsWith(".html"));
}

function stampFile(absPath, dateStr) {
  const html = fs.readFileSync(absPath, "utf8");
  // Cari <time ... data-last-modified ...> lalu set/update nilainya
  if (!html.includes("data-last-modified")) {
    console.warn(`[skip] ${path.basename(absPath)}: tidak ada [data-last-modified]`);
    return false;
  }
  let next = html;
  // Kasus 1: sudah ada nilai -> ganti
  next = next.replace(/(<time[^>]*\bdata-last-modified\s*=\s*")[^"]*(")/g, `$1${dateStr}$2`);
  // Kasus 2: atribut tanpa nilai -> isi (sudah ter-handle di atas, tapi untuk <time data-last-modified>)
  next = next.replace(/(<time[^>]*\bdata-last-modified)(?=\s|>)(?![^>]*=)/g, `$1="${dateStr}"`);
  if (next === html) {
    console.warn(`[skip] ${path.basename(absPath)}: tidak ada perubahan (regex miss)`);
    return false;
  }
  fs.writeFileSync(absPath, next, "utf8");
  console.log(`[stamp] ${path.basename(absPath)} -> ${dateStr}`);
  return true;
}

function main() {
  const args = process.argv.slice(2);
  const check = args.includes("--check");
  const setIdx = args.indexOf("--set");
  let manualDate = null;
  if (setIdx !== -1) {
    manualDate = args[setIdx + 1];
    if (!/^\d{4}-\d{2}-\d{2}$/.test(manualDate || "")) {
      console.error("Error: --set butuh YYYY-MM-DD, contoh: --set 2026-08-19");
      process.exit(1);
    }
  }

  const fileArgs = args.filter((a) => a.endsWith(".html"));
  const targets = fileArgs.length ? fileArgs : listHtmlFiles();
  let dirty = 0;
  let missing = 0;

  for (const rel of targets) {
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) {
      console.warn(`[skip] ${rel}: file tidak ada`);
      continue;
    }
    const html = fs.readFileSync(abs, "utf8");
    const m = html.match(/<time[^>]*\bdata-last-modified\s*=\s*"([^"]*)"/);
    const current = m ? m[1] : "";
    let desired = manualDate || gitDateForFile(rel);
    if (!desired) {
      if (check) {
        if (!current) missing++;
        else {
          // tanpa git history, cek hanya keberadaan nilai
          if (!/^\d{4}-\d{2}-\d{2}$/.test(current)) dirty++;
        }
        continue;
      }
      // tanpa --check dan tanpa git history: jangan timpa (hindari "now" yang menyesatkan)
      console.warn(`[warn] ${rel}: tidak ada git history -> dilewati (pakai --set untuk manual)`);
      if (!current) missing++;
      continue;
    }

    if (check) {
      if (current !== desired) {
        console.log(`[mismatch] ${rel}: current="${current}" desired="${desired}"`);
        dirty++;
      }
      continue;
    }

    if (current !== desired) stampFile(abs, desired);
    else console.log(`[ok] ${rel} sudah ${desired}`);
  }

  if (check) {
    if (dirty || missing) {
      console.error(`\n[check] ${dirty} mismatch, ${missing} tanpa tanggal. Jalankan: node tools/stamp-last-modified.js`);
      process.exit(1);
    } else {
      console.log("[check] semua tanggal sinkron.");
    }
  }
}

main();
