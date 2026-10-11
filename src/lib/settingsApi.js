import { supabase, isSupabaseConfigured } from './supabaseClient'

// Public setting readable by anyone (RLS allows it) — used by the storefront
// checkout to open the Razorpay widget with the key the admin configured.
export async function fetchPublicSetting(key) {
  if (!isSupabaseConfigured) return ''
  const { data, error } = await supabase.from('site_settings').select('value').eq('key', key).maybeSingle()
  if (error) {
    console.error(`[settingsApi] fetchPublicSetting(${key}) failed:`, error.message)
    return ''
  }
  return data?.value || ''
}

// Admin-only — requires an authenticated session (enforced by RLS).
export async function fetchSettings(keys) {
  const { data, error } = await supabase.from('site_settings').select('key, value').in('key', keys)
  if (error) throw error
  const result = {}
  for (const key of keys) result[key] = ''
  for (const row of data || []) result[row.key] = row.value || ''
  return result
}

export async function updateSetting(key, value) {
  const { error } = await supabase.from('site_settings').upsert({ key, value, updated_at: new Date().toISOString() })
  if (error) throw error
}
