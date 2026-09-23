/**
 * data-bab8.js — Bab 8 Peraturan dan Standar Pencemaran Udara.
 * Sumber: "BAB 8 — Peraturan dan Standar Pencemaran Udara.md" + "Bab_08_Peraturan_dan_Standar_Pencemaran_Udara.md"
 * Konvensi 4 lapis (Fakta/Regulasi/Pedoman/Analisis), beda baku mutu mengikat vs AQG tidak mengikat.
 */
window.APP_DATA = {};

APP_DATA.OBJECTIVES = [
  "Membandingkan baku mutu udara ambien (BMUA) Indonesia dengan WHO AQG 2021, NAAQS AS, dan Directive (EU) 2024/2881 termasuk interim target.",
  "Memetakan rezim hukum internasional dan nasional mengenai pencemaran udara beserta hierarki pengaturannya.",
  "Membedakan baku mutu udara ambien vs baku mutu emisi serta kondisi acuan (25 °C 1 atm ambien vs mg/Nm³ kering + O₂ koreksi) dan implikasinya.",
  "Menghitung dan menafsirkan ISPU (Permen P.14/2020) serta membandingkan dengan AQI US EPA dan sebab perbedaan kategori pada konsentrasi sama.",
  "Menganalisis instrumen pengelolaan, termasuk SPKU, CEMS/SISPEK, AMDAL/UKL-UPL, persetujuan lingkungan berbasis risiko, PROPER, dan audit lingkungan hidup.",
  "Menilai kebijakan daerah DKI Jakarta (Perda 2/2005, Pergub 210/2017, Ingub 66/2019, Kepgub 576/2023 SPPU & LEZ) dan instrumen ekonomi (pajak karbon Rp30/kg + NEK Perpres 98/2021 + perdagangan karbon & EV).",
  "Mengevaluasi kesenjangan standar PM2.5 dan arah pengetatan bertahap melalui putusan gugatan warga mengenai kualitas udara Jakarta."
];

