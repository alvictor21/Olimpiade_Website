import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import FormPendaftaran from './components/resgist'
import { Routes, Route } from 'react-router-dom'
import AdminDashboard from './components/admindashboard'
import AdminLayout from './layout/AdminLayout'
import Peserta from './components/Peserta'
import Mapel from './components/matapelajaran'
import DetailMapel from './components/DetailMapel'
import Login from './components/Login'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token")
  if (!token) return <Navigate to="/" replace />
  return children
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/regist" element={<FormPendaftaran />} />

      
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="peserta" element={<Peserta />} />
        <Route path="mapel" element={<Mapel />} />
        <Route path="mapel/:id" element={<DetailMapel />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
