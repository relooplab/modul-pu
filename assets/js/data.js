/**
 * data.js — SEMUA KONTEN EDITABLE untuk Bab 1: Sejarah Pencemaran Udara.
 * ------------------------------------------------------------------
 * Dosen/editor cukup mengubah objek & array di bawah ini TANPA menyentuh
 * file logika (main.js, stepper.js, quiz.js, extras.js).
 * ID pada data-gloss (di bab-1.html) harus cocok dengan kunci di GLOSSARY.
 *
 * Konten bersumber dari dua draf: "BAB_1_Sejarah_Pencemaran_Udara_DRAF.md"
 * (ber-anotasi [FAKTA]/[REGULASI]/[MODEL]/[ANALISIS]) dan
 * "Bab 1 — Sejarah Pencemaran Udara.md" (detail data + referensi ber-URL).
 */
window.APP_DATA = {};

/* Tujuan pembelajaran (rendered di bagian Objectives) */
APP_DATA.OBJECTIVES = [
  "Menelusuri jejak pencemaran udara sejak era praindustri hingga Revolusi Industri dan tiga episode smog klasik.",
  "Menjelaskan mekanisme smog fotokimia Los Angeles (NOₓ–VOC–O₃) dan perannya melahirkan kimia atmosfer sebagai disiplin ilmu.",
  "Menguraikan lahirnya regulasi udara bersih modern — Clean Air Act Inggris dan Amerika Serikat, NAAQS, serta pendekatan criteria pollutants.",
  "Menyusun kronologi kelembagaan dan regulasi udara Indonesia (BAPEDAL, Program Langit Biru, PP 41/1999 → PP 22/2021) beserta episode karhutla.",
  "Membandingkan pergeseran paradigma dari polutan konvensional ke PM₂.₅ serta implikasi pengetatan WHO AQG 2021.",
  "Menganalisis keterkaitan agenda udara bersih, litigasi iklim, dan perubahan iklim (SLCP) dalam konteks kontemporer."
];

