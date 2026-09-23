/**
 * data-bab5.js — semua konten editable Bab 5: Dampak Pencemaran Udara.
 * Sumber: "bab 5 pu.md" (ringkas, 166 baris) dan
 * "BAB5_Dampak_Pencemaran_Udara_draft.md" (lengkap, 326 baris, Draft Bab 5)
 * dengan pembedaan Fakta/Regulasi/Model/Analisis. Kondisi acuan 25 °C, 1 atm.
 */
window.APP_DATA = {};

APP_DATA.OBJECTIVES = [
  "Menjelaskan rantai dari emisi hingga dosis dan memperkirakan fraksi deposisi inhalasi (ET, TB, dan AI) berdasarkan diameter aerodinamik dengan model ICRP HRTM.",
  "Membedakan dampak kesehatan akut (jam–hari) dan kronis (tahun–dekade) serta dasar klasifikasi karsinogenisitas IARC Grup 1 untuk polusi udara/PM.",
  "Menginterpretasikan estimasi beban penyakit global dan nasional beserta sumber ketidakpastiannya.",
  "Mengidentifikasi kelompok rentan (anak, ibu hamil/janin, lansia, pekerja luar ruang, komorbid) dan implikasi dosimetrinya.",
  "Menjelaskan dampak pencemaran udara terhadap ekosistem, material, jarak pandang, serta interaksinya dengan perubahan iklim.",
  "Menghubungkan dampak sosial-ekonomi dan perkembangan ilmiah terkini dengan kebutuhan pengelolaan kualitas udara yang adil dan berbasis bukti."
];

