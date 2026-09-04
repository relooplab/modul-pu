/**
 * data-bab4.js — semua konten editable Bab 4: Parameter Pencemaran Udara dan Pemantauan.
 * Sumber: "Bab 4 — Parameter Pencemaran Udara dan Pemantauan.md" (ringkas, 179 baris)
 * dan "bab-04-parameter-pencemaran-udara-dan-pemantauan.md" (lengkap, 316 baris, Draft Bab 4)
 * dengan anotasi [Fakta]/[Regulasi]/[Model]/[Analisis]. Semua konsentrasi ambien pada 25 °C, 1 atm (PP 22/2021).
 */
window.APP_DATA = {};

APP_DATA.OBJECTIVES = [
  "Membedakan fraksi partikulat (TSP, PM₁₀, PM₂.₅, PM₁, dan UFP), karakteristik fisik-kimianya, distribusi ukuran, serta implikasinya terhadap saluran pernapasan.",
  "Menjelaskan sifat, sumber, dan waktu tinggal gas kriteria (SO₂, NOx/NO₂, CO, O₃, Pb) serta keterkaitan primer–sekunder pada pola diurnalnya.",
  "Menggolongkan hidrokarbon (NMHC, VOC, dan PAH) serta polutan udara berbahaya, termasuk logam berat, dioksin/furan, benzena, dan formaldehida, beserta status pengaturannya di Indonesia.",
  "Mengidentifikasi parameter emerging (black carbon, NH₃, mikroplastik atmosferik) dan metode pengukurannya.",
  "Memilih teknik pengambilan contoh dan analisis yang sesuai—manual SNI 7119, analizer kontinu, atau passive sampler—beserta langkah jaminan dan pengendalian mutunya.",
  "Menjelaskan teknologi pemantauan modern (sensor biaya rendah IoT, jejaring komunitas, satelit Sentinel-5P/TROPOMI, LIDAR) dengan kekuatan dan keterbatasannya.",
  "Melakukan konversi satuan ppm ↔ µg/m³ dengan koreksi kondisi acuan dan menghitung ISPU untuk PM₂.₅, serta menerapkan aturan waktu rata-rata yang benar.",
  "Menilai kekuatan dan keterbatasan ekosistem data kualitas udara waktu nyata di Indonesia, termasuk SPKU KLHK/DLH, BMKG, dan agregator, serta tantangan harmonisasi datanya."
];

