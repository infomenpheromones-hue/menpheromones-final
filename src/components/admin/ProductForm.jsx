import { useState } from 'react'
import { uploadProductImage } from '../../lib/productsApi'
import './ProductForm.css'

const emptyProduct = { name: '', tagline: '', description: '', price: '', image_url: '', ingredients: '' }

export default function ProductForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(
    initial
      ? { ...initial, ingredients: (initial.ingredients || []).join(', ') }
      : emptyProduct
  )
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleImageChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const url = await uploadProductImage(file)
      setForm((f) => ({ ...f, image_url: url }))
    } catch (err) {
      setError(err.message || 'Image upload failed')
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      await onSubmit({
        name: form.name,
        tagline: form.tagline,
        description: form.description,
        price: Number(form.price),
        image_url: form.image_url,
        ingredients: form.ingredients
          ? form.ingredients.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
      })
    } catch (err) {
      setError(err.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="gold-panel product-form" onSubmit={handleSubmit}>
      <h3 className="shiny-gold-text">{initial ? 'Edit Product' : 'Add Product'}</h3>

      <label>
        Name
        <input name="name" required value={form.name} onChange={handleChange} />
      </label>
      <label>
        Tagline
        <input name="tagline" value={form.tagline} onChange={handleChange} />
      </label>
      <label>
        Description
        <textarea name="description" rows={3} value={form.description} onChange={handleChange} />
      </label>
      <label>
        Price (₹)
        <input name="price" type="number" min="0" step="0.01" required value={form.price} onChange={handleChange} />
      </label>
      <label>
        Ingredients (comma-separated)
        <input name="ingredients" value={form.ingredients} onChange={handleChange} />
      </label>
      <label>
        Product Image
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>
      {uploading && <p className="product-form-note">Uploading image…</p>}
      {form.image_url && (
        <img src={form.image_url} alt="Preview" className="product-form-preview" />
      )}

      {error && <p className="product-form-error">{error}</p>}

      <div className="product-form-actions">
        <button type="submit" className="btn btn-gold" disabled={saving || uploading}>
          {saving ? 'Saving…' : 'Save Product'}
        </button>
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}