APP_DATA.GLOSSARY = {
  "hrtm": {
    term: "HRTM / ICRP66",
    en: "Human Respiratory Tract Model",
    def: "Model ICRP Publikasi 66 (1994) yang membagi saluran napas menjadi ET (ekstratoraks/kepala), TB (trakeobronkial), dan AI (alveolar–interstitial); dasar perhitungan fraksi deposisi DF(d_ae) dan klirens."
  },
  "dosis-terdeposisi": {
    term: "Dosis terdeposisi",
    en: "deposited dose",
    def: "Massa partikel yang mengendap di kompartemen saluran napas: D = C × VE × t × DF(d_ae); berbeda dari konsentrasi ambien (C) karena DF dan ventilasi."
  },
  "kurva-u": {
    term: "Kurva U deposisi",
    en: "U-shaped deposition curve",
    def: "Pola non-monoton: partikel >4 µm dan <0,002 µm tinggi di ET; minimum total sekitar 0,3–0,5 µm (celah difusi–sedimentasi); 0,1–2,5 µm dominan AI."
  },
  "iarc-grup1": {
    term: "IARC Grup 1",
    en: "IARC Group 1 carcinogen",
    def: "Klasifikasi WHO/IARC Oktober 2013: polusi udara luar ruang dan PM-nya sebagai karsinogenik bagi manusia (kanker paru) — hazard identification, bukan ambang aman."
  },
  "gbd": {
    term: "GBD / SoGA",
    en: "Global Burden of Disease",
    def: "Kerangka comparative risk assessment IHME/HEI: estimasi kematian teratribusi = paparan × fungsi risiko × mortalitas dasar; SoGA 2025: 7,9 juta (2023), 4,9 juta dari PM2,5."
  },
  "daly": {
    term: "DALY",
    en: "disability-adjusted life years",
    def: "Tahun hidup hilang akibat sakit/disabilitas + kematian prematur; GBD Jakarta 2019: 168.000 DALY untuk 5.054 kematian."
  },
  "rentan": {
    term: "Kelompok rentan",
    en: "susceptible groups",
    def: "Anak (ventilasi/kg tinggi, jalan napas sempit), ibu hamil/janin (VE +40–50%), lansia (>60 th, 95% kematian NCD), pekerja luar ruang, dan komorbid — menerima dosis lebih besar pada C sama."
  },
  "deposisi-asam": {
    term: "Deposisi asam",
    en: "acid deposition",
    def: "SO₂/NOx → H₂SO₄/HNO₃ → hujan asam (pH<5,6) dan kering; merusak danau/hutan via pencucian Ca/Mg dan mobilisasi Al; 87,9% hujan AS pH<5,6 (1978–2017)."
  },
  "critical-load": {
    term: "Critical load",
    en: "critical load",
    def: "Ambang deposisi N/S yang dapat ditoleransi ekosistem tanpa efek merugikan; 7–17% ekosistem asam dan 7–18% eutrofikasi melampaui secara global."
  },
  "visibilitas": {
    term: "Visibilitas (Koschmieder)",
    en: "visibility / Koschmieder",
    def: "Lv ≈ 3,9 / b_ext; partikel 0,1–1 µm (sulfat/nitrat/BC) hamburkan Mie paling efisien; keluhan publik pertama polusi udara."
  },
  "slcp": {
    term: "SLCP",
    en: "short-lived climate pollutants",
    def: "Black carbon, ozon troposfer, metana, HFC — umur hari–dekade; pengendalian memberi co-benefit iklim–kesehatan jangka pendek."
  },
  "unmasking": {
    term: "Unmasking aerosol",
    en: "aerosol unmasking",
    def: "Pengurangan sulfat pendingin membuka pemanasan GRK yang terselubung: −1,1 W/m² pendinginan dapat terbuka hingga ±1 W/m²; bukan alasan menahan pengendalian SO₂."
  },
  "keadilan-lingkungan": {
    term: "Keadilan lingkungan",
    en: "environmental justice / triple jeopardy",
    def: "Pajanan lebih tinggi + kerentanan lebih besar + akses mitigasi lebih rendah pada komunitas miskin; 716 juta miskin ekstrem (<US$1,90) di wilayah tidak aman."
  },
  "no-threshold": {
    term: "No-threshold (PM2,5)",
    en: "no-threshold effect",
    def: "Kurva konsentrasi–respons PM2,5 tanpa ambang aman; risiko naik bahkan di bawah 5 µg/m³; kontrafaktual GBD 2,4–5,9 µg/m³."
  },
  "mikroplastik-inhalasi": {
    term: "Mikroplastik inhalasi",
    en: "inhaled microplastics",
    def: "MP <2,5 µm respirabel ke alveoli (Jenner 2022: 39 MP/13 paru, 0,69/g); bukti hazard in vitro/in vivo (inflamasi, fibrosis tikus); bukti klinis populasi umum belum cukup (2026)."
  },
  "karhutla-dampak": {
    term: "Dampak karhutla",
    en: "peat fire health impacts",
    def: "Estimasi Koplitz 2016: 100.300 kematian prematur 2015 (91.600 ID); reanalisis 2024: 51.377 (2019) & 75.014 (2015) Sumatera–Kalimantan — estimasi model, bukan hitungan kasus."
  },
  "baku-mutu-vs-aqg": {
    term: "Baku mutu vs AQG",
    en: "standard vs guideline",
    def: "PP 22/2021 PM2,5 15 vs WHO AQG 5 µg/m³ (3×); IT-1 35 sebagai tangga interim pertama."
  }
};

APP_DATA.CHAPTERS = [
  { n: 1, title: "Sejarah Pencemaran Udara", href: "bab-1.html", current: false },
  { n: 2, title: "Konsep Dasar Penyebab Terjadinya Pencemaran Udara", href: "bab-2.html", current: false },
  { n: 3, title: "Sumber Pencemaran Udara", href: "bab-3.html", current: false },
  { n: 4, title: "Parameter Pencemaran Udara dan Pemantauan", href: "bab-4.html", current: false },
  { n: 5, title: "Dampak Pencemaran Udara", href: "#top", current: true },
  { n: 6, title: "Meteorologi dan Termodinamika Atmosfer", href: "bab-6.html" },
  { n: 7, title: "Pemodelan Pencemaran Udara", href: "bab-7.html" },
  { n: 8, title: "Peraturan dan Standar Pencemaran Udara", href: "bab-8.html" },
  { n: 9, title: "Teknologi Pengendalian Pencemaran Udara", href: "bab-9.html" },
  { n: 10, title: "Studi Kasus Pencemaran Udara", href: "bab-10.html" }
];

