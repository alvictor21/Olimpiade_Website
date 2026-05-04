import React from "react";
import { useNavigate } from "react-router-dom";


const menuItems = [

  {
    label: "Dashboard",
    path: "/admin",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: "Peserta",
    path: "/admin/peserta",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    label: "Mata Pelajaran",
    path: "/admin/mapel",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
  },
  {
    label: "Pembayaran",
    path: "/admin/pembayaran",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
];

const roleColors = {
  Pendaftaran: "text-indigo-300 bg-indigo-500/10 border-indigo-500/20",
  Sekretariat: "text-cyan-300 bg-cyan-500/10 border-cyan-500/20",
  Bendahara:   "text-blue-300 bg-blue-500/10 border-blue-500/20",
};

// Ganti sesuai data admin yang login
const admin = {
  nama: "Rizky Aditya",
  role: "Pendaftaran",
  avatar: null, // isi dengan URL foto jika ada, misal: "https://..."
};

export default function Sidebar() {
const navigate = useNavigate()
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between py-6 px-4 z-20">

      {/* TOP — Info Admin */}
      <div className="flex flex-col items-center text-center gap-3">
        {/* Avatar */}
        <div className="relative">
          {admin.avatar ? (
            <img
              src={admin.avatar}
              alt={admin.nama}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/30"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-900/40">
              {admin.nama.charAt(0)}
            </div>
          )}
          {/* Online dot */}
          <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-900" />
        </div>

        {/* Nama & Role */}
        <div>
          <p className="text-sm font-semibold text-white">{admin.nama}</p>
          <span className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full border mt-1 inline-block ${roleColors[admin.role] ?? "text-slate-400 bg-slate-700/30 border-slate-700"}`}>
            {admin.role}
          </span>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-slate-800 mt-1" />
      </div>

      {/* MIDDLE — Menu Navigasi */}
      <nav className="flex flex-col gap-1">
        <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-slate-600 px-3 mb-2">
          Menu Utama
        </p>
        {menuItems.map((item) => {
          return (
            <a
              key={item.path}
              href={item.path}
              className={"flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group"}
            >
              {/* Icon wrapper */}
              <span className={"transition-colors duration-200 "}>
                {item.icon}
              </span>
              {item.label}

              {/* Active indicator */}
              
            </a>
          );
        })}
      </nav>

      {/* BOTTOM — Logout */}
      <div className="flex flex-col gap-3">
        <div className="w-full h-px bg-slate-800" />
        <button onClick={()=> navigate('/')} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-200 group w-full">
          <svg className="w-5 h-5 text-slate-500 group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>
      </div>

    </aside>
  );
}