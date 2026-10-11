import { site } from '../../lib/siteConfig'
import './Terms.css'

export default function Terms() {
  return (
    <div className="legal-page">
      <section className="page-hero">
        <div className="container">
          <h1 className="heading-lg shiny-gold-text">Terms &amp; Conditions</h1>
          <p className="legal-updated">Last updated: {site.lastUpdated}</p>
        </div>
      </section>

      <section className="section">
        <div className="container legal-content">
          <p>
            These terms apply to your use of this website and any purchase from {site.legalName}. By placing
            an order you agree to them.
          </p>

          <h2>Products</h2>
          <p>
            We sell fragrance bath soaps. We try to describe and photograph products accurately, but colours
            and packaging may vary slightly. Soaps are for external use on skin only.
          </p>

          <h2>Pricing and Payment</h2>
          <p>
            All prices are in Indian Rupees (INR) and include applicable taxes unless stated otherwise. You
            can pay by Cash on Delivery or online (cards, UPI, net banking) through Razorpay. We may cancel an
            order if a price or stock error occurs, and will refund any amount already paid.
          </p>

          <h2>Orders</h2>
          <p>
            An order is confirmed once we accept it and you receive confirmation. We may decline or cancel
            orders that cannot be fulfilled or delivered to the address provided.
          </p>

          <h2>Shipping, Returns and Refunds</h2>
          <p>
            Delivery is covered in our Shipping Policy. Returns, cancellations and refunds are covered in our
            Refund &amp; Cancellation Policy. Both form part of these terms.
          </p>

          <h2>Skin Sensitivity</h2>
          <p>
            Soaps contain fragrance. Do a patch test if you have sensitive skin, and stop use if irritation
            occurs. Avoid contact with eyes.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All content on this website, including text, logos and images, belongs to {site.legalName} and
            may not be copied or reused without permission.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the extent permitted by law, our liability for any claim relating to an order is limited to
            the amount you paid for that order.
          </p>

          <h2>Governing Law</h2>
          <p>These terms are governed by the laws of India. Courts in India have jurisdiction over disputes.</p>

          <h2>Contact Us</h2>
          <p>
            {site.legalName}<br />
            Email: {site.email}<br />
            Phone: {site.phone}<br />
            Address: {site.address}
          </p>
        </div>
      </section>
    </div>
  )
}
