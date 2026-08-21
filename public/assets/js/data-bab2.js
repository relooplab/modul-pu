/**
 * data-bab2.js — konten dan data interaktif Bab 2.
 * Konsep Dasar Penyebab Terjadinya Pencemaran Udara.
 */
window.APP_DATA = {};

APP_DATA.OBJECTIVES = [
  "Menjelaskan definisi pencemaran udara menurut UU No. 32/2009 dan PP No. 22/2021 serta membedakan udara ambien, emisi, dan udara ruangan.",
  "Membedakan pencemar primer dan sekunder beserta sumber, prekursor, dan mekanisme pembentukannya.",
  "Menguraikan siklus pencemar di atmosfer dari emisi, transport/dispersi, transformasi, deposisi, hingga reseptor.",
  "Menggunakan besaran dasar pencemaran udara: konsentrasi, laju emisi, faktor emisi, beban pencemaran, dan waktu tinggal.",
  "Menjelaskan siklus fotostasioner NO₂–O₃, peran radikal OH, pembentukan aerosol sekunder, dan PAN.",
  "Mengaitkan kapasitas asimilatif dengan koefisien ventilasi, daya tampung beban pencemaran, dan model kotak.",
  "Menganalisis paradigma one atmosphere, SLCP, dan pencemaran lintas batas sebagai isu udara–iklim–kesehatan."
];

APP_DATA.GLOSSARY = {
  "pencemaran-udara": {
    term: "Pencemaran udara",
    en: "air pollution",
    def: "Masuk atau dimasukkannya zat, energi, dan/atau komponen lain ke udara ambien oleh kegiatan manusia sehingga melampaui baku mutu udara ambien yang ditetapkan (PP 22/2021)."
  },
  "udara-ambien": {
    term: "Udara ambien",
    en: "ambient air",
    def: "Udara bebas di permukaan bumi pada lapisan troposfer yang berada dalam yurisdiksi Indonesia dan berpengaruh terhadap kesehatan, makhluk hidup, serta lingkungan."
  },
  "udara-emisi": {
    term: "Udara emisi",
    en: "emission gas",
    def: "Gas buang yang keluar langsung dari sumber seperti cerobong, knalpot, atau proses sebelum bercampur dan terdilusi di atmosfer bebas."
  },
  "udara-ruangan": {
    term: "Udara ruangan",
    en: "indoor air",
    def: "Udara dalam ruang tertutup seperti rumah, kantor, atau fasilitas industri; kerangka pengaturannya berbeda dari baku mutu udara ambien PP 22/2021."
  },
  "baku-mutu": {
    term: "Baku mutu udara ambien",
    en: "ambient air quality standard",
    def: "Nilai pencemar udara yang ditenggang keberadaannya dalam udara ambien. Dalam PP 22/2021, nilai ini menjadi pembanding legal untuk menentukan apakah ambang terlampaui."
  },
  "primer": {
    term: "Pencemar primer",
    en: "primary pollutant",
    def: "Pencemar yang langsung diemisikan dari sumber, misalnya CO, SO₂, NOₓ, partikulat primer, VOC, NH₃, dan Pb."
  },
  "sekunder": {
    term: "Pencemar sekunder",
    en: "secondary pollutant",
    def: "Pencemar yang terbentuk di atmosfer melalui reaksi kimia pencemar primer dan komponen atmosfer, misalnya O₃, PAN, sulfat/nitrat sekunder, dan SOA."
  },
  "deposisi-kering": {
    term: "Deposisi kering",
    en: "dry deposition",
    def: "Pemindahan gas atau partikel dari atmosfer ke permukaan melalui sedimentasi, impaksi, intersepsi, difusi, atau serapan tanpa air presipitasi."
  },
  "deposisi-basah": {
    term: "Deposisi basah",
    en: "wet deposition",
    def: "Pemindahan pencemar melalui rainout di dalam awan atau washout oleh hujan yang jatuh di bawah awan."
  },
  "faktor-emisi": {
    term: "Faktor emisi",
    en: "emission factor",
    def: "Nilai representatif yang menghubungkan massa pencemar dengan unit aktivitas, misalnya kg SO₂ per ton bahan bakar atau gram per kendaraan-kilometer."
  },
  "waktu-tinggal": {
    term: "Waktu tinggal",
    en: "residence time",
    def: "Waktu karakteristik suatu zat bertahan di atmosfer sebelum hilang melalui reaksi kimia, deposisi, atau proses penyingkiran lain."
  },
  "radikal-oh": {
    term: "Radikal OH",
    en: "hydroxyl radical",
    def: "Oksidator utama troposfer siang hari yang mengendalikan penghilangan banyak gas; sering disebut deterjen atmosfer."
  },
  "pan": {
    term: "PAN",
    en: "peroxyacetyl nitrate",
    def: "Peroksiasetil nitrat, produk oksidasi VOC dan NO₂ yang stabil pada suhu rendah dan dapat menjadi reservoir NOₓ untuk transport jarak jauh."
  },
  "soa": {
    term: "SOA",
    en: "secondary organic aerosol",
    def: "Aerosol organik sekunder yang terbentuk ketika produk oksidasi VOC ber-volatilitas rendah mengembun menjadi fase partikel."
  },
  "kapasitas-asimilatif": {
    term: "Kapasitas asimilatif",
    en: "assimilative capacity",
    def: "Beban pencemaran maksimum yang dapat dilepaskan tanpa menyebabkan kualitas udara ambien melampaui baku mutu; bergantung pada dispersi, transport, deposisi, dan reaksi."
  },
  "slcp": {
    term: "SLCP",
    en: "short-lived climate pollutant",
    def: "Pencemar iklim berumur pendek seperti black carbon, metana, ozon troposfer, dan HFC yang memanaskan iklim sekaligus berdampak pada kesehatan."
  },
  "transboundary": {
    term: "Pencemaran lintas batas",
    en: "transboundary pollution",
    def: "Pencemar yang terbawa lintas batas administratif atau negara, terutama ketika waktu tinggalnya cukup panjang dan kondisi meteorologinya mendukung transport regional."
  }
};

