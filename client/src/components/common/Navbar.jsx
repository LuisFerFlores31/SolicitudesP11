import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link to="/" className="font-semibold text-gray-800">Solicitudes</Link>
        <Link to="/requests" className="text-sm text-gray-600 hover:text-gray-900">Solicitudes</Link>
        {user?.role === 'admin' && (
          <>
            <Link to="/areas" className="text-sm text-gray-600 hover:text-gray-900">Áreas</Link>
            <Link to="/admin/users" className="text-sm text-gray-600 hover:text-gray-900">Usuarios</Link>
          </>
        )}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">{user?.name}</span>
        <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-800">
          Cerrar sesión
        </button>
      </div>
    </nav>
  )
}