APP_DATA.GLOSSARY = {
  "tsp": {
    term: "TSP",
    en: "total suspended particulate",
    def: "Partikel tersuspensi total yang tertangkap inlet HVAS hingga ±100 µm; baku mutu ambien Indonesia 230 µg/m³ (24 jam, SNI 7119-3:2017, gravimetri)."
  },
  "pm10": {
    term: "PM₁₀",
    en: "particulate matter ≤10 µm",
    def: "Fraksi terinhalasi ≤10 µm (cut-point 50% 10 µm); baku mutu 75 µg/m³ (24 jam) dan 40 µg/m³ (tahunan, PP 22/2021)."
  },
  "pm25": {
    term: "PM₂.₅",
    en: "fine particulate matter ≤2.5 µm",
    def: "Fraksi halus ≤2,5 µm yang menembus alveolus; baku mutu 55/15 µg/m³ (24 jam/tahunan). Pedoman WHO 15/5 µg/m³; kesenjangan 3× pada tahunan."
  },
  "ufp": {
    term: "UFP",
    en: "ultrafine particles",
    def: "Partikel ultrahalus ≤0,1 µm (100 nm); dinyatakan sebagai jumlah per cm³, bukan massa. WHO belum menetapkan pedoman massa; diukur dengan CNC/SMPS."
  },
  "gas-kriteria": {
    term: "Gas kriteria",
    en: "criteria pollutants",
    def: "SO₂, NOx/NO₂, CO, O₃, Pb (bersama partikulat) — dasar penetapan baku mutu hampir semua rezim, termasuk Lampiran VII PP 22/2021."
  },
  "ispu": {
    term: "ISPU",
    en: "Indeks Standar Pencemar Udara",
    def: "Indeks 0–50 Baik s.d. ≥300 Berbahaya (Permen LHK P.14/2020: PM₁₀, PM₂.₅, SO₂, CO, O₃, NO₂, HC). Pelaporan real-time via ispu.menlhk.go.id."
  },
  "baku-mutu": {
    term: "Baku mutu udara ambien",
    en: "ambient air quality standard",
    def: "Nilai ambang konsentrasi per parameter per waktu rata-rata pada kondisi acuan 25 °C, 1 atm (Lampiran VII PP 22/2021); berbeda dari pedoman WHO AQG."
  },
  "hap": {
    term: "HAP",
    en: "hazardous air pollutants",
    def: "Polutan udara berbahaya di luar kriteria: 187 senyawa US EPA (logam berat, dioksin, benzena, formaldehida). Di Indonesia belum punya baku mutu ambien; dikendalikan via baku mutu emisi."
  },
  "black-carbon": {
    term: "Black carbon (BC)",
    en: "black carbon",
    def: "Fraksi karbon elemental dari pembakaran tak sempurna; komponen PM₂.₅ dan SLCP (hari–minggu). Diukur dengan aethalometer/MAAP/EC-OC."
  },
  "nmhc": {
    term: "NMHC",
    en: "non-methane hydrocarbons",
    def: "Hidrokarbon non-metana; baku mutu 160 µg/m³ (3 jam, 06.00–10.00) dengan hydrocarbon analyzer FID (SNI 7119-13:2009). Prekursor ozon."
  },
  "sni7119": {
    term: "SNI 7119",
    en: "SNI ambient air",
    def: "Seri SNI cara uji udara ambien: gravimetri HVAS, impinger Griess-Saltzman (NO₂), NBKI (O₃ 352 nm), dll. Seri 7117 untuk emisi sumber tidak bergerak."
  },
  "analizer-kontinu": {
    term: "Analizer kontinu",
    en: "continuous analyzer",
    def: "Analizer otomatis SPKU: fluoresensi UV (SO₂), kemiluminesens (NOx), NDIR (CO), fotometri UV (O₃), atenuasi beta/TEOM (PM). FRM/FEM US EPA."
  },
  "lcs": {
    term: "Sensor biaya rendah (LCS)",
    en: "low-cost sensors",
    def: "Sensor PM optis dan elektrokimia gas berbasis IoT; R² 0,2–0,58 (1 jam mentah) → ~0,72 setelah koreksi; kolokasi 7–12 hari dengan rujukan diperlukan."
  },
  "tropomi": {
    term: "TROPOMI",
    en: "TROPOspheric Monitoring Instrument",
    def: "Instrumen satelit Sentinel-5P (5P, 2017): sapuan 2600 km, resolusi ≈7×3,5 km, pita UV–SWIR; produk kolom NO₂/SO₂/HCHO/CO/O₃/CH₄. Yang diukur kolom, bukan permukaan."
  },
  "lidar": {
    term: "LIDAR",
    en: "light detection and ranging",
    def: "Pulsa laser untuk profil vertikal aerosol, tinggi PBL, dan lapisan asap; jejaring MPLNET/NASA. Di Indonesia masih riset, belum jaringan rutin."
  },
  "isokinetik": {
    term: "Sampling isokinetik",
    en: "isokinetic sampling",
    def: "Prinsip sampling cerobong (SNI 7117) di mana laju hisap = laju alir setempat agar distribusi ukuran partikel tidak bias."
  },
  "teq": {
    term: "TEQ",
    en: "toxic equivalent",
    def: "Ekuivalensi toksik dioksin/furan terhadap 2,3,7,8-TCDD via faktor WHO; pengendalian lewat suhu 3T dan karbon aktif."
  },
  "microplastik": {
    term: "Mikroplastik atmosferik",
    en: "atmospheric microplastics",
    def: "Partikel <5 mm (serat/fragmen) dari abrasi ban, tekstil sintetis, sampah plastik; sampling aktif (pompa) vs pasif (deposisi). Belum ada baku mutu/STM."
  }
};

APP_DATA.CHAPTERS = [
  { n: 1, title: "Sejarah Pencemaran Udara", href: "bab-1.html", current: false },
  { n: 2, title: "Konsep Dasar Penyebab Terjadinya Pencemaran Udara", href: "bab-2.html", current: false },
  { n: 3, title: "Sumber Pencemaran Udara", href: "bab-3.html", current: false },
  { n: 4, title: "Parameter Pencemaran Udara dan Pemantauan", href: "#top", current: true },
  { n: 5, title: "Dampak Pencemaran Udara", href: "bab-5.html" },
  { n: 6, title: "Meteorologi dan Termodinamika Atmosfer", href: null },
  { n: 7, title: "Pemodelan Pencemaran Udara", href: null },
  { n: 8, title: "Peraturan dan Standar Pencemaran Udara", href: null },
  { n: 9, title: "Teknologi Pengendalian Pencemaran Udara", href: null },
  { n: 10, title: "Studi Kasus Pencemaran Udara", href: null }
];

