import { Link, useLocation } from 'react-router-dom'
import './Checkout.css'

export default function CheckoutSuccess() {
  const location = useLocation()
  const orderId = location.state?.orderId

  return (
    <div className="checkout-success">
      <div className="container">
        <h1 className="heading-lg shiny-gold-text">Order Placed</h1>
        <p className="checkout-success-text">
          Thank you — your order has been received{orderId ? ` (ref: ${orderId.slice(0, 8)})` : ''}. We'll be in
          touch shortly with delivery details.
        </p>
        <Link to="/products" className="btn btn-gold">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
