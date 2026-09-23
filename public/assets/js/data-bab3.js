/**
 * data-bab3.js — semua konten editable Bab 3: Sumber Pencemaran Udara.
 * Sumber: "BAB 3 — Sumber Pencemaran Udara.md" dan
 * "BAB_3_Sumber_Pencemaran_Udara_draft.md" (Draft v1, Agustus 2026)
 * dengan anotasi [Fakta]/[Regulasi]/[Model]/[Analisis].
 */
window.APP_DATA = {};

APP_DATA.OBJECTIVES = [
  "Mengklasifikasikan sumber pencemaran udara menurut asal, geometri, dan pola waktunya, lalu mengaitkannya dengan pilihan model dispersi yang sesuai.",
  "Mengidentifikasi sumber tidak bergerak, sumber bergerak, sumber area/difus, dan sumber alami yang dominan di Indonesia beserta karakteristik emisinya.",
  "Menyusun inventarisasi emisi sederhana dengan persamaan E = A × EF menggunakan faktor emisi AP-42 atau EMEP/EEA, serta menjelaskan sumber ketidakpastiannya.",
  "Menganalisis perkembangan sumber emisi terkini, termasuk elektrifikasi transportasi, co-firing biomassa di PLTU, emisi sektor informal, dan pelajaran dari perubahan aktivitas selama pandemi COVID-19."
];

