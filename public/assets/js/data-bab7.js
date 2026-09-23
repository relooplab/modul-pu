/**
 * data-bab7.js — semua konten editable Bab 7: Pemodelan Pencemaran Udara.
 * Sumber: "BAB 7 — Pemodelan Pencemaran Udara.md" (ikhtisar, ~834 baris)
 * dan "BAB_7_Pemodelan_Pencemaran_Udara.md" (lengkap, 390 baris, Draft Bab 7)
 * dengan pembedaan Fakta/Regulasi/Model/Analisis. Referensi: de Nevers Bab 6, Turner Workbook, US EPA Appendix W.
 */
window.APP_DATA = {};

APP_DATA.OBJECTIVES = [
  "Menjelaskan tujuan dan klasifikasi model kualitas udara serta memilih model berdasarkan kebutuhan perizinan, perencanaan, prakiraan, atau diagnosis masalah.",
  "Menurunkan dan menerapkan neraca massa model kotak tetap c = b + qL/(uH), τₐ=L/u dan menafsirkan perannya sebagai penapisan orde besaran serta sensitivitas terhadap u·H.",
  "Menjelaskan asumsi plume Gaussian, variabelnya (Q, u, Hₑ, σ_y, σ_z), koreksi refleksi tanah, dan batas penggunaannya.",
  "Menghitung konsentrasi garis tengah permukaan C(x,0,0)=Q/(πuσ_yσ_z)·exp(−Hₑ²/2σ_z²) dan menentukan jarak serta nilai maksimum (σ_z=H/√2) serta membedakan plume vs puff.",
  "Menjelaskan peran tinggi efektif Hₑ=h_s+Δh, kenaikan plume (Holland, Briggs, momentum vs daya apung F_b) dan koefisien dispersi σ=a x (1+bx)^{−c} berdasar stabilitas Pasquill–Gifford.",
  "Membedakan kegunaan AERMOD, AERSCREEN, CALPUFF, CALINE/RLINE, CMAQ/CAMx/WRF-Chem, serta PMF/CMB untuk masalah sumber dan skala yang berbeda.",
  "Menyusun kebutuhan data minimum inventaris emisi (g/s konsisten), meteorologi (AERMET/WRR), medan (AERMAP/DEMNAS), dan pengamatan, serta daftar audit masukan.",
  "Menghitung dan menafsirkan statistik evaluasi model, serta membedakan kalibrasi dari validasi untuk kebutuhan regulasi.",
  "Mengidentifikasi ketidakpastian (emisi, meteorologi, struktur, parameter, latar, pengamatan, numerik) dan menilai penggunaan ML/AI, fusi satelit, LCS, serta digital twin."
];

