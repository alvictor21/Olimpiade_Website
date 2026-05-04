import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// ===========================
// WARNA
// ===========================
const mapelColors = [
  "#6366f1", "#3b82f6", "#06b6d4", "#8b5cf6",
  "#ec4899", "#f59e0b", "#10b981", "#ef4444", "#84cc16",
];

const kelaminColors = ["#6366f1", "#ec4899"];
const bayarColors   = ["#10b981", "#ef4444"];

// ===========================
// OPSI CHART (shared)
// ===========================
const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "#94a3b8",
        padding: 16,
        font: { size: 11 },
        boxWidth: 12,
        boxHeight: 12,
      },
    },
    tooltip: {
      backgroundColor: "#1e293b",
      borderColor: "#334155",
      borderWidth: 1,
      titleColor: "#f1f5f9",
      bodyColor: "#94a3b8",
      padding: 10,
    },
  },
};

const donutOptions = {
  ...baseOptions,
  cutout: "65%",
};

// ===========================
// CARD WRAPPER
// ===========================
function ChartCard({ title, subtitle, children }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
      </div>
      <div className="relative h-64">
        {children}
      </div>
    </div>
  );
}

// ===========================
// KOMPONEN UTAMA
// ===========================
export default function Charts() {
  const [mapelData, setMapelData]       = useState(null);
  const [demografiData, setDemografiData] = useState(null);

  useEffect(() => {
    // fetch data mapel
    axios.get("http://localhost:3000/api/chart/mapel")
      .then(res => {
        const rows = res.data.data;
        setMapelData({
          labels: rows.map(r => r.nama),
          datasets: [{
            data: rows.map(r => r.jumlah),
            backgroundColor: mapelColors,
            borderColor: "#0f172a",
            borderWidth: 2,
            hoverOffset: 6,
          }],
        });
      })
      .catch(err => console.error(err));

    // fetch data demografi
    axios.get("http://localhost:3000/api/chart/demografi")
      .then(res => {
        const d = res.data.data;
        setDemografiData(d);
      })
      .catch(err => console.error(err));
  }, []);

  const kelaminChartData = demografiData ? {
    labels: ["Laki-laki", "Perempuan"],
    datasets: [{
      data: [demografiData.laki, demografiData.perempuan],
      backgroundColor: kelaminColors,
      borderColor: "#0f172a",
      borderWidth: 2,
      hoverOffset: 6,
    }],
  } : null;

  const bayarChartData = demografiData ? {
    labels: ["Sudah Bayar", "Belum Bayar"],
    datasets: [{
      data: [demografiData.lunas, demografiData.belum],
      backgroundColor: bayarColors,
      borderColor: "#0f172a",
      borderWidth: 2,
      hoverOffset: 6,
    }],
  } : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      {/* Pie Chart — Per Mapel */}
      <ChartCard
        title="Peserta per Mata Pelajaran"
        subtitle="Distribusi pendaftar tiap mapel"
      >
        {mapelData
          ? <Pie data={mapelData} options={baseOptions} />
          : <p className="text-slate-600 text-xs text-center mt-24">Memuat data...</p>
        }
      </ChartCard>

      {/* Donut Chart — Kelamin */}
      <ChartCard
        title="Perbandingan Jenis Kelamin"
        subtitle="Laki-laki vs Perempuan"
      >
        {kelaminChartData
          ? <Doughnut data={kelaminChartData} options={donutOptions} />
          : <p className="text-slate-600 text-xs text-center mt-24">Memuat data...</p>
        }
      </ChartCard>

      {/* Donut Chart — Pembayaran */}
      <ChartCard
        title="Status Pembayaran"
        subtitle="Sudah bayar vs belum bayar"
      >
        {bayarChartData
          ? <Doughnut data={bayarChartData} options={donutOptions} />
          : <p className="text-slate-600 text-xs text-center mt-24">Memuat data...</p>
        }
      </ChartCard>

    </div>
  );
}