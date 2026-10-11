import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { isSupabaseConfigured } from '../../../lib/supabaseClient'
import './AdminLogin.css'

export default function AdminLogin() {
  const { login, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (isAdmin) return <Navigate to="/admin" replace />

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(email, password)
      navigate('/admin')
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="admin-login-page">
      <form className="gold-panel admin-login-form" onSubmit={handleSubmit}>
        <h1 className="shiny-gold-text admin-login-title">Admin Login</h1>

        {!isSupabaseConfigured && (
          <p className="admin-login-warning">
            Supabase isn't connected yet — add VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY to .env before
            logging in.
          </p>
        )}

        <label>
          Email
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <p className="admin-login-error">{error}</p>}
        <button type="submit" className="btn btn-gold" disabled={submitting}>
          {submitting ? 'Logging in…' : 'Log In'}
        </button>
      </form>
    </div>
  )
}