APP_DATA.GLOSSARY = {
  "box-model": {
    term: "Model kotak (box model)",
    en: "box model / fixed-box",
    def: "Kota sebagai kotak L×W×H_m tercampur sempurna; tunak c=b+qL/(uH); paling lemah pada asumsi pencampuran seragam, tak ada gradien dekat sumber."
  },
  "ventilation-coefficient": {
    term: "Koefisien ventilasi (Bab 6–7)",
    en: "ventilation coefficient",
    def: "u·H_m (m²/s); pada kotak, penyebut qL/(uH) adalah kebalikan intensitas; rendah→c tinggi (episode stagnasi)."
  },
  "gaussian-plume": {
    term: "Plume Gaussian",
    en: "Gaussian plume",
    def: "Solusi tunak adveksi–difusi: C=Q/(2πuσ_yσ_z)·exp(−y²/2σ_y²)·[exp(−(z−H_e)²/2σ_z²)+exp(−(z+H_e)²/2σ_z²)]; σ fungsi x & stabilitas."
  },
  "sigma-yz": {
    term: "σ_y, σ_z",
    en: "dispersion coefficients",
    def: "Simpangan baku sebaran lateral/vertikal; tumbuh dengan x; bentuk umum σ=a x(1+bx)^{−c} dengan tabel Pasquill–Gifford/Briggs rural vs urban; tak universal."
  },
  "he": {
    term: "Tinggi efektif H_e",
    en: "effective stack height",
    def: "H_e = h_s + Δh; Δh dari momentum & daya apung (F_b∝g v_s d_s²(T_s−T_a)/T_s); c_max ∝1/H_e² sehingga Δh sangat menentukan."
  },
  "plume-rise": {
    term: "Kenaikan plume Δh",
    en: "plume rise",
    def: "Kenaikan akibat momentum & keapungan; Holland (netral industri) & Briggs (buoyant F^{1/3}x^{2/3}/u) di AERMOD untuk PBL konvektif/stabil."
  },
  "puff": {
    term: "Puff Gaussian",
    en: "Gaussian puff",
    def: "Pelepasan sesaat massa M: C=M/(2π)^{3/2}σ_xσ_yσ_z·exp(−...); kontinu sebagai rangkaian puff ΔM=QΔt; cocok non-tunak, angin berubah."
  },
  "aermod": {
    term: "AERMOD",
    en: "AMS/EPA Regulatory Model",
    def: "Model plume tunak berbasis turbulensi PBL; preferred Appendix W 2006 mengganti ISC3 untuk near-field ≤50 km; sistem: AERMET (meteo), AERMAP (terrain), AERSURFACE, BPIPPRM, AERSCREEN."
  },
  "aerscreen": {
    term: "AERSCREEN",
    en: "AERSCREEN screening",
    def: "Penapisan berbasis AERMOD satu sumber; MAKEMET bangkitkan matriks meteo worst-case tanpa data per jam; hasil ≥ AERMOD terinci; konservatif."
  },
  "calpuff": {
    term: "CALPUFF",
    en: "CALPUFF",
    def: "Model puff Lagrangian non-tunak multi-lapis/spesies; preferred EPA LRT Apr 2003–Jan 2017, delisting 2017 diganti pendekatan screening; masih dapat sebagai alternatif/penapisan."
  },
  "caline": {
    term: "CALINE / R-LINE",
    en: "line source models",
    def: "CALINE4 (Caltrans) Gaussian garis + zona pencampuran kendaraan; CAL3QHC/QHCR + antrean; R-LINE (EPA) garis berbasis PBL AERMOD; CALINE4 kini hanya hot-spot CO di protokol Caltrans."
  },
  "ctm": {
    term: "CTM",
    en: "chemical transport model",
    def: "Model grid 3D transport+kimia: CMAQ, CAMx (OSAT/PSAT atribusi), WRF-Chem (online-coupled, kini tak dikembangkan aktif), NAQPMS; butuh emisi tergrid per jam, terspesiasi."
  },
  "pmf": {
    term: "PMF",
    en: "Positive Matrix Factorization",
    def: "Reseptor: X_ij=ΣG_ikF_kj+E_ij; PMF urai matriks data+ketidakpastian tanpa profil awal; butuh klasifikasi S/N, uji Q, bootstrap, rotasi; penamaan faktor butuh bukti eksternal."
  },
  "cmb": {
    term: "CMB",
    en: "Chemical Mass Balance",
    def: "Reseptor: butuh profil sumber lokal + spesiasi reseptor; EPA-CMB v8.2 effective-variance; gagal bila profil kolinear/tak lengkap."
  },
  "aermet": {
    term: "AERMET & AERMAP",
    en: "AERMET / AERMAP",
    def: "AERMET olah meteo permukaan+atas+permukaan menjadi parameter PBL per jam (H, L_MO, u*); AERMAP olah DEM (NED/ASTER/SRTM/DEMNAS 8 m) menjadi elevasi & hill-height."
  },
  "fb-nmse": {
    term: "FB & NMSE",
    en: "fractional bias / NMSE",
    def: "FB=2(P̄−Ō)/(P̄+Ō) ideal 0 (FB>0 = overprediksi); NMSE=overline{(O−P)²}/(ŌP̄) ideal 0; Chang & Hanna: baik bila |FB|≤0,67, NMSE≤1,5, FAC2≥0,5 (bukan regulasi)."
  },
  "ioa": {
    term: "IOA (Willmott)",
    en: "index of agreement",
    def: "d=1−Σ(P−O)²/Σ(|P−Ō|+|O−Ō|)², 0–1, ideal 1; sering tinggi, baca bersama bias & pencar."
  },
  "digital-twin": {
    term: "Digital twin udara",
    en: "air quality digital twin",
    def: "Integrasi emisi+meteo, CTM/dispersi, satelit, LCS, lalu lintas menjadi prakiraan probabilistik & skenario; kematangan: model digital → shadow (satu arah) → twin (dua arah) → twin operasional adaptif."
  }
};