/* Glosarium tooltip — key = nilai data-gloss pada <span class="term"> */
APP_DATA.GLOSSARY = {
  "smog": {
    term: "Smog",
    en: "smog (smoke + fog)",
    def: "Gabungan 'smoke' dan 'fog': kabut asap tebal akibat pencemar yang tertahan di dekat permukaan. Smog dibedakan menjadi smog sulfur (batu bara) dan smog fotokimia (kendaraan + sinar matahari)."
  },
  "inversi": {
    term: "Inversi suhu",
    en: "temperature inversion",
    def: "Kondisi lapisan udara hangat berada di atas udara dingin sehingga udara permukaan tidak dapat naik — menahan pencemar di dekat tanah. Pemicu umum episode smog akut."
  },
  "pencemar-primer": {
    term: "Pencemar primer",
    en: "primary pollutant",
    def: "Pencemar yang diemisikan langsung dari sumber, misalnya SO₂ dari pembakaran batu bara atau CO dari knalpot."
  },
  "pencemar-sekunder": {
    term: "Pencemar sekunder",
    en: "secondary pollutant",
    def: "Pencemar yang terbentuk di atmosfer dari reaksi pencemar primer, misalnya ozon troposfer (O₃) dan PAN. Tidak diemisikan langsung oleh cerobong atau knalpot."
  },
  "pm25": {
    term: "PM₂.₅",
    en: "fine particulate matter",
    def: "Partikulat halus berdiameter aerodinamik ≤ 2,5 µm — cukup kecil untuk menembus jauh ke dalam paru-paru. Menjadi parameter kunci regulasi mutakhir karena kaitannya yang kuat dengan mortalitas."
  },
  "criteria-pollutants": {
    term: "Criteria pollutants",
    en: "criteria pollutants",
    def: "Enam pencemar yang jadi basis NAAQS AS: partikulat, SO₂, NO₂, CO, ozon, dan timbal — ditetapkan berdasarkan bahaya luas terhadap kesehatan dan kesejahteraan publik."
  },
  "naaqs": {
    term: "NAAQS",
    en: "National Ambient Air Quality Standards",
    def: "Baku mutu udara ambien nasional Amerika Serikat yang ditetapkan US EPA sejak 1971; memisahkan standar primer (kesehatan) dan sekunder (kesejahteraan publik)."
  },
  "ispu": {
    term: "ISPU",
    en: "Indeks Standar Pencemar Udara",
    def: "Indeks kualitas udara Indonesia (KLHK) untuk mengomunikasikan tingkat pencemaran kepada publik dalam lima kategori: Baik, Sedang, Tidak Sehat, Sangat Tidak Sehat, dan Berbahaya."
  },
  "aqg": {
    term: "WHO AQG",
    en: "Air Quality Guidelines",
    def: "Pedoman kualitas udara WHO berbasis bukti kesehatan. Revisi 2021 mengencangkan drastis ambang PM₂.₅ tahunan dari 10 menjadi 5 µg/m³. Pedoman ini tidak mengikat secara hukum dan memiliki fungsi berbeda dari baku mutu nasional."
  },
  "karhutla": {
    term: "Karhutla",
    en: "forest & land fires",
    def: "Kebakaran hutan dan lahan — sumber pencemaran episodik terbesar di Indonesia, diperparah El Niño dan praktik pembukaan lahan, memicu kabut asap lintas batas (transboundary haze)."
  },
  "slcp": {
    term: "Pencemar iklim berumur pendek (SLCP)",
    en: "short-lived climate pollutants",
    def: "Pencemar dengan efek pemanasan kuat namun umur atmosferik pendek: karbon hitam, metana, ozon troposfer, dan HFC. Mengendalikannya memberi co-benefit bagi iklim dan kesehatan sekaligus."
  },
  "black-carbon": {
    term: "Karbon hitam",
    en: "black carbon",
    def: "Komponen jelaga hasil pembakaran tak sempurna; menyerap radiasi dan menghangatkan atmosfer, sekaligus berbahaya bagi kesehatan. Termasuk SLCP yang dampaknya sangat regional."
  },
  "transboundary": {
    term: "Kabut asap lintas batas",
    en: "transboundary haze",
    def: "Asap karhutla yang terbawa angin melintasi batas negara — melatari ASEAN Agreement on Transboundary Haze Pollution (AATHP, 2002) yang diratifikasi Indonesia pada 2014."
  }
};

/* Stepper — telaah tiga episode smog klasik (Subbab 1.3) */
APP_DATA.STEPS = [
  {
    icon: "factory",
    title: "Meuse Valley, Belgia — 1930",
    body: "Selama 1–5 Desember 1930, emisi belasan pabrik di sepanjang Sungai Meuse terperangkap oleh inversi suhu pada topografi lembah. Hasilnya: 63 orang meninggal dan ribuan jatuh sakit hanya dalam beberapa hari.",
    note: "Nemery et al. (2001, The Lancet) menyebutnya demonstrasi ilmiah pertama bahwa pencemaran atmosfer dapat membunuh manusia."
  },
  {
    icon: "wind",
    title: "Donora, Pennsylvania — 1948",
    body: "Empat hari kabut beracun (27–31 Oktober) dari Donora Zinc Works membunuh 20 orang dan membuat ±6.000 dari ±14.000 penduduk jatuh sakit. Hidrogen fluorida dan SO₂ menjadi tersangka utama.",
    note: "Bencana ini memicu perdebatan kebijakan pengendalian industri di tingkat nasional Amerika Serikat dan kemudian menjadi salah satu tonggak menuju Clean Air Act."
  },
  {
    icon: "cloud-fog",
    title: "Great Smog London — 1952",
    body: "Lima hari (5–9 Desember) tekanan tinggi dengan angin nyaris nol menahan asap batu bara rumah tangga dan industri. Estimasi resmi mencatat ±4.000 kematian; estimasi modern menaikkannya menjadi 10.000–12.000.",
    note: "Epidemiologi retrospektif menemukan kematian naik 2,6× dengan kenaikan bronkitis–emfisema 9,5× — korban terbesar kelompok lansia dengan penyakit bawaan (harvesting)."
  }
];

