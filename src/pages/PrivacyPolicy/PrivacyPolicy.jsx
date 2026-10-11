import { site } from '../../lib/siteConfig'
import '../Terms/Terms.css'
import './PrivacyPolicy.css'

export default function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <section className="page-hero">
        <div className="container">
          <h1 className="heading-lg shiny-gold-text">Privacy Policy</h1>
          <p className="legal-updated">Last updated: {site.lastUpdated}</p>
        </div>
      </section>

      <section className="section">
        <div className="container legal-content">
          <p>
            {site.legalName} ("we", "us") respects your privacy. This policy explains what personal
            information we collect when you use our website and how we use it.
          </p>

          <h2>Information We Collect</h2>
          <p>
            When you place an order we collect your name, phone number, delivery address and order details.
            When you contact us we collect your name, email address and message. When you subscribe to our
            newsletter we collect your email address.
          </p>

          <h2>Payment Information</h2>
          <p>
            Online payments are processed by Razorpay. We do not see or store your card, UPI or net banking
            details. Razorpay handles that information under its own privacy policy and security standards.
          </p>

          <h2>How We Use Your Information</h2>
          <p>
            We use your information to process and deliver orders, send order updates, respond to your
            questions and, if you opted in, send occasional newsletters. You can unsubscribe at any time.
          </p>

          <h2>Sharing of Information</h2>
          <p>
            We do not sell your personal information. We share it only with service providers who help us
            run the store, such as payment processors and delivery partners, and only as needed to complete
            your order, or where required by law.
          </p>

          <h2>Data Storage and Security</h2>
          <p>
            Order and contact data is stored on secure cloud infrastructure with access limited to
            authorised staff. We take reasonable steps to protect your data, but no online service can
            guarantee absolute security.
          </p>

          <h2>Cookies and Local Storage</h2>
          <p>
            Our site stores your shopping cart in your browser so it is still there when you return. We do
            not use it to track you across other websites.
          </p>

          <h2>Your Rights</h2>
          <p>
            You may ask us to access, correct or delete your personal data at any time by contacting us at
            the details below.
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