APP_DATA.CHAPTERS = [
  { n: 1, title: "Sejarah Pencemaran Udara", href: "bab-1.html", current: false },
  { n: 2, title: "Konsep Dasar Penyebab Pencemaran Udara", href: "#top", current: true },
  { n: 3, title: "Termodinamika Atmosfer", href: null },
  { n: 4, title: "Sumber Pencemaran Udara", href: null },
  { n: 5, title: "Parameter Pencemaran Udara", href: null },
  { n: 6, title: "Dampak Pencemaran Udara", href: null },
  { n: 7, title: "Meteorologi Pencemaran Udara", href: null },
  { n: 8, title: "Pemodelan Pencemaran Udara", href: null },
  { n: 9, title: "Peraturan dan Standar Pencemaran Udara", href: null },
  { n: 10, title: "Studi Kasus Pencemaran Udara", href: null }
];

APP_DATA.KEYWORDS = [
  { t: "Udara ambien", to: "#definisi" },
  { t: "Baku mutu", to: "#definisi" },
  { t: "Primer–sekunder", to: "#primer-sekunder" },
  { t: "Siklus pencemar", to: "#siklus" },
  { t: "Deposisi kering", to: "#siklus" },
  { t: "Deposisi basah", to: "#siklus" },
  { t: "Faktor emisi", to: "#besaran" },
  { t: "Waktu tinggal", to: "#besaran" },
  { t: "Hubungan Leighton", to: "#reaksi" },
  { t: "Radikal OH", to: "#reaksi" },
  { t: "PAN dan SOA", to: "#reaksi" },
  { t: "Kapasitas asimilatif", to: "#daya-dukung" },
  { t: "Model kotak", to: "#siklus" },
  { t: "One atmosphere", to: "#terkini" },
  { t: "SLCP", to: "#terkini" },
  { t: "Transboundary", to: "#terkini" }
];

APP_DATA.CONVERTER = {
  molarVolume: 24.45,
  gases: [
    { id: "so2", label: "SO₂", mw: 64.07 },
    { id: "no2", label: "NO₂", mw: 46.01 },
    { id: "co", label: "CO", mw: 28.01 },
    { id: "o3", label: "O₃", mw: 48.00 }
  ],
  defaultGas: "so2",
  defaultPpm: 0.029
};

APP_DATA.BOX_MODEL = {
  q: { min: 1, max: 10, step: 0.5, def: 5, unit: "µg m⁻² s⁻¹", label: "Laju emisi areal (q)" },
  length: { min: 5, max: 50, step: 1, def: 20, unit: "km", label: "Panjang wilayah (L)" },
  wind: { min: 0.5, max: 8, step: 0.5, def: 2, unit: "m/s", label: "Kecepatan angin (u)" },
  height: { min: 50, max: 1000, step: 50, def: 500, unit: "m", label: "Tinggi pencampuran (H)" },
  background: { min: 0, max: 100, step: 5, def: 0, unit: "µg/m³", label: "Konsentrasi latar" }
};