APP_DATA.KEYWORDS = [
  { t: "HRTM (ET/TB/AI)", to: "#jalur" },
  { t: "Kurva U (0,3–0,5 µm)", to: "#jalur" },
  { t: "IARC Grup 1", to: "#kesehatan" },
  { t: "GBD 7,9 juta (2023)", to: "#beban" },
  { t: "Jakarta >10.000/tahun", to: "#beban" },
  { t: "Kelompok rentan", to: "#rentan" },
  { t: "Deposisi asam pH<5,6", to: "#ekosistem" },
  { t: "Critical load", to: "#ekosistem" },
  { t: "Visibilitas Koschmieder", to: "#material" },
  { t: "Aerosol −1,1 W/m² & unmasking", to: "#iklim" },
  { t: "Co-benefit SLCP", to: "#iklim" },
  { t: "US$8,1 triliun & triple jeopardy", to: "#sosial" },
  { t: "No-threshold 5 µg/m³", to: "#terkini" },
  { t: "Karhutla 100.300", to: "#terkini" }
];

APP_DATA.DOSIS = {
  defaultC: 35.5,
  defaultVE: 0.9,
  defaultT: 24,
  defaultDF: 0.25,
  defaultWeight: 70
};

APP_DATA.CHART_BEBAN = {
  labels: ["WHO 4,2 (2019 ambien)", "WHO 6,7 (gabungan)", "GBD 2019 6,4 (PM2,5)", "SoGA 2025 7,9 (2023)"],
  data: [4.2, 6.7, 6.4, 7.9],
  caption: "Grafik 5.1 — Estimasi kematian teratribusi polusi udara global (juta/tahun). Beda tahun, cakupan (ambien saja vs gabungan), dan kurva risiko (IER vs MR-BRT) — jangan dicampur; cantumkan metode."
};

APP_DATA.CHART_KARHUTLA = {
  labels: ["Koplitz 2015 (100.300)", "CAMS 2015 (75.014 S-K)", "CAMS 2019 (51.377 S-K)"],
  data: [100.3, 75.014, 51.377],
  useThousand: true,
  caption: "Grafik 5.2 — Estimasi model kematian prematur karhutla (ribu jiwa). Koplitz 2016 (SE Asia 2015) dan Nature 2024 reanalisis CAMS EAC4 (Sumatera–Kalimantan). Angka resmi 24 jiwa adalah hitungan kasus klinis — skala dan jenis data berbeda, tak diplot se-batang."
};