APP_DATA.GLOSSARY = {
  "sumber-titik": {
    term: "Sumber titik",
    en: "point source",
    def: "Sumber emisi yang dilepas dari satu cerobong dengan lokasi, tinggi, dan diameter terdefinisi, misalnya cerobong PLTU atau kiln semen. Dimodelkan sebagai plume Gaussian."
  },
  "sumber-garis": {
    term: "Sumber garis",
    en: "line source",
    def: "Sumber emisi yang tersebar sepanjang lintasan linier, misalnya koridor jalan raya. Didekati sebagai rangkaian titik yang diidealkan menjadi garis (model CALINE)."
  },
  "sumber-area": {
    term: "Sumber area",
    en: "area source",
    def: "Sumber emisi difus yang tersebar pada suatu luasan tanpa cerobong tunggal, misalnya permukiman dengan pembakaran sampah atau TPA. Diestimasi per satuan luas."
  },
  "sumber-volume": {
    term: "Sumber volume",
    en: "volume source",
    def: "Sumber emisi tiga dimensi tanpa cerobong terdefinisi, misalnya emisi fugitif dari tumpukan material curah atau kegiatan konstruksi. Dimodelkan sebagai sumber volume AERMOD."
  },
  "antropogenik": {
    term: "Antropogenik",
    en: "anthropogenic",
    def: "Berasal dari aktivitas manusia (energi, industri, transportasi, pembakaran sampah, karhutla terkelola). Basis data EDGAR hanya mencakup emisi antropogenik."
  },
  "pltu": {
    term: "PLTU batu bara",
    en: "coal-fired power plant",
    def: "Pembangkit Listrik Tenaga Uap berbahan bakar batu bara; sumber titik besar SO2, NOx, PM, dan merkuri. Di Indonesia termasuk PLTU on-grid dan PLTU captive smelter."
  },
  "bme": {
    term: "Baku Mutu Emisi (BME)",
    en: "emission standard",
    def: "Ambang batas konsentrasi pencemar di gas buang sumber (mg/Nm3, basis kering terkoreksi O2). Diatur per sektor, misalnya Permen LHK P.15/2019 untuk pembangkit termal."
  },
  "cems": {
    term: "CEMS",
    en: "Continuous Emission Monitoring System",
    def: "Sistem pemantauan emisi cerobong secara kontinu. Di PLTU Indonesia dipakai untuk self-reporting; berbeda dari verifikasi independen pihak ketiga."
  },
  "faktor-emisi": {
    term: "Faktor emisi",
    en: "emission factor",
    def: "Nilai representatif yang menghubungkan massa pencemar dengan unit aktivitas (mis. kg/ton bahan bakar, g/kend-km). AP-42 memberi rating kualitas A–E."
  },
  "inventarisasi": {
    term: "Inventarisasi emisi",
    en: "emission inventory",
    def: "Basis data terstruktur yang mengkuantifikasi emisi per sumber, per polutan, per waktu, dan per grid spasial — masukan wajib model dispersi dan kebijakan."
  },
  "tier": {
    term: "Tier 1–3 (EMEP/EEA)",
    en: "tiered approach",
    def: "Jenjang metode inventarisasi EMEP/EEA: Tier 1 faktor default global, Tier 2 faktor teknologi nasional, Tier 3 model rinci (mis. COPERT untuk transportasi)."
  },
  "karhutla": {
    term: "Karhutla gambut",
    en: "peat fires",
    def: "Kebakaran hutan dan lahan gambut; sumber episodik musiman yang diperparah El Niño dan drainase gambut. Pada 2015 emisinya menyaingi ekonomi besar dan mendominasi PM2.5 primer."
  },
  "open-burning": {
    term: "Pembakaran sampah terbuka",
    en: "open waste burning",
    def: "Pembakaran sampah rumah tangga/campuran di lahan terbuka pada suhu rendah tanpa kontrol; melepas PM2.5, dioksin, PAH. Dilaporkan pada 48–50% rumah tangga Indonesia."
  },
  "bvoc": {
    term: "BVOC",
    en: "biogenic volatile organic compounds",
    def: "Senyawa organik volatil biogenik (isoprena, terpena) dari vegetasi tropis; prekursor penting ozon troposfer dan SOA melalui fotokimia."
  },
  "captive": {
    term: "PLTU captive",
    en: "captive power plant",
    def: "Pembangkit batu bara milik industri (terutama smelter nikel) yang tidak terhubung grid utama. Kapasitasnya naik dari 5,7 GW ke 17,1 GW (2024)."
  },
  "aps": {
    term: "AP-42",
    en: "Compilation of Air Pollutant Emission Factors",
    def: "Kompilasi faktor emisi US EPA sejak 1972 untuk >200 kategori sumber stasioner. Setiap faktor memiliki rating kualitas A (sangat baik) hingga E (buruk)."
  },
  "indoor": {
    term: "Polusi udara dalam ruangan",
    en: "indoor air pollution",
    def: "Pencemaran di ruang tertutup dengan ventilasi terbatas; sumber utama memasak biomassa, asap rokok, dan VOC material bangunan. Rezimnya berbeda dari udara ambien."
  }
};

APP_DATA.CHAPTERS = [
  { n: 1, title: "Sejarah Pencemaran Udara", href: "bab-1.html", current: false },
  { n: 2, title: "Konsep Dasar Penyebab Terjadinya Pencemaran Udara", href: "bab-2.html", current: false },
  { n: 3, title: "Sumber Pencemaran Udara", href: "#top", current: true },
  { n: 4, title: "Parameter Pencemaran Udara dan Pemantauan", href: "bab-4.html" },
  { n: 5, title: "Dampak Pencemaran Udara", href: "bab-5.html" },
  { n: 6, title: "Meteorologi dan Termodinamika Atmosfer", href: "bab-6.html" },
  { n: 7, title: "Pemodelan Pencemaran Udara", href: "bab-7.html" },
  { n: 8, title: "Peraturan dan Standar Pencemaran Udara", href: "bab-8.html" },
  { n: 9, title: "Teknologi Pengendalian Pencemaran Udara", href: "bab-9.html" },
  { n: 10, title: "Studi Kasus Pencemaran Udara", href: "bab-10.html" }
];

