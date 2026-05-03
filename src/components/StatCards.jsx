const stats = [
  {
    label: "Jumlah Pendaftar",
    value: "128",
    unit: "peserta",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    accent: "from-indigo-500 to-blue-500",
    glow: "shadow-indigo-900/40",
    badge: "+12 minggu ini",
    badgeColor: "text-indigo-300 bg-indigo-500/10 border-indigo-500/20",
  },
  {
    label: "Sudah Bayar",
    value: "94",
    unit: "peserta",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    accent: "from-blue-500 to-cyan-400",
    glow: "shadow-blue-900/40",
    badge: "73% dari total",
    badgeColor: "text-cyan-300 bg-cyan-500/10 border-cyan-500/20",
  },
  {
    label: "Belum Bayar",
    value: "34",
    unit: "peserta",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    accent: "from-sky-500 to-blue-400",
    glow: "shadow-sky-900/40",
    badge: "27% dari total",
    badgeColor: "text-sky-300 bg-sky-500/10 border-sky-500/20",
  },
  {
    label: "Total Pendapatan",
    value: "Rp 7,05 jt",
    unit: "terkumpul",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    accent: "from-blue-600 to-indigo-400",
    glow: "shadow-blue-900/40",
    badge: "94 × Rp 75.000",
    badgeColor: "text-blue-300 bg-blue-500/10 border-blue-500/20",
  },
  {
    label: "Sudah Daftar Ulang",
    value: "0",
    unit: "peserta",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
    accent: "from-slate-500 to-slate-400",
    glow: "shadow-slate-900/30",
    badge: "Belum hari H",
    badgeColor: "text-slate-400 bg-slate-500/10 border-slate-500/20",
  },
];

function StatCard({ label, value, unit, icon, accent, glow, badge, badgeColor }) {
  return (
    <div className={`relative bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg ${glow} overflow-hidden group hover:border-slate-700 transition-all duration-300`}>
      {/* Glow blob */}
      <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${accent} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-300`} />

      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center text-white shadow-md`}>
          {icon}
        </div>
        <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full border ${badgeColor}`}>
          {badge}
        </span>
      </div>

      {/* Value */}
      <div className="mb-1">
        <p className="text-2xl font-bold text-white tracking-tight leading-none">
          {value}
        </p>
        <p className="text-xs text-slate-500 mt-0.5">{unit}</p>
      </div>

      {/* Label */}
      <p className="text-sm text-slate-400 font-medium">{label}</p>

      {/* Bottom accent line */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${accent} opacity-30 group-hover:opacity-60 transition-opacity duration-300`} />
    </div>
  );
}

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
      {stats.map((stat, i) => (
        <StatCard key={i} {...stat} />
      ))}
    </div>
  );
}