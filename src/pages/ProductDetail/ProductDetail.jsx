import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchProductBySlug } from '../../lib/productsApi'
import { useCart } from '../../context/CartContext'
import './ProductDetail.css'

export default function ProductDetail() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  useEffect(() => {
    setLoading(true)
    setAdded(false)
    fetchProductBySlug(slug)
      .then(setProduct)
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <p className="state-message">Loading…</p>

  if (!product) {
    return (
      <div className="state-message">
        <p>We couldn't find that product.</p>
        <Link to="/products" className="btn btn-gold" style={{ marginTop: '1rem' }}>
          Back to Products
        </Link>
      </div>
    )
  }

  function handleAddToCart() {
    addItem(product, qty)
    setAdded(true)
  }

  return (
    <div className="product-detail">
      <div className="container product-detail-grid">
        <div className="gold-panel product-detail-image">
          <img src={product.image_url} alt={product.name} />
        </div>
        <div>
          <h1 className="shiny-gold-text product-detail-name">{product.name}</h1>
          <p className="product-detail-tagline">{product.tagline}</p>
          <p className="product-detail-price">₹{product.price.toFixed(2)}</p>
          <p className="product-detail-description">{product.description}</p>

          {product.ingredients && product.ingredients.length > 0 && (
            <div className="product-detail-ingredients">
              <h4>Key Ingredients</h4>
              <ul>
                {product.ingredients.map((ing) => (
                  <li key={ing}>{ing}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="product-detail-actions">
            <div className="qty-stepper">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                −
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
                +
              </button>
            </div>
            <button className="btn btn-gold" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
          {added && (
            <p className="added-message">
              Added to cart. <Link to="/cart">View cart →</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