APP_DATA.QUIZ = [
  {
    q: "Persamaan dosis terdeposisi alveolar yang benar dan alasan DF bergantung ukuran adalah…",
    options: ["D=C×VE×t×DF(d_ae); karena impaksi (besar), sedimentasi (menengah), difusi Brown (ultrahalus) menghasilkan kurva U", "D=C×t saja; DF konstan", "D=C/VE; DF tidak relevan", "D=DF×t saja"],
    answer: 0,
    pembahasan: "D=C×VE×t×DF(d_ae); DF ditentukan mekanisme: impaksi ET (>0,5 µm), sedimentasi TB, difusi AI (<0,1 µm); minimum total ±0,3–0,5 µm — membenarkan PM2,5 sebagai proksi alveolar."
  },
  {
    q: "Makna IARC Grup 1 untuk polusi udara/PM (Oktober 2013) yang tepat adalah…",
    options: ["Ada ambang aman 10 µg/m³", "Kekuatan bukti karsinogenik cukup pada manusia untuk kanker paru — hazard identification, bukan batas aman", "Hanya risiko kanker kandung kemih", "Sama dengan baku mutu PP 22/2021"],
    answer: 1,
    pembahasan: "Grup 1 = cukup bukti karsinogenik (kanker paru) + hewan + mekanistik; rokok dan polusi sama-sama Grup 1 tetapi risiko individual berbeda karena dosis."
  },
  {
    q: "Angka kematian teratribusi global 4,2 / 6,7 / 7,9 juta yang berbeda disebabkan oleh…",
    options: ["Kesalahan hitung", "Perbedaan tahun, cakupan polutan, kurva risiko (IER vs MR-BRT), dan kontrafaktual — estimasi model, bukan hitungan kasus", "WHO vs GBD salah satu pasti salah", "Hanya perbedaan pembulatan"],
    answer: 1,
    pembahasan: "Estimasi comparative risk assessment: paparan (monitor+model+satelit) × fungsi risiko × mortalitas dasar; tahun, polutan, kurva, dan Tmrel (2,4–5,9) berbeda menghasilkan angka berbeda."
  },
  {
    q: "Kelompok dengan dosis per kg bobot badan terbesar pada C sama adalah…",
    options: ["Dewasa 70 kg istirahat", "Anak 25 kg dengan ventilasi/kg tinggi dan jalan napas sempit, atau pekerja luar ruang ventilasi tinggi + napas mulut", "Lansia 60 kg istirahat saja", "Ibu hamil tidak berbeda"],
    answer: 1,
    pembahasan: "Anak: VE/kg tinggi + sempit → DF tinggi; pekerja luar ruang: VE tinggi + bypass hidung → dosis AI besar; ibu hamil VE +40–50% meningkatkan dosis."
  },
  {
    q: "ERF aerosol total −1,1 W/m² (IPCC AR6) dan unmasking berarti…",
    options: ["Pengendalian SO₂ tidak perlu", "Sulfat mendinginkan; bila dikurangi pendinginan terbuka hingga ±1 W/m² — mitigasi GRK harus lebih cepat, co-benefit SLCP (BC/metana/O₃) memberi win-win", "Ozon mendinginkan", "BC mendinginkan"],
    answer: 1,
    pembahasan: "Aerosol −1,1 menutupi pemanasan GRK; black carbon +0,11 dan ozon +0,47 memanaskan; unmasking bukan argumen menahan SO₂."
  },
  {
    q: "Pernyataan mikroplastik inhalasi yang sesuai bukti Agustus 2026 adalah…",
    options: ["Sudah ada kohort epidemiologis yang mengaitkan MP dengan PPOK populasi umum", "MP respirabel <2,5 µm terbukti di jaringan paru (Jenner 2022, Vasse 2024), tetapi bukti klinis populasi umum belum cukup — butuh kontrol blanko dan standar ukuran", "MP tidak mencapai alveoli", "MP tidak ada di udara"],
    answer: 1,
    pembahasan: "Jenner 2022: 39 MP/13 paru; Vasse 2024: respirabel <2,5 µm; batas bukti: tanpa kohort, μFTIR ±3 µm tak tangkap nanoplastik."
  }
];