APP_DATA.GLOSSARY = {
  "baku-mutu-ambien": {
    term: "Baku Mutu Udara Ambien (BMUA)",
    en: "ambient air quality standard",
    def: "Nilai pencemar ditenggang di udara ambien (yang dihirup). PP 22/2021 Lamp. VII: kondisi acuan 1 atm 25 °C; mengikat secara hukum."
  },
  "baku-mutu-emisi": {
    term: "Baku Mutu Emisi (BME)",
    en: "emission standard",
    def: "Maksimum dibuang dari sumber (cerobong/knalpot) pada mg/Nm³ kering + koreksi O₂ (mis. 7% padat, 3% gas). Mengikat per sektor (Permen LHK)."
  },
  "who-aqg": {
    term: "WHO AQG 2021",
    en: "WHO Global Air Quality Guidelines",
    def: "Pedoman kesehatan berbasis bukti (bukan hukum mengikat). PM2.5 tahunan 10→5, 24 jam 25→15; dilengkapi interim target IT-1 35 → IT-4 10."
  },
  "interim-target": {
    term: "Interim Target WHO",
    en: "interim targets (IT-1→IT-4)",
    def: "Anak tangga bertahap IT-1 35, IT-2 25, IT-3 15, IT-4 10 → AQG 5 (PM2.5 tahunan); mortalitas indeks 124→104 pada AQG. Arah pengetatan Indonesia."
  },
  "naaqs": {
    term: "NAAQS",
    en: "National Ambient Air Quality Standards",
    def: "Standar AS untuk 6 criteria pollutants; primer (kesehatan) + sekunder (kesejahteraan). PM2.5 tahunan diperketat 12,0→9,0 µg/m³ (7 Feb 2024) + review 2025."
  },
  "eu-directive": {
    term: "Directive (EU) 2024/2881",
    en: "EU Ambient Air Quality Directive (recast)",
    def: "Revisi 2008/50/EC, limit 2030 mendekati WHO (PM2.5 tahunan 25→10, 24 jam 25 maks 18×/th) + AEI 5 µg/m³ + hak kompensasi warga."
  },
  "aathp": {
    term: "AATHP & Second Roadmap 2023–2030",
    en: "ASEAN Agreement on Transboundary Haze Pollution",
    def: "Ditandatangani 2002, berlaku 25 Nov 2003; diratifikasi RI UU 26/2014 (terakhir ASEAN 2015). Roadmap Vientiane 23 Agu 2023: visi Haze-Free 2030, 9 strategi, target PM2.5 menuju WHO IT-3."
  },
  "clrtap": {
    term: "CLRTAP",
    en: "Convention on LRTAP (1979)",
    def: "Konvensi UNECE polusi lintas batas jauh + 8 protokol (Gothenburg); Indonesia bukan pihak — pembanding kelembagaan AATHP."
  },
  "ispu": {
    term: "ISPU",
    en: "Indeks Standar Pencemar Udara",
    def: "Permen P.14/2020: interpolasi linear 7 parameter (PM10, PM2.5, NO2, SO2, O3, CO, HC) → kategori 0–50 Baik s.d. >300 Berbahaya; >100 wajib info/jam."
  },
  "aqi": {
    term: "AQI US EPA",
    en: "Air Quality Index",
    def: "40 CFR Part 58: 0–50 Good s.d. >300 Hazardous; 101–150 khusus Unhealthy for Sensitive Groups — sebab ISPU 5 kategori vs AQI 6 kategori dan breakpoint PM2.5 9,0 vs 55,4 µg/m³ di 100."
  },
  "cems-sispek": {
    term: "CEMS + SISPEK",
    en: "CEMS & SISPEK",
    def: "CEMS diwajibkan Permen P.15/2019 untuk PLTU (termasuk Hg & CO2) + integrasi SISPEK (Permen P.13/2021) ke KLHK; pengawasan berkelanjutan vs sampling episodik."
  },
  "amdal": {
    term: "AMDAL & PP 22/2021",
    en: "EIA & risk-based licensing",
    def: "AMDAL (Pasal 22 UU 32/2009) untuk berdampak penting; UKL-UPL jika tidak. PP 22/2021 ganti PP 41/1999, Lamp. VII BMUA; izin lingkungan → persetujuan lingkungan (PP 5/2021) + persetujuan teknis emisi."
  },
  "proper": {
    term: "PROPER",
    en: "PROPER",
    def: "Program penilaian peringkat perusahaan KLHK: Emas–Hijau–Biru–Merah–Hitam untuk ketaatan termasuk emisi udara."
  },
  "pajak-karbon": {
    term: "Pajak karbon & NEK",
    en: "carbon tax & carbon pricing",
    def: "UU 7/2021 Pasal 13: Rp30/kg CO2e (≥ harga pasar) awal PLTU cap-and-tax; Perpres 98/2021 NEK: perdagangan, pembayaran kinerja, pungutan; IDXCarbon Feb 2023 + insentif EV."
  },
  "citizen-lawsuit": {
    term: "Citizen lawsuit Jakarta 2019–2023",
    en: "Jakarta clean-air citizen lawsuit",
    def: "PN Jakpus 374/Pdt.G-LH/2019 (16 Sep 2021) → PT DKI 549/2022 (17 Okt 2022) → MA 2560 K/Pdt/2023 (13 Nov 2023, inkracht): 5 tergugat PMH UU 32/2009; 9 amar termasuk ‘BMUA yang cukup melindungi’."
  },
  "jakarta-lez": {
    term: "SPPU & LEZ DKI",
    en: "Jakarta SPPU & Low Emission Zone",
    def: "Perda 2/2005, Pergub 210/2017 uji emisi, Ingub 66/2019, Kepgub 576/2023 SPPU + LEZ Kota Tua; perluasan MRT/LRT/TransJakarta. Belum LEZ permanen."
  }
};