/* Bento cards — enam pelajaran dari sejarah (penutup) */
APP_DATA.BENTO = [
  {
    icon: "wind",
    title: "Meteorologi menentukan",
    tag: "Faktor penguat",
    summary: "Inversi suhu dan angin lemah mengubah emisi biasa menjadi bencana.",
    detail: [
      "Ketiga episode smog klasik berbagi pola yang sama: bukan semata-mata karena peningkatan jumlah pabrik, melainkan karena meteorologi — inversi suhu dan angin yang sangat lemah — menahan emisi di dekat permukaan selama berhari-hari.",
      "Pelajaran yang terbawa sampai bab meteorologi dan dispersi: konsentrasi ambien adalah interaksi emisi × kondisi atmosfer, bukan sekadar besaran emisi."
    ],
    takeaway: "Emisi yang sama dapat menghasilkan episode mematikan atau tak terlihat, tergantung meteorologi."
  },
  {
    icon: "flask-conical",
    title: "Bukti sains mendahului regulasi",
    tag: "Urutan sejarah",
    summary: "Namun selalu ada jeda panjang antara bukti yang meyakinkan dan aturan yang mengikat.",
    detail: [
      "Keluhan terhadap asap batu bara Inggris terdokumentasi sejak abad ke-13 (era Edward I), risalah ilmiah Evelyn terbit 1661, tetapi regulasi nasional baru lahir setelah Great Smog 1952 — lewat Clean Air Act 1956.",
      "Jeda ratusan tahun ini menunjukkan bahwa penerimaan sosial dan momentum politik sering menjadi penentu kecepatan regulasi — bukan ketiadaan pengetahuan."
    ],
    takeaway: "Tugas insinyur bukan hanya membangun bukti, tetapi juga memahami kapan bukti itu menjadi kebijakan."
  },
  {
    icon: "sun",
    title: "Pencemar sekunder bukan primer",
    tag: "Kelahiran kimia atmosfer",
    summary: "Ozon Los Angeles tidak diemisikan langsung dari knalpot — ozon terbentuk melalui reaksi di atmosfer.",
    detail: [
      "Haagen-Smit menunjukkan bahwa ozon smog terbentuk dari reaksi NOₓ dan VOC di bawah sinar matahari, bukan diemisikan langsung. Temuan ini membantah asumsi bahwa cerobong atau knalpot merupakan satu-satunya sumber pencemar yang relevan.",
      "Implikasinya mendasar: pengendalian satu prekursor saja belum tentu menurunkan ozon; diperlukan pengendalian gabungan yang mempertimbangkan kimia atmosfer."
    ],
    takeaway: "Menelaah pencemaran udara berarti menelaah kimia, bukan sekadar menutup cerobong."
  },
  {
    icon: "heart-pulse",
    title: "Kelompok rentan paling terdampak",
    tag: "Keadilan lingkungan",
    summary: "Episode akut mempercepat kematian lansia dan penderita penyakit bawaan.",
    detail: [
      "Analisis Great Smog London menemukan korban terbesar adalah lansia 65–74 tahun (2,8×) dan penderita penyakit respiratori atau sirkulasi — bukan orang muda sehat.",
      "Prinsip yang sama berlanjut hingga hari ini: dampak pencemaran udara tidak merata, dan kelompok rentan menanggung beban terbesar."
    ],
    takeaway: "Regulasi yang baik diukur dari seberapa kuat ia melindungi kelompok paling rentan."
  },
  {
    icon: "factory",
    title: "Persepsi menentukan penerimaan",
    tag: "Norma sosial",
    summary: "Cerobong mengepul pernah dijuluki simbol kemakmuran.",
    detail: [
      "Hingga 1930–1940-an asap tebal dipandang sebagai tanda kesejahteraan, bahkan dipakai dalam lambang resmi lembaga. Teori miasma abad ke-19 justru menganggap asap batu bara sebagai 'desinfektan'.",
      "Paradoks ini penting: penerimaan sosial terhadap emisi berkorelasi dengan persepsi manfaat ekonomi, dan perubahan norma sering mendahului perubahan regulasi."
    ],
    takeaway: "Asap yang dahulu dipandang sebagai simbol kemakmuran kemudian menjadi objek pengendalian; standar 'bersih' berubah mengikuti perkembangan pengetahuan dan norma sosial."
  },
  {
    icon: "cloud",
    title: "Udara bersih dan iklim menyatu",
    tag: "Agenda SLCP",
    summary: "Karbon hitam, metana, dan ozon merugikan kesehatan sekaligus iklim.",
    detail: [
      "Sejak akhir 1980-an pencemaran udara global (hujan asam, lubang ozon, CO₂) memaksa agenda udara bersih bertemu agenda iklim melalui konsep SLCP — pencemar iklim berumur pendek.",
      "Bagi Indonesia keterkaitan ini konkret: karhutla gambut adalah sekaligus krisis PM₂.₅ regional dan sumber emisi gas rumah kaca — satu intervensi perlindungan gambut memberi dua manfaat (co-benefit)."
    ],
    takeaway: "Mengendalikan pencemaran udara kini adalah strategi iklim sekaligus strategi kesehatan masyarakat."
  }
];