APP_DATA.CHAPTERS = [
  { n: 1, title: "Sejarah Pencemaran Udara", href: "bab-1.html", current: false },
  { n: 2, title: "Konsep Dasar Penyebab Terjadinya Pencemaran Udara", href: "bab-2.html", current: false },
  { n: 3, title: "Sumber Pencemaran Udara", href: "bab-3.html", current: false },
  { n: 4, title: "Parameter Pencemaran Udara dan Pemantauan", href: "bab-4.html", current: false },
  { n: 5, title: "Dampak Pencemaran Udara", href: "bab-5.html", current: false },
  { n: 6, title: "Meteorologi dan Termodinamika Atmosfer", href: "bab-6.html", current: false },
  { n: 7, title: "Pemodelan Pencemaran Udara", href: "#top", current: true },
  { n: 8, title: "Peraturan dan Standar Pencemaran Udara", href: "bab-8.html" },
  { n: 9, title: "Teknologi Pengendalian Pencemaran Udara", href: "bab-9.html" },
  { n: 10, title: "Studi Kasus Pencemaran Udara", href: "bab-10.html" }
];

APP_DATA.KEYWORDS = [
  { t: "Box model c=b+qL/(uH)", to: "#kotak" },
  { t: "Gaussian plume & refleksi", to: "#gaussian" },
  { t: "σ_y, σ_z (Pasquill–Gifford)", to: "#gaussian" },
  { t: "H_e = h_s+Δh (Holland/Briggs)", to: "#gaussian" },
  { t: "Puff vs plume", to: "#gaussian" },
  { t: "AERMOD ≤50 km (2006)", to: "#regulasi" },
  { t: "AERSCREEN conservatif", to: "#regulasi" },
  { t: "CALPUFF delisting 2017", to: "#regulasi" },
  { t: "Sumber garis CALINE/R-LINE", to: "#garis" },
  { t: "CTM: CMAQ/CAMx/WRF-Chem", to: "#ctm" },
  { t: "PMF vs CMB", to: "#reseptor" },
  { t: "FB, NMSE, IOA, FAC2", to: "#evaluasi" },
  { t: "Digital twin & ML", to: "#terkini" },
  { t: "AERMET/AERMAP", to: "#data" }
];

APP_DATA.BOX = {
  defaultL: 20,
  defaultW: 10,
  defaultH: 500,
  defaultU: 3,
  defaultQ: 1.39e-6,
  defaultB: 12
};

APP_DATA.GAUSSIAN = {
  defaultQ: 10,
  defaultU: 5,
  defaultHe: 60,
  defaultStab: "C",
  briggs: {
    "A": { ay: 0.22, by: 0.0001, cy: 0.5, az: 0.20, bz: 0.0003, cz: 0.5 },
    "B": { ay: 0.16, by: 0.0001, cy: 0.5, az: 0.12, bz: 0.0003, cz: 0.5 },
    "C": { ay: 0.11, by: 0.0001, cy: 0.5, az: 0.08, bz: 0.0002, cz: 0.5 },
    "D": { ay: 0.08, by: 0.0001, cy: 0.5, az: 0.06, bz: 0.0015, cz: 0.5 },
    "E": { ay: 0.06, by: 0.0001, cy: 0.5, az: 0.03, bz: 0.0003, cz: 1.0 },
    "F": { ay: 0.04, by: 0.0001, cy: 0.5, az: 0.016, bz: 0.0003, cz: 1.0 }
  }
};