APP_DATA.CHAPTERS = [
  { n: 1, title: "Sejarah Pencemaran Udara", href: "bab-1.html", current: false },
  { n: 2, title: "Konsep Dasar Penyebab Terjadinya Pencemaran Udara", href: "bab-2.html", current: false },
  { n: 3, title: "Sumber Pencemaran Udara", href: "bab-3.html", current: false },
  { n: 4, title: "Parameter Pencemaran Udara dan Pemantauan", href: "bab-4.html", current: false },
  { n: 5, title: "Dampak Pencemaran Udara", href: "bab-5.html", current: false },
  { n: 6, title: "Meteorologi dan Termodinamika Atmosfer", href: "bab-6.html", current: false },
  { n: 7, title: "Pemodelan Pencemaran Udara", href: "bab-7.html", current: false },
  { n: 8, title: "Peraturan dan Standar Pencemaran Udara", href: "#top", current: true },
  { n: 9, title: "Teknologi Pengendalian Pencemaran Udara", href: "bab-9.html" },
  { n: 10, title: "Studi Kasus Pencemaran Udara", href: "bab-10.html" }
];

APP_DATA.KEYWORDS = [
  { t: "BMUA vs BME", to: "#pengantar" },
  { t: "WHO AQG 2021 & IT-1→4", to: "#internasional" },
  { t: "NAAQS 9,0 µg/m³ (2024)", to: "#internasional" },
  { t: "AATHP + Haze-Free 2030", to: "#rezim" },
  { t: "PP 22/2021 Lamp. VII", to: "#nasional" },
  { t: "Permen P.15/2019 (CEMS)", to: "#emisi" },
  { t: "ISPU vs AQI", to: "#indeks" },
  { t: "SPKU & SISPEK", to: "#pemantauan" },
  { t: "AMDAL & PROPER", to: "#instrumen" },
  { t: "LEZ & SPPU Jakarta", to: "#daerah" },
  { t: "Pajak Rp30/kg CO₂e", to: "#ekonomi" },
  { t: "15 vs 5 µg/m³ (IT-3)", to: "#terkini" },
  { t: "374/Pdt.G-LH/2019", to: "#terkini" },
  { t: "Pengetatan bertahap", to: "#terkini" }
];

APP_DATA.IT_LADDER = {
  pm25Annual: [35, 25, 15, 10, 5],
  labels: ["IT-1 (35)", "IT-2 (25)", "IT-3 (15) ← PP 22", "IT-4 (10)", "AQG 2021 (5)"],
  mortalityIndex: [124, 116, 108, 104, 100],
  caption: "Tangga interim WHO PM2.5 tahunan: indeks mortalitas 124 pada IT-1 →100 pada AQG. 15 µg/m³ PP 22 = IT-3 (3× AQG)."
};

APP_DATA.CHART_GAP = {
  labels: ["PM2.5 thn", "PM2.5 24j", "PM10 thn", "NO2 thn"],
  pp: [15, 55, 40, 50],
  who: [5, 15, 15, 10],
  nAAQS: [9.0, 35, null, 53],
  eu: [10, 25, 20, 20],
  caption: "Grafik 8.1 — Kesenjangan BMUA: PP 22/2021 (mengikat) vs WHO AQG 2021 (pedoman) + NAAQS/EU. PP 15 masih 3× AQG & di atas NAAQS/EU 2030."
};

APP_DATA.CHART_ISPU_BREAK = {
  // breakpoints simplified for illustration (PM2.5 µg/m3 vs index)
  ispu: { x: [0, 15.5, 55.4, 150.4, 250.4, 500], y: [0, 50, 100, 200, 300, 500] },
  aqi:  { x: [0, 9.0, 35.4, 55.4, 150.4, 250.4, 500], y: [0, 50, 100, 150, 200, 300, 500] },
  caption: "Grafik 8.2 — Breakpoint PM2.5: AQI (break 9,0 di 50) lebih ketat dari ISPU (break 15,5/55,4). Garis sama → kategori berbeda."
};

