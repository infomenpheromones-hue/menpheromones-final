import { supabase, isSupabaseConfigured } from './supabaseClient'
import { seedProducts } from './seedProducts'

export async function fetchProducts() {
  if (!isSupabaseConfigured) return seedProducts

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('[productsApi] fetchProducts failed, falling back to seed data:', error.message)
    return seedProducts
  }
  return data && data.length > 0 ? data : seedProducts
}

export async function fetchProductBySlug(slug) {
  if (!isSupabaseConfigured) {
    return seedProducts.find((p) => p.slug === slug) || null
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('[productsApi] fetchProductBySlug failed, falling back to seed data:', error.message)
    return seedProducts.find((p) => p.slug === slug) || null
  }
  return data
}

function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Admin-only CRUD below — requires an authenticated session (enforced by RLS
// in supabase/schema.sql, not just by hiding the UI).
export async function uploadProductImage(file) {
  const path = `${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ''))}`
  const { error } = await supabase.storage.from('products').upload(path, file, { upsert: true })
  if (error) throw error
  const { data } = supabase.storage.from('products').getPublicUrl(path)
  return data.publicUrl
}

export async function createProduct(product) {
  const payload = { ...product, slug: product.slug || slugify(product.name) }
  const { data, error } = await supabase.from('products').insert(payload).select().single()
  if (error) throw error
  return data
}

export async function updateProduct(id, product) {
  const { data, error } = await supabase.from('products').update(product).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deleteProduct(id) {
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw error
}
