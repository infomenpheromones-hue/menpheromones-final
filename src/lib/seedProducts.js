// Temporary storefront catalog: simple fragrance soaps.
// productsApi.js serves this catalog while USE_TEMP_CATALOG is true.

// Plain colour-block "soap bar" illustration so no product photos are needed yet.
function soapImage(color, accent) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#f6f1ea"/><rect x="70" y="140" width="260" height="130" rx="28" fill="${color}"/><rect x="70" y="140" width="260" height="40" rx="20" fill="${accent}" opacity="0.45"/><circle cx="130" cy="110" r="14" fill="#fff" opacity="0.8"/><circle cx="165" cy="90" r="9" fill="#fff" opacity="0.7"/><circle cx="290" cy="105" r="11" fill="#fff" opacity="0.8"/></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export const seedProducts = [
  {
    id: 'seed-1',
    slug: 'rose-fragrance-soap',
    name: 'Rose Fragrance Soap',
    tagline: 'Soft floral freshness for daily use',
    description:
      'A gently scented 100g bar with a classic rose fragrance. Cleanses without leaving skin feeling tight and leaves a light, fresh scent after your bath.',
    price: 149,
    image_url: soapImage('#e8a0b4', '#f7d3de'),
    ingredients: ['Rose Fragrance', 'Glycerin', 'Coconut Oil'],
  },
  {
    id: 'seed-2',
    slug: 'sandalwood-fragrance-soap',
    name: 'Sandalwood Fragrance Soap',
    tagline: 'Warm, woody and calming',
    description:
      'A 100g bar with a warm sandalwood fragrance. Rich lather, mild on skin, and a comforting aroma that lasts through the day.',
    price: 179,
    image_url: soapImage('#d8b48a', '#f0dcc0'),
    ingredients: ['Sandalwood Fragrance', 'Glycerin', 'Palm Oil'],
  },
  {
    id: 'seed-3',
    slug: 'lavender-fragrance-soap',
    name: 'Lavender Fragrance Soap',
    tagline: 'A relaxing bath-time classic',
    description:
      'A 100g bar scented with soothing lavender. Creamy lather and a clean, calming fragrance for a relaxing bath.',
    price: 169,
    image_url: soapImage('#b7a4d6', '#dcd2ee'),
    ingredients: ['Lavender Fragrance', 'Glycerin', 'Shea Butter'],
  },
]