APP_DATA.KEYWORDS = [
  { t: "Sumber titik/garis/area/volume", to: "#klasifikasi" },
  { t: "PLTU batu bara", to: "#tidak-bergerak" },
  { t: "Baku Mutu Emisi", to: "#tidak-bergerak" },
  { t: "Cold-start & evaporatif", to: "#bergerak" },
  { t: "Pembakaran sampah terbuka", to: "#area-alami" },
  { t: "BVOC & gunung api", to: "#area-alami" },
  { t: "Faktor emisi AP-42", to: "#inventarisasi" },
  { t: "Bottom-up vs top-down", to: "#inventarisasi" },
  { t: "Tier 1–3", to: "#inventarisasi" },
  { t: "Karhutla gambut", to: "#khas" },
  { t: "PLTU captive", to: "#khas" },
  { t: "Indoor (biomassa)", to: "#indoor" },
  { t: "Co-firing & elektrifikasi", to: "#terkini" },
  { t: "Natural experiment COVID-19", to: "#terkini" }
];

APP_DATA.INVENTORY = {
  units: [
    { id: "ton_tahun", label: "ton/tahun", factor: 1 },
    { id: "kg_tahun", label: "kg/tahun", factor: 1000 },
    { id: "g_tahun", label: "g/tahun", factor: 1e6 }
  ],
  presets: [
    { id: "pltu_so2", label: "PLTU — SO₂ (kadar S 0,6%)", a: 100000, ef: 19, er: 0, unit: "ton batu bara/tahun → kg SO₂/ton", hint: "Tanpa FGD; EF ilustratif AP-42 kisaran 19·S kg/ton" },
    { id: "motor_co", label: "Sepeda motor — CO (armada kota)", a: 50000000, ef: 12.5, er: 0, unit: "kend-km/tahun → g CO/kend-km", hint: "EF Euro-3 ilustratif; variasi besar antar teknologi" },
    { id: "sampah_pm25", label: "Open burning — PM2.5", a: 58800, ef: 9.8, er: 0, unit: "ton sampah/tahun → kg PM2.5/ton", hint: "Ilustrasi Semarang 58,8 Gg/tahun (Ramadan et al. 2022)" }
  ],
  defaultPreset: "pltu_so2"
};

APP_DATA.CHART_ARMADA = {
  labels: ["2012", "2021", "2022", "2024", "2025 (est.)"],
  data: [76.4, 111.3, 125.3, 139.5, 146.5],
  caption: "Grafik 3.1 — Jumlah sepeda motor terdaftar di Indonesia (juta unit). Sumber: Regident Polri 2021, BPS/Korlantas 2024. Lonjakan 2012–2024 ±64% menunjukkan tekanan sumber garis yang terus meningkat."
};

APP_DATA.CHART_KARHUTLA_GAM = {
  labels: ["2015", "2019", "2023", "2026 (Jan–Jun)"],
  data: [0.89, 0.31, 0.18, 0.22],
  caption: "Grafik 3.2 — Luas lahan gambut terbakar (juta ha). Sumber: KLHK/SiPongi; 2026 indikasi awal perlu verifikasi akhir tahun. Kontribusi gambut terhadap emisi PM2.5 kebakaran 2015 mencapai 71% (Kiely et al. 2019)."
};