APP_DATA.DISKUSI = [
  { q: "Jelaskan mengapa kurva deposisi berbentuk U dan makna minimum ±0,3–0,5 µm bagi pemilihan masker dan definisi PM2,5.", h: "Gunakan 3 mekanisme: impaksi (besar ET), sedimentasi (0,5–5 µm TB–AI), difusi (<0,1 µm naik kembali); celah 0,3–0,5 µm adalah partikel paling sulit ditangkap — alasan N95 diuji pada 0,3 µm dan mengapa PM2,5 mewakili akumulasi." },
  { q: "Bandingkan IARC Grup 1 (hazard) dengan baku mutu PP 22/2021 (risk/standar). Mengapa keduanya tidak saling menggantikan?", h: "Grup 1 = ada bukti karsinogenik; baku mutu = ambang kebijakan dengan pertimbangan dosis–respons, ekonomi, dan kelayakan. Tidak ada ambang aman PM2,5 → baku mutu adalah interim yang diterima." },
  { q: "Mengapa WHO 6,7 juta, GBD 6,4 juta, dan SoGA 7,9 juta dapat berbeda? Rancang tabel cantuman wajib (tahun, polutan, metode, kurva, Tmrel) untuk laporan.", h: "Tahun 2012 vs 2019 vs 2023; ambien saja vs gabungan; IER vs MR-BRT; kontrafaktual 2,4–5,9 µg/m³; bedakan estimasi model vs hitungan kasus ISPA Riau 29.528." },
  { q: "Hitung perbandingan dosis per kg antara pekerja luar ruang (55 µg/m³, VE 1,5 m³/jam, 8 jam, 70 kg) dan anak (35 µg/m³, VE 0,5 m³/jam, 24 jam, 25 kg) dengan DF alveolar 0,25. Apa implikasi keadilan?", h: "Gunakan D=C×VE×t×0,25 / berat; anak dan pekerja menerima per kg lebih tinggi → prioritas intervensi dan standar okupasional (168 vs 40 jam/minggu) vs ambien." },
  { q: "Jelaskan paradoks unmasking dan rancang argumen co-benefit: mengapa pengendalian BC/metana memberi win-win sedangkan SO₂ butuh barengan GRK?", h: "Sulfat −1,1 pendinginan vs BC +0,11 dan O₃ +0,47 pemanasan; kurangi BC/metana = kesehatan+iklim; kurangi SO₂ = buka pemanasan hingga ±1 W/m²." },
  { q: "Untuk karhutla 2015, klasifikasikan: (a) 43 juta terpapar, (b) 100.300 kematian, (c) US$16,1 miliar, (d) penolakan pemerintah — sebagai fakta pemantauan, estimasi model, atau penilaian kebijakan, dan jelaskan ketegangannya.", h: "(a) model paparan satelit, (b) estimasi epidemiologis (26.300–174.300), (c) estimasi ekonomi Bank Dunia, (d) respons kebijakan — ketegangan sains–kebijakan Koplitz vs pernyataan resmi." }
];

APP_DATA.LATIHAN = [
  { t: "Hitung dosis alveolar harian pekerja (C 55 µg/m³, VE 1,5 m³/jam, 8 jam, DF 0,25) vs anak sekolah (C 35 µg/m³, VE 0,5 m³/jam, 24 jam setara, DF 0,25). Nyatakan per kg (70 vs 25 kg) dan diskusikan kelompok rentan 5.4.", tag: "Dosimetri" },
  { t: "Gambar sketsa kurva U deposisi total vs d_ae (log scale 0,001–100 µm) dan tandai zona ET/TB/AI serta minimum 0,3–0,5 µm; kaitkan dengan efisiensi masker dan PM2,5.", tag: "Sketsa" },
  { t: "Replikasi tabel beban global: WHO 4,2 (ambien 2019), WHO 6,7 (gabungan), GBD 6,4 (PM2,5 2019), SoGA 7,9 (2023). Jelaskan tiga sumber perbedaan metodologis dan buat sitasi lengkap.", tag: "Interpretasi" },
  { t: "Bandingkan baku mutu PM2,5 tahunan Indonesia 15 vs WHO 5 vs IT-1 35 µg/m³: hitung selisih relatif dan rumuskan argumen ilmiah pengetatan bertahap berbasis no-threshold 2,4–5,9 µg/m³.", tag: "Regulasi" },
  { t: "Jelaskan dampak karhutla: buat peta sebab-akibat deposisi asam (pH<5,6, 87,9% hujan AS) → pencucian Ca/Mg → Al toksik → dampak danau vs eutrofikasi N (critical load 7–18%) di perairan pesisir.", tag: "Ekosistem" },
  { t: "Analisis kasus 2015: bedakan fakta (19 kematian resmi, 500 ribu ISPA) vs estimasi (100.300 Koplitz, 75.014 CAMS) dan nilai kebijakan pencegahan kebakaran sebagai intervensi kesehatan.", tag: "Kasus" }
];