/* Checkpoint quiz — 5 soal pilihan ganda + pembahasan */
APP_DATA.QUIZ = [
  {
    q: "Episode yang dianggap sebagai demonstrasi ilmiah pertama bahwa pencemaran udara dapat membunuh manusia adalah…",
    options: [
      "Great Smog of London (1952)",
      "Smog Donora (1948)",
      "Kabut Meuse Valley (1930)",
      "Smog fotokimia Los Angeles (1940-an)"
    ],
    answer: 2,
    pembahasan: "Nemery et al. (2001) menyebut kabut Meuse Valley Belgia (1–5 Desember 1930) sebagai bukti ilmiah pertama mortalitas akibat pencemaran udara, karena asosiasi temporalnya yang ketat antara kabut dan lonjakan kematian."
  },
  {
    q: "Temuan kunci Haagen-Smit tentang smog Los Angeles adalah…",
    options: [
      "Ozon diemisikan langsung dari cerobong dan knalpot kendaraan.",
      "Ozon terbentuk di atmosfer melalui reaksi fotokimia NOₓ dan VOC di bawah sinar matahari.",
      "Smog Los Angeles disebabkan oleh pembakaran batu bara rumah tangga.",
      "Smog hanya muncul pada musim dingin saat terjadi inversi suhu."
    ],
    answer: 1,
    pembahasan: "Haagen-Smit mendemonstrasikan bahwa ozon (yang bukan diemisikan langsung) terbentuk dari prekursor NOₓ dan VOC lewat fotokimia — melahirkan konsep pencemar sekunder dan disiplin kimia atmosfer."
  },
  {
    q: "WHO Air Quality Guidelines 2021 mengencangkan ambang PM₂.₅ tahunan dari 10 µg/m³ (2005) menjadi…",
    options: [
      "15 µg/m³",
      "5 µg/m³",
      "25 µg/m³",
      "20 µg/m³"
    ],
    answer: 1,
    pembahasan: "WHO AQG 2021 menurunkan pedoman PM₂.₅ tahunan menjadi 5 µg/m³ — didasarkan bukti bahwa risiko kesehatan tetap teramati hingga konsentrasi rendah (hubungan supralinear)."
  },
  {
    q: "Estimasi modern jumlah kematian akibat Great Smog of London 1952 adalah…",
    options: [
      "±400 orang",
      "±4.000 orang (angka yang konsisten di semua analisis)",
      "±10.000–12.000 orang (melebihi estimasi resmi kontemporer ±4.000)",
      "Tidak terjadi kematian berlebih"
    ],
    answer: 2,
    pembahasan: "Laporan pemerintah 1952 mencatat ±4.000 kematian, sedangkan analisis ulang mortalitas berlebih (2001–2004) mengestimasi 10.000–12.000 kematian. Perbedaan tersebut mencerminkan perbedaan definisi dan metode penghitungan."
  },
  {
    q: "Program Langit Biru Indonesia dicanangkan pada tahun…",
    options: [
      "1992",
      "1996",
      "1999",
      "2002"
    ],
    answer: 1,
    pembahasan: "Program Langit Biru dicanangkan 6 Agustus 1996 di Semarang (Kepmen LH No. 15/1996). Angka 1992 merupakan kekeliruan yang sering tertukar dengan UU No. 14/1992 tentang Lalu Lintas."
  }
];

