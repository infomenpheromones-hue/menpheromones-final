import { useState } from 'react'
import { supabase, isSupabaseConfigured } from '../../lib/supabaseClient'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!isSupabaseConfigured) {
      setError('This form is not connected to a backend yet — Supabase keys are missing from .env.')
      return
    }

    setSubmitting(true)
    try {
      const { data, error: invokeError } = await supabase.functions.invoke('send-contact-email', {
        body: form,
      })
      if (invokeError) {
        const body = await invokeError.context?.json?.().catch(() => null)
        throw new Error(body?.error || invokeError.message)
      }
      if (data?.error) throw new Error(data.error)
      setSent(true)
    } catch (err) {
      setError(err.message || 'Something went wrong sending your message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="contact-page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Get in Touch</p>
          <h1 className="heading-lg shiny-gold-text">Contact Us</h1>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="gold-panel contact-form-card">
            {sent ? (
              <p className="contact-sent">Thanks for reaching out — we'll get back to you shortly.</p>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <label>
                  Name
                  <input name="name" required value={form.name} onChange={handleChange} />
                </label>
                <label>
                  Email
                  <input name="email" type="email" required value={form.email} onChange={handleChange} />
                </label>
                <label>
                  Message
                  <textarea name="message" rows={5} required value={form.message} onChange={handleChange} />
                </label>
                {error && <p className="contact-error">{error}</p>}
                <button type="submit" className="btn btn-gold" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          <div className="contact-details">
            <div className="gold-panel contact-detail-card">
              <h4 className="shiny-gold-text">Business Details</h4>
              <p>Menpheromones</p>
              <p>Email: hello@menpheromones.com</p>
              <p>Phone: +91 00000 00000</p>
              <p className="contact-placeholder-note">
                (Placeholder contact details — send the real business phone/email/address to update this
                section.)
              </p>
            </div>
            <div className="gold-panel contact-detail-card">
              <h4 className="shiny-gold-text">Follow Us</h4>
              <div className="contact-socials">
                <a href="#" aria-label="Facebook">📘</a>
                <a href="#" aria-label="Instagram">📷</a>
                <a href="#" aria-label="Twitter">🐦</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
