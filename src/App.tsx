import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// --- DUMMY DATA BATUNUNGGAL ---
const dataPenduduk = [
  { kelurahan: "Batununggal", jumlah: 18200 },
  { kelurahan: "Mengger", jumlah: 14500 },
  { kelurahan: "Wates", jumlah: 12300 },
  { kelurahan: "Gumuruh", jumlah: 16800 },
  { kelurahan: "Binong", jumlah: 21000 },
  { kelurahan: "Maleer", jumlah: 19400 },
  { kelurahan: "Samoja", jumlah: 16200 },
];

const dataPekerjaan = [
  { name: "Karyawan Swasta", value: 42, color: "#059669" },
  { name: "Wiraswasta / UMKM", value: 28, color: "#0284c7" },
  { name: "PNS / TNI / Polri", value: 15, color: "#4f46e5" },
  { name: "Lainnya", value: 15, color: "#64748b" },
];

const aparatList = [
  {
    nama: "Drs. Subarna, M.Si",
    jabatan: "Camat Batununggal",
    foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80",
    tier: "Utama",
  },
  {
    nama: "Rina Herlina, S.STP",
    jabatan: "Sekretaris Camat",
    foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    tier: "Sekretaris",
  },
  {
    nama: "Ahmad Fauzi, S.E",
    jabatan: "Kasi Pemerintahan",
    foto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
    tier: "Kasi",
  },
  {
    nama: "Siti Rahmawati, S.Sos",
    jabatan: "Kasi Pemberdayaan Masyarakat",
    foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80",
    tier: "Kasi",
  },
];

// Data Berita
const beritaList = [
  {
    id: 1,
    judul: "Kerja Bakti Massal Penataan Saluran Air Antisipasi Musim Hujan",
    tanggal: "20 Juli 2026",
    kategori: "Lingkungan",
    gambar:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&auto=format&fit=crop&q=80",
    ringkasan:
      "Warga serentak membersihkan drainase utama di wilayah Kelurahan Binong dan Samoja.",
    isi: "Dalam rangka mengantisipasi datangnya musim hujan, pihak Kecamatan Batununggal menggalakkan aksi kerja bakti serentak di 8 Kelurahan. Kegiatan difokuskan pada pembersihan gorong-gorong utama, pemangkasan pohon rawan tumbang, serta edukasi pemilahan sampah organik dan anorganik. Camat Batununggal menyampaikan apresiasi tinggi atas kegotongroyongan warga yang terus terjaga.",
  },
  {
    id: 2,
    judul: "Bazar UMKM Kecamatan Batununggal Resmi Dibuka Pekan Ini",
    tanggal: "18 Juli 2026",
    kategori: "Ekonomi",
    gambar:
      "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=500&auto=format&fit=crop&q=80",
    ringkasan:
      "Menampilkan lebih dari 50 produk unggulan lokal mulai dari kuliner hingga kerajinan tangan.",
    isi: "Pemerintah Kecamatan Batununggal bekerja sama dengan penggerak UMKM menggelar Pesta Bazar Produk Lokal. Acara ini menjadi wadah promosi bagi pelaku usaha mikro untuk memamerkan ragam olahan kuliner nusantara, kain batik khas, hingga kerajinan berbahan daur ulang. Bazar ini berlangsung selama tiga hari dan terbuka gratis untuk umum.",
  },
  {
    id: 3,
    judul: "Sosialisasi Program Pembuatan KTP Digital (IKD) Gratis",
    tanggal: "15 Juli 2026",
    kategori: "Pelayanan",
    gambar:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&auto=format&fit=crop&q=80",
    ringkasan:
      "Pelayanan jemput bola pembuatan Identitas Kependudukan Digital hadir di tiap kantor Kelurahan.",
    isi: "Dinas Kependudukan dan Catatan Sipil bekerja sama dengan Kecamatan Batununggal menghadirkan layanan jemput bola aktivasi Identitas Kependudukan Digital (IKD). Petugas disiagakan di tiap kantor kelurahan untuk membantu warga melakukan verifikasi wajah dan koneksi aplikasi IKD di smartphone masing-masing secara gratis.",
  },
];