/* Konfigurasi SIM tidak dipakai pada Bab 1 (bab naratif-sejarah). */
APP_DATA.SIM = null;

/* Linimasa kelembagaan & regulasi udara Indonesia (Subbab 1.6) */
APP_DATA.TIMELINE = [
  { year: "1990", title: "BAPEDAL dibentuk", text: "Badan Pengendalian Dampak Lingkungan dibentuk melalui Keppres No. 23/1990 dan menjadi tonggak awal kelembagaan pengendalian pencemaran di bawah tanggung jawab langsung Presiden." },
  { year: "1996", title: "Program Langit Biru", text: "Dicanangkan 6 Agustus 1996 di Semarang (Kepmen LH No. 15/1996) untuk sumber bergerak dan tidak bergerak, awalnya di empat provinsi." },
  { year: "1999", title: "PP No. 41/1999", text: "Pengendalian pencemaran udara: baku mutu udara ambien nasional, baku mutu emisi, ambang emisi kendaraan, dan ISPU." },
  { year: "2002", title: "AATHP ditandatangani", text: "ASEAN Agreement on Transboundary Haze Pollution lahir menanggapi kabut asap lintas batas; Indonesia menjadi negara ASEAN terakhir yang meratifikasi (2014)." },
  { year: "2009", title: "UU No. 32/2009", text: "Perlindungan dan Pengelolaan Lingkungan Hidup — kerangka umum hukum lingkungan nasional." },
  { year: "2021", title: "PP No. 22/2021", text: "Baku mutu udara ambien nasional baru (Lampiran VII) menggantikan PP 41/1999, bersamaan dengan terbitnya WHO AQG 2021." }
];

/* Bab-bab buku (nav antar bab di header) */
APP_DATA.CHAPTERS = [
  { n: 1, title: "Sejarah Pencemaran Udara", href: "#top", current: true },
  { n: 2, title: "Konsep Dasar Penyebab Pencemaran Udara", href: "bab-2.html" },
  { n: 3, title: "Termodinamika Atmosfer", href: null },
  { n: 4, title: "Sumber Pencemaran Udara", href: null },
  { n: 5, title: "Parameter Pencemaran Udara", href: null },
  { n: 6, title: "Dampak Pencemaran Udara", href: null },
  { n: 7, title: "Meteorologi Pencemaran Udara", href: null },
  { n: 8, title: "Pemodelan Pencemaran Udara", href: null },
  { n: 9, title: "Peraturan dan Standar Pencemaran Udara", href: null },
  { n: 10, title: "Studi Kasus Pencemaran Udara", href: null }
];

/* Kata kunci (chips yang scroll ke subbab terkait) */
APP_DATA.KEYWORDS = [
  { t: "Smog", to: "#revolusi" },
  { t: "Inversi suhu", to: "#episode" },
  { t: "Meuse Valley 1930", to: "#episode" },
  { t: "Great Smog London", to: "#episode" },
  { t: "Haagen-Smit", to: "#fotokimia" },
  { t: "Pencemar sekunder", to: "#fotokimia" },
  { t: "Clean Air Act", to: "#regulasi" },
  { t: "NAAQS", to: "#regulasi" },
  { t: "Program Langit Biru", to: "#indonesia" },
  { t: "Karhutla", to: "#indonesia" },
  { t: "PM₂.₅", to: "#paradigma" },
  { t: "WHO AQG 2021", to: "#paradigma" },
  { t: "Citizen lawsuit", to: "#terkini" },
  { t: "Transboundary haze", to: "#indonesia" }
];

