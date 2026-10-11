import { useEffect, useState } from 'react'
import ProductForm from '../../../components/admin/ProductForm'
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../../../lib/productsApi'
import './AdminProducts.css'

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // null = not editing, {} = new, product = edit
  const [error, setError] = useState('')

  function load() {
    setLoading(true)
    fetchProducts()
      .then(setProducts)
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  async function handleSubmit(values) {
    if (editing?.id) {
      await updateProduct(editing.id, values)
    } else {
      await createProduct(values)
    }
    setEditing(null)
    load()
  }

  async function handleDelete(product) {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return
    setError('')
    try {
      await deleteProduct(product.id)
      load()
    } catch (err) {
      setError(err.message || 'Delete failed')
    }
  }

  return (
    <div className="admin-products">
      <div className="admin-products-header">
        <h1 className="shiny-gold-text">Products</h1>
        {!editing && (
          <button className="btn btn-gold" onClick={() => setEditing({})}>
            + Add Product
          </button>
        )}
      </div>

      {error && <p className="admin-products-error">{error}</p>}

      {editing && (
        <ProductForm
          initial={editing.id ? editing : null}
          onSubmit={handleSubmit}
          onCancel={() => setEditing(null)}
        />
      )}

      {loading ? (
        <p className="state-message">Loading…</p>
      ) : (
        <div className="admin-products-list">
          {products.map((p) => (
            <div key={p.id} className="gold-panel admin-product-row">
              <img src={p.image_url} alt={p.name} />
              <div className="admin-product-info">
                <strong>{p.name}</strong>
                <span>₹{Number(p.price).toFixed(2)}</span>
              </div>
              <div className="admin-product-actions">
                <button className="btn btn-outline" onClick={() => setEditing(p)}>
                  Edit
                </button>
                <button className="btn btn-outline admin-product-delete" onClick={() => handleDelete(p)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
