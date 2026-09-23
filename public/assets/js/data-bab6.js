/**
 * data-bab6.js — semua konten editable Bab 6: Meteorologi dan Termodinamika Atmosfer.
 * Sumber: "BAB 6 — Meteorologi dan Termodinamika Atmosfer.md" (ringkas, 151 baris)
 * dan "bab_6_meteorologi_termodinamika_atmosfer.md" (lengkap, 322 baris, Draft Bab 6)
 * dengan pembedaan Fakta/Regulasi/Model/Analisis. Referensi utama de Nevers Bab 5 + BMKG/SiPongi.
 */
window.APP_DATA = {};

APP_DATA.OBJECTIVES = [
  "Menjelaskan hubungan emisi, meteorologi, dan konsentrasi ambien, serta alasan stagnasi lebih dari empat hari dapat memicu episode pencemaran walaupun emisi tetap.",
  "Menurunkan DALR = g/cₚ ≈9,8 K/km dari Hukum I Termodinamika + hidrostatik dan menurunkan persamaan Poisson serta temperatur potensial θ = T(p₀/p)^{R/cₚ}.",
  "Menentukan stabilitas atmosfer dari ELR, Γ_d, dan Γ_s serta kelas Pasquill–Gifford A–F berdasarkan angin, insolasi, dan awan; kemudian mengaitkannya dengan σ_y dan σ_z pada Bab 7.",
  "Mengklasifikasi empat tipe inversi (radiasi, subsidensi, frontal, adveksi) dan mengaitkannya dengan episode Meuse/Donora/London.",
  "Mendiagnosis perilaku plume cerobong (looping, coning, fanning, lofting, fumigation, trapping) dari profil stabilitas dan waktu hari.",
  "Menghitung mixing height efektif, ventilation coefficient VC = H·ū (ambang ±6.000 m²/s), dan ekstrapolasi kecepatan angin dengan power law & log law.",
  "Menganalisis pengendali meteorologi tropis Indonesia (monsun Asia–Australia, skala gerak mikro–planet, ENSO–IOD) serta keterkaitannya dengan kemarau panjang dan karhutla.",
  "Menginterpretasikan kondisi meteorologi terkini dan proyeksi perubahan stagnasi atmosfer di wilayah tropis."
];

