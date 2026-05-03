import { useState } from "react";

const dummyData = [
  { id: 1, nama: "Andi Pratama", email: "andi@gmail.com", nisn: "1234567890", sekolah: "SMAN 1 Surabaya", tglLahir: "2007-03-12", kelamin: "L", mapel: "Matematika", lunas: true },
  { id: 2, nama: "Siti Rahayu", email: "siti@gmail.com", nisn: "1234567891", sekolah: "SMAN 2 Malang", tglLahir: "2006-11-05", kelamin: "P", mapel: "Fisika", lunas: false },
  { id: 3, nama: "Budi Santoso", email: "budi@gmail.com", nisn: "1234567892", sekolah: "SMAN 3 Bandung", tglLahir: "2007-07-20", kelamin: "L", mapel: "Kimia", lunas: true },
  { id: 4, nama: "Dewi Lestari", email: "dewi@gmail.com", nisn: "1234567893", sekolah: "SMAN 1 Yogyakarta", tglLahir: "2006-01-30", kelamin: "P", mapel: "Biologi", lunas: true },
  { id: 5, nama: "Fajar Nugroho", email: "fajar@gmail.com", nisn: "1234567894", sekolah: "SMAN 5 Jakarta", tglLahir: "2007-09-14", kelamin: "L", mapel: "Informatika", lunas: false },
  { id: 6, nama: "Rina Marlina", email: "rina@gmail.com", nisn: "1234567895", sekolah: "SMAN 2 Surabaya", tglLahir: "2006-06-08", kelamin: "P", mapel: "Ekonomi", lunas: true },
  { id: 7, nama: "Yoga Pratama", email: "yoga@gmail.com", nisn: "1234567896", sekolah: "SMAN 4 Medan", tglLahir: "2007-02-17", kelamin: "L", mapel: "Astronomi", lunas: false },
  { id: 8, nama: "Aulia Rahma", email: "aulia@gmail.com", nisn: "1234567897", sekolah: "SMAN 1 Makassar", tglLahir: "2006-12-25", kelamin: "P", mapel: "Kebumian", lunas: true },
  { id: 9, nama: "Rizal Firmansyah", email: "rizal@gmail.com", nisn: "1234567898", sekolah: "SMAN 3 Semarang", tglLahir: "2007-05-03", kelamin: "L", mapel: "Matematika", lunas: true },
];

const mapelList = [
  "Semua Mapel",
  "Matematika",
  "Fisika",
  "Kimia",
  "Biologi",
  "Informatika",
  "Ekonomi",
  "Astronomi",
  "Kebumian",
];

function formatTanggal(str) {
  const d = new Date(str);
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

export default function Peserta() {
  const [filterMapel, setFilterMapel] = useState("Semua Mapel");
  const [search, setSearch] = useState("");

  const filtered = dummyData.filter((p) => {
    const cocokMapel = filterMapel === "Semua Mapel" || p.mapel === filterMapel;
    const cocokSearch =
      p.nama.toLowerCase().includes(search.toLowerCase()) ||
      p.nisn.includes(search) ||
      p.sekolah.toLowerCase().includes(search.toLowerCase());
    return cocokMapel && cocokSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-screen-xl mx-auto px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1">
            Admin Panel
          </span>
          <h1 className="text-3xl font-bold text-white mt-3 mb-1">Data Peserta</h1>
          <p className="text-slate-500 text-sm">Olimpiade Sains 2025 · {filtered.length} peserta ditemukan</p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">

          {/* Search */}
          <div className="relative flex-1">
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

          {/* Dropdown Filter Mapel */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            <select
              value={filterMapel}
              onChange={(e) => setFilterMapel(e.target.value)}
              className="h-10 pl-9 pr-8 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer"
            >
              {mapelList.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Tabel */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

          {/* Table Header */}
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
                  <th className="text-left text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-500 px-5 py-3.5">Mapel</th>
                  <th className="text-left text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-500 px-5 py-3.5">Pembayaran</th>
                  <th className="text-left text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-500 px-5 py-3.5">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center text-slate-600 py-16 text-sm">
                      Tidak ada peserta ditemukan
                    </td>
                  </tr>
                ) : (
                  filtered.map((p, i) => (
                    <tr
                      key={p.id}
                      className="border-b border-slate-800/60 hover:bg-slate-800/40 transition-colors duration-150"
                    >
                      {/* No */}
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
                      <td className="px-5 py-4 text-slate-400 text-xs">{formatTanggal(p.tglLahir)}</td>

                      {/* Kelamin */}
                      <td className="px-5 py-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                          p.kelamin === "L"
                            ? "text-blue-300 bg-blue-500/10 border-blue-500/20"
                            : "text-pink-300 bg-pink-500/10 border-pink-500/20"
                        }`}>
                          {p.kelamin === "L" ? "Laki-laki" : "Perempuan"}
                        </span>
                      </td>

                      {/* Mapel */}
                      <td className="px-5 py-4">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full border text-indigo-300 bg-indigo-500/10 border-indigo-500/20">
                          {p.mapel}
                        </span>
                      </td>

                      {/* Pembayaran */}
                      <td className="px-5 py-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border flex items-center gap-1.5 w-fit ${
                          p.lunas
                            ? "text-emerald-300 bg-emerald-500/10 border-emerald-500/20"
                            : "text-red-300 bg-red-500/10 border-red-500/20"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${p.lunas ? "bg-emerald-400" : "bg-red-400"}`} />
                          {p.lunas ? "Lunas" : "Belum Lunas"}
                        </span>
                      </td>

                      {/* Aksi */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {/* Edit */}
                          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            Edit
                          </button>

                          {/* Hapus */}
                          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-300 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                              <path d="M10 11v6M14 11v6" />
                              <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                            </svg>
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer tabel */}
          <div className="px-5 py-3.5 border-t border-slate-800 flex items-center justify-between">
            <p className="text-xs text-slate-600">
              Menampilkan <span className="text-slate-400 font-medium">{filtered.length}</span> dari <span className="text-slate-400 font-medium">{dummyData.length}</span> peserta
            </p>
            <div className="flex items-center gap-1.5">
              <button className="h-7 w-7 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 transition-all flex items-center justify-center">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <span className="text-xs text-slate-500 px-2">Hal 1 / 1</span>
              <button className="h-7 w-7 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 transition-all flex items-center justify-center">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}