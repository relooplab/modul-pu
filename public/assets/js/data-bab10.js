/**
 * data-bab10.js — Bab 10 Studi Kasus Pencemaran Udara.
 * Sumber: "BAB_10_Studi_Kasus_Pencemaran_Udara.md" (343 baris)
 * + "BAB 10 — Studi Kasus Pencemaran Udara.md" (350 baris)
 * Bab integratif: Bab 1–9 diuji pada kasus nyata; bedakan fakta/regulasi/model/analisis.
 */
window.APP_DATA = {};

APP_DATA.OBJECTIVES = [
  "Merekonstruksi rantai sebab–akibat (emisi → meteorologi → konsentrasi → dampak → respons kebijakan) pada episode pencemaran udara besar.",
  "Mengevaluasi efektivitas instrumen kebijakan dan teknologi pengendalian berdasarkan data pemantauan.",
  "Menginterpretasikan hasil pemodelan dispersi (Gaussian, AERMOD) beserta ketidakpastiannya.",
  "Merancang dan melaksanakan mini riset studi kasus lokal secara mandiri."
];

APP_DATA.GLOSSARY = {
  "smog-sulfur": {
    term: "Smog sulfur (reduksi)",
    en: "reducing smog",
    def: "Smog klasik dari pembakaran batu bara: SO₂ dan jelaga terperangkap inversi; contoh Great Smog London 1952 — berbeda dari smog fotokimia oksidatif."
  },
  "smog-fotokimia": {
    term: "Smog fotokimia",
    en: "photochemical smog",
    def: "Ozon dan PAN yang terbentuk dari NOₓ dan VOC di bawah sinar matahari; contoh Los Angeles — pencemar sekunder yang dikendalikan lewat prekursor."
  },
  "clean-air-act": {
    term: "Clean Air Act 1956",
    en: "Clean Air Act 1956",
    def: "Undang-undang Inggris pasca-Great Smog: melarang asap hitam, mewajibkan tungku bebas asap, dan mengatur Smoke Control Area — tanpa menetapkan baku mutu ambien."
  },
  "carb": {
    term: "CARB",
    en: "California Air Resources Board",
    def: "Badan udara California (1967); perintis standar tailpipe HC/CO (1966), NOₓ (1971), katalis (1975), hingga LEV IV dan Low NOₓ Omnibus."
  },
  "action-plan": {
    term: "Action Plan Tiongkok 2013–2017",
    en: "Air Pollution Prevention and Control Action Plan",
    def: "Rencana aksi Dewan Negara Tiongkok (investasi ±US$270 miliar) dengan target PM2.5 kunci −15–25% dan Beijing ±60 µg/m³ pada 2017."
  },
  "aathp": {
    term: "AATHP",
    en: "ASEAN Agreement on Transboundary Haze Pollution",
    def: "Perjanjian kabut asap lintas batas ASEAN (2002); diratifikasi Indonesia lewat UU No. 26 Tahun 2014 — terakhir di ASEAN."
  },
  "ispu": {
    term: "ISPU",
    en: "Indeks Standar Pencemar Udara",
    def: "Indeks kualitas udara Indonesia (Permen LHK P.14/2020); PM2.5 Tidak Sehat mulai >55,4 µg/m³ (24 jam) — berbeda ambang dan rumus dari AQI yang dipakai IQAir."
  },
  "aermod": {
    term: "AERMOD",
    en: "AMS/EPA Regulatory Model",
    def: "Model dispersi Gaussian yang dipakai regulasi; pada kasus Bab 10 dipakai untuk PLTD dan insinerator — hasilnya asumsi model, bukan fakta lapangan."
  },
  "caline": {
    term: "CALINE",
    en: "CALINE line source model",
    def: "Model sumber garis untuk koridor jalan; alternatif Gaussian yang lebih tepat untuk NO₂ tepi jalan dibanding model titik."
  },
  "grap": {
    term: "GRAP",
    en: "Graded Response Action Plan",
    def: "Rencana darurat bertingkat Delhi-NCR (2017, CAQM): Poor 201–300 hingga Severe+ >450 — reaktif dan bergantung koordinasi lintas provinsi."
  },
  "caqm": {
    term: "CAQM",
    en: "Commission for Air Quality Management",
    def: "Komisi pengelola kualitas udara Delhi-NCR (2021); respons institusional atas kegagalan koordinasi antar-negara-bagian — analog Jabodetabek."
  },
  "mikroplastik": {
    term: "Mikroplastik atmosferik",
    en: "atmospheric microplastics",
    def: "Serat dan fragmen di udara ambien, dominan dari aus ban dan tekstil (bukan pembakaran); status emerging — belum ada di PP 22/2021 maupun WHO 2021."
  },
  "pmf": {
    term: "PMF",
    en: "Positive Matrix Factorization",
    def: "Model reseptor untuk atribusi sumber (source apportionment) — pelengkap model dispersi; penamaan faktor butuh bukti eksternal."
  },
  "audit-data": {
    term: "Audit data",
    en: "data audit",
    def: "Praktik memisahkan data pemantauan, estimasi model, ketentuan regulasi, dan interpretasi — termasuk audit satuan (µg vs mg/Nm³) dan acuan waktu rata-rata."
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
  { n: 8, title: "Peraturan dan Standar Pencemaran Udara", href: "bab-8.html", current: false },
  { n: 9, title: "Teknologi Pengendalian Pencemaran Udara", href: "bab-9.html", current: false },
  { n: 10, title: "Studi Kasus Pencemaran Udara", href: "#top", current: true }
];

APP_DATA.KEYWORDS = [
  { t: "Great Smog 1952 (±12.000)", to: "#london" },
  { t: "Clean Air Act & Smoke Control Area", to: "#london" },
  { t: "Haagen-Smit & pencemar sekunder", to: "#la" },
  { t: "CARB & katalis 1975", to: "#la" },
  { t: "Beijing PM2.5 −34%", to: "#china" },
  { t: "Karhutla & AATHP", to: "#karhutla" },
  { t: "Jakarta 2023 & WFH", to: "#jakarta" },
  { t: "AERMOD PLTD & insinerator", to: "#industri" },
  { t: "NO₂ koridor jalan", to: "#transportasi" },
  { t: "GRAP Delhi", to: "#delhi" },
  { t: "Mikroplastik & aus ban", to: "#mikroplastik" },
  { t: "Audit data model vs pantau", to: "#industri" },
  { t: "Non-knalpot & EV 90%", to: "#mikroplastik" },
  { t: "Mini riset lokal", to: "#miniriset" }
];

APP_DATA.CHART_BEIJING = {
  labels: ["PM2.5", "PM10", "SO₂", "NO₂"],
  y2013: [88, 110, 23, 54],
  y2017: [58, 89, 8, 45],
  unit: "µg/m³ (SO₂/NO₂/PM; CO 1,4→0,9 mg/m³)",
  caption: "Grafik 10.1 — Beijing 2013→2017 (12 stasiun nasional; Cheng et al., ACP 2019): PM2.5 −34%, SO₂ −68% — terutama dari pengurangan batu bara."
};

APP_DATA.CHART_KARHUTLA = {
  labels: ["2015", "2016", "2017", "2018", "2019", "2023"],
  data: [2.6, 0.44, 0.17, 0.52, 1.65, 1.16],
  note: "2023: KLHK 1,16 vs Greenpeace ≥2,13 juta ha",
  caption: "Grafik 10.2 — Luas karhutla indikatif KLHK (juta ha, citra satelit). 2023: KLHK 1,16 vs independen ≥2,13 — selisih metode, bukan salah satu pasti benar."
};

APP_DATA.AUDIT_CASES = [
  {
    id: "london", label: "London 1952 — kematian",
    official: "±4.000 kematian berlebih (Registrar General, masa kejadian)",
    revised: "±12.000 kematian berlebih (Des 1952–Feb 1953; Bell et al.)",
    ratio: "±3× lipat", cls: "Keduanya estimasi epidemiologis; awal hampir selalu konservatif."
  },
  {
    id: "karhutla2023", label: "Karhutla 2023 — luas terbakar",
    official: "1,16 juta ha (KLHK/SiPongi, citra satelit)",
    revised: "≥2,13 juta ha (Greenpeace Indonesia, 2025)",
    ratio: "±1,8× lipat", cls: "Beda metode delimitasi dan akses data — contoh ketidakpastian inventarisasi (Bab 3.6)."
  },
  {
    id: "ampenan", label: "PLTD Ampenan — NO₂ 1 jam",
    official: "13,1–15,1 µg/m³ (pengukuran ambien 3 titik; 6–7,5% baku mutu)",
    revised: "515,19 µg/m³ (model AERMOD; 2,6× baku mutu 200)",
    ratio: "±35× lipat", cls: "Discordance skenario konservatif vs pengukuran sesaat + risiko salah konversi NOₓ→NO₂."
  },
  {
    id: "bontang", label: "Insinerator Bontang — satuan emisi",
    official: "SO₂ 14,15 µg/Nm³ (artikel asli — kemungkinan keliru skala)",
    revised: "Seharusnya mg/Nm³ untuk emisi insinerator",
    ratio: "×1.000?", cls: "Audit satuan wajib sebelum dikutip; validasi hanya 2 titik (NO₂ reseptor 1 akurat baik)."
  },
  {
    id: "jakarta2023", label: "Jakarta Agu 2023 — ‘58× WHO’",
    official: "PM2.5 jam-jaman vs pedoman tahunan 5 µg/m³ → ±58× (nafas via CNBC)",
    revised: "Bandingkan jam vs baku jam/24-jam, bukan tahunan",
    ratio: "Dramatis tapi menyesatkan", cls: "Audit acuan waktu rata-rata sebelum menyimpulkan; ISPU ≠ AQI."
  }
];

APP_DATA.GRAP = [
  { stage: "I", cat: "Poor", aqi: "201–300", act: "Penyiraman jalan, kendali debu konstruksi, penegakan norma kendaraan" },
  { stage: "II", cat: "Very Poor", aqi: "301–400", act: "Larangan genset diesel, penyapuan mekanis, biaya parkir naik" },
  { stage: "III", cat: "Severe", aqi: "401–450", act: "Larangan konstruksi, pembatasan kendaraan BS-III/IV" },
  { stage: "IV", cat: "Severe+", aqi: ">450", act: "Tutup sekolah, WFH 50%, larangan masuk truk, opsi ganjil-genap" }
];

APP_DATA.QUIZ = [
  {
    q: "Angka kematian Great Smog London 1952 yang benar menurut kaidah Bab 10 adalah…",
    options: ["Tepat 4.000 jiwa tercatat sebab kematian polusi", "Resmi awal ±4.000 vs revisi epidemiologis ±12.000; keduanya estimasi, bukan pencatatan sebab langsung", "Tidak ada kematian berlebih", "Hanya 8.000 tanpa kaitan kabut"],
    answer: 1,
    pembahasan: "Registrar General ±4.000 saat kejadian; Bell et al. ±12.000 (Des–Feb). Estimasi awal episode hampir selalu konservatif; sertifikat kematian jarang mencantumkan polusi."
  },
  {
    q: "Pelajaran desain kebijakan dari Clean Air Act 1956 yang paling tepat adalah…",
    options: ["Menetapkan baku mutu ambien nasional", "Menyerang sumber (bahan bakar tak berasap + Smoke Control Area) — bukan sekadar dispersi cerobong tinggi yang hanya memindah masalah", "Melarang semua industri London", "Hanya memantau tanpa bertindak"],
    answer: 1,
    pembahasan: "CAA 1956 tanpa baku mutu ambien; lalu CAA 1968 (tall stacks) justru dikaitkan deposisi asam regional — relevan: penyiraman jalan bukan pengganti pengendalian emisi."
  },
  {
    q: "Kontribusi pembakaran jerami Punjab terhadap PM2.5 Delhi Okt–Nov 2022 menurut bukti apportionment adalah…",
    options: ["±90% — satu-satunya penyebab", "±14%; titik api turun >50% (2015–2023) tetapi PM2.5 stabil — sumber lokal perkotaan mendominasi", "0% sama sekali", "40–50% setiap tahun tanpa kecuali"],
    answer: 1,
    pembahasan: "CUPI-G + trajektori + CTM: ±14%. Jangan bebankan krisis semata pada penyebab musiman yang tampak; perlu atribusi sebelum kebijakan."
  },
  {
    q: "Discordance PLTD Ampenan (model 515 vs ukur ±14 µg/m³ NO₂ 1-jam) paling tepat dibaca sebagai…",
    options: ["Model pasti benar, ukur pasti salah", "Skenario konservatif vs pengukuran sesaat + risiko salah konversi NOₓ→NO₂; juga audit acuan: tahunan model 33,14 vs PP 22/2021 50 (memenuhi), vs WHO 10 (tidak)", "Ukur pasti benar, model tak berguna", "Keduanya pengukuran langsung"],
    answer: 1,
    pembahasan: "Beban penuh kontinyu vs ambien sesaat; studi bandingkan tahunan dengan 30 (keliru) padahal PP 22/2021: 50. Cocokkan waktu rata-rata sebelum klaim melampaui."
  },
  {
    q: "Pernyataan ‘PM2.5 Jakarta 58× WHO’ pada Agustus 2023 bermasalah karena…",
    options: ["Angkanya terlalu kecil", "Membandingkan konsentrasi jam-jaman dengan pedoman tahunan 5 µg/m³; bandingkan dengan baku jam/24-jam dan bedakan ISPU vs AQI", "WHO tidak punya pedoman", "ISPU dan AQI identik"],
    answer: 1,
    pembahasan: "Aritmetik dramatis tetapi metodologis keliru; Tidak Sehat ISPU PM2.5 mulai >55,4 µg/m³ (24-jam). Audit acuan adalah latihan Bab 10."
  },
  {
    q: "Untuk mini riset lokal, prinsip integritas data yang diwajibkan Bab 10 adalah…",
    options: ["Generalisasi satu titik menjadi klaim nasional", "Pisahkan pengukuran ↔ model ↔ regulasi ↔ rekomendasi; sebut tahun, lokasi, satuan, metode, sumber; tandai ‘data belum tersedia’ bila tak memadai", "Campur model dan ukur agar meyakinkan", "Tak perlu sitasi primer"],
    answer: 1,
    pembahasan: "Rubrik 25/20/25/20/10 menilai desain, pengolahan, pemodelan, kebijakan, pelaporan — replikasi metodologi 10.6 dalam skala semester."
  }
];

APP_DATA.DISKUSI = [
  { q: "Bandingkan logika ‘serang sumber’ CAA 1956 dengan ‘solusi dispersi’ (penyiraman jalan, cerobong tinggi). Kapan dispersi dapat dibenarkan dan kapan ia menyesatkan?", h: "CAA 1956 + substitusi bahan bakar vs tall stacks 1968 yang memindah ke deposisi asam; penyiraman hanya menekan resuspensi hitungan jam — bukan pengendalian emisi." },
  { q: "LA menurunkan knalpot lima dasawarsa tetapi toksisitas non-knalpot (rem/ban) makin dominan. Apa implikasinya bagi standar Euro dan agenda EV?", h: "Standar harus berevolusi mengikuti profil sumber; EV hingga 90% PM-nya non-knalpot di sebagian konteks — tautkan ke mikroplastik 10.9." },
  { q: "Beijing turun 34% dengan US$270 miliar + penegakan terpusat. Paket minimum apa yang realistis untuk Indonesia tanpa menyalin arsitekturnya?", h: "Target kuantitatif + koordinasi regional + substitusi bahan bakar padat; padatkan menjadi BME PLTU + mutu BBM — bukan seluruh arsitektur." },
  { q: "KLHK 1,16 vs Greenpeace ≥2,13 juta ha (2023). Bagaimana menyikapi selisih ±1,8× dalam laporan teknis tanpa menuduh salah satu berbohong?", h: "Beda delimitasi dan akses data; tampilkan keduanya + metode; ini pelajaran inventarisasi Bab 3.6 — bukan vonis." },
  { q: "WFH seminggu tak memperbaiki ISPU Jakarta (Agu 2023); Barcelona 2–4 hari WFH hanya −4–10% NOₓ. Apa kesimpulan evaluasi kebijakan struktural vs simptomatik?", h: "WFH lindungi paparan tetapi efek emisi kecil di armada besar; uji emisi + disinsentif struktural; tanpa inventarisasi + apportionment respons jadi reaktif." },
  { q: "GRAP Delhi reaktif (Tahap IV setelah toksik berhari-hari) vs SPPU Jakarta. Rancang mekanisme lintas-provinsi untuk Jabodetabek mencontoh CAQM — apa mandat minimumnya?", h: "Otoritas + sumber daya nyata, bukan koordinasi sukarela; pemicu prediktif IMD/IITM vs reaktif; bandingkan AATHP untuk lintas batas." }
];

APP_DATA.LATIHAN = [
  { t: "Rekonstruksi rantai London 1952 (emisi batu bara S-tinggi → antisiklon + inversi → akumulasi SO₂/PM → ±12.000 kematian → CAA 1956) dalam satu diagram sebab–akibat dengan label bab rujukan tiap mata rantai.", tag: "Rantai" },
  { t: "Hitung persen penurunan Beijing 2013→2017 untuk PM2.5/PM10/SO₂/NO₂/CO dari Tabel 10.3.1 dan diskusikan mengapa penurunan SO₂ (−68%) jauh melebihi NO₂ (−16%).", tag: "Hitung" },
  { t: "Susun tabel audit tiga episode karhutla (2015/2019/2023): luas KLHK vs independen, gambut, emisi/biaya, dan sumber — lalu tandai mana pemantauan vs estimasi model.", tag: "Audit" },
  { t: "Evaluasi respons Jakarta 2023 (WFH, tilang uji emisi, parkir Rp7.500, penyiraman) dengan matriks struktural vs simptomatik dan usulkan paket SPPU berbasis atribusi sumber.", tag: "Evaluasi" },
  { t: "Replikasi analisis koridor jalan: ukur NO₂ (Griess–Saltzman/SNI 7119) di 3 titik + volume lalu lintas + angin; bandingkan dengan AERMOD/CALINE dan baku 1-jam 200 µg/m³.", tag: "Lapangan" },
  { t: "Rancang mini riset satu semester (10.10): pilih kasus lokal, tetapkan parameter–metode–model, dan susun laporan audit (tahun, lokasi, satuan, acuan, sumber) + rubrik 25/20/25/20/10.", tag: "Rancang" }
];

APP_DATA.PUSTAKA = [
  { group: "Kasus global", items: [
    "Britannica (2025). Great Smog of London.",
    "Bell, M.L., Davis, D.L., Fletcher, T. (2004). Retrospective assessment of mortality from the London smog (Environ. Health Perspect. 112(1)).",
    "London Museum. The Great Smog of 1952.",
    "CARB. History (standar 1966/1971, katalis, Haagen-Smit); SCAQMD 50 Years of Progress; PBS SoCal (2012).",
    "Lurmann et al. (2015); Warneke et al. (2012); MDPI Toxics (2025) non-knalpot.",
    "Yu & Dai (2020); IGES (2023); UNEP (2019); Cheng et al. (2019) ACP 19; CFR/EPIC Chicago (2013–2022).",
    "Springer (2025) GRAP evaluation; npj CAS (2025) ±14% jerami; CAQM GRAP Order Nov 2025."
  ] },
  { group: "Indonesia: karhutla & Jakarta", items: [
    "UU No. 26/2014 (ratifikasi AATHP); KLHK/SiPongi & Ditjen PPI (2023) 30,8%; Greenpeace (2025) ≥2,13 juta ha.",
    "World Bank Cost of Fires; GFED4/CAMS; jurnal UII & Malahayati (2021); Kemenhut (2025) Kalbar.",
    "Berita Jakarta/DLH DKI (ISPU 31 Agu 2023); CNBC (nafas 58×, WFH, tilang, parkir); Unair; The Conversation (4–10% NOₓ).",
    "BenarNews; Mongabay; Tempo (putusan 374/Pdt.G-LH/2019); PP 22/2021 Lamp. VII; Permen P.14/2020."
  ] },
  { group: "Pemodelan & metode", items: [
    "Lalu (2026) PLTD Ampenan AERMOD (Idea in Indonesia); JTST POLIMDO (2025) Gaussian Ubud.",
    "Sarwono dkk. (2025) AERMOD insinerator Bontang (JTL UNMUL 9(1)); Wandasundari dkk. (2024) SCREEN3 Pontianak; UNDIP (2025) FPLT Medan.",
    "IPB/JLI (2018) Cikunir; UM Kendari Puuruy–Morosi; Insologi (2022) Kedung Cowek; CALINE4 Trans-Jakarta (2012).",
    "PMC (2024) mikroplastik udara; Springer (2025) airborne microplastics; UFZ Leipzig (2026) aus ban; ScienceDirect (2025) non-knalpot 90%."
  ] }
];
