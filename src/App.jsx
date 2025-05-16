import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './PrivateRoute'
import { ToastContainer } from 'react-toastify'
import TokenExpiredModal from './components/TokenExpiredModal'
import useTokenMonitor from './hooks/useTokenMonitor'
import NotFoundPage from './components/NotFound'
import MainLayout from './layouts/MainLayout'
import NamazTime from './pages/NamazTime'
import Dua from './pages/Dua'
function App() {

  useTokenMonitor();
  return (

    <>
      <TokenExpiredModal />

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/" element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
        >
          <Route index element={<Dashboard />} />
          <Route path='/namaztime' element={<NamazTime />} />
          <Route path='/dua' element={<Dua />} />
        </Route>


        {/* this IS for 404 Page Not Found */}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