/* Data grafik (Chart.js) */
APP_DATA.CHART_KARHUTLA = {
  labels: ["1982/83", "1997/98", "2015", "2019", "2023"],
  data: [3.2, 11.7, 2.6, 1.65, 1.16],
  caption: "Grafik 1 — Luas karhutla besar Indonesia (juta ha). 1997/98 memakai estimasi Tacconi (2003); angka antarsumber berbeda menurut metode (pemantauan resmi dibandingkan dengan analisis independen). Sumber harus selalu dicantumkan."
};
APP_DATA.CHART_AQG = {
  labels: ["PM₂.₅ tahunan", "PM₁₀ tahunan", "NO₂ tahunan"],
  series: [
    { label: "WHO AQG 2005", data: [10, 20, 40] },
    { label: "WHO AQG 2021", data: [5, 15, 10] },
    { label: "PP 22/2021", data: [15, 40, 50] }
  ],
  caption: "Grafik 2 — Ambang tahunan (µg/m³); makin pendek batang, makin ketat. PP 22/2021 memakai waktu rata-rata berbeda untuk sebagian parameter — bandingkan hanya pada basis yang sama."
};

/* Pertanyaan diskusi (6 butir) + petunjuk singkat */
APP_DATA.DISKUSI = [
  { q: "Mengapa ketiga episode smog klasik (Meuse, Donora, London) lebih tepat dibaca sebagai 'bencana meteorologi + emisi' daripada sekadar 'kecelakaan industri'?", h: "Identifikasi peran inversi suhu, angin lemah, dan topografi cekungan/lembah dalam menahan emisi beberapa hari. Bandingkan dengan hari-hari normal di kota yang sama." },
  { q: "Dari kisah smog Los Angeles, jelaskan mengapa pengendalian satu prekursor (misalnya hanya NOₓ) belum tentu menurunkan konsentrasi ozon.", h: "Gunakan kerangka NOₓ–VOC–O₃: ozon merupakan produk reaksi dua prekursor. Diskusikan rezim terbatas-VOC dan terbatas-NOₓ." },
  { q: "Estimasi kematian Great Smog London berbeda jauh antara angka resmi (±4.000) dan estimasi modern (10.000–12.000). Apa sumber perbedaannya, dan pelajaran metodologis apa yang dapat ditarik untuk membaca statistik kesehatan publik?", h: "Bandingkan kematian langsung selama periode kabut dengan mortalitas berlebih pascaepisode (excess mortality) melalui model seri waktu. Tekankan pentingnya mencantumkan definisi dan metode." },
  { q: "Indonesia merupakan negara ASEAN terakhir yang meratifikasi AATHP (2014). Analisislah implikasi keterlambatan ratifikasi terhadap diplomasi kabut asap lintas batas.", h: "Analisis persoalan ini dengan mempertimbangkan kedaulatan, tanggung jawab regional, tekanan dari negara terdampak (Singapura dan Malaysia), serta penyebab karhutla yang melibatkan lintas pemangku kepentingan." },
  { q: "WHO AQG 2021 menetapkan PM₂.₅ tahunan 5 µg/m³, sedangkan baku mutu Indonesia (PP 22/2021) adalah 15 µg/m³. Mengapa keduanya tidak boleh dibandingkan secara langsung, dan apa implikasinya bagi Indonesia?", h: "WHO AQG tidak mengikat secara hukum, sedangkan baku mutu merupakan ambang legal. Nilai 15 µg/m³ setara Interim Target 3 WHO, yaitu tiga kali lebih longgar. Diskusikan pendekatan target antara secara bertahap." },
  { q: "Nilai luas karhutla antarsumber berbeda jauh (misalnya pada 2023: 1,16 juta ha menurut KLHK dan 2,13 juta ha menurut Greenpeace). Prinsip apa yang harus dipegang saat mengutip data pencemaran udara dalam laporan teknis?", h: "Selalu tampilkan rentang, sumber, dan metode pengukuran atau estimasi. Hindari penggunaan satu angka tanpa konteks." }
];

