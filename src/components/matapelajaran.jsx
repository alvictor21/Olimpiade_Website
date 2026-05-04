import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const mapelIcons = {
  Matematika:  "∑",
  Fisika:      "⚛",
  Kimia:       "⚗",
  Biologi:     "🧬",
  Informatika: "💻",
  Ekonomi:     "📈",
  Astronomi:   "🔭",
  Kebumian:    "🌍",
};

const mapelAccent = [
  "from-indigo-500 to-blue-500",
  "from-blue-500 to-cyan-400",
  "from-violet-500 to-purple-400",
  "from-sky-500 to-blue-400",
  "from-cyan-500 to-teal-400",
  "from-blue-600 to-indigo-400",
  "from-purple-500 to-violet-400",
  "from-indigo-400 to-sky-400",
  "from-teal-500 to-cyan-400",
];

function formatRupiah(angka) {
  if (!angka || angka === 0) return "Rp 0";
  if (angka >= 1000000) return `Rp ${(angka / 1000000).toFixed(2)} jt`;
  return `Rp ${angka.toLocaleString("id-ID")}`;
}

function StatItem({ label, value, color = "text-white" }) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className={`text-sm font-semibold ${color}`}>{value}</p>
      <p className="text-[10px] text-slate-500 uppercase tracking-wide">{label}</p>
    </div>
  );
}

export default function Mapel() {
  const [mapelList, setMapelList] = useState([]);
  const [loading, setLoading]     = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/api/mapel/statistik")
      .then(res => setMapelList(res.data.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-screen-xl mx-auto px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1">
            Admin Panel
          </span>
          <h1 className="text-3xl font-bold text-white mt-3 mb-1">Mata Pelajaran</h1>
          <p className="text-slate-500 text-sm">Olimpiade Sains 2025 · {mapelList.length} mata pelajaran tersedia</p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-slate-600 text-sm text-center py-20">Memuat data...</div>
        )}

        {/* Cards */}
        {!loading && (
          <div className="grid grid-cols-1 gap-4">
            {mapelList.map((m, i) => {
              const accent = mapelAccent[i % mapelAccent.length];
              const icon   = mapelIcons[m.nama] ?? "📚";

              return (
                <div
                  key={m.id}
                  className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 group"
                >
                  {/* Accent glow */}
                  <div className={`absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${accent} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-300`} />

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${accent} opacity-30 group-hover:opacity-60 transition-opacity duration-300`} />

                  <div className="relative flex items-center gap-6 px-6 py-5">

                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center text-xl shadow-lg flex-shrink-0`}>
                      {icon}
                    </div>

                    {/* Nama Mapel */}
                    <div className="w-36 flex-shrink-0">
                      <p className="text-base font-semibold text-white">{m.nama}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-wider">Mata Pelajaran</p>
                    </div>

                    {/* Divider */}
                    <div className="w-px h-10 bg-slate-800 flex-shrink-0" />

                    {/* Stats */}
                    <div className="flex items-center gap-8 flex-1">

                      <StatItem
                        label="Total Peserta"
                        value={m.total_peserta ?? 0}
                      />

                      <StatItem
                        label="Sudah Bayar"
                        value={m.sudah_bayar ?? 0}
                        color="text-emerald-400"
                      />

                      <StatItem
                        label="Belum Bayar"
                        value={m.belum_bayar ?? 0}
                        color="text-red-400"
                      />

                      <StatItem
                        label="Total Uang"
                        value={formatRupiah(m.total_uang)}
                        color="text-blue-300"
                      />

                      {/* Persentase bar */}
                      <div className="flex flex-col gap-1.5 min-w-32">
                        <div className="flex items-center justify-between">
                          <p className="text-[10px] text-slate-500 uppercase tracking-wide">Peminatan</p>
                          <p className="text-xs font-semibold text-white">{m.persen}%</p>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${accent} transition-all duration-500`}
                            style={{ width: `${m.persen}%` }}
                          />
                        </div>
                      </div>

                    </div>

                    {/* Divider */}
                    <div className="w-px h-10 bg-slate-800 flex-shrink-0" />

                    {/* Tombol */}
                    <button
                      onClick={() => navigate(`/admin/mapel/${m.id}`)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r ${accent} hover:opacity-90 active:scale-95 transition-all shadow-md flex-shrink-0`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      Lihat Detail
                    </button>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}