APP_DATA.CHART_GAUSS = {
  caption: "Grafik 7.1 — Profil konsentrasi garis tengah permukaan C(x,0,0) vs jarak (de Nevers Kotak 7.2). Maksimum terjadi saat σ_z≈H_e/√2; kelas tak stabil (A–B) puncak dekat & tinggi, stabil (E–F) puncak jauh & rendah."
};

APP_DATA.CHART_VAL = {
  labels: ["FB", "NMSE", "FAC2 target", "IOA"],
  data: [0.0, 0.01, 0.5, 0.99],
  caption: "Grafik 7.2 — Ilustrasi kriteria Chang & Hanna (|FB|≤0,67, NMSE≤1,5, FAC2≥0,5) dan hasil Contoh 7.3 (R≈0,974, NMSE≈0,008, d≈0,987, FB=0)."
};

APP_DATA.QUIZ = [
  {
    q: "Neraca massa box steady-state untuk pencemar inert (k=0) adalah…",
    options: ["c=b+qL/(uH)", "c=b·qL·uH", "c=Q/(πuσ_yσ_z)", "c=ΣG·F+E"],
    answer: 0,
    pembahasan: "Dari V dC/dt=E+uWH b−uWH c−kVC → tunak c_ss=(E+uWH b)/(uWH+kV); untuk k=0 dan E=qWL → c=b+qL/(uH). W hilang."
  },
  {
    q: "Persamaan konsentrasi permukaan garis tengah C(x,0,0) Gaussian yang benar adalah…",
    options: ["Q/(2πuσ_yσ_z)·exp(−H²/2σ_z²)", "Q/(πuσ_yσ_z)·exp(−H²/2σ_z²)", "Q·u·σ_y·σ_z·exp(H²)", "Q/(uHW)"],
    answer: 1,
    pembahasan: "Refleksi tanah menggandakan: z=0 → Q/(πuσ_yσ_z)·exp(−H_e²/2σ_z²); tanpa refleksi pembaginya 2π."
  },
  {
    q: "Maksimum konsentrasi di tanah untuk σ_y/σ_z konstan terjadi saat…",
    options: ["σ_z = H_e/√2 → c_max=2Q/(π e u H_e²)·(σ_z/σ_y)", "σ_z = 0", "σ_z → ∞", "σ_y = 0"],
    answer: 0,
    pembahasan: "Turunan C(x) nol → σ_z=H/√2; c_max berbanding 1/H² sehingga Δh sangat menentukan — dasar tall stack."
  },
  {
    q: "Status regulasi AERMOD & CALPUFF yang benar (Appendix W) adalah…",
    options: ["Keduanya preferred LRT", "AERMOD preferred near-field ≤50 km sejak 2006; CALPUFF delisting 2017 diganti pendekatan screening untuk LRT, tetap dapat sebagai alternatif/penapisan", "CALPUFF masih preferred LRT", "AERSCREEN adalah model CTM"],
    answer: 1,
    pembahasan: "AERMOD 9 Des 2006 ganti ISC3 ≤50 km; CALPUFF Apr 2003–Jan 2017 preferred LRT, delisting 2017; AERSCREEN penapisan ≥AERMOD."
  },
  {
    q: "Sumber garis jalan raya yang benar adalah…",
    options: ["Hanya CALINE4 untuk semua polutan", "CALINE4 hot-spot CO, R-LINE berbasis AERMOD untuk gradien tajam, AERMOD LINE/RLINE dalam mode regulatory default (2024)", "Tidak ada model garis", "Gaussian puff untuk jalan"],
    answer: 1,
    pembahasan: "Caltrans: CALINE4 hanya CO hot-spot; revisi Appendix W 2017 ganti CALINE3→AERMOD untuk mobile detail; R-LINE/PBL-R-LINE untuk dekat jalan; W≈ tip."
  },
  {
    q: "Statistik evaluasi model dispersi yang ideal dan kriterianya adalah…",
    options: ["R=1, FB=0, NMSE=0, IOA=1, FAC2=1; baik bila |FB|≤0,67, NMSE≤1,5, FAC2≥0,5 (Chang & Hanna)", "R=0 ideal", "FB=1 ideal", "NMSE ideal 1"],
    answer: 0,
    pembahasan: "R ideal 1, FB 0 (−2..2), NMSE 0, IOA 1, FAC2 1; ambang Chang & Hanna adalah konvensi komunitas, bukan regulasi."
  }
];