/* Latihan (5 butir) — bisa ditandai selesai (localStorage) */
APP_DATA.LATIHAN = [
  { t: "Susun garis waktu (timeline) pencemaran udara dari 1661 (Fumifugium) hingga 2021 (WHO AQG). Untuk setiap titik, tandai apakah ia peristiwa, bukti ilmiah, atau regulasi — lalu jelaskan urutan 'bencana → bukti → regulasi' yang terlihat.", tag: "Sintesis" },
  { t: "Pilih salah satu episode smog klasik (Meuse, Donora, atau London) dan susun analisis satu paragraf tentang mekanisme meteorologis yang memperparahnya, dengan menyebutkan sumber dan metode estimasi korbannya.", tag: "Analisis" },
  { t: "Bandingkan baku mutu PM₂.₅ tahunan WHO AQG 2005, WHO AQG 2021, dan PP 22/2021 dalam bentuk tabel, lalu hitung berapa kali lebih longgar baku mutu Indonesia terhadap AQG 2021.", tag: "Hitung" },
  { t: "Telusuri satu sumber pemberitaan atau dokumen tentang krisis udara Jakarta 2023 (ISPU, WFH, atau uji emisi), kemudian rangkum instrumen kebijakan yang diambil beserta evaluasi efektivitasnya.", tag: "Telusur" },
  { t: "Susun peta konsep yang menunjukkan bagaimana agenda udara bersih dan agenda iklim bertemu melalui konsep SLCP, lengkap dengan contoh konkret Indonesia (karhutla gambut).", tag: "Rancang" }
];

/* Daftar pustaka (dikelompokkan) */
APP_DATA.PUSTAKA = [
  { group: "Peraturan perundang-undangan & pedoman", items: [
    "World Health Organization. (2021). WHO global air quality guidelines: particulate matter (PM₂.₅ dan PM₁₀), ozone, nitrogen dioxide, sulfur dioxide, and carbon monoxide. Geneva, 22 September 2021.",
    "Peraturan Pemerintah No. 41 Tahun 1999 tentang Pengendalian Pencemaran Udara.",
    "Undang-Undang No. 32 Tahun 2009 tentang Perlindungan dan Pengelolaan Lingkungan Hidup.",
    "Peraturan Pemerintah No. 22 Tahun 2021 tentang Penyelenggaraan Perlindungan dan Pengelolaan Lingkungan Hidup (Lampiran VII — Baku Mutu Udara Ambien).",
    "Keputusan Presiden No. 23 Tahun 1990 dan Keputusan Menteri Negara Lingkungan Hidup No. 15 Tahun 1996 tentang Program Langit Biru.",
    "Putusan PN Jakarta Pusat No. 374/Pdt.G/LH/2019/PN.Jkt.Pst (16 Sept 2021); Putusan PT DKI No. 549/PDT.G-LH/2022/PT DKI (17 Okt 2022)."
  ] },
  { group: "Buku & artikel kunci", items: [
    "de Nevers, N. (2000). Air Pollution Control Engineering (2nd ed.). Waveland Press.",
    "Nemery, B., Hoet, P. H. M., & Nemmar, A. (2001). The Meuse Valley fog of 1930: an air pollution disaster. The Lancet, 357(9257), 704–708.",
    "Jacobs, E. T., Burgess, J. L., & Abbott, M. B. (2018). The Donora Smog Revisited. American Journal of Public Health, 108(S2).",
    "Flick, C. (1980). The Movement for Smoke Abatement in 19th-Century Britain. Technology and Culture, 21(1).",
    "Thorsheim, P. (2006). Inventing Pollution: Coal, Smoke, and Culture in Britain since 1800. Ohio University Press.",
    "Ross, K., Chmiel, J. F., & Ferkol, T. (2012). The impact of the Clean Air Act. The Journal of Pediatrics, 161(5).",
    "Pai, S. J., et al. (2022). Updated WHO Air Quality Guidelines: global exposure implications. Environmental Science & Technology Letters, 9.",
    "Health Effects Institute. (2023). State of Global Air — South Asia Regional Snapshot.",
    "Makarim, M. H. (2023). Pasca Putusan Pencemaran Udara di Jakarta. Jurnal Hukum Lingkungan Indonesia (ICEL)."
  ] }
];
