import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { useAuth } from './hooks/useAuth'
import Navbar from './components/common/Navbar'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import RequestList from './pages/requests/RequestList'
import RequestDetail from './pages/requests/RequestDetail'
import CreateRequest from './pages/requests/CreateRequest'
import AreaList from './pages/areas/AreaList'
import UserList from './pages/admin/UserList'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="p-8 text-gray-500">Cargando...</div>
  if (!user) return <Navigate to="/login" replace />
  return children
}

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-8">{children}</main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
          <Route path="/requests" element={<PrivateRoute><Layout><RequestList /></Layout></PrivateRoute>} />
          <Route path="/requests/new" element={<PrivateRoute><Layout><CreateRequest /></Layout></PrivateRoute>} />
          <Route path="/requests/:id" element={<PrivateRoute><Layout><RequestDetail /></Layout></PrivateRoute>} />
          <Route path="/areas" element={<PrivateRoute><Layout><AreaList /></Layout></PrivateRoute>} />
          <Route path="/admin/users" element={<PrivateRoute><Layout><UserList /></Layout></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
