import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FormPendaftaran() {
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
                    placeholder="nama@email.com"
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
                <select className="h-11 px-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all appearance-none cursor-pointer">
                  <option value="" disabled>Pilih mata pelajaran...</option>
                  <option>Matematika</option>
                  <option>Fisika</option>
                  <option>Kimia</option>
                  <option>Biologi</option>
                  <option>Informatika</option>
                  <option>Ekonomi</option>
                  <option>Astronomi</option>
                  <option>Kebumian</option>
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
                  <select className="h-11 px-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all appearance-none cursor-pointer">
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

            {/* Submit */}
            <button
              type="submit"
              onClick={() => navigate('/admin')}
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