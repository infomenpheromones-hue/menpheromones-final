import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedRoute() {
  const { isAdmin, loading } = useAuth()

  if (loading) return <p className="state-message">Checking session…</p>
  if (!isAdmin) return <Navigate to="/admin/login" replace />

  return <Outlet />
}
