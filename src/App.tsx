import React, { useState, useEffect } from "react";
import {
  Building2,
  ShieldCheck,
  Wifi,
  FileText,
  Users,
  MapPin,
  Lock,
  Send,
  CheckCircle2,
  Globe,
  Server,
  Zap,
  BarChart3,
  Compass,
  Newspaper,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { AdminPage } from "./components/AdminPage";
import type {
  UmkmItem,
  BeritaItem,
  CctvItem,
  AparatItem,
} from "./components/AdminPage";
import "./App.css";

const INITIAL_PENGADUAN: any[] = [
  {
    id: "1",
    rt: "01",
    nama: "Deden Supriatna",
    pesan:
      "Permohonan perbaikan penerangan jalan umum di area RW 03 Batununggal.",
    tanggal: "3 Agustus 2026",
    status: "Diproses",
  },
  {
    id: "2",
    rt: "02",
    nama: "Ibu Nurhayati",
    pesan: "Pengurusan surat pengantar domisili usaha via portal mandiri.",
    tanggal: "1 Agustus 2026",
    status: "Menunggu",
  },
];

const INITIAL_UMKM: UmkmItem[] = [
  {
    id: 1,
    nama: "Kerajinan Tangan Khas Batununggal",
    kategori: "Kerajinan",
    harga: "Rp 50.000 / pcs",
    desc: "Produk kerajinan tangan kreatif karya warga tempatan Kelurahan Batununggal.",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    nama: "Kuliner & Herbal Nusantara Batununggal",
    kategori: "Kuliner",
    harga: "Rp 25.000 / porsi",
    desc: "Olahan makanan tradisional sehat dan minuman herbal produksi UMKM warga.",
    image:
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=800",
  },
];

const INITIAL_BERITA: BeritaItem[] = [
  {
    id: 1,
    judul: "Sosialisasi Digitalisasi Pelayanan Publik Kelurahan Batununggal",
    kategori: "Pengumuman",
    tanggal: "2 Agustus 2026",
    desc: "Kelurahan Batununggal mempercepat pelayanan KTP, KK, dan perizinan berbasis digital.",
    image:
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    judul: "Pelatihan Literasi Digital & Pemasaran UMKM Warga",
    kategori: "Edukasi",
    tanggal: "28 Juli 2026",
    desc: "Program pelatihan penggunaan teknologi digital demi peningkatan ekonomi warga Batununggal.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
  },
];

const INITIAL_CCTV: CctvItem[] = [
  {
    id: 1,
    name: "Kamera 01 - Kantor Kelurahan Batununggal",
    loc: "Jl. Batununggal Raya",
    img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "Kamera 02 - Simpang Utama Batununggal",
    loc: "Sektor Batununggal Indah",
    img: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=800",
  },
];

const INITIAL_APARAT: AparatItem[] = [
  {
    id: 1,
    nama: "Lurah Batununggal",
    jabatan: "Kepala Kelurahan",
    kontak: "0812-3456-7890",
  },
  {
    id: 2,
    nama: "Sekretaris Kelurahan",
    jabatan: "Pelayanan Administrasi",
    kontak: "0813-9876-5432",
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<"public" | "admin">("public");

  const [pengaduanList, setPengaduanList] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem("bt_pengaduan");
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
      const saved = localStorage.getItem("bt_umkm");
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_UMKM;
    } catch {
      return INITIAL_UMKM;
    }
  });

  const [beritaList, setBeritaList] = useState<BeritaItem[]>(() => {
    try {
      const saved = localStorage.getItem("bt_berita_v5");
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
      const saved = localStorage.getItem("bt_cctv");
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_CCTV;
    } catch {
      return INITIAL_CCTV;
    }
  });

  const [aparatList, setAparatList] = useState<AparatItem[]>(() => {
    try {
      const saved = localStorage.getItem("bt_aparat");
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0
        ? parsed
        : INITIAL_APARAT;
    } catch {
      return INITIAL_APARAT;
    }
  });

  const [wargaStats, setWargaStats] = useState<any>(() => {
    try {
      const saved = localStorage.getItem("bt_wargastats");
      return saved
        ? JSON.parse(saved)
        : {
            totalWarga: 12500,
            totalKK: 3400,
            usiaProduktif: 8200,
            lansia: 1100,
          };
    } catch {
      return {
        totalWarga: 12500,
        totalKK: 3400,
        usiaProduktif: 8200,
        lansia: 1100,
      };
    }
  });

  useEffect(() => {
    localStorage.setItem("bt_pengaduan", JSON.stringify(pengaduanList));
    localStorage.setItem("bt_umkm", JSON.stringify(umkmList));
    localStorage.setItem("bt_berita_v5", JSON.stringify(beritaList));
    localStorage.setItem("bt_cctv", JSON.stringify(cctvList));
    localStorage.setItem("bt_aparat", JSON.stringify(aparatList));
    localStorage.setItem("bt_wargastats", JSON.stringify(wargaStats));
  }, [pengaduanList, umkmList, beritaList, cctvList, aparatList, wargaStats]);

  const [selectedBerita, setSelectedBerita] = useState<BeritaItem | null>(null);

  const [nama, setNama] = useState("");
  const [rt, setRt] = useState("01");
  const [pesan, setPesan] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitPengaduan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !pesan) return;

    const newReport = {
      id: Date.now().toString(),
      rt,
      nama,
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

  if (currentPage === "admin") {
    const AdminComp = AdminPage as any;
    return (
      <AdminComp
        pengaduanList={pengaduanList}
        onUpdatePengaduanStatus={(id: string, status: any) =>
          setPengaduanList((prev: any) =>
            prev.map((i: any) => (i.id === id ? { ...i, status } : i)),
          )
        }
        onDeletePengaduan={(id: string) =>
          setPengaduanList((prev: any) => prev.filter((i: any) => i.id !== id))
        }
        umkmList={umkmList}
        onAddUmkm={(item: any) =>
          setUmkmList((prev: any) => [{ ...item, id: Date.now() }, ...prev])
        }
        onDeleteUmkm={(id: string | number) =>
          setUmkmList((prev: any) => prev.filter((i: any) => i.id !== id))
        }
        beritaList={beritaList}
        onAddBerita={(item: any) =>
          setBeritaList((prev: any) => [{ ...item, id: Date.now() }, ...prev])
        }
        onDeleteBerita={(id: string | number) =>
          setBeritaList((prev: any) => prev.filter((i: any) => i.id !== id))
        }
        cctvList={cctvList}
        onAddCctv={(item: any) =>
          setCctvList((prev: any) => [{ ...item, id: Date.now() }, ...prev])
        }
        onDeleteCctv={(id: string | number) =>
          setCctvList((prev: any) => prev.filter((i: any) => i.id !== id))
        }
        aparatList={aparatList}
        onAddAparat={(item: any) =>
          setAparatList((prev: any) => [{ ...item, id: Date.now() }, ...prev])
        }
        onDeleteAparat={(id: string | number) =>
          setAparatList((prev: any) => prev.filter((i: any) => i.id !== id))
        }
        wargaStats={wargaStats}
        onUpdateWargaStats={setWargaStats}
        onBackToPublic={() => setCurrentPage("public")}
      />
    );
  }

  const totalPop = wargaStats?.totalWarga ?? 12500;

  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
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
          padding: "1.2rem 2.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 50,
          boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              backgroundColor: "#0284c7",
              color: "#fff",
              padding: "10px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Building2 size={26} />
          </div>
          <div>
            <h1
              style={{
                fontSize: "1.2rem",
                fontWeight: 800,
                margin: 0,
                color: "#0f172a",
                letterSpacing: "-0.5px",
              }}
            >
              BATUNUNGGAL
            </h1>
            <p
              style={{
                fontSize: "0.8rem",
                color: "#0284c7",
                margin: 0,
                fontWeight: 700,
              }}
            >
              Portal Layanan Digital
            </p>
          </div>
        </div>

        <nav
          style={{
            display: "flex",
            gap: "2rem",
            fontSize: "0.95rem",
            fontWeight: 600,
            color: "#334155",
          }}
        >
          <a
            href="#beranda"
            style={{ color: "#0284c7", textDecoration: "none" }}
          >
            Beranda
          </a>
          <a
            href="#layanan"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Layanan
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
          <a href="#peta" style={{ textDecoration: "none", color: "inherit" }}>
            Peta Wilayah
          </a>
          <a href="#lapor" style={{ textDecoration: "none", color: "inherit" }}>
            Lapor Masalah
          </a>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            type="button"
            onClick={() => setCurrentPage("admin")}
            style={{
              backgroundColor: "#f0f9ff",
              color: "#0284c7",
              border: "1px solid #bae6fd",
              fontSize: "0.85rem",
              fontWeight: 700,
              padding: "9px 18px",
              borderRadius: "10px",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Lock size={15} color="#0284c7" /> Akses Portal Admin
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION WITH IMAGE */}
      <section
        id="beranda"
        style={{
          scrollMarginTop: "150px",
          padding: "4.5rem 2.5rem",
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          gap: "3rem",
          alignItems: "center",
        }}
      >
        <div>
          <span
            style={{
              backgroundColor: "#e0f2fe",
              color: "#0369a1",
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "0.8rem",
              fontWeight: 700,
              border: "1px solid #bae6fd",
              display: "inline-block",
              marginBottom: "1.2rem",
            }}
          >
            ⚡ Digital Village Batununggal
          </span>
          <h2
            style={{
              fontSize: "3.2rem",
              fontWeight: 900,
              margin: "0 0 1.5rem 0",
              lineHeight: 1.15,
              color: "#0f172a",
              letterSpacing: "-1px",
            }}
          >
            Akses Tanpa Batas Layanan Publik
          </h2>
          <p
            style={{
              color: "#475569",
              fontSize: "1.1rem",
              lineHeight: 1.7,
              margin: "0 0 2rem 0",
            }}
          >
            Mewujudkan pelayanan publik yang efisien, transparan, dan inklusif
            melalui integrasi teknologi informasi di setiap lapisan kehidupan
            warga Kelurahan Batununggal.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a
              href="#layanan"
              style={{
                backgroundColor: "#0284c7",
                color: "#fff",
                padding: "14px 28px",
                borderRadius: "30px",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "0.95rem",
                boxShadow: "0 4px 14px rgba(2,132,199,0.3)",
              }}
            >
              Mulai Gunakan Layanan
            </a>
            <a
              href="#peta"
              style={{
                backgroundColor: "#ffffff",
                color: "#0284c7",
                border: "2px solid #bae6fd",
                padding: "14px 28px",
                borderRadius: "30px",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "0.95rem",
              }}
            >
              Pelajari Selengkapnya
            </a>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "28px",
            border: "1px solid #e2e8f0",
            padding: "1.5rem",
            boxShadow: "0 20px 40px -15px rgba(0,0,0,0.06)",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=800"
            alt="Layanan Digital Batununggal"
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "16px",
              marginBottom: "1.25rem",
            }}
          />
          <div
            style={{
              backgroundColor: "#0284c7",
              color: "#fff",
              padding: "1rem",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Zap size={22} />
              <span style={{ fontWeight: 800, fontSize: "0.9rem" }}>
                STATUS SISTEM
              </span>
            </div>
            <span
              style={{
                backgroundColor: "#22c55e",
                color: "#fff",
                fontSize: "0.75rem",
                fontWeight: 800,
                padding: "4px 12px",
                borderRadius: "12px",
              }}
            >
              100% Online
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                padding: "1.25rem",
                borderRadius: "16px",
              }}
            >
              <div
                style={{
                  color: "#0284c7",
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  marginBottom: "4px",
                }}
              >
                TOTAL WARGA
              </div>
              <div
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 900,
                  color: "#0f172a",
                }}
              >
                {totalPop}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#64748b",
                  marginTop: "2px",
                }}
              >
                Jiwa Terdaftar
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                padding: "1.25rem",
                borderRadius: "16px",
              }}
            >
              <div
                style={{
                  color: "#0284c7",
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  marginBottom: "4px",
                }}
              >
                LAYANAN
              </div>
              <div
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 900,
                  color: "#0f172a",
                }}
              >
                24 Jam
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#64748b",
                  marginTop: "2px",
                }}
              >
                Mandiri & Otomatis
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LAYANAN UTAMA SECTION WITH CARD IMAGES */}
      <section
        id="layanan"
        style={{
          scrollMarginTop: "150px",
          padding: "5rem 2.5rem",
          backgroundColor: "#ffffff",
          borderTop: "1px solid #e2e8f0",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            style={{
              textAlign: "center",
              maxWidth: "850px",
              margin: "0 auto 4rem auto",
            }}
          >
            <span
              style={{
                fontSize: "0.8rem",
                color: "#0284c7",
                fontWeight: 800,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              LAYANAN UTAMA DIGITAL VILLAGE
            </span>
            <h2
              style={{
                fontSize: "2.4rem",
                fontWeight: 900,
                margin: "12px 0 1.25rem 0",
                color: "#0f172a",
                lineHeight: 1.2,
              }}
            >
              Portal Terpadu Administrasi & Informasi
            </h2>
            <p
              style={{ color: "#64748b", fontSize: "1.1rem", lineHeight: 1.7 }}
            >
              Infrastruktur digital terintegrasi untuk memudahkan setiap
              kebutuhan pelayanan warga Kelurahan Batununggal.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2.5rem",
            }}
          >
            {/* Card 1: Layanan Mandiri */}
            <div
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #cbd5e1",
                borderRadius: "20px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800"
                alt="Layanan Mandiri"
                style={{ width: "100%", height: "180px", objectFit: "cover" }}
              />
              <div
                style={{
                  padding: "2rem",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      backgroundColor: "#0284c7",
                      color: "#fff",
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <FileText size={22} />
                  </div>
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      color: "#0f172a",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Layanan Mandiri
                  </h3>
                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "#475569",
                      lineHeight: 1.6,
                      margin: "0 0 1.5rem 0",
                    }}
                  >
                    Portal mandiri (*self-service*) untuk mengurus surat
                    pengantar, pengaduan, dan berkas kependudukan tanpa antre.
                  </p>
                </div>
                <a
                  href="#lapor"
                  style={{
                    color: "#0284c7",
                    fontWeight: 800,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  Akses Portal Mandiri <ArrowRight size={16} />
                </a>
              </div>
            </div>

            {/* Card 2: Internet Desa */}
            <div
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #cbd5e1",
                borderRadius: "20px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
                alt="Internet Desa"
                style={{ width: "100%", height: "180px", objectFit: "cover" }}
              />
              <div
                style={{
                  padding: "2rem",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      backgroundColor: "#0284c7",
                      color: "#fff",
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <Wifi size={22} />
                  </div>
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      color: "#0f172a",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Internet Kelurahan
                  </h3>
                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "#475569",
                      lineHeight: 1.6,
                      margin: "0 0 1.5rem 0",
                    }}
                  >
                    Akses jaringan Wi-Fi publik gratis yang tersebar di titik
                    publik dan fasilitas warga Kelurahan Batununggal.
                  </p>
                </div>
                <a
                  href="#peta"
                  style={{
                    color: "#0284c7",
                    fontWeight: 800,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  Lihat Lokasi Wi-Fi <ArrowRight size={16} />
                </a>
              </div>
            </div>

            {/* Card 3: Pusat Data */}
            <div
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #cbd5e1",
                borderRadius: "20px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800"
                alt="Pusat Data Desa"
                style={{ width: "100%", height: "180px", objectFit: "cover" }}
              />
              <div
                style={{
                  padding: "2rem",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      backgroundColor: "#0284c7",
                      color: "#fff",
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <Server size={22} />
                  </div>
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      color: "#0f172a",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Pusat Data Terpadu
                  </h3>
                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "#475569",
                      lineHeight: 1.6,
                      margin: "0 0 1.5rem 0",
                    }}
                  >
                    Pusat data digital lokal yang terenkripsi aman untuk
                    pengelolaan arsip, statistik kependudukan, dan laporan.
                  </p>
                </div>
                <a
                  href="#statistik"
                  style={{
                    color: "#0284c7",
                    fontWeight: 800,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  Standar Keamanan <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BERITA & PENGUMUMAN SECTION WITH IMAGES */}
      <section
        id="berita"
        style={{
          scrollMarginTop: "150px",
          padding: "5rem 2.5rem",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "2.5rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "0.8rem",
                color: "#0284c7",
                fontWeight: 800,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              INFORMASI TERKINI
            </span>
            <h2
              style={{
                fontSize: "2.2rem",
                fontWeight: 900,
                margin: "4px 0 0 0",
                color: "#0f172a",
              }}
            >
              Kabar & Kegiatan Batununggal
            </h2>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "2rem",
          }}
        >
          {beritaList.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 8px 25px rgba(0,0,0,0.03)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                src={item.image}
                alt={item.judul}
                style={{ width: "100%", height: "220px", objectFit: "cover" }}
              />
              <div
                style={{
                  padding: "1.75rem",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span
                    style={{
                      backgroundColor: "#e0f2fe",
                      color: "#0369a1",
                      padding: "4px 12px",
                      borderRadius: "12px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                    }}
                  >
                    {item.kategori}
                  </span>
                  <h3
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 800,
                      margin: "10px 0 6px 0",
                      color: "#0f172a",
                    }}
                  >
                    {item.judul}
                  </h3>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "#64748b",
                      marginBottom: "10px",
                      fontWeight: 600,
                    }}
                  >
                    📅 {item.tanggal}
                  </div>
                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "#475569",
                      margin: "0 0 1.25rem 0",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedBerita(item)}
                  style={{
                    backgroundColor: "#f0f9ff",
                    color: "#0284c7",
                    border: "1px solid #bae6fd",
                    padding: "10px 18px",
                    borderRadius: "10px",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    alignSelf: "flex-start",
                  }}
                >
                  <Newspaper size={16} /> Baca Selengkapnya
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

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
              borderRadius: "20px",
              maxWidth: "550px",
              width: "100%",
              overflow: "hidden",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedBerita.image}
              alt={selectedBerita.judul}
              style={{ width: "100%", height: "240px", objectFit: "cover" }}
            />
            <div style={{ padding: "2rem" }}>
              <span
                style={{
                  backgroundColor: "#e0f2fe",
                  color: "#0369a1",
                  padding: "4px 12px",
                  borderRadius: "12px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                }}
              >
                {selectedBerita.kategori}
              </span>
              <h3
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 900,
                  margin: "10px 0 6px 0",
                  color: "#0f172a",
                }}
              >
                {selectedBerita.judul}
              </h3>
              <p
                style={{
                  fontSize: "1rem",
                  color: "#475569",
                  lineHeight: 1.7,
                  margin: "1rem 0",
                }}
              >
                {selectedBerita.desc}
              </p>
              <button
                type="button"
                onClick={() => setSelectedBerita(null)}
                style={{
                  backgroundColor: "#0284c7",
                  color: "#fff",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "10px",
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

      {/* 5. POTENSI UMKM SECTION WITH IMAGES */}
      <section
        id="umkm"
        style={{
          scrollMarginTop: "150px",
          padding: "5rem 2.5rem",
          backgroundColor: "#ffffff",
          borderTop: "1px solid #e2e8f0",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            style={{
              fontSize: "0.8rem",
              color: "#0284c7",
              fontWeight: 800,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            EKONOMI LOKAL
          </div>
          <h2
            style={{
              fontSize: "2.2rem",
              fontWeight: 900,
              margin: "4px 0 1.5rem 0",
              color: "#0f172a",
            }}
          >
            Etalase UMKM Batununggal
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem",
            }}
          >
            {umkmList.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: "#f8fafc",
                  border: "1px solid #cbd5e1",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.03)",
                }}
              >
                <img
                  src={item.image}
                  alt={item.nama}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <div style={{ padding: "1.75rem" }}>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "#0284c7",
                      fontWeight: 800,
                    }}
                  >
                    <ShoppingBag
                      size={14}
                      style={{
                        display: "inline",
                        verticalAlign: "middle",
                        marginRight: "4px",
                      }}
                    />
                    {item.kategori}
                  </span>
                  <h3
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 800,
                      margin: "6px 0 6px 0",
                      color: "#0f172a",
                    }}
                  >
                    {item.nama}
                  </h3>
                  <div
                    style={{
                      fontSize: "1rem",
                      fontWeight: 800,
                      color: "#0284c7",
                      marginBottom: "10px",
                    }}
                  >
                    {item.harga}
                  </div>
                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "#475569",
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. STATISTIK DENGAN IKONOGRAFI SECTION */}
      <section
        style={{ padding: "5rem 2.5rem", maxWidth: "1280px", margin: "0 auto" }}
      >
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span
            style={{
              fontSize: "0.8rem",
              color: "#0284c7",
              fontWeight: 800,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            STATISTIK & MANFAAT TRANSFORMASI
          </span>
          <h2
            style={{
              fontSize: "2.2rem",
              fontWeight: 900,
              margin: "6px 0 0 0",
              color: "#0f172a",
            }}
          >
            Membangun Ekosistem Terhubung
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "20px",
              padding: "2rem",
              boxShadow: "0 10px 25px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ color: "#0284c7", marginBottom: "1rem" }}>
              <BarChart3 size={32} />
            </div>
            <h4
              style={{
                fontSize: "1.15rem",
                fontWeight: 800,
                margin: "0 0 8px 0",
              }}
            >
              Efisiensi Administrasi
            </h4>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#64748b",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Proses birokrasi yang sebelumnya memakan waktu berhari-hari kini
              dapat diselesaikan dalam hitungan menit via otomatisasi.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "20px",
              padding: "2rem",
              boxShadow: "0 10px 25px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ color: "#0284c7", marginBottom: "1rem" }}>
              <ShieldCheck size={32} />
            </div>
            <h4
              style={{
                fontSize: "1.15rem",
                fontWeight: 800,
                margin: "0 0 8px 0",
              }}
            >
              Transparansi Informasi
            </h4>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#64748b",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Akses terbuka terhadap program pembangunan dan laporan kinerja
              kelurahan yang dapat dipantau langsung oleh seluruh warga.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "20px",
              padding: "2rem",
              boxShadow: "0 10px 25px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ color: "#0284c7", marginBottom: "1rem" }}>
              <Users size={32} />
            </div>
            <h4
              style={{
                fontSize: "1.15rem",
                fontWeight: 800,
                margin: "0 0 8px 0",
              }}
            >
              Program Literasi Digital
            </h4>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#64748b",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Pelatihan berkelanjutan bagi warga untuk memaksimalkan penggunaan
              teknologi demi peningkatan ekonomi UMKM lokal.
            </p>
          </div>
        </div>
      </section>

      {/* 7. PETA STATIK RESPONSIF & BATAS WILAYAH SECTION */}
      <section
        id="peta"
        style={{
          scrollMarginTop: "150px",
          padding: "4rem 2.5rem",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "2rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "#0284c7",
                fontWeight: 800,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              PEMETAAN WILAYAH
            </div>
            <h2
              style={{
                fontSize: "2.2rem",
                fontWeight: 900,
                margin: "4px 0 0 0",
                color: "#0f172a",
              }}
            >
              Peta Statik Kelurahan Batununggal
            </h2>
          </div>
          <div
            style={{
              backgroundColor: "#e0f2fe",
              color: "#0369a1",
              padding: "8px 16px",
              borderRadius: "12px",
              fontSize: "0.85rem",
              fontWeight: 700,
              border: "1px solid #bae6fd",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <MapPin size={16} /> Bandung, Jawa Barat
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "24px",
            border: "1px solid #e2e8f0",
            padding: "1.5rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingTop: "45%",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid #cbd5e1",
            }}
          >
            <iframe
              title="Peta Kelurahan Batununggal"
              src="https://maps.google.com/maps?q=Batununggal%20Bandung&t=&z=15&ie=UTF8&iwloc=&output=embed"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </div>

          <div
            style={{
              marginTop: "1.75rem",
              padding: "1rem",
              backgroundColor: "#f8fafc",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.9rem",
                fontWeight: 800,
                color: "#0284c7",
                marginBottom: "1rem",
              }}
            >
              <Compass size={18} /> BATAS WILAYAH KELURAHAN BATUNUNGGAL
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid #cbd5e1",
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#64748b",
                    fontWeight: 700,
                  }}
                >
                  UTARA
                </span>
                <div
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    color: "#0f172a",
                  }}
                >
                  Kecamatan Lengkong
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid #cbd5e1",
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#64748b",
                    fontWeight: 700,
                  }}
                >
                  SELATAN
                </span>
                <div
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    color: "#0f172a",
                  }}
                >
                  Kecamatan Bandung Kidul
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid #cbd5e1",
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#64748b",
                    fontWeight: 700,
                  }}
                >
                  TIMUR
                </span>
                <div
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    color: "#0f172a",
                  }}
                >
                  Kecamatan Kiaracondong
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid #cbd5e1",
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#64748b",
                    fontWeight: 700,
                  }}
                >
                  BARAT
                </span>
                <div
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    color: "#0f172a",
                  }}
                >
                  Kecamatan Regol
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FORM LAPOR MASALAH WITH SIDE BANNER IMAGE */}
      <section
        id="lapor"
        style={{
          scrollMarginTop: "150px",
          padding: "5rem 2.5rem",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "28px",
            border: "1px solid #e2e8f0",
            padding: "2.5rem",
            boxShadow: "0 20px 40px rgba(0,0,0,0.04)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "3rem",
            alignItems: "center",
          }}
        >
          <div>
            <img
              src="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&q=80&w=800"
              alt="Layanan Pengaduan Warga"
              style={{
                width: "100%",
                height: "280px",
                objectFit: "cover",
                borderRadius: "20px",
                marginBottom: "1.5rem",
              }}
            />
            <span
              style={{
                fontSize: "0.8rem",
                color: "#0284c7",
                fontWeight: 800,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              LAYANAN PENGADUAN WARGA
            </span>
            <h2
              style={{
                fontSize: "2.2rem",
                fontWeight: 900,
                margin: "6px 0 1rem 0",
                color: "#0f172a",
              }}
            >
              Sampaikan Aspirasi & Laporan Masalah
            </h2>
            <p
              style={{
                color: "#64748b",
                fontSize: "1rem",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Laporkan kendala fasilitas publik, pengurusan dokumen, atau saran
              langsung kepada tim pelayanan Kelurahan Batununggal.
            </p>
          </div>

          <div>
            {submitted ? (
              <div
                style={{
                  backgroundColor: "#e0f2fe",
                  color: "#0369a1",
                  padding: "1.5rem",
                  borderRadius: "16px",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "1.05rem",
                }}
              >
                <CheckCircle2 size={24} /> Laporan Anda telah berhasil terkirim
                dan sedang diproses oleh petugas!
              </div>
            ) : (
              <form
                onSubmit={handleSubmitPengaduan}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 800,
                      display: "block",
                      marginBottom: "8px",
                      color: "#0f172a",
                    }}
                  >
                    Nama Lengkap Warga
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan nama lengkap Anda"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: "12px",
                      border: "1px solid #cbd5e1",
                      boxSizing: "border-box",
                      backgroundColor: "#f8fafc",
                      fontSize: "1rem",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 800,
                      display: "block",
                      marginBottom: "8px",
                      color: "#0f172a",
                    }}
                  >
                    RT / Wilayah
                  </label>
                  <select
                    value={rt}
                    onChange={(e) => setRt(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: "12px",
                      border: "1px solid #cbd5e1",
                      boxSizing: "border-box",
                      backgroundColor: "#f8fafc",
                      fontSize: "1rem",
                      outline: "none",
                    }}
                  >
                    <option value="01">RT 01 Batununggal</option>
                    <option value="02">RT 02 Batununggal</option>
                    <option value="03">RT 03 Batununggal</option>
                    <option value="04">RT 04 Batununggal</option>
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 800,
                      display: "block",
                      marginBottom: "8px",
                      color: "#0f172a",
                    }}
                  >
                    Pesan / Laporan
                  </label>
                  <textarea
                    placeholder="Tuliskan isi laporan Anda secara detail..."
                    value={pesan}
                    onChange={(e) => setPesan(e.target.value)}
                    required
                    rows={4}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: "12px",
                      border: "1px solid #cbd5e1",
                      boxSizing: "border-box",
                      backgroundColor: "#f8fafc",
                      fontSize: "1rem",
                      outline: "none",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    backgroundColor: "#0284c7",
                    color: "#fff",
                    border: "none",
                    padding: "16px",
                    borderRadius: "12px",
                    fontWeight: 800,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    fontSize: "1.05rem",
                    marginTop: "0.5rem",
                    boxShadow: "0 6px 20px rgba(2,132,199,0.25)",
                  }}
                >
                  <Send size={18} /> Kirim Laporan Sekarang
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer
        style={{
          backgroundColor: "#0f172a",
          color: "#cbd5e1",
          padding: "4rem 2.5rem 2.5rem 2.5rem",
          marginTop: "5rem",
          fontSize: "0.9rem",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "3rem",
            marginBottom: "3rem",
            borderBottom: "1px solid #334155",
            paddingBottom: "3rem",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: 900,
                color: "#fff",
                marginBottom: "1rem",
              }}
            >
              Kelurahan Batununggal
            </h3>
            <p
              style={{
                margin: 0,
                color: "#94a3b8",
                lineHeight: 1.6,
                fontSize: "0.95rem",
              }}
            >
              Portal Layanan Publik Digital terpadu. Mewujudkan pelayanan
              efisien, transparan, dan inklusif bagi seluruh warga.
            </p>
          </div>
          <div>
            <h4
              style={{
                fontSize: "1rem",
                fontWeight: 900,
                color: "#fff",
                marginBottom: "1rem",
              }}
            >
              Tautan Cepat
            </h4>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <span
                style={{
                  color: "#94a3b8",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                <Globe size={16} /> Portal Kabupaten / Kota
              </span>
              <span
                style={{
                  color: "#94a3b8",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                <Globe size={16} /> Kemitraan Digital
              </span>
            </div>
          </div>
          <div>
            <h4
              style={{
                fontSize: "1rem",
                fontWeight: 900,
                color: "#fff",
                marginBottom: "1rem",
              }}
            >
              Kebijakan & Ketentuan
            </h4>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <span style={{ color: "#94a3b8", cursor: "pointer" }}>
                Kebijakan Privasi Data
              </span>
              <span style={{ color: "#94a3b8", cursor: "pointer" }}>
                Syarat & Ketentuan Layanan
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.85rem" }}>
            © 2026 Pemerintah Kelurahan Batununggal. Dibawah naungan Pemerintah
            Kota Bandung.
          </p>
          <button
            type="button"
            onClick={() => setCurrentPage("admin")}
            style={{
              background: "transparent",
              color: "#38bdf8",
              border: "1px solid rgba(56,189,248,0.4)",
              padding: "8px 16px",
              borderRadius: "8px",
              fontSize: "0.8rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            🔒 Akses Login Admin
          </button>
        </div>
      </footer>
    </div>
  );
}