APP_DATA.GLOSSARY = {
  "pbl": {
    term: "PBL (lapisan batas planet)",
    en: "planetary boundary layer",
    def: "Lapisan terbawah ±100 m (malam stabil) hingga 1–3 km (siang konvektif) tempat gesekan & pemanasan permukaan mengendalikan dispersi; identik operasional dengan mixing height."
  },
  "dalr": {
    term: "DALR",
    en: "dry adiabatic lapse rate",
    def: "Laju penurunan suhu parcel tak jenuh adiabatik: Γ_d = g/cₚ ≈9,8 K/km (de Nevers: −9,78 °C/km). Dasar diagnosis super/sub-adiabatik."
  },
  "salr": {
    term: "SALR",
    en: "saturated adiabatic lapse rate",
    def: "Lapse rate parcel jenuh dengan pelepasan laten: Γ_s ≈4–7 K/km (makin kecil di udara hangat tropis); bukan konstan, fungsi T & p."
  },
  "elr": {
    term: "ELR",
    en: "environmental lapse rate",
    def: "Lapse rate lingkungan Γ = −dT/dz hasil pengukuran (radiosonde). Atmosfer standar 6,49 °C/km (≈66% DALR)."
  },
  "theta": {
    term: "Temperatur potensial θ",
    en: "potential temperature",
    def: "θ = T(p₀/p)^{R/cₚ} dengan p₀=1000 hPa, R/cₚ≈0,286; konservatif adiabatik: ∂θ/∂z>0 stabil, =0 netral, <0 tidak stabil."
  },
  "pasquill": {
    term: "Pasquill–Gifford A–F",
    en: "Pasquill–Gifford",
    def: "Klasifikasi stabilitas untuk model Gaussian: A sangat tidak stabil → F sangat stabil (kadang G). Ditentukan angin 10 m + insolasi siang / awan malam; D untuk overcast."
  },
  "inversi-radiasi": {
    term: "Inversi radiasi",
    en: "radiation inversion",
    def: "Pendinginan permukaan malam cerah angin lemah; memerangkap kabut di lembah (Donora 1948, Central Valley). Memantuli matahari → tahan lama."
  },
  "inversi-subsidensi": {
    term: "Inversi subsidensi",
    en: "subsidence inversion",
    def: "Udara turun dalam antisiklon, kompresi adiabatik memanaskan lapisan atas; persisten berhari-hari; basis smog Los Angeles."
  },
  "inversi-adveksi": {
    term: "Inversi adveksi",
    en: "advection inversion",
    def: "Angin laut dingin menyusup di bawah udara hangat, atau foehn lee-pegungan; relevan pesisir dan timur Rocky Mountains."
  },
  "inversi-frontal": {
    term: "Inversi frontal",
    en: "frontal inversion",
    def: "Udara hangat mengalir di atas udara dingin pada bidang front sinoptik; khas musim dingin lintang sedang."
  },
  "plume-looping": {
    term: "Looping",
    en: "looping plume",
    def: "Superadiabatik A–B siang terik: plume berkelok naik-turun konvektif; menyentuh tanah dekat sumber sesaat."
  },
  "plume-fanning": {
    term: "Fanning",
    en: "fanning plume",
    def: "Sangat stabil/inversi F malam: plume pipih horizontal, pengenceran vertikal minimal; jangkau jauh utuh."
  },
  "fumigation": {
    term: "Fumigation",
    en: "fumigation",
    def: "Inversi radiasi pagi diruntuhkan dari bawah oleh konveksi; plume terjebak teraduk ke tanah → lonjakan sesaat; varian pesisir (sea-breeze fanning→fumigation di darat)."
  },
  "mixing-height": {
    term: "Mixing height H",
    en: "mixing height",
    def: "Ketinggian pencampuran vertikal kuat; batas atas dispersi; tumbuh siang (puncak awan kumulus) → identik PBL."
  },
  "vc": {
    term: "VC (ventilation coefficient)",
    en: "ventilation coefficient",
    def: "VC = H·ū (m²/s); <±6.000 = potensi pencemaran tinggi (Portelli & Lewis); Beijing musim semi 3.940±2.110."
  },
  "power-law": {
    term: "Power law angin",
    en: "power-law wind profile",
    def: "u(z)=u₁(z/z₁)^p dengan p≈1/7 netral terbuka hingga 0,4–0,6 sangat stabil/kota; masukkan plume rise Bab 7."
  },
  "wind-rose": {
    term: "Mawar angin",
    en: "wind rose",
    def: "Ringkasan frekuensi arah–kecepatan angin; format sama dipakai sebagai pollution rose diagnosis arah sumber."
  },
  "monsun": {
    term: "Monsun Asia–Australia",
    en: "Asian–Australian monsoon",
    def: "Monsoon barat (Okt–Apr, hujan) dari Asia vs timur (Apr–Okt, kemarau) dari Australia; musim kemarau = puncak polusi & karhutla."
  },
  "enso-iod": {
    term: "ENSO & IOD",
    en: "ENSO & IOD",
    def: "Osilasi Pasifik & Dipole Hindia; El Niño+IOD positif → kemarau panjang & karhutla (2023 IOD+, El Niño moderat, 23.451 ha gagal panen)."
  },
  "stagnasi": {
    term: "Stagnasi udara",
    en: "air stagnation",
    def: "Massa udara stasioner ≥4 hari (de Nevers); proyeksi Horton 2014: +40 hari/tahun di tropis/subtropis pada akhir abad (≈55% populasi)."
  },
  "uhi": {
    term: "UHI",
    en: "urban heat island",
    def: "Kota 1–7 °F (0,6–3,9 °C) siang, 2–5 °F (1,1–2,8 °C) malam lebih hangat vs sekitarnya (US EPA); permukaan 10–15 °C; melemahkan inversi nokturnal."
  }
};

APP_DATA.CHAPTERS = [
  { n: 1, title: "Sejarah Pencemaran Udara", href: "bab-1.html", current: false },
  { n: 2, title: "Konsep Dasar Penyebab Terjadinya Pencemaran Udara", href: "bab-2.html", current: false },
  { n: 3, title: "Sumber Pencemaran Udara", href: "bab-3.html", current: false },
  { n: 4, title: "Parameter Pencemaran Udara dan Pemantauan", href: "bab-4.html", current: false },
  { n: 5, title: "Dampak Pencemaran Udara", href: "bab-5.html", current: false },
  { n: 6, title: "Meteorologi dan Termodinamika Atmosfer", href: "#top", current: true },
  { n: 7, title: "Pemodelan Pencemaran Udara", href: "bab-7.html" },
  { n: 8, title: "Peraturan dan Standar Pencemaran Udara", href: "bab-8.html" },
  { n: 9, title: "Teknologi Pengendalian Pencemaran Udara", href: "bab-9.html" },
  { n: 10, title: "Studi Kasus Pencemaran Udara", href: "bab-10.html" }
];

