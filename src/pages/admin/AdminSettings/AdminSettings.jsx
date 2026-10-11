import { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { supabase } from '../../../lib/supabaseClient'
import { fetchSettings, updateSetting } from '../../../lib/settingsApi'
import './AdminSettings.css'

const SETTING_KEYS = ['contact_email', 'razorpay_key_id', 'razorpay_key_secret']

export default function AdminSettings() {
  const { session } = useAuth()
  const [loading, setLoading] = useState(true)
  const [contactEmail, setContactEmail] = useState('')
  const [contactSaved, setContactSaved] = useState(false)
  const [contactError, setContactError] = useState('')

  const [unlocked, setUnlocked] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmError, setConfirmError] = useState('')
  const [confirming, setConfirming] = useState(false)

  const [keyId, setKeyId] = useState('')
  const [keySecret, setKeySecret] = useState('')
  const [showSecret, setShowSecret] = useState(false)
  const [razorpaySaved, setRazorpaySaved] = useState(false)
  const [razorpayError, setRazorpayError] = useState('')
  const [savingRazorpay, setSavingRazorpay] = useState(false)
  const [hasKeysConfigured, setHasKeysConfigured] = useState(false)

  useEffect(() => {
    fetchSettings(SETTING_KEYS)
      .then((values) => {
        setContactEmail(values.contact_email)
        setKeyId(values.razorpay_key_id)
        setKeySecret(values.razorpay_key_secret)
        setHasKeysConfigured(Boolean(values.razorpay_key_id && values.razorpay_key_secret))
      })
      .finally(() => setLoading(false))
  }, [])

  async function handleSaveContactEmail(e) {
    e.preventDefault()
    setContactError('')
    setContactSaved(false)
    try {
      await updateSetting('contact_email', contactEmail.trim())
      setContactSaved(true)
    } catch (err) {
      setContactError(err.message || 'Failed to save')
    }
  }

  async function handleConfirmPassword(e) {
    e.preventDefault()
    setConfirmError('')
    setConfirming(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: session.user.email,
        password: confirmPassword,
      })
      if (error) throw error
      setUnlocked(true)
      setConfirmPassword('')
    } catch (err) {
      setConfirmError('Incorrect password.')
    } finally {
      setConfirming(false)
    }
  }

  async function handleSaveRazorpay(e) {
    e.preventDefault()
    setRazorpayError('')
    setRazorpaySaved(false)
    setSavingRazorpay(true)
    try {
      await updateSetting('razorpay_key_id', keyId.trim())
      await updateSetting('razorpay_key_secret', keySecret.trim())
      setHasKeysConfigured(Boolean(keyId.trim() && keySecret.trim()))
      setRazorpaySaved(true)
    } catch (err) {
      setRazorpayError(err.message || 'Failed to save')
    } finally {
      setSavingRazorpay(false)
    }
  }

  if (loading) return <p className="state-message">Loading…</p>

  return (
    <div className="admin-settings">
      <h1 className="shiny-gold-text">Settings</h1>

      <section className="gold-panel admin-settings-card">
        <h3>Contact Form Recipient</h3>
        <p className="admin-settings-hint">
          Enquiries submitted on the public Contact page are emailed to this address.
        </p>
        <form className="admin-settings-form" onSubmit={handleSaveContactEmail}>
          <label>
            Recipient Email
            <input
              type="email"
              required
              value={contactEmail}
              onChange={(e) => {
                setContactEmail(e.target.value)
                setContactSaved(false)
              }}
            />
          </label>
          {contactError && <p className="admin-settings-error">{contactError}</p>}
          {contactSaved && <p className="admin-settings-success">Saved.</p>}
          <button type="submit" className="btn btn-gold">
            Save
          </button>
        </form>
      </section>

      <section className="gold-panel admin-settings-card">
        <div className="admin-settings-card-header">
          <h3>Razorpay Payment Keys</h3>
          <span className={'admin-settings-badge' + (hasKeysConfigured ? ' configured' : '')}>
            {hasKeysConfigured ? 'Configured' : 'Not Set'}
          </span>
        </div>
        <p className="admin-settings-hint">
          Once the client provides their Razorpay Key ID and Key Secret, enter them here to switch on
          online payments — no redeploy needed. Re-enter your admin password to unlock this section.
        </p>

        {!unlocked ? (
          <form className="admin-settings-form" onSubmit={handleConfirmPassword}>
            <label>
              Confirm Admin Password
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your login password"
              />
            </label>
            {confirmError && <p className="admin-settings-error">{confirmError}</p>}
            <button type="submit" className="btn btn-outline" disabled={confirming}>
              {confirming ? 'Checking…' : 'Unlock'}
            </button>
          </form>
        ) : (
          <form className="admin-settings-form" onSubmit={handleSaveRazorpay}>
            <label>
              Key ID
              <input value={keyId} onChange={(e) => setKeyId(e.target.value)} placeholder="rzp_live_…" />
            </label>
            <label>
              Key Secret
              <div className="admin-settings-secret-row">
                <input
                  type={showSecret ? 'text' : 'password'}
                  value={keySecret}
                  onChange={(e) => setKeySecret(e.target.value)}
                  placeholder="Key secret"
                />
                <button type="button" className="btn btn-outline" onClick={() => setShowSecret((s) => !s)}>
                  {showSecret ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>
            {razorpayError && <p className="admin-settings-error">{razorpayError}</p>}
            {razorpaySaved && <p className="admin-settings-success">Saved. Online payments are now live.</p>}
            <button type="submit" className="btn btn-gold" disabled={savingRazorpay}>
              {savingRazorpay ? 'Saving…' : 'Save Keys'}
            </button>
          </form>
        )}
      </section>
    </div>
  )
}