APP_DATA.KEYWORDS = [
  { t: "TSP / PM₁₀ / PM₂.₅ / UFP", to: "#partikulat" },
  { t: "Gas kriteria (SO₂, NO₂, CO, O₃, Pb)", to: "#gas-kriteria" },
  { t: "NMHC / VOC / PAH (BaP)", to: "#hidrokarbon" },
  { t: "HAP (Hg, dioksin, benzena)", to: "#hap" },
  { t: "Black carbon & NH₃", to: "#emerging" },
  { t: "Mikroplastik atmosferik", to: "#emerging" },
  { t: "SNI 7119 (HVAS, impinger)", to: "#manual" },
  { t: "Analizer kontinu (BAM, NDIR)", to: "#analizer" },
  { t: "Passive sampler (Palmes)", to: "#manual" },
  { t: "LCS & kalibrasi 7–12 hari", to: "#modern" },
  { t: "TROPOMI / Sentinel-5P", to: "#modern" },
  { t: "Konversi ppm ↔ µg/m³ (40,9)", to: "#konversi" },
  { t: "ISPU (0–50 Baik ... ≥300)", to: "#ispu-kalk" },
  { t: "SPKU & data real-time", to: "#terkini" }
];

APP_DATA.CONVERTER = {
  gases: [
    { id: "so2", label: "SO₂", mw: 64.07 },
    { id: "no2", label: "NO₂", mw: 46.01 },
    { id: "co", label: "CO", mw: 28.01 },
    { id: "o3", label: "O₃", mw: 48.00 },
    { id: "nmo", label: "NO", mw: 30.01 },
    { id: "hcho", label: "HCHO", mw: 30.03 }
  ],
  defaultGas: "no2",
  defaultPpb: 106,
  defaultT: 25,
  defaultP: 1
};

APP_DATA.ISPU = {
  pm25_breakpoints: [
    { cLow: 0, cHigh: 50, iLow: 0, iHigh: 50, cat: "Baik" },
    { cLow: 51, cHigh: 75, iLow: 51, iHigh: 100, cat: "Sedang" },
    { cLow: 76, cHigh: 150, iLow: 101, iHigh: 199, cat: "Tidak Sehat" },
    { cLow: 151, cHigh: 250, iLow: 200, iHigh: 299, cat: "Sangat Tidak Sehat" },
    { cLow: 251, cHigh: 500, iLow: 300, iHigh: 500, cat: "Berbahaya" }
  ],
  defaultPM25: 35.5
};

APP_DATA.CHART_BAKU = {
  labels: ["PM₂.₅ 24j", "PM₂.₅ thn", "PM₁₀ thn", "NO₂ thn", "SO₂ 24j", "O₃ 8j"],
  pp:  [55, 15, 40, 50, 75, 100],
  who: [15, 5, 15, 10, 40, 100],
  caption: "Grafik 4.1 — Baku mutu PP 22/2021 vs WHO AQG 2021 (µg/m³). Batang lebih pendek = lebih ketat. PM₂.₅ tahunan nasional 3× WHO (15 vs 5) adalah kesenjangan terbesar."
};

APP_DATA.CHART_MICRO = {
  labels: ["Jakarta Pusat", "Jakarta Selatan", "Bandung", "Semarang", "Kupang", "Malang"],
  data: [37, 30, 16, 13, 13, 2],
  caption: "Grafik 4.2 — Mikroplastik atmosferik deposisi 2 jam per cawan petri di 18 kota/kab (ECOTON–SIEJ Mei–Juli 2025). Metode semi-kuantitatif; ilustrasi relatif, bukan klaim nasional. Jakarta Pusat tertinggi (37 partikel/2 jam)."
};

APP_DATA.CHART_SPKU = {
  labels: ["2021 (KLHK)", "2022 (KLHK)", "2023 DKI", "Okt 2025 DKI"],
  data: [39, 46, 21, 111],
  caption: "Grafik 4.3 — Ekspansi jejaring SPKU: nasional 39→46 stasiun (KLHK 2021→2022), DKI Jakarta 21 (2023)→111 (Okt 2025, termasuk 11 referensi DLH + 12 KLHK Jabodetabek)."
};