APP_DATA.QUIZ = [
  {
    q: "Bedakan status hukum BMUA Indonesia vs WHO AQG 2021.",
    options: ["Keduanya mengikat", "BMUA mengikat (PP 22/2021 Lamp. VII); AQG adalah pedoman tidak mengikat (25 °C/1 atm vs kondisi acuan tiap rezim)", "AQG mengikat BMUA tidak", "Keduanya hanya pedoman"],
    answer: 1,
    pembahasan: "BMUA = ketentuan regulasi (angka hukum); AQG = rekomendasi bukti kesehatan + interim targets. BMUA 15 (h) tidak boleh disamakan dengan AQG 5; keduanya disandingkan, tidak dipaksakan menjadi satu."
  },
  {
    q: "Pilih pernyataan yang benar tentang NAAQS & EU 2024/2881.",
    options: ["NAAQS PM2.5 tahunan tetap 12,0", "NAAQS 9,0 µg/m³ (7 Feb 2024, review 2025) & EU PM2.5 tahunan 25→10 µg/m³ mulai 2030 + AEI 5", "EU AEI 15 µg/m³", "NAAQS tidak punya primary/secondary"],
    answer: 1,
    pembahasan: "PM2.5 tahunan 12,0→9,0 (EPA 7 Feb 2024); EU 2024/2881 berlaku 2030 dengan 10 & 25 (maks 18×/th) + AEI 5 (PM2.5) & 10 (NO2) + hak kompensasi warga."
  },
  {
    q: "Kedudukan AATHP bagi Indonesia adalah…",
    options: ["Belum diratifikasi", "Diratifikasi UU 26/2014 (terakhir ASEAN 2015); Second Roadmap Vientiane 23 Agu 2023: Haze-Free 2030 + target PM2.5 menuju IT-3", "Hanya deklarasi 2003", "Mengatur NAAQS"],
    answer: 1,
    pembahasan: "AATHP 2002, berlaku 25 Nov 2003; RI UU 26/2014; Roadmap 2023–2030 9 strategi & target PM2.5 IT-3 (15 µg/m³) — jangkar pengetatan ke Bab 10 karhutla."
  },
  {
    q: "Pernyataan baku mutu emisi PLTU yang paling tepat adalah…",
    options: ["Diukur di reseptor ambien", "Permen P.15/2019 (5 Apr 2019): PLTU batu bara unit baru SO2/NOx 550, partikulat 100 mg/Nm³ kering + O₂ koreksi + wajib CEMS → SISPEK (P.13/2021)", "Tidak ada BME emisi", "Kondisi acuan sama dengan ambien"],
    answer: 1,
    pembahasan: "BME di cerobong (mg/Nm³ kering, 0 °C/1 atm + O₂), ambien di udara bebas (µg/m³ 25 °C); keduanya tak tertukar. Kritik: 550 masih 3–15× longgar vs CN/JP/KR."
  },
  {
    q: "Perbedaan kategori ISPU vs AQI yang esensial adalah…",
    options: ["Sama persis", "ISPU 5 kategori (101–200 satu ‘Tidak Sehat’); AQI 6 kategori (101–150 sensitif → 151–200 Tidak Sehat) + breakpoint PM2.5 9,0 (AQI) vs 55,4 (ISPU) di 100", "ISPU punya 6 AQI 5", "Keduanya hanya PM10"],
    answer: 1,
    pembahasan: "AQI pecah 101–150 vs 151–200; ISPU gabung 101–200. PM2.5 30 µg/m³ = AQI ~89 (Moderate) tetapi ISPU ~73 (Sedang) — konsentrasi sama, kategori berbeda karena jangkar BMUA berbeda."
  },
  {
    q: "Makna putusan citizen lawsuit Jakarta 2019–2023 adalah…",
    options: ["Ditangani PTUN", "PN Jakpus 374/2019 (16 Sep 2021) → PT DKI 549/2022 (17 Okt 2022) → MA 2560 K/Pdt/2023 (13 Nov 2023 inkracht): negara PMH UU 32/2009; 9 amar termasuk BMUA ‘cukup melindungi’", "Hanya mengatur CEMS", "Ditolak semua tingkat"],
    answer: 1,
    pembahasan: "Perkara पीएमH dengan 9 amar (BMUA cukup, supervisi gubernur, buffer, inventarisasi lintas batas periodik). MA menolak kasasi → justisiabel."
  }
];

