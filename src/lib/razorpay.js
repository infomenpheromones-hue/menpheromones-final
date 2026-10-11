import { supabase } from './supabaseClient'
import { fetchPublicSetting } from './settingsApi'

function loadCheckoutScript() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Razorpay checkout script'))
    document.body.appendChild(script)
  })
}

// The admin sets the Razorpay Key ID via /admin/settings — read it fresh each
// time instead of a build-time env var, so it goes live without a redeploy.
export async function checkRazorpayConfigured() {
  const keyId = await fetchPublicSetting('razorpay_key_id')
  return Boolean(keyId)
}

// Opens the Razorpay modal. Resolves with { orderId, paymentId } on success,
// rejects if the payment is cancelled or verification fails.
export async function payWithRazorpay({ amount, customer }) {
  const keyId = await fetchPublicSetting('razorpay_key_id')
  if (!keyId) {
    throw new Error('Razorpay is not configured yet. Add the keys in /admin/settings once the client provides them.')
  }

  await loadCheckoutScript()

  const { data: orderData, error: orderError } = await supabase.functions.invoke('create-razorpay-order', {
    body: { amount },
  })
  if (orderError) throw orderError
  if (orderData?.error) throw new Error(orderData.error)

  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay({
      key: keyId,
      amount: orderData.amount,
      currency: 'INR',
      name: 'Menpheromones',
      description: 'Order Payment',
      order_id: orderData.orderId,
      prefill: {
        name: customer.name,
        contact: customer.phone,
      },
      theme: { color: '#D4AF37' },
      handler: async (response) => {
        try {
          const { data: verifyData, error: verifyError } = await supabase.functions.invoke(
            'verify-razorpay-payment',
            {
              body: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
            }
          )
          if (verifyError || !verifyData?.verified) {
            reject(new Error('Payment verification failed. Please contact support before retrying.'))
            return
          }
          resolve({ orderId: response.razorpay_order_id, paymentId: response.razorpay_payment_id })
        } catch (err) {
          reject(err)
        }
      },
      modal: {
        ondismiss: () => reject(new Error('Payment cancelled')),
      },
    })
    rzp.open()
  })
}
