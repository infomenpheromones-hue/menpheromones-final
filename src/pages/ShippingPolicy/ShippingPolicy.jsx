import { site } from '../../lib/siteConfig'
import '../Terms/Terms.css'

export default function ShippingPolicy() {
  return (
    <div className="legal-page">
      <section className="page-hero">
        <div className="container">
          <h1 className="heading-lg shiny-gold-text">Shipping Policy</h1>
          <p className="legal-updated">Last updated: {site.lastUpdated}</p>
        </div>
      </section>

      <section className="section">
        <div className="container legal-content">
          <h2>Where We Deliver</h2>
          <p>We currently deliver to addresses across India. We do not ship internationally.</p>

          <h2>Processing Time</h2>
          <p>Orders are processed and handed to our courier partner within 1–2 business days of confirmation.</p>

          <h2>Delivery Time</h2>
          <p>
            Delivery usually takes 3–7 business days after dispatch, depending on your location. Remote
            areas may take longer. Delays caused by courier, weather or public holidays are outside our
            control.
          </p>

          <h2>Shipping Charges</h2>
          <p>Any shipping charge is shown at checkout before you pay. Prices shown include applicable taxes.</p>

          <h2>Order Tracking</h2>
          <p>
            Once your order ships, we share tracking details by phone or email. If you have not received
            them within 3 business days of ordering, contact us.
          </p>

          <h2>Damaged or Lost Parcels</h2>
          <p>
            If your parcel arrives damaged or does not arrive, contact us within 7 days of the expected
            delivery date and we will arrange a replacement or refund as per our Refund &amp; Cancellation
            Policy.
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
