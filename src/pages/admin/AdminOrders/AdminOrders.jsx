import { useEffect, useState } from 'react'
import { fetchOrders, updateOrderStatus } from '../../../lib/ordersApi'
import './AdminOrders.css'

const statuses = ['pending', 'processing', 'shipped', 'delivered']

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  function load() {
    setLoading(true)
    setError('')
    fetchOrders()
      .then(setOrders)
      .catch((err) => setError(err.message || 'Failed to load orders'))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  async function handleStatusChange(order, status) {
    try {
      await updateOrderStatus(order.id, status)
      setOrders((prev) => prev.map((o) => (o.id === order.id ? { ...o, status } : o)))
    } catch (err) {
      setError(err.message || 'Failed to update status')
    }
  }

  return (
    <div className="admin-orders">
      <h1 className="shiny-gold-text admin-orders-title">Orders</h1>

      {error && <p className="admin-orders-error">{error}</p>}

      {loading ? (
        <p className="state-message">Loading…</p>
      ) : orders.length === 0 ? (
        <p className="state-message">No orders yet.</p>
      ) : (
        <div className="admin-orders-list">
          {orders.map((order) => (
            <div key={order.id} className="gold-panel admin-order-card">
              <div className="admin-order-header">
                <div>
                  <strong>{order.customer_name}</strong>
                  <span className="admin-order-date">
                    {new Date(order.created_at).toLocaleString()}
                  </span>
                </div>
                <select value={order.status} onChange={(e) => handleStatusChange(order, e.target.value)}>
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <p className="admin-order-detail">Phone: {order.phone}</p>
              <p className="admin-order-detail">Address: {order.address}</p>
              <p className="admin-order-detail">
                Payment: {order.payment_method} ({order.payment_status})
              </p>
              <ul className="admin-order-items">
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.name} × {item.qty} — ₹{(item.price * item.qty).toFixed(2)}
                  </li>
                ))}
              </ul>
              <p className="admin-order-total">Total: ₹{Number(order.total).toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