APP_DATA.QUIZ = [
  {
    q: "Fraksi PM yang dinyatakan sebagai jumlah partikel per cm³ (bukan massa) dan belum memiliki baku mutu massa adalah…",
    options: ["TSP", "PM₁₀", "PM₂.₅", "UFP (≤0,1 µm)"],
    answer: 3,
    pembahasan: "UFP (≤0,1 µm) diukur sebagai jumlah dengan CNC/SMPS; WHO belum menetapkan pedoman massa dan PP 22/2021 belum mengaturnya. TSP/PM₁₀/PM₂.₅ adalah massa."
  },
  {
    q: "Pasangan prinsip analizer kontinu yang benar untuk SO₂ dan NOx adalah…",
    options: ["NDIR dan BAM", "Fluoresensi UV (SO₂) dan kemiluminesens (NOx)", "Fotometri UV dan FID", "Atenuasi beta dan impinger"],
    answer: 1,
    pembahasan: "SO₂: fluoresensi UV (±214 nm); NOx: kemiluminesens NO+O₃→hν (NO₂ via konverter Mo). NDIR untuk CO, BAM/TEOM untuk PM, FID untuk HC."
  },
  {
    q: "Baku mutu PM₂.₅ tahunan PP 22/2021 dibanding WHO AQG 2021 adalah…",
    options: ["Lebih ketat", "Setara", "3× lebih longgar (15 vs 5 µg/m³)", "Tidak diatur di keduanya"],
    answer: 2,
    pembahasan: "PP 22/2021: 15 µg/m³ tahunan; WHO 2021: 5 µg/m³. PP setara interim target IT-3 WHO (15), tiga kali lebih longgar."
  },
  {
    q: "Pada 25 °C, 1 atm, faktor konversi ppm → µg/m³ adalah BM × 40,9. Baku mutu CO 1 jam 10.000 µg/m³ setara ±…",
    options: ["0,87 ppm", "8,7 ppm", "87 ppm", "0,09 ppm"],
    answer: 1,
    pembahasan: "C(ppm)=C(µg/m³)/(BM×40,9)=10.000/(28×40,9)≈8,7 ppm. Pada 0 °C (Vm 22,4) angkanya berbeda — basis harus dicantumkan."
  },
  {
    q: "Sensor biaya rendah (LCS) yang tepat untuk tujuan kepatuhan baku mutu adalah…",
    options: ["Pengganti analizer rujukan", "Pemetaan spasial, tren, dan edukasi — bukan kepatuhan; butuh kolokasi 7–12 hari dan koreksi T/RH", "Tidak perlu kalibrasi", "Akurat tanpa koreksi"],
    answer: 1,
    pembahasan: "R² 1 jam mentah 0,2–0,58 → ~0,72 setelah koreksi; LCS tepat untuk spasial/tren/edukasi, bukan FRM/FEM kepatuhan."
  },
  {
    q: "Yang diukur langsung oleh TROPOMI/Sentinel-5P adalah…",
    options: ["Konsentrasi permukaan PM₂.₅", "Kolom atmosfer gas (troposferik NO₂, HCHO, CO, O₃) dengan sapuan 2600 km", "Kedalaman laut", "Suhu tanah"],
    answer: 1,
    pembahasan: "TROPOMI mengukur kolom (bukan permukaan) dengan resolusi ~7×3,5 km pada pita UV–SWIR; perlu model/validasi untuk permukaan."
  }
];