APP_DATA.QUIZ = [
  {
    q: "Menurut PP No. 22/2021, pencemaran udara ditentukan ketika…",
    options: [
      "Semua zat alami masuk ke atmosfer",
      "Emisi terlihat oleh mata",
      "Zat, energi, atau komponen masuk ke udara ambien oleh kegiatan manusia dan melampaui baku mutu",
      "Konsentrasi di cerobong melampaui baku mutu udara ambien"
    ],
    answer: 2,
    pembahasan: "Rumusan PP 22/2021 menekankan media udara ambien, kegiatan manusia, dan terlampauinya baku mutu udara ambien. Baku mutu emisi adalah ranah sumber yang berbeda."
  },
  {
    q: "Manakah pasangan yang seluruhnya merupakan pencemar sekunder?",
    options: ["CO dan SO₂", "O₃ dan PAN", "NO₂ dan NH₃", "Pb dan PM primer"],
    answer: 1,
    pembahasan: "Ozon troposfer dan PAN terbentuk melalui reaksi atmosfer dari prekursor, bukan diemisikan langsung dalam bentuk akhirnya."
  },
  {
    q: "Pada 25 °C dan 1 atm, 0,029 ppm SO₂ (BM 64,07) kira-kira setara dengan…",
    options: ["7,5 µg/m³", "29 µg/m³", "75 µg/m³", "2620 µg/m³"],
    answer: 2,
    pembahasan: "C = ppm × BM/24,45 × 1000 = 0,029 × 64,07/24,45 × 1000 ≈ 76 µg/m³; pembulatan contoh menjadi sekitar 75 µg/m³."
  },
  {
    q: "Jika laju emisi dan kecepatan angin tetap, menurunkan tinggi pencampuran dari 500 m menjadi 100 m pada model kotak akan…",
    options: ["Menurunkan konsentrasi lima kali", "Menaikkan konsentrasi lima kali", "Tidak mengubah konsentrasi", "Menghilangkan konsentrasi latar"],
    answer: 1,
    pembahasan: "Dalam C = qL/(uH) + C_latar, konsentrasi berbanding terbalik dengan H. H turun lima kali, komponen konsentrasi akibat emisi naik lima kali."
  },
  {
    q: "Mengapa pengendalian O₃ perkotaan tidak cukup hanya menurunkan NOₓ?",
    options: ["O₃ adalah partikulat", "O₃ hanya terbentuk pada malam hari", "Pembentukan O₃ bergantung pada interaksi NOₓ, VOC, radikal peroksi, dan rezim sensitivitas", "NOₓ tidak pernah bereaksi di atmosfer"],
    answer: 2,
    pembahasan: "VOC dan radikal peroksi dapat mengubah NO menjadi NO₂ tanpa mengonsumsi O₃. Karena itu strategi pengendalian harus mempertimbangkan apakah wilayah VOC-limited atau NOₓ-limited."
  },
  {
    q: "Manakah yang termasuk SLCP?",
    options: ["CO₂ saja", "Black carbon, CH₄, O₃ troposfer, dan HFC", "N₂O saja", "O₂ dan N₂"],
    answer: 1,
    pembahasan: "SLCP adalah pencemar/gas pemaksa iklim berumur relatif pendek: black carbon, metana, ozon troposfer, dan HFC. Pengurangannya memberi co-benefit kesehatan dan iklim."
  }
];

APP_DATA.DISKUSI = [
  { q: "Mengapa definisi pencemaran udara berbasis baku mutu tidak sama dengan pernyataan bahwa udara tanpa baku mutu adalah aman?", h: "Bedakan status legal, bukti kesehatan, dan keterbatasan parameter yang diatur. Baku mutu adalah ambang kebijakan, bukan jaminan ketiadaan risiko." },
  { q: "Bandingkan titik ukur, kondisi acuan, dan tujuan pengendalian udara ambien dengan udara emisi.", h: "Ambien di sisi reseptor; emisi di sisi sumber. Perhatikan µg/m³ pada 25 °C/1 atm versus mg/Nm³ basis kering dan koreksi O₂." },
  { q: "Mengapa PM₂.₅ tidak dapat dikendalikan hanya dengan menangkap partikulat primer?", h: "Massa PM₂.₅ juga berasal dari aerosol sekunder sulfat, nitrat, dan SOA; prekursor gas perlu dikendalikan." },
  { q: "Pada kondisi apa model kotak berguna, dan kapan model tersebut terlalu sederhana untuk keputusan rekayasa?", h: "Model kotak berguna untuk estimasi awal dan hubungan skala; ia mengasumsikan pencampuran sempurna dan tidak menggambarkan detail medan angin, kimia, atau topografi." },
  { q: "Jelaskan bagaimana kapasitas asimilatif dapat berubah tanpa perubahan laju emisi.", h: "Gunakan perubahan kecepatan angin dan tinggi lapisan pencampuran. Inversi menurunkan ventilasi sehingga konsentrasi meningkat." },
  { q: "Apakah pengendalian SLCP dapat menggantikan pengurangan CO₂? Jelaskan.", h: "Tidak. SLCP memberi respons iklim cepat dan manfaat kesehatan, tetapi CO₂ berumur panjang tetap membutuhkan pengurangan struktural." }
];