APP_DATA.PUSTAKA = [
  { group: "Peraturan & pedoman", items: [
    "PP No. 22 Tahun 2021, Lampiran VII — Baku Mutu Udara Ambien (kondisi acuan 25 °C, 1 atm).",
    "WHO (2021). WHO Global Air Quality Guidelines: PM2,5, PM10, O₃, NO₂, SO₂, CO. ISBN 9789240034228.",
    "US EPA — FRM/FEM dan SNI 7119 (ambien) / SNI 7117 (emisi); isop: Permen LHK P.14/2020 (ISPU).",
    "Konvensi Minamata (Hg, UU 11/2017) dan Stockholm (POPs dioksin/furan, TEQ WHO)."
  ] },
  { group: "Buku & model dosimetri", items: [
    "ICRP Publication 66 (1994). Human Respiratory Tract Model (HRTM): ET/TB/AI, DF(d_ae), klirens.",
    "Lazaridis, M. (2023). Modelling approaches to particle deposition and clearance. Springer.",
    "Mintis et al. (2025). LungDepo regional deposition. Environ. Sci.: Atmos. 5, 3921.",
    "de Nevers, N. (2000). Air Pollution Control Engineering, 2nd ed. Bab 2: Effects.",
    "Seinfeld & Pandis (2016). Atmospheric Chemistry and Physics, 3rd ed. (mode, waktu tinggal)."
  ] },
  { group: "Beban penyakit", items: [
    "WHO (2014). 7 million premature deaths (2012: 3,7 ambien + 4,3 rumah tangga); WHO factsheet 6,7 juta (4,2 ambien + 3,2 rumah tangga; >99% di atas pedoman).",
    "HEI & IHME. State of Global Air 2025 (1990–2023): 7,9 juta (86% NCD), 4,9 juta PM2,5; PM2,5 fact sheet; GBD 2023.",
    "Syuhada et al. (2023). Impacts of Air Pollution on Health and Cost of Illness in Jakarta. IJERPH 20, 2916 (>10.000 kematian/tahun, DALY 168.000).",
    "Clean Air Fund — Indonesia: ~10% kematian 2021; WHO South-East Asia; IHME GBD tools.",
    "Pedersen et al. (ESCAPE, 2013). Low birthweight & PM2,5. Lancet Respir. Med."
  ] },
  { group: "IARC & ekosistem–iklim–ekonomi", items: [
    "IARC (17 Oct 2013). Outdoor air pollution & PM as Group 1; Loomis et al. Lancet Oncology 2013; Monographs Vol.109 (2015): 223.000 kanker paru 2010.",
    "US EPA: Effects of Acid Rain; Driscoll et al. BioScience 2001; Bouwman et al. (critical load 7–17%/7–18%); Prakash 2022 (rain pH).",
    "IPCC AR6 WG1 (2021): ERF 2,72 total, −1,1 aerosol, 0,47 ozon, 0,11 BC; Farago 2025; Samset/CNRS unmasking ±1 W/m²; CCAC co-benefit.",
    "World Bank (2022). Global Health Cost of PM2,5: US$8,1T 6,1% PDB (2019); Bank Dunia/OECD 2019; DKI 2,94M (2,2% GRDP).",
    "Rentschler & Leonova (2023). Global exposure & poverty. Nat. Commun. 14, 4432; Jenner 2022 (μFTIR paru), Vasse 2024 (ERS). Koplitz 2016 (100.300), CAMS 2024 (51.377/75.014), BNPB/Bank Dunia cost fire US$16,1B."
  ] }
];