// Data UMKM
const umkmList = [
  {
    id: 1,
    nama: "Kopi Batununggal Heritage",
    kategori: "Kuliner",
    harga: "Rp 18.000 - Rp 35.000",
    penjual: "Pak Hendra (Kelurahan Mengger)",
    kontak: "6281234567890",
    deskripsi:
      "Kopi racikan khas Batununggal yang diproses dari biji kopi Robusta & Arabika pilihan. Tersedia varian V60, Espresso, dan Es Kopi Susu Gula Aren.",
    foto: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    nama: "Kerajinan Anyaman Bambu Gemah",
    kategori: "Kerajinan",
    harga: "Rp 45.000 - Rp 250.000",
    penjual: "Ibu Maryati (Kelurahan Wates)",
    kontak: "6281298765432",
    deskripsi:
      "Kerajinan anyaman bambu tradisional yang diolah menjadi wadah hiasan, tempat lampu, hingga tas etnik berkualitas tinggi buatan pengrajin lokal.",
    foto: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    nama: "Batik Tulis Motif Soekarno-Hatta",
    kategori: "Fashion",
    harga: "Rp 150.000 - Rp 850.000",
    penjual: "Sanggar Batik Batununggal",
    kontak: "6285712341234",
    deskripsi:
      "Kain batik tulis otentik buatan tangan dengan pewarna alam halus. Mengangkat motif filosofi sejarah lokal Kota Bandung.",
    foto: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    nama: "Keripik Tempe Renyah Gurih",
    kategori: "Kuliner",
    harga: "Rp 15.000 / bungkus",
    penjual: "Dapur Bu Rina (Kelurahan Gumuruh)",
    kontak: "6289655554444",
    deskripsi:
      "Cemilan keripik tempe olahan rumahtangga yang renyah, tipis, dan gurih dengan bumbu rempah alami tanpa bahan pengawet.",
    foto: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&auto=format&fit=crop&q=80",
  },
];

// Data CCTV
const cctvList = [
  {
    id: 1,
    lokasi: "Simpang Tiga Batununggal - Soekarno Hatta",
    status: "ONLINE",
    pendaftar: "RW 04",
    preview:
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    lokasi: "Area Taman Segitiga Gumuruh",
    status: "ONLINE",
    pendaftar: "RW 02",
    preview:
      "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    lokasi: "Depan Kantor Kecamatan Batununggal",
    status: "ONLINE",
    pendaftar: "Kecamatan",
    preview:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    lokasi: "Perempatan Jalan Mengger Utama",
    status: "ONLINE",
    pendaftar: "RW 07",
    preview:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    lokasi: "Jalur Utama Samoja Selatan",
    status: "OFFLINE",
    pendaftar: "RW 01",
    preview: "",
  },
];

