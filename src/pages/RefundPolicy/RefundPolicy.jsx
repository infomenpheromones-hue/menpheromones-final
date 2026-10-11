import { site } from '../../lib/siteConfig'
import '../Terms/Terms.css'

export default function RefundPolicy() {
  return (
    <div className="legal-page">
      <section className="page-hero">
        <div className="container">
          <h1 className="heading-lg shiny-gold-text">Refund &amp; Cancellation Policy</h1>
          <p className="legal-updated">Last updated: {site.lastUpdated}</p>
        </div>
      </section>

      <section className="section">
        <div className="container legal-content">
          <h2>Order Cancellation</h2>
          <p>
            You can cancel an order before it is shipped by contacting us at {site.email} or{' '}
            {site.phone} with your order details. Once an order has been shipped it cannot be cancelled, but you may
            still be eligible for a return as described below.
          </p>

          <h2>Returns</h2>
          <p>
            Because soap is a personal-care product, we accept returns only if the item arrives damaged,
            defective or incorrect. Please contact us within 7 days of delivery with your order number and
            clear photos of the product and packaging. Used products cannot be returned.
          </p>

          <h2>Refunds</h2>
          <p>
            Once we approve a return or cancellation, the refund is processed within 5–7 business days.
            Online payments are refunded to the original payment method (card, UPI or bank account). For
            Cash on Delivery orders, we refund by bank transfer or UPI to details you provide. Your bank may
            take a few additional days to show the credit.
          </p>

          <h2>Replacements</h2>
          <p>
            For damaged, defective or incorrect items you may choose a replacement instead of a refund,
            subject to stock availability.
          </p>

          <h2>Failed or Duplicate Payments</h2>
          <p>
            If money was deducted but your order was not confirmed, or you were charged twice, contact us
            with the payment reference. The amount is refunded to the original payment method within 5–7
            business days.
          </p>

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
