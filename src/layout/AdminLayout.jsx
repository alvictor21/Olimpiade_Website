import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import AdminDashboard from '../components/admindashboard'

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />
      <main className="ml-64 flex-1 p-8">
        <Outlet /> {/* halaman aktif dirender di sini */}
      </main>
    </div>
  )
}