APP_DATA.QUIZ = [
  {
    q: "Dalam konteks pemodelan dispersi, jalan tol Jakarta–Cikampek paling tepat diklasifikasikan sebagai…",
    options: ["Sumber titik", "Sumber garis", "Sumber area", "Sumber volume"],
    answer: 1,
    pembahasan: "Emisi tersebar linier sepanjang koridor jalan dimodelkan sebagai sumber garis (mis. CALINE), berbeda dari cerobong tunggal (titik) atau luasan difus (area)."
  },
  {
    q: "BME PLTU batu bara eksisting Indonesia (P.15/2019) untuk SO₂ dan PM dibanding standar Tiongkok/Jepang/Korsel dinilai…",
    options: ["Lebih ketat 2 kali", "Setara", "3–15 kali lebih longgar untuk SO₂/NOx dan 5–20 kali untuk PM", "Tidak diatur"],
    answer: 2,
    pembahasan: "Analisis CREA/Greenpeace (2019) menilai BME eksisting 550 mg/Nm³ (SO₂/NOx) dan 100 mg/Nm³ (PM) 3–15× dan 5–20× lebih longgar dibanding tiga negara tersebut; ilustrasi ketimpangan regulasi, bukan data CEMS."
  },
  {
    q: "Mengapa emisi cold-start signifikan meski durasinya singkat?",
    options: ["Karena katalis belum mencapai light-off (±250–300 °C) sehingga konversi rendah", "Karena bahan bakar tidak mengandung sulfur", "Karena kendaraan listrik tidak punya knalpot", "Karena emisi evaporatif lebih besar"],
    answer: 0,
    pembahasan: "Pada menit awal, catalytic converter masih dingin, efisiensi rendah; pada uji FTP-75, 55 detik pertama dapat menyumbang ~40% HC dan ~30% CO total siklus. Relevan untuk perjalanan pendek ojek/angkot di kota tropis."
  },
  {
    q: "Persamaan dasar inventarisasi bottom-up yang benar adalah…",
    options: ["E = A + EF", "E = A × EF × (1 − ER/100)", "E = Q × C × t", "E = M / τ"],
    answer: 1,
    pembahasan: "EMEP/EEA: E = A (aktivitas) × EF (faktor emisi) × (1 − ER/100) bila ada pengendalian; Q×C adalah beban cerobong, M/τ adalah waktu tinggal."
  },
  {
    q: "Rentang estimasi konsumsi bahan bakar kering karhutla Sep–Okt 2015 yang menunjukkan ketidakpastian inventarisasi adalah…",
    options: ["50–60 Tg", "100–120 Tg", "358–541 Tg (GFED 461, GFAS 541, Wooster 358 Tg)", "1000–1200 Tg"],
    answer: 2,
    pembahasan: "GFED 461 Tg, GFAS 541 Tg, Wooster et al. 358 ±30% Tg — rentang ±20–35% antar inventarisasi menunjukkan ketidakpastian kebakaran episodik yang besar."
  },
  {
    q: "Dampak elektrifikasi transportasi terhadap beban emisi pencemaran udara bersifat…",
    options: ["Menghapus semua emisi sistem", "Memindahkan emisi knalpot ke sektor pembangkit; manfaat bersih bergantung bauran grid dan BME PLTU", "Hanya menambah emisi non-knalpot", "Tidak terkait kualitas udara"],
    answer: 1,
    pembahasan: "EV menghapus tailpipe dan evaporatif di jalan, tetapi memindahkan beban ke pembangkit. Dengan grid batu bara dominan dan BME 550 mg/Nm³, manfaat kota (hilangnya sumber garis) nyata, sedangkan total sistem bergantung pensiun PLTU (analisis)."
  }
];

