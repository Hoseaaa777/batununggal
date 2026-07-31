// update layout admin batununggal terbaru
import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Store,
  MessageSquare,
  Video,
  Newspaper,
  Shield,
  Settings,
  Plus,
  Trash2,
  ArrowLeft,
  LogOut,
  AlertCircle,
  Download,
  Eye,
  CheckCircle2,
  Building2,
  TrendingUp,
  Activity,
  Calendar,
  Layers,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

// --- INTERFACES ---
export interface Pengaduan {
  id: string;
  nama: string;
  kelurahan: string;
  pesan: string;
  tanggal: string;
  status: "Menunggu" | "Diproses" | "Selesai";
}

export interface UmkmItem {
  id: number;
  nama: string;
  kategori: string;
  harga: string;
  desc: string;
  image: string;
}

export interface BeritaItem {
  id: number;
  judul: string;
  kategori: string;
  tanggal: string;
  desc: string;
  image: string;
}

export interface CctvItem {
  id: number;
  name: string;
  loc: string;
  img: string;
}

export interface AparatItem {
  id: number;
  nama: string;
  jabatan: string;
  kontak: string;
}

export interface KecamatanStats {
  totalPopulasi: number;
  jumlahKelurahan: number;
  usiaProduktif: number;
  anakRemaja: number;
  lansia: number;
  totalKK: number;
}

interface AdminPageProps {
  pengaduanList: Pengaduan[];
  onUpdatePengaduanStatus: (
    id: string,
    status: "Menunggu" | "Diproses" | "Selesai",
  ) => void;
  onDeletePengaduan: (id: string) => void;

  umkmList: UmkmItem[];
  onAddUmkm: (item: Omit<UmkmItem, "id">) => void;
  onDeleteUmkm: (id: number) => void;

  beritaList: BeritaItem[];
  onAddBerita: (item: Omit<BeritaItem, "id">) => void;
  onDeleteBerita: (id: number) => void;

  cctvList: CctvItem[];
  onAddCctv: (item: Omit<CctvItem, "id">) => void;
  onDeleteCctv: (id: number) => void;

  aparatList: AparatItem[];
  onAddAparat: (item: Omit<AparatItem, "id">) => void;
  onDeleteAparat: (id: number) => void;

  kecamatanStats: KecamatanStats;
  onUpdateKecamatanStats: (newStats: KecamatanStats) => void;

  onBackToPublic: () => void;
}

const CHART_PERTUMBUHAN = [
  { tahun: "2022", total: 112000 },
  { tahun: "2023", total: 114500 },
  { tahun: "2024", total: 116200 },
  { tahun: "2025", total: 117500 },
  { tahun: "2026", total: 118400 },
];

const CHART_KELAHIRAN_KEMATIAN = [
  { tahun: "2022", kelahiran: 1450, kematian: 420 },
  { tahun: "2023", kelahiran: 1520, kematian: 410 },
  { tahun: "2024", kelahiran: 1480, kematian: 390 },
  { tahun: "2025", kelahiran: 1600, kematian: 405 },
  { tahun: "2026", kelahiran: 1350, kematian: 350 },
];

