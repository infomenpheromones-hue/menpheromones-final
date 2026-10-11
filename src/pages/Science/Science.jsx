import './Science.css'

const ingredients = [
  {
    name: 'Coleus Forskohlii',
    latin: 'Plectranthus barbatus',
    image: '/images/soap.jpg',
    description:
      'A powerful herb that naturally increases cAMP levels, supporting testosterone production and enhancing your natural pheromone profile.',
    points: [
      'Boosts testosterone precursors naturally',
      'Enhances metabolic function',
      'Supports overall hormonal balance',
    ],
  },
  {
    name: 'Camellia Sinensis',
    latin: 'Green Tea Extract',
    image: '/images/soap-pro.jpg',
    description:
      'Rich in antioxidants, this botanical supports skin health and helps stabilize the delivery of active pheromone compounds.',
    points: ['Rich in EGCG antioxidants', 'Supports healthy skin barrier', 'Helps stabilize active compounds'],
  },
  {
    name: 'Celery Extract',
    latin: 'Apium graveolens',
    image: '/images/soap-elite.jpg',
    description:
      'A natural source of androstenol precursors, celery extract has long been studied for its role in the human pheromone response.',
    points: ['Natural androstenol precursor', 'Studied for pheromone response', 'All-natural, plant-derived'],
  },
]

export default function Science() {
  return (
    <div className="science-page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Our Brand Story</p>
          <h1 className="heading-lg shiny-gold-text">The Science of Attraction</h1>
          <p className="science-intro">
            Menpheromones was founded on a simple belief: attraction isn't just chemistry between two
            people — it's chemistry, period. We formulate every product around published pheromone
            research, so what you feel is backed by what science shows.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container whitepaper-grid">
          <div>
            <h2 className="heading-lg shiny-gold-text">How Pheromones Work</h2>
            <p className="science-copy">
              Pheromones are chemical signals detected by the human vomeronasal organ (VNO), influencing
              perceived attraction, confidence, and social dominance below the level of conscious smell.
              Controlled trials have recorded attraction-rating increases of 40-60% when subjects were
              exposed to androstenone and androstenol compounds — the same active class formulated into
              every Menpheromones bar.
            </p>
            <p className="science-copy">
              Our formulations reference published research in the Journal of Neuroscience, Nature, and
              Hormones &amp; Behavior, translated into a daily ritual: a bar of soap.
            </p>
          </div>
          <div className="gold-panel whitepaper-card">
            <h3 className="shiny-gold-text">Whitepaper</h3>
            <p>
              Want the full research breakdown behind our formulations? Our whitepaper covers the studies,
              compounds, and methodology behind every product.
            </p>
            <a className="btn btn-gold" href="mailto:hello@menpheromones.com?subject=Whitepaper Request">
              Request the Whitepaper
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="heading-lg shiny-gold-text" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            All-Natural Powerhouse Ingredients
          </h2>
          <div className="ingredients-list">
            {ingredients.map((ing) => (
              <div key={ing.name} className="ingredient-row">
                <div className="ingredient-image">
                  <img src={ing.image} alt={ing.name} loading="lazy" />
                </div>
                <div>
                  <h3 className="shiny-gold-text ingredient-name">{ing.name}</h3>
                  <p className="ingredient-latin">{ing.latin}</p>
                  <p className="science-copy">{ing.description}</p>
                  <ul className="ingredient-points">
                    {ing.points.map((point) => (
                      <li key={point}>
                        <span>✓</span> {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
