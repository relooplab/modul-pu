/**
 * data-bab9.js — Bab 9 Teknologi Pengendalian Pencemaran Udara.
 * Sumber: "Bab 9 — Teknologi Pengendalian Pencemaran Udara.md" (284 baris)
 * + "BAB_9_Teknologi_Pengendalian_Pencemaran_Udara.md" (303 baris)
 * Landasan de Nevers Bab 8-12 + US EPA Cost Manual + Permen LHK.
 */
window.APP_DATA = {};

APP_DATA.OBJECTIVES = [
  "Memilih hirarki pengendalian yang tepat dengan mempertimbangkan residu sekunder dan biaya siklus hidup.",
  "Menghitung besaran dasar pengendalian partikulat, meliputi distribusi ukuran, kecepatan pengendapan, diameter aerodinamik, efisiensi, penetrasi, dan persamaan Deutsch–Anderson.",
  "Menjelaskan prinsip, keunggulan, dan keterbatasan kolektor PM (gravity settler, siklon, ESP, baghouse, venturi scrubber) serta kriteria pemilihannya.",
  "Menjelaskan pengendalian SOx (wet limestone FGD → gipsum, semi-kering, seawater FGD, coal blending) dan NOx (LNB, FGR, staged, SCR vs SNCR) beserta komprominya.",
  "Menjelaskan pengendalian VOC (kondensasi, adsorpsi karbon aktif, absorpsi, oksidasi termal/katalitik, biofiltrasi) berdasar konsentrasi dan nilai produk.",
  "Menjelaskan pengendalian sumber bergerak (TWC stoikiometri, DOC+DPF regenerasi, Euro 4 50 ppm S) dan keterkaitan bahan bakar–teknologi–standar.",
  "Membaca baku mutu emisi dan data CEMS dengan basis satuan yang benar, termasuk perbedaan kondisi aktual dan normal, basis kering atau basah, serta koreksi O₂.",
  "Menilai penerapan teknologi pengendalian pada PLTU Indonesia secara kritis berdasarkan data primer."
];