APP_DATA.KEYWORDS = [
  { t: "C ≈ Q/(u·H) & stagnasi", to: "#peran" },
  { t: "PBL / mixing height", to: "#struktur" },
  { t: "DALR 9,8 K/km", to: "#termodinamika" },
  { t: "θ & persamaan Poisson", to: "#termodinamika" },
  { t: "Pasquill–Gifford A–F", to: "#stabilitas" },
  { t: "Inversi radiasi/subsidensi", to: "#inversi" },
  { t: "Plume looping/fanning/fumigation", to: "#plume" },
  { t: "VC = H·u (6.000)", to: "#mixing" },
  { t: "Power law 1/7", to: "#angin" },
  { t: "Monsun & ENSO/IOD", to: "#tropis" },
  { t: "Karhutla 2023 1,1 jt ha", to: "#terkini" },
  { t: "Stagnasi +40 hari", to: "#terkini" },
  { t: "UHI 1–7 °F", to: "#lokal" },
  { t: "Mawar angin", to: "#angin" }
];

APP_DATA.PASQUILL = {
  table: [
    { wind: "<2", strong: "A", medium: "A–B", weak: "B", nightCloudy: "—", nightClear: "F" },
    { wind: "2–3", strong: "A–B", medium: "B", weak: "C", nightCloudy: "E", nightClear: "F" },
    { wind: "3–5", strong: "B", medium: "B–C", weak: "C", nightCloudy: "D", nightClear: "E" },
    { wind: "5–6", strong: "C", medium: "C–D", weak: "D", nightCloudy: "D", nightClear: "D" },
    { wind: ">6", strong: "C", medium: "D", weak: "D", nightCloudy: "D", nightClear: "D" }
  ],
  caption: "Tabel 6.1 — Kelas Pasquill–Gifford berdasar angin 10 m, insolasi, dan awan malam. D untuk overcast (siang/malam). Sumber: Pasquill 1961, NOAA READY."
};

APP_DATA.CHART_VC = {
  labels: ["Beijing semi", "Beijing panas", "Beijing gugur", "Ambang 6.000", "Siang konvektif 1.500×4", "Dini hari 200×1,5"],
  data: [3940, 2953, 2580, 6000, 6000, 300],
  caption: "Grafik 6.1 — Ventilation coefficient VC (m²/s): Beijing musiman (Tang et al. 2019) vs ambang Portelli & Lewis 6.000 dan dua skenario contoh 6.2 (siang konvektif vs dini hari)."
};

APP_DATA.CHART_KARHUTLA_ENSO = {
  labels: ["2015 (El Niño kuat)", "2019", "2023 (El Niño+IOD+)", "2025 proy. (↓69%)"],
  data: [2.6, 1.6, 1.1, 0.34],
  caption: "Grafik 6.2 — Luas terbakar nasional (juta ha, SiPongi KLHK) vs fase ENSO/IOD: 2023 El Niño lima-terkuat + IOD positif → 1,1 juta ha; 2025 turun 69% (verifikasi silang)."
};

