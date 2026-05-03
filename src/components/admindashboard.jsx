import StatCards from "./StatCards";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-600/8 blur-3xl" />
        <div className="absolute top-1/2 -left-20 w-72 h-72 rounded-full bg-blue-600/6 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1">
              Admin Panel
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white mt-3 mb-1">Dashboard</h1>
          <p className="text-slate-500 text-sm">Olimpiade Sains 2025 · Ringkasan data peserta</p>
        </div>

        {/* Stat Cards */}
        <section className="mb-8">
          <h2 className="text-xs font-semibold tracking-[0.14em] uppercase text-slate-500 mb-4">
            Statistik Peserta
          </h2>
          <StatCards />
        </section>

        {/* Placeholder for next components */}
        <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 h-64 flex items-center justify-center">
          <p className="text-slate-600 text-sm">Komponen berikutnya akan ditampilkan di sini</p>
        </div>

      </div>
    </div>
  );
}