APP_DATA.DISKUSI = [
  { q: "Karhutla gambut Indonesia sering diklasifikasikan sebagai antropogenik dalam GFED/EDGAR meski dipicu El Niño. Jelaskan mengapa batas alami vs antropogenik tidak tegas di sini.", h: "Gunakan 3.1.1: El Niño adalah pemicu alami, tetapi drainase gambut dan pembukaan lahan adalah rekayasa manusia. Kaitkan dengan konsekuensi inventarisasi (EDGAR 2,49% tanpa fluktuasi karhutla)." },
  { q: "Bandingkan emisi PLTU batu bara sebelum dan sesudah P.15/2019 (Kategori 1 vs 2). Mengapa PLTU eksisting (75% armada) menjadi isu kebijakan utama?", h: "500+ vs 200 mg/Nm³ untuk SO₂/NOx; 100 vs 50 mg/Nm³ PM; Hg baru 0,03 mg/Nm³ untuk baru. Diskusikan grandfather clause dan beban terkunci (lock-in) captive 17,1 GW." },
  { q: "Sepeda motor 84% armada Indonesia. Analisis mengapa strategi pengendalian transportasi Jakarta tidak cukup hanya dengan uji emisi mobil pribadi.", h: "Gunakan karakteristik Euro 4 (2018 bensin, 2021 diesel) yang hanya tipe baru, domain motor 2-tak tua, cold-start perjalanan pendek, dan tampering katalis (de Nevers 13.5)." },
  { q: "Inventarisasi open burning 48–50% rumah tangga DAN pembakaran sampah Semarang 9,7% timbulan. Bagaimana mengestimasi emisinya tanpa pengukuran cerobong?", h: "Tidak ada stack; pakai E=A×EF per kapita/per ton sampah dengan faktor AP-42/EMEP per jenis sampah dan rating kualitas E (buruk). Alokasi area berdasarkan proxy sampah tak terlayani." },
  { q: "Bottom-up CH₄ global 332–373 Tg dengan ketidakpastian 85–106% sektoral. Apa implikasi Tier 1 vs Tier 3 untuk sepeda motor dan gambut di Indonesia?", h: "Tier 1 default Eropa menyimpang untuk motor tua dan gambut tropis; butuh Tier 2/3 lokal: faktor gambut CO₂ 1.779 g/kg (±30%) dan COPERT-like untuk armada." },
  { q: "PSBB 2020: CO −39,9% dan NO₂ −7,5% turun, tetapi PM2.5 naik. Jelaskan mengapa polutan merespons berbeda dan apa pelajaran untuk validasi inventarisasi.", h: "CO/NO₂ dominan transport → responsif terhadap mobilitas; PM2.5 multi-sumber (transport, PLTU, open burning, sekunder) + meteorologi → tidak monolitik. Ini validasi natural experiment terhadap kontribusi sektor." }
];

APP_DATA.LATIHAN = [
  { t: "Buat tabel klasifikasi 8 sumber lokal (PLTU captive, smelter nikel, jalan arteri, permukiman open burning, konstruksi, Gunung Merapi, sea spray Pantai Utara, kebun kelapa sawit) menurut geometri (titik/garis/area/volume) dan pola waktu (kontinu/episodik) serta model dispersi yang sesuai (AERMOD plume/area/volume atau CALINE).", tag: "Klasifikasi" },
  { t: "Hitung emisi SO₂ tahunan sebuah PLTU 660 MW yang membakar 2,1 juta ton batu bara/tahun (S 0,6%) dengan EF 19·S kg/ton (tanpa FGD) vs dengan FGD ER 85%. Bandingkan hasilnya dengan BME P.15/2019 (550 vs 200 mg/Nm³) secara beban, bukan konsentrasi.", tag: "Hitung" },
  { t: "Susun inventarisasi bottom-up sederhana untuk open burning di kelurahan: 12.000 KK, 48% membakar, timbulan 0,7 kg/KK/hari, fraksi terbakar 40%, EF PM2.5 9,8 kg/ton. Hitung E tahunan, beri rating AP-42, dan nyatakan ketidakpastian Tier 1.", tag: "Inventarisasi" },
  { t: "Bandingkan regulasi BME PLTU Indonesia vs Tiongkok/Jepang/Korsel dalam tabel, lalu diskusikan mengapa pemodelan CREA mengestimasi 5.900 kematian dini/tahun terhindarkan dengan BME 100/100/10 mg/Nm³ di sekitar Jakarta. Bedakan model vs fakta terukur.", tag: "Regulasi" },
  { t: "Analisis data PSBB Jakarta 2020 (CO −39,9%, NO₂ −7,5%, PM2.5 naik) sebagai natural experiment: buat diagram sebab-akibat yang memisahkan sumber transport, stasioner, dan sekunder terhadap tiap polutan.", tag: "Analisis" },
  { t: "Rancang skenario co-firing 5% biomassa di PLTU 660 MW (kebutuhan ~17.470 ton/hari per 1% nasional): hitung substitusi batu bara, perubahan CO₂ netto, dan syarat verifikasi PM/NOx via CEMS, bukan asumsi.", tag: "Skenario" }
];