APP_DATA.GLOSSARY = {
  "hirarki": {
    term: "Hirarki pengendalian",
    en: "control hierarchy",
    def: "Pencegahan (source reduction) → recovery/daur ulang → end-of-pipe → dispersi; cerobong tinggi hanya mengencerkan, tidak mengurangi beban."
  },
  "efisiensi": {
    term: "Efisiensi η & penetrasi P",
    en: "collection efficiency & penetration",
    def: "η=1−C_out/C_in, P=1−η=C_out/C_in; rangkaian: P_total=P₁P₂…, η_total=1−P_total; 99% tidak dijumlah menjadi 180%."
  },
  "nines": {
    term: "Nines",
    en: "nines",
    def: "Orde penetrasi: 90%=10⁻¹, 99%=10⁻² (two nines), 99,9%=10⁻³, 99,99%=10⁻⁴; naik satu nine = potong sisa 1/10, biaya naik eksponensial."
  },
  "deutsch": {
    term: "Deutsch–Anderson",
    en: "Deutsch–Anderson",
    def: "η=1−exp(−wA/Q) untuk ESP/gravity/siklon ideal (campur sempurna); w=kecepatan drift/migrasi, A=luas kolektor; modifikasi P=exp[−(wA/Q)^k] k≈0,5 untuk halus."
  },
  "stokes": {
    term: "Hukum Stokes",
    en: "Stokes' law",
    def: "V_t = g d²(ρ_p−ρ_g)/(18μ) (Re_p<1, sferis); V_t∝d² — setengah diameter = 1/4 kecepatan; untuk kecil perlu C_c slip correction."
  },
  "diameter-aerodinamik": {
    term: "Diameter aerodinamik",
    en: "aerodynamic diameter",
    def: "d_a≈d_p√(ρ_pχ/ρ₀) setara silica 1000 kg/m³; dasar PM10/PM2,5 dan D_cut (50% efisiensi)."
  },
  "esp": {
    term: "ESP",
    en: "electrostatic precipitator",
    def: "Muatan korona 30–70 kV → migrasi ke pelat → rapping ke hopper; pressure drop rendah; sensitif resistivitas abu & back corona."
  },
  "baghouse": {
    term: "Baghouse",
    en: "fabric filter / baghouse",
    def: "Penyaringan kain + dust cake; >99% hingga submikron, tak sensitif resistivitas; terbatas suhu kain <290°C, ΔP tinggi, air-to-cloth ratio."
  },
  "venturi": {
    term: "Venturi scrubber",
    en: "venturi scrubber",
    def: "Tumbukan droplet untuk halus via kecepatan relatif tinggi; ΔP sangat tinggi (boros), hasil slurry; cocok gas panas/lengket + gas asam serentak."
  },
  "fgd": {
    term: "FGD basah batu kapur",
    en: "wet limestone FGD",
    def: "SO₂+CaCO₃+½O₂+2H₂O→CaSO₄·2H₂O+CO₂; >90% mungkin, produk gipsum; konsumsi air/listrik & purge liquor."
  },
  "seawater-fgd": {
    term: "Seawater FGD",
    en: "seawater FGD",
    def: "Alkalinitas laut serap SO₂ pesisir; kasus Indonesia 36–43% aktual vs >90% potensi desain; isu aerasi, pH, biofouling."
  },
  "lnb": {
    term: "Low-NOx burner & staging",
    en: "LNB / staged combustion",
    def: "Turunkan puncak T & O₂ lokal: pencampuran fuel-rich, over-fire air, FGR; puluhan % murah, terbatas."
  },
  "scr": {
    term: "SCR vs SNCR",
    en: "SCR / SNCR",
    def: "SCR: NH₃/urea pada katalis 300–400°C → N₂ (80–90%+); SNCR tanpa katalis 850–1100°C jendela sempit, lebih murah kurang efisien; risiko ammonia slip."
  },
  "twc": {
    term: "TWC",
    en: "three-way catalyst",
    def: "Bensin stoikiometrik + sensor λ: oksidasi CO/HC & reduksi NOx simultan pada Pt/Pd/Rh; butuh bebas Pb & sulfur rendah."
  },
  "dpf": {
    term: "DPF & DOC",
    en: "DPF / DOC",
    def: "Diesel lean: DOC u/CO/HC + DPF sarang tawon pori tangkap jelaga → regenerasi pasif (NO₂ 300–400°C) / aktif (fuel); ~99% PM bila terawat."
  },
  "cems": {
    term: "CEMS & SISPEK",
    en: "CEMS & SISPEK",
    def: "CEMS ukur SO₂/NOx/partikulat/O₂ dsb. kontinyu; Permen 13/2021 wajib integrasi real-time per jam (5-menit) via JSON/API ke SISPEK + audit CGA/RCA/RATA."
  },
  "o2-correction": {
    term: "Koreksi O₂",
    en: "O₂ correction",
    def: "C_ref=C_ukur·(20,9−O₂ref)/(20,9−O₂ukur) (basis kering konsisten); O₂ref mis. 7% padat/3% gas; cegah pengenceran tampak turun emisi."
  },
  "hg": {
    term: "Merkuri PLTU",
    en: "mercury co-benefit",
    def: "BME Hg 0,03 mg/Nm³ untuk baru (Minamata); sebagian Hg tertangkap ESP+FGD sebagai co-benefit; perlu ACI bila perlu."
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
  { n: 9, title: "Teknologi Pengendalian Pencemaran Udara", href: "#top", current: true },
  { n: 10, title: "Studi Kasus Pencemaran Udara", href: "bab-10.html" }
];

APP_DATA.KEYWORDS = [
  { t: "Hirarki: pencegahan→dispersi", to: "#hirarki" },
  { t: "η, P & nines", to: "#dasar" },
  { t: "Stokes V_t∝d²", to: "#sifat" },
  { t: "Deutsch–Anderson wA/Q", to: "#partikulat" },
  { t: "ESP vs baghouse vs venturi", to: "#partikulat" },
  { t: "FGD gipsum & seawater 36–43%", to: "#sox" },
  { t: "LNB/FGR vs SCR/SNCR", to: "#nox" },
  { t: "Adsorpsi vs oksidasi VOC", to: "#voc" },
  { t: "TWC & DPF + Euro 4 50ppm", to: "#bergerak" },
  { t: "CEMS→SISPEK & CGA/RATA", to: "#cems" },
  { t: "BME 550 vs 50/35/10", to: "#terkini" },
  { t: "Co-firing 47 PLTU & CCS", to: "#terkini" },
  { t: "Koreksi O₂ & W_fan", to: "#dasar" },
  { t: "Hg 0,03 co-benefit", to: "#terkini" }
];

APP_DATA.CHART_BME = {
  labels: ["SO₂", "NOx", "PM"],
  indoOld: [550, 550, 100],
  indoNew: [200, 200, 50],
  china: [50, 35, 10],
  caption: "Grafik 9.1 — BME PLTU (mg/Nm³): Indonesia Kat.1 (lama) vs baru vs Tiongkok ultra-rendah 2020. Kritik: lama 3–15× longgar (SO₂/NOx) & 5–20× (PM)."
};

APP_DATA.CHART_COFIRING = {
  labels: ["2023 (47 PLTU)", "2024 (47 PLTU/52 lok)"],
  mwh: [1.04, 1.67],
  co2: [null, 1.87],
  caption: "Grafik 9.2 — Co-firing biomassa PLN: energi hijau 2023 1,04 (derivasi dari 1,67/1,6) dan 2024 1,67 juta MWh; penurunan CO₂ 2024 1,87 juta ton (2023 tak dilaporkan). Target 2025 dinyatakan sebagai kebutuhan biomassa 10,2 Mt (satuan berbeda, tak diplot). Kontribusi 2024 baru 1,86% bauran EBT."
};

APP_DATA.QUIZ = [
  {
    q: "Urutan hirarki pengendalian yang benar menurut de Nevers adalah…",
    options: ["Dispersi → ESP → pencegahan", "Pencegahan/source reduction → recovery → end-of-pipe → dispersi (cerobong hanya pengencer)", "Recovery dulu lalu pencegahan", "Hanya end-of-pipe"],
    answer: 1,
    pembahasan: "Pencegahan (ganti bahan bakar rendah S) paling efektif & bernilai; dispersi terakhir karena hanya menurunkan C tanpa kurangi beban; contoh soda ash/jelaga memberi insentif recovery 1863–1970."
  },
  {
    q: "Pernyataan nines yang benar adalah…",
    options: ["99% ke 99,9% tidak ubah penetrasi", "Naik satu nine potong sisa 1/10; seri 90%+90%=99% (bukan 180%) karena P_total=P₁P₂", "Menjumlahkan efisiensi seri 90+90=180", "99% = 10⁻³"],
    answer: 1,
    pembahasan: "P=1−η; 90%=10⁻¹,99%=10⁻²,99,9%=10⁻³; seri: P_total=0,1×0,1=0,01→η=99%; ESP 90→99 butuh gandakan A (ln0,01/ln0,1=2)."
  },
  {
    q: "Implikasi hukum Stokes V_t=g d²(ρ_p−ρ_g)/(18μ) bagi PM2,5 adalah…",
    options: ["PM2,5 lebih mudah mengendap gravitasi", "V_t∝d² → setengah diameter = 1/4 V_t; PM halus sulit ditangkap gravity settler/siklon — perlu ESP/baghouse/venturi", "Semua partikel sama mudah ditangkap", "Hukum Stokes berlaku untuk Re_p besar"],
    answer: 1,
    pembahasan: "Gravity settler hanya >40–50 µm; siklon d_cut 5–10 µm; halus perlu drift elektrostatik, filtrasi cake, atau Venturi ΔP tinggi; partikel sferis kecil Re_p<1, perlu C_c untuk halus."
  },
  {
    q: "Persamaan Deutsch–Anderson dan ilustrasi nines untuk ESP adalah…",
    options: ["η=1−exp(−wA/Q); 90→99 butuh 2× luas, 90→99,9 3×, 90→99,99 4×; k≈0,5 modifikasi untuk halus", "η=Q·ΔP", "η=1−C_out/C_in saja tanpa model", "ESP tak peduli resistivitas"],
    answer: 0,
    pembahasan: "η=1−exp(−wA/Q); biaya ∝A; w∝d sehingga halus makin sulit; resistivitas tinggi/rendah, back corona, re-entrainment mengganggu; modifikasi k≈0,5."
  },
  {
    q: "Perbandingan pengendalian SOx/NOx yang tepat adalah…",
    options: ["SO₂ hanya LNB", "FGD basah CaCO₃+½O₂→gipsum >90% vs seawater 36–43% aktual vs kering; NOx: LNB/FGR/staging (puluhan %) murah lalu SCR 80–90% (300–400°C) vs SNCR 850–1100°C jendela sempit", "SCR untuk SO₂", "FGD untuk NOx"],
    answer: 1,
    pembahasan: "SO₂ pra-pembakaran coal blending vs scrub: wet limestone paling tinggi tetapi boros air/listrik; seawater alkalinitas laut. NOx thermal sensitif T; SCR mahal perlu katalis & kontrol ammonia slip."
  },
  {
    q: "Pernyataan TWC/DPF & CEMS yang benar adalah…",
    options: ["TWC diesel stoikiometrik; DPF bensin", "TWC bensin stoikiometrik+sensor λ (Pt/Pd/Rh) oksidasi CO/HC + reduksi NOx; diesel lean pakai DOC+DPF regenerasi (NO₂ 300–400°C) ~99% PM; Euro 4 50 ppm S & CEMS→SISPEK 5-menit per jam + audit CGA/RCA/RATA", "DPF tak perlu regenerasi", "CEMS hanya tahunan"],
    answer: 1,
    pembahasan: "TWC gagal bila sulfur racuni; DPF tanpa sulfur rendah cepat poison; Permen 13/2021: SISPEK real-time JSON/API, 1 jam sebelumnya per jam, downtime harus flag, bukan nol."
  }
];

APP_DATA.DISKUSI = [
  { q: "Evaluasi hirarki untuk PLTU: kapan coal blending lebih tepat daripada FGD basah, dan kapan scrubber harus tetap dipasang? Kaitkan dengan Suralaya ESP+blending tanpa FGD penuh.", h: "Blending murah untuk S rendah–sedang, terbatas pasokan/harga & slagging; FGD wajib bila target >90% atau batu bara tinggi S; Suralaya PM<60/100 tanpa FGD penuh—SC S masih terbatas." },
  { q: "Dari Deutsch–Anderson, jelaskan mengapa ESP yang sudah 99% sulit ke 99,9% khususnya untuk fraksi PM2,5. Peran w(d) dan modifikasi k≈0,5?", h: "Besar tertangkap dulu (w besar), sisa halus w kecil → P tidak turun eksponensial murni; k≈0,5 menangkap ekor halus; biaya A naik linear dengan nines." },
  { q: "Sikon memilih baghouse vs ESP untuk semen/debu abrasif panas. Data apa wajib sebelum memutuskan (selain η total)?", h: "Distribusi ukuran, resistivitas/kelekatan, titik embun, T, kelembapan, kadar air/gas asam, beban bervariasi → D_cut, air-to-cloth, ΔP, korosi, kebakaran." },
  { q: "Bandingkan wet limestone (gipsum) vs seawater vs spray dryer: kapan seawater masuk akal di Indonesia pesisir dan apa isu effluent-nya?", h: "Seawater butuh alkalinitas & pasokan laut cukup, aerasi effluent pH/biofouling; kasus 36–43% vs potensi >90% → kondisi operasi." },
  { q: "Staged combustion menurunkan NOx tetapi menaikkan CO/LOI. Rancang kompromi operasi untuk boiler dan kriteria memilih SCR vs SNCR.", h: "Staging berlebihan → CO/unburned; pilih SCR bila perlu 80–90% & T jendela 300–400°C ada; SNCR bila ruang sempit & target moderate; kontrol slip & deposit." },
  { q: "Data CEMS menunjukkan SO₂ turun setelah pengenceran udara. Jelaskan koreksi O₂ dan mengapa konsentrasi tanpa basis menyesatkan.", h: "C_ref=C_ukur·(20,9−O₂ref)/(20,9−O₂ukur) (basis kering konsisten); pengenceran tampak turun konsentrasi tetapi beban g/s tetap; audit RATA cek kebenaran." }
];

APP_DATA.LATIHAN = [
  { t: "Gas buang 50 m³/s mengandung PM 1,0 g/m³. Baghouse keluar 0,010 g/m³ pada basis sama. Hitung η, P, nines, dan laju massa keluar (g/s & ton/tahun).", tag: "Efisiensi" },
  { t: "ESP olah 120 m³/s, w=0,08 m/s. Hitung A ideal untuk target 99% via Deutsch–Anderson; berikan 3 alasan lapangan menyimpang (resistivitas, re-entrainment, distribusi).", tag: "Deutsch" },
  { t: "Terangkan perbedaan gravity settler, siklon, ESP, baghouse, venturi untuk debu semen panas via tabel d_cut, suhu, ΔP, dan posisi umum.", tag: "Seleksi" },
  { t: "CEMS baca SO₂ 480 mg/Nm³ pada O₂ ukur 9% (kering). Koreksi ke O₂ref 6% dan bandingkan dengan BME Kat.1 550 vs ketat 200; diskusikan beban vs konsentrasi (Bab 7).", tag: "O₂" },
  { t: "Susun matriks PLTU hipotetik: PM (ESP/baghouse), SO₂ (FGD/blending/seawater), NOx (LNB/SCR), Hg (ESP+FGD+ACI), CO₂, air, residu, energi parasitik, biaya siklus hidup.", tag: "Matriks" },
  { t: "Audit co-firing 47 PLTU 1,67 juta MWh/47 lok (2024): hitung kontribusi % terhadap bauran EBT 1,86% dan nilai apakah co-firing mengganti kebutuhan FGD/SCR.", tag: "Co-firing" }
];

APP_DATA.PUSTAKA = [
  { group: "Buku & teori", items: [
    "de Nevers, N. Air Pollution Control Engineering, ed.2 Bab 7 (proses/pembakaran), Bab 8 (sifat partikulat), Bab 9 (partikulat), Bab 10 (VOC), Bab 11 (SOx), Bab 12 (NOx).",
    "US EPA Air Pollution Control Cost Manual, ed.6 (ESP, baghouse, scrubber, FGD, SCR).",
    "Seinfeld & Pandis — fase aerosol, kimia sekunder (SALR konteks)."
  ] },
  { group: "Regulasi Indonesia", items: [
    "Permen LHK P.15/2019 (5 Apr 2019) PLTU termal: SO2/NOx partikulat + CEMS; Kat.1 vs baru 200/50/0,03 Hg.",
    "Permen LHK 13/2021 SISPEK: real-time 5-menit per jam via JSON/API, registrasi-verifikasi-konektivitas + audit CGA/RCA/RATA.",
    "Permen P.20/2017 Euro 4 (Okt 2018 bensin, Apr 2021 diesel 50 ppm S: RON91/CN51) + Permen 8/2023 uji emisi.",
    "Kemen ESDM siaran pers No.412.Pers/04/SJI/2023 PLTU Suralaya (3.400 MW, 35 rb ton/hari, ESP, PM<60/100)."
  ] },
  { group: "Topikal & data lapangan", items: [
    "Kajian BME kritis: Greenpeace (550 vs CN/JP/KR 3–15×), Lensa Lingkungan, Antara, Kompas, Mongabay standar ganda PLTU Jawa 9&10.",
    "NELTI seawater FGD 36–43% (87–103→56–58); CICA US EPA FGD 50–98% gipsum; COSTING FGD gipsum komersialisasi.",
    "PLN co-firing 47 PLTU 1,67 juta MWh 2024, 1,87 Mt CO₂, target 52 PLTU 10,2 Mt/tahun; CCS 15 proyek target <2030, Permen ESDM 2/2023, potensi 4,85/572 Gt.",
    "AECC TWC & DieselNet DPF; GAIKINDO Euro 4 jabaran."
  ] }
];