APP_DATA.DISKUSI = [
  { q: "Mengapa PM₂.₅ adalah subset PM₁₀ dan TSP, tetapi hasil TSP tidak dapat menggantikan PM₁₀/PM₂.₅? Jelaskan implikasi rasio PM₂.₅/PM₁₀ 0,6–0,8 vs rendah.", h: "Gunakan Tabel 4.1 dan interpretasi rasio: tinggi = dominasi pembakaran (kendaraan/PLTU/open burning), rendah = debu jalanan. Beda inlet cut-point." },
  { q: "Bandingkan waktu tinggal SO₂ (±2–4 hari), NOx (±1 hari), CO (±1–3 bulan), dan O₃ (hari–minggu) terkait oportunisme pengendaliannya.", h: "Waktu tinggal pendek = dampak lokal–regional dan respons cepat terhadap penurunan emisi; CO panjang = hemisferik dan dikendalikan via OH." },
  { q: "PP 22/2021 belum menetapkan baku mutu ambien untuk HAP (Hg, dioksin, benzena). Bagaimana pengendaliannya dilakukan dan apa celah regulasinya?", h: "Via baku mutu emisi sektoral (Permen LHK) dan Konvensi Minamata/Stockholm; data ambien rutin HAP belum tersedia — rujukan hanya kajian AMDAL/riset khusus." },
  { q: "Mikroplastik atmosferik belum punya STM/metode rujukan. Nilai data BRIN (15 partikel/m²/hari hujan) dan ECOTON (37 di Jakpus, 2 di Malang) sebagai bukti.", h: "Tekankan metode semi-kuantitatif (deposisi 2 jam, cawan petri) bukan FRM; ilustrasi relatif antar-kota, bukan klaim nasional; butuh µ-FTIR/Raman." },
  { q: "Rancang program pemantauan PM₂.₅ tahunan kota tanpa SPKU rujukan dengan 10 LCS + akses 1 rujukan kota tetangga. Protokol kolokasi dan koreksinya?", h: "Kolokasi 7–12 hari bersebelahan rujukan, model koreksi T/RH, validasi R²/RMSE vs pedoman EPA (<7 µg/m³ untuk PM), penempatan bebas hambatan per SNI 19-7119.6-2005." },
  { q: "Baku mutu SO₂ 24 jam WHO 2021 melonggarkan 20→40 µg/m³. Diskusikan mengapa pedoman kesehatan bisa menaikkan ambang dan implikasinya bagi Indonesia (75 vs 40).", h: "WHO memperbarui bukti dosis–respons dan interim target; Indonesia 75 µg/m³ hampir 2× WHO 40 — interpretasikan sebagai perbedaan pendekatan kesehatan vs regulasi bertahap." }
];

APP_DATA.LATIHAN = [
  { t: "Konversikan baku mutu SO₂ 24 jam (75 µg/m³), NMHC 3 jam (160 µg/m³ sebagai heksana BM 86), dan O₃ 8 jam (100 µg/m³) ke ppb/ppm pada 25 °C, 1 atm (40,9) dan pada 0 °C (22,4 L/mol). Jelaskan mengapa berbeda dan kapan basis 0 °C dipakai.", tag: "Konversi" },
  { t: "Hitung ISPU PM₂.₅ untuk konsentrasi 55 µg/m³ (baku mutu 24 jam), 120 µg/m³, dan 180 µg/m³ menggunakan interpolasi ISPU dan tentukan kategorinya (Baik s.d. Berbahaya). Bandingkan dengan baku mutu tahunan WHO 5 µg/m³.", tag: "ISPU" },
  { t: "Susun tabel SNI 7119 (TSP/PM₁₀/PM₂.₅/Pb/NO₂/SO₂/O₃/CO/HC) dengan prinsip, media, laju alir/durasi, dan analisis laboratorium. Tandai mana yang gravimetri vs impinger vs instrumental.", tag: "Metode" },
  { t: "Rancang desain pemantauan pasif NO₂ kota (Palmes/Ogawa): pilih 30 titik berdasar SNI 19-7119.6-2005, durasi 14 hari/semusim (Permen 14/2025), dan strategi blanko/duplikat/QA untuk membandingkan dengan data TROPOMI kolom NO₂ sinkron.", tag: "Desain" },
  { t: "Analisis kasus nafas (>200 sensor, studi PM₂.₅–kesehatan Jabodetabek 2020–2022, pengecilan 2026): nilai keberlanjutan jejaring komunitas vs SPKU referensi. Usulkan model hybrid rujukan–LCS–satelit untuk kota Anda.", tag: "Evaluasi" },
  { t: "Aplikasi mikroplastik: replikasi deposisi pasif 2 jam ECOTON (cawan petri 1–1,5 m, kertas Whatman basah, sarung nitril, alat gelas) di lingkungan kampus. Hitung laju deposisi per m²/hari dan identifikasi polimer via µ-FTIR/Raman terbatas literatur.", tag: "Eksperimen" }
];

