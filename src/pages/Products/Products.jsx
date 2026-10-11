import { useEffect, useState } from 'react'
import ProductCard from '../../components/common/ProductCard'
import { fetchProducts } from '../../lib/productsApi'
import './Products.css'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="products-page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">The Full Range</p>
          <h1 className="heading-lg shiny-gold-text">All Products</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading ? (
            <p className="state-message">Loading products…</p>
          ) : products.length === 0 ? (
            <p className="state-message">No products available yet. Check back soon.</p>
          ) : (
            <div className="products-page-grid">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