APP_DATA.DISKUSI = [
  { q: "Bandingkan asumsi box model (campur sempurna, tak ada gradien) dengan kondisi pesisir dan lembah. Kapan c=b+qL/(uH) masih berguna dan kapan harus beralih ke Gaussian?", h: "Berguna untuk screening orde besaran & sensitivitas u·H; gagal pada gradien dekat sumber, topografi/pantai, kimia sekunder — butuh dispersi spasial." },
  { q: "Mengapa hasil AERSCREEN selalu ≥ AERMOD dan kapan konservatisme itu membantu regulator?", h: "AERSCREEN pakai matriks meteo worst-case MAKEMET tanpa data per jam → konservatif; membantu penapisan awal ‘apakah berpotensi penting?’ sebelum kajian terinci." },
  { q: "Jelaskan konsekuensi delisting CALPUFF 2017 bagi kajian kabut asap lintas batas di Indonesia.", h: "LRT 50+ km kini lewat pendekatan screening atau alternative model dengan persetujuan EPA Regional Office; bukan larangan — pakai justifikasi kasus per kasus." },
  { q: "Mengapa CTM (CMAQ/CAMx/WRF-Chem) diperlukan untuk O₃ dan PM sekunder, sementara Gaussian inert gagal?", h: "Gaussian tak ada kimia; CTM selesaikan adveksi+difusi+reaksi gas/aerosol+fotosintesis pada grid 3D, butuh emisi terspesiasi per jam/grid, kondisi batas." },
  { q: "PMF butuh banyak sampel+ketidakpastian tanpa profil, CMB butuh profil lokal. Bandingkan kebutuhan data Bandung (PMF) vs regulasi yang butuh atribusi tegas.", h: "PMF: S/N, Q, bootstrap, rotasi, penamaan fakto butuh bukti eksternal; CMB: profil kolinear gagal; PMF eksploratif, CMB konfirmatori bila profil kuat." },
  { q: "Rancang validasi AERMOD PLTD Indonesia: tentukan latar, resepktor sensitif, statistik FB/NMSE/IOA/FAC2, dan bedakan hasil ‘model cocok’ vs ‘kecocokan semu’ dari inventaris emisi yang salah satuan (mg/Nm³ vs g/s).", h: "Garbage in garbage out: audit satuan g/s konsisten, basis kering/basah, koreksi O₂, zona waktu, datum/UTM, reproduksibilitas." }
];