APP_DATA.LATIHAN = [
  { t: "Buat tabel tiga kolom yang membedakan udara ambien, udara emisi, dan udara ruangan dari sisi regulasi, titik ukur, satuan, kondisi acuan, dan tujuan pengendalian.", tag: "Klasifikasi" },
  { t: "Konversikan 0,035 ppm NO₂ pada 25 °C dan 1 atm ke µg/m³. Bandingkan dengan baku mutu 24 jam PP 22/2021 dan WHO AQG 2021.", tag: "Hitung" },
  { t: "Gambarkan siklus pencemar dari sumber sampai reseptor. Tandai proses yang termasuk transport, transformasi, deposisi kering, dan deposisi basah.", tag: "Diagram" },
  { t: "Hitung beban pencemaran harian dan tahunan dari cerobong dengan Q = 30.000 Nm³/jam, C SO₂ = 600 mg/Nm³, dan operasi 8.000 jam/tahun.", tag: "Rekayasa" },
  { t: "Gunakan model kotak untuk membandingkan konsentrasi saat H = 500 m dan H = 100 m pada q = 5 µg m⁻² s⁻¹, L = 20 km, dan u = 2 m/s.", tag: "Model" },
  { t: "Susun strategi pengendalian untuk black carbon, metana, O₃, dan HFC. Jelaskan co-benefit kesehatan dan iklim serta batasannya.", tag: "Sintesis" }
];

APP_DATA.PUSTAKA = [
  { group: "Peraturan dan pedoman", items: [
    "Undang-Undang No. 32 Tahun 2009 tentang Perlindungan dan Pengelolaan Lingkungan Hidup.",
    "Peraturan Pemerintah No. 22 Tahun 2021 tentang Penyelenggaraan Perlindungan dan Pengelolaan Lingkungan Hidup, Lampiran VII.",
    "Peraturan Menteri LHK No. P.14/MENLHK/SETJEN/KUM.1/7/2020 tentang Indeks Standar Pencemar Udara.",
    "Permenkes No. 1077/MENKES/PER/V/2011 tentang Pedoman Penyehatan Udara dalam Ruang Rumah.",
    "WHO. (2021). WHO Global Air Quality Guidelines. Geneva.",
    "UU No. 26 Tahun 2014 tentang Pengesahan ASEAN Agreement on Transboundary Haze Pollution."
  ] },
  { group: "Buku dan referensi ilmiah", items: [
    "Boubel, R. W., Fox, D. L., Turner, D. B., & Stern, A. C. (1994). Fundamentals of Air Pollution (3rd ed.). Academic Press.",
    "Cooper, C. D. & Alley, F. C. (2011). Air Pollution Control: A Design Approach (4th ed.). Waveland Press.",
    "de Nevers, N. (2017). Air Pollution Control Engineering (3rd ed.). Waveland Press.",
    "Finlayson-Pitts, B. J. & Pitts, J. N. (2000). Chemistry of the Upper and Lower Atmosphere. Academic Press.",
    "Leighton, P. A. (1961). Photochemistry of Air Pollution. Academic Press.",
    "Seinfeld, J. H. & Pandis, S. N. (2016). Atmospheric Chemistry and Physics (3rd ed.). Wiley."
  ] },
  { group: "Laporan dan basis data", items: [
    "Health Effects Institute. (2024). State of Global Air 2024.",
    "IPCC. (2021). Climate Change 2021: The Physical Science Basis (AR6 WG I).",
    "UNEP & WMO. (2011). Integrated Assessment of Black Carbon and Tropospheric Ozone.",
    "US EPA. AP-42: Compilation of Air Pollutant Emission Factors.",
    "World Bank. (2016). The Cost of Fire: An Economic Analysis of Indonesia's 2015 Fire Crisis."
  ] }
];
