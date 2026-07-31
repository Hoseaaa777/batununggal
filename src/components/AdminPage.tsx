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
  Lock,
  AlertCircle,
  Download,
  Phone,
  Eye,
  CheckCircle2,
  Building2,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

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
          backgroundColor: "#f1f5f9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
        }}
      >
        <button
          type="button"
          onClick={onBackToPublic}
          style={{
            position: "absolute",
            top: "24px",
            left: "24px",
            backgroundColor: "#ffffff",
            color: "#334155",
            border: "1px solid #cbd5e1",
            padding: "9px 16px",
            borderRadius: "8px",
            fontWeight: 700,
            fontSize: "0.85rem",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <ArrowLeft size={16} /> Kembali ke Portal Kecamatan
        </button>

        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            maxWidth: "420px",
            width: "100%",
            padding: "2.5rem",
            boxSizing: "border-box",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
            <div
              style={{
                backgroundColor: "#e1f2e5",
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              <Building2 color="#00a86b" size={28} />
            </div>
            <h2
              style={{
                margin: "0 0 6px 0",
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "#0f172a",
              }}
            >
              Admin Batununggal
            </h2>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>
              Sistem Kelola Portal Kecamatan Digital
            </p>
          </div>

          {errorMsg && (
            <div
              style={{
                backgroundColor: "#fef2f2",
                color: "#dc2626",
                padding: "10px 14px",
                borderRadius: "8px",
                fontSize: "0.825rem",
                marginBottom: "1.25rem",
                border: "1px solid #fecaca",
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
            style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
          >
            <div>
              <label
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  display: "block",
                  marginBottom: "6px",
                  color: "#1e293b",
                }}
              >
                Username Admin
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                required
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  boxSizing: "border-box",
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
                  color: "#1e293b",
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
                  padding: "11px 14px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  boxSizing: "border-box",
                  fontSize: "0.9rem",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "#00a86b",
                color: "#ffffff",
                border: "none",
                padding: "12px",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "0.95rem",
                cursor: "pointer",
                marginTop: "0.5rem",
              }}
            >
              Masuk Dashboard Kecamatan
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
        backgroundColor: "#f8fafc",
        display: "flex",
        color: "#0f172a",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* FLOATING TOAST */}
      {toastMsg && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            backgroundColor: "#0f172a",
            color: "#ffffff",
            padding: "12px 20px",
            borderRadius: "10px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            zIndex: 9999,
            fontSize: "0.875rem",
            fontWeight: 600,
            borderLeft: "4px solid #00a86b",
          }}
        >
          <CheckCircle2 color="#00a86b" size={20} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* SIDEBAR */}
      <aside
        style={{
          width: "260px",
          backgroundColor: "#ffffff",
          borderRight: "1px solid #e2e8f0",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <div
          style={{
            padding: "1.5rem",
            borderBottom: "1px solid #f1f5f9",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              backgroundColor: "#00a86b",
              color: "#fff",
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
            }}
          >
            BT
          </div>
          <div>
            <h1
              style={{
                fontSize: "1rem",
                fontWeight: 800,
                margin: 0,
                color: "#0f172a",
              }}
            >
              Portal Admin
            </h1>
            <p style={{ fontSize: "0.75rem", margin: 0, color: "#64748b" }}>
              Kecamatan Batununggal
            </p>
          </div>
        </div>

        <nav
          style={{
            padding: "1.25rem 0.85rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.35rem",
            flexGrow: 1,
            overflowY: "auto",
          }}
        >
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
              fontSize: "0.875rem",
              cursor: "pointer",
              textAlign: "left",
              backgroundColor:
                activeTab === "dashboard" ? "#e1f2e5" : "transparent",
              color: activeTab === "dashboard" ? "#00a86b" : "#475569",
            }}
          >
            <LayoutDashboard size={18} /> Dashboard Utama
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
              fontSize: "0.875rem",
              cursor: "pointer",
              textAlign: "left",
              backgroundColor:
                activeTab === "warga" ? "#e1f2e5" : "transparent",
              color: activeTab === "warga" ? "#00a86b" : "#475569",
            }}
          >
            <Users size={18} /> Data Kependudukan
          </button>

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
              fontSize: "0.875rem",
              cursor: "pointer",
              textAlign: "left",
              backgroundColor: activeTab === "umkm" ? "#e1f2e5" : "transparent",
              color: activeTab === "umkm" ? "#00a86b" : "#475569",
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
              fontSize: "0.875rem",
              cursor: "pointer",
              textAlign: "left",
              backgroundColor:
                activeTab === "pengaduan" ? "#e1f2e5" : "transparent",
              color: activeTab === "pengaduan" ? "#00a86b" : "#475569",
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
              fontSize: "0.875rem",
              cursor: "pointer",
              textAlign: "left",
              backgroundColor: activeTab === "cctv" ? "#e1f2e5" : "transparent",
              color: activeTab === "cctv" ? "#00a86b" : "#475569",
            }}
          >
            <Video size={18} /> CCTV Live Monitoring
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
              fontSize: "0.875rem",
              cursor: "pointer",
              textAlign: "left",
              backgroundColor:
                activeTab === "berita" ? "#e1f2e5" : "transparent",
              color: activeTab === "berita" ? "#00a86b" : "#475569",
            }}
          >
            <Newspaper size={18} /> Berita Kecamatan
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
              fontSize: "0.875rem",
              cursor: "pointer",
              textAlign: "left",
              backgroundColor:
                activeTab === "aparat" ? "#e1f2e5" : "transparent",
              color: activeTab === "aparat" ? "#00a86b" : "#475569",
            }}
          >
            <Shield size={18} /> Pejabat Kecamatan
          </button>

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
              fontSize: "0.875rem",
              cursor: "pointer",
              textAlign: "left",
              backgroundColor:
                activeTab === "pengaturan" ? "#e1f2e5" : "transparent",
              color: activeTab === "pengaturan" ? "#00a86b" : "#475569",
            }}
          >
            <Settings size={18} /> Pengaturan System
          </button>
        </nav>

        <div
          style={{
            padding: "1rem 1.25rem",
            borderTop: "1px solid #f1f5f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0f172a" }}
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
            title="Logout"
            style={{
              background: "#fef2f2",
              color: "#ef4444",
              border: "1px solid #fecaca",
              width: "34px",
              height: "34px",
              borderRadius: "8px",
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
            zIndex: 40,
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "1.15rem",
                fontWeight: 800,
                margin: 0,
                color: "#0f172a",
              }}
            >
              Sistem Informasi & Transparansi Kecamatan Batununggal
            </h2>
            <p
              style={{
                fontSize: "0.775rem",
                margin: "2px 0 0 0",
                color: "#64748b",
              }}
            >
              Cakupan 8 Kelurahan Wilayah Kota Bandung
            </p>
          </div>

          <button
            type="button"
            onClick={onBackToPublic}
            style={{
              backgroundColor: "#ffffff",
              color: "#00a86b",
              border: "1px solid #00a86b",
              padding: "8px 16px",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Eye size={16} /> Lihat Portal Publik
          </button>
        </header>

        <main style={{ padding: "2rem", flexGrow: 1 }}>
          {/* TAB 1: DASHBOARD UTAMA */}
          {activeTab === "dashboard" && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "1.5rem",
                }}
              >
                <div>
                  <h2
                    style={{
                      margin: "0 0 4px 0",
                      fontSize: "1.6rem",
                      fontWeight: 800,
                      color: "#0f172a",
                    }}
                  >
                    Dashboard Utama Kecamatan
                  </h2>
                  <p
                    style={{
                      margin: 0,
                      color: "#64748b",
                      fontSize: "0.875rem",
                    }}
                  >
                    Ringkasan data terpadu & statistik kependudukan Kecamatan
                    Batununggal.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    showToast(
                      "Data rekapitulasi Kecamatan Batununggal berhasil di-export!",
                    )
                  }
                  style={{
                    backgroundColor: "#2563eb",
                    color: "#ffffff",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Download size={16} /> Export Data Kecamatan
                </button>
              </div>

              {/* Mini Summary Cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "1.25rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#e1f2e5",
                      color: "#00a86b",
                      padding: "12px",
                      borderRadius: "10px",
                    }}
                  >
                    <Store size={22} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.775rem",
                        color: "#64748b",
                        fontWeight: 700,
                      }}
                    >
                      UMKM Terdata
                    </div>
                    <div
                      style={{
                        fontSize: "1.4rem",
                        fontWeight: 800,
                        color: "#0f172a",
                      }}
                    >
                      {umkmList.length}{" "}
                      <span
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 500,
                          color: "#64748b",
                        }}
                      >
                        Usaha
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#fef3c7",
                      color: "#b45309",
                      padding: "12px",
                      borderRadius: "10px",
                    }}
                  >
                    <MessageSquare size={22} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.775rem",
                        color: "#64748b",
                        fontWeight: 700,
                      }}
                    >
                      Laporan Warga
                    </div>
                    <div
                      style={{
                        fontSize: "1.4rem",
                        fontWeight: 800,
                        color: "#0f172a",
                      }}
                    >
                      {pengaduanList.length}{" "}
                      <span
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 500,
                          color: "#64748b",
                        }}
                      >
                        Laporan
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#dbeafe",
                      color: "#2563eb",
                      padding: "12px",
                      borderRadius: "10px",
                    }}
                  >
                    <Video size={22} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.775rem",
                        color: "#64748b",
                        fontWeight: 700,
                      }}
                    >
                      CCTV Stream Active
                    </div>
                    <div
                      style={{
                        fontSize: "1.4rem",
                        fontWeight: 800,
                        color: "#0f172a",
                      }}
                    >
                      {cctvList.length}{" "}
                      <span
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 500,
                          color: "#64748b",
                        }}
                      >
                        Titik Live
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Demografi Grid Cards */}
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
                    borderRadius: "12px",
                    padding: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#64748b",
                      fontWeight: 700,
                    }}
                  >
                    Total Penduduk Kecamatan
                  </div>
                  <div
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: 800,
                      color: "#0f172a",
                      margin: "4px 0",
                    }}
                  >
                    {kecamatanStats.totalPopulasi.toLocaleString("id-ID")}{" "}
                    <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                      Jiwa
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#00a86b",
                      fontWeight: 700,
                    }}
                  >
                    Tersebar di {kecamatanStats.jumlahKelurahan} Kelurahan
                    Wilayah
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#64748b",
                      fontWeight: 700,
                    }}
                  >
                    Distribusi Kelompok Usia
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#1e293b",
                      margin: "8px 0 6px 0",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ color: "#00a86b" }}>
                      ● Prod: {pctProduktif}%
                    </span>
                    <span style={{ color: "#2563eb" }}>● Anak: {pctAnak}%</span>
                    <span style={{ color: "#f59e0b" }}>
                      ● Lansia: {pctLansia}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: "8px",
                      backgroundColor: "#e2e8f0",
                      borderRadius: "4px",
                      overflow: "hidden",
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        width: `${pctProduktif}%`,
                        backgroundColor: "#00a86b",
                      }}
                    />
                    <div
                      style={{
                        width: `${pctAnak}%`,
                        backgroundColor: "#2563eb",
                      }}
                    />
                    <div
                      style={{
                        width: `${pctLansia}%`,
                        backgroundColor: "#f59e0b",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: "0.725rem",
                      color: "#64748b",
                      marginTop: "6px",
                    }}
                  >
                    Produktif (18-59) | Anak (0-17) | Lansia (60+)
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#64748b",
                      fontWeight: 700,
                    }}
                  >
                    Kepala Keluarga (KK)
                  </div>
                  <div
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: 800,
                      color: "#0f172a",
                      margin: "4px 0",
                    }}
                  >
                    {kecamatanStats.totalKK.toLocaleString("id-ID")}{" "}
                    <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                      KK
                    </span>
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                    Pelayanan Digital Aktif
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#64748b",
                      fontWeight: 700,
                    }}
                  >
                    Pertumbuhan Pertahun
                  </div>
                  <div
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: 800,
                      color: "#00a86b",
                      margin: "4px 0",
                    }}
                  >
                    +1.8%
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                    Stabilitas Wilayah Batununggal
                  </div>
                </div>
              </div>

              {/* Big Charts Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                  gap: "1.5rem",
                }}
              >
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
                      fontSize: "1rem",
                      fontWeight: 800,
                      color: "#0f172a",
                    }}
                  >
                    Tren Pertumbuhan Penduduk Kecamatan
                  </h3>
                  <div style={{ width: "100%", height: "260px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={CHART_PERTUMBUHAN}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="tahun" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="total"
                          stroke="#00a86b"
                          strokeWidth={3}
                          dot={{ r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

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
                      fontSize: "1rem",
                      fontWeight: 800,
                      color: "#0f172a",
                    }}
                  >
                    Kelahiran vs Kematian (Skala Kecamatan)
                  </h3>
                  <div style={{ width: "100%", height: "260px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={CHART_KELAHIRAN_KEMATIAN}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="tahun" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="kelahiran"
                          fill="#00a86b"
                          name="Kelahiran"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          dataKey="kematian"
                          fill="#ef4444"
                          name="Kematian"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
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
                borderRadius: "16px",
                padding: "1.75rem",
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
                Ubah Data Kependudukan Kecamatan
              </h3>
              <p
                style={{
                  margin: "0 0 1.5rem 0",
                  color: "#64748b",
                  fontSize: "0.85rem",
                }}
              >
                Memperbarui statistik demografi publik untuk Kecamatan
                Batununggal.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onUpdateKecamatanStats(editStats);
                  showToast(
                    "Data kependudukan Kecamatan Batununggal berhasil diperbarui!",
                  );
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
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
                    Total Penduduk (Jiwa)
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
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
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
                        marginBottom: "4px",
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
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        display: "block",
                        marginBottom: "4px",
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
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        display: "block",
                        marginBottom: "4px",
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
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
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
                        marginBottom: "4px",
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
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
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
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                      }}
                    />
                  </div>
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
                  borderRadius: "16px",
                  padding: "1.5rem",
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
                  ➕ Tambah Produk UMKM Kecamatan
                </h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onAddUmkm(newUmkm);
                    showToast("Produk UMKM Kecamatan berhasil diterbitkan!");
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
                      padding: "10px",
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
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                    }}
                  >
                    <option value="Kuliner">Kuliner</option>
                    <option value="Kerajinan">Kerajinan</option>
                    <option value="Jasa">Jasa & Fashion</option>
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
                      padding: "10px",
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
                      padding: "10px",
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
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      gridColumn: "1 / -1",
                      backgroundColor: "#00a86b",
                      color: "#fff",
                      border: "none",
                      padding: "10px",
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
                      borderRadius: "12px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.nama}
                      style={{
                        width: "100%",
                        height: "140px",
                        objectFit: "cover",
                      }}
                    />
                    <div style={{ padding: "1rem" }}>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "#00a86b",
                          fontWeight: 800,
                        }}
                      >
                        {item.kategori}
                      </div>
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
                          color: "#2563eb",
                        }}
                      >
                        {item.harga}
                      </div>
                      <p
                        style={{
                          fontSize: "0.8rem",
                          color: "#64748b",
                          margin: "6px 0 12px 0",
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
                          borderRadius: "6px",
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
                borderRadius: "16px",
                padding: "1.5rem",
              }}
            >
              <h3
                style={{
                  margin: "0 0 1rem 0",
                  fontSize: "1.2rem",
                  fontWeight: 800,
                }}
              >
                Kelola Pengaduan Warga Kecamatan
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
                      borderRadius: "12px",
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
                          padding: "4px 10px",
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
                        <span>Ubah Status:</span>
                        <select
                          value={item.status}
                          onChange={(e) => {
                            onUpdatePengaduanStatus(
                              item.id,
                              e.target.value as any,
                            );
                            showToast(
                              `Status laporan diperbarui ke "${e.target.value}"`,
                            );
                          }}
                          style={{
                            padding: "4px 8px",
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
                  borderRadius: "16px",
                  padding: "1.5rem",
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
                  🎥 Tambah CCTV Live Stream
                </h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onAddCctv(newCctv);
                    showToast("CCTV Live Stream ditambahkan!");
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
                      padding: "10px",
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
                      padding: "10px",
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
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#00a86b",
                      color: "#fff",
                      border: "none",
                      padding: "10px",
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
                      borderRadius: "12px",
                      padding: "1rem",
                    }}
                  >
                    <img
                      src={cam.img}
                      alt={cam.name}
                      style={{
                        width: "100%",
                        height: "140px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginBottom: "8px",
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
                        borderRadius: "6px",
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
                  borderRadius: "16px",
                  padding: "1.5rem",
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
                  📰 Terbitkan Pengumuman Kecamatan
                </h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onAddBerita(newBerita);
                    showToast("Pengumuman resmi berhasil diterbitkan!");
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
                    placeholder="Judul Berita / Pengumuman"
                    value={newBerita.judul}
                    onChange={(e) =>
                      setNewBerita({ ...newBerita, judul: e.target.value })
                    }
                    required
                    style={{
                      padding: "10px",
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
                      padding: "10px",
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
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                    }}
                  />
                  <textarea
                    rows={3}
                    placeholder="Isi Berita Lengkap..."
                    value={newBerita.desc}
                    onChange={(e) =>
                      setNewBerita({ ...newBerita, desc: e.target.value })
                    }
                    required
                    style={{
                      gridColumn: "1 / -1",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      gridColumn: "1 / -1",
                      backgroundColor: "#00a86b",
                      color: "#fff",
                      border: "none",
                      padding: "10px",
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
                      borderRadius: "12px",
                      padding: "1rem",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.judul}
                      style={{
                        width: "100%",
                        height: "140px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginBottom: "8px",
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
                        marginBottom: "8px",
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
                        borderRadius: "6px",
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
                  borderRadius: "16px",
                  padding: "1.5rem",
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
                  🛡️ Kelola Pejabat & Aparat Kecamatan
                </h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onAddAparat(newAparat);
                    showToast("Pejabat baru berhasil ditambahkan!");
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
                    placeholder="Nama Lengkap & Gelar"
                    value={newAparat.nama}
                    onChange={(e) =>
                      setNewAparat({ ...newAparat, nama: e.target.value })
                    }
                    required
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Jabatan (misal: Lurah Maleer)"
                    value={newAparat.jabatan}
                    onChange={(e) =>
                      setNewAparat({ ...newAparat, jabatan: e.target.value })
                    }
                    required
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="No. Telp / WA Kantor"
                    value={newAparat.kontak}
                    onChange={(e) =>
                      setNewAparat({ ...newAparat, kontak: e.target.value })
                    }
                    required
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#00a86b",
                      color: "#fff",
                      border: "none",
                      padding: "10px",
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
                      borderRadius: "12px",
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
                        color: "#00a86b",
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
                        borderRadius: "6px",
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
                borderRadius: "16px",
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
                Pengaturan Kredensial Kecamatan
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
                  borderRadius: "8px",
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
                  backgroundColor: "#00a86b",
                  color: "#fff",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "8px",
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