APP_DATA.DISKUSI = [
  { q: "Bandingkan BMUA PM2.5 tahunan 15 vs WHO AQG 5 = IT-3 vs NAAQS 9,0 vs EU 2030 10. Buat narasi ‘di mana Indonesia berada di tangga IT’ dan implikasi putusan 2560 K/Pdt/2023.", h: "Posisi 15 = IT-3 (3× AQG, 1,7× NAAQS 9,0); arah IT-4 10 → AQG 5 sejalan Roadmap AATHP IT-3; amar ‘BMUA cukup melindungi’ adalah tekanan hukum pengetatan." },
  { q: "Mengapa Cina/Jepang/Korsel 10-an mg/Nm³ sedangkan PLTU Indonesia 550? Analisis trade-off teknologi (FGD, low-NOx, ESP) di Bab 9 bila BME diketatkan ke puluhan.", h: "BME longgar = beban/kWh tinggi berizin; pengetatan menuntut retrofit & CEMS; cost vs ambien di sekitar PLTU (Suralaya). Gunakkan data kategori Lampiran P.15/2019." },
  { q: "Stasiun SPKU mencatat PM2.5 24 jam 68 µg/m³ dan PM10 82 µg/m³. Hitung ISPU per parameter & bandingkan bila dinilai dengan breakpoint AQI 2024. Jelaskan sumber beda persepsi krisis 2023.", h: "ISPU vs AQI memakai breakpoint berbeda (AQI 9,0 di 50); konsentrasi sama → indeks/kategori beda → komunikasi risiko perlu sebut sistem." },
  { q: "Petakan instrumen 8.7: AMDAL/UKL-UPL → persetujuan lingkungan berbasis risiko (PP 5/2021) + persetujuan teknis → PROPER → audit. Di mana lobang pengawasan pasca-persetujuan?", h: "PP 22 ganti izin → persetujuan; pasca-izin diawasi CEMS/SISPEK + PROPER; pengawasan usai Permen 6/2026." },
  { q: "Analisis SPPU Kepgub 576/2023 & LEZ Kota Tua: instrumen struktural (MRT/LRT/TransJakarta) vs respons episodik (penyiraman, WFH 2023). Evaluasi efektivitas di Bab 10.", h: "LEZ permanen belum teregulasi; struktural menekan sumber bergerak hulu vs episodik meredam puncak; bedakan ilustratif Jakarta vs nasional." },
  { q: "Pajak Rp30/kg CO2e untuk PLTU vs besaran BME udara: jelaskan co-benefit & trade-off-nya. Mengapa perdagangan CO2 tidak otomatis menurunkan SO2/PM, tetapi tetap menekan via cap?", h: "CO2 iklim vs SO2/PM ambien rezim berbeda; namun cap CO2 menekan batu bara high-emission yang korelatif high-SO2/PM, sehingga ada tekanan tidak langsung." }
];

APP_DATA.LATIHAN = [
  { t: "Susun tabel sela BMUA PM2.5 tahunan IT-1 35 → AQG 5 dengan indeks mortalitas WHO 124→100, tandai posisi PP 22 (15=IT-3) & EU 2030 (10=IT-4) & NAAQS 9,0, lalu narasikan pengetatan bertahap Indonesia.", tag: "Tangga IT" },
  { t: "Hitung ISPU harian untuk 5 konsentrasi PM2.5 (15, 35, 55, 120, 250 µg/m³) dengan rumus interpolasi linear dan bandingkan dengan AQI US EPA 2024; jelaskan kapan kategori berbeda 1 tingkat.", tag: "ISPU vs AQI" },
  { t: "Untuk PLTU 2×315 MW: susun daftar kepatuhan BME P.15/2019 (SO2/NOx 550, PM 100, Hg) vs usulan ketat 80/100/20; hitung beban SO2 tahunan g/s vs ton/th bila CF 80% dan bandingkan dengan beban ambien Jakarta (Bab 7).", tag: "BME" },
  { t: "Purunkan amar 374/Pdt.G-LH/2019: instrumen hukum mana diubah untuk ‘BMUA cukup’ (PP vs permen) dan mengapa perubahan PP lebih sukar (konsensus K/L)? Rancang roadmap 3-tahun.", tag: "Litigasi" },
  { t: "Rancang skema CEMS→SISPEK untuk PLTU 660 MW: parameter (SO2, NOx, PM, flow, O2), kalibrasi, handling data hilang, dan agregasi beban tahunan ton SO2/th yang dapat dibandingkan lintas PLTU (Bab 3.6).", tag: "CEMS" },
  { t: "Evaluasi LEZ Kota Tua & transportasi publik: ukur indikator (uji emisi lulus%, ridership MRT/LRT/TransJakarta) vs penyiraman jalan saat ISPU>200; susun laporan 2 halaman dengan rekomendasi struktural vs episodik.", tag: "Daerah" }
];

