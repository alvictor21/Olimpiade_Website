import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function formatTanggal(str) {
  console.log("tgl_lahir:", str) // ← tambah ini sementara
  if (!str) return "-"
  const d = new Date(str.slice(0, 10))
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })
}
export default function Peserta() {

  const [peserta, setPeserta] = useState([])
  const [mapelList, setMapelList] = useState([])
  const [filterMapel, setFilterMapel] = useState("")
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  // state untuk modal edit
  const [modalOpen, setModalOpen] = useState(false)
  const [editData, setEditData] = useState(null)
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState("")

  // fetch peserta
  useEffect(() => {
    fetchPeserta()
  }, [filterMapel])

  const navigate = useNavigate()

  const fetchPeserta = async () => {
    try {
      setLoading(true)
      const params = filterMapel ? `?mapel_id=${filterMapel}` : ""
      const res = await axios.get(`http://localhost:3000/api/peserta${params}`)
      setPeserta(res.data.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // fetch mapel untuk dropdown filter
  useEffect(() => {
    axios.get("http://localhost:3000/api/mapel")
      .then(res => setMapelList(res.data.data))
      .catch(err => console.error(err))
  }, [])

  const handleHapus = async (id) => {
    if (!confirm("Yakin ingin menghapus peserta ini?")) return
    try {
      await axios.delete(`http://localhost:3000/api/peserta/${id}`)
      fetchPeserta() // refresh tabel
    } catch (err) {
      alert("Gagal menghapus peserta.")
    }
  }

  const handleEditOpen = (p) => {
    setEditData({
      id: p.id,
      nama: p.nama,
      email: p.email,
      no_hp: p.no_hp ?? "",
      nisn: p.nisn,
      sekolah: p.sekolah,
      tgl_lahir: p.tgl_lahir?.slice(0, 10),
      kelamin: p.kelamin,
      mapel_id: p.mapel_id,
      metode_bayar: p.metode_bayar,
      status_bayar: p.status_bayar,
    })
    setEditError("")
    setModalOpen(true)
  }

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value })
  }

  const handleEditSubmit = async () => {
    try {
      setEditLoading(true)
      await axios.put(`http://localhost:3000/api/peserta/${editData.id}`, editData)
      setModalOpen(false)
      fetchPeserta() // refresh tabel
    } catch (err) {
      setEditError("Gagal menyimpan perubahan.")
    } finally {
      setEditLoading(false)
    }
  }

  const filtered = peserta.filter((p) => {
  const cocokSearch =
    p.nama.toLowerCase().includes(search.toLowerCase()) ||
    p.nisn.includes(search) ||
    p.sekolah.toLowerCase().includes(search.toLowerCase())
  return cocokSearch
  })



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

         <button onClick={()=> navigate('/')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs mb-6 font-medium text-indigo-300 bg-indigo-200/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Tambah Data Peserta
          </button>

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
                <option value="">Semua Mapel</option>
                {mapelList.map((m) => (
                  <option key={m.id} value={m.id}>{m.nama}</option>
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
                  <th className="text-left text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-500 px-5 py-3.5">Nomor HP</th>
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

                      {/* Nomor HP */}
                      <td className="px-5 py-4 text-slate-400 font-mono text-xs">{p.no_hp}</td>

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

                      {/* Mapel */}
                      <td className="px-5 py-4">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full border text-indigo-300 bg-indigo-500/10 border-indigo-500/20">
                          {p.mapel}
                        </span>
                      </td>

                      {/* Pembayaran */}
                      <td className="px-5 py-4">
                        <span className={`... ${
                          p.status_bayar === "lunas"
                            ? "text-emerald-300 bg-emerald-500/10 border-emerald-500/20"
                            : "text-red-300 bg-red-500/10 border-red-500/20"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${p.status_bayar === "lunas" ? "bg-emerald-400" : "bg-red-400"}`} />
                          {p.status_bayar === "lunas" ? "Lunas" : "Belum Lunas"}
                      </span>
                      </td>

                      {/* Aksi */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {/* Edit */}
                          <button onClick={()=> handleEditOpen(p)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            Edit
                          </button>

                          {/* Hapus */}
                          <button onClick={() => handleHapus(p.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-300 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all">
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
              Menampilkan <span className="text-slate-400 font-medium">{filtered.length}</span> dari <span className="text-slate-400 font-medium">{peserta.length}</span> peserta
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

      {modalOpen && editData && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">

      {/* Header modal */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-white">Edit Peserta</h2>
        <button onClick={() => setModalOpen(false)} className="text-slate-500 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

          {/* Form edit */}
          <div className="space-y-3">

            {[
              { label: "Nama", name: "nama", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "No HP", name: "no_hp", type: "text" },
              { label: "NISN", name: "nisn", type: "text" },
              { label: "Asal Sekolah", name: "sekolah", type: "text" },
              { label: "Tanggal Lahir", name: "tgl_lahir", type: "date" },
            ].map((field) => (
              <div key={field.name}>
                <label className="text-xs text-slate-400 mb-1 block">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={editData[field.name]}
                  onChange={handleEditChange}
                  className="w-full h-9 px-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition-all"
                />
              </div>
            ))}

            {/* Kelamin */}
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Jenis Kelamin</label>
              <select name="kelamin" value={editData.kelamin} onChange={handleEditChange}
                className="w-full h-9 px-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition-all">
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>

            {/* Mapel */}
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Mata Pelajaran</label>
              <select name="mapel_id" value={editData.mapel_id} onChange={handleEditChange}
                className="w-full h-9 px-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition-all">
                {mapelList.map((m) => (
                  <option key={m.id} value={m.id}>{m.nama}</option>
                ))}
              </select>
            </div>

            {/* Metode Bayar */}
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Metode Pembayaran</label>
              <select name="metode_bayar" value={editData.metode_bayar} onChange={handleEditChange}
                className="w-full h-9 px-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition-all">
                {["Transfer Bank BCA","Transfer Bank BNI","Transfer Bank Mandiri","QRIS","GoPay","OVO","Dana"].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Status Bayar */}
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Status Pembayaran</label>
              <select name="status_bayar" value={editData.status_bayar} onChange={handleEditChange}
                className="w-full h-9 px-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition-all">
                <option value="belum">Belum Lunas</option>
                <option value="lunas">Lunas</option>
              </select>
            </div>

          </div>

          {/* Error */}
          {editError && <p className="text-red-400 text-xs mt-3">{editError}</p>}

          {/* Tombol */}
          <div className="flex gap-2 mt-5">
            <button onClick={() => setModalOpen(false)}
              className="flex-1 h-9 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-sm hover:bg-slate-700 transition-all">
              Batal
            </button>
            <button onClick={handleEditSubmit} disabled={editLoading}
              className="flex-1 h-9 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-all disabled:opacity-50">
              {editLoading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>

        </div>
      </div>
    )}
    </div>
  );
}