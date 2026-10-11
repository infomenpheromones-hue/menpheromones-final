import { NavLink } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { site } from '../../lib/siteConfig'
import './Navbar.css'

const links = [
  { to: '/products', label: 'Products' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { count } = useCart()

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <NavLink to="/" className="navbar-brand shiny-gold-text">
          {site.brand}
        </NavLink>
        <div className="navbar-links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => 'navbar-link' + (isActive ? ' active' : '')}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/cart" className="navbar-cart btn btn-gold">
            Cart{count > 0 ? ` (${count})` : ''}
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
