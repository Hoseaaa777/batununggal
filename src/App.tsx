import React, { useState, useEffect } from "react";
import {
  Building2,
  Users,
  Store,
  Newspaper,
  Video,
  MessageSquare,
  Send,
  CheckCircle2,
  Phone,
  X,
  Lock,
  Search,
  MapPin,
  ShieldCheck,
  Eye,
  ExternalLink,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  Tooltip,
} from "recharts";
import { AdminPage } from "./components/AdminPage";
import type {
  Pengaduan,
  UmkmItem,
  BeritaItem,
  CctvItem,
  AparatItem,
  KecamatanStats,
} from "./components/AdminPage";
import "./App.css";

// --- INITIAL FALLBACK DATA ---
const INITIAL_PENGADUAN: Pengaduan[] = [
  {
    id: "1",
    nama: "Deden Supriatna",
    kelurahan: "Maleer",
    pesan:
      "Pembersihan drainase di sekitar area Binong - Maleer perlu penanganan jelang musim hujan.",
    tanggal: "30 Juli 2026",
    status: "Diproses",
  },
  {
    id: "2",
    nama: "Ibu Nurhayati",
    kelurahan: "Kebon Jayanti",
    pesan:
      "Jadwal sosialisasi Identitas Kependudukan Digital (IKD) di kantor kelurahan.",
    tanggal: "28 Juli 2026",
    status: "Menunggu",
  },
];

const INITIAL_UMKM: UmkmItem[] = [
  {
    id: 1,
    nama: "Kerajinan Khas Batununggal",
    kategori: "Kerajinan",
    harga: "Rp 85.000 / unit",
    desc: "Produk kerajinan tangan kreatif dari pengrajin lokal Batununggal.",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    nama: "Kuliner Khas Samoja",
    kategori: "Kuliner",
    harga: "Rp 20.000 / porsi",
    desc: "Olahan makanan tradisional dengan cita rasa khas priangan.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    nama: "Fashion & Tekstil Binong",
    kategori: "Fashion",
    harga: "Rp 120.000 / pcs",
    desc: "Produk rajut dan pakaian berkualitas buatan sentra usaha Binong.",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=600",
  },
];

const INITIAL_BERITA: BeritaItem[] = [
  {
    id: 1,
    judul: "Sosialisasi Digitalisasi Pelayanan Publik Kecamatan",
    kategori: "Pengumuman",
    tanggal: "29 Juli 2026",
    desc: "Kecamatan Batununggal mempercepat pelayanan KTP, KK, dan perizinan berbasis digital untuk transparansi publik.",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    judul: "Monitoring Kebersihan & Drainase Wilayah Maleer",
    kategori: "Kegiatan",
    tanggal: "25 Juli 2026",
    desc: "Giat pemantauan lapangan oleh Camat Batununggal dan jajaran Lurah demi kenyamanan pemukiman.",
    image:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=600",
  },
];

const INITIAL_CCTV: CctvItem[] = [
  {
    id: 1,
    name: "Kamera 01 - Simpang Kebon Jayanti",
    loc: "Jl. Terusan Jakarta - Batununggal",
    img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    name: "Kamera 02 - Area Kantor Kecamatan",
    loc: "Jl. Batununggal No. 3",
    img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=600",
  },
];

const INITIAL_APARAT: AparatItem[] = [
  {
    id: 1,
    nama: "Drs. Subarna, M.Si",
    jabatan: "Camat Batununggal",
    kontak: "022-7301234",
  },
  {
    id: 2,
    nama: "Sekretaris Kecamatan",
    jabatan: "Sekcam Batununggal",
    kontak: "022-7301235",
  },
  {
    id: 3,
    nama: "Lurah Maleer",
    jabatan: "Lurah Wilayah Maleer",
    kontak: "022-7301236",
  },
];