APP_DATA.LATIHAN = [
  { t: "Kota persegi 10×10 km, q=2×10⁻⁶ g·s⁻¹·m⁻², u=2 m/s, H=800 m, b=10 µg/m³. Hitung c rata-rata kota; ulang bila u=1 m/s dan kaitkan dengan episode stagnasi Bab 6.6 dan Contoh 7.1 (20 km/500 m/3 m/s).", tag: "Kotak" },
  { t: "Dengan Pers. Gaussian dan Briggs kelas D (σ_y=0,08x(1+0,0001x)^{−1/2}, σ_z=0,06x(1+0,0015x)^{−1/2}), hitung C di tanah pada x=1 & 3 km untuk Q=50 g/s, u=5 m/s, H=100 m; tentukan x_max numerik.", tag: "Gaussian" },
  { t: "Bandingkan AERSCREEN vs AERMOD untuk satu cerobong 60 m: jelaskan mengapa AERSCREEN menghasilkan maksimum 1-jam yang lebih tinggi dan kapan faktor konversi ke 24-jam/tahunan dipakai.", tag: "Regulasi" },
  { t: "Untuk ruas 1 km dengan 2.000 mobil (EF NOₓ 0,5) + 200 truk (4 g/km·jam), hitung E_ruas dan q_L (g·m⁻¹·s⁻¹); diskusikan mengapa ini NOₓ sebagai spesies faktor emisi, bukan langsung NO₂.", tag: "Garis" },
  { t: "Susun rantai CTM: meteorologi WRF → præproses → emisi terspesiasi (SMOKE/FUME) → CTM → peta O₃; jelaskan mengapa	grid 1 km tetap merata-ratakan plume dan kapan perlu plume-in-grid.", tag: "CTM" },
  { t: "Evaluasi 4 pasang data Latihan (20→22, 30→28, 40→44, 50→46): hitung R, FB, NMSE, d (Willmott) dan nilai apakah ‘baik’ menurut Chang & Hanna; laporkan ketidakpastian dominannya.", tag: "Evaluasi" }
];

APP_DATA.PUSTAKA = [
  { group: "Buku & dasar teori", items: [
    "de Nevers, N. Air Pollution Control Engineering, 2nd ed., Bab 6 Concentration Models.",
    "Turner, D.B. Workbook of Atmospheric Dispersion Estimates, 2nd ed.; NOAA READY Gaussian Plume.",
    "Cooper & Alley — kerangka meteorologi bab 6 (wind, stabilitas) sebagai masukan model Bab 7.",
    "Seinfeld & Pandis — kimia atmosfer (SALR detail, PM sekunder).",
    "Buku Ajar Bab 6: stabilitas, PBL, visibilitas Koschmieder."
  ] },
  { group: "Regulasi & dokumen EPA", items: [
    "US EPA Appendix W 40 CFR Part 51 Guideline on Air Quality Models — 89 FR 95034, 29 Nov 2024 (AERMOD enhancements).",
    "US EPA SCRAM — Preferred & Recommended Models; Screening Models (AERSCREEN).",
    "EPA AERMOD 21112 (Mei 2021), Lakes AERMOD View Regulatory Default.",
    "Appendix W 2017 final rule — delisting CALPUFF 17 Jan 2017; status sebagai screening/alternative.",
    "US EPA Ireland AG4 & Portelli & Lewis VC <6.000 m²/s; Tang et al. 2019 ACP VC Beijing."
  ] },
  { group: "Studi Indonesia & kasus", items: [
    "PLTD Ampenan (2026) AERMOD musiman + 3 titik validasi; Auxiliary Boiler Bontang (2022) AERMOD 6,26 µg/m³; RS Pupuk Kaltim (2025) insinerator 14 m; Meti-lis Pontianak (2017) RMSPE<10%.",
    "Simpang Lima Mandai Makassar (2026) AERMOD garis 348,8 µg/m³ (1-jam) & 82,49 (24-jam) NO₂; faktor EMEP/EEA 2019 & MOVES.",
    "PMF Bandung (2008) Atmospheric Environment; ITB–Vital Strategies Jakarta 2025 (CCAC) & EGU25-16932 CBPF.",
    "LSTM Jakarta (2023) & ARIMAX-LSTM ISPU (2024); LCS Juliaca-Peru + AERMOD brick kilns.",
    "Digital twin reviews: Discover Environment 2025 & Front. Sustain. Cities 3,786563; FUME 2.0 (Benešová 2024)."
  ] }
];