APP_DATA.PUSTAKA = [
  { group: "Regulasi Indonesia", items: [
    "UU No. 32/2009 tentang PPLH (Pasal 1 BMUA vs BME, AMDAL Pasal 22, Audit Pasal 48, gugatan PMH Bab XV).",
    "PP No. 22/2021 (LN 2021 No.32) Lamp. VII BMUA (25 °C1 atm); PP 5/2021 perizinan berbasis risiko.",
    "Permen LHK P.15/2019 (5 Apr 2019) tentang BME Pembangkit Termal (SO2/NOx/partikulat + CEMS); Permen P.13/2021 SISPEK; Permen P.14/2020 ISPU; Permen 6/2026 Pengawasan & Sanksi; Permen LH 19/2017 (semen).",
    "UU 26/2014 (AATHP), UU 19/2009 (Stockholm POPs), UU 11/2017 (Minamata), UU 22/2009 LLAJ, UU 7/2021 Pasal 13 pajak Rp30/kg, Perpres 98/2021 NEK (+ Permen P.21/2022).",
    "DKI Jakarta: Perda 2/2005, Pergub 210/2017 uji emisi, Ingub 66/2019, Kepgub 576/2023 SPPU & SLFH Haze Roadmap; JDIH KLHK/BPK & Jakarta."
  ] },
  { group: "Pedoman & standar internasional", items: [
    "WHO (2021) Global Air Quality Guidelines: PM2.5/PM10/O3/NO2/SO2/CO + interim targets (PM2.5 thn 35→5; 24 jam 75→15; mortalitas indeks 124→100).",
    "US EPA NAAQS Table (40 CFR 50): PM2.5 tahunan 9,0 µg/m³ (final 7 Feb 2024; reconsideration Mar 2025), 24 jam 35 (98th 3 yr); O3 0,070 ppm; NO2 53ppb/100ppb.",
    "Directive (EU) 2024/2881 (23 Oct 2024, 20 Nov 2024): PM2.5 tahunan 25→10 (2030), 24 jam 25 (18×), PM10 20/45, NO2 20; AEI 5/10 + right to compensation.",
    "UN conventions: CLRTAP 1979 (+ Gothenburg), Stockholm POPs 2001, Minamata 2013; ASEAN AATHP 2002 & Second Roadmap Vientiane 23 Aug 2023 Haze-Free 2030 ke IT-3."
  ] },
  { group: "Indeks & pemantauan", items: [
    "Permen P.14/2020 & portal ispu.kemenlh.go.id; US EPA 40 CFR Part 58 App G AQI (breakpoints PM2.5 9,0 di 50 pasca-2024); AirNow AQI Basics; EPA Fact Sheet PM NAAQS–AQI 2024.",
    "KLHK SPKU & SPKU DKI; BMKG monsun/ENSO; data Sadao vs Khohong; DEMNAS/BIG & WRF vs observasi (Bab 7).",
    "Citizen lawsuit: PN Jakpus 374/Pdt.G-LH/2019 (16 Sep 2021), PT DKI 549/2022 (17 Oct 2022), MA 2560 K/Pdt/2023 (13 Nov 2023 inkracht); YLBHI & LBH Jakarta press releases."
  ] }
];