APP_DATA.QUIZ = [
  {
    q: "Persamaan penurunan DALR Γ_d = g/cₚ ≈9,8 K/km diperoleh dari kombinasi…",
    options: ["Hukum gas ideal + hidrostatik + Hukum I adiabatik (dq=0)", "Hanya persamaan hidrostatik", "Hukum II Newton saja", "Persamaan Poisson saja"],
    answer: 0,
    pembahasan: "cₚ dT = −g dz dari Hukum I adiabatik & hidrostatik; Γ_d = g/cₚ; dengan Cₚ≈3,5R untuk udara diatomik. θ konservatif: θ = T(p₀/p)^{R/cₚ}."
  },
  {
    q: "Radiosonde: T₀=20 °C (0 m), T500=12 °C. Klasifikasi stabilitas?",
    options: ["Superadiabatik, tidak stabil (ELR 16 > 9,8)", "Netral", "Stabil", "Inversi"],
    answer: 0,
    pembahasan: "ELR = (20−12)/0,5=16 K/km > Γ_d → superadiabatik, tidak stabil; θ500≈289,4 K <293,15 K → ∂θ/∂z<0 konsisten tidak stabil (Contoh 6.1)."
  },
  {
    q: "Pasquill: angin 1,5 m/s, siang terik, cerah. Kelas?",
    options: ["D netral", "E stabil", "A sangat tidak stabil", "F sangat stabil"],
    answer: 2,
    pembahasan: "Tabel 6.1: <2 m/s + insolasi kuat → A (extremely unstable); malam cerah angin lemah → F."
  },
  {
    q: "Plume yang pipih mendatar seperti kipas dengan dispersi vertikal minimal adalah…",
    options: ["Looping (A–B)", "Coning (D)", "Fanning (E–F, inversi)", "Fumigation (pagi)"],
    answer: 2,
    pembahasan: "Fanning = sangat stabil/inversi, dispersi vertikal terhambat, plume utuh jauh; lofting = stabil di bawah plume (paling baik), fumigation = inversi diruntuhkan pagi → lonjakan sesaat."
  },
  {
    q: "Siang konvektif H=1500 m, ū=4 m/s → VC; dini hari H=200 m, ū=1,5 m/s → VC; interpretasi?",
    options: ["6000 ambang vs 300 sangat tinggi potensi pencemaran (Contoh 6.2)", "300 vs 6000", "Keduanya aman", "Keduanya kritis"],
    answer: 0,
    pembahasan: "VC = H·ū → 6000 (tepat ambang) vs 300 (<<6000) → dini hari potensi penumpukan CO/PM sumber permukaan sangat tinggi."
  },
  {
    q: "Monsun & ENSO: musim kemarau Indonesia dikaitkan dengan…",
    options: ["Monsun Asia barat (hujan)", "Monsun Australia timur (kering) + El Niño & IOD positif yang memindahkan konveksi menjauh (2023: 23.451 ha kekeringan)", "La Niña saja", "Monsun tidak berpengaruh"],
    answer: 1,
    pembahasan: "Monsun Australia (Apr–Okt) kering = kemarau = puncak polusi/washout hilang; 2023 El Niño+IOD+ → kemarau panjang, hanya 73/178 ZOM hujan Okt."
  }
];

APP_DATA.DISKUSI = [
  { q: "Turunkan Γ_d = g/cₚ dan hitung untuk CO₂ murni (cₚ≈840 J/kg·K). Bandingkan dengan Mars (g≈3,7, CO₂ dominan) dan jelaskan mengapa parcel Mars lebih sulit naik.", h: "Gunakan cₚ dT = −g dz; g/cₚ Mars ≈4,4 K/km (lebih kecil dari Bumi) → tetapi skala tinggi berbeda; diskusikan stabilitas & PBL yang lebih dalam." },
  { q: "Sounding: T 26 °C (0 m), 27,5 °C (300 m), 24 °C (600 m). Tentukan stabilitas tiap lapisan, sketsakan T & θ, dan prediksite plume 250 m vs 500 m.", h: "0–300 m inversi (Γ<0) → stabil ekstrem; 300–600 m ELR (3,5/0,3≈11,7) superadiabatik → tidak stabil; plume 250 m fanning/trapping, 500 m looping/coning (lintas kelas) + θ untuk konfirmasi." },
  { q: "Dengan data soal 2 & ū=2 m/s, hitung VC tiap lapisan dan nilai potensi. Bandingkan dengan Beijing musiman (2.580–3.940) dan ambang 6.000.", h: "VC lapisan bawah tipis (<300 m) → VC sangat kecil; bandingkan Beijing <6.000 konsisten polusi berulang; diskusikan ketersediaan data BMKG." },
  { q: "u₁₀=2,5 m/s terbuka netral (p=1/7) hitung u60 & u200, lalu ulang p=0,35 (kota stabil). Diskusikan desain tinggi cerobong efektif dan plume rise Bab 7.", h: "Power law: 60 m ≈3,3 vs 4,0 m/s; 200 m ≈3,7 vs 6,1 m/s; p besar meremehkan gesekan kota dan melebihkan dispersi bila salah pilih." },
  { q: "Uji korelasi hotspot SiPongi vs ONI 2015–2025. Jelaskan rantai El Niño+IOD→kemarau→karhutla→PM2,5 dan bedakan korelasi vs kausalitas.", h: "Mekanisme: IOD+ & El Niño geser konveksi menjauh → hujan ↓ → lahan kering → titik api; gunakan tabel SiPongi per bulan & ONI NOAA; korelasi mendukung tetapi bukti kausal butuh proses fisik." },
  { q: "Proyeksi Horton +40 hari stagnasi tropis pada akhir abad: diskusikan implikasi kapasitas asimilasi Indonesia vs regulasi PP 22/2021 yang statis.", h: "Stagnasi = inversi + angin lemah; tropis/subtropis terancam; regulasi statis perlu sistem peringatan dini & jadwal operasi berbasis cuaca seperti ISPU." }
];