APP_DATA.PUSTAKA = [
  { group: "Peraturan & pedoman", items: [
    "UU No. 32/2009 tentang Perlindungan dan Pengelolaan Lingkungan Hidup; PP No. 22/2021 tentang Penyelenggaraan Perlindungan dan Pengelolaan Lingkungan Hidup.",
    "Permen LHK No. P.15/MENLHK/SETJEN/KUM.1/4/2019 tentang Baku Mutu Emisi Pembangkit Listrik Tenaga Termal (PLTU eksisting vs baru; Basis kering terkoreksi O₂).",
    "Permen LHK No. P.20/MENLHK/SETJEN/KUM.1/3/2017 tentang Baku Mutu Emisi Gas Buang Kendaraan Bermotor Tipe Baru (Euro 4; bensin 2018, diesel 2021).",
    "Permen LHK No. P.14/MENLHK/SETJEN/KUM.1/7/2020 tentang Indeks Standar Pencemar Udara (ISPU).",
    "IMO MARPOL Annex VI (2020): batas sulfur bahan bakar kapal 0,50% m/m."
  ] },
  { group: "Buku & referensi ilmiah", items: [
    "de Nevers, N. (2000). Air Pollution Control Engineering, 2nd ed. Waveland Press — Bab 4 (faktor emisi), Bab 12 (NOx), Bab 13 (kendaraan, cold-start, evaporatif).",
    "US EPA. AP-42: Compilation of Air Pollutant Emission Factors, Vol. I & II (ed. 4, 1985 → WebFIRE; rating A–E).",
    "EMEP/EEA (2023). Air Pollutant Emission Inventory Guidebook 2023 (CLRTAP; Tier 1–3; E = A × EF).",
    "Finlayson-Pitts & Pitts; Seinfeld & Pandis — kimia atmosfer & aerosol sekunder (rujukan Bab 2).",
    "Guenther et al. (MEGAN) — emisi BVOC; Kiely et al. (2019) Atmos. Chem. Phys. 19: 11105–11121 — emisi gambut 2015; Wooster et al. (2018) Remote Sens. 10:495 — EF gambut."
  ] },
  { group: "Data & laporan nasional/internasional", items: [
    "BPS (2024; 2025 est.): 166 juta kendaraan (sepeda motor 139,5 juta, 84%); Korlantas Polri Feb 2024: 160,65 juta unit; Regident 2021: 111,3 juta motor.",
    "EDGAR v2025 (JRC): Indonesia 1.323,78 Mt CO₂eq antropogenik (2024; 2,49% global); KLHK/SiPongi: luas karhutla 2015/2019/2023 dan gambut terbakar 2015 0,89 juta ha.",
    "CREA & Global Energy Monitor (2024–2025): PLTU captive 5,7 → 17,1 GW; RUKN 2024–2060: +26,8 GW; Ember (2024): RUPTL tanpa PLTU baru on-grid.",
    "Kementerian ESDM (2023): kepatuhan CEMS PLTU Suralaya; Greenpeace (2019): analisis BME P.15/2019 vs Tiongkok/Jepang/Korsel.",
    "WHO (2025): 2,1 miliar penduduk memasak dengan bahan bakar berpolusi; Riskesdas 2013 & LRF/World Bank 2024: 48–50% rumah tangga Indonesia membakar sampah; Ramadan et al. (2022): open burning Semarang 58,8 Gg/tahun.",
    "Anugerah et al. (2021): PSBB DKI — CO −39,9%, NO₂ −7,5%, SO₂ −5,7%; CREA (2020): PM2.5 naik Maret–Juni 2020 (stasiun Kedubes AS)."
  ] }
];
