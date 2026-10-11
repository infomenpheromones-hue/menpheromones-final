import { supabase, isSupabaseConfigured } from './supabaseClient'

// Inserts the order row. Called after payment succeeds (Razorpay) or
// immediately (Cash on Delivery). Throws if Supabase isn't configured yet
// so the checkout UI can show a clear "not connected" message instead of
// silently pretending an order was placed.
export async function createOrder({ customer, items, total, paymentMethod, paymentStatus, razorpay }) {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not connected yet, so orders cannot be saved. Add your Supabase keys to .env.')
  }

  const { data, error } = await supabase
    .from('orders')
    .insert({
      customer_name: customer.name,
      phone: customer.phone,
      address: customer.address,
      items,
      total,
      payment_method: paymentMethod,
      payment_status: paymentStatus,
      razorpay_order_id: razorpay?.orderId ?? null,
      razorpay_payment_id: razorpay?.paymentId ?? null,
      status: 'pending',
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function fetchOrders() {
  if (!isSupabaseConfigured) return []
  const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function updateOrderStatus(id, status) {
  const { error } = await supabase.from('orders').update({ status }).eq('id', id)
  if (error) throw error
}
