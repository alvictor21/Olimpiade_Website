import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function FormPendaftaran() {
    const [mapelList, setMapelList] = useState([])
    const [form, setForm] = useState({
    nama: "",
    email: "",
    no_hp: "",
    nisn: "",
    sekolah: "",
    tgl_lahir: "",
    kelamin: "",
    mapel_id: "",
    metode_bayar: "",
    })
    const [buktiFile, setBuktiFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
    axios.get("http://localhost:3000/api/mapel")
        .then(res => setMapelList(res.data.data))
        .catch(err => console.error(err))
    }, [])

    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
      setError("")

      // validasi sederhana
      if (!form.nama || !form.email || !form.nisn || !form.sekolah || 
          !form.tgl_lahir || !form.kelamin || !form.mapel_id || !form.metode_bayar) {
          setError("Semua field wajib diisi.")
          return
      }

      try {
          setLoading(true)

          // pakai FormData karena ada file upload
          const formData = new FormData()
          formData.append("nama",         form.nama)
          formData.append("email",        form.email)
          formData.append("no_hp",        form.no_hp)
          formData.append("nisn",         form.nisn)
          formData.append("sekolah",      form.sekolah)
          formData.append("tgl_lahir",    form.tgl_lahir)
          formData.append("kelamin",      form.kelamin)
          formData.append("mapel_id",     form.mapel_id)
          formData.append("metode_bayar", form.metode_bayar)
          if (buktiFile) formData.append("bukti_bayar", buktiFile)

          await axios.post("http://localhost:3000/api/peserta", formData, {
          headers: { "Content-Type": "multipart/form-data" }
          })

          navigate("/admin") // atau halaman lain yang kamu mau

      } catch (err) {
          setError(err.response?.data?.message || "Terjadi kesalahan, coba lagi.")
      } finally {
          setLoading(false)
      }
    }
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans">
      {/* Background decorative blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-900/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-2xl">
        {/* Card */}
        <div className="relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl shadow-black/40">

          {/* Header */}
          <div className="relative bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-500 px-10 py-9 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
            <div className="absolute bottom-0 left-1/3 w-32 h-32 rounded-full bg-white/5" />
            <div className="absolute top-4 left-4 w-2 h-16 rounded-full bg-white/20" />

            <span className="inline-block text-[10px] font-semibold tracking-[0.2em] uppercase text-violet-200 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-4">
              Olimpiade Sains 2025
            </span>
            <h1 className="font-serif text-3xl font-semibold text-white leading-tight mb-1">
              Formulir Pendaftaran
            </h1>
            <p className="text-violet-200/70 text-sm font-light">
              Lengkapi data diri peserta dengan benar dan teliti
            </p>

            <div className="flex gap-2 mt-5">
              <div className="w-10 h-1 rounded-full bg-white" />
              <div className="w-6 h-1 rounded-full bg-white/30" />
              <div className="w-6 h-1 rounded-full bg-white/30" />
            </div>
          </div>

          {/* Body */}
          <div className="px-10 py-8 space-y-6">

            {/* Section: Data Pribadi */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-violet-400">
                  Data Pribadi
                </span>
                <div className="flex-1 h-px bg-slate-800" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Nama */}
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-400 tracking-wide">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="nama"
                    onChange={handleChange}
                    value={form.nama}
                    placeholder="Masukkan nama lengkap"
                    className="h-11 px-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                  />
                </div>

                {/* Email */}
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-400 tracking-wide">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={form.email}
                    placeholder="nama@email.com"
                    className="h-11 px-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                  />
                </div>
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-400 tracking-wide">
                    Nomor HP
                  </label>
                  <input
                    type="number"
                    name="no_hp"
                    value={form.no_hp}
                    onChange={handleChange}
                    placeholder="Contoh: 08123456789"
                    className="h-11 px-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                  />
              </div>
                {/* NISN */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-400 tracking-wide">
                    NISN
                  </label>
                  <input
                    type="number"
                    name="nisn"
                    onChange={handleChange}
                    value={form.nisn}
                    placeholder="10 digit NISN"
                    className="h-11 px-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                  />
                </div>

                {/* Tanggal Lahir */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-400 tracking-wide">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    name="tgl_lahir"
                    onChange={handleChange}
                    value={form.tgl_lahir}
                    className="h-11 px-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                  />
                </div>

                {/* Asal Sekolah */}
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-400 tracking-wide">
                    Asal Sekolah
                  </label>
                  <input
                    type="text"
                    name="sekolah"
                    onChange={handleChange}
                    value={form.sekolah}
                    placeholder="Nama sekolah asal"
                    className="h-11 px-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                  />
                </div>

                {/* Jenis Kelamin */}
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-400 tracking-wide">
                    Jenis Kelamin
                  </label>
                  <div className="flex gap-3">
                    <label className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 cursor-pointer hover:border-violet-600 transition-all group">
                      <input
                        type="radio"
                        name="kelamin"
                        value="L"
                        onChange={handleChange}
                        className="accent-violet-500 w-4 h-4"
                      />
                      <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                        ♂ Laki-laki
                      </span>
                    </label>
                    <label className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 cursor-pointer hover:border-violet-600 transition-all group">
                      <input
                        type="radio"
                        name="kelamin"
                        value="P"
                        onChange={handleChange}
                        className="accent-violet-500 w-4 h-4"
                      />
                      <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                        ♀ Perempuan
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Informasi Lomba */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-violet-400">
                  Informasi Lomba
                </span>
                <div className="flex-1 h-px bg-slate-800" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-400 tracking-wide">
                  Mata Pelajaran yang Diikuti
                </label>
                <select 
                name="mapel_id"           
                value={form.mapel_id}    
                onChange={handleChange}
                className="h-11 px-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all appearance-none cursor-pointer">
                  <option value="" disabled>Pilih mata pelajaran...</option>
                  {mapelList.map((m) => (  
                        <option key={m.id} value={m.id}>{m.nama}</option>
                    ))}
                </select>
              </div>
            </div>

            {/* Section: Pembayaran */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-violet-400">
                  Pembayaran
                </span>
                <div className="flex-1 h-px bg-slate-800" />
              </div>

              <div className="space-y-4">
                {/* Metode Pembayaran */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-400 tracking-wide">
                    Metode Pembayaran
                  </label>
                  <select 
                    name="metode_bayar"         
                    value={form.metode_bayar}   
                    onChange={handleChange}
                    className="h-11 px-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all appearance-none cursor-pointer">
                    <option value="" disabled>Pilih metode pembayaran...</option>
                    <option>Transfer Bank BCA</option>
                    <option>Transfer Bank BNI</option>
                    <option>Transfer Bank Mandiri</option>
                    <option>QRIS</option>
                    <option>GoPay</option>
                    <option>OVO</option>
                    <option>Dana</option>
                  </select>
                </div>

                {/* Upload Bukti */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-400 tracking-wide">
                    Bukti Pembayaran
                  </label>
                  <label className="relative flex flex-col items-center justify-center gap-2 px-6 py-8 rounded-xl border-2 border-dashed border-slate-700 bg-slate-800/50 cursor-pointer hover:border-violet-600 hover:bg-violet-900/10 transition-all group">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                       onChange={(e) => setBuktiFile(e.target.files[0])} 
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/20 transition-all">
                      <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                        Klik atau seret file ke sini
                      </p>
                      <p className="text-xs text-slate-600 mt-0.5">PNG, JPG, atau PDF — maks. 5 MB</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            {error && (
            <p className="text-red-400 text-xs text-center">{error}</p>
            )}
            {/* Submit */}
            <button
              type="button"
                onClick={handleSubmit}    
                disabled={loading}  
              className="w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 text-white text-sm font-semibold tracking-wide hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-900/30 mt-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" />
              </svg>
              Daftar Sekarang
            </button>

            <p className="text-center text-xs text-slate-600 pb-1">
              Data Anda terjaga kerahasiaannya · Biaya pendaftaran Rp 75.000
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}