import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../../../lib/productsApi'
import { fetchOrders } from '../../../lib/ordersApi'
import './AdminDashboard.css'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, pending: 0 })

  useEffect(() => {
    Promise.all([fetchProducts(), fetchOrders()]).then(([products, orders]) => {
      setStats({
        products: products.length,
        orders: orders.length,
        pending: orders.filter((o) => o.status === 'pending').length,
      })
    })
  }, [])

  return (
    <div className="admin-dashboard">
      <h1 className="shiny-gold-text admin-dashboard-title">Dashboard</h1>
      <div className="admin-dashboard-stats">
        <Link to="/admin/products" className="gold-panel admin-stat-card">
          <span className="admin-stat-value">{stats.products}</span>
          <span className="admin-stat-label">Products</span>
        </Link>
        <Link to="/admin/orders" className="gold-panel admin-stat-card">
          <span className="admin-stat-value">{stats.orders}</span>
          <span className="admin-stat-label">Total Orders</span>
        </Link>
        <Link to="/admin/orders" className="gold-panel admin-stat-card">
          <span className="admin-stat-value">{stats.pending}</span>
          <span className="admin-stat-label">Pending Orders</span>
        </Link>
      </div>
    </div>
  )
}
