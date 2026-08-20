# Panduan Style — Modul Ajar Pencemaran Udara

Dokumen ini adalah **sumber kebenaran** untuk menyeragamkan tampilan seluruh bab (Bab 1–10)
modul ajar interaktif **Pencemaran Udara** (S1 Teknik Lingkungan). Modul ini adalah fork dari
template `bahan-ajar-tpa` yang di-*rebrand* total. Sebelum membuat/merevisi bab, baca panduan ini
lalu tiru struktur `bab-1.html` — jangan menemukan gaya baru; gunakan token & class yang sudah ada.

---

## 1. Ringkasan arah desain

- **Palet "Langit & Asap"**: sky blue `#3A7EC2` (aksen utama) + smoke slate `#6B7A8C` (aksen sekunder)
  di atas latar udara dingin. Warna mencolok hanya dipakai untuk *data* (skala ISPU). Mode gelap
  otomatis via `[data-theme="dark"]`.
- **Tipografi**: **Bricolage Grotesque** untuk judul/heading, **DM Sans** untuk teks isi,
  **IBM Plex Mono** untuk angka/label/satuan/rumus.
- **Navigasi subbab**: rail sidebar kiri bertema *air-column* (desktop sticky, mobile drawer).
- **Tema**: semua warna lewat CSS custom properties (token `--*`). **Jangan** menulis hex langsung
  di komponen.
- **Tidak ada `#000`/`#FFF` dominan**; teks–latar dibidik lolos WCAG AA (≥ 4.5:1).
- Project berjalan tanpa build: buka `index.html` lewat `file://` atau server lokal.

---

## 2. Design tokens

Definisi lengkap ada di `assets/css/style.css` (`:root` untuk light, `[data-theme="dark"]` untuk dark).
Selalu pakai variabel, bukan nilai mentah.

### Warna (light)

| Token | Hex | Peran |
|---|---|---|
| `--bg` | `#F3F6FA` | latar utama (langit dingin) |
| `--bg-alt` | `#EAF0F6` | latar section `sec-deep` |
| `--surface` | `#FFFFFF` | kartu/panel/tabel |
| `--surface-2` | `#F7FAFD` | permukaan sekunder |
| `--border` | `#DFE6EF` | garis batas halus |
| `--border-strong` | `#C6D2DF` | garis batas tegas |
| `--text` | `#22303D` | teks utama |
| `--muted` | `#55626F` | teks sekunder |
| `--muted-2` | `#64717F` | teks tersier (label kecil) |
| `--sage` | `#3A7EC2` | aksen utama (sky blue) |
| `--sage-600/700/800` | `#2F6BA8` `#28598C` `#214A75` | turunan aksen |
| `--sage-bg` | `#E9F1FA` | latar aksen lembut |
| `--terra` | `#6B7A8C` | aksen sekunder (smoke slate) |
| `--terra-600/700` | `#556575` `#465563` | turunan sekunder |
| `--terra-bg` | `#EDF1F5` | latar sekunder lembut |
| `--ok/-bg/-text` | `#3E8B5C` `#E8F2EC` `#2F6B45` | sukses |
| `--err/-bg/-text` | `#C04A3A` `#F9EBE7` `#9E3A2C` | error |
| `--warn/-bg/-text` | `#B87E1F` `#FAF2DE` `#7E5A12` | peringatan |
| `--focus` | `#2F6BA8` | cincin fokus |
| `--btn-bg/-hover` | `#2A5F96` `#234F7D` | tombol primer |

### Skala ISPU (semantik, hanya untuk data)

| Token | Hex | Kategori |
|---|---|---|
| `--ispu-baik` | `#4C9A52` | Baik (hijau) |
| `--ispu-sedang` | `#4A8FD6` | Sedang (biru) |
| `--ispu-tidak` | `#E0B43B` | Tidak sehat (kuning) |
| `--ispu-sangat` | `#D6453B` | Sangat tidak sehat (merah) |
| `--ispu-berbahaya` | `#2E3440` | Berbahaya (hitam) |
| `--ispu-track` | `#E6EBF2` | trek kosong pita ISPU |

Skala ISPU dipakai pada landing (pita `#ispu-band`) dan komponen lain yang menampilkan kategori
kualitas udara. Warna-warna ini **bukan dekorasi** — hanya muncul ketika membawa makna.

### Warna (dark)

Versi gelap ada di `[data-theme="dark"]`. Kunci: `--bg:#14181F`, `--surface:#1C2129`,
`--text:#E9ECF1`, `--sage:#5E9AD4`, `--terra:#8393A4`. **Jangan** menambah warna baru di komponen;
biarkan token gelap yang menyesuaikan.

### Lainnya

- Radius: `--radius` = 14px (kartu), `--radius-lg` = 18px (panel besar).
- Easing: `--ease` = `cubic-bezier(.22,.61,.36,1)`.
- Tinggi header sticky: `--header-h` = 62px.
- Lebar sidebar air-column: `--air-column-w` = 238px.

