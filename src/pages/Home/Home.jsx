import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../../components/common/ProductCard'
import { fetchProducts } from '../../lib/productsApi'
import './Home.css'

const features = [
  {
    icon: '🧲',
    title: 'Magnetic Attraction',
    text: 'Enhance your natural appeal and draw people in with scientifically-backed pheromone compounds.',
  },
  {
    icon: '🔗',
    title: 'Break Barriers',
    text: 'Overcome social anxiety and build unshakeable confidence in any situation.',
  },
  {
    icon: '👑',
    title: 'Command Respect',
    text: 'Project dominance and leadership through your enhanced presence and aura.',
  },
]

const scienceFacts = [
  'Pheromones activate the vomeronasal organ (VNO) in humans',
  'Studies show increased attraction ratings by 40-60% in controlled trials',
  'Androstenone and androstenol enhance perceived dominance and masculinity',
  'Published in Journal of Neuroscience, Nature, and Hormones & Behavior',
]

const ingredients = [
  {
    key: 'coleus',
    icon: '🌿',
    name: 'Coleus Forskohlii',
    subtitle: 'Plectranthus barbatus',
    description:
      'A powerful herb that naturally increases cAMP levels, supporting testosterone production and enhancing your natural pheromone profile.',
    points: [
      'Boosts testosterone precursors naturally',
      'Enhances metabolic function',
      'Supports overall hormonal balance',
    ],
  },
  {
    key: 'camellia',
    icon: '🍵',
    name: 'Camellia Sinensis',
    subtitle: 'Green Tea Extract',
    description:
      "Premium green tea extract that optimizes your skin's ability to emit natural pheromones, making you more attractive.",
    points: ['Enhances skin pheromone emission', 'Rich in antioxidants', 'Improves skin health and radiance'],
  },
  {
    key: 'celery',
    icon: '🌱',
    name: 'Celery Extract',
    subtitle: 'Apium graveolens',
    description:
      'Rich in natural androstenone and androstenol, the same compounds that signal dominance and attraction in nature.',
    points: [
      'Contains androstenone & androstenol',
      'Natural scent signal compounds',
      'Proven attraction enhancement',
    ],
  },
]

const testimonials = [
  {
    name: 'Marcus T.',
    age: 28,
    quote:
      'Within two weeks, I noticed a significant difference. Women approach me more, and my confidence has skyrocketed.',
  },
  {
    name: 'Jake R.',
    age: 32,
    quote: 'This product changed my life. The science is real, and the results speak for themselves.',
  },
  {
    name: 'David K.',
    age: 24,
    quote: 'I was skeptical at first, but the pheromone soap and tablets work. My dating life has never been better.',
  },
]

export default function Home() {
  const [products, setProducts] = useState([])
  const [activeIngredient, setActiveIngredient] = useState(ingredients[0].key)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data.slice(0, 3)))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((i) => (i + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const currentIngredient = ingredients.find((i) => i.key === activeIngredient)
  const currentTestimonial = testimonials[activeTestimonial]

  return (
    <div className="home">
      <section
        className="hero"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      >
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="hero-frame">
            <h1 className="heading-xl shiny-gold-text hero-title">
              <span className="hero-title-line1">Science Of</span>
              <span className="hero-title-line2">Attraction</span>
            </h1>
          </div>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-gold">
              Shop the Product
            </Link>
            <Link to="/science" className="btn btn-outline">
              Explore Science
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container features-grid">
          {features.map((f) => (
            <div key={f.title} className="gold-panel feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3 className="shiny-gold-text feature-title">{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="science">
        <div className="container science-grid">
          <div>
            <h2 className="heading-lg shiny-gold-text">The Science Behind Attraction</h2>
            <ul className="science-list">
              {scienceFacts.map((fact) => (
                <li key={fact}>
                  <span className="bullet">•</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
            <Link to="/science" className="btn btn-gold" style={{ marginTop: '2rem' }}>
              Read Full Whitepaper
            </Link>
          </div>
          <div className="gold-panel science-diagram">
            <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="150" r="20" fill="#D4AF37" opacity="0.8" />
              <circle cx="200" cy="100" r="15" fill="#D4AF37" opacity="0.6" />
              <circle cx="300" cy="150" r="18" fill="#D4AF37" opacity="0.7" />
              <rect x="150" y="200" width="100" height="40" rx="5" fill="#C21807" opacity="0.5" />
              <rect x="250" y="200" width="100" height="40" rx="5" fill="#C21807" opacity="0.5" />
              <line x1="100" y1="150" x2="200" y2="220" stroke="#D4AF37" strokeWidth="2" opacity="0.5" />
              <line x1="200" y1="100" x2="250" y2="220" stroke="#D4AF37" strokeWidth="2" opacity="0.5" />
              <line x1="300" y1="150" x2="300" y2="220" stroke="#D4AF37" strokeWidth="2" opacity="0.5" />
            </svg>
            <p className="science-diagram-caption">Pheromone molecules binding to receptor sites</p>
          </div>
        </div>
      </section>

      <section className="section" id="products">
        <div className="container">
          <h2 className="heading-lg shiny-gold-text" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            Choose Your Weapon
          </h2>
          <div className="products-grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container testimonial-wrap">
          <h2 className="heading-lg shiny-gold-text" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            Real Results, Real Men
          </h2>
          <div className="gold-panel testimonial-card">
            <div className="stars">★★★★★</div>
            <p className="testimonial-quote">"{currentTestimonial.quote}"</p>
            <p className="testimonial-name">{currentTestimonial.name}</p>
            <p className="testimonial-age">Age {currentTestimonial.age}</p>
          </div>
          <div className="testimonial-dots">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                className={'testimonial-dot' + (i === activeTestimonial ? ' active' : '')}
                aria-label={`Show testimonial from ${t.name}`}
                onClick={() => setActiveTestimonial(i)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="heading-lg shiny-gold-text" style={{ textAlign: 'center', marginBottom: '1rem' }}>
            All-Natural Powerhouse Ingredients
          </h2>
          <div className="ingredient-tabs">
            {ingredients.map((ing) => (
              <button
                key={ing.key}
                className={'ingredient-tab' + (ing.key === activeIngredient ? ' active' : '')}
                onClick={() => setActiveIngredient(ing.key)}
              >
                {ing.name}
              </button>
            ))}
          </div>
          <div className="ingredient-detail">
            <div className="gold-panel ingredient-visual">
              <span className="ingredient-visual-icon">{currentIngredient.icon}</span>
            </div>
            <div>
              <h3 className="shiny-gold-text ingredient-name">{currentIngredient.name}</h3>
              <p className="ingredient-subtitle">{currentIngredient.subtitle}</p>
              <p className="ingredient-description">{currentIngredient.description}</p>
              <ul className="ingredient-points">
                {currentIngredient.points.map((point) => (
                  <li key={point}>
                    <span className="check">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container cta-content">
          <h2 className="heading-lg shiny-gold-text">Ready to Rule the Room?</h2>
          <p className="cta-subtitle">Choose your weapon of attraction.</p>
          <div className="cta-actions">
            <Link to="/products" className="btn btn-gold">
              Get Pheromone Soap
            </Link>
            <Link to="/products" className="btn btn-outline">
              Get Pheromone Tablets
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
