import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        '⚠️  Supabase env vars não configuradas. Preencha VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no ficheiro .env'
    )
}

export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-anon-key'
)
