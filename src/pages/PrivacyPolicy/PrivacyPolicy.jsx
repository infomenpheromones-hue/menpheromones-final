import './PrivacyPolicy.css'

export default function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <section className="page-hero">
        <div className="container">
          <h1 className="heading-lg shiny-gold-text">Privacy Policy</h1>
          <p className="legal-updated">Last updated: [date] — placeholder template, replace before launch.</p>
        </div>
      </section>

      <section className="section">
        <div className="container legal-content">
          <p>
            This is a generic placeholder Privacy Policy. It should be reviewed and replaced with content
            that accurately reflects Menpheromones' actual data practices before the site goes live.
          </p>

          <h2>Information We Collect</h2>
          <p>
            When you place an order, we collect your name, phone number, delivery address, and order
            details. When you subscribe to our newsletter, we collect your email address. We do not store
            payment card details — all online payments are processed securely by Razorpay.
          </p>

          <h2>How We Use Your Information</h2>
          <p>
            We use the information you provide to process and deliver your orders, respond to enquiries,
            and — if you've opted in — send occasional newsletter updates. We do not sell your personal
            information to third parties.
          </p>

          <h2>Data Storage</h2>
          <p>
            Order and account data is stored securely using Supabase's infrastructure with access
            restricted to authorized administrators only.
          </p>

          <h2>Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal data at any time by
            contacting us via the Contact page.
          </p>

          <h2>Contact</h2>
          <p>For privacy-related questions, reach out via the Contact page or email hello@menpheromones.com.</p>
        </div>
      </section>
    </div>
  )
}
