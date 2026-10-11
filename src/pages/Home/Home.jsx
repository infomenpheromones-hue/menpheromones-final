import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../../components/common/ProductCard'
import { fetchProducts } from '../../lib/productsApi'
import { site } from '../../lib/siteConfig'
import './Home.css'

const highlights = [
  { icon: '🧼', title: 'Rich Lather', text: 'Creamy, long-lasting lather that rinses clean.' },
  { icon: '🌸', title: 'Lovely Fragrances', text: 'Rose, sandalwood and lavender scents for everyday freshness.' },
  { icon: '🚚', title: 'Delivered to You', text: 'Cash on Delivery and secure online payment across India.' },
]

export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data.slice(0, 3)))
  }, [])

  return (
    <div className="home">
      <section className="hero">
        <div className="container hero-content">
          <p className="eyebrow">{site.brand}</p>
          <h1 className="heading-xl shiny-gold-text hero-title">Fragrance Soaps</h1>
          <p className="hero-subtitle">Simple, gentle bath soaps in classic fragrances for everyday use.</p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-gold">
              Shop Soaps
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container features-grid">
          {highlights.map((f) => (
            <div key={f.title} className="gold-panel feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3 className="shiny-gold-text feature-title">{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="products">
        <div className="container">
          <h2 className="heading-lg shiny-gold-text" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            Our Soaps
          </h2>
          <div className="products-grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container cta-content">
          <h2 className="heading-lg shiny-gold-text">Questions about an order?</h2>
          <p className="cta-subtitle">
            Read our shipping and refund policies, or get in touch — we're happy to help.
          </p>
          <div className="cta-actions">
            <Link to="/shipping-policy" className="btn btn-outline">
              Shipping Policy
            </Link>
            <Link to="/refund-policy" className="btn btn-outline">
              Refund Policy
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