---

## 3. Tipografi

Font dimuat lewat satu `<link>` Google Fonts di setiap `*.html` (head):

```
family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700
family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700
family=IBM+Plex+Mono:wght@400;500;600
```

| Peran | Font | Class |
|---|---|---|
| Judul (h1/h2/h3, kartu bento, soal) | **Bricolage Grotesque** | `h1`, `.h2`, `.h3`, `.bento-title`, `.q-text`, `.landing-copy h1`, `.chapter-card h3` |
| Teks isi | **DM Sans** | `body`, `.prose`, `.lead`, `.prose h3` |
| Angka/label/satuan/rumus | **IBM Plex Mono** | `.eyebrow`, `.note`, `.stat-num`, `.formula`, `.tbl-title`, `.sim-stat-val`, `.bento-tag`, `.q-score` |

- Heading memakai `text-wrap: balance`, paragraf `text-wrap: pretty`.
- Label mono biasanya `text-transform: uppercase` + `letter-spacing`.

---

## 4. Struktur halaman bab

Tiap bab = satu file `bab-N.html` dengan urutan:

```
<header> site-header (brand + dropdown bab + toggle air-column + tombol tema)
<aside class="air-column">   ← sidebar kiri: head singkat + nav.toc (chip subbab)
<button class="air-column-backdrop">
<main>
  <section class="hero">          ← eyebrow + h1 + figur (SVG) + stat-strip
  <section class="sec">            ← Tujuan pembelajaran (#objectives-list)
  <section class="sec sec-kw">     ← Kata kunci (#kw-cloud)
  <section class="sec">            ← subbab isi (.grid-main: .sec-head + .sec-body.prose)
  <section class="sec sec-deep">   ← blok interaktif (stepper / kuis / bento / timeline)
  <section class="sec">            ← Rangkuman (.panel)
  <section class="sec sec-deep">   ← Kuis (#quiz-root)
  <section class="sec">            ← Diskusi (#diskusi-list)
  <section class="sec sec-deep">   ← Latihan (#latihan-list)
  <section class="sec">            ← Pustaka (#pustaka-list)
<footer + modal + tooltip + to-top + script>
```

### Navigasi air-column (sidebar kiri)

- Pindahkan `nav.toc` **ke dalam** `<aside class="air-column" id="air-column">` — bukan di header.
- Tombol buka/tutup di header: `<button id="air-column-toggle" class="icon-btn air-column-toggle">`.
- Desktop: rail sticky `position:fixed` selebar `--air-column-w`; `.air-column-page .content` dan
  `.site-footer` diberi `margin-left: var(--air-column-w)`.
- Mobile (≤960px): rail jadi drawer geser, dibuka tombol, ditutup backdrop/`Esc`/setelah klik chip.
- Header air-column berisi `<strong>` (judul) + `<span>` (deskripsi singkat) — **tanpa** label
  `AIR COLUMN`.
- Chip subbab: `.chip[data-scroll="#id"]`; item aktif otomatis disorot oleh scroll-spy `main.js`.

---

## 5. Komponen siap pakai

| Komponen | Markup inti |
|---|---|
| Tombol | `<a class="btn btn-primary">` / `<a class="btn btn-ghost">` / `<button class="icon-btn">` |
| Chip subbab | `<button class="chip" data-scroll="#id-section">` |
| Kata kunci | `<button class="kw-chip" data-to="#id">` |
| Panel | `<div class="panel">…</div>` |
| Callout | `<div class="callout callout-warn">` / `callout-ok` |
| Rumus | `<div class="formula" data-tex="...">` |
| Tabel | `.tbl-title` + `.tbl-wrap` > `table.tbl` |
| Kartu fungsi | `.fun` / `.meth-card` + `.meth-badge` (`bad-open/ctrl/san`) |
| Glosarium | `<span class="term" data-gloss="kunci">` (kunci cocok dgn `APP_DATA.GLOSSARY`) |
| Diagram | `.mermaid-box` + `<figure class="viz">`; grafik `.chart-card` > `canvas` |
| Timeline | `.timeline` (dirender dari `APP_DATA.TIMELINE`) |
| Kartu bento | `.bento-grid` (dirender dari `APP_DATA.BENTO`) |
| Stepper | `#stepper-box` (dirender dari `APP_DATA.STEPS`) |
| Pita ISPU | `.ispu-band` / `.ispu-seg` / `.ispu-legend` (landing) |

---

## 6. Konvensi data (`assets/js/data.js`)

Semua konten editable tersimpan di `data.js` (Bab 1) / `data-babN.js` (bab lain) sebagai properti
`window.APP_DATA`:

