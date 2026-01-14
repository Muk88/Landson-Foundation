import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client with service role key
// Only create this on the server side (when SUPABASE_SERVICE_ROLE_KEY is available)
export const supabaseAdmin = typeof window === 'undefined' && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(
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
    athlete_name: string
    achievement: string
    story_content: string
    image_url: string
    youtube_url?: string
    published: boolean
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

export interface Donation {
    id: string
    amount: number
    donor_name?: string
    donor_email?: string
    payment_reference: string
    payment_status: string
    donation_type: string
    created_at: string
}

export interface AdminUser {
    id: string
    email: string
    role: string
    created_at: string
}
