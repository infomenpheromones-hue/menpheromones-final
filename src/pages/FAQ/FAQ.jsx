import { useState } from 'react'
import './FAQ.css'

const faqs = [
  {
    q: 'How do I use the soap?',
    a: 'Wet the bar, lather between your hands or on a cloth, apply to skin and rinse well. Keep the bar on a draining soap dish between uses.',
  },
  {
    q: 'How long does one bar last?',
    a: 'With daily use, each bar lasts approximately 3-4 weeks depending on usage.',
  },
  {
    q: 'Are the ingredients safe for sensitive skin?',
    a: 'Our soaps are made to be mild. As with any personal care product, we recommend a patch test if you have known sensitivities.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept Cash on Delivery and online payments (cards, UPI, netbanking) via Razorpay.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Orders are typically processed within 1-2 business days. Delivery timelines depend on your location — you\'ll receive tracking details once your order ships.',
  },
  {
    q: 'What is your return policy?',
    a: 'See our Refund & Cancellation Policy page for full details.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="faq-page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Questions &amp; Answers</p>
          <h1 className="heading-lg shiny-gold-text">Frequently Asked Questions</h1>
        </div>
      </section>

      <section className="section">
        <div className="container faq-list">
          {faqs.map((item, i) => (
            <div key={item.q} className="gold-panel faq-item">
              <button className="faq-question" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <span>{item.q}</span>
                <span className="faq-toggle">{openIndex === i ? '−' : '+'}</span>
              </button>
              {openIndex === i && <p className="faq-answer">{item.a}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
