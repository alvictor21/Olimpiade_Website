import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function formatTanggal(str) {
  if (!str) return "-";
  const d = new Date(str.slice(0, 10));
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

export default function DetailMapel() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mapel, setMapel]     = useState(null);
  const [peserta, setPeserta] = useState([]);
  const [search, setSearch]   = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // fetch info mapel
        const resMapel = await axios.get("http://localhost:3000/api/mapel/statistik");
        const found = resMapel.data.data.find(m => String(m.id) === String(id));
        setMapel(found ?? null);

        // fetch peserta berdasarkan mapel_id
        const resPeserta = await axios.get(`http://localhost:3000/api/peserta?mapel_id=${id}`);
        setPeserta(resPeserta.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const filtered = peserta.filter((p) =>
    p.nama.toLowerCase().includes(search.toLowerCase()) ||
    p.nisn.includes(search) ||
    p.sekolah.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-screen-xl mx-auto px-8 py-8">

        {/* Tombol kembali */}
        <button
          onClick={() => navigate("/admin/mapel")}
          className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Kembali ke Mata Pelajaran
        </button>

        {/* Header */}
        <div className="mb-8">
          <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1">
            Detail Mapel
          </span>
          <h1 className="text-3xl font-bold text-white mt-3 mb-1">
            {loading ? "Memuat..." : mapel?.nama ?? "Mata Pelajaran"}
          </h1>
          <p className="text-slate-500 text-sm">
            Olimpiade Sains 2025 · {filtered.length} peserta ditemukan
          </p>
        </div>

        {/* Stat mini cards */}
        {!loading && mapel && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

            <div className="bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4">
              <p className="text-2xl font-bold text-white">{mapel.total_peserta ?? 0}</p>
              <p className="text-xs text-slate-500 mt-0.5">Total Peserta</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4">
              <p className="text-2xl font-bold text-emerald-400">{mapel.sudah_bayar ?? 0}</p>
              <p className="text-xs text-slate-500 mt-0.5">Sudah Bayar</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4">
              <p className="text-2xl font-bold text-red-400">{mapel.belum_bayar ?? 0}</p>
              <p className="text-xs text-slate-500 mt-0.5">Belum Bayar</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4">
              <p className="text-2xl font-bold text-blue-300">
                {mapel.total_uang >= 1000000
                  ? `Rp ${(mapel.total_uang / 1000000).toFixed(2)} jt`
                  : `Rp ${(mapel.total_uang ?? 0).toLocaleString("id-ID")}`
                }
              </p>
              <p className="text-xs text-slate-500 mt-0.5">Total Pendapatan</p>
            </div>

          </div>
        )}

        {/* Search */}
        <div className="relative mb-6">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Cari nama, NISN, atau sekolah..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>

        {/* Tabel */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-500 px-5 py-3.5">No</th>
                  <th className="text-left text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-500 px-5 py-3.5">Nama</th>
                  <th className="text-left text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-500 px-5 py-3.5">NISN</th>
                  <th className="text-left text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-500 px-5 py-3.5">Asal Sekolah</th>
                  <th className="text-left text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-500 px-5 py-3.5">Tgl Lahir</th>
                  <th className="text-left text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-500 px-5 py-3.5">L/P</th>
                  <th className="text-left text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-500 px-5 py-3.5">Pembayaran</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="text-center text-slate-600 py-16 text-sm">
                      Memuat data...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center text-slate-600 py-16 text-sm">
                      Tidak ada peserta ditemukan
                    </td>
                  </tr>
                ) : (
                  filtered.map((p, i) => (
                    <tr
                      key={p.id}
                      className="border-b border-slate-800/60 hover:bg-slate-800/40 transition-colors duration-150"
                    >
                      <td className="px-5 py-4 text-slate-500">{i + 1}</td>

                      {/* Nama + Email */}
                      <td className="px-5 py-4">
                        <p className="font-medium text-white">{p.nama}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{p.email}</p>
                      </td>

                      {/* NISN */}
                      <td className="px-5 py-4 text-slate-400 font-mono text-xs">{p.nisn}</td>

                      {/* Sekolah */}
                      <td className="px-5 py-4 text-slate-300">{p.sekolah}</td>

                      {/* Tgl Lahir */}
                      <td className="px-5 py-4 text-slate-400 text-xs">{formatTanggal(p.tgl_lahir)}</td>

                      {/* Kelamin */}
                      <td className="px-5 py-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border inline-flex items-center justify-center w-20 ${
                          p.kelamin === "L"
                            ? "text-blue-300 bg-blue-500/10 border-blue-500/20"
                            : "text-pink-300 bg-pink-500/10 border-pink-500/20"
                        }`}>
                          {p.kelamin === "L" ? "Laki-laki" : "Perempuan"}
                        </span>
                      </td>

                      {/* Pembayaran */}
                      <td className="px-5 py-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border flex items-center gap-1.5 w-fit ${
                          p.status_bayar === "lunas"
                            ? "text-emerald-300 bg-emerald-500/10 border-emerald-500/20"
                            : "text-red-300 bg-red-500/10 border-red-500/20"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${p.status_bayar === "lunas" ? "bg-emerald-400" : "bg-red-400"}`} />
                          {p.status_bayar === "lunas" ? "Lunas" : "Belum Lunas"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-5 py-3.5 border-t border-slate-800">
            <p className="text-xs text-slate-600">
              Menampilkan <span className="text-slate-400 font-medium">{filtered.length}</span> dari <span className="text-slate-400 font-medium">{peserta.length}</span> peserta
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}