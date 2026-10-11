import { useEffect, useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { createOrder } from '../../lib/ordersApi'
import { payWithRazorpay, checkRazorpayConfigured } from '../../lib/razorpay'
import { isSupabaseConfigured } from '../../lib/supabaseClient'
import './Checkout.css'

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', phone: '', address: '' })
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [isRazorpayConfigured, setIsRazorpayConfigured] = useState(false)

  useEffect(() => {
    checkRazorpayConfigured().then(setIsRazorpayConfigured)
  }, [])

  if (items.length === 0) {
    return <Navigate to="/cart" replace />
  }

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!isSupabaseConfigured) {
      setError('Checkout is not connected to a backend yet — Supabase keys are missing from .env.')
      return
    }

    setSubmitting(true)
    try {
      const orderItems = items.map((i) => ({ product_id: i.id, name: i.name, price: i.price, qty: i.qty }))

      if (paymentMethod === 'razorpay') {
        const result = await payWithRazorpay({ amount: total, customer: form })
        const order = await createOrder({
          customer: form,
          items: orderItems,
          total,
          paymentMethod: 'razorpay',
          paymentStatus: 'paid',
          razorpay: result,
        })
        clearCart()
        navigate('/checkout/success', { state: { orderId: order.id } })
      } else {
        const order = await createOrder({
          customer: form,
          items: orderItems,
          total,
          paymentMethod: 'cod',
          paymentStatus: 'pending',
        })
        clearCart()
        navigate('/checkout/success', { state: { orderId: order.id } })
      }
    } catch (err) {
      setError(err.message || 'Something went wrong placing your order.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="checkout-page">
      <section className="page-hero">
        <div className="container">
          <h1 className="heading-lg shiny-gold-text">Checkout</h1>
        </div>
      </section>

      <section className="section">
        <div className="container checkout-grid">
          <form className="gold-panel checkout-form" onSubmit={handleSubmit}>
            <h3 className="shiny-gold-text">Delivery Details</h3>
            <label>
              Full Name
              <input name="name" required value={form.name} onChange={handleChange} />
            </label>
            <label>
              Phone Number
              <input name="phone" type="tel" required value={form.phone} onChange={handleChange} />
            </label>
            <label>
              Delivery Address
              <textarea name="address" required rows={3} value={form.address} onChange={handleChange} />
            </label>

            <h3 className="shiny-gold-text" style={{ marginTop: '2rem' }}>
              Payment Method
            </h3>
            <div className="payment-options">
              <label className={`payment-option ${paymentMethod === 'cod' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
                <div>
                  <strong>Cash on Delivery</strong>
                  <p>Pay when your order arrives.</p>
                </div>
              </label>
              <label className={`payment-option ${paymentMethod === 'razorpay' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="razorpay"
                  checked={paymentMethod === 'razorpay'}
                  onChange={() => setPaymentMethod('razorpay')}
                />
                <div>
                  <strong>Pay Online (Razorpay)</strong>
                  <p>Card, UPI, netbanking &amp; more.</p>
                  {!isRazorpayConfigured && (
                    <p className="payment-option-warning">Not connected yet — will be enabled at launch.</p>
                  )}
                </div>
              </label>
            </div>

            {error && <p className="checkout-error">{error}</p>}

            <button
              type="submit"
              className="btn btn-gold checkout-submit"
              disabled={submitting || (paymentMethod === 'razorpay' && !isRazorpayConfigured)}
            >
              {submitting ? 'Placing Order…' : paymentMethod === 'razorpay' ? 'Pay & Place Order' : 'Place Order'}
            </button>
          </form>

          <div className="gold-panel checkout-summary">
            <h3 className="shiny-gold-text">Order Summary</h3>
            {items.map((item) => (
              <div key={item.id} className="checkout-summary-row">
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>₹{(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div className="checkout-summary-row checkout-summary-total">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