APP_DATA.PUSTAKA = [
  { group: "Peraturan & standar", items: [
    "PP No. 22 Tahun 2021, Lampiran VII — Baku Mutu Udara Ambien (25 °C, 1 atm; TSP 230/PM₁₀ 75/40/PM₂.₅ 55/15/NO₂ 200/65/50/SO₂ 150/75/45/CO 10.000/4.000/O₃ 150/100/35/NMHC 160 µg/m³).",
    "Permen LHK No. P.14/MENLHK/SETJEN/KUM.1/7/2020 tentang Indeks Standar Pencemar Udara (ISPU: PM₁₀, PM₂.₅, SO₂, CO, O₃, NO₂, HC; ispu.menlhk.go.id).",
    "Permen LHK No. 14 Tahun 2025 tentang Status dan Kondisi Lingkungan Hidup (frekuensi manual pasif ≥14 hari/musim, aktif ≥24 data/tahun).",
    "Seri SNI 7119 (ambien): SNI 7119-2:2017 (NO₂), SNI 7119-3:2017 (TSP HVAS), SNI 7119-4:2017 (Pb), SNI 7119-7:2017 (SO₂), SNI 7119-8:2017 (O₃/NBKI), SNI 7119-10:2011 (CO), SNI 7119-13:2009 (HC FID), SNI 7119-14:2016 (PM₂.₅), SNI 7119-15:2016 (PM₁₀), SNI 19-7119.6-2005 (lokasi sampling); Seri SNI 7117 (emisi).",
    "US EPA: 40 CFR Part 50 Appendix A-1 (SO₂ UV fluorescence), C (CO NDIR), D (O₃ UV), F (NO₂ chemiluminescence); Reference & Equivalent Methods (FRM/FEM); BAM-1022 FEM."
  ] },
  { group: "Buku & referensi ilmiah", items: [
    "de Nevers, N. (2000). Air Pollution Control Engineering, 2nd ed. (Bab 1, 4, 8, 10: diameter aerodinamik, isokinetik, HC).",
    "Seinfeld, J.H. & Pandis, S.N. (2016). Atmospheric Chemistry and Physics, 3rd ed. (mode log-normal, waktu tinggal, aerosol).",
    "IARC — benzo[a]pyrene Grup 1; EU Direktif 2004/107/EC target BaP 1 ng/m³; WHO statements benzena/formaldehida no safe level.",
    "Konvensi Minamata (Hg, diratifikasi UU 11/2017) dan Konvensi Stockholm (POPs dioksin/furan, TEQ WHO).",
    "WHO (2021). WHO Global Air Quality Guidelines: PM₂.₅, PM₁₀, O₃, NO₂, SO₂, CO; interim targets PM₂.₅ tahunan 35/25/15/10."
  ] },
  { group: "Data & teknologi pemantauan", items: [
    "KLHK/SPKU: 39 lokasi 2021 +14 AQMS rencana (Ditjen PPKL), 46 stasiun 2022 (37 KLHK), DKI 21 (2023)→111 (Okt 2025, 11 DLH+12 KLHK), portal ispu.menlhk.go.id & udara.jakarta.go.id; BMKG layanan PM₂.₅ near real-time + early warning.",
    "Nafas: >200 sensor (2026, studi PM₂.₅–kesehatan Jabodetabek 2020–2022), pengecilan 25 Mar 2026 menjadi yayasan; IQAir >500.000 lokasi; ICIMOD 2025 kolokasi 7–12 hari; Sensors and Materials 2023 R² 0,2–0,58→0,72, RMSE vs EPA <7 µg/m³.",
    "Sentinel-5P/TROPOMI (ESA 2017): swath 2600 km, resolusi ~7×3,5 km, pita UV–SWIR, produk kolom NO₂/SO₂/HCHO/CO/O₃/CH₄; studi ITS 2020 & AAQR 2021 COVID Jakarta; GEE dataset COPERNICUS_S5P_OFFL_L3_NO2.",
    "BRIN 2025: hujan pesisir Jakarta ±15 mikroplastik/m²/hari; ECOTON–SIEJ Mei–Juli 2025: 18 kota/kab (Jakpus 37/2 jam ... Malang 2), FTIR; Purwiyanto 2021 Teluk Jakarta 3,68×10⁹ partikel/hari; US protected areas ~1000 ton/tahun.",
    "Santoso et al. 2019: Gent stacked filter unit PM halus/kasar 17 kota Indonesia (dominasi halus di kota berlalu-lintas padat)."
  ] }
];
