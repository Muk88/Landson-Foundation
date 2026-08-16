import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const createClient = () => createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: typeof window !== 'undefined' ? window.sessionStorage : undefined,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
})
export const supabase = createClient()

// Server-side client with service role key
// Only create this on the server side (when SUPABASE_SERVICE_ROLE_KEY is available)
export const supabaseAdmin = typeof window === 'undefined' && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createSupabaseClient(
        supabaseUrl,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        }
    )
    : supabase // Fallback to regular client on browser side

// Database types
export interface ImpactMetrics {
    id: string
    athletes_supported: number
    school_fees_paid: number
    medals_won: number
    updated_at: string
}

export interface SuccessStory {
    id: string
    name: string
    title: string
    story: string
    achievement?: string
    image_url: string
    images?: string[]
    youtube_url?: string
    year?: number
    is_featured: boolean
    created_at: string
    updated_at: string
}

export interface ContactMessage {
    id: string
    name: string
    email: string
    message: string
    is_read: boolean
    created_at: string
}

export interface AdminUser {
    id: string
    email: string
    role: string
    created_at: string
}

export interface News {
    id: string
    title: string
    slug: string
    content: string
    excerpt?: string
    image_url: string
    images?: string[]
    youtube_url?: string
    published_date: string
    is_published: boolean
    created_at: string
    updated_at: string
}

export interface Program {
    id: string
    title: string
    description: string
    icon?: string
    image_url?: string
    images?: string[]
    order_index: number
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface Alumni {
    id: string
    name: string
    current_role: string
    quote: string
    image_url: string
    linkedin_url?: string
    is_active: boolean
    created_at: string
    updated_at: string
}