- `OBJECTIVES` — tujuan pembelajaran (array string).
- `GLOSSARY` — glosarium `{term, en, def}` per kunci.
- `CHAPTERS` — daftar bab 1–10 (lihat §7); bab aktif `current: true` + `href: "#top"`.
- `STEPS`, `BENTO`, `QUIZ`, `TIMELINE` — data blok interaktif.
- `KEYWORDS`, `DISKUSI`, `LATIHAN`, `PUSTAKA`, `CHART_KARHUTLA`, `CHART_AQG` — data pelengkap.
- Bab 2 menambahkan `CONVERTER` (kalkulator ppm–µg/m³) dan `BOX_MODEL` (model kotak + koefisien ventilasi).
- `APP_DATA.SIM = null` — Bab 1 (naratif-sejarah) **tidak** memakai simulator; `simulator.js`
  tidak dimuat di `bab-1.html`. Bab dengan simulator (pola template TPA) tetap bisa memuatnya.

> **Aturan**: edit hanya di `data.js`; jangan sentuh logika (`.js` lain) kecuali menambah fitur.

---

## 7. Navigasi antar bab

`CHAPTERS` berisi sepuluh bab modul ini. Jangan ubah judul kecuali outline direvisi:

1. Sejarah Pencemaran Udara
2. Konsep Dasar Penyebab Pencemaran Udara
3. Termodinamika Atmosfer
4. Sumber Pencemaran Udara
5. Parameter Pencemaran Udara
6. Dampak Pencemaran Udara
7. Meteorologi Pencemaran Udara
8. Pemodelan Pencemaran Udara
9. Peraturan dan Standar Pencemaran Udara
10. Studi Kasus Pencemaran Udara

Bab yang belum dibangun diberi `href: null` (dropdown menampilkan "Segera"). Saat bab `N`
dibangun, atur bab tersebut `current: true` + `href: "#top"`, dan beri `href` pada bab yang
sebelumnya null hanya bila file `bab-N.html` sudah selesai.

---

## 8. Cara membuat bab berikutnya (Bab 2–10)

1. **Salin** `bab-1.html` → `bab-N.html` (seluruh kerangka, termasuk sidebar air-column).
2. **Ganti** identitas: `<title>`, meta description, eyebrow, `h1`, figur SVG, `stat-strip`,
   header air-column (`<strong>` + `<span>`), dan chip subbab di `nav.toc` (sesuaikan `data-scroll`).
3. **Update `data.js`** (atau buat `data-babN.js`): `OBJECTIVES`, `GLOSSARY`, `KEYWORDS`,
   `DISKUSI`, `LATIHAN`, `PUSTAKA`, blok interaktif, dan `CHAPTERS` (bab N aktif).
4. **Isi section** `sec`/`sec-deep` dengan class yang sama; jangan menambah class/style baru.
5. Diagram Mermaid Bab 1: tambah sumber di `extras.js` → `mmSources(c)`. Diagram khusus Bab 2
   dirender oleh `bab2.js` (`b2-cycle`, `b2-chemistry`, `b2-one-atmosphere`).
6. Grafik Chart.js: tambah data `CHART_*` dan blok di `extras.js` → `buildCharts()`.
7. Interaktif khusus Bab 2 ditempatkan di `bab2.js`; jangan memasukkan kembali logika skoring lokasi
   TPA/AHP ke Bab 2 Pencemaran Udara.
8. **Uji**: buka lewat `file://` atau server lokal; cek tema terang/gelap, mobile (drawer
   air-column), dan `prefers-reduced-motion`.

---

## 9. Dependensi (versi ter-pin)

Semua via CDN (jangan ganti versi tanpa alasan): GSAP 3.12.5, Lucide 0.462.0, canvas-confetti 1.9.3,
KaTeX 0.16.11, Chart.js 4.4.7, Mermaid 11.4.1, Tailwind 3.4.13 (utility non-kritis).
File lokal urutan load: `data*.js` → `main.js` → (`stepper.js` bila dipakai) → `quiz.js` →
`extras.js` → (`babN.js` bila ada) → `footer.js`.

---

## 10. Checklist QA setiap bab/modul baru

- [ ] Halaman terbuka via `file://` tanpa error di konsol.
- [ ] Dropdown bab menampilkan 10 bab; bab lain `href:null` tampil "Segera".
- [ ] Sidebar air-column: sticky di desktop, drawer di mobile, tertutup setelah pilih subbab.
- [ ] Tema terang/gelap berfungsi; kontras teks tetap AA.
- [ ] Mermaid, Chart.js, KaTeX me-*render* ulang saat tema diganti.
- [ ] Kuis/stepper/latihan berfungsi; progres latihan tersimpan (localStorage `pu-latihan`).
- [ ] Header sticky, progress bar, to-top, tooltip, modal berfungsi.
- [ ] Tabel tidak memecah layout pada 320–640px (scroll horizontal `.tbl-wrap`).
- [ ] Keyboard-only: fokus terlihat, dialog tertutup Escape, focus-trap modal jalan.
- [ ] Mode `prefers-reduced-motion` mematikan animasi.
- [ ] Semua section punya `id` + `aria-labelledby`; canvas punya `role="img"` + `aria-label`.
