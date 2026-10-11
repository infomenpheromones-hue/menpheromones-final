import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(e) {
    e.preventDefault()
    // Newsletter capture can be wired to a Supabase table later if needed.
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3 className="shiny-gold-text footer-title">Science of Attraction</h3>
          <p className="footer-text">
            Where science meets attraction. Unlock the power of human pheromones and experience the
            transformation.
          </p>
        </div>
        <div>
          <h4 className="footer-heading shiny-gold-text">Newsletter</h4>
          <p className="footer-text">Stay updated with the latest research and exclusive offers.</p>
          {subscribed ? (
            <p className="footer-subscribed">You're on the list.</p>
          ) : (
            <form className="footer-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                required
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn btn-gold">
                Subscribe
              </button>
            </form>
          )}
        </div>
        <div>
          <h4 className="footer-heading" style={{ color: 'var(--color-gold)' }}>
            Connect
          </h4>
          <div className="footer-socials">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="Twitter">🐦</a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Menpheromones. All rights reserved.</p>
        <div className="footer-legal">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/faq">FAQ</Link>
        </div>
      </div>
    </footer>
  )
}