const INITIAL_KECAMATAN_STATS: KecamatanStats = {
  totalPopulasi: 118400,
  jumlahKelurahan: 8,
  usiaProduktif: 78000,
  anakRemaja: 28400,
  lansia: 12000,
  totalKK: 34500,
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<"public" | "admin">("public");

  // SAFE LOCAL STORAGE INITIALIZERS
  const [pengaduanList, setPengaduanList] = useState<Pengaduan[]>(() => {
    try {
      const saved = localStorage.getItem("btn_pengaduan");
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0
        ? parsed
        : INITIAL_PENGADUAN;
    } catch {
      return INITIAL_PENGADUAN;
    }
  });

  const [umkmList, setUmkmList] = useState<UmkmItem[]>(() => {
    try {
      const saved = localStorage.getItem("btn_umkm");
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_UMKM;
    } catch {
      return INITIAL_UMKM;
    }
  });

  const [beritaList, setBeritaList] = useState<BeritaItem[]>(() => {
    try {
      const saved = localStorage.getItem("btn_berita");
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0
        ? parsed
        : INITIAL_BERITA;
    } catch {
      return INITIAL_BERITA;
    }
  });

  const [cctvList, setCctvList] = useState<CctvItem[]>(() => {
    try {
      const saved = localStorage.getItem("btn_cctv");
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_CCTV;
    } catch {
      return INITIAL_CCTV;
    }
  });

  const [aparatList, setAparatList] = useState<AparatItem[]>(() => {
    try {
      const saved = localStorage.getItem("btn_aparat");
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0
        ? parsed
        : INITIAL_APARAT;
    } catch {
      return INITIAL_APARAT;
    }
  });

  const [kecamatanStats, setKecamatanStats] = useState<KecamatanStats>(() => {
    try {
      const saved = localStorage.getItem("btn_stats");
      const parsed = saved ? JSON.parse(saved) : null;
      return parsed && typeof parsed.totalPopulasi === "number"
        ? parsed
        : INITIAL_KECAMATAN_STATS;
    } catch {
      return INITIAL_KECAMATAN_STATS;
    }
  });

  useEffect(() => {
    localStorage.setItem("btn_pengaduan", JSON.stringify(pengaduanList));
    localStorage.setItem("btn_umkm", JSON.stringify(umkmList));
    localStorage.setItem("btn_berita", JSON.stringify(beritaList));
    localStorage.setItem("btn_cctv", JSON.stringify(cctvList));
    localStorage.setItem("btn_aparat", JSON.stringify(aparatList));
    localStorage.setItem("btn_stats", JSON.stringify(kecamatanStats));
  }, [
    pengaduanList,
    umkmList,
    beritaList,
    cctvList,
    aparatList,
    kecamatanStats,
  ]);

  // Modal States
  const [selectedBerita, setSelectedBerita] = useState<BeritaItem | null>(null);
  const [selectedCctv, setSelectedCctv] = useState<CctvItem | null>(null);

  // Form Pengaduan Public State
  const [nama, setNama] = useState("");
  const [kelurahan, setKelurahan] = useState("Maleer");
  const [pesan, setPesan] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitPengaduan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !pesan) return;

    const newReport: Pengaduan = {
      id: Date.now().toString(),
      nama,
      kelurahan,
      pesan,
      tanggal: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      status: "Menunggu",
    };

    setPengaduanList([newReport, ...pengaduanList]);
    setSubmitted(true);
    setTimeout(() => {
      setNama("");
      setPesan("");
      setSubmitted(false);
    }, 4000);
  };

  // SWITCH KE HALAMAN ADMIN
  if (currentPage === "admin") {
    return (
      <AdminPage
        pengaduanList={pengaduanList}
        onUpdatePengaduanStatus={(id, status) =>
          setPengaduanList((prev) =>
            prev.map((i) => (i.id === id ? { ...i, status } : i)),
          )
        }
        onDeletePengaduan={(id) =>
          setPengaduanList((prev) => prev.filter((i) => i.id !== id))
        }
        umkmList={umkmList}
        onAddUmkm={(item) =>
          setUmkmList([{ ...item, id: Date.now() }, ...umkmList])
        }
        onDeleteUmkm={(id) =>
          setUmkmList((prev) => prev.filter((i) => i.id !== id))
        }
        beritaList={beritaList}
        onAddBerita={(item) =>
          setBeritaList([{ ...item, id: Date.now() }, ...beritaList])
        }
        onDeleteBerita={(id) =>
          setBeritaList((prev) => prev.filter((i) => i.id !== id))
        }
        cctvList={cctvList}
        onAddCctv={(item) =>
          setCctvList([{ ...item, id: Date.now() }, ...cctvList])
        }
        onDeleteCctv={(id) =>
          setCctvList((prev) => prev.filter((i) => i.id !== id))
        }
        aparatList={aparatList}
        onAddAparat={(item) =>
          setAparatList([{ ...item, id: Date.now() }, ...aparatList])
        }
        onDeleteAparat={(id) =>
          setAparatList((prev) => prev.filter((i) => i.id !== id))
        }
        kecamatanStats={kecamatanStats}
        onUpdateKecamatanStats={setKecamatanStats}
        onBackToPublic={() => setCurrentPage("public")}
      />
    );
  }

  // Safe Values & Calculations
  const totalPop = kecamatanStats?.totalPopulasi ?? 118400;
  const totalKK = kecamatanStats?.totalKK ?? 34500;
  const numKelurahan = kecamatanStats?.jumlahKelurahan ?? 8;

  // Data Bar Chart Baru Khusus Batununggal
  const demografiBarData = [
    {
      kategori: "Anak (0-17)",
      jumlah: kecamatanStats?.anakRemaja ?? 28400,
      color: "#2563eb",
    },
    {
      kategori: "Produktif (18-59)",
      jumlah: kecamatanStats?.usiaProduktif ?? 78000,
      color: "#00a86b",
    },
    {
      kategori: "Lansia (60+)",
      jumlah: kecamatanStats?.lansia ?? 12000,
      color: "#f59e0b",
    },
  ];

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        backgroundColor: "#f8fafc",
        color: "#0f172a",
        minHeight: "100vh",
      }}
    >
      {/* 1. NAVBAR */}
      <header
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          padding: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src="/logojabar.png"
            alt="Logo Jabar"
            style={{ height: "38px" }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div>
            <h1
              style={{
                fontSize: "1.1rem",
                fontWeight: 800,
                margin: 0,
                color: "#0f172a",
              }}
            >
              BATUNUNGGAL
            </h1>
            <p
              style={{
                fontSize: "0.75rem",
                color: "#00a86b",
                margin: 0,
                fontWeight: 700,
              }}
            >
              Portal Desa Digital
            </p>
          </div>
        </div>

        <nav
          style={{
            display: "flex",
            gap: "1.5rem",
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "#475569",
          }}
        >
          <a
            href="#beranda"
            style={{ color: "#0f172a", textDecoration: "none" }}
          >
            Beranda
          </a>
          <a
            href="#profil"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Profil & Peta
          </a>
          <a
            href="#aparat"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Aparat
          </a>
          <a
            href="#statistik"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Statistik
          </a>
          <a
            href="#berita"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Berita
          </a>
          <a href="#umkm" style={{ textDecoration: "none", color: "inherit" }}>
            UMKM
          </a>
          <a href="#cctv" style={{ textDecoration: "none", color: "inherit" }}>
            CCTV Live
          </a>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            type="button"
            onClick={() => setCurrentPage("admin")}
            style={{
              backgroundColor: "#f1f5f9",
              color: "#334155",
              border: "1px solid #cbd5e1",
              fontSize: "0.8rem",
              fontWeight: 700,
              padding: "8px 14px",
              borderRadius: "8px",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Lock size={14} color="#00a86b" /> Login Admin
          </button>
          <a
            href="#pengaduan"
            style={{
              backgroundColor: "#00a86b",
              color: "#ffffff",
              textDecoration: "none",
              padding: "9px 18px",
              borderRadius: "20px",
              fontWeight: 700,
              fontSize: "0.85rem",
            }}
          >
            Lapor Pengaduan
          </a>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section
        id="beranda"
        style={{
          scrollMarginTop: "90px",
          padding: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "1.5rem",
        }}
      >
        <div
          style={{
            backgroundColor: "#1e293b",
            color: "#ffffff",
            borderRadius: "20px",
            padding: "2.5rem",
            backgroundImage: 'url("/bg-hero1.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "340px",
          }}
        >
          <div style={{ position: "relative", zIndex: 2 }}>
            <span
              style={{
                backgroundColor: "rgba(0,168,107,0.25)",
                color: "#4ade80",
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "0.75rem",
                fontWeight: 700,
                border: "1px solid #00a86b",
              }}
            >
              ● Sistem Terpadu Desa Digital LSKK
            </span>
            <h2
              style={{
                fontSize: "2.3rem",
                fontWeight: 800,
                margin: "1rem 0 0.5rem 0",
                lineHeight: 1.2,
              }}
            >
              Portal Pelayanan & Informasi{" "}
              <span style={{ color: "#4ade80" }}>Kecamatan Batununggal</span>
            </h2>
            <p
              style={{
                color: "#cbd5e1",
                fontSize: "0.9rem",
                maxWidth: "520px",
                margin: "0 0 1.5rem 0",
                lineHeight: 1.5,
              }}
            >
              Pusat transparansi administrasi, pemantauan statistik
              kependudukan, etalase UMKM lokal, hingga fasilitas pengaduan warga
              secara online.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              padding: "8px 16px",
              borderRadius: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 2,
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <span
              style={{ fontSize: "0.8rem", color: "#e2e8f0", fontWeight: 600 }}
            >
              Quick Search:
            </span>
            <input
              type="text"
              placeholder="Cari layanan, KTP, KK, UMKM..."
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                padding: "6px",
                fontSize: "0.85rem",
                width: "60%",
                outline: "none",
              }}
            />
            <button
              type="button"
              style={{
                backgroundColor: "#00a86b",
                color: "#fff",
                border: "none",
                padding: "6px 16px",
                borderRadius: "20px",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: "0.8rem",
              }}
            >
              Cari
            </button>
          </div>
        </div>

        {/* HERO RIGHT STATS CARDS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              padding: "1.5rem",
            }}
          >
            <span
              style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 800 }}
            >
              TOTAL PENDUDUK TERDATA
            </span>
            <div
              style={{
                fontSize: "2.2rem",
                fontWeight: 800,
                color: "#0f172a",
                margin: "4px 0",
              }}
            >
              {totalPop.toLocaleString("id-ID")}
            </div>
            <span
              style={{ fontSize: "0.8rem", color: "#00a86b", fontWeight: 700 }}
            >
              Jiwa di {numKelurahan} Kelurahan Wilayah
            </span>
          </div>

          <div
            style={{
              backgroundColor: "#00a86b",
              color: "#ffffff",
              borderRadius: "16px",
              padding: "1.5rem",
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span
                style={{ fontSize: "0.75rem", opacity: 0.9, fontWeight: 700 }}
              >
                LAYANAN PENGADUAN & CCTV
              </span>
              <h3
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 800,
                  margin: "4px 0 2px 0",
                }}
              >
                Status Sistem Active
              </h3>
              <p style={{ fontSize: "0.8rem", opacity: 0.85, margin: 0 }}>
                Monitoring Real-time 24/7
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <span style={{ fontSize: "0.8rem" }}>Respon Cepat:</span>
              <span
                style={{
                  backgroundColor: "#ffffff",
                  color: "#00a86b",
                  padding: "4px 12px",
                  borderRadius: "12px",
                  fontWeight: 800,
                  fontSize: "0.8rem",
                }}
              >
                1 x 24 Jam
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROFIL & PETA SECTION */}
      <section
        id="profil"
        style={{
          scrollMarginTop: "90px",
          padding: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: "1.4rem",
            fontWeight: 800,
            margin: "0 0 0.25rem 0",
          }}
        >
          Profil & Wilayah Kecamatan
        </h2>
        <p
          style={{
            color: "#64748b",
            fontSize: "0.9rem",
            margin: "0 0 1.25rem 0",
          }}
        >
          Sejarah singkat, visi-misi, dan pemetaan geografis Batununggal.
        </p>
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            padding: "1.25rem",
          }}
        >
          <iframe
            title="Peta Batununggal"
            src="https://maps.google.com/maps?q=Kecamatan%20Batununggal%20Bandung&t=&z=14&ie=UTF8&iwloc=&output=embed"
            style={{
              width: "100%",
              height: "320px",
              border: "none",
              borderRadius: "12px",
            }}
          />
        </div>
      </section>

      {/* 4. APARAT & PEJABAT SECTION */}
      <section
        id="aparat"
        style={{
          scrollMarginTop: "90px",
          padding: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ fontSize: "0.75rem", color: "#00a86b", fontWeight: 800 }}>
          STRUKTUR ORGANISASI
        </div>
        <h2
          style={{
            fontSize: "1.4rem",
            fontWeight: 800,
            margin: "2px 0 1.25rem 0",
          }}
        >
          Pejabat & Aparat Kecamatan
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {(aparatList || []).map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "1.25rem",
              }}
            >
              <h3
                style={{
                  margin: "0 0 4px 0",
                  fontSize: "1.05rem",
                  fontWeight: 800,
                }}
              >
                {item.nama}
              </h3>
              <p
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "0.85rem",
                  color: "#00a86b",
                  fontWeight: 700,
                }}
              >
                {item.jabatan}
              </p>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#64748b",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Phone size={14} /> Kontak: {item.kontak}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. STATISTIK DEMOGRAFI SECTION (DESAIN & LAYOUT BARU) */}
      <section
        id="statistik"
        style={{
          scrollMarginTop: "90px",
          padding: "2.5rem 2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "1.5rem" }}>
          <div
            style={{
              fontSize: "0.75rem",
              color: "#00a86b",
              fontWeight: 800,
              letterSpacing: "0.5px",
            }}
          >
            DEMOGRAFI & POPULASI
          </div>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              margin: "4px 0 0 0",
              color: "#0f172a",
            }}
          >
            Statistik Wilayah Batununggal
          </h2>
        </div>

        {/* 4 Cards Ringkasan Top Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.25rem",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              padding: "1.25rem",
            }}
          >
            <div
              style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 700 }}
            >
              TOTAL PENDUDUK
            </div>
            <div
              style={{
                fontSize: "1.8rem",
                fontWeight: 800,
                color: "#00a86b",
                margin: "4px 0",
              }}
            >
              {totalPop.toLocaleString("id-ID")}{" "}
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#64748b",
                }}
              >
                Jiwa
              </span>
            </div>
            <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
              Terdata di sistem digital
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              padding: "1.25rem",
            }}
          >
            <div
              style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 700 }}
            >
              KEPALA KELUARGA
            </div>
            <div
              style={{
                fontSize: "1.8rem",
                fontWeight: 800,
                color: "#0f172a",
                margin: "4px 0",
              }}
            >
              {totalKK.toLocaleString("id-ID")}{" "}
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#64748b",
                }}
              >
                KK
              </span>
            </div>
            <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
              Tersebar di {numKelurahan} Kelurahan
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              padding: "1.25rem",
            }}
          >
            <div
              style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 700 }}
            >
              CAKUPAN WILAYAH
            </div>
            <div
              style={{
                fontSize: "1.8rem",
                fontWeight: 800,
                color: "#0f172a",
                margin: "4px 0",
              }}
            >
              {numKelurahan}{" "}
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#64748b",
                }}
              >
                Kelurahan
              </span>
            </div>
            <div
              style={{ fontSize: "0.75rem", color: "#00a86b", fontWeight: 700 }}
            >
              Kec. Batununggal Bandung
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              padding: "1.25rem",
            }}
          >
            <div
              style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 700 }}
            >
              UMKM TERDAFTAR
            </div>
            <div
              style={{
                fontSize: "1.8rem",
                fontWeight: 800,
                color: "#2563eb",
                margin: "4px 0",
              }}
            >
              {(umkmList || []).length}{" "}
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#64748b",
                }}
              >
                Usaha
              </span>
            </div>
            <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
              Aktif di katalog produk
            </div>
          </div>
        </div>

        {/* Bottom Split Grid: Bar Chart & Progress Indicators */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {/* Left: Bar Chart Visual */}
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              padding: "1.5rem",
            }}
          >
            <h3
              style={{
                margin: "0 0 1rem 0",
                fontSize: "1.05rem",
                fontWeight: 800,
                color: "#0f172a",
              }}
            >
              📊 Distribusi Usia Warga (Bar Chart)
            </h3>
            <div style={{ width: "100%", height: "230px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={demografiBarData}
                  margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="kategori"
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                  <Tooltip
                    formatter={(val: any) => [
                      `${Number(val).toLocaleString("id-ID")} Jiwa`,
                      "Jumlah",
                    ]}
                  />
                  <Bar dataKey="jumlah" radius={[8, 8, 0, 0]}>
                    {demografiBarData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right: Progress Meter Proporsi */}
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h3
              style={{
                margin: "0 0 1.25rem 0",
                fontSize: "1.05rem",
                fontWeight: 800,
                color: "#0f172a",
              }}
            >
              📈 Rincian Proporsi Kelompok Usia
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {/* Usia Produktif */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    marginBottom: "6px",
                  }}
                >
                  <span>Usia Produktif (18 - 59 Thn)</span>
                  <span style={{ color: "#00a86b" }}>
                    {(
                      ((kecamatanStats?.usiaProduktif ?? 78000) / totalPop) *
                      100
                    ).toFixed(1)}
                    % (
                    {(kecamatanStats?.usiaProduktif ?? 78000).toLocaleString(
                      "id-ID",
                    )}{" "}
                    Jiwa)
                  </span>
                </div>
                <div
                  style={{
                    height: "10px",
                    backgroundColor: "#f1f5f9",
                    borderRadius: "6px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${((kecamatanStats?.usiaProduktif ?? 78000) / totalPop) * 100}%`,
                      backgroundColor: "#00a86b",
                      height: "100%",
                      borderRadius: "6px",
                    }}
                  />
                </div>
              </div>

              {/* Anak & Remaja */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    marginBottom: "6px",
                  }}
                >
                  <span>Anak & Remaja (0 - 17 Thn)</span>
                  <span style={{ color: "#2563eb" }}>
                    {(
                      ((kecamatanStats?.anakRemaja ?? 28400) / totalPop) *
                      100
                    ).toFixed(1)}
                    % (
                    {(kecamatanStats?.anakRemaja ?? 28400).toLocaleString(
                      "id-ID",
                    )}{" "}
                    Jiwa)
                  </span>
                </div>
                <div
                  style={{
                    height: "10px",
                    backgroundColor: "#f1f5f9",
                    borderRadius: "6px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${((kecamatanStats?.anakRemaja ?? 28400) / totalPop) * 100}%`,
                      backgroundColor: "#2563eb",
                      height: "100%",
                      borderRadius: "6px",
                    }}
                  />
                </div>
              </div>

              {/* Lansia */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    marginBottom: "6px",
                  }}
                >
                  <span>Lanjut Usia (60+ Thn)</span>
                  <span style={{ color: "#f59e0b" }}>
                    {(
                      ((kecamatanStats?.lansia ?? 12000) / totalPop) *
                      100
                    ).toFixed(1)}
                    % (
                    {(kecamatanStats?.lansia ?? 12000).toLocaleString("id-ID")}{" "}
                    Jiwa)
                  </span>
                </div>
                <div
                  style={{
                    height: "10px",
                    backgroundColor: "#f1f5f9",
                    borderRadius: "6px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${((kecamatanStats?.lansia ?? 12000) / totalPop) * 100}%`,
                      backgroundColor: "#f59e0b",
                      height: "100%",
                      borderRadius: "6px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BERITA & PENGUMUMAN SECTION */}
      <section
        id="berita"
        style={{
          scrollMarginTop: "90px",
          padding: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ fontSize: "0.75rem", color: "#00a86b", fontWeight: 800 }}>
          KABAR KECAMATAN
        </div>
        <h2
          style={{
            fontSize: "1.4rem",
            fontWeight: 800,
            margin: "2px 0 1.25rem 0",
          }}
        >
          Berita & Pengumuman Resmi
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {(beritaList || []).map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                src={item.image}
                alt={item.judul}
                style={{ width: "100%", height: "160px", objectFit: "cover" }}
              />
              <div
                style={{
                  padding: "1.25rem",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span
                    style={{
                      backgroundColor: "#e1f2e5",
                      color: "#00a86b",
                      padding: "3px 10px",
                      borderRadius: "12px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                    }}
                  >
                    {item.kategori}
                  </span>
                  <h3
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 800,
                      margin: "8px 0 4px 0",
                      color: "#0f172a",
                    }}
                  >
                    {item.judul}
                  </h3>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#94a3b8",
                      marginBottom: "8px",
                    }}
                  >
                    📅 {item.tanggal}
                  </div>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "#64748b",
                      margin: "0 0 1rem 0",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedBerita(item)}
                  style={{
                    backgroundColor: "#f1f5f9",
                    color: "#00a86b",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    alignSelf: "flex-start",
                  }}
                >
                  <Newspaper size={15} /> Lihat Detail Berita
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL BERITA */}
      {selectedBerita && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setSelectedBerita(null)}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              maxWidth: "500px",
              width: "100%",
              overflow: "hidden",
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedBerita.image}
              alt={selectedBerita.judul}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div style={{ padding: "1.5rem" }}>
              <span
                style={{
                  backgroundColor: "#e1f2e5",
                  color: "#00a86b",
                  padding: "3px 10px",
                  borderRadius: "12px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                }}
              >
                {selectedBerita.kategori}
              </span>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  margin: "8px 0 4px 0",
                }}
              >
                {selectedBerita.judul}
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#64748b",
                  lineHeight: 1.6,
                  margin: "1rem 0",
                }}
              >
                {selectedBerita.desc}
              </p>
              <button
                type="button"
                onClick={() => setSelectedBerita(null)}
                style={{
                  backgroundColor: "#00a86b",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontWeight: 700,
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. KATALOG UMKM SECTION */}
      <section
        id="umkm"
        style={{
          scrollMarginTop: "90px",
          padding: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ fontSize: "0.75rem", color: "#00a86b", fontWeight: 800 }}>
          EKONOMI LOKAL
        </div>
        <h2
          style={{
            fontSize: "1.4rem",
            fontWeight: 800,
            margin: "2px 0 1.25rem 0",
          }}
        >
          Katalog UMKM Kecamatan
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {(umkmList || []).map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <img
                src={item.image}
                alt={item.nama}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
              <div style={{ padding: "1rem" }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#00a86b",
                    fontWeight: 800,
                  }}
                >
                  {item.kategori}
                </span>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 800,
                    margin: "2px 0 4px 0",
                  }}
                >
                  {item.nama}
                </h3>
                <div
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "#2563eb",
                    marginBottom: "6px",
                  }}
                >
                  {item.harga}
                </div>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#64748b",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CCTV LIVE STREAM SECTION */}
      <section
        id="cctv"
        style={{
          scrollMarginTop: "90px",
          backgroundColor: "#0f172a",
          color: "#ffffff",
          padding: "3rem 2rem",
          marginTop: "2rem",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{ fontSize: "0.75rem", color: "#4ade80", fontWeight: 800 }}
          >
            MONITORING LINGKUNGAN
          </div>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              margin: "2px 0 1.5rem 0",
            }}
          >
            CCTV Live Stream Batununggal
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {(cctvList || []).map((cam) => (
              <div
                key={cam.id}
                style={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                  padding: "1.25rem",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    height: "180px",
                    backgroundColor: "#000000",
                    borderRadius: "8px",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    marginBottom: "1rem",
                  }}
                  onClick={() => setSelectedCctv(cam)}
                >
                  <img
                    src={cam.img}
                    alt={cam.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: 0.6,
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      backgroundColor: "#ef4444",
                      color: "#fff",
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      padding: "3px 8px",
                      borderRadius: "10px",
                    }}
                  >
                    ● LIVE
                  </span>
                  <div
                    style={{
                      position: "absolute",
                      backgroundColor: "rgba(0,168,107,0.8)",
                      padding: "12px",
                      borderRadius: "50%",
                    }}
                  >
                    <Video size={28} color="#fff" />
                  </div>
                </div>
                <h4
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "1rem",
                    fontWeight: 800,
                  }}
                >
                  {cam.name}
                </h4>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#94a3b8" }}>
                  📍 {cam.loc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL CCTV */}
      {selectedCctv && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(6px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setSelectedCctv(null)}
        >
          <div
            style={{
              backgroundColor: "#0f172a",
              border: "1px solid #334155",
              color: "#fff",
              borderRadius: "16px",
              maxWidth: "600px",
              width: "100%",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedCctv.img}
              alt={selectedCctv.name}
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
            />
            <div style={{ padding: "1.5rem" }}>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  margin: "0 0 4px 0",
                }}
              >
                {selectedCctv.name}
              </h3>
              <p
                style={{
                  color: "#00a86b",
                  fontWeight: 700,
                  margin: "0 0 1.5rem 0",
                }}
              >
                📍 {selectedCctv.loc}
              </p>
              <button
                type="button"
                onClick={() => setSelectedCctv(null)}
                style={{
                  backgroundColor: "#334155",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontWeight: 700,
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Tutup Stream
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. FORM PENGADUAN WARGA SECTION */}
      <section
        id="pengaduan"
        style={{
          scrollMarginTop: "90px",
          padding: "3rem 2rem",
          maxWidth: "700px",
          margin: "2rem auto 0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #e2e8f0",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "0.75rem", color: "#00a86b", fontWeight: 800 }}>
          LAYANAN PUBLIK
        </div>
        <h2
          style={{
            fontSize: "1.4rem",
            fontWeight: 800,
            margin: "2px 0 1.5rem 0",
          }}
        >
          Form Pengaduan Warga Online
        </h2>

        {submitted ? (
          <div
            style={{
              backgroundColor: "#e1f2e5",
              color: "#1b5e20",
              padding: "1.25rem",
              borderRadius: "12px",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <CheckCircle2 size={20} /> Pengaduan Anda berhasil dikirim ke Kantor
            Kecamatan!
          </div>
        ) : (
          <form
            onSubmit={handleSubmitPengaduan}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              textAlign: "left",
            }}
          >
            <div>
              <label
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                placeholder="Masukkan nama Anda"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "11px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Asal Kelurahan
              </label>
              <select
                value={kelurahan}
                onChange={(e) => setKelurahan(e.target.value)}
                style={{
                  width: "100%",
                  padding: "11px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  boxSizing: "border-box",
                }}
              >
                <option value="Maleer">Kelurahan Maleer</option>
                <option value="Samoja">Kelurahan Samoja</option>
                <option value="Kebon Jayanti">Kelurahan Kebon Jayanti</option>
                <option value="Kebon Gedang">Kelurahan Kebon Gedang</option>
                <option value="Binong">Kelurahan Binong</option>
                <option value="Cibunun">Kelurahan Cibunun</option>
                <option value="Gumuruh">Kelurahan Gumuruh</option>
                <option value="Roa Malaka">Kelurahan Roa Malaka</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Isi Pengaduan / Aspirasi
              </label>
              <textarea
                placeholder="Tuliskan pengaduan Anda secara rinci..."
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
                required
                rows={4}
                style={{
                  width: "100%",
                  padding: "11px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "#00a86b",
                color: "#fff",
                border: "none",
                padding: "12px",
                borderRadius: "8px",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontSize: "0.95rem",
                marginTop: "0.5rem",
              }}
            >
              <Send size={16} /> Kirim Pengaduan Kecamatan
            </button>
          </form>
        )}
      </section>

      {/* 10. FOOTER */}
      <footer
        style={{
          backgroundColor: "#1e293b",
          color: "#94a3b8",
          padding: "2.5rem 1rem",
          textAlign: "center",
          marginTop: "4rem",
          fontSize: "0.85rem",
        }}
      >
        <p
          style={{ margin: "0 0 0.5rem 0", fontWeight: 800, color: "#ffffff" }}
        >
          © 2026 Portal Resmi Kecamatan Batununggal - Desa Digital LSKK
        </p>
        <button
          type="button"
          onClick={() => setCurrentPage("admin")}
          style={{
            background: "transparent",
            color: "#4ade80",
            border: "1px solid rgba(74,222,128,0.3)",
            padding: "6px 14px",
            borderRadius: "6px",
            fontSize: "0.75rem",
            cursor: "pointer",
          }}
        >
          🔒 Akses Dashboard Admin Kecamatan
        </button>
      </footer>
    </div>
  );
}