export default function App() {
  const [umkmFilter, setUmkmFilter] = useState("Semua");
  const [formLapor, setFormLapor] = useState({
    nama: "",
    nik: "",
    kategori: "Fasilitas Umum",
    isi: "",
  });
  const [laporSubmitted, setLaporSubmitted] = useState(false);

  // States Modal Pop-up
  const [selectedCctv, setSelectedCctv] = useState<(typeof cctvList)[0] | null>(
    null,
  );
  const [selectedBerita, setSelectedBerita] = useState<
    (typeof beritaList)[0] | null
  >(null);
  const [selectedUmkm, setSelectedUmkm] = useState<(typeof umkmList)[0] | null>(
    null,
  );

  const filteredUmkm =
    umkmFilter === "Semua"
      ? umkmList
      : umkmList.filter((u) => u.kategori === umkmFilter);

  const handleSubmitLapor = (e: React.FormEvent) => {
    e.preventDefault();
    setLaporSubmitted(true);
    setTimeout(() => {
      setLaporSubmitted(false);
      setFormLapor({ nama: "", nik: "", kategori: "Fasilitas Umum", isi: "" });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-500 selection:text-white scroll-smooth">
      {/* 1. FLOATING NAVBAR DENGAN LOGO JABAR */}
      <nav className="sticky top-4 z-50 max-w-7xl mx-auto px-4">
        <div className="bg-white/90 backdrop-blur-md px-6 py-3.5 rounded-2xl flex justify-between items-center border border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-3">
            {/* LOGO JAWA BARAT */}
            <img
              src="/logojabar.png"
              alt="Logo Jawa Barat"
              className="h-10 w-auto object-contain"
            />
            <div>
              <span className="font-extrabold text-sm tracking-wider uppercase block text-slate-900">
                Batununggal
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold tracking-tight">
                Portal Desa Digital
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-600">
            <a href="#beranda" className="hover:text-emerald-600 transition">
              Beranda
            </a>
            <a href="#profil" className="hover:text-emerald-600 transition">
              Profil & Peta
            </a>
            <a href="#aparat" className="hover:text-emerald-600 transition">
              Aparat
            </a>
            <a href="#statistik" className="hover:text-emerald-600 transition">
              Statistik
            </a>
            <a href="#berita" className="hover:text-emerald-600 transition">
              Berita
            </a>
            <a href="#umkm" className="hover:text-emerald-600 transition">
              UMKM
            </a>
            <a href="#cctv" className="hover:text-emerald-600 transition">
              CCTV Live
            </a>
          </div>

          <a
            href="#pengaduan"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition"
          >
            Lapor Pengaduan
          </a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-16">
        {/* 2. HERO SECTION */}
        <section id="beranda" className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className="md:col-span-2 relative bg-cover bg-center p-8 rounded-3xl border border-slate-800 text-white flex flex-col justify-between overflow-hidden shadow-md min-h-[380px]"
            style={{
              backgroundImage:
                "url('/bg-hero1.jpg'), url('https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1600')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-emerald-950/80 to-slate-950/90 backdrop-blur-[1px]"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-full border border-emerald-500/30 mb-6 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Sistem Terpadu Desa Digital LSKK
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-white">
                Portal Pelayanan & Informasi <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                  Kecamatan Batununggal
                </span>
              </h1>
              <p className="text-slate-300 mt-4 text-sm leading-relaxed max-w-lg">
                Pusat transparansi administrasi, pemantauan statistik
                kependudukan, etalase UMKM lokal, hingga fasilitas pengaduan
                warga secara online.
              </p>
            </div>

            <div className="mt-8 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex items-center gap-2 relative z-10">
              <span className="text-xs text-emerald-300 font-semibold pl-2">
                Quick Search:
              </span>
              <input
                type="text"
                placeholder="Cari layanan, KTP, KK, UMKM..."
                className="bg-transparent border-none text-xs text-white placeholder-slate-300 focus:outline-none px-2 w-full"
              />
              <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold px-4 py-2 rounded-xl transition">
                Cari
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Total Penduduk Terdata
              </p>
              <h3 className="text-4xl font-black text-slate-900 mt-2 tracking-tight">
                118.400
              </h3>
              <p className="text-xs text-emerald-600 mt-1 font-semibold">
                Jiwa di 8 Kelurahan Wilayah
              </p>
            </div>

            <div className="bg-emerald-600 text-white p-6 rounded-3xl shadow-md flex flex-col justify-between h-[180px]">
              <div>
                <p className="text-xs font-bold text-emerald-100 uppercase tracking-wider">
                  Layanan Pengaduan & CCTV
                </p>
                <h4 className="text-xl font-extrabold text-white mt-1">
                  Status Sistem Active
                </h4>
                <p className="text-xs font-medium text-emerald-100 mt-0.5">
                  Monitoring Real-time 24/7
                </p>
              </div>
              <div className="flex justify-between items-center text-xs font-bold pt-3 border-t border-emerald-500">
                <span>Respon Cepat:</span>
                <span className="bg-white text-emerald-700 px-2.5 py-1 rounded-lg">
                  1 x 24 Jam
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. PROFIL & GOOGLE MAPS LINK */}
        <section
          id="profil"
          className="bg-white border border-slate-200/80 p-8 rounded-3xl shadow-sm space-y-6"
        >
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Profil & Wilayah Kecamatan
            </h2>
            <p className="text-slate-500 text-xs mt-1">
              Sejarah singkat, visi-misi, dan pemetaan geografis Batununggal
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-emerald-700 uppercase tracking-wider">
                  Sejarah & Visi Misi
                </h3>
                <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                  Kecamatan Batununggal merupakan salah satu pusat kawasan
                  berkembang di Kota Bandung yang berkomitmen mewujudkan tata
                  kelola pelayanan publik yang bersih, akuntabel, dan berbasis
                  teknologi digital Smart Village/Desa Digital.
                </p>
              </div>

              <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 space-y-2">
                <h4 className="text-xs font-bold text-slate-900">
                  Visi Utama:
                </h4>
                <p className="text-xs text-slate-600 italic">
                  "Mewujudkan Wilayah Batununggal yang Mandiri, Sejahtera,
                  Terdepan dalam Pelayanan Digital Publik Tahun 2029."
                </p>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Kecamatan+Batununggal+Bandung"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-100 hover:bg-emerald-50/60 rounded-2xl border border-slate-200 hover:border-emerald-500 h-[240px] flex flex-col items-center justify-center text-center p-6 transition group relative overflow-hidden cursor-pointer shadow-inner"
            >
              <div className="bg-emerald-600 text-white p-3.5 rounded-full mb-2 group-hover:scale-110 transition shadow-md">
                📍
              </div>
              <h4 className="font-bold text-sm text-slate-800 group-hover:text-emerald-700 transition">
                Peta Interaktif Wilayah Batununggal
              </h4>
              <p className="text-slate-500 text-xs max-w-xs mt-1">
                Klik di sini untuk membuka titik peta lokasi Kantor Kecamatan di
                Google Maps
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-white border border-emerald-200 px-3 py-1.5 rounded-lg shadow-sm">
                ↗ Buka di Google Maps
              </span>
            </a>
          </div>
        </section>

        {/* 4. APARAT PEMERINTAHAN */}
        <section id="aparat" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Aparat Pemerintahan
            </h2>
            <p className="text-slate-500 text-xs mt-1">
              Struktur organisasi dan jajaran pejabat pelayan publik
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {aparatList.map((aparat, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/80 rounded-3xl p-5 text-center shadow-sm hover:shadow-md transition"
              >
                <img
                  src={aparat.foto}
                  alt={aparat.nama}
                  className="w-24 h-24 rounded-2xl object-cover mx-auto mb-4 border-2 border-emerald-500/20"
                />
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full inline-block mb-2">
                  {aparat.tier}
                </span>
                <h3 className="font-bold text-slate-900 text-sm">
                  {aparat.nama}
                </h3>
                <p className="text-slate-500 text-xs mt-0.5">
                  {aparat.jabatan}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. STATISTIK DEMOGRAFI */}
        <section
          id="statistik"
          className="bg-white border border-slate-200/80 p-8 rounded-3xl shadow-sm space-y-6"
        >
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Statistik Demografi Kependudukan
            </h2>
            <p className="text-slate-500 text-xs mt-1">
              Visualisasi data populasi dan sebaran mata pencaharian warga
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
              <h3 className="text-xs font-bold text-slate-700 mb-4">
                Jumlah Penduduk per Kelurahan
              </h3>
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataPenduduk}>
                    <XAxis
                      dataKey="kelurahan"
                      stroke="#64748b"
                      fontSize={11}
                      tickLine={false}
                    />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        borderColor: "#e2e8f0",
                        borderRadius: "12px",
                        fontSize: "12px",
                      }}
                    />
                    <Bar
                      dataKey="jumlah"
                      fill="#059669"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
              <h3 className="text-xs font-bold text-slate-700 mb-2">
                Sebaran Pekerjaan Warga
              </h3>
              <div className="h-[180px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dataPekerjaan}
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {dataPekerjaan.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        borderColor: "#e2e8f0",
                        borderRadius: "12px",
                        fontSize: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {dataPekerjaan.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 text-[10px] text-slate-600 font-medium"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span className="truncate">
                      {item.name} ({item.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. BERITA & MADING DIGITAL */}
        <section id="berita" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Berita & Informasi Publik
            </h2>
            <p className="text-slate-500 text-xs mt-1">
              Kabar kegiatan masyarakat dan pengumuman resmi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {beritaList.map((berita) => (
              <div
                key={berita.id}
                className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <img
                    src={berita.gambar}
                    alt={berita.judul}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                        {berita.kategori}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {berita.tanggal}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                      {berita.judul}
                    </h3>
                    <p className="text-slate-500 text-xs mt-2 leading-relaxed line-clamp-3">
                      {berita.ringkasan}
                    </p>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-0">
                  <button
                    onClick={() => setSelectedBerita(berita)}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition flex items-center gap-1"
                  >
                    Baca Selengkapnya →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- MODAL POP-UP DETAIL BERITA --- */}
        {selectedBerita && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full border border-slate-200 overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
              <div className="relative">
                <img
                  src={selectedBerita.gambar}
                  alt={selectedBerita.judul}
                  className="w-full h-56 object-cover"
                />
                <button
                  onClick={() => setSelectedBerita(null)}
                  className="absolute top-3 right-3 bg-slate-900/70 hover:bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition backdrop-blur-sm"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                    {selectedBerita.kategori}
                  </span>
                  <span className="text-slate-400">
                    {selectedBerita.tanggal}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 leading-snug">
                  {selectedBerita.judul}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                  {selectedBerita.isi}
                </p>

                <div className="pt-4 text-right">
                  <button
                    onClick={() => setSelectedBerita(null)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition"
                  >
                    Tutup Berita
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7. KATALOG UMKM */}
        <section
          id="umkm"
          className="bg-white border border-slate-200/80 p-8 rounded-3xl shadow-sm space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Katalog ETALASE UMKM
              </h2>
              <p className="text-slate-500 text-xs mt-1">
                Klik produk untuk melihat informasi lengkap dan pemesanan
              </p>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {["Semua", "Kuliner", "Kerajinan", "Fashion"].map((kat) => (
                <button
                  key={kat}
                  onClick={() => setUmkmFilter(kat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    umkmFilter === kat
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {kat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredUmkm.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedUmkm(item)}
                className="bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <img
                    src={item.foto}
                    alt={item.nama}
                    className="w-full h-36 object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="p-4 space-y-2">
                    <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                      {item.kategori}
                    </span>
                    <h3 className="font-bold text-slate-900 text-xs line-clamp-1 group-hover:text-emerald-600 transition">
                      {item.nama}
                    </h3>
                    <p className="text-xs font-extrabold text-emerald-600">
                      {item.harga}
                    </p>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <span className="block text-center text-[10px] font-bold text-emerald-600 bg-white border border-emerald-200 py-1.5 rounded-xl">
                    Lihat Detail Produk →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- MODAL POP-UP DETAIL UMKM --- */}
        {selectedUmkm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white text-slate-900 rounded-3xl max-w-md w-full border border-slate-200 overflow-hidden shadow-2xl relative">
              <div className="relative">
                <img
                  src={selectedUmkm.foto}
                  alt={selectedUmkm.nama}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => setSelectedUmkm(null)}
                  className="absolute top-3 right-3 bg-slate-900/70 hover:bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition backdrop-blur-sm"
                >
                  ✕
                </button>
                <span className="absolute bottom-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow">
                  {selectedUmkm.kategori}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {selectedUmkm.nama}
                  </h3>
                  <p className="text-emerald-600 font-black text-base mt-0.5">
                    {selectedUmkm.harga}
                  </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1.5 text-xs">
                  <p className="text-slate-700 font-semibold">
                    📍 Pemilik/Lokasi:{" "}
                    <span className="font-normal text-slate-600">
                      {selectedUmkm.penjual}
                    </span>
                  </p>
                  <p className="text-slate-600 leading-relaxed pt-1 border-t border-slate-200">
                    {selectedUmkm.deskripsi}
                  </p>
                </div>

                <div className="pt-2 space-y-2">
                  <a
                    href={`https://wa.me/${selectedUmkm.kontak}?text=Halo,%20saya%20tertarik%20membeli%20produk%20${encodeURIComponent(selectedUmkm.nama)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-md block text-center"
                  >
                    💬 Hubungi Penjual (WhatsApp)
                  </a>
                  <button
                    onClick={() => setSelectedUmkm(null)}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-xl text-xs transition"
                  >
                    Tutup Pop-up
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 8. CCTV LIVE */}
        <section id="cctv" className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                CCTV Live Pemantauan Publik
              </h2>
              <p className="text-slate-500 text-xs mt-1">
                Pemantauan titik keramaian dan keamanan lingkungan secara
                real-time
              </p>
            </div>
            <span className="text-xs text-slate-400 hidden sm:block">
              Geser ke kanan untuk lihat kamera lain →
            </span>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin snap-x text-left">
            {cctvList.map((cam) => (
              <div
                key={cam.id}
                onClick={() => setSelectedCctv(cam)}
                className="min-w-[280px] sm:min-w-[320px] bg-slate-900 text-white rounded-2xl p-4 border border-slate-800 relative space-y-3 snap-start flex-shrink-0 cursor-pointer hover:border-emerald-500 hover:shadow-lg transition group"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400">
                    CAM #{cam.id}
                  </span>
                  <span
                    className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md ${cam.status === "ONLINE" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse" : "bg-red-500/20 text-red-400"}`}
                  >
                    ● {cam.status}
                  </span>
                </div>

                <div className="bg-slate-950 h-32 rounded-xl flex flex-col items-center justify-center relative overflow-hidden border border-slate-800 group-hover:opacity-90 transition">
                  {cam.status === "ONLINE" ? (
                    <>
                      <div className="absolute top-2 left-2 text-[9px] font-mono text-emerald-400 bg-black/60 px-1.5 py-0.5 rounded">
                        REC 🔴 LIVE
                      </div>
                      <span className="text-2xl mb-1 group-hover:scale-125 transition duration-300">
                        📹
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold">
                        Klik untuk Membuka
                      </span>
                    </>
                  ) : (
                    <span className="text-[10px] text-red-400 font-mono">
                      Signal Lost / Maintenance
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-200 line-clamp-1 group-hover:text-emerald-400 transition">
                    {cam.lokasi}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Penanggung Jawab: {cam.pendaftar}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- MODAL POP-UP CCTV LIVE STREAM --- */}
        {selectedCctv && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
            <div className="bg-slate-900 text-white rounded-3xl max-w-2xl w-full border border-slate-800 overflow-hidden shadow-2xl relative">
              <div className="p-4 sm:p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📹</span>
                    <h3 className="font-bold text-sm sm:text-base text-white">
                      CAM #{selectedCctv.id} - {selectedCctv.lokasi}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 pl-7">
                    Penanggung Jawab: {selectedCctv.pendaftar}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedCctv(null)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 sm:p-6 space-y-4">
                <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
                  {selectedCctv.status === "ONLINE" ? (
                    <>
                      <img
                        src={selectedCctv.preview}
                        alt="CCTV Live Preview"
                        className="w-full h-full object-cover opacity-90"
                      />
                      <div className="absolute top-3 left-3 bg-red-600/90 text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-md">
                        <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                        LIVE STREAM ● 1080P HD
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-6 space-y-2">
                      <span className="text-4xl block">⚠️</span>
                      <p className="text-xs font-mono text-red-400 font-bold">
                        CAMERA OFFLINE / MAINTENANCE
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-2 text-xs text-slate-400">
                  <span>
                    Status Kamera:{" "}
                    <strong
                      className={
                        selectedCctv.status === "ONLINE"
                          ? "text-emerald-400"
                          : "text-red-400"
                      }
                    >
                      {selectedCctv.status}
                    </strong>
                  </span>
                  <button
                    onClick={() => setSelectedCctv(null)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2 rounded-xl transition text-xs shadow-md"
                  >
                    Tutup Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 9. LAYANAN PENGADUAN WARGA */}
        <section
          id="pengaduan"
          className="bg-slate-900 text-white border border-slate-800 p-8 rounded-3xl shadow-lg space-y-6"
        >
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Layanan Pengaduan & Aspirasi Warga
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Sampaikan keluhan, saran, atau laporan kejadian di lingkungan
              secara langsung.
            </p>
          </div>

          {laporSubmitted ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-6 rounded-2xl text-center space-y-2">
              <span className="text-3xl">✅</span>
              <h3 className="font-bold text-sm">Laporan Berhasil Terkirim!</h3>
              <p className="text-xs text-slate-300">
                Terima kasih. Laporan kamu telah terdata di sistem dan akan
                diverifikasi oleh Admin Perangkat Desa.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmitLapor}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Nama Lengkap Pelapor
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan nama sesuai KTP"
                  value={formLapor.nama}
                  onChange={(e) =>
                    setFormLapor({ ...formLapor, nama: e.target.value })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  NIK (Nomor Induk Kependudukan)
                </label>
                <input
                  type="text"
                  required
                  placeholder="16 digit NIK"
                  value={formLapor.nik}
                  onChange={(e) =>
                    setFormLapor({ ...formLapor, nik: e.target.value })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Kategori Pengaduan
                </label>
                <select
                  value={formLapor.kategori}
                  onChange={(e) =>
                    setFormLapor({ ...formLapor, kategori: e.target.value })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Fasilitas Umum">Fasilitas Umum & Jalan</option>
                  <option value="Kebersihan">Kebersihan & Sampah</option>
                  <option value="Keamanan">Keamanan & Ketertiban</option>
                  <option value="Pelayanan">Pelayanan Administrasi</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Isi Pengaduan / Aspirasi
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Jelaskan detail lokasi dan kronologi kejadian..."
                  value={formLapor.isi}
                  onChange={(e) =>
                    setFormLapor({ ...formLapor, isi: e.target.value })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <div className="md:col-span-2 text-right">
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-6 py-3 rounded-xl shadow-md transition"
                >
                  Kirim Pengaduan Sekarang
                </button>
              </div>
            </form>
          )}
        </section>

        {/* FOOTER */}
        <footer className="border-t border-slate-200 pt-8 pb-4 text-center text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} Portal Desa Digital LSKK - Kecamatan
            Batununggal, Kota Bandung.
          </p>
        </footer>
      </main>
    </div>
  );
}
