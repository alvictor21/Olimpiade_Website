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


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/" element={<FormPendaftaran />} />
       <Route path="/admin" element={<AdminLayout />}>
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
