-- Optional: run after schema.sql to pre-populate the storefront with the
-- same 3 starter products used as frontend fallback data (src/lib/seedProducts.js).
-- Not required — the admin panel can add products from scratch instead.

insert into products (name, slug, tagline, description, price, image_url, ingredients)
values
  (
    'Pheromone Soap',
    'pheromone-soap',
    'Daily dominance in every wash',
    'Our signature bar blends a scientifically-formulated pheromone complex with skin-loving botanicals for a daily ritual that builds attraction with every use.',
    1499,
    '/images/soap.jpg',
    array['Coleus Forskohlii', 'Camellia Sinensis', 'Celery Extract']
  ),
  (
    'Pheromone Soap Pro',
    'pheromone-soap-pro',
    'Enhanced formula for maximum impact',
    'A concentrated version of our original formula, engineered for men who want a stronger, longer-lasting pheromone signature throughout the day.',
    1799,
    '/images/soap-pro.jpg',
    array['Coleus Forskohlii', 'Camellia Sinensis', 'Celery Extract', 'Androstenol Complex']
  ),
  (
    'Pheromone Soap Elite',
    'pheromone-soap-elite',
    'Ultimate luxury, ultimate attraction',
    'Our flagship formulation — the highest concentration pheromone complex we offer, in a luxury bar built for men who refuse to blend in.',
    2399,
    '/images/soap-elite.jpg',
    array['Coleus Forskohlii', 'Camellia Sinensis', 'Celery Extract', 'Androstenol Complex', 'Androstenone Complex']
  )
on conflict (slug) do nothing;