export const AdminPage: React.FC<AdminPageProps> = ({
  pengaduanList,
  onUpdatePengaduanStatus,
  onDeletePengaduan,
  umkmList,
  onAddUmkm,
  onDeleteUmkm,
  beritaList,
  onAddBerita,
  onDeleteBerita,
  cctvList,
  onAddCctv,
  onDeleteCctv,
  aparatList,
  onAddAparat,
  onDeleteAparat,
  kecamatanStats,
  onUpdateKecamatanStats,
  onBackToPublic,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMsg(message);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const [activeTab, setActiveTab] = useState<
    | "dashboard"
    | "warga"
    | "umkm"
    | "pengaduan"
    | "cctv"
    | "berita"
    | "aparat"
    | "pengaturan"
  >("dashboard");

  const [newUmkm, setNewUmkm] = useState({
    nama: "",
    kategori: "Kuliner",
    harga: "",
    desc: "",
    image: "",
  });
  const [newBerita, setNewBerita] = useState({
    judul: "",
    kategori: "Pengumuman",
    tanggal: "",
    desc: "",
    image: "",
  });
  const [newCctv, setNewCctv] = useState({ name: "", loc: "", img: "" });
  const [newAparat, setNewAparat] = useState({
    nama: "",
    jabatan: "",
    kontak: "",
  });
  const [editStats, setEditStats] = useState<KecamatanStats>(kecamatanStats);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "batununggal") {
      setIsLoggedIn(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Username atau password salah!");
    }
  };

  if (!isLoggedIn) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#0f172a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <button
          type="button"
          onClick={onBackToPublic}
          style={{
            position: "absolute",
            top: "24px",
            left: "24px",
            backgroundColor: "rgba(255,255,255,0.1)",
            color: "#f8fafc",
            border: "1px solid rgba(255,255,255,0.2)",
            padding: "10px 18px",
            borderRadius: "10px",
            fontWeight: 700,
            fontSize: "0.85rem",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backdropFilter: "blur(10px)",
          }}
        >
          <ArrowLeft size={16} /> Kembali ke Portal Publik
        </button>

        <div
          style={{
            backgroundColor: "#1e293b",
            borderRadius: "20px",
            border: "1px solid #334155",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
            maxWidth: "420px",
            width: "100%",
            padding: "2.5rem",
            boxSizing: "border-box",
            color: "#f8fafc",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #0d9488 0%, #4f46e5 100%)",
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
                boxShadow: "0 10px 20px rgba(13,148,136,0.3)",
              }}
            >
              <Building2 color="#ffffff" size={32} />
            </div>
            <h2
              style={{
                margin: "0 0 6px 0",
                fontSize: "1.6rem",
                fontWeight: 800,
                letterSpacing: "-0.5px",
              }}
            >
              Pusat Kontrol Admin
            </h2>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#94a3b8" }}>
              Kecamatan Batununggal Kota Bandung
            </p>
          </div>

          {errorMsg && (
            <div
              style={{
                backgroundColor: "rgba(239,68,68,0.15)",
                color: "#fca5a5",
                padding: "12px 14px",
                borderRadius: "10px",
                fontSize: "0.85rem",
                marginBottom: "1.25rem",
                border: "1px solid rgba(239,68,68,0.3)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <AlertCircle size={16} /> {errorMsg}
            </div>
          )}

          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
          >
            <div>
              <label
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  display: "block",
                  marginBottom: "8px",
                  color: "#cbd5e1",
                }}
              >
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username admin"
                required
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid #475569",
                  backgroundColor: "#0f172a",
                  color: "#ffffff",
                  boxSizing: "border-box",
                  fontSize: "0.9rem",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  display: "block",
                  marginBottom: "8px",
                  color: "#cbd5e1",
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                required
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid #475569",
                  backgroundColor: "#0f172a",
                  color: "#ffffff",
                  boxSizing: "border-box",
                  fontSize: "0.9rem",
                  outline: "none",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
                color: "#ffffff",
                border: "none",
                padding: "14px",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "0.95rem",
                cursor: "pointer",
                marginTop: "0.5rem",
                boxShadow: "0 10px 15px -3px rgba(13,148,136,0.3)",
              }}
            >
              Otorisasi & Masuk System
            </button>
          </form>
        </div>
      </div>
    );
  }

  const pctProduktif =
    Math.round(
      (kecamatanStats.usiaProduktif / kecamatanStats.totalPopulasi) * 100,
    ) || 0;
  const pctAnak =
    Math.round(
      (kecamatanStats.anakRemaja / kecamatanStats.totalPopulasi) * 100,
    ) || 0;
  const pctLansia =
    Math.round((kecamatanStats.lansia / kecamatanStats.totalPopulasi) * 100) ||
    0;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f1f5f9",
        display: "flex",
        color: "#0f172a",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* FLOATING TOAST NOTIFICATION */}
      {toastMsg && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            backgroundColor: "#0f172a",
            color: "#ffffff",
            padding: "12px 22px",
            borderRadius: "12px",
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            zIndex: 9999,
            fontSize: "0.875rem",
            fontWeight: 600,
            borderLeft: "5px solid #0d9488",
          }}
        >
          <CheckCircle2 color="#0d9488" size={20} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* DARK SLEEK SIDEBAR */}
      <aside
        style={{
          width: "270px",
          backgroundColor: "#0f172a",
          color: "#f8fafc",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
          borderRight: "1px solid #1e293b",
        }}
      >
        <div
          style={{
            padding: "1.75rem 1.5rem",
            borderBottom: "1px solid #1e293b",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #0d9488 0%, #4f46e5 100%)",
              color: "#fff",
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: "1.1rem",
              boxShadow: "0 4px 12px rgba(13,148,136,0.3)",
            }}
          >
            BTN
          </div>
          <div>
            <h1
              style={{
                fontSize: "1rem",
                fontWeight: 800,
                margin: 0,
                color: "#ffffff",
                letterSpacing: "-0.3px",
              }}
            >
              BATUNUNGGAL
            </h1>
            <p
              style={{
                fontSize: "0.725rem",
                margin: 0,
                color: "#0d9488",
                fontWeight: 700,
              }}
            >
              ADMIN CONTROL
            </p>
          </div>
        </div>

        <nav
          style={{
            padding: "1.25rem 0.85rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
            flexGrow: 1,
            overflowY: "auto",
          }}
        >
          <div
            style={{
              fontSize: "0.7rem",
              fontWeight: 800,
              color: "#475569",
              padding: "8px 12px 4px 12px",
              letterSpacing: "0.8px",
            }}
          >
            PUSAT KONTROL
          </div>

          <button
            type="button"
            onClick={() => setActiveTab("dashboard")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "11px 16px",
              borderRadius: "10px",
              border: "none",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer",
              textAlign: "left",
              backgroundColor:
                activeTab === "dashboard" ? "#0d9488" : "transparent",
              color: activeTab === "dashboard" ? "#ffffff" : "#94a3b8",
              boxShadow:
                activeTab === "dashboard"
                  ? "0 4px 12px rgba(13,148,136,0.3)"
                  : "none",
            }}
          >
            <LayoutDashboard size={18} /> Ringkasan Utama
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("warga")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "11px 16px",
              borderRadius: "10px",
              border: "none",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer",
              textAlign: "left",
              backgroundColor:
                activeTab === "warga" ? "#0d9488" : "transparent",
              color: activeTab === "warga" ? "#ffffff" : "#94a3b8",
              boxShadow:
                activeTab === "warga"
                  ? "0 4px 12px rgba(13,148,136,0.3)"
                  : "none",
            }}
          >
            <Users size={18} /> Data Kependudukan
          </button>

          <div
            style={{
              fontSize: "0.7rem",
              fontWeight: 800,
              color: "#475569",
              padding: "16px 12px 4px 12px",
              letterSpacing: "0.8px",
            }}
          >
            KELOLA KONTEN
          </div>

          <button
            type="button"
            onClick={() => setActiveTab("umkm")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "11px 16px",
              borderRadius: "10px",
              border: "none",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer",
              textAlign: "left",
              backgroundColor: activeTab === "umkm" ? "#0d9488" : "transparent",
              color: activeTab === "umkm" ? "#ffffff" : "#94a3b8",
              boxShadow:
                activeTab === "umkm"
                  ? "0 4px 12px rgba(13,148,136,0.3)"
                  : "none",
            }}
          >
            <Store size={18} /> Katalog UMKM
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("pengaduan")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "11px 16px",
              borderRadius: "10px",
              border: "none",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer",
              textAlign: "left",
              backgroundColor:
                activeTab === "pengaduan" ? "#0d9488" : "transparent",
              color: activeTab === "pengaduan" ? "#ffffff" : "#94a3b8",
              boxShadow:
                activeTab === "pengaduan"
                  ? "0 4px 12px rgba(13,148,136,0.3)"
                  : "none",
            }}
          >
            <MessageSquare size={18} /> Pengaduan Warga
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("cctv")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "11px 16px",
              borderRadius: "10px",
              border: "none",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer",
              textAlign: "left",
              backgroundColor: activeTab === "cctv" ? "#0d9488" : "transparent",
              color: activeTab === "cctv" ? "#ffffff" : "#94a3b8",
              boxShadow:
                activeTab === "cctv"
                  ? "0 4px 12px rgba(13,148,136,0.3)"
                  : "none",
            }}
          >
            <Video size={18} /> CCTV Monitoring
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("berita")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "11px 16px",
              borderRadius: "10px",
              border: "none",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer",
              textAlign: "left",
              backgroundColor:
                activeTab === "berita" ? "#0d9488" : "transparent",
              color: activeTab === "berita" ? "#ffffff" : "#94a3b8",
              boxShadow:
                activeTab === "berita"
                  ? "0 4px 12px rgba(13,148,136,0.3)"
                  : "none",
            }}
          >
            <Newspaper size={18} /> Berita & Mading
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("aparat")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "11px 16px",
              borderRadius: "10px",
              border: "none",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer",
              textAlign: "left",
              backgroundColor:
                activeTab === "aparat" ? "#0d9488" : "transparent",
              color: activeTab === "aparat" ? "#ffffff" : "#94a3b8",
              boxShadow:
                activeTab === "aparat"
                  ? "0 4px 12px rgba(13,148,136,0.3)"
                  : "none",
            }}
          >
            <Shield size={18} /> Pejabat Kecamatan
          </button>

          <div
            style={{
              fontSize: "0.7rem",
              fontWeight: 800,
              color: "#475569",
              padding: "16px 12px 4px 12px",
              letterSpacing: "0.8px",
            }}
          >
            SISTEM
          </div>

          <button
            type="button"
            onClick={() => setActiveTab("pengaturan")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "11px 16px",
              borderRadius: "10px",
              border: "none",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer",
              textAlign: "left",
              backgroundColor:
                activeTab === "pengaturan" ? "#0d9488" : "transparent",
              color: activeTab === "pengaturan" ? "#ffffff" : "#94a3b8",
              boxShadow:
                activeTab === "pengaturan"
                  ? "0 4px 12px rgba(13,148,136,0.3)"
                  : "none",
            }}
          >
            <Settings size={18} /> Pengaturan Kredensial
          </button>
        </nav>

        <div
          style={{
            padding: "1.25rem",
            borderTop: "1px solid #1e293b",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{ fontSize: "0.85rem", fontWeight: 800, color: "#ffffff" }}
            >
              Admin Batununggal
            </div>
            <div style={{ fontSize: "0.725rem", color: "#64748b" }}>
              admin@batununggal.id
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsLoggedIn(false)}
            title="Keluar Session"
            style={{
              background: "#334155",
              color: "#f8fafc",
              border: "none",
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
        }}
      >
        {/* EXECUTIVE HEADER */}
        <header
          style={{
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #e2e8f0",
            padding: "1.1rem 2.2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 40,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                backgroundColor: "#ccfbf1",
                color: "#0d9488",
                padding: "8px 14px",
                borderRadius: "20px",
                fontSize: "0.8rem",
                fontWeight: 800,
              }}
            >
              Kecamatan Batununggal
            </div>
            <span style={{ color: "#cbd5e1" }}>|</span>
            <span
              style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}
            >
              Cakupan 8 Kelurahan Wilayah Bandung
            </span>
          </div>

          <button
            type="button"
            onClick={onBackToPublic}
            style={{
              backgroundColor: "#0f172a",
              color: "#ffffff",
              border: "none",
              padding: "9px 18px",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 10px rgba(15,23,42,0.15)",
            }}
          >
            <Eye size={16} /> Lihat Web Publik
          </button>
        </header>

        <main style={{ padding: "2.2rem", flexGrow: 1 }}>
          {/* TAB 1: EXECUTIVE DASHBOARD */}
          {activeTab === "dashboard" && (
            <div>
              {/* HERO BANNER EXECUTIVE */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                  color: "#ffffff",
                  borderRadius: "20px",
                  padding: "2rem 2.5rem",
                  marginBottom: "2rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "0 10px 25px -5px rgba(15,23,42,0.2)",
                }}
              >
                <div>
                  <span
                    style={{
                      backgroundColor: "rgba(13,148,136,0.2)",
                      color: "#2dd4bf",
                      padding: "4px 12px",
                      borderRadius: "15px",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      border: "1px solid rgba(13,148,136,0.4)",
                    }}
                  >
                    DASBOR KONTROL UTAMA
                  </span>
                  <h2
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: 900,
                      margin: "8px 0 6px 0",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    Sistem Informasi Batununggal
                  </h2>
                  <p
                    style={{ margin: 0, color: "#94a3b8", fontSize: "0.9rem" }}
                  >
                    Monitoring terpadu pelayanan publik, data kependudukan, dan
                    pengaduan warga secara real-time.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    showToast("Laporan Rekapitulasi Kecamatan di-export!")
                  }
                  style={{
                    backgroundColor: "#0d9488",
                    color: "#ffffff",
                    border: "none",
                    padding: "12px 20px",
                    borderRadius: "12px",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 8px 16px rgba(13,148,136,0.3)",
                  }}
                >
                  <Download size={16} /> Export Rekapitulasi Data
                </button>
              </div>

              {/* 4 DISTINCT METRIC CARDS */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                  gap: "1.25rem",
                  marginBottom: "2rem",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "16px",
                    padding: "1.5rem",
                    borderTop: "4px solid #0d9488",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "#64748b",
                        fontWeight: 800,
                      }}
                    >
                      POPULASI PENDUDUK
                    </span>
                    <div
                      style={{
                        backgroundColor: "#ccfbf1",
                        color: "#0d9488",
                        padding: "8px",
                        borderRadius: "10px",
                      }}
                    >
                      <Users size={18} />
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: 900,
                      color: "#0f172a",
                      margin: "8px 0 2px 0",
                    }}
                  >
                    {kecamatanStats.totalPopulasi.toLocaleString("id-ID")}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#0d9488",
                      fontWeight: 700,
                    }}
                  >
                    Tersebar di {kecamatanStats.jumlahKelurahan} Kelurahan
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "16px",
                    padding: "1.5rem",
                    borderTop: "4px solid #4f46e5",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "#64748b",
                        fontWeight: 800,
                      }}
                    >
                      KEPALA KELUARGA (KK)
                    </span>
                    <div
                      style={{
                        backgroundColor: "#e0e7ff",
                        color: "#4f46e5",
                        padding: "8px",
                        borderRadius: "10px",
                      }}
                    >
                      <Building2 size={18} />
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: 900,
                      color: "#0f172a",
                      margin: "8px 0 2px 0",
                    }}
                  >
                    {kecamatanStats.totalKK.toLocaleString("id-ID")}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                    Kartu Keluarga Terdata
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "16px",
                    padding: "1.5rem",
                    borderTop: "4px solid #f59e0b",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "#64748b",
                        fontWeight: 800,
                      }}
                    >
                      KATALOG UMKM
                    </span>
                    <div
                      style={{
                        backgroundColor: "#fef3c7",
                        color: "#b45309",
                        padding: "8px",
                        borderRadius: "10px",
                      }}
                    >
                      <Store size={18} />
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: 900,
                      color: "#0f172a",
                      margin: "8px 0 2px 0",
                    }}
                  >
                    {umkmList.length}{" "}
                    <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                      Usaha
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#b45309",
                      fontWeight: 700,
                    }}
                  >
                    Aktif Promosi Digital
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "16px",
                    padding: "1.5rem",
                    borderTop: "4px solid #ef4444",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "#64748b",
                        fontWeight: 800,
                      }}
                    >
                      LAPORAN WARGA
                    </span>
                    <div
                      style={{
                        backgroundColor: "#fee2e2",
                        color: "#dc2626",
                        padding: "8px",
                        borderRadius: "10px",
                      }}
                    >
                      <MessageSquare size={18} />
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: 900,
                      color: "#0f172a",
                      margin: "8px 0 2px 0",
                    }}
                  >
                    {pengaduanList.length}{" "}
                    <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                      Pengaduan
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#dc2626",
                      fontWeight: 700,
                    }}
                  >
                    Layanan Respon Online
                  </div>
                </div>
              </div>

              {/* CHARTS GRID SECTION */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                  gap: "1.5rem",
                  marginBottom: "2rem",
                }}
              >
                {/* GRADIENT AREA CHART (DIFFERENT FROM ANTAPANI) */}
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "20px",
                    padding: "1.75rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: "1.05rem",
                          fontWeight: 800,
                          color: "#0f172a",
                        }}
                      >
                        Laju Pertumbuhan Penduduk
                      </h3>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "0.775rem",
                          color: "#64748b",
                        }}
                      >
                        Kecamatan Batununggal (Area Gradient)
                      </p>
                    </div>
                    <span
                      style={{
                        backgroundColor: "#ccfbf1",
                        color: "#0d9488",
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        padding: "4px 10px",
                        borderRadius: "12px",
                      }}
                    >
                      +1.8% / Thn
                    </span>
                  </div>
                  <div style={{ width: "100%", height: "260px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={CHART_PERTUMBUHAN}>
                        <defs>
                          <linearGradient
                            id="colorTotal"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#0d9488"
                              stopOpacity={0.4}
                            />
                            <stop
                              offset="95%"
                              stopColor="#0d9488"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="tahun" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="total"
                          stroke="#0d9488"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#colorTotal)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* DUAL COLOR BAR CHART */}
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "20px",
                    padding: "1.75rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: "1.05rem",
                          fontWeight: 800,
                          color: "#0f172a",
                        }}
                      >
                        Kelahiran vs Kematian
                      </h3>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "0.775rem",
                          color: "#64748b",
                        }}
                      >
                        Data Statistik Tahunan Wilayah
                      </p>
                    </div>
                  </div>
                  <div style={{ width: "100%", height: "260px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={CHART_KELAHIRAN_KEMATIAN}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="tahun" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="kelahiran"
                          fill="#4f46e5"
                          name="Kelahiran"
                          radius={[6, 6, 0, 0]}
                        />
                        <Bar
                          dataKey="kematian"
                          fill="#f59e0b"
                          name="Kematian"
                          radius={[6, 6, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* DEMOGRAFI AGE BREAKDOWN CARD */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "20px",
                  padding: "1.75rem",
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
                  Rincian Demografi Usia Warga Batununggal
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#f8fafc",
                      padding: "1.25rem",
                      borderRadius: "14px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: 800,
                        fontSize: "0.9rem",
                        marginBottom: "8px",
                      }}
                    >
                      <span style={{ color: "#0d9488" }}>
                        Usia Produktif (18 - 59 Thn)
                      </span>
                      <span>{pctProduktif}%</span>
                    </div>
                    <div
                      style={{
                        height: "8px",
                        backgroundColor: "#e2e8f0",
                        borderRadius: "4px",
                        overflow: "hidden",
                        marginBottom: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: `${pctProduktif}%`,
                          backgroundColor: "#0d9488",
                          height: "100%",
                        }}
                      />
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                      {kecamatanStats.usiaProduktif.toLocaleString("id-ID")}{" "}
                      Jiwa terdata
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: "#f8fafc",
                      padding: "1.25rem",
                      borderRadius: "14px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: 800,
                        fontSize: "0.9rem",
                        marginBottom: "8px",
                      }}
                    >
                      <span style={{ color: "#4f46e5" }}>
                        Anak & Remaja (0 - 17 Thn)
                      </span>
                      <span>{pctAnak}%</span>
                    </div>
                    <div
                      style={{
                        height: "8px",
                        backgroundColor: "#e2e8f0",
                        borderRadius: "4px",
                        overflow: "hidden",
                        marginBottom: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: `${pctAnak}%`,
                          backgroundColor: "#4f46e5",
                          height: "100%",
                        }}
                      />
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                      {kecamatanStats.anakRemaja.toLocaleString("id-ID")} Jiwa
                      terdata
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: "#f8fafc",
                      padding: "1.25rem",
                      borderRadius: "14px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: 800,
                        fontSize: "0.9rem",
                        marginBottom: "8px",
                      }}
                    >
                      <span style={{ color: "#f59e0b" }}>
                        Lanjut Usia (60+ Thn)
                      </span>
                      <span>{pctLansia}%</span>
                    </div>
                    <div
                      style={{
                        height: "8px",
                        backgroundColor: "#e2e8f0",
                        borderRadius: "4px",
                        overflow: "hidden",
                        marginBottom: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: `${pctLansia}%`,
                          backgroundColor: "#f59e0b",
                          height: "100%",
                        }}
                      />
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                      {kecamatanStats.lansia.toLocaleString("id-ID")} Jiwa
                      terdata
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DATA KEPENDUDUKAN */}
          {activeTab === "warga" && (
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "20px",
                padding: "2rem",
                maxWidth: "600px",
              }}
            >
              <h3
                style={{
                  margin: "0 0 0.5rem 0",
                  fontSize: "1.2rem",
                  fontWeight: 800,
                }}
              >
                Update Data Kependudukan Kecamatan
              </h3>
              <p
                style={{
                  margin: "0 0 1.5rem 0",
                  color: "#64748b",
                  fontSize: "0.85rem",
                }}
              >
                Pengaturan angka statistik demografi publik Batununggal.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onUpdateKecamatanStats(editStats);
                  showToast("Data kependudukan berhasil disimpan!");
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.2rem",
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Total Populas Warga (Jiwa)
                  </label>
                  <input
                    type="number"
                    value={editStats.totalPopulasi}
                    onChange={(e) =>
                      setEditStats({
                        ...editStats,
                        totalPopulasi: Number(e.target.value),
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "11px",
                      borderRadius: "10px",
                      border: "1px solid #cbd5e1",
                      fontSize: "0.9rem",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "0.8rem",
                  }}
                >
                  <div>
                    <label
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      Usia Produktif
                    </label>
                    <input
                      type="number"
                      value={editStats.usiaProduktif}
                      onChange={(e) =>
                        setEditStats({
                          ...editStats,
                          usiaProduktif: Number(e.target.value),
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "11px",
                        borderRadius: "10px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.9rem",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      Anak & Remaja
                    </label>
                    <input
                      type="number"
                      value={editStats.anakRemaja}
                      onChange={(e) =>
                        setEditStats({
                          ...editStats,
                          anakRemaja: Number(e.target.value),
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "11px",
                        borderRadius: "10px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.9rem",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      Lanjut Usia
                    </label>
                    <input
                      type="number"
                      value={editStats.lansia}
                      onChange={(e) =>
                        setEditStats({
                          ...editStats,
                          lansia: Number(e.target.value),
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "11px",
                        borderRadius: "10px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.9rem",
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <label
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      Total Kepala Keluarga (KK)
                    </label>
                    <input
                      type="number"
                      value={editStats.totalKK}
                      onChange={(e) =>
                        setEditStats({
                          ...editStats,
                          totalKK: Number(e.target.value),
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "11px",
                        borderRadius: "10px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.9rem",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      Jumlah Kelurahan
                    </label>
                    <input
                      type="number"
                      value={editStats.jumlahKelurahan}
                      onChange={(e) =>
                        setEditStats({
                          ...editStats,
                          jumlahKelurahan: Number(e.target.value),
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "11px",
                        borderRadius: "10px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.9rem",
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    backgroundColor: "#0d9488",
                    color: "#fff",
                    border: "none",
                    padding: "12px",
                    borderRadius: "10px",
                    fontWeight: 700,
                    cursor: "pointer",
                    marginTop: "0.5rem",
                  }}
                >
                  Simpan Perubahan Kependudukan
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: KATALOG UMKM */}
          {activeTab === "umkm" && (
            <div>
              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "20px",
                  padding: "1.75rem",
                  marginBottom: "2rem",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 1rem 0",
                    fontSize: "1.1rem",
                    fontWeight: 800,
                  }}
                >
                  ➕ Tambah Produk UMKM Baru
                </h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onAddUmkm(newUmkm);
                    showToast("Produk UMKM berhasil diterbitkan!");
                    setNewUmkm({
                      nama: "",
                      kategori: "Kuliner",
                      harga: "",
                      desc: "",
                      image: "",
                    });
                  }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "1rem",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Nama Usaha / Produk"
                    value={newUmkm.nama}
                    onChange={(e) =>
                      setNewUmkm({ ...newUmkm, nama: e.target.value })
                    }
                    required
                    style={{
                      padding: "11px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                    }}
                  />
                  <select
                    value={newUmkm.kategori}
                    onChange={(e) =>
                      setNewUmkm({ ...newUmkm, kategori: e.target.value })
                    }
                    style={{
                      padding: "11px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                    }}
                  >
                    <option value="Kuliner">Kuliner</option>
                    <option value="Kerajinan">Kerajinan</option>
                    <option value="Fashion">Fashion & Tekstil</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Harga (misal: Rp 25.000)"
                    value={newUmkm.harga}
                    onChange={(e) =>
                      setNewUmkm({ ...newUmkm, harga: e.target.value })
                    }
                    required
                    style={{
                      padding: "11px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                    }}
                  />
                  <input
                    type="url"
                    placeholder="URL Gambar Produk"
                    value={newUmkm.image}
                    onChange={(e) =>
                      setNewUmkm({ ...newUmkm, image: e.target.value })
                    }
                    required
                    style={{
                      padding: "11px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Deskripsi Produk"
                    value={newUmkm.desc}
                    onChange={(e) =>
                      setNewUmkm({ ...newUmkm, desc: e.target.value })
                    }
                    required
                    style={{
                      gridColumn: "1 / -1",
                      padding: "11px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      gridColumn: "1 / -1",
                      backgroundColor: "#0d9488",
                      color: "#fff",
                      border: "none",
                      padding: "11px",
                      borderRadius: "8px",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <Plus size={18} /> Terbitkan Produk UMKM
                  </button>
                </form>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "1.25rem",
                }}
              >
                {umkmList.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "16px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.nama}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                    <div style={{ padding: "1.25rem" }}>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "#0d9488",
                          fontWeight: 800,
                        }}
                      >
                        {item.kategori}
                      </span>
                      <h4
                        style={{
                          margin: "2px 0 4px 0",
                          fontSize: "1rem",
                          fontWeight: 800,
                        }}
                      >
                        {item.nama}
                      </h4>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          color: "#4f46e5",
                          marginBottom: "8px",
                        }}
                      >
                        {item.harga}
                      </div>
                      <p
                        style={{
                          fontSize: "0.8rem",
                          color: "#64748b",
                          margin: "0 0 1rem 0",
                        }}
                      >
                        {item.desc}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          onDeleteUmkm(item.id);
                          showToast("Produk UMKM dihapus.");
                        }}
                        style={{
                          backgroundColor: "#fef2f2",
                          color: "#ef4444",
                          border: "1px solid #fecaca",
                          padding: "6px 12px",
                          borderRadius: "8px",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Trash2 size={14} /> Hapus Produk
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: LAPORAN & PENGADUAN */}
          {activeTab === "pengaduan" && (
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "20px",
                padding: "1.75rem",
              }}
            >
              <h3
                style={{
                  margin: "0 0 1rem 0",
                  fontSize: "1.2rem",
                  fontWeight: 800,
                }}
              >
                Daftar Pengaduan Warga Masuk
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {pengaduanList.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "14px",
                      padding: "1.25rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <strong>
                        {item.nama} (Kelurahan {item.kelurahan})
                      </strong>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 800,
                          padding: "4px 12px",
                          borderRadius: "20px",
                          backgroundColor:
                            item.status === "Selesai"
                              ? "#dcfce7"
                              : item.status === "Diproses"
                                ? "#fef3c7"
                                : "#fee2e2",
                          color:
                            item.status === "Selesai"
                              ? "#15803d"
                              : item.status === "Diproses"
                                ? "#b45309"
                                : "#b91c1c",
                        }}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p
                      style={{
                        margin: "0 0 10px 0",
                        fontSize: "0.9rem",
                        color: "#334155",
                      }}
                    >
                      "{item.pesan}"
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "0.8rem",
                        color: "#64748b",
                      }}
                    >
                      <span>📅 {item.tanggal}</span>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <span>Status:</span>
                        <select
                          value={item.status}
                          onChange={(e) => {
                            onUpdatePengaduanStatus(
                              item.id,
                              e.target.value as any,
                            );
                            showToast(
                              `Status laporan diubah ke "${e.target.value}"`,
                            );
                          }}
                          style={{
                            padding: "5px 10px",
                            borderRadius: "6px",
                            border: "1px solid #cbd5e1",
                          }}
                        >
                          <option value="Menunggu">Menunggu</option>
                          <option value="Diproses">Diproses</option>
                          <option value="Selesai">Selesai</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => {
                            onDeletePengaduan(item.id);
                            showToast("Laporan berhasil dihapus.");
                          }}
                          style={{
                            backgroundColor: "#fef2f2",
                            color: "#ef4444",
                            border: "1px solid #fecaca",
                            padding: "5px 10px",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CCTV */}
          {activeTab === "cctv" && (
            <div>
              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "20px",
                  padding: "1.75rem",
                  marginBottom: "2rem",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 1rem 0",
                    fontSize: "1.1rem",
                    fontWeight: 800,
                  }}
                >
                  🎥 Tambah CCTV Stream Live
                </h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onAddCctv(newCctv);
                    showToast("Kamera CCTV berhasil ditambahkan!");
                    setNewCctv({ name: "", loc: "", img: "" });
                  }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "1rem",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Nama Kamera"
                    value={newCctv.name}
                    onChange={(e) =>
                      setNewCctv({ ...newCctv, name: e.target.value })
                    }
                    required
                    style={{
                      padding: "11px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Lokasi (misal: Simpang Kebon Jayanti)"
                    value={newCctv.loc}
                    onChange={(e) =>
                      setNewCctv({ ...newCctv, loc: e.target.value })
                    }
                    required
                    style={{
                      padding: "11px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                    }}
                  />
                  <input
                    type="url"
                    placeholder="URL Cover Stream"
                    value={newCctv.img}
                    onChange={(e) =>
                      setNewCctv({ ...newCctv, img: e.target.value })
                    }
                    required
                    style={{
                      padding: "11px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#0d9488",
                      color: "#fff",
                      border: "none",
                      padding: "11px",
                      borderRadius: "8px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    + Tambahkan CCTV
                  </button>
                </form>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "1.25rem",
                }}
              >
                {cctvList.map((cam) => (
                  <div
                    key={cam.id}
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "16px",
                      padding: "1.25rem",
                    }}
                  >
                    <img
                      src={cam.img}
                      alt={cam.name}
                      style={{
                        width: "100%",
                        height: "140px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        marginBottom: "10px",
                      }}
                    />
                    <h4
                      style={{
                        margin: "0 0 4px 0",
                        fontSize: "1rem",
                        fontWeight: 800,
                      }}
                    >
                      {cam.name}
                    </h4>
                    <p
                      style={{
                        margin: "0 0 12px 0",
                        fontSize: "0.8rem",
                        color: "#64748b",
                      }}
                    >
                      📍 {cam.loc}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        onDeleteCctv(cam.id);
                        showToast("Kamera CCTV dihapus.");
                      }}
                      style={{
                        backgroundColor: "#fef2f2",
                        color: "#ef4444",
                        border: "1px solid #fecaca",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      <Trash2 size={14} /> Hapus Kamera
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: BERITA */}
          {activeTab === "berita" && (
            <div>
              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "20px",
                  padding: "1.75rem",
                  marginBottom: "2rem",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 1rem 0",
                    fontSize: "1.1rem",
                    fontWeight: 800,
                  }}
                >
                  📰 Terbitkan Berita Kecamatan
                </h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onAddBerita(newBerita);
                    showToast("Pengumuman resmi diterbitkan!");
                    setNewBerita({
                      judul: "",
                      kategori: "Pengumuman",
                      tanggal: "",
                      desc: "",
                      image: "",
                    });
                  }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "1rem",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Judul Berita"
                    value={newBerita.judul}
                    onChange={(e) =>
                      setNewBerita({ ...newBerita, judul: e.target.value })
                    }
                    required
                    style={{
                      padding: "11px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Tanggal (misal: 31 Juli 2026)"
                    value={newBerita.tanggal}
                    onChange={(e) =>
                      setNewBerita({ ...newBerita, tanggal: e.target.value })
                    }
                    required
                    style={{
                      padding: "11px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                    }}
                  />
                  <input
                    type="url"
                    placeholder="URL Gambar Berita"
                    value={newBerita.image}
                    onChange={(e) =>
                      setNewBerita({ ...newBerita, image: e.target.value })
                    }
                    required
                    style={{
                      padding: "11px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                    }}
                  />
                  <textarea
                    rows={3}
                    placeholder="Isi Berita..."
                    value={newBerita.desc}
                    onChange={(e) =>
                      setNewBerita({ ...newBerita, desc: e.target.value })
                    }
                    required
                    style={{
                      gridColumn: "1 / -1",
                      padding: "11px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      gridColumn: "1 / -1",
                      backgroundColor: "#0d9488",
                      color: "#fff",
                      border: "none",
                      padding: "11px",
                      borderRadius: "8px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Terbitkan Berita
                  </button>
                </form>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "1.25rem",
                }}
              >
                {beritaList.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "16px",
                      padding: "1.25rem",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.judul}
                      style={{
                        width: "100%",
                        height: "140px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        marginBottom: "10px",
                      }}
                    />
                    <h4
                      style={{
                        margin: "0 0 4px 0",
                        fontSize: "1rem",
                        fontWeight: 800,
                      }}
                    >
                      {item.judul}
                    </h4>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "#64748b",
                        marginBottom: "10px",
                      }}
                    >
                      📅 {item.tanggal}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        onDeleteBerita(item.id);
                        showToast("Berita dihapus.");
                      }}
                      style={{
                        backgroundColor: "#fef2f2",
                        color: "#ef4444",
                        border: "1px solid #fecaca",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      <Trash2 size={14} /> Hapus Berita
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: PEJABAT */}
          {activeTab === "aparat" && (
            <div>
              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "20px",
                  padding: "1.75rem",
                  marginBottom: "2rem",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 1rem 0",
                    fontSize: "1.1rem",
                    fontWeight: 800,
                  }}
                >
                  🛡️ Pejabat & Aparat Kecamatan
                </h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onAddAparat(newAparat);
                    showToast("Pejabat baru ditambahkan!");
                    setNewAparat({ nama: "", jabatan: "", kontak: "" });
                  }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "1rem",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Nama & Gelar"
                    value={newAparat.nama}
                    onChange={(e) =>
                      setNewAparat({ ...newAparat, nama: e.target.value })
                    }
                    required
                    style={{
                      padding: "11px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Jabatan"
                    value={newAparat.jabatan}
                    onChange={(e) =>
                      setNewAparat({ ...newAparat, jabatan: e.target.value })
                    }
                    required
                    style={{
                      padding: "11px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="No. Telp Kontak"
                    value={newAparat.kontak}
                    onChange={(e) =>
                      setNewAparat({ ...newAparat, kontak: e.target.value })
                    }
                    required
                    style={{
                      padding: "11px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#0d9488",
                      color: "#fff",
                      border: "none",
                      padding: "11px",
                      borderRadius: "8px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    + Tambahkan Pejabat
                  </button>
                </form>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "1.25rem",
                }}
              >
                {aparatList.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "16px",
                      padding: "1.25rem",
                    }}
                  >
                    <h4
                      style={{
                        margin: "0 0 2px 0",
                        fontSize: "1rem",
                        fontWeight: 800,
                      }}
                    >
                      {item.nama}
                    </h4>
                    <p
                      style={{
                        margin: "0 0 8px 0",
                        fontSize: "0.85rem",
                        color: "#0d9488",
                        fontWeight: 700,
                      }}
                    >
                      {item.jabatan}
                    </p>
                    <p
                      style={{
                        margin: "0 0 12px 0",
                        fontSize: "0.8rem",
                        color: "#64748b",
                      }}
                    >
                      📞 {item.kontak}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        onDeleteAparat(item.id);
                        showToast("Pejabat dihapus.");
                      }}
                      style={{
                        backgroundColor: "#fef2f2",
                        color: "#ef4444",
                        border: "1px solid #fecaca",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      <Trash2 size={14} /> Hapus Data
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: PENGATURAN */}
          {activeTab === "pengaturan" && (
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "20px",
                padding: "2rem",
                maxWidth: "500px",
              }}
            >
              <h3
                style={{
                  margin: "0 0 0.5rem 0",
                  fontSize: "1.2rem",
                  fontWeight: 800,
                }}
              >
                Pengaturan Akses Kredensial
              </h3>
              <p
                style={{
                  margin: "0 0 1.5rem 0",
                  fontSize: "0.85rem",
                  color: "#64748b",
                }}
              >
                Akses keamanan portal admin Kecamatan Batununggal.
              </p>

              <div
                style={{
                  background: "#f8fafc",
                  padding: "1rem",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  fontSize: "0.85rem",
                  color: "#334155",
                  marginBottom: "1.5rem",
                }}
              >
                <div>
                  <strong>Username saat ini:</strong> admin
                </div>
                <div>
                  <strong>Password saat ini:</strong> batununggal
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  showToast("Konfigurasi sistem keamanan tersimpan!")
                }
                style={{
                  backgroundColor: "#0d9488",
                  color: "#fff",
                  border: "none",
                  padding: "11px 20px",
                  borderRadius: "10px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Simpan Konfigurasi Keamanan
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
