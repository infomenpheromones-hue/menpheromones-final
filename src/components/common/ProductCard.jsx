import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import './ProductCard.css'

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  return (
    <div className="product-card gold-panel">
      <Link to={`/products/${product.slug}`} className="product-card-image">
        <img src={product.image_url} alt={product.name} loading="lazy" />
      </Link>
      <div className="product-card-body">
        <h3 className="shiny-gold-text product-card-name">{product.name}</h3>
        <p className="product-card-tagline">{product.tagline}</p>
        <p className="product-card-price">₹{product.price.toFixed(2)}</p>
        <div className="product-card-actions">
          <button className="btn btn-gold" onClick={() => addItem(product)}>
            Add to Cart
          </button>
          <Link to={`/products/${product.slug}`} className="btn btn-outline">
            Quick View
          </Link>
        </div>
      </div>
    </div>
  )
}
