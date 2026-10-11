import './Terms.css'

export default function Terms() {
  return (
    <div className="legal-page">
      <section className="page-hero">
        <div className="container">
          <h1 className="heading-lg shiny-gold-text">Terms of Service</h1>
          <p className="legal-updated">Last updated: [date] — placeholder template, replace before launch.</p>
        </div>
      </section>

      <section className="section">
        <div className="container legal-content">
          <p>
            This is a generic placeholder Terms of Service. It should be reviewed and replaced with terms
            that accurately reflect Menpheromones' business before the site goes live.
          </p>

          <h2>Orders &amp; Payment</h2>
          <p>
            Orders can be placed via Cash on Delivery or online payment through Razorpay. All prices are
            listed in INR (₹) and are inclusive of applicable taxes unless stated otherwise.
          </p>

          <h2>Shipping</h2>
          <p>
            Orders are typically processed within 1-2 business days. Delivery timelines vary by location.
          </p>

          <h2>Returns &amp; Refunds</h2>
          <p>
            [Placeholder — define your actual return window, condition requirements, and refund process
            here before launch.]
          </p>

          <h2>Product Use &amp; Disclaimer</h2>
          <p>
            Product claims regarding attraction and confidence reflect general research on pheromone
            compounds and are not guarantees of individual results. Discontinue use if irritation occurs.
          </p>

          <h2>Contact</h2>
          <p>For questions about these terms, reach out via the Contact page or email hello@menpheromones.com.</p>
        </div>
      </section>
    </div>
  )
}
