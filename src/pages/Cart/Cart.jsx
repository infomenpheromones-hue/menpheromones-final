import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import './Cart.css'

export default function Cart() {
  const { items, updateQty, removeItem, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <section className="page-hero">
          <div className="container">
            <h1 className="heading-lg shiny-gold-text">Your Cart</h1>
          </div>
        </section>
        <div className="state-message">
          <p>Your cart is empty.</p>
          <Link to="/products" className="btn btn-gold" style={{ marginTop: '1rem' }}>
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <section className="page-hero">
        <div className="container">
          <h1 className="heading-lg shiny-gold-text">Your Cart</h1>
        </div>
      </section>

      <section className="section">
        <div className="container cart-grid">
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="gold-panel cart-item">
                <img src={item.image_url} alt={item.name} />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>₹{item.price.toFixed(2)}</p>
                </div>
                <div className="qty-stepper">
                  <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Decrease quantity">
                    −
                  </button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Increase quantity">
                    +
                  </button>
                </div>
                <p className="cart-item-subtotal">₹{(item.price * item.qty).toFixed(2)}</p>
                <button className="cart-item-remove" onClick={() => removeItem(item.id)} aria-label="Remove item">
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="gold-panel cart-summary">
            <h3 className="shiny-gold-text">Order Summary</h3>
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="cart-summary-row cart-summary-total">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="btn btn-gold cart-checkout-btn">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