APP_DATA.LATIHAN = [
  { t: "Turunkan persamaan Poisson T·p^{−κ}=konstan (κ=2/7) dari Hukum I adiabatik dan gas ideal, lalu hitung Γ_d untuk atmosfer hidrogen (cₚ≈14.300 J/kg·K) vs Bumi — relevansi untuk eksoplanet.", tag: "Turunan" },
  { t: "Buat profil T(z) dan θ(z) untuk sounding 3 titik soal diskusi 2; tandai inversi, superadiabatik, dan prediksi lofting vs fumigation untuk cerobong 100 m dan 400 m.", tag: "Diagnosis" },
  { t: "Kumpulkan data radiosonde BMKG terdekat; hitung H dari titik belok θ dan ELR, lalu VC harian selama 7 hari; bandingkan dengan data ceilometer jika tersedia dan tandai jam fumigation pagi.", tag: "Observasi" },
  { t: "Hitung u(z) untuk z=10, 50, 150, 300 m dengan power law p=0,14 vs log law (z₀=0,03 m terbuka vs 1,5 m kota, u*=0,3 m/s). Plot dan diskusikan kapan log law lebih tepat (lapisan permukaan).", tag: "Profil angin" },
  { t: "Petakan siklus monsun–ENSO–IOD: unduh data IOD DMI & ONI 2015–2025, selaraskan dengan kalender musim hujan/kemarau BMKG dan SiPongi; jelaskan anomali 2023 (73/178 ZOM hujan Okt).", tag: "Synoptik tropis" },
  { t: "Evaluasi UHI kota Anda: bandingkan suhu permukaan/udara siang–malam dengan desa sekitar (EPA 1–7 °F siang, 2–5 °F malam); kaitkan dengan stabilitas nokturnal, country breeze, dan laju fotokimia O₃.", tag: "Mikroiklim" }
];

APP_DATA.PUSTAKA = [
  { group: "Buku & termodinamika", items: [
    "de Nevers, N. Air Pollution Control Engineering, ed. 2, Bab 5 Meteorology for Air Pollution Control Engineers.",
    "de Nevers & Cooper — Outline Pencemaran Udara S1 TL (rangkuman de Nevers).",
    "Seinfeld, J.H. & Pandis, S.N. Atmospheric Chemistry and Physics, ed. 3 (SALR detail, dispersi).",
    "NOAA READY — Pasquill Stability Classes (angin–insolasi–awan).",
    "US EPA — Selection Criteria for Mathematical Models (Pasquill 1961/1962)."
  ] },
  { group: "Data & regulasi Indonesia", items: [
    "PP No. 22 Tahun 2021 Lampiran VII — Baku Mutu Udara Ambien (25 °C, 1 atm).",
    "KLHK SiPongi (2026): luas karhutla 2023 ±1,1 juta ha; 2025 turun 69% (verifikasi silang).",
    "BMKG — Climate Outlook 2024, Siaran pers monsun, peringatan El Niño+IOD 2023, Q3-2023 kekeringan (23.451 ha kekeringan), prospek El Niño 2026.",
    "US EPA — Urban Heat Island compendium (1–7 °F siang, 2–5 °F malam; permukaan 10–15 °C).",
    "Portelli & Lewis (1987) ambang VC <6.000 m²/s; Tang et al. 2019 ACP 19:9531 VC Beijing."
  ] },
  { group: "Topikal & proyeksi", items: [
    "WMO/UN News (2026): El Niño 2023–24 lima-terkuat; prospek El Niño 2026 (WMO 80%, NOAA 60%).",
    "Horton, D.E. et al. (2014) Nat. Clim. Change 4:698–703 & Horton 2012: proyeksi stagnasi +40 hari/tahun tropis, 12–25% lintang sedang.",
    "Jiang et al. 2025 Commun. Earth Environ.: GMST 2023–24 +1,58 °C; WRI/GEM PLTU captive.",
    "Survei ENSO–IOD vs SST (Ullum 2024, Asyam 2024, Mulyanti 2015); BMKG ENSO Q3-2023."
  ] }
];
