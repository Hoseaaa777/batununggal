import React, { useState, useEffect } from "react";
import { Lock } from "lucide-react";
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

const INITIAL_PENGADUAN: Pengaduan[] = [
  {
    id: "1",
    nama: "Deden Supriatna",
    kelurahan: "Maleer",
    pesan: "Pembersihan drainase di sekitar area Binong - Maleer.",
    tanggal: "30 Juli 2026",
    status: "Diproses",
  },
  {
    id: "2",
    nama: "Ibu Nurhayati",
    kelurahan: "Kebon Jayanti",
    pesan: "Jadwal sosialisasi Identitas Kependudukan Digital (IKD).",
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
];

const INITIAL_BERITA: BeritaItem[] = [
  {
    id: 1,
    judul: "Sosialisasi Digitalisasi Pelayanan Publik Kecamatan",
    kategori: "Pengumuman",
    tanggal: "29 Juli 2026",
    desc: "Kecamatan Batununggal mempercepat pelayanan KTP, KK, dan perizinan berbasis digital.",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600",
  },
];

const INITIAL_CCTV: CctvItem[] = [
  {
    id: 1,
    name: "Kamera 01 - Simpang Kebon Jayanti",
    loc: "Jl. Terusan Jakarta - Batununggal",
    img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=600",
  },
];

const INITIAL_APARAT: AparatItem[] = [
  {
    id: 1,
    nama: "Drs. Subarna, M.Si",
    jabatan: "Camat Batununggal",
    kontak: "022-7301234",
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

  const [pengaduanList, setPengaduanList] = useState<Pengaduan[]>(() => {
    const saved = localStorage.getItem("btn_pengaduan");
    return saved ? JSON.parse(saved) : INITIAL_PENGADUAN;
  });

  const [umkmList, setUmkmList] = useState<UmkmItem[]>(() => {
    const saved = localStorage.getItem("btn_umkm");
    return saved ? JSON.parse(saved) : INITIAL_UMKM;
  });

  const [beritaList, setBeritaList] = useState<BeritaItem[]>(() => {
    const saved = localStorage.getItem("btn_berita");
    return saved ? JSON.parse(saved) : INITIAL_BERITA;
  });

  const [cctvList, setCctvList] = useState<CctvItem[]>(() => {
    const saved = localStorage.getItem("btn_cctv");
    return saved ? JSON.parse(saved) : INITIAL_CCTV;
  });

  const [aparatList, setAparatList] = useState<AparatItem[]>(() => {
    const saved = localStorage.getItem("btn_aparat");
    return saved ? JSON.parse(saved) : INITIAL_APARAT;
  });

  const [kecamatanStats, setKecamatanStats] = useState<KecamatanStats>(() => {
    const saved = localStorage.getItem("btn_stats");
    return saved ? JSON.parse(saved) : INITIAL_KECAMATAN_STATS;
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

  // JIKA TAMPILAN ADMIN DIPILIH
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

  // TAMPILAN USER PUBLIK ASLI BATUNUNGGAL
  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        backgroundColor: "#f8fafc",
        color: "#0f172a",
        minHeight: "100vh",
      }}
    >
      {/* NAVBAR ASLI BATUNUNGGAL */}
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
            style={{ height: "40px" }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div>
            <h1 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0 }}>
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

      {/* HERO SECTION ASLI BATUNUNGGAL */}
      <section
        id="beranda"
        style={{
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
          }}
        >
          <div style={{ position: "relative", zIndex: 2 }}>
            <span
              style={{
                backgroundColor: "rgba(0,168,107,0.2)",
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
                fontSize: "2.4rem",
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
                fontSize: "0.95rem",
                maxWidth: "500px",
                margin: "0 0 2rem 0",
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
              padding: "10px 16px",
              borderRadius: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 2,
            }}
          >
            <span style={{ fontSize: "0.8rem", color: "#e2e8f0" }}>
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
              }}
            >
              Cari
            </button>
          </div>
        </div>

        {/* STATS RIGHT CARDS ASLI BATUNUNGGAL */}
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
              {kecamatanStats.totalPopulasi.toLocaleString("id-ID")}
            </div>
            <span
              style={{ fontSize: "0.8rem", color: "#00a86b", fontWeight: 700 }}
            >
              Jiwa di {kecamatanStats.jumlahKelurahan} Kelurahan Wilayah
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

      {/* PROFIL & WILAYAH SECTION */}
      <section
        id="profil"
        style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}
      >
        <h2
          style={{
            fontSize: "1.4rem",
            fontWeight: 800,
            margin: "0 0 0.5rem 0",
          }}
        >
          Profil & Wilayah Kecamatan
        </h2>
        <p
          style={{
            color: "#64748b",
            fontSize: "0.9rem",
            margin: "0 0 1.5rem 0",
          }}
        >
          Sejarah singkat, visi-misi, dan pemetaan geografis Batununggal.
        </p>
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            padding: "1.5rem",
          }}
        >
          <iframe
            title="Peta Batununggal"
            src="https://maps.google.com/maps?q=Kecamatan%20Batununggal%20Bandung&t=&z=14&ie=UTF8&iwloc=&output=embed"
            style={{
              width: "100%",
              height: "300px",
              border: "none",
              borderRadius: "12px",
            }}
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          backgroundColor: "#1e293b",
          color: "#94a3b8",
          padding: "2rem",
          textAlign: "center",
          marginTop: "3rem",
          fontSize: "0.85rem",
        }}
      >
        <p style={{ margin: 0 }}>
          © 2026 Portal Resmi Kecamatan Batununggal - Desa Digital LSKK
        </p>
      </footer>
    </div>
  );
}
