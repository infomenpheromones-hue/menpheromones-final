// Placeholder catalog used until Supabase is connected (see .env.example).
// Once VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are set, real data from the
// `products` table takes over automatically — see src/lib/productsApi.js.
export const seedProducts = [
  {
    id: 'seed-1',
    slug: 'pheromone-soap',
    name: 'Pheromone Soap',
    tagline: 'Daily dominance in every wash',
    description:
      'Our signature bar blends a scientifically-formulated pheromone complex with skin-loving botanicals for a daily ritual that builds attraction with every use.',
    price: 1499,
    image_url: '/images/soap.jpg',
    ingredients: ['Coleus Forskohlii', 'Camellia Sinensis', 'Celery Extract'],
  },
  {
    id: 'seed-2',
    slug: 'pheromone-soap-pro',
    name: 'Pheromone Soap Pro',
    tagline: 'Enhanced formula for maximum impact',
    description:
      'A concentrated version of our original formula, engineered for men who want a stronger, longer-lasting pheromone signature throughout the day.',
    price: 1799,
    image_url: '/images/soap-pro.jpg',
    ingredients: ['Coleus Forskohlii', 'Camellia Sinensis', 'Celery Extract', 'Androstenol Complex'],
  },
  {
    id: 'seed-3',
    slug: 'pheromone-soap-elite',
    name: 'Pheromone Soap Elite',
    tagline: 'Ultimate luxury, ultimate attraction',
    description:
      'Our flagship formulation — the highest concentration pheromone complex we offer, in a luxury bar built for men who refuse to blend in.',
    price: 2399,
    image_url: '/images/soap-elite.jpg',
    ingredients: ['Coleus Forskohlii', 'Camellia Sinensis', 'Celery Extract', 'Androstenol Complex', 'Androstenone Complex'],
  },
]
