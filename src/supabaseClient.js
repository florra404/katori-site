import { createClient } from '@supabase/supabase-js'

// Vite автоматически подставляет значения из .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL или Key не найдены в .env файле